import React, { useState } from 'react';
import { validateCreditCard, setPremiumStatus } from '../services/api';

const PaymentForm = ({ uid, onSuccess, plan, amount }) => {
  const [cardNumber, setCardNumber] = useState('');
  const [cvv, setCvv] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cardholderName, setCardholderName] = useState('');
  const [error, setError] = useState('');
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setProcessing(true);

    try {
      // First validate the credit card
      const validationResult = validateCreditCard(cardNumber, cvv, expiryDate);
      
      if (!validationResult.success) {
        setError(validationResult.error);
        setProcessing(false);
        return;
      }
      
      // If card is valid, attempt to set premium status
      const premiumResult = await setPremiumStatus(uid, true);
      
      if (premiumResult.success) {
        onSuccess();
      } else {
        setError(premiumResult.error);
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      console.error(err);
    } finally {
      setProcessing(false);
    }
  };

  // Format card number with spaces after every 4 digits
  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    
    for (let i = 0; i < match.length; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  // Format expiry date as MM/YY
  const formatExpiryDate = (value) => {
    const v = value.replace(/\D/g, '');
    
    if (v.length > 2) {
      return `${v.slice(0, 2)}/${v.slice(2, 4)}`;
    }
    
    return v;
  };

  return (
    <div className="modern-card payment-card">
      <h2 className="section-title">Complete Your Payment</h2>
      
      <div className="order-summary">
        <div className="summary-title">Order Summary</div>
        <div className="summary-row">
          <span>Plan</span>
          <span>{plan === 'monthly' ? 'Monthly' : 'Annual'} Premium</span>
        </div>
        <div className="summary-row">
          <span>Amount</span>
          <span className="summary-price">${amount}</span>
        </div>
        <div className="summary-divider"></div>
        <div className="summary-row total">
          <span>Total</span>
          <span className="summary-price">${amount}</span>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="payment-form">
        <div className="form-group">
          <label htmlFor="cardholderName">Cardholder Name</label>
          <input
            type="text"
            id="cardholderName"
            value={cardholderName}
            onChange={(e) => setCardholderName(e.target.value)}
            placeholder="John Smith"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="cardNumber">Card Number</label>
          <div className="card-number-input">
            <input
              type="text"
              id="cardNumber"
              value={cardNumber}
              onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
              placeholder="1111 2222 3333 4444"
              maxLength="19"
              required
            />
            <div className="card-type-icon"></div>
          </div>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="expiryDate">Expiry Date</label>
            <input
              type="text"
              id="expiryDate"
              value={expiryDate}
              onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))}
              placeholder="MM/YY"
              maxLength="5"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="cvv">CVV</label>
            <input
              type="text"
              id="cvv"
              value={cvv}
              onChange={(e) => setCvv(e.target.value.replace(/\D/g, ''))}
              placeholder="123"
              maxLength="3"
              required
            />
          </div>
        </div>
        
        {error && <div className="error-message">{error}</div>}
        
        <button 
          type="submit" 
          className="payment-button" 
          disabled={processing}
        >
          {processing ? (
            <div className="spinner"></div>
          ) : (
            `Pay $${amount} Now`
          )}
        </button>
      </form>
      
      <div className="secure-badge">
        <div className="security-icon"></div>
        <span>Your payment is secure and encrypted</span>
      </div>
      
      <div className="test-card-note">
        <div className="test-card-label">Test Card:</div>
        <div className="test-card-details">
          <span>1111 2222 3333 4444</span>
          <span>Exp: 11/29</span>
          <span>CVV: 123</span>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm; 