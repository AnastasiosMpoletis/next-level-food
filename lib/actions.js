'use server';

import { redirect } from "next/navigation";
import { saveMeal } from "./meals.js";

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
    !meal.creator_email.include('@') ||
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

  redirect('/meals');
}

function isInvalidText(text) {
  return !text || text.trim() === '';
}