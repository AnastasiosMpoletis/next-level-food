/**
 * To re-install the database:
 * 1. Stop development server (if running).
 * 2. Delete meals.db file. 
 * 3. In root folder run: 'node initdb.js'.
 */

import fs from 'node:fs'
import sql from 'better-sqlite3';
import slugify from 'slugify';
import xss from 'xss';

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

  const stream = fs.createWriteStream(`public/images/${fileName}`);
  const bufferedImage = await meal.image.arrayBuffer();

  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      throw new Error('Saving image failed!');
    }
  });

  meal.image = `/images/${fileName}`;

  db.prepare(`
    INSERT INTO meals (title, summary, instructions, creator, creator_email, image, slug)
    VALUES (@title, @summary, @instructions, @creator, @creator_email, @image, @slug)
  `).run(meal);
}