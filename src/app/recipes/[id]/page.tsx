import { getRecipeById } from "@/src/services/recipe";
import { checkIsFavorite } from "@/src/app/actions";
import { Card, CardContent, Chip } from "@heroui/react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import FavoriteButton from "@/src/app/components/FavoriteButton";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function RecipeDetailPage({ params }: PageProps) {
  const { id } = await params;
  const recipe = await getRecipeById(id);

  if (!recipe) {
    notFound();
  }

  // Chequeamos si ya es favorito del usuario actual
  const isFavorite = await checkIsFavorite(recipe._id);

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      {/* Back button + Favorite button row */}
      <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
        <Link
          href="/"
          className="text-pink-600 hover:text-pink-700 hover:bg-pink-50 font-medium px-4 py-2 rounded-xl transition-all cursor-pointer inline-flex items-center gap-2 border border-transparent hover:border-pink-100 bg-transparent text-sm"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            />
          </svg>
          Volver al catálogo
        </Link>

        <FavoriteButton recipeId={recipe._id} initialIsFavorite={isFavorite} />
      </div>

      {/* Main Recipe Card */}
      <Card className="border border-pink-100 bg-[#FFF5F5] shadow-md rounded-3xl overflow-hidden mb-12">
        {/* Large Visual Header — fondo pastel claro */}
        <div className="relative h-[250px] sm:h-[400px] w-full bg-pink-50">
          <Image
            src={recipe.imageUrl || "/placeholder-recipe.jpg"}
            alt={recipe.name}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 1000px"
            className="object-cover opacity-85"
          />
          {/* Overlay rosa pastel claro para que no se vea oscuro */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#FFE4E6] via-pink-100/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-pink-700 drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)]">
              {recipe.name}
            </h1>
          </div>
        </div>

        <CardContent className="p-8 sm:p-10">
          {/* Attributes */}
          <div className="flex flex-wrap gap-3 mb-8 pb-6 border-b border-pink-100/50">
            <Chip className="bg-pink-100 text-pink-700 px-3 py-1 font-medium text-sm rounded-full">
              ⏱️ {recipe.prepTime}
            </Chip>
            <Chip className="bg-pink-100 text-pink-700 px-3 py-1 font-medium text-sm rounded-full">
              🧑‍🍳 {recipe.difficulty}
            </Chip>
            <Chip className="bg-pink-100 text-pink-700 px-3 py-1 font-medium text-sm rounded-full">
              🍽️ {recipe.servings} {recipe.servings === 1 ? "porción" : "porciones"}
            </Chip>
          </div>

          {/* Two-Column Layout */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            {/* Ingredients (Col 1) */}
            <div className="md:col-span-5">
              <h2 className="font-serif text-2xl font-bold text-pink-600 mb-6 flex items-center gap-2">
                <span>🧁</span> Ingredientes
              </h2>
              <ul className="space-y-4">
                {recipe.ingredients.map((ingredient: string, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-pink-100 flex items-center justify-center text-pink-500 text-xs mt-0.5 font-bold">
                      ✓
                    </span>
                    <span className="text-zinc-700 text-base">{ingredient}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Divider for small screens */}
            <div className="md:hidden">
              <hr className="border-pink-100/50" />
            </div>

            {/* Preparation Steps (Col 2) */}
            <div className="md:col-span-7">
              <h2 className="font-serif text-2xl font-bold text-pink-600 mb-6 flex items-center gap-2">
                <span>🥣</span> Preparación
              </h2>
              <ol className="space-y-6">
                {recipe.steps.map((step: string, index: number) => (
                  <li key={index} className="flex items-start gap-4">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-pink-500 text-white font-bold flex items-center justify-center text-sm shadow-sm shadow-pink-200">
                      {index + 1}
                    </span>
                    <div className="flex-1 pt-1">
                      <p className="text-zinc-700 text-base leading-relaxed">{step}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
