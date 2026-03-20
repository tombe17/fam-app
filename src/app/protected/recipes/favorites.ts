import { createClient } from '@/lib/supabase/client';
/**
 * 1. Check if a recipe is favorited
 */
export const checkIsFavorited = async (userId: string, recipeId: number) => {
  const { data, error } = await createClient()
    .from('Favorites')
    .select('id')
    .eq('user_id', userId)
    .eq('recipe_id', recipeId)
    .maybeSingle(); // Use maybeSingle to avoid errors if no row exists
    
  return !!data;
};

/**
 * 2. Add a favorite
 */
export const addFavorite = async (userId: string, recipeId: number) => {
  return await createClient()
    .from('Favorites')
    .insert([{ user_id: userId, recipe_id: recipeId }]);
};

/**
 * 3. Remove a favorite
 */
export const removeFavorite = async (userId: string, recipeId: number) => {
  return await createClient()
    .from('Favorites')
    .delete()
    .eq('user_id', userId)
    .eq('recipe_id', recipeId);
};