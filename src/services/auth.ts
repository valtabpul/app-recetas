import bcrypt from "bcrypt";
import { sendWelcomeEmail } from "@/src/services/email";
import jwt from "jsonwebtoken";
import { connectDB } from "@/src/lib/mongodb";
import User from "@/src/models/User";
import { RegisterUserData, LoginUserData } from "@/src/types/types";

// Busca un usuario por correo
export async function getUserByEmail(email: string) {
  try {
    await connectDB();
    const user = await User.findOne({ email }).lean();
    return user ? { ...user, _id: user._id.toString() } : null;
  } catch (error) {
    console.error("Error en getUserByEmail:", error);
    throw new Error("No se pudo buscar la información del usuario.");
  }
}

// Registra un nuevo usuario
export async function registerUser(userData: RegisterUserData) {
  try {
    // 1. Validamos que no haya cuentas duplicadas
    const existingUser = await getUserByEmail(userData.email);

    if (existingUser) {
      throw new Error("Este correo ya está registrado en el recetario.");
    }

    // 2. Encriptamos la contraseña para cumplir con los estándares de seguridad
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    // 3. Guardamos el usuario en MongoDB
    await connectDB();
    const newUser = await User.create({
      name: userData.name,
      email: userData.email,
      password: hashedPassword,
    });

    // 4. Disparamos el correo de bienvenida automático
    await sendWelcomeEmail(newUser.email, newUser.name);

    // Convertimos a objeto plano de JS y el _id a string para compatibilidad con Next.js
    const userObject = newUser.toObject();
    return { ...userObject, _id: userObject._id.toString() };

  } catch (error) {
    console.error("Error en registerUser:", error);
    throw error;
  }
}

// Inicia sesión
export async function loginUser(data: LoginUserData) {
  try {
    // 1. Buscamos al usuario
    const user = await User.findOne({ email: data.email }).lean();
    if (!user) {
      throw new Error("Correo o contraseña incorrectos.");
    }

    // 2. Comparamos la contraseña encriptada
    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) {
      throw new Error("Correo o contraseña incorrectos.");
    }

    // 3. Generamos el Token con el ID y el nombre (para mostrarlo en el Navbar)
    const secret = process.env.JWT_SECRET || "secreto_super_seguro_recetas";
    const token = jwt.sign(
      {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
      },
      secret,
      { expiresIn: "7d" } // El usuario se mantendrá logueado por 7 días
    );

    return { 
      user: { ...user, _id: user._id.toString() }, 
      token 
    };
  } catch (error) {
    console.error("Error en loginUser:", error);
    throw error;
  }
}