import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import PlanSelection from './components/PlanSelection';
import PaymentForm from './components/PaymentForm';
import SuccessPage from './components/SuccessPage';
import NotFoundPage from './components/NotFoundPage';

// Main app wrapper with router
function App() {
  return (
    <Router>
      <div className="app-container">
        <header>
          <div className="logo-container">
            <span className="logo">Hediyele</span>
            <span className="premium-badge">Premium</span>
          </div>
        </header>
        <Routes>
          <Route path="/" element={<MainApp />} />
          <Route path="/payment" element={<MainApp initialStep="payment" />} />
          <Route path="/success" element={<MainApp initialStep="success" />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

// Main app component that handles state
function MainApp({ initialStep = "planSelection" }) {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [uid, setUid] = useState('');
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedAmount, setSelectedAmount] = useState(0);
  const [hasValidUid, setHasValidUid] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Check for URL params or sessionStorage on first load
  useEffect(() => {
    // First check sessionStorage for stored uid
    const storedUid = sessionStorage.getItem('hediyele_uid');
    const urlParams = new URLSearchParams(window.location.search);
    const userIdParam = urlParams.get('uid');
    
    if (userIdParam) {
      setUid(userIdParam);
      setHasValidUid(true);
      // Store UID in sessionStorage for persistence
      sessionStorage.setItem('hediyele_uid', userIdParam);
      
      // Keep the UID in URL to make it easier for testing
      // Only log that we've received it
      console.log(`Received user ID from URL: ${userIdParam}`);
    } else if (storedUid) {
      // Use UID from sessionStorage if available
      setUid(storedUid);
      setHasValidUid(true);
      console.log(`Using stored user ID`);
    } else if (location.state?.uid) {
      setUid(location.state.uid);
      setHasValidUid(true);
      sessionStorage.setItem('hediyele_uid', location.state.uid);
    } else {
      // No UID found in URL, sessionStorage or state
      setHasValidUid(false);
    }
    
    // Set plan info from location state if available
    if (location.state?.plan) {
      setSelectedPlan(location.state.plan);
      setSelectedAmount(location.state.amount);
    }
  }, [location.state]);

  const handlePlanSelect = (plan, amount) => {
    setSelectedPlan(plan);
    setSelectedAmount(amount);
    setCurrentStep('payment');
    navigate('/payment', { state: { uid, plan, amount } });
  };

  const handlePaymentSuccess = () => {
    console.log(`Setting premium status for user: ${uid}`);
    setCurrentStep('success');
    navigate('/success', { state: { uid, plan: selectedPlan, amount: selectedAmount } });
  };

  // If no valid UID is found, show the not found page
  if (!hasValidUid) {
    return <NotFoundPage />;
  }

  // Render different components based on current step
  const renderStep = () => {
    switch (currentStep) {
      case 'planSelection':
        return <PlanSelection onPlanSelect={handlePlanSelect} />;
      case 'payment':
        return (
          <PaymentForm 
            uid={uid} 
            onSuccess={handlePaymentSuccess} 
            plan={selectedPlan}
            amount={selectedAmount}
          />
        );
      case 'success':
        return (
          <SuccessPage 
            plan={selectedPlan}
            amount={selectedAmount}
          />
        );
      default:
        return <PlanSelection onPlanSelect={handlePlanSelect} />;
    }
  };

  return (
    <main className="main-container">
      {renderStep()}
    </main>
  );
}

export default App; 