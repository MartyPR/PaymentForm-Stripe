import React, { useState } from 'react';
import axios from 'axios';

const PaymentForm = () => {
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [formData, setFormData] = useState({
    amount: '',
    email: '',
    cardNumber: '',
    cvv: '',
    expirationDate: '',
    cardHolderName: '',
    payerDocument: '',
    payerDocumentType: 'CC',
    billingStreet1: '',
    billingCity: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/payment', {
        ...formData,
        paymentMethod: paymentMethod === 'credit-card' ? 'VISA' : 'PSE'
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Realizar Pago</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Correo Electrónico:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full mt-2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Monto:</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            className="w-full mt-2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Método de Pago:</label>
          <select
            name="paymentMethod"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full mt-2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          >
            <option value="credit-card">Tarjeta de Crédito/Débito</option>
            <option value="pse">PSE</option>
          </select>
        </div>

        {paymentMethod === 'credit-card' && (
          <>
            <div className="mb-4">
              <label className="block text-gray-700">Número de Tarjeta:</label>
              <input
                type="text"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
                className="w-full mt-2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">CVV:</label>
              <input
                type="text"
                name="cvv"
                value={formData.cvv}
                onChange={handleChange}
                className="w-full mt-2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Fecha de Expiración:</label>
              <input
                type="text"
                name="expirationDate"
                value={formData.expirationDate}
                onChange={handleChange}
                className="w-full mt-2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Nombre en la Tarjeta:</label>
              <input
                type="text"
                name="cardHolderName"
                value={formData.cardHolderName}
                onChange={handleChange}
                className="w-full mt-2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                required
              />
            </div>
          </>
        )}

        {paymentMethod === 'pse' && (
          <>
            <div className="mb-4">
              <label className="block text-gray-700">Tipo de Documento:</label>
              <select
                name="payerDocumentType"
                value={formData.payerDocumentType}
                onChange={handleChange}
                className="w-full mt-2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              >
                <option value="CC">Cédula de Ciudadanía</option>
                <option value="NIT">NIT</option>
                <option value="CE">Cédula de Extranjería</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Número de Documento:</label>
              <input
                type="text"
                name="payerDocument"
                value={formData.payerDocument}
                onChange={handleChange}
                className="w-full mt-2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Teléfono de Contacto:</label>
              <input
                type="text"
                name="contactPhone"
                value={formData.contactPhone}
                onChange={handleChange}
                className="w-full mt-2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Dirección de Facturación:</label>
              <input
                type="text"
                name="billingStreet1"
                value={formData.billingStreet1}
                onChange={handleChange}
                className="w-full mt-2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Ciudad de Facturación:</label>
              <input
                type="text"
                name="billingCity"
                value={formData.billingCity}
                onChange={handleChange}
                className="w-full mt-2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                required
              />
            </div>
          </>
        )}

        <div>
          <button type="submit" className="w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600">
            Pagar
          </button>
        </div>
      </form>
    </div>
  );
};

export default PaymentForm;
