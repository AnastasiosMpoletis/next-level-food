'use client';

/**
 * Props provided by Next.js.
 * 
 * @param {*} param0 
 * @returns 
 */
export default function Error({ error }) {
  return (
    <main className='error'>
      <h1>An error ocurred!</h1>
      <p>Failed to fetch meal data. Please try again later.</p>
    </main>
  );
}