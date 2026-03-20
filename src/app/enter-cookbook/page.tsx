'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { verifyRecipePassword } from '@/app/actions';

export default function EnterCookbook() {
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await verifyRecipePassword(password);
    
    // In a real app, use an Environment Variable for this string!
    if (result.success) { 
      // Set a cookie that lasts for 30 days
      document.cookie = "family_recipe_acces=true; path=/; max-age=2592000";
      router.push('/protected/recipes');
    } else {
      alert("You didn't say the magic word. Hint: Ask Thomas!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-xl border w-96 text-center">
        <h1 className="text-2xl font-bold mb-4">The Bellows Cookbook</h1>
        <p className="text-sm text-gray-500 mb-6">Please enter the family password to see the recipes.</p>
        <input 
          type="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border rounded-lg mb-4 text-center"
          placeholder="What's the password?"
        />
        <button className="w-full bg-blue-600 text-white p-3 rounded-lg font-bold hover:bg-blue-700 transition">
          Enter Cookbook
        </button>
      </form>
    </div>
  );
}