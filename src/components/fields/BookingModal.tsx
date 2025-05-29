import React from 'react';
import Modal from 'react-modal';
import { X, Calendar, Clock, Users, CreditCard } from 'lucide-react';

// Set up Modal for accessibility
Modal.setAppElement('#root');

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  fieldName: string;
  date: string;
  time: string;
  duration: number;
  players: string;
  price: number;
  onConfirm: () => void;
  isLoading?: boolean;
}

const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  fieldName,
  date,
  time,
  duration,
  players,
  price,
  onConfirm,
  isLoading = false,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-xl w-full max-w-md p-6"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <div className="relative">
        <button
          onClick={onClose}
          className="absolute top-0 right-0 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="h-6 w-6" />
        </button>

        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Confirmar Reserva
        </h2>

        <div className="space-y-4 mb-6">
          <div>
            <h3 className="font-semibold text-gray-900">{fieldName}</h3>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center">
              <Calendar className="h-5 w-5 text-emerald-500 mr-2" />
              <span className="text-gray-600">{date}</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-emerald-500 mr-2" />
              <span className="text-gray-600">
                {time} ({duration} min)
              </span>
            </div>
          </div>

          <div className="flex items-center">
            <Users className="h-5 w-5 text-emerald-500 mr-2" />
            <span className="text-gray-600">{players}</span>
          </div>

          <div className="flex items-center justify-between pt-4 border-t">
            <span className="text-gray-600">Total a pagar:</span>
            <div className="flex items-center text-emerald-600 font-bold text-xl">
              <CreditCard className="h-5 w-5 mr-2" />
              <span>${price.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="flex space-x-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className={`flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors ${
              isLoading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? 'Procesando...' : 'Confirmar'}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default BookingModal;
