import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Leemos la cookie donde guardaremos el token del usuario al hacer login
  const token = request.cookies.get("recetas_token")?.value;

  // Si el usuario intenta entrar a favoritos y NO tiene token, lo pateamos al login
  if (request.nextUrl.pathname.startsWith("/favorites") && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Si intenta ir al login o registro pero YA tiene token, lo mandamos al home
  if ((request.nextUrl.pathname.startsWith("/login") || request.nextUrl.pathname.startsWith("/register")) && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

// Aquí definimos en qué rutas exactas queremos que el Middleware ponga atención
export const config = {
  matcher: ["/favorites/:path*", "/login", "/register"],
};