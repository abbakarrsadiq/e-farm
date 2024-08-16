import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './bank.scss';
import ProgressSteps from '../steps/progressSteps';
import formImage from './bankImage.png';

export const Bank: React.FC = () => {
  const [hasBankAccount, setHasBankAccount] = useState<string | null>(null);
  const [isBankAccountValid, setIsBankAccountValid] = useState<boolean>(false);
  const [validationMessage, setValidationMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // @ts-expect-error
    const button = event.nativeEvent.submitter as HTMLButtonElement;
    const action = button.name;

    if (action === 'back') {
      navigate('/account');
    } else if (action === 'continue') {
      if (hasBankAccount === 'yes' && isBankAccountValid) {
        navigate('/security');
      } else if (hasBankAccount === 'no') {
        navigate('/security');
      }
    }
  };

  const handleBankAccountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHasBankAccount(event.target.value);
  };

  const handleAccountNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const accountNumber = event.target.value;
    if (/^\d{10}$/.test(accountNumber)) {
      setIsBankAccountValid(true);
      setValidationMessage("Account Name: ABUBAKAR MUHAMMAD BELLO");
    } else {
      setIsBankAccountValid(false);
      setValidationMessage("Couldn't verify account number.");
    }
  };
  return (
    <div className="account-creation-container">
      <div className="image-section">
        <img src={formImage} alt="Farm Warehouse" />
      </div>
      <div className="form-wrapper">
        <ProgressSteps currentStep={2} totalSteps={4} />
        <div className="form-section">
          <div className="form-header">
            <a href="/" className="back-home">Back home</a>
            <a href="/login" className="login-link">Already have an account? Log in</a>
          </div>
          <form onSubmit={handleSubmit}>
            <h2>Create Account</h2>
            <h3>Bank Details</h3>

            <div className="form-group">
              <label>Do you have a SmartPhone?*</label>
              <div className="bank-options">
                <input
                  type="radio"
                  id="yes"
                  name="smartphone"
                  value="yes"
                  style={{
                    width: '20px',
                    height: '20px',
                    backgroundColor: '#EAECF0',
                    border: '1px solid #36b37e',
                    borderRadius: '50%',
                    position: 'relative',
                    marginRight: '10px',
                  }}
                  required
                />
                <label htmlFor="smartphone-yes">Yes</label>
                <input
                  type="radio"
                  id="no"
                  name="smartphone"
                  value="no"
                  style={{
                    width: '20px',
                    height: '20px',
                    backgroundColor: '#EAECF0',
                    border: '1px solid #36b37e',
                    borderRadius: '50%',
                    position: 'relative',
                    marginRight: '10px',
                  }}
                  required
                />
                <label htmlFor="smartphone-no">No</label>
              </div>
            </div>

            <div className="form-group">
              <label>Do you have a Bank Account?*</label>
              <div className="bank-options">
                <input
                  type="radio"
                  id="bank-yes"
                  name="bank"
                  value="yes"
                  onChange={handleBankAccountChange}
                  style={{
                    width: '20px',
                    height: '20px',
                    backgroundColor: '#EAECF0',
                    border: '1px solid #36b37e',
                    borderRadius: '50%',
                    position: 'relative',
                    marginRight: '10px',
                  }}
                  required
                />
                <label htmlFor="bank-yes">Yes</label>
                <input
                  type="radio"
                  id="bank-no"
                  name="bank"
                  value="no"
                  onChange={handleBankAccountChange}
                  style={{
                    width: '20px',
                    height: '20px',
                    backgroundColor: '#EAECF0',
                    border: '1px solid #36b37e',
                    borderRadius: '50%',
                    position: 'relative',
                    marginRight: '10px',
                  }}
                  required
                />
                <label htmlFor="bank-no">No</label>
              </div>
            </div>

            {hasBankAccount === 'yes' && (
              <div className="bank-details">
                <div className="form-group">
                  <label htmlFor="bank">Bank*</label>
                  <select id="bank">
                    <option value="">Guarantee Trust</option>
                    <option value="">Guarantee Trust</option>
                    <option value="">Guarantee Trust</option>
                    <option value="">Guarantee Trust</option>
                    <option value="">Guarantee Trust</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Personal Bank Account Number*</label>
                  <input type="text" onChange={handleAccountNumberChange} placeholder="Enter your account number" required />
                  <p className={`validation-message ${isBankAccountValid ? 'success' : 'error'}`}>
                    {validationMessage}
                  </p>
                </div>
              </div>
            )}

            <div className="buttons">
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

export default Bank;
