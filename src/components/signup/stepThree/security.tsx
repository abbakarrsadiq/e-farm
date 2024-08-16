import React from 'react';
import { useNavigate } from 'react-router-dom';
import './security.scss';
import formImage from './securityImage.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFingerprint } from '@fortawesome/free-solid-svg-icons';
import ProgressSteps from '../steps/progressSteps';

export const Security: React.FC = () => {

  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // @ts-expect-error
    const button = event.nativeEvent.submitter as HTMLButtonElement;
    const action = button.name;

    if (action === 'back') {
      navigate('/bank');
    } else if (action === 'continue') {
      navigate('/farmer');
    }
  };

  return (
    <div className="account-creation-container">
      <div className="image-section">
        <img src={formImage} alt="Farm Warehouse" />
      </div>
      <div className="form-wrapper">
        <ProgressSteps currentStep={3} totalSteps={4} />
        <div className="form-section">
          <div className="form-header">
            <a href="/" className="back-home">Back home</a>
            <a href="/login" className="login-link">Already have an account? Log in</a>
          </div>
          <h2>Create Account</h2>
          <h3>Security - Setup Fingerprint (Optional)</h3>
          <p>Capture Fingerprint (Your L-R index fingers)</p>
          <div className="thumbs">
            <div className="thumb-div">
            <FontAwesomeIcon icon={faFingerprint} className="thumb"/>
            <p>Left thumb</p>
            </div>
            <div className="thumb-div">
            <FontAwesomeIcon icon={faFingerprint} className="thumb"/>
            <p>Left index</p>
            </div>
            <div className="thumb-div">
            <FontAwesomeIcon icon={faFingerprint} className="thumb"/>
            <p>Right thumb</p>
            </div>
            <div className="thumb-div">
            <FontAwesomeIcon icon={faFingerprint} className="thumb"/>
            <p>Rigth index</p>
            </div>
          </div>
          <div className="info">
            <i className="info-icon">ℹ️</i>
            <p>Place your finger on the fingerprint scanner to capture your fingerprint. Ensure your finger covers the entire scanner.</p>
          </div>
          <div className="skip-option">
            <div className="skip-items">

            <input type="checkbox" id="skip" />
            <label htmlFor="skip">Skip for now</label>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="security-buttons">
              <button type="submit" name="back" className="back">
                Back
              </button>
              <button type="submit" name="continue" className="continue">
                Continue
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Security;
