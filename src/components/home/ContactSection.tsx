import React, { useState } from 'react';

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implementar la lógica de envío del formulario
    console.log('Form data:', formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div id="contacto" className="bg-gray-50 dark:bg-gray-900 py-5">
      <div className="container d-flex justify-content-center align-items-center min-vh-50">
        <div className="card shadow-lg p-4 w-100" style={{ maxWidth: '420px' }}>
          <h2 className="text-center mb-4 fw-bold">Contacto</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label fw-semibold">
                Nombre
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label fw-semibold">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="message" className="form-label fw-semibold">
                Mensaje
              </label>
              <textarea
                className="form-control"
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="btn btn-success w-100 fw-bold"
              disabled={!formData.name || !formData.email || !formData.message}
            >
              Enviar mensaje
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
