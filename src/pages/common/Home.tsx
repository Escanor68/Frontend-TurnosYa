"use client"

import { useState } from "react"
import { Navigate } from "react-router-dom"

interface Filters {
  location: string
  date: string
  fieldType: string
  priceRange: string
  amenities: string[]
}

export default function Home() {
  const [filters, setFilters] = useState<Filters>({
    location: "",
    date: "",
    fieldType: "",
    priceRange: "",
    amenities: [],
  })

  // Redirigir a la página de campos de fútbol
  return <Navigate to="/football/fields" replace />
}
