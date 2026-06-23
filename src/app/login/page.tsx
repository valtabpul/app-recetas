"use client";

import { useState } from "react";
import { loginAction } from "@/src/app/actions";
import { Card, CardContent, CardHeader, Input, Button } from "@heroui/react";
import Link from "next/link";

export default function LoginPage() {
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const res = await loginAction(formData);

    if (res?.error) {
      setError(res.error);
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center px-6 py-12 bg-gradient-to-tr from-[#FFF5F5] via-[#FAF6F6] to-[#FFE3E3]">
      <Card className="w-full max-w-md border border-pink-100 bg-white shadow-xl rounded-3xl p-6">
        <CardHeader className="flex flex-col items-center gap-1 pb-4">
          <span className="text-3xl">🍪</span>
          <h1 className="font-serif text-3xl font-bold tracking-tight text-pink-600">
            Iniciar Sesión
          </h1>
          <p className="text-zinc-500 text-sm text-center">
            Ingresa tus credenciales para acceder a tus recetas
          </p>
        </CardHeader>

        <hr className="border-pink-100/50 mb-6" />

        <CardContent className="p-0">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Error Message */}
            {error && (
              <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl text-center font-medium">
                {error}
              </div>
            )}

            {/* Email Input */}
            <div className="flex flex-col gap-1.5">
              <label className="text-zinc-600 text-sm font-semibold">Correo electrónico</label>
              <Input
                required
                name="email"
                type="email"
                placeholder="ejemplo@correo.com"
                variant="primary"
                className="w-full border border-pink-100 hover:border-pink-300 focus-within:!border-pink-500 rounded-xl px-3 py-2 bg-white text-zinc-800 transition-colors outline-none"
              />
            </div>

            {/* Password Input */}
            <div className="flex flex-col gap-1.5">
              <label className="text-zinc-600 text-sm font-semibold">Contraseña</label>
              <Input
                required
                name="password"
                type="password"
                placeholder="••••••••"
                variant="primary"
                className="w-full border border-pink-100 hover:border-pink-300 focus-within:!border-pink-500 rounded-xl px-3 py-2 bg-white text-zinc-800 transition-colors outline-none"
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              isDisabled={loading}
              className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2.5 rounded-xl shadow-lg shadow-pink-100 disabled:opacity-50 cursor-pointer text-center flex items-center justify-center"
            >
              {loading ? "Iniciando sesión..." : "Entrar"}
            </Button>
          </form>

          {/* Register Link */}
          <div className="mt-6 text-center">
            <p className="text-zinc-500 text-sm">
              ¿No tienes cuenta?{" "}
              <Link
                href="/register"
                className="font-semibold text-pink-600 hover:text-pink-700 transition-colors"
              >
                Regístrate
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
