import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import { getUserFavorites } from "@/src/services/favorite";
import Link from "next/link";
import RecipeCard from "../components/RecipeCard";

export default async function FavoritesPage() {
  // revisamos si el usuario ya inició sesión leyendo las cookies
  const cookieStore = await cookies();
  const token = cookieStore.get("recetas_token")?.value;

  if (!token) {
    redirect("/login");
  }

  // sacamos el id del usuario desde su token para saber a quién buscarle los favoritos
  let userId: string;
  try {
    const secret = process.env.JWT_SECRET || "secreto_super_seguro_recetas";
    const decoded = jwt.verify(token, secret) as { id: string; name: string };
    userId = decoded.id;
  } catch {
    redirect("/login");
  }

  // pedimos a la base de datos las recetas que este usuario ha guardado
  const favorites = await getUserFavorites(userId);

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <span className="text-pink-500 font-medium tracking-widest text-xs uppercase">
          Tu colección personal
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-zinc-800 mt-2">
          ❤️ Mis Recetas Favoritas
        </h1>
        <div className="w-16 h-1 bg-pink-300 mx-auto mt-4 rounded-full" />
      </div>

      {/* Empty state */}
      {favorites.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-7xl mb-6">🍰</div>
          <h2 className="font-serif text-2xl font-bold text-zinc-700 mb-3">
            Aún no tienes favoritos
          </h2>
          <p className="text-zinc-500 text-sm mb-8 max-w-md mx-auto">
            Explora nuestro catálogo y guarda las recetas que más te gusten 
            haciendo clic en el botón de corazón.
          </p>
          <Link
            href="/"
            className="bg-pink-500 hover:bg-pink-600 text-white font-semibold px-8 py-3 rounded-xl shadow-lg shadow-pink-100 transition-all cursor-pointer text-sm"
          >
            Explorar catálogo →
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {favorites.map((recipe) => (
            <RecipeCard key={recipe._id} recipe={recipe} initialIsFavorite={true} />
          ))}
        </div>
      )}
    </div>
  );
}
