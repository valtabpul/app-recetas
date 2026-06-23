import { Card, CardContent } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import FavoriteButton from "./FavoriteButton";

interface RecipeCardProps {
  recipe: any;
  initialIsFavorite?: boolean;
}

export default function RecipeCard({ recipe, initialIsFavorite = false }: RecipeCardProps) {
  return (
    <Card className="border border-pink-100/50 bg-white hover:shadow-lg transition-all duration-300 rounded-3xl overflow-hidden flex flex-col hover:scale-[1.02] relative">
      {/* Recipe Image */}
      <div className="relative h-[220px] w-full">
        <Image
          src={recipe.imageUrl || "/placeholder-recipe.jpg"}
          alt={recipe.name}
          fill
          className="object-cover"
        />
        {/* Badge overlay */}
        <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-pink-600 text-xs font-semibold px-3 py-1 rounded-full border border-pink-100">
          🍰 Receta
        </span>
        {/* Favorite Icon */}
        <div className="absolute top-3 right-3 z-10">
          <FavoriteButton recipeId={recipe._id.toString()} initialIsFavorite={initialIsFavorite} iconOnly={true} />
        </div>
      </div>

      <CardContent className="p-6 flex flex-col flex-1">
        <h3 className="font-serif text-lg font-bold text-zinc-800 mb-2">
          {recipe.name}
        </h3>
        <p className="text-zinc-500 text-xs mb-5">
          ⏱️ {recipe.prepTime} · 🧑‍🍳 {recipe.difficulty} · 🍽️ {recipe.servings} porciones
        </p>

        <Link
          href={`/recipes/${recipe._id}`}
          className="mt-auto w-full inline-flex items-center justify-center bg-[#FFE3E3] hover:bg-pink-500 text-pink-700 hover:text-white font-semibold py-2.5 rounded-xl transition-colors text-sm shadow-sm cursor-pointer"
        >
          Ver receta 🍳
        </Link>
      </CardContent>
    </Card>
  );
}
