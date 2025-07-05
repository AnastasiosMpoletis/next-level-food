'use server';

import { redirect } from "next/navigation";
import { saveMeal } from "./meals.js";

/**
   * With 'use server', function will be executed only in the server. 
   * If such a function is inside a component, this component should be server too (not 'use client').
   * We can add async also.
   * formData is passed automatically.
   */
export async function shareMeal(formData) {
  // 'use server';

  const meal = {
    title: formData.get('title'),
    summary: formData.get('summary'),
    instructions: formData.get('instructions'),
    image: formData.get('image'), // make sure to pass name in ImagePicker component
    creator: formData.get('name'),
    creator_email: formData.get('email'),
  };

  await saveMeal(meal);

  redirect('/meals');
}