import { connectDB } from "@/src/lib/mongodb";
import Recipe from "@/src/models/Recipe";

export async function getRecipes() {
  try {
    await connectDB(); // Siempre nos aseguramos de estar conectados primero
    let recipes = await Recipe.find().sort({ createdAt: -1 }).lean(); 
    
    // Si no hay recetas en la base de datos, sembramos las 3 del mockup
    if (recipes.length === 0) {
      const sampleRecipes = [
        {
          name: "Pastel de Vainilla y Frambuesa",
          imageUrl: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&auto=format&fit=crop",
          prepTime: "1h 30m",
          difficulty: "Media",
          servings: 8,
          ingredients: [
            "2 tazas de harina de trigo",
            "1 taza de azúcar blanca",
            "3 huevos medianos",
            "1 taza de frambuesas frescas",
            "Crema chantilly de vainilla para decorar",
            "Esencia de vainilla de alta calidad"
          ],
          steps: [
            "Precalentar el horno a 180°C y engrasar un molde redondo.",
            "Batir los huevos junto con el azúcar hasta alcanzar punto letra.",
            "Tamizar la harina e incorporarla con movimientos envolventes suaves.",
            "Verter en el molde y hornear durante 35-40 minutos.",
            "Dejar enfriar, rellenar con crema y decorar con las frambuesas frescas."
          ]
        },
        {
          name: "Tarta Velvet de Fresa",
          imageUrl: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=800&auto=format&fit=crop",
          prepTime: "1h 10m",
          difficulty: "Media",
          servings: 6,
          ingredients: [
            "150g de fresas trituradas",
            "1 y 1/2 tazas de harina tamizada",
            "1/2 taza de mantequilla a temperatura ambiente",
            "1 taza de azúcar mascabado",
            "Frosting de queso crema suave"
          ],
          steps: [
            "Mezclar la mantequilla pomada con el azúcar hasta que quede cremosa.",
            "Agregar los huevos uno a uno, seguido del puré natural de fresas.",
            "Incorporar la harina y hornear a 175°C por 30 minutos.",
            "Dejar enfriar por completo y cubrir con abundante frosting y fresas enteras."
          ]
        },
        {
          name: "Cupcake de Ensueño Rosa",
          imageUrl: "https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?w=800&auto=format&fit=crop",
          prepTime: "45 min",
          difficulty: "Fácil",
          servings: 12,
          ingredients: [
            "1 taza de harina de repostería",
            "1/2 taza de leche entera",
            "1 huevo",
            "Colorante rosa apto para alimentos",
            "Crema de mantequilla (buttercream) sabor fresa",
            "Chispitas de colores de azúcar"
          ],
          steps: [
            "Mezclar los ingredientes secos en un tazón grande.",
            "Unificar con los ingredientes líquidos y unas gotas de colorante rosa.",
            "Verter la mezcla en moldes con capacillos y hornear a 180°C durante 18 minutos.",
            "Decorar usando manga pastelera con crema de mantequilla y chispas."
          ]
        }
      ];
      await Recipe.create(sampleRecipes);
      recipes = await Recipe.find().sort({ createdAt: -1 }).lean(); 
    }
    
    // Convertimos el _id de MongoDB a un string normal para no tener problemas en el frontend
    return recipes.map(recipe => ({
      ...recipe,
      _id: recipe._id.toString()
    }));
  } catch (error) {
    console.error("Error al obtener las recetas:", error);
    throw new Error("No se pudieron cargar las recetas del catálogo.");
  }
}

export async function getRecipeById(id: string) {
  try {
    await connectDB();
    const recipe = await Recipe.findById(id).lean();
    if (!recipe) {
      return null;
    }
    return {
      ...recipe,
      _id: recipe._id.toString()
    };
  } catch (error) {
    console.error(`Error al obtener la receta con id ${id}:`, error);
    throw new Error("No se pudo cargar el detalle de la receta.");
  }
}
