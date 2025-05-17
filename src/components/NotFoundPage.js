import React from 'react';

const NotFoundPage = () => {
  return (
    <div className="modern-card error-card">
      <div className="error-icon">!</div>
      <h2 className="section-title">Access Error</h2>
      <p className="error-message">
        This page cannot be accessed directly. Please open it from the Hediyele app.
      </p>
      
      <div className="error-details">
        <p>To upgrade to premium features, please use the "Upgrade" button in your Hediyele app.</p>
        <p>If you're having trouble, please contact our support team for assistance.</p>
      </div>
      
      <div className="cta-container">
        
      </div>
    </div>
  );
};

export default NotFoundPage; 