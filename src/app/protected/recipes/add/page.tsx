import { addRecipeAction } from "./actions";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function AddRecipePage() {
    const supabase = await createClient();
  
    // Fetch all possible tags
    const { data: tags } = await supabase
        .from("Recipe Types")
        .select("*")
        .order("category", { ascending: true });

    //console.log("Fetched Tags:", tags);
    // Group tags by category for a better UI
    const categories = ["cooking_style", "cuisine", "dietary", "meal_type"];
  
    return (
        <main className="max-w-2xl mx-auto p-6">
        <div className="mb-8">
            <Link href="/protected/recipes" className="text-sm text-blue-600 hover:underline">
            ← Back to Cookbook
            </Link>
            <h1 className="text-3xl font-bold mt-4">Add New Recipe</h1>
        </div>

        <form action={addRecipeAction} className="space-y-6 bg-white p-8 rounded-xl border shadow-sm">
            <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Recipe Title</label>
            <input 
                name="title" 
                required 
                placeholder="e.g. Spam and Ramen"
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            />
            </div>

            <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Cooking Time (minutes)</label>
            <input 
                name="cooking_time" 
                type="number" 
                required 
                placeholder="45"
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            />
            </div>

            <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ingredients</label>
            <textarea 
                name="ingredients" 
                required 
                rows={6}
                placeholder="List each ingredient on a new line..."
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            />
            </div>

            <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Instructions</label>
            <textarea 
                name="instructions" 
                required 
                rows={8}
                placeholder="Number the steps (1., 2., 3.)"
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            />
            </div>

            {/*Below is for categories*/}
            <div className="border-t pt-6">
                <h2 className="text-lg font-semibold mb-4 text-gray-800">Recipe Tags</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {categories.map((cat) => (
                    <div key={cat} className="space-y-2">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-blue-600">
                        {cat.replace("_", " ")}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                        {tags?.filter(t => t.category === cat).map((tag) => {
                            //console.log("Single Tag Object:", tag);
                            return (
                                <label key={tag.id} className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-md border cursor-pointer hover:bg-gray-100 transition-colors">
                                <input 
                                    type="checkbox" 
                                    name="tags" 
                                    value={tag.id} 
                                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                                <span className="text-sm text-gray-700">{tag.name}</span>
                                </label>
                            );
                        })}
                        </div>
                    </div>
                    ))}
                </div>
            </div>

            <button 
            type="submit" 
            className="w-full bg-blue-600 text-white font-bold py-3 rounded-md hover:bg-blue-700 transition-colors"
            >
            Save Recipe
            </button>
        </form>
        </main>
  );
}