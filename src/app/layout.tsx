import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { cookies } from "next/headers";
import Link from "next/link";
import jwt from "jsonwebtoken";
// 1. Corregimos la ruta de la Server Action
import { logoutAction } from "@/src/app/actions";
// 2. Importamos el Provider OBLIGATORIO para HeroUI
import { Providers } from "@heroui/react";

const poppins = Poppins({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"], 
});

export const metadata: Metadata = {
  title: "Recetario Maestro",
  description: "Descubre y guarda tus recetas favoritas",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const token = cookieStore.get("recetas_token")?.value;

  // Extraer nombre del usuario del JWT
  let userName: string | null = null;
  if (token) {
    try {
      const secret = process.env.JWT_SECRET || "secreto_super_seguro_recetas";
      const decoded = jwt.verify(token, secret) as { id: string; name: string };
      userName = decoded.name;
    } catch {
      // Token inválido, se ignora
    }
  }

  return (
    <html lang="es" className="light">
      <body className={`${poppins.className} antialiased text-foreground bg-background`}>
        {/* 3. ENVOLVEMOS TODO EL DISEÑO EN EL PROVIDER */}
        <Providers>
          {/* Header/Navbar — rosa pastel claro */}
          <header className="sticky top-0 z-50 w-full bg-[#FFE4E6] border-b border-pink-200/60 shadow-sm">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
              {/* Logo */}
              <Link href="/" className="flex items-center gap-2">
                <span className="font-serif text-2xl font-bold tracking-tight text-pink-400">
                  🍰 Recetario Maestro
                </span>
              </Link>

              {/* Navigation Links */}
              <nav className="flex items-center gap-5">
                <Link
                  href="/"
                  className="text-sm font-medium text-pink-700/80 hover:text-pink-400 transition-colors"
                >
                  Catálogo
                </Link>
                {token && userName ? (
                  <>
                    {/* Saludo con nombre del usuario */}
                    <span className="text-sm font-semibold text-pink-400 hidden sm:inline-flex items-center gap-1">
                      👋 Hola, {userName}
                    </span>
                    <Link
                      href="/favorites"
                      className="text-sm font-medium text-pink-700/80 hover:text-pink-600 transition-colors"
                    >
                      ❤️ Mis Favoritos
                    </Link>
                    <form action={logoutAction} className="inline m-0 p-0">
                      <button
                        type="submit"
                        className="text-sm font-medium text-pink-700/80 hover:text-pink-600 transition-colors cursor-pointer bg-transparent border-none outline-none font-sans"
                      >
                        Cerrar Sesión
                      </button>
                    </form>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="text-sm font-medium text-pink-700/80 hover:text-pink-600 transition-colors"
                    >
                      Iniciar Sesión
                    </Link>
                    <Link
                      href="/register"
                      className="inline-flex items-center justify-center rounded-full bg-pink-500 px-5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-pink-600 transition-colors"
                    >
                      Registrarse
                    </Link>
                  </>
                )}
              </nav>
            </div>
          </header>

          {/* Main Content Area */}
          <main className="flex-1 flex flex-col">{children}</main>

          {/* Footer — rosa pastel */}
          <footer className="bg-[#FFE4E6] border-t border-pink-200/60 py-8 text-center text-xs text-pink-500 mt-auto">
            <div className="mx-auto max-w-7xl px-6">
              <p>© {new Date().getFullYear()} Recetario Maestro. Diseñado con amor y dulzura. 🌸</p>
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  );
}