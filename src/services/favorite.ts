import { connectDB } from "@/src/lib/mongodb";
import Favorite from "@/src/models/Favorites";
import Recipe from "@/src/models/Recipe"; // Necesario para que populate sepa qué buscar

export async function toggleFavorite(userId: string, recipeId: string) {
  try {
    await connectDB();
    const existingFavorite = await Favorite.findOne({ userId, recipeId });

    if (existingFavorite) {
      // Si existe, lo borramos (quitamos el marcador)
      await Favorite.findByIdAndDelete(existingFavorite._id);
      return { isFavorite: false, message: "Receta eliminada de favoritos." };
    } else {
      // Si no existe, lo creamos
      await Favorite.create({ userId, recipeId });
      return { isFavorite: true, message: "Receta guardada en favoritos." };
    }
  } catch (error) {
    console.error("Error al modificar favoritos:", error);
    throw new Error("No se pudo actualizar el estado de favoritos.");
  }
}

export async function getUserFavorites(userId: string) {
  try {
    await connectDB();
    // populate("recipeId") trae toda la info de la receta en lugar de solo mostrar el ID
    const favorites = await Favorite.find({ userId })
      .populate("recipeId")
      .sort({ createdAt: -1 })
      .lean();

    // Extraemos solo las recetas de la respuesta
    return favorites.map((fav: any) => ({
      ...fav.recipeId,
      _id: fav.recipeId._id.toString()
    }));
  } catch (error) {
    console.error("Error al obtener los favoritos:", error);
    throw new Error("No se pudieron cargar tus recetas favoritas.");
  }
}