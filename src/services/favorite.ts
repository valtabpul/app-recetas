import { connectDB } from "@/src/lib/mongodb";
import Favorite from "@/src/models/Favorites";
import Recipe from "@/src/models/Recipe"; // importamos Recipe para que el populate funcione correctamente

export async function toggleFavorite(userId: string, recipeId: string) {
  try {
    await connectDB();
    
    // buscamos si el usuario ya tiene esta receta en sus favoritos
    const existingFavorite = await Favorite.findOne({ userId, recipeId });

    if (existingFavorite) {
      // si ya la tiene guardada, significa que quiere quitarla de favoritos
      await Favorite.findByIdAndDelete(existingFavorite._id);
      return { isFavorite: false, message: "Receta eliminada de favoritos." };
    } else {
      // si no la encontramos, la agregamos a su lista
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
    
    // buscamos todos los favoritos del usuario
    // usamos populate para traernos todos los datos de la receta y no solo su id
    // y ordenamos para que salgan los más recientes primero
    const favorites = await Favorite.find({ userId })
      .populate("recipeId")
      .sort({ createdAt: -1 })
      .lean();

    // mapeamos la respuesta para devolver directamente los objetos de las recetas
    return favorites.map((fav: any) => ({
      ...fav.recipeId,
      _id: fav.recipeId._id.toString()
    }));
  } catch (error) {
    console.error("Error al obtener los favoritos:", error);
    throw new Error("No se pudieron cargar tus recetas favoritas.");
  }
}