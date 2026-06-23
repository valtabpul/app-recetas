import { getRecipes } from "@/src/services/recipe";
import { Card, CardContent } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { cookies } from "next/headers";

export default async function Home() {
  const recipes = await getRecipes();
  const cookieStore = await cookies();
  const token = cookieStore.get("recetas_token")?.value;

  // Categories metadata for visual showcase
  const categories = [
    {
      title: "Pasteles Artesanales",
      emoji: "🎂",
      description: "Tartas hechas a mano con ingredientes premium y mucho cariño.",
    },
    {
      title: "Macarons Franceses",
      emoji: "🧁",
      description: "Macarons crujientes por fuera, suaves por dentro. Sabores únicos.",
    },
    {
      title: "Especiales de Temporada",
      emoji: "🍰",
      description: "Creaciones exclusivas que cambian con cada estación del año.",
    },
  ];

  return (
    <div className="bg-[#FAF6F6] min-h-screen">
      {/* ── 1. Hero Banner ── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#FFF0F5] via-[#FFE3EE] to-[#FAF6F6] py-24 px-6">
        {/* Decorative floating circles */}
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-pink-200/30 blur-2xl" />
        <div className="absolute bottom-10 right-16 w-48 h-48 rounded-full bg-pink-100/30 blur-3xl" />

        <div className="max-w-4xl mx-auto flex flex-col items-center text-center relative z-10">
          {/* Circular Badge */}
          <div className="w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] rounded-full bg-white/90 backdrop-blur-sm border-[6px] border-pink-200 flex flex-col items-center justify-center p-8 shadow-2xl shadow-pink-200/40 mb-10">
            <span className="text-pink-500 text-4xl mb-3">❤️</span>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-pink-600 leading-tight mb-2 tracking-tight">
              Bite into<br />Happiness
            </h1>
            <p className="text-zinc-500 text-xs sm:text-sm max-w-[220px]">
              Recetas y repostería artesanal horneada con el corazón.
            </p>
          </div>

          <Link
            href="#featured"
            className="bg-pink-500 hover:bg-pink-600 text-white font-semibold px-8 py-3 rounded-full shadow-lg shadow-pink-200 transition-all cursor-pointer text-sm"
          >
            Explorar catálogo ✨
          </Link>
        </div>
      </section>

      {/* ── 2. Categorías ── */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((cat, i) => (
            <Link
              key={i}
              href={token ? "#featured" : "/login"}
              className="bg-[#FFE3E3]/60 hover:bg-[#FFE3E3] border border-pink-100 rounded-3xl p-8 text-center flex flex-col items-center shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 group cursor-pointer"
            >
              {/* Emoji Icon */}
              <div className="w-20 h-20 rounded-full bg-white shadow-md flex items-center justify-center text-4xl mb-5 group-hover:scale-110 transition-transform border-2 border-pink-100">
                {cat.emoji}
              </div>
              <h3 className="font-serif text-xl font-bold text-zinc-800 mb-3 group-hover:text-pink-600 transition-colors">
                {cat.title}
              </h3>
              <p className="text-zinc-600 text-sm leading-relaxed flex-1 mb-5">
                {cat.description}
              </p>
              <span className="bg-white hover:bg-pink-50 border border-pink-200 text-pink-600 font-semibold px-5 py-2 rounded-full text-xs transition-colors shadow-sm">
                Ver más →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── 3. Recetas Destacadas ── */}
      <section id="featured" className="bg-[#FFF5F5]/60 py-20 px-6 border-y border-pink-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-pink-500 font-medium tracking-widest text-xs uppercase">Nuestras Delicias</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-zinc-800 mt-2">
              Recetas Destacadas
            </h2>
            <div className="w-16 h-1 bg-pink-300 mx-auto mt-4 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recipes.slice(0, 6).map((recipe) => (
              <Card
                key={recipe._id}
                className="border border-pink-100/50 bg-white hover:shadow-lg transition-all duration-300 rounded-3xl overflow-hidden flex flex-col hover:scale-[1.02]"
              >
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
                </div>

                <CardContent className="p-6 flex flex-col flex-1">
                  <h3 className="font-serif text-lg font-bold text-zinc-800 mb-2">
                    {recipe.name}
                  </h3>
                  <p className="text-zinc-500 text-xs mb-5">
                    ⏱️ {recipe.prepTime} · 🧑‍🍳 {recipe.difficulty} · 🍽️ {recipe.servings} porciones
                  </p>

                  {/* Si está logueado → detalle de receta, si no → login */}
                  <Link
                    href={token ? `/recipes/${recipe._id}` : "/login"}
                    className="mt-auto w-full inline-flex items-center justify-center bg-[#FFE3E3] hover:bg-pink-500 text-pink-700 hover:text-white font-semibold py-2.5 rounded-xl transition-colors text-sm shadow-sm cursor-pointer"
                  >
                    Ver receta 🍳
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Promo Banner ── */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="bg-white border border-pink-100 rounded-3xl overflow-hidden shadow-lg grid grid-cols-1 md:grid-cols-2 items-center">

          {/* Promo Text */}
          <div className="p-10 sm:p-14 flex flex-col items-start gap-5">
            <span className="bg-pink-100 text-pink-600 text-xs font-semibold px-4 py-1.5 rounded-full">
              Promoción Especial 🌸
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-zinc-800 tracking-tight leading-tight">
              ¡Únete y guarda<br />tus favoritas!
            </h2>
            <p className="text-zinc-600 text-sm sm:text-base leading-relaxed max-w-md">
              Regístrate gratis, guarda las recetas que más te gusten y recibe trucos de repostería directamente en tu correo.
            </p>
            <Link
              href="/register"
              className="bg-pink-500 hover:bg-pink-600 text-white font-semibold px-7 py-3 rounded-xl shadow-lg shadow-pink-100 transition-all cursor-pointer text-sm"
            >
              Registrarse ahora →
            </Link>
          </div>

          {/* Promo decorative area */}
          <div className="hidden md:flex items-center justify-center p-10 bg-[#FFF5F5]">
            <div className="text-center">
              <div className="text-8xl mb-4">🧁</div>
              <div className="flex gap-3 justify-center text-5xl">
                <span>🍰</span>
                <span>🎂</span>
                <span>🍪</span>
              </div>
              <p className="mt-5 text-pink-400 font-serif text-lg italic">
                Dulzura en cada bocado
              </p>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
