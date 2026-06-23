import mongoose, { Schema, model, models } from "mongoose";

// 1. Definimos la estructura del documento en MongoDB
const recipeSchema = new Schema(
  {
    name: { type: String, required: true },
    imageUrl: { type: String, required: true },
    prepTime: { type: String, required: true }, // Ej: "45 min"
    difficulty: { type: String, required: true }, // Ej: "Fácil"
    ingredients: { type: [String], required: true },
    steps: { type: [String], required: true },
    servings: { type: Number, required: true },
  },
  { 
    timestamps: true // Esto agrega automáticamente 'createdAt' y 'updatedAt'
  }
);

// 2. Exportamos el modelo. 
// Validamos si ya existe en 'models' para evitar errores al recargar en Next.js
const Recipe = models.Recipe || model("Recipe", recipeSchema);

export default Recipe;