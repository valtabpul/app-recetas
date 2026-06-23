import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || process.env.DATABASE_URL;

if (!MONGODB_URI) {
  throw new Error("Por favor define la variable MONGODB_URI o DATABASE_URL en tu archivo .env");
}

// 1. Definimos la estructura de la conexión en caché
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// 2. Le indicamos a TypeScript que globalThis puede guardar esta caché
const globalForMongoose = globalThis as unknown as { mongoose?: MongooseCache };

// 3. Reutilizamos la caché existente o creamos una nueva
const cached: MongooseCache = globalForMongoose.mongoose || { conn: null, promise: null };

if (!globalForMongoose.mongoose) {
  globalForMongoose.mongoose = cached;
}

export async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI!, opts).then((mongooseInstance) => {
      console.log("🔥 Conectado exitosamente a MongoDB");
      return mongooseInstance;
    });
  }
  
  cached.conn = await cached.promise;
  return cached.conn;
}