"use server";

import { loginUser, registerUser } from "@/src/services/auth";
import { toggleFavorite, getUserFavorites } from "@/src/services/favorite";
import { connectDB } from "@/src/lib/mongodb";
import Favorite from "@/src/models/Favorites";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";

// ─── Helpers ───

/** Extrae el userId del JWT almacenado en cookies */
async function getUserIdFromCookie(): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("recetas_token")?.value;
  if (!token) return null;

  try {
    const secret = process.env.JWT_SECRET || "secreto_super_seguro_recetas";
    const decoded = jwt.verify(token, secret) as { id: string };
    return decoded.id;
  } catch {
    return null;
  }
}

// ─── Auth Actions ───

export async function loginAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    const { token } = await loginUser({ email, password });

    // Guardamos el token en las cookies del navegador
    const cookieStore = await cookies();
    cookieStore.set("recetas_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 7 días
      path: "/",
    });

  } catch (error) {
    return { error: "Credenciales inválidas" };
  }

  // Redirigimos al home si el login fue exitoso
  redirect("/");
}

export async function registerAction(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    await registerUser({ name, email, password });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Error al crear la cuenta";
    return { error: message };
  }

  redirect("/login");
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("recetas_token");
  redirect("/login");
}

// ─── Favorite Actions ───

export async function toggleFavoriteAction(recipeId: string) {
  const userId = await getUserIdFromCookie();
  if (!userId) {
    return { error: "Debes iniciar sesión para guardar favoritos." };
  }

  try {
    const result = await toggleFavorite(userId, recipeId);
    return result;
  } catch (error) {
    return { error: "No se pudo actualizar el estado de favoritos." };
  }
}

export async function checkIsFavorite(recipeId: string): Promise<boolean> {
  const userId = await getUserIdFromCookie();
  if (!userId) return false;

  try {
    await connectDB();
    const existing = await Favorite.findOne({ userId, recipeId }).lean();
    return !!existing;
  } catch {
    return false;
  }
}