/**
 * To re-install the database:
 * 1. Stop development server (if running).
 * 2. Delete meals.db file (in root folder you can run: 'rm .\meals.db').
 * 3. In root folder run: 'node initdb.js'.
 */
import sql from 'better-sqlite3';
import slugify from 'slugify';
import xss from 'xss';
import { S3 } from '@aws-sdk/client-s3';

const s3 = new S3({
  region: 'eu-central-1'
});
const db = sql('meals.db');

export async function getMeals() {
  // await new Promise(resolve => setTimeout(resolve, 2000)); // just to simulate a slow connection
  return db.prepare('SELECT * FROM meals').all();
}

/**
 * We do not need to return a promise, but an object. This is why we do not use async.
 * Query parameters should be passed like this, for security purposes.
 * 
 * @param {*} slug 
 * @returns a single event
 */
export function getMeal(slug) {
  return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug);
}

export async function saveMeal(meal) {
  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);

  // file
  const extension = meal.image.name.split('.').pop();
  const fileName = `${meal.slug}.${extension}`; // we should also add some random unique element

  const bufferedImage = await meal.image.arrayBuffer();

  s3.putObject({
    Bucket: 'aboletis-nextjs-demo-users-image',
    Key: fileName,
    Body: Buffer.from(bufferedImage),
    ContentType: meal.image.type,
  });

  meal.image = fileName;

  db.prepare(`
    INSERT INTO meals (title, summary, instructions, creator, creator_email, image, slug)
    VALUES (@title, @summary, @instructions, @creator, @creator_email, @image, @slug)
  `).run(meal);
}