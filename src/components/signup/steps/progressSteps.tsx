import React from 'react';
import './steps.scss';

interface ProgressStepsProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressSteps: React.FC<ProgressStepsProps> = ({ currentStep, totalSteps }) => {
  const steps = Array.from({ length: totalSteps }, (_, index) => index + 1);

  return (
    <div className="progress-steps">
      {steps.map((step) => (
        <React.Fragment key={step}>
          <div className={`step ${currentStep >= step ? 'completed' : ''} ${currentStep === step ? 'current' : ''}`}>
            <div className="circle">
              {currentStep > step ? (
                <div className="checkmark">✓</div>
              ) : (
                <div className="dot">
                  {currentStep === step && <div className="small-dot"></div>}
                </div>
              )}
            </div>
          </div>
          {step < totalSteps && <div className="line"></div>}
        </React.Fragment>
      ))}
    </div>
  );
};

export default ProgressSteps;
