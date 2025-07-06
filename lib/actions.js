'use server';

import { redirect } from "next/navigation";
import { saveMeal } from "./meals.js";
import { revalidatePath } from "next/cache.js";

/**
   * With 'use server', function will be executed only in the server. 
   * If such a function is inside a component, this component should be server too (not 'use client').
   * We can add async also.
   * formData is passed automatically.
   */
export async function shareMeal(prevState, formData) {
  // 'use server';

  const meal = {
    title: formData.get('title'),
    summary: formData.get('summary'),
    instructions: formData.get('instructions'),
    image: formData.get('image'), // make sure to pass name in ImagePicker component
    creator: formData.get('name'),
    creator_email: formData.get('email'),
  };

  if (
    isInvalidText(meal.title) ||
    isInvalidText(meal.summary) ||
    isInvalidText(meal.instructions) ||
    isInvalidText(meal.creator) ||
    isInvalidText(meal.creator_email) ||
    !meal.creator_email.includes('@') ||
    !meal.image || meal.image.size === 0
  ) {
    // return object must be serializable (it must not contain e.g. functions)
    return {
      message: 'Invalid input.',
      values: {
        title: meal.title || '',
        summary: meal.summary || '',
        instructions: meal.instructions || '',
        image: meal.image || null,
        creator: meal.creator || '',
        creator_email: meal.creator_email || '',
      }
    };
  }

  await saveMeal(meal);
  
  /**
   * We can build this project with: 'npm run build' and execute it with: 'npm start'.
   * During build, Next.js builds all pages and then caches them. For our implementation, when we add a new meal, meals page is not updated.
   * To solve this, we have to use this function that refreshes the Next.js caches and reloads the data.
   * 
   * We can add a second parameter: 
   * 1. "page" -> revalidates only current page
   * 2. "layout" -> revalidates current page and subpages
   */
  revalidatePath("/meals");

  redirect('/meals');
}

function isInvalidText(text) {
  return !text || text.trim() === '';
}