import Link from "next/link";
import { Suspense } from "react";
import { AuthButton } from "@/components/auth-button";
import { createClient } from "@/lib/supabase/server";

export default async function Navbar() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
        <div className="w-full max-w-6xl flex justify-between items-center p-3 px-5 text-sm">
            <div className="flex gap-5 items-center font-semibold">
            <Link href={"/"}>Bellows Website Home</Link>
            </div>
            <div className="flex gap-5 items-center font-semibold">
            {/* Only visible to logged-in family members */}
            {user && (
                <Link 
                href="/protected/recipes" 
                className="hover:underline text-blue-600 dark:text-blue-400 transition-all"
                >
                Recipes
                </Link>
            )}
            <Suspense fallback={<div>Loading...</div>}>
                <AuthButton />
            </Suspense>
            </div>
        </div>
    </nav>
    );
}