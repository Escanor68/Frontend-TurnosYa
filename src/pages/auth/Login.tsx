"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import { Mail, Lock, ClubIcon as Soccer } from "lucide-react"
import { toast } from "react-toastify"
import { useAuth } from "../../context/AuthContext"

const Login: React.FC = () => {
  const navigate = useNavigate()
  const { login, isAuthenticated } = useAuth()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  // Redirigir si ya está autenticado
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/")
    }
  }, [isAuthenticated, navigate])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
    // Limpiar mensaje de error cuando el usuario empieza a escribir
    if (error) setError("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      // Para depuración
      console.log("Intentando login con:", formData)

      const success = await login(formData.email, formData.password)

      if (success) {
        toast.success("¡Inicio de sesión exitoso!")

        // Check if there's a redirect URL in the query params
        const params = new URLSearchParams(window.location.search)
        const redirectUrl = params.get("redirect") || "/"

        navigate(redirectUrl)
      } else {
        setError("Credenciales inválidas. Por favor intenta nuevamente.")
        toast.error("Credenciales inválidas. Por favor intenta nuevamente.")
      }
    } catch (error) {
      console.error("Error de inicio de sesión:", error)
      setError("Error al iniciar sesión. Por favor intenta nuevamente.")
      toast.error("Error al iniciar sesión. Por favor intenta nuevamente.")
    } finally {
      setLoading(false)
    }
  }

  // Para depuración - mostrar credenciales de prueba
  const fillTestCredentials = (type: "admin" | "owner" | "user") => {
    if (type === "admin") {
      setFormData({
        email: "admin@example.com",
        password: "admin123",
      })
    } else if (type === "owner") {
      setFormData({
        email: "owner@example.com",
        password: "owner123",
      })
    } else {
      setFormData({
        email: "demo@example.com",
        password: "password",
      })
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center">
            <Soccer className="h-12 w-12 text-emerald-600" />
          </div>
          <h2 className="mt-4 text-3xl font-extrabold text-gray-900">Iniciar sesión</h2>
          <p className="mt-2 text-gray-600">
            ¿No tienes una cuenta?{" "}
            <Link to="/register" className="font-medium text-emerald-600 hover:text-emerald-500">
              Regístrate aquí
            </Link>
          </p>
        </div>

        <div className="bg-white py-8 px-6 shadow rounded-lg">
          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Correo electrónico
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="tu@email.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Contraseña
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="********"
                />
              </div>
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Recordarme
                  </label>
                </div>
                <div className="text-sm">
                  <a href="#" className="font-medium text-emerald-600 hover:text-emerald-500">
                    ¿Olvidaste tu contraseña?
                  </a>
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 ${
                  loading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {loading ? "Iniciando sesión..." : "Iniciar sesión"}
              </button>
            </div>
          </form>

          {/* Botones de ayuda para desarrollo */}
          <div className="mt-4 border-t pt-4">
            <p className="text-sm text-gray-500 mb-2">Credenciales de prueba:</p>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => fillTestCredentials("admin")}
                className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-800 py-1 px-2 rounded"
              >
                Super Admin
              </button>
              <button
                type="button"
                onClick={() => fillTestCredentials("owner")}
                className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-800 py-1 px-2 rounded"
              >
                Propietario
              </button>
              <button
                type="button"
                onClick={() => fillTestCredentials("user")}
                className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-800 py-1 px-2 rounded"
              >
                Jugador
              </button>
            </div>
          </div>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">O continuar con</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <span className="sr-only">Iniciar sesión con Google</span>
                <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
                </svg>
              </button>

              <button
                type="button"
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <span className="sr-only">Iniciar sesión con Facebook</span>
                <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
