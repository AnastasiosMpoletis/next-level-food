import classes from './loading.module.css';

/**
 * Renamed file to loading-out so that Next.js cannot use it, but keep it in our app.
 * @returns 
 */
export default function MealsLoadingPage() {
  return (
    <p className={classes.loading}>Fetching meals...</p>
  );
}