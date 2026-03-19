"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Leaf, Eye, EyeOff, LogIn } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export default function LoginPage() {
  const [email, setEmail] = useState("sonia@nutricion.com");
  const [password, setPassword] = useState("demo1234");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Demo: cualquier email/contraseña entra
    await new Promise((r) => setTimeout(r, 800));

    if (email && password) {
      router.push("/dashboard");
    } else {
      setError("Por favor, introduce tu email y contraseña.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-warm-50 via-sage-50/30 to-terra-50/20 flex items-center justify-center p-4">
      {/* Decoración de fondo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-sage-100/40 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-terra-100/30 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Card de login */}
        <div className="bg-white rounded-3xl shadow-2xl border border-warm-100 overflow-hidden">
          {/* Cabecera */}
          <div className="bg-gradient-to-br from-sage-500 to-sage-600 px-8 py-10 text-center">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Leaf className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-1">Sonia Nutrición</h1>
            <p className="text-sage-100 text-sm">Herramienta profesional privada</p>
          </div>

          {/* Formulario */}
          <div className="px-8 py-8">
            <h2 className="text-lg font-semibold text-warm-900 mb-1">Bienvenida, Sonia</h2>
            <p className="text-sm text-warm-400 mb-6">Acceso exclusivo a tu herramienta de consulta</p>

            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="sonia@nutricion.com"
                required
                autoComplete="email"
              />
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-warm-700">Contraseña</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3.5 py-2.5 pr-10 bg-white border border-warm-200 rounded-xl text-sm
                               text-warm-900 placeholder-warm-400 focus:outline-none focus:ring-2
                               focus:ring-sage-300 focus:border-sage-400 transition-colors"
                    placeholder="••••••••"
                    required
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-warm-400 hover:text-warm-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-2.5 text-sm text-red-600">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                variant="primary"
                loading={loading}
                icon={<LogIn className="w-4 h-4" />}
                className="w-full justify-center py-3 mt-2"
              >
                Entrar
              </Button>
            </form>

            <div className="mt-6 p-3 bg-warm-50 rounded-xl border border-warm-100">
              <p className="text-xs text-warm-500 text-center">
                <span className="font-medium">Modo demo:</span> usa cualquier email y contraseña
              </p>
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-warm-400 mt-4">
          Acceso privado · Solo para uso profesional de Sonia
        </p>
      </div>
    </div>
  );
}
