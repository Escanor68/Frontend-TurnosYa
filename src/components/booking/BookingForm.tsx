'use client';

import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useBooking } from '../../hooks/useBooking';
import {
  ChevronLeft,
  Calendar,
  Clock,
  Users,
  AlertCircle,
  CheckCircle,
  Loader2,
  ArrowRight,
  Info,
} from 'lucide-react';

export const BookingForm: React.FC = React.memo(() => {
  const navigate = useNavigate();
  const { bookingData, handleInputChange, currentStep, handlePrevStep } =
    useBooking();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = useCallback(() => {
    const newErrors: Record<string, string> = {};

    if (!bookingData.date) {
      newErrors.date = 'La fecha es requerida';
    } else {
      const selectedDate = new Date(bookingData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        newErrors.date = 'No puedes reservar fechas pasadas';
      }
    }

    if (!bookingData.time) {
      newErrors.time = 'La hora es requerida';
    }

    if (!bookingData.players || bookingData.players < 2) {
      newErrors.players = 'Mínimo 2 jugadores';
    } else if (bookingData.players > 22) {
      newErrors.players = 'Máximo 22 jugadores';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [bookingData]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (!validateForm()) {
        return;
      }

      setIsSubmitting(true);
      try {
        // Simular delay de procesamiento
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Lógica de envío
        navigate('/payment');
      } catch (error) {
        console.error('Error al crear la reserva:', error);
        setErrors({
          submit: 'Error al procesar la reserva. Intenta nuevamente.',
        });
      } finally {
        setIsSubmitting(false);
      }
    },
    [navigate, validateForm]
  );

  const handlePrevStepClick = useCallback(() => {
    handlePrevStep();
  }, [handlePrevStep]);

  const handleInputChangeLocal = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name } = e.target;

      // Limpiar error del campo cuando el usuario empiece a escribir
      if (errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: '' }));
      }

      handleInputChange(e);
    },
    [errors, handleInputChange]
  );

  const isFirstStep = currentStep === 1;
  const isFormValid =
    bookingData.date &&
    bookingData.time &&
    bookingData.players >= 2 &&
    bookingData.players <= 22;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-100"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Progress Indicator */}
        <div className="card shadow-sm border-0 mb-4">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h2 className="h4 fw-bold text-dark mb-0">
                Detalles de la Reserva
              </h2>
              <span className="badge bg-primary px-3 py-2">
                Paso {currentStep} de 3
              </span>
            </div>
            <div className="progress" style={{ height: '8px' }}>
              <div
                className="progress-bar bg-success"
                style={{ width: `${(currentStep / 3) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {errors.submit && (
          <motion.div
            className="alert alert-danger d-flex align-items-start"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
          >
            <AlertCircle className="me-2 mt-1" size={20} />
            <div>
              <h6 className="alert-heading fw-bold">Error</h6>
              <p className="mb-0">{errors.submit}</p>
            </div>
          </motion.div>
        )}

        {/* Form Fields */}
        <div className="card shadow-sm border-0">
          <div className="card-body">
            <div className="row g-4">
              {/* Date Field */}
              <div className="col-12">
                <label htmlFor="date" className="form-label fw-bold">
                  <Calendar className="me-2" size={16} />
                  Fecha de la reserva
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={bookingData.date}
                  onChange={handleInputChangeLocal}
                  className={`form-control form-control-lg ${
                    errors.date ? 'is-invalid' : ''
                  }`}
                  aria-label="Fecha de la reserva"
                  aria-describedby={errors.date ? 'date-error' : undefined}
                />
                {errors.date && (
                  <motion.div
                    id="date-error"
                    className="invalid-feedback d-block"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                  >
                    <AlertCircle className="me-1" size={14} />
                    {errors.date}
                  </motion.div>
                )}
              </div>

              {/* Time Field */}
              <div className="col-12">
                <label htmlFor="time" className="form-label fw-bold">
                  <Clock className="me-2" size={16} />
                  Hora de inicio
                </label>
                <input
                  type="time"
                  id="time"
                  name="time"
                  value={bookingData.time}
                  onChange={handleInputChangeLocal}
                  className={`form-control form-control-lg ${
                    errors.time ? 'is-invalid' : ''
                  }`}
                  aria-label="Hora de inicio"
                  aria-describedby={errors.time ? 'time-error' : undefined}
                />
                {errors.time && (
                  <motion.div
                    id="time-error"
                    className="invalid-feedback d-block"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                  >
                    <AlertCircle className="me-1" size={14} />
                    {errors.time}
                  </motion.div>
                )}
              </div>

              {/* Players Field */}
              <div className="col-12">
                <label htmlFor="players" className="form-label fw-bold">
                  <Users className="me-2" size={16} />
                  Número de jugadores
                </label>
                <div className="input-group input-group-lg">
                  <input
                    type="number"
                    id="players"
                    name="players"
                    min="2"
                    max="22"
                    value={bookingData.players}
                    onChange={handleInputChangeLocal}
                    className={`form-control ${
                      errors.players ? 'is-invalid' : ''
                    }`}
                    aria-label="Número de jugadores"
                    aria-describedby={
                      errors.players ? 'players-error' : undefined
                    }
                  />
                  <span className="input-group-text">jugadores</span>
                </div>
                {errors.players && (
                  <motion.div
                    id="players-error"
                    className="invalid-feedback d-block"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                  >
                    <AlertCircle className="me-1" size={14} />
                    {errors.players}
                  </motion.div>
                )}
                <div className="form-text d-flex align-items-center mt-2">
                  <Info className="me-1" size={14} />
                  Mínimo 2, máximo 22 jugadores
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Summary Card */}
        <div className="card bg-light border-0">
          <div className="card-body">
            <h6 className="card-title fw-bold mb-3">
              <CheckCircle className="me-2 text-success" size={16} />
              Resumen de la Reserva
            </h6>
            <div className="row g-3">
              <div className="col-md-4">
                <div className="d-flex align-items-center">
                  <Calendar className="me-2 text-muted" size={16} />
                  <div>
                    <small className="text-muted d-block">Fecha</small>
                    <span className="fw-medium">
                      {bookingData.date
                        ? new Date(bookingData.date).toLocaleDateString('es-AR')
                        : 'No seleccionada'}
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="d-flex align-items-center">
                  <Clock className="me-2 text-muted" size={16} />
                  <div>
                    <small className="text-muted d-block">Hora</small>
                    <span className="fw-medium">
                      {bookingData.time || 'No seleccionada'}
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="d-flex align-items-center">
                  <Users className="me-2 text-muted" size={16} />
                  <div>
                    <small className="text-muted d-block">Jugadores</small>
                    <span className="fw-medium">
                      {bookingData.players || 0}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="d-flex flex-column flex-sm-row gap-3 pt-4 border-top">
          <motion.button
            type="button"
            onClick={handlePrevStepClick}
            disabled={isFirstStep || isSubmitting}
            className={`btn btn-outline-secondary btn-lg flex-fill ${
              isFirstStep ? 'opacity-50' : ''
            }`}
            whileHover={!isFirstStep ? { scale: 1.02 } : {}}
            whileTap={!isFirstStep ? { scale: 0.98 } : {}}
          >
            <ChevronLeft className="me-2" size={20} />
            Anterior
          </motion.button>

          <motion.button
            type="submit"
            disabled={isSubmitting || !isFormValid}
            className={`btn btn-success btn-lg flex-fill ${
              !isFormValid ? 'opacity-50' : ''
            }`}
            whileHover={isFormValid ? { scale: 1.02 } : {}}
            whileTap={isFormValid ? { scale: 0.98 } : {}}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="me-2" size={20} />
                Procesando...
              </>
            ) : (
              <>
                Continuar
                <ArrowRight className="ms-2" size={20} />
              </>
            )}
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
});

BookingForm.displayName = 'BookingForm';
