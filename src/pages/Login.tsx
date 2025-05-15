"use client"

import type React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { login } from "../api/auth" // Assuming you have an auth API
import "./Login.css"

const Login: React.FC = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  // Update the handleSubmit function to properly handle login
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const success = await login(email, password)
      if (success) {
        // Check if there's a redirect URL in the query params
        const params = new URLSearchParams(window.location.search)
        const redirectUrl = params.get("redirect") || "/"

        // For admin users, redirect to admin dashboard
        const storedUser = localStorage.getItem("user")
        if (storedUser) {
          const userData = JSON.parse(storedUser)
          if (userData.isAdmin) {
            navigate("/admin")
            return
          }
        }

        navigate(redirectUrl)
      } else {
        setError("Credenciales inválidas. Por favor intenta nuevamente.")
      }
    } catch (err) {
      setError("Ocurrió un error al iniciar sesión. Por favor intenta nuevamente.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Correo Electrónico:</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Iniciando Sesión..." : "Iniciar Sesión"}
        </button>
      </form>
    </div>
  )
}

export default Login
