"use client";

import { useState } from "react";
import { toggleFavoriteAction } from "@/src/app/actions";

interface FavoriteButtonProps {
  recipeId: string;
  initialIsFavorite: boolean;
}

export default function FavoriteButton({ recipeId, initialIsFavorite }: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);
  const [loading, setLoading] = useState(false);

  const handleToggle = async () => {
    setLoading(true);
    const result = await toggleFavoriteAction(recipeId);

    if ("error" in result) {
      alert(result.error);
    } else {
      setIsFavorite(result.isFavorite);
    }

    setLoading(false);
  };

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      className={`
        inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all cursor-pointer
        shadow-md disabled:opacity-50
        ${isFavorite
          ? "bg-pink-500 text-white hover:bg-pink-600 shadow-pink-200"
          : "bg-white text-pink-600 border-2 border-pink-200 hover:bg-pink-50 shadow-pink-100"
        }
      `}
    >
      <span className="text-lg">{isFavorite ? "❤️" : "🤍"}</span>
      {loading
        ? "Guardando..."
        : isFavorite
          ? "En Favoritos"
          : "Agregar a Favoritos"}
    </button>
  );
}
