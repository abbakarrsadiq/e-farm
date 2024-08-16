import React from 'react';
import './verify.scss';
import formImage from './loginLogo.png';
import Logo from '../signup/stepFive/modalLogo.png';

export const Verify: React.FC = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <div className="verify-wrapper">
      <div className="image-container">
        <img src={formImage} alt="Form Illustration" className='image' />
      </div>
      <div className="verify-container">
        <div id="login-wrapper" className="form-section">
          <form className='modal-content' onSubmit={handleSubmit}>
            <img src={Logo} alt="Logo" className="modal-logo" />
            <h3 className="login-h">Verification Required</h3>
            <p className="lat">A 5-digit verification code has been sent to +2347066773487</p>
            <p className="welcome-message">Enter verification code</p>
            <div className="verification-code-container">
              {[...Array(5)].map((_, index) => (
                <input
                  key={index}
                  type="text"
                  className="verification-code-input"
                  maxLength={1}
                  pattern="\d*"
                />
              ))}
            </div>
            <button type="submit" className="btn-login">Continue</button>
            <p className="signup-text">
              Don’t have an account? <a href="/account" className="signup-link">Sign up</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Verify;
