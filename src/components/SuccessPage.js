import React from 'react';

const SuccessPage = ({ plan, amount }) => {
  return (
    <div className="modern-card success-card">
      <div className="success-icon">✓</div>
      <h2 className="section-title">Payment Successful!</h2>
      <p className="success-message">
        Thank you for upgrading to Hediyele Premium. Your subscription has been activated.
      </p>
      
      <div className="order-details">
        <div className="details-title">Subscription Details</div>
        <div className="details-row">
          <span>Plan</span>
          <span>{plan === 'monthly' ? 'Monthly' : 'Annual'} Premium</span>
        </div>
        <div className="details-row">
          <span>Amount</span>
          <span className="details-price">${amount}</span>
        </div>
        <div className="details-row">
          <span>Status</span>
          <span className="status-active">Active</span>
        </div>
      </div>
      
      <div className="benefits-list">
        <h3>You now have access to:</h3>
        <ul>
          <li>Premium gift recommendations</li>
          <li>Ad-free experience</li>
          <li>Priority customer support</li>
          {plan === 'annual' && <li>Exclusive collections</li>}
        </ul>
      </div>
      
      <div className="cta-container">
        
        
        <button 
          className="secondary-button"
          onClick={() => window.close()}
        >
          Close Window
        </button>
      </div>
    </div>
  );
};

export default SuccessPage; 