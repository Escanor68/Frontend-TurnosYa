"use client"

import type React from "react"
import { useParams, useLocation, useNavigate } from "react-router-dom"
import { useEffect } from "react"
import BookingForm from "../../../components/booking/BookingForm"

// Componente contenedor para la página de reservas
const Booking: React.FC = () => {
  const { fieldId } = useParams<{ fieldId: string }>()
  const location = useLocation()
  const navigate = useNavigate()

  // Obtener parámetros de la URL
  const searchParams = new URLSearchParams(location.search)
  const directPayment = searchParams.get("directPayment") === "true"

  // Redirigir al formulario directo si se solicita
  useEffect(() => {
    if (directPayment && fieldId) {
      // Crear una nueva URL sin el parámetro directPayment
      const newSearchParams = new URLSearchParams(searchParams)
      newSearchParams.delete("directPayment")

      // Redirigir al formulario directo
      navigate(`/football/direct-booking/${fieldId}?${newSearchParams.toString()}`)
    }
  }, [directPayment, fieldId, navigate, searchParams])

  return <BookingForm />
}

export default Booking
