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

export function saveMeal(meal) {
  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);
}