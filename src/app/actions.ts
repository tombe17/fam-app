'use server';

import { cookies } from 'next/headers';

export async function verifyRecipePassword(password: string) {
  const correctPassword = process.env.FAMILY_RECIPE_PASSWORD;

  if (password === correctPassword) {
    // Set the cookie on the server side
    const cookieStore = await cookies();
    cookieStore.set('family_recipe_access', 'true', {
      path: '/',
      maxAge: 2592000, // 30 days
      httpOnly: true,  // This makes it even more secure!
      secure: process.env.NODE_ENV === 'production',
    });
    return { success: true };
  }

  return { success: false };
}