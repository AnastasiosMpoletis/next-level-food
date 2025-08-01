import Link from 'next/link';
import { Suspense } from 'react';
import classes from './page.module.css';
import MealsGrid from '@/components/meals/meals-grid.js';
import { getMeals } from '@/lib/meals.js';

export const metadata = {
  title: 'All Meals',
  description: 'Browse the delicious meals shared by our vibrant community.',
};

async function Meals() {
  const meals = await getMeals();

  return (<MealsGrid meals={meals} />);
}

/**
 * In Next.js we can use async-await to server components! @see previous commits if removed from here.
 */
export default function MealsPage() {
  return (
    <>
      <header className={classes.header}>
        <h1>Delicious meals, created <span className={classes.highlight}>by you</span></h1>
        <p>Choose your favorite recipe and cook it yourself. It is easy and fun!</p>
        <p className={classes.cta}>
          <Link href="/meals/share">
            Share your favorite recipe
          </Link>
        </p>
      </header>
      <main className={classes.main}>
        <Suspense fallback={<p className={classes.loading}>Fetching meals...</p>}>
          <Meals />
        </Suspense>
      </main>
    </>
  );
}
