'use server';

import { createClient } from '@/lib/supabase/server'
import { redirect } from "next/navigation";

export async function addRecipeAction(formData: FormData) {
  const supabase = await createClient();

  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (!user || authError) {
    console.error("No active session found");
    redirect("/login"); 
    return;
  }

  const title = formData.get("title") as string;
  const cooking_time_int = parseInt(formData.get("cooking_time") as string);
  const ingredients = formData.get("ingredients") as string;
  const instructions = formData.get("instructions") as string;
  const email = user.email;

  if (!title || title.trim().length === 0) {
    return redirect("/protected/recipes/add?error=Title is required");
  }
  const cooking_time = isNaN(cooking_time_int) ? 0 : cooking_time_int;

  const selectedTagUuids = formData.getAll("tags") as string[];
  //console.log(selectedTagUuids);

  const { data: newRecipe, error: recipeError } = await supabase
    .from("Recipes")
    .insert([{ 
      recipe_title: title, 
      cooking_time, 
      ingredients, 
      instructions,
      user_id_creator: email 
    }])
    .select("id")
    .single();

  if (recipeError) {
    console.error(recipeError);
    return redirect("/protected/recipes/add?message=Error saving recipe");
  }
  // now link tags in recipe tags
  if (selectedTagUuids.length > 0) {
    // We map the array of UUIDs into an array of objects for the junction table
    const junctionRows = selectedTagUuids.map(tagId => ({
      recipe_id: newRecipe.id, // The integer ID of the recipe we just made
      tag_id: tagId     // The UUID of the tag from the checkbox
    }));

    const { error: junctionError } = await supabase
      .from("Recipe Tags")
      .insert(junctionRows);

    if (junctionError) {
      console.error("Junction Table Error:", junctionError.message);
      // Even if tags fail, the recipe is already saved.
    }
  }

  // Once saved, go back to the cookbook
  redirect("/protected/recipes");
}