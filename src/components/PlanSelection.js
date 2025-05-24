import React from 'react';

const PlanSelection = ({ onPlanSelect }) => {
  return (
    <div className="modern-card">
      <h2 className="section-title">Choose Your Premium Plan</h2>
      <p className="section-description">
        Unlock premium features and enhance your Hediyele experience
      </p>
      
      <div className="plans-container">
        <div className="plan-card">
          <div className="plan-header">
            <h3>Monthly</h3>
            <div className="price">
              <span className="currency">$</span>
              <span className="amount">5</span>
              <span className="period">/month</span>
            </div>
          </div>
          
          <div className="plan-features">
            <ul>
              <li>Premium gift recommendations</li>
              <li>Ad-free experience</li>
              <li>Monthly billing</li>
            </ul>
          </div>
          
          <button 
            className="plan-button"
            onClick={() => onPlanSelect('monthly', 5)}
          >
            Select
          </button>
        </div>

        <div className="plan-card featured">
          <div className="best-value">Best Value</div>
          <div className="plan-header">
            <h3>Annual</h3>
            <div className="price">
              <span className="currency">$</span>
              <span className="amount">50</span>
              <span className="period">/year</span>
            </div>
            <div className="savings">Save $10 per year</div>
          </div>
          
          <div className="plan-features">
            <ul>
              <li>Premium gift recommendations</li>
              <li>Ad-free experience</li>
              <li>Access to exclusive collections</li>
              <li>Annual billing</li>
            </ul>
          </div>
          
          <button 
            className="plan-button featured"
            onClick={() => onPlanSelect('annual', 50)}
          >
            Select
          </button>
        </div>
      </div>
      
      <div className="plan-info">
        <p>
          All plans include our premium features for the Hediyele mobile app.
          Cancel anytime.
        </p>
      </div>
    </div>
  );
};

export default PlanSelection; 