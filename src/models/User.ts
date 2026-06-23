import mongoose, { Schema, model, models } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { 
    timestamps: true // Esto agrega automáticamente la fecha de registro (createdAt)
  }
);

// Mongoose creará automáticamente la colección "users"
const User = models.User || model("User", userSchema);

export default User;