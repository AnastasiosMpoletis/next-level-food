import Image from 'next/image';
import classes from './page.module.css';
import { getMeal } from '@/lib/meals.js';
import { notFound } from 'next/navigation';

/**
 * Adds dynamic metadata.
 * 
 * @param {*} param0 
 * @returns 
 */
export async function generateMetadata({ params }) {
  const meal = getMeal(params.mealSlug);

  if (!meal) {
    notFound(); // It will stop this component from executing and will show the closest not-found or error page
  }

  return {
    title: meal.title,
    description: meal.summary,
  };
}

export default function MealDetailsPage({ params }) {
  const meal = getMeal(params.mealSlug);

  if (!meal) {
    notFound(); // It will stop this component from executing and will show the closest not-found or error page
  }

  meal.instructions = meal.instructions.replace(/\n/g, '<br />');

  return (
    <>
      <header className={classes.header}>
        <div className={classes.image}>
          <Image
            src={`https://aboletis-nextjs-demo-users-image.s3.eu-central-1.amazonaws.com/${meal.image}`}
            alt={meal.title}
            fill
          />
        </div>
        <div className={classes.headerText}>
          <h1>{meal.title}</h1>
          <p className={classes.creator}>
            by <a href={`mailto:${meal.creator_email}`} >{meal.creator}</a>
          </p>
          <p className={classes.summary}>{meal.summary}</p>
        </div>
      </header>
      <main>
        <p
          className={classes.instructions}
          dangerouslySetInnerHTML={{
            __html: meal.instructions,
          }}
        ></p>
      </main>
    </>
  );
}
