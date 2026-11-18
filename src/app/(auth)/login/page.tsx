"use client";

import { useState } from "react";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { Home } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMensaje("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/"); // Redirige al dashboard
    } catch (err: any) {
      setError("Credenciales incorrectas o usuario no existe.");
    }
  };

  const handleResetPassword = async () => {
    if (!email) {
      setError("Por favor, ingresa tu correo primero.");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      setMensaje("Te enviamos un correo para restablecer tu contraseña.");
      setError("");
    } catch (err: any) {
      setError("Error al enviar el correo. Verifica el email.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <div className="flex justify-center mb-6 text-blue-900">
          <Home size={48} />
        </div>
        <h1 className="text-2xl font-bold text-center text-blue-900 mb-2">
          Residencia Tacuarembó
        </h1>
        <p className="text-center text-gray-500 mb-8">RE.Control - Acceso al sistema</p>

        {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">{error}</div>}
        {mensaje && <div className="bg-green-100 text-green-700 p-3 rounded mb-4 text-sm">{mensaje}</div>}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Iniciar Sesión
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={handleResetPassword}
            className="text-sm text-blue-600 hover:underline"
          >
            ¿Olvidaste tu contraseña?
          </button>
        </div>
      </div>
    </div>
  );
}