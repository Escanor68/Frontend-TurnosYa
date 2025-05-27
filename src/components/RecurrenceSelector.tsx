import React from "react"
import { Repeat, Calendar } from "lucide-react"

interface RecurrenceSelectorProps {
  onRecurrenceChange: (recurrence: { type: string; weekDay: number; count: number }) => void
  selectedDate: string
}

const RecurrenceSelector: React.FC<RecurrenceSelectorProps> = ({ onRecurrenceChange, selectedDate }) => {
  const [weekDay, setWeekDay] = React.useState<number>(-1)
  const [count, setCount] = React.useState<number>(4)

  React.useEffect(() => {
    if (selectedDate) {
      const date = new Date(selectedDate)
      setWeekDay(date.getDay())
    }
  }, [selectedDate])

  const weekDays = [
    { value: 0, label: "Domingo" },
    { value: 1, label: "Lunes" },
    { value: 2, label: "Martes" },
    { value: 3, label: "Miércoles" },
    { value: 4, label: "Jueves" },
    { value: 5, label: "Viernes" },
    { value: 6, label: "Sábado" }
  ]

  // Obtener fechas recurrentes basadas en la configuración
  const getRecurrenceDates = () => {
    if (!selectedDate || weekDay === -1) return []

    const dates = []
    const startDate = new Date(selectedDate)
    
    // Ajustar la fecha inicial al próximo día de la semana seleccionado
    while (startDate.getDay() !== weekDay) {
      startDate.setDate(startDate.getDate() + 1)
    }

    for (let i = 0; i < count; i++) {
      const currentDate = new Date(startDate)
      currentDate.setDate(currentDate.getDate() + (i * 7))
      dates.push(currentDate.toISOString().split("T")[0])
    }

    return dates
  }

  // Formatear fecha para mostrar
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("es-ES", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric"
    })
  }

  const handleWeekDayChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newWeekDay = parseInt(e.target.value)
    setWeekDay(newWeekDay)
    onRecurrenceChange({
      type: newWeekDay === -1 ? "none" : "weekly",
      weekDay: newWeekDay,
      count
    })
  }

  const handleCountChange = (newCount: number) => {
    const validCount = Math.min(Math.max(newCount, 1), 12)
    setCount(validCount)
    if (weekDay !== -1) {
      onRecurrenceChange({
        type: "weekly",
        weekDay,
        count: validCount
      })
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex items-center mb-4">
        <Repeat className="h-5 w-5 mr-2 text-emerald-600" />
        <h3 className="text-lg font-semibold">Reservas Recurrentes</h3>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Repetir cada</label>
          <select
            value={weekDay}
            onChange={handleWeekDayChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value={-1}>Sin repetición</option>
            {weekDays.map((day) => (
              <option key={day.value} value={day.value}>
                {day.label}
              </option>
            ))}
          </select>
        </div>

        {weekDay !== -1 && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Durante cuántas semanas</label>
              <div className="flex items-center">
                <button
                  type="button"
                  onClick={() => handleCountChange(count - 1)}
                  className="px-3 py-1 border border-gray-300 rounded-l text-gray-700 hover:bg-gray-50"
                  disabled={count <= 1}
                >
                  -
                </button>
                <span className="px-4 py-1 border-t border-b border-gray-300 bg-white">{count}</span>
                <button
                  type="button"
                  onClick={() => handleCountChange(count + 1)}
                  className="px-3 py-1 border border-gray-300 rounded-r text-gray-700 hover:bg-gray-50"
                  disabled={count >= 12}
                >
                  +
                </button>
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
                  <div key={date} className="flex items-center justify-between py-1 border-b border-gray-100 last:border-0">
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
