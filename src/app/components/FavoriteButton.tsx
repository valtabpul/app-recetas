"use client";

import { useState } from "react";
import { toggleFavoriteAction } from "@/src/app/actions";

interface FavoriteButtonProps {
  recipeId: string;
  initialIsFavorite: boolean;
  iconOnly?: boolean;
}

export default function FavoriteButton({ recipeId, initialIsFavorite, iconOnly = false }: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);
  const [loading, setLoading] = useState(false);

  const handleToggle = async (e: React.MouseEvent) => {
    e.preventDefault(); // Previene que el clic navegue si está dentro de un Link o similar
    setLoading(true);
    const result = await toggleFavoriteAction(recipeId);

    if ("error" in result) {
      alert(result.error);
    } else {
      setIsFavorite(result.isFavorite);
    }

    setLoading(false);
  };

  if (iconOnly) {
    return (
      <button
        onClick={handleToggle}
        disabled={loading}
        title={isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
        className={`
          flex items-center justify-center w-10 h-10 rounded-full cursor-pointer transition-all shadow-md disabled:opacity-50
          ${isFavorite
            ? "bg-pink-500 text-white hover:bg-pink-600 shadow-pink-200"
            : "bg-white text-pink-500 border border-pink-100 hover:bg-pink-50"
          }
        `}
      >
        <span className="text-lg">{isFavorite ? "❤️" : "🤍"}</span>
      </button>
    );
  }

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
