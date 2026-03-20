'use client'; // Required for hooks
import { useState, useEffect } from 'react';
import { checkIsFavorited, addFavorite, removeFavorite } from '@/app/protected/recipes/favorites';
import { Heart } from 'lucide-react'; // Or any icon library you like

interface FavoriteButtonProps {
  userId: string | undefined;
  recipeId: number;
}

export default function FavoriteButton({ userId, recipeId }: FavoriteButtonProps) {
  const [isFavorited, setIsFavorited] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Initial check on load
  useEffect(() => {
    const fetchStatus = async () => {
      if (!userId) {
        setIsLoading(false);
        return;
      }

      const status = await checkIsFavorited(userId, recipeId);
      setIsFavorited(status);
      setIsLoading(false);
    };
    if (userId) fetchStatus();
  }, [userId, recipeId]);

  const handleToggle = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevents clicking the heart from opening the recipe link
    
    if (!userId) {
      alert("You must be logged in to see favorite recipes!");
      return;
    }
    // Optimistic Update: Change UI immediately
    const previousState = isFavorited;
    setIsFavorited(!previousState);

    const { error } = previousState 
      ? await removeFavorite(userId, recipeId) 
      : await addFavorite(userId, recipeId);

    if (error) {
      // If the DB call fails, roll back the UI
      setIsFavorited(previousState);
      alert("Something went wrong saving your favorite!");
    }
  };

  if (isLoading) return <div className="animate-pulse">...</div>;

  return (
    <button onClick={handleToggle} className="p-2 transition-transform active:scale-90">
      <Heart 
        fill={isFavorited ? "red" : "none"} 
        color={isFavorited ? "red" : "currentColor"} 
      />
    </button>
  );
}