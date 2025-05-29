'use client';

import type React from 'react';
import {
  Calendar,
  Clock,
  Users,
  MapPin,
  CreditCard,
  CheckCircle,
  AlertCircle,
  ChevronLeft,
  Repeat,
  Plus,
  Minus,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { useBooking } from '../../hooks/useBooking';
import {
  useFormValidation,
  bookingValidationSchema,
} from '../../hooks/useFormValidation';
import {
  additionalServices,
  recurrenceOptions,
  paymentMethods,
} from '../../services/mockData';
import RecurrenceSelector from '../RecurrenceSelector';

// Componente para el formulario de reserva
const BookingForm: React.FC = () => {
  const {
    field,
    loading,
    currentStep,
    bookingData,
    timeSlots,
    showRecurrenceOptions,
    showAdditionalServices,
    handleInputChange,
    handleTimeSelect,
    handleRecurrenceChange,
    handleRecurrenceCountChange,
    handleServiceToggle,
    calculateTotalPrice,
    handleNextStep,
    handlePrevStep,
    handleSubmit,
    formatDate,
    getRecurrenceDates,
    setShowRecurrenceOptions,
    setShowAdditionalServices,
    navigate,
  } = useBooking();

  const { validateForm, getFieldError, hasError } = useFormValidation(
    bookingValidationSchema
  );

  // Validar formulario antes de avanzar al siguiente paso
  const validateAndProceed = () => {
    // Determinar qué campos validar según el paso actual
    let fieldsToValidate = {};

    if (currentStep === 1) {
      fieldsToValidate = {
        date: bookingData.date,
        time: bookingData.time,
      };
    } else if (currentStep === 2) {
      fieldsToValidate = {
        contactName: bookingData.contactName,
        contactPhone: bookingData.contactPhone,
        contactEmail: bookingData.contactEmail,
      };
    } else if (currentStep === 3) {
      fieldsToValidate = {
        termsAccepted: bookingData.termsAccepted,
      };
    }

    const validationResult = validateForm(fieldsToValidate);

    if (validationResult.isValid) {
      handleNextStep();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (!field) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-700">
            Campo no encontrado
          </h2>
          <button
            onClick={() => navigate('/football/fields')}
            className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
          >
            Ver todos los campos
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <button
            onClick={() => navigate(`/football/fields/${field.id}`)}
            className="flex items-center text-emerald-600 hover:text-emerald-700 transition-colors"
          >
            <ChevronLeft className="h-5 w-5 mr-1" />
            Volver a detalles de la cancha
          </button>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            {/* Header */}
            <div className="bg-emerald-600 px-6 py-4 flex justify-between items-center">
              <h1 className="text-xl font-bold text-white">Reservar Cancha</h1>
              <div className="text-white font-semibold">{field.name}</div>
            </div>

            {/* Progress Steps */}
            <div className="px-6 pt-6">
              <div className="flex items-center justify-between mb-8">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      currentStep >= 1
                        ? 'bg-emerald-600 text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    1
                  </div>
                  <span className="text-sm mt-2 text-gray-600">
                    Fecha y Hora
                  </span>
                </div>
                <div
                  className={`flex-1 h-1 mx-4 ${
                    currentStep >= 2 ? 'bg-emerald-600' : 'bg-gray-200'
                  }`}
                ></div>
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      currentStep >= 2
                        ? 'bg-emerald-600 text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    2
                  </div>
                  <span className="text-sm mt-2 text-gray-600">
                    Datos de Contacto
                  </span>
                </div>
                <div
                  className={`flex-1 h-1 mx-4 ${
                    currentStep >= 3 ? 'bg-emerald-600' : 'bg-gray-200'
                  }`}
                ></div>
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      currentStep >= 3
                        ? 'bg-emerald-600 text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    3
                  </div>
                  <span className="text-sm mt-2 text-gray-600">Pago</span>
                </div>
              </div>
            </div>

            {/* Form Steps */}
            <form onSubmit={handleSubmit} className="px-6 pb-6">
              {/* Step 1: Date and Time */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/3">
                      <div className="aspect-video rounded-lg overflow-hidden mb-4">
                        <img
                          src={field.image || '/placeholder.svg'}
                          alt={field.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-semibold text-gray-900 mb-3">
                          {field.name}
                        </h3>
                        <div className="space-y-2 text-sm text-gray-600">
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-2 text-emerald-600" />
                            <span>
                              {field.location.address}, {field.location.city},{' '}
                              {field.location.province}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-2 text-emerald-600" />
                            <span>Duración: {field.duration} minutos</span>
                          </div>
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-2 text-emerald-600" />
                            <span>
                              Tipo: {field.type} ({field.players})
                            </span>
                          </div>
                          <div className="flex items-center font-semibold text-emerald-600">
                            <CreditCard className="h-4 w-4 mr-2" />
                            <span>${field.price}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="md:w-2/3 space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Fecha de Reserva
                        </label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <input
                            type="date"
                            name="date"
                            value={bookingData.date}
                            onChange={handleInputChange}
                            className={`pl-10 w-full border ${
                              hasError('date')
                                ? 'border-red-500'
                                : 'border-gray-300'
                            } rounded-lg p-2`}
                            min={new Date().toISOString().split('T')[0]}
                          />
                        </div>
                        {getFieldError('date') && (
                          <p className="mt-1 text-sm text-red-500">
                            {getFieldError('date')}
                          </p>
                        )}
                      </div>

                      {/* Time Slots */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Horario Disponible
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          {timeSlots.map((slot) => (
                            <button
                              key={slot}
                              type="button"
                              onClick={() => handleTimeSelect(slot)}
                              className={`py-2 px-3 rounded-lg text-center transition-colors ${
                                bookingData.time === slot
                                  ? 'bg-emerald-600 text-white'
                                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                              }`}
                            >
                              {slot}
                            </button>
                          ))}
                        </div>
                        {getFieldError('time') && (
                          <p className="mt-1 text-sm text-red-500">
                            {getFieldError('time')}
                          </p>
                        )}
                      </div>

                      {/* Recurrence Selector */}
                      {bookingData.date && bookingData.time && (
                        <RecurrenceSelector
                          onRecurrenceChange={handleRecurrenceChange}
                          selectedDate={bookingData.date}
                        />
                      )}

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Cantidad de Jugadores
                        </label>
                        <input
                          type="number"
                          name="players"
                          min="1"
                          max="22"
                          value={bookingData.players}
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                        <p className="text-sm text-gray-500 mt-1">
                          Esto nos ayuda a preparar la cancha adecuadamente
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Contact Information */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nombre Completo
                      </label>
                      <input
                        type="text"
                        name="contactName"
                        value={bookingData.contactName}
                        onChange={handleInputChange}
                        className={`w-full border ${
                          hasError('contactName')
                            ? 'border-red-500'
                            : 'border-gray-300'
                        } rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                        required
                      />
                      {hasError('contactName') && (
                        <p className="mt-1 text-sm text-red-500">
                          {getFieldError('contactName')}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Teléfono de Contacto
                      </label>
                      <input
                        type="tel"
                        name="contactPhone"
                        value={bookingData.contactPhone}
                        onChange={handleInputChange}
                        className={`w-full border ${
                          hasError('contactPhone')
                            ? 'border-red-500'
                            : 'border-gray-300'
                        } rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                        placeholder="11-1234-5678"
                        required
                      />
                      {hasError('contactPhone') && (
                        <p className="mt-1 text-sm text-red-500">
                          {getFieldError('contactPhone')}
                        </p>
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        name="contactEmail"
                        value={bookingData.contactEmail}
                        onChange={handleInputChange}
                        className={`w-full border ${
                          hasError('contactEmail')
                            ? 'border-red-500'
                            : 'border-gray-300'
                        } rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                        required
                      />
                      {hasError('contactEmail') && (
                        <p className="mt-1 text-sm text-red-500">
                          {getFieldError('contactEmail')}
                        </p>
                      )}
                      <p className="text-sm text-gray-500 mt-1">
                        Te enviaremos la confirmación de la reserva a este email
                      </p>
                    </div>
                  </div>

                  {/* Servicios Adicionales */}
                  {field.hasAdditionalServices && (
                    <div className="border border-gray-200 rounded-lg p-4">
                      <button
                        type="button"
                        onClick={() =>
                          setShowAdditionalServices(!showAdditionalServices)
                        }
                        className="flex justify-between items-center w-full"
                      >
                        <div className="flex items-center">
                          <Plus className="h-5 w-5 mr-2 text-emerald-600" />
                          <span className="font-medium">
                            Servicios Adicionales
                          </span>
                        </div>
                        {showAdditionalServices ? (
                          <ChevronUp className="h-5 w-5 text-gray-500" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-gray-500" />
                        )}
                      </button>

                      {showAdditionalServices && (
                        <div className="mt-4 space-y-2">
                          <div className="space-y-3">
                            {additionalServices.map((service) => (
                              <div
                                key={service.id}
                                className={`border rounded-lg p-3 cursor-pointer transition-colors ${
                                  bookingData.additionalServices.includes(
                                    service.id
                                  )
                                    ? 'border-emerald-500 bg-emerald-50'
                                    : 'border-gray-200 hover:border-emerald-300 hover:bg-emerald-50/50'
                                }`}
                                onClick={() => handleServiceToggle(service.id)}
                              >
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center">
                                    <div
                                      className={`p-2 rounded-full mr-3 ${
                                        bookingData.additionalServices.includes(
                                          service.id
                                        )
                                          ? 'bg-emerald-100 text-emerald-600'
                                          : 'bg-gray-100 text-gray-500'
                                      }`}
                                    >
                                      {service.icon}
                                    </div>
                                    <div>
                                      <h4 className="font-medium">
                                        {service.name}
                                      </h4>
                                      <p className="text-sm text-gray-600">
                                        {service.description}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <span className="font-semibold text-emerald-600">
                                      ${service.price}
                                    </span>
                                    <div className="mt-1">
                                      <input
                                        type="checkbox"
                                        checked={bookingData.additionalServices.includes(
                                          service.id
                                        )}
                                        onChange={() => {}} // Controlado por el onClick del div padre
                                        className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Notas adicionales sobre servicios
                          </label>
                          <textarea
                            name="additionalServicesNotes"
                            value={bookingData.additionalServicesNotes || ''}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            rows={3}
                            placeholder="Describe cualquier detalle adicional sobre los servicios seleccionados"
                          />
                        </div>
                      )}
                    </div>
                  )}

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <AlertCircle className="h-5 w-5 text-blue-500" />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-blue-800">
                          Información importante
                        </h3>
                        <div className="mt-2 text-sm text-blue-700">
                          <ul className="list-disc pl-5 space-y-1">
                            <li>
                              Llega 15 minutos antes de tu horario reservado
                            </li>
                            <li>
                              Trae tu propio equipo (pelotas, pecheras, etc.)
                            </li>
                            <li>
                              En caso de lluvia, la cancha puede estar cerrada
                            </li>
                            <li>
                              Cancelaciones con menos de 24hs tienen un cargo
                              del 50%
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Payment */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <h3 className="font-semibold text-gray-900 mb-3">
                      Resumen de la Reserva
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Cancha:</p>
                        <p className="font-medium">{field.name}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Tipo:</p>
                        <p className="font-medium">{field.type}</p>
                      </div>

                      {bookingData.recurrence === 'none' ? (
                        <>
                          <div>
                            <p className="text-gray-600">Fecha:</p>
                            <p className="font-medium">
                              {formatDate(bookingData.date)}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-600">Hora:</p>
                            <p className="font-medium">{bookingData.time}hs</p>
                          </div>
                        </>
                      ) : (
                        <div className="md:col-span-2">
                          <p className="text-gray-600">Fechas:</p>
                          <div className="font-medium">
                            <p className="mb-1">
                              {
                                recurrenceOptions.find(
                                  (o) => o.id === bookingData.recurrence
                                )?.name
                              }{' '}
                              -{bookingData.recurrenceCount}{' '}
                              {bookingData.recurrence === 'weekly'
                                ? 'semanas'
                                : bookingData.recurrence === 'biweekly'
                                ? 'quincenas'
                                : 'meses'}
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-sm">
                              {getRecurrenceDates().map((date, index) => (
                                <p key={date}>
                                  {index + 1}. {formatDate(date)} -{' '}
                                  {bookingData.time}hs
                                </p>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      <div>
                        <p className="text-gray-600">Duración:</p>
                        <p className="font-medium">{field.duration} minutos</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Jugadores:</p>
                        <p className="font-medium">{bookingData.players}</p>
                      </div>
                    </div>

                    {/* Servicios adicionales seleccionados */}
                    {bookingData.additionalServices.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <p className="text-gray-600 mb-2">
                          Servicios adicionales:
                        </p>
                        <div className="space-y-2">
                          {bookingData.additionalServices.map((serviceId) => {
                            const service = additionalServices.find(
                              (s) => s.id === serviceId
                            );
                            return service ? (
                              <div
                                key={service.id}
                                className="flex justify-between"
                              >
                                <div className="flex items-center">
                                  <div className="p-1 bg-emerald-100 rounded-full mr-2 text-emerald-600">
                                    {service.icon}
                                  </div>
                                  <span>{service.name}</span>
                                </div>
                                <span className="font-medium">
                                  ${service.price}
                                </span>
                              </div>
                            ) : null;
                          })}
                        </div>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Método de Pago
                    </label>
                    <div className="space-y-3">
                      {paymentMethods.map((method) => (
                        <label
                          key={method.id}
                          className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                            bookingData.paymentMethod === method.id
                              ? 'border-emerald-500 bg-emerald-50'
                              : 'border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          <input
                            type="radio"
                            name="paymentMethod"
                            value={method.id}
                            checked={bookingData.paymentMethod === method.id}
                            onChange={handleInputChange}
                            className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300"
                          />
                          <div className="ml-3 flex items-center">
                            <span className="text-xl mr-3">{method.icon}</span>
                            <span className="font-medium">{method.name}</span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    {/* Desglose de precios */}
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between">
                        <span className="text-gray-700">Precio base</span>
                        <span className="font-medium">${field.price}</span>
                      </div>

                      {bookingData.recurrence !== 'none' && (
                        <div className="flex justify-between">
                          <span className="text-gray-700">
                            Descuento por reserva{' '}
                            {recurrenceOptions
                              .find((o) => o.id === bookingData.recurrence)
                              ?.name.toLowerCase()}
                          </span>
                          <span className="font-medium text-green-600">
                            -
                            {
                              recurrenceOptions.find(
                                (o) => o.id === bookingData.recurrence
                              )?.discount
                            }
                            %
                          </span>
                        </div>
                      )}

                      {bookingData.recurrence !== 'none' && (
                        <div className="flex justify-between">
                          <span className="text-gray-700">
                            Subtotal por {bookingData.recurrenceCount}{' '}
                            {bookingData.recurrence === 'weekly'
                              ? 'semanas'
                              : bookingData.recurrence === 'biweekly'
                              ? 'quincenas'
                              : 'meses'}
                          </span>
                          <span className="font-medium">
                            $
                            {(
                              field.price *
                              (1 -
                                (recurrenceOptions.find(
                                  (o) => o.id === bookingData.recurrence
                                )?.discount || 0) /
                                  100) *
                              bookingData.recurrenceCount
                            ).toFixed(0)}
                          </span>
                        </div>
                      )}

                      {bookingData.additionalServices.length > 0 && (
                        <div className="flex justify-between">
                          <span className="text-gray-700">
                            Servicios adicionales
                          </span>
                          <span className="font-medium">
                            $
                            {bookingData.additionalServices.reduce(
                              (total, serviceId) => {
                                const service = additionalServices.find(
                                  (s) => s.id === serviceId
                                );
                                return total + (service ? service.price : 0);
                              },
                              0
                            )}
                          </span>
                        </div>
                      )}

                      <div className="border-t border-gray-200 pt-2 mt-2"></div>
                    </div>

                    <div className="flex justify-between font-semibold text-lg mt-4">
                      <span>Total</span>
                      <span className="text-emerald-600">
                        ${calculateTotalPrice().toFixed(0)}
                      </span>
                    </div>
                  </div>

                  <div className="mt-6">
                    <label className="flex items-start">
                      <input
                        type="checkbox"
                        name="termsAccepted"
                        checked={bookingData.termsAccepted}
                        onChange={handleInputChange}
                        className={`h-4 w-4 mt-1 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded ${
                          hasError('termsAccepted') ? 'border-red-500' : ''
                        }`}
                        required
                      />
                      <span className="ml-2 text-sm text-gray-600">
                        Acepto los{' '}
                        <a
                          href="#"
                          className="text-emerald-600 hover:underline"
                        >
                          términos y condiciones
                        </a>{' '}
                        y la{' '}
                        <a
                          href="#"
                          className="text-emerald-600 hover:underline"
                        >
                          política de privacidad
                        </a>
                      </span>
                    </label>
                    {hasError('termsAccepted') && (
                      <p className="mt-1 text-sm text-red-500">
                        {getFieldError('termsAccepted')}
                      </p>
                    )}
                  </div>
                  <p className="text-center text-sm text-gray-600 mb-4">
                    Se realizará un cargo del 10% del valor total a través de
                    Mercado Pago o Transferencia Bancaria
                  </p>
                </div>
              )}

              {/* Resumen de Reserva */}
              {bookingData.date && bookingData.time && (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-2">
                    Resumen de Reserva
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-blue-700">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>
                        Primera reserva: {formatDate(bookingData.date)}
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-blue-700">
                      <Clock className="h-4 w-4 mr-2" />
                      <span>Horario: {bookingData.time}</span>
                    </div>
                    {bookingData.recurrence !== 'none' && (
                      <div>
                        <div className="flex items-center text-sm text-blue-700">
                          <Repeat className="h-4 w-4 mr-2" />
                          <span>
                            Recurrencia:{' '}
                            {
                              recurrenceOptions.find(
                                (opt) => opt.id === bookingData.recurrence
                              )?.name
                            }
                          </span>
                        </div>
                        <div className="mt-2">
                          <div className="text-sm text-blue-700 mb-1">
                            Fechas programadas:
                          </div>
                          <div className="bg-white rounded p-2 max-h-32 overflow-y-auto">
                            {getRecurrenceDates().map((date, index) => (
                              <div
                                key={date}
                                className="text-sm text-gray-600 py-1"
                              >
                                {index + 1}. {formatDate(date)}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="flex items-center text-sm font-medium text-emerald-700 mt-2">
                      <CreditCard className="h-4 w-4 mr-2" />
                      <span>
                        Precio Total: ${calculateTotalPrice().toLocaleString()}
                        {bookingData.recurrence !== 'none' && (
                          <span className="text-xs ml-2">
                            (Incluye descuento del{' '}
                            {
                              recurrenceOptions.find(
                                (opt) => opt.id === bookingData.recurrence
                              )?.discount
                            }
                            %)
                          </span>
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="mt-8 flex justify-between">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Anterior
                  </button>
                ) : (
                  <div></div>
                )}

                {currentStep < 3 ? (
                  <button
                    type="button"
                    onClick={validateAndProceed}
                    className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                  >
                    Siguiente
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                        Procesando...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="h-5 w-5 mr-2" />
                        Confirmar Reserva
                      </>
                    )}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
