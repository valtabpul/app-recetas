import mongoose, { Schema, model, models } from "mongoose";

const favoriteSchema = new Schema(
  {
    // Hacemos referencia a los IDs de las otras colecciones
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    recipeId: { type: Schema.Types.ObjectId, ref: "Recipe", required: true },
  },
  { 
    timestamps: true 
  }
);

// Índice único: Evita que el mismo usuario guarde la misma receta dos veces
favoriteSchema.index({ userId: 1, recipeId: 1 }, { unique: true });

// Mongoose creará automáticamente la colección "favorites"
const Favorite = models.Favorite || model("Favorite", favoriteSchema);

export default Favorite;