"use client"

import React from "react"
import { Repeat, Plus, Minus, Calendar } from "lucide-react"

interface RecurrenceOption {
  id: string
  name: string
  discount: number
}

interface RecurrenceSelectorProps {
  onRecurrenceChange: (recurrence: string, count: number) => void
  selectedDate: string
}

const RecurrenceSelector: React.FC<RecurrenceSelectorProps> = ({ onRecurrenceChange, selectedDate }) => {
  const [recurrence, setRecurrence] = React.useState<string>("none")
  const [recurrenceCount, setRecurrenceCount] = React.useState<number>(4)

  // Opciones de recurrencia
  const recurrenceOptions: RecurrenceOption[] = [
    { id: "none", name: "Sin recurrencia", discount: 0 },
    { id: "weekly", name: "Semanal", discount: 5 },
    { id: "biweekly", name: "Quincenal", discount: 3 },
    { id: "monthly", name: "Mensual", discount: 2 },
  ]

  // Obtener fechas recurrentes basadas en la configuración
  const getRecurrenceDates = () => {
    if (recurrence === "none" || !selectedDate) return []

    const dates = []
    const startDate = new Date(selectedDate)

    for (let i = 0; i < recurrenceCount; i++) {
      const currentDate = new Date(startDate)

      if (recurrence === "weekly") {
        currentDate.setDate(currentDate.getDate() + i * 7)
      } else if (recurrence === "biweekly") {
        currentDate.setDate(currentDate.getDate() + i * 14)
      } else if (recurrence === "monthly") {
        currentDate.setMonth(currentDate.getMonth() + i)
      }

      dates.push(currentDate.toISOString().split("T")[0])
    }

    return dates
  }

  // Formatear fecha para mostrar
  const formatDate = (dateString: string) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toLocaleDateString("es-ES", { weekday: "long", day: "numeric", month: "long" })
  }

  const handleRecurrenceChange = (recurrenceId: string) => {
    setRecurrence(recurrenceId)
    onRecurrenceChange(recurrenceId, recurrenceCount)
  }

  const handleRecurrenceCountChange = (increment: boolean) => {
    const newCount = increment ? Math.min(recurrenceCount + 1, 12) : Math.max(recurrenceCount - 1, 2)

    setRecurrenceCount(newCount)
    onRecurrenceChange(recurrence, newCount)
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex items-center mb-4">
        <Repeat className="h-5 w-5 mr-2 text-emerald-600" />
        <h3 className="text-lg font-semibold">Reservas Recurrentes</h3>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Frecuencia de Reserva</label>
          <div className="grid grid-cols-2 gap-2">
            {recurrenceOptions.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => handleRecurrenceChange(option.id)}
                className={`py-2 px-3 rounded-lg text-center transition-colors ${
                  recurrence === option.id ? "bg-emerald-600 text-white" : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}
              >
                {option.name}
                {option.discount > 0 && (
                  <span className="block text-xs mt-1">
                    {recurrence === option.id ? "Descuento " : ""}
                    {option.discount}% {recurrence !== option.id ? "descuento" : ""}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {recurrence !== "none" && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Número de Repeticiones</label>
              <div className="flex items-center">
                <button
                  type="button"
                  onClick={() => handleRecurrenceCountChange(false)}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 h-8 w-8 rounded-l-lg flex items-center justify-center"
                  disabled={recurrenceCount <= 2}
                >
                  <Minus className="h-4 w-4" />
                </button>
                <div className="h-8 px-4 flex items-center justify-center border-t border-b border-gray-300 bg-white">
                  {recurrenceCount}
                </div>
                <button
                  type="button"
                  onClick={() => handleRecurrenceCountChange(true)}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 h-8 w-8 rounded-r-lg flex items-center justify-center"
                  disabled={recurrenceCount >= 12}
                >
                  <Plus className="h-4 w-4" />
                </button>
                <span className="ml-3 text-sm text-gray-600">
                  {recurrence === "weekly" && "semanas"}
                  {recurrence === "biweekly" && "quincenas"}
                  {recurrence === "monthly" && "meses"}
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>Fechas Programadas</span>
                </div>
              </label>
              <div className="bg-gray-50 p-3 rounded-lg max-h-32 overflow-y-auto">
                {getRecurrenceDates().map((date, index) => (
                  <div
                    key={date}
                    className="flex items-center justify-between py-1 border-b border-gray-100 last:border-0"
                  >
                    <span className="text-sm">
                      {index + 1}. {formatDate(date)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default RecurrenceSelector
