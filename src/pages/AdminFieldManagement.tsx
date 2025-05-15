"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"
import { Plus, Edit2, Trash2, X, MapPin, DollarSign, Users, Clock, AlertTriangle, Search, Check } from 'lucide-react'
import { toast } from "react-toastify"

// Modificar la interfaz Field para eliminar neighborhood
interface Field {
  id: number
  name: string
  type: string
  location: {
    address: string
    city: string
    province: string
  }
  price: number
  duration: number
  players: string
  amenities: string[]
  image: string
  active: boolean
}

const AdminFieldManagement: React.FC = () => {
  const { user } = useAuth()
  const navigate = useNavigate()

  // Actualizar los datos mock para quitar neighborhood y añadir province
  const [fields, setFields] = useState<Field[]>([
    {
      id: 1,
      name: "Cancha de Fútbol 5 - El Campito",
      type: "Fútbol 5",
      location: {
        address: "Av. Siempreviva 742",
        city: "Buenos Aires",
        province: "CABA",
      },
      price: 8000,
      duration: 60,
      players: "5 vs 5",
      amenities: ["Vestuarios", "Iluminación", "Estacionamiento"],
      image:
        "https://images.unsplash.com/photo-1508035353492-2a2a97a04a31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      active: true,
    },
    {
      id: 2,
      name: "Cancha de Tenis - Club Victoria",
      type: "Tenis",
      location: {
        address: "Calle Falsa 123",
        city: "Buenos Aires",
        province: "CABA",
      },
      price: 12000,
      duration: 90,
      players: "2 vs 2",
      amenities: ["Red Nueva", "Bebidas", "Profesor"],
      image:
        "https://images.unsplash.com/photo-1560275774-c945485b9336?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      active: true,
    },
    {
      id: 3,
      name: "Cancha de Padel - Padel Center",
      type: "Padel",
      location: {
        address: "Avenida Siempre Viva 742",
        city: "Buenos Aires",
        province: "CABA",
      },
      price: 10000,
      duration: 60,
      players: "2 vs 2",
      amenities: ["Paredes de Vidrio", "Iluminación LED", "Alquiler de Paletas"],
      image:
        "https://images.unsplash.com/photo-1662299397095-c2b1549509a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      active: true,
    },
  ])

  const [editingField, setEditingField] = useState<Field | null>(null)
  const [isAddingNew, setIsAddingNew] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  // Actualizar el estado inicial de newField
  const [newField, setNewField] = useState<Omit<Field, "id">>({
    name: "",
    type: "Fútbol 5",
    location: {
      address: "",
      city: "",
      province: "",
    },
    price: 0,
    duration: 60,
    players: "5 vs 5",
    amenities: [],
    image: "",
    active: true,
  })

  // Redirect if not admin
  useEffect(() => {
    if (!user?.isAdmin) {
      navigate("/")
    }
  }, [user, navigate])

  if (!user?.isAdmin) {
    return null
  }

  const handleEdit = (field: Field) => {
    setEditingField(field)
    setIsAddingNew(false)
  }

  const handleSave = (field: Field) => {
    setFields(fields.map((f) => (f.id === field.id ? field : f)))
    setEditingField(null)
    toast.success("Campo actualizado correctamente")
  }

  const handleDelete = (id: number) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este campo?")) {
      setFields(fields.filter((f) => f.id !== id))
      toast.success("Campo eliminado correctamente")
    }
  }

  const handleToggleActive = (id: number) => {
    setFields(fields.map((f) => (f.id === id ? { ...f, active: !f.active } : f)))

