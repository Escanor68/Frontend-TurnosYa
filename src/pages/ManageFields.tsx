"use client"

import React from "react"
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"

const ManageFields: React.FC = () => {
  const { user } = useAuth()
  const navigate = useNavigate()

  // Redirect if not field owner
  React.useEffect(() => {
    if (!user?.hasFields) {
      navigate("/")
    }
  }, [user, navigate])

  if (!user?.hasFields) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Administrar Canchas</h1>
          <p className="text-gray-600 mt-2">Aquí puedes gestionar tus canchas.</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Mis Canchas</h2>
          <p>Feature coming soon...</p>
          {/* Aquí iría la lógica para listar y gestionar las canchas del usuario */}
        </div>
      </div>
    </div>
  )
}

export default ManageFields
