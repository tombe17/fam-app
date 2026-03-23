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

            {/* Desktop Menu */}
            <div className="hidden md:flex gap-5 items-center font-semibold">
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

            {/* Mobile Menu Button - Visible on mobile, hidden on md+ */}
            <details className="md:hidden group relative">
                <summary className="list-none flex justify-between items-center cursor-pointer">
                    <div className="p-2 border rounded-md">
                        {/* Simple CSS-only Hamburger Icon */}
                        <span className="block w-5 h-0.5 bg-black mb-1 group-open:rotate-45 group-open:translate-y-1.5 transition-all"></span>
                        <span className="block w-5 h-0.5 bg-black mb-1 group-open:opacity-0 transition-all"></span>
                        <span className="block w-5 h-0.5 bg-black group-open:-rotate-45 group-open:-translate-y-1.5 transition-all"></span>
                    </div>
                </summary>
                
                <div className="flex flex-col mt-16 space-y-3 bg-gray-50 p-4 rounded-lg shadow-xl z-20">
                    <a href="/" className="hover:text-blue-600">Home</a>
                    <a href="/protected/recipes" className="hover:text-blue-600">Recipes</a>
                    <hr />
                    <Suspense fallback={<div>Loading...</div>}>
                        <AuthButton />
                    </Suspense>
                </div>
            </details>
        </div>
    </nav>
    );
}