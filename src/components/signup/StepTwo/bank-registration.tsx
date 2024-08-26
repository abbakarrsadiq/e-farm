import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import './bank.scss';
import ProgressSteps from '../steps/progressSteps';
import formImage from './bank.png';
import { useSignupContext, UserDetails, BankDetails } from '../../../context/signupContext';

export const Bank: React.FC = () => {
  const { signupData, setSignupData } = useSignupContext();
  const navigate = useNavigate();

  const [hasSmartPhone, setHasSmartPhone] = useState(true);
  const [hasBankAccount, setHasBankAccount] = useState(false);
  const [accountNumber, setAccountNumber] = useState<number>(0);
  const [bankName, setBankName] = useState('');

  const handleBankAccountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value === 'true';
    setHasBankAccount(value);
    if (!value) {
      setAccountNumber(0);
      setBankName('');
    }
  };

  const handleSubmit = () => {
    // Create a new object for bankDetails conditionally
    const bankDetails: BankDetails | undefined = hasBankAccount
      ? {
          accountNumber: accountNumber,
          bankName: bankName,
        }
      : undefined;
  
    // Create a new object for userDetails with the updated values
    const newDetails: Partial<UserDetails> = {
      hasBankAccount: hasBankAccount,
      hasSmartphone: hasSmartPhone,
    };
  
    // Update signupData, conditionally include bankDetails
    setSignupData((prevData) => ({
      ...prevData,
      userDetails: {
        ...prevData.userDetails,
        ...newDetails,
      },
      ...(bankDetails && { bankDetails }), // Only include bankDetails if it is defined
    }));
  
    // Navigate to the desired route
    navigate('/farmer');
  };
  
  return (
    <div className="bank-wrapper">
      <div className="image-container d-none d-md-block">
        <img src={formImage} alt="Farm Warehouse" />
      </div>
      <ProgressSteps currentStep={2} totalSteps={4} />
      <div className="form-container">
        <div className="bank-form">
          <Form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="bank-container">
            <h2>Create Account</h2>
            <h3>Bank Details</h3>

            <Form.Group className="mb-3">
              <Form.Label>Do you have a Smartphone?*</Form.Label>
              <div className="bank-options">
                <Form.Check
                  type="radio"
                  id="smartphone-yes"
                  name="hasSmartPhone"
                  value="true"
                  checked={hasSmartPhone === true}
                  onChange={() => setHasSmartPhone(true)}
                  label="Yes"
                  style={{ marginRight: '20px' }}
                />
                <Form.Check
                  type="radio"
                  id="smartphone-no"
                  name="hasSmartPhone"
                  value="false"
                  checked={hasSmartPhone === false}
                  onChange={() => setHasSmartPhone(false)}
                  label="No"
                />
              </div>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Do you have a Bank Account?*</Form.Label>
              <div className="bank-options">
                <Form.Check
                  type="radio"
                  id="bank-account-yes"
                  name="hasBankAccount"
                  value="true"
                  checked={hasBankAccount === true}
                  onChange={handleBankAccountChange}
                  label="Yes"
                  style={{ marginRight: '20px' }}
                />
                <Form.Check
                  type="radio"
                  id="bank-account-no"
                  name="hasBankAccount"
                  value="false"
                  checked={hasBankAccount === false}
                  onChange={handleBankAccountChange}
                  label="No"
                />
              </div>
            </Form.Group>

            {hasBankAccount && (
              <div className="bank-details">
                <Form.Group className="mb-3">
                  <Form.Label>Bank*</Form.Label>
                  <Form.Control
                    as="select"
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                  >
                    <option value="">Select your bank</option>
                    <option value="GTB">Guarantee Trust</option>
                    <option value="FBN">First Bank</option>
                    <option value="UBA">United Bank for Africa</option>
                  </Form.Control>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Personal Bank Account Number*</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter your account number"
                    value={accountNumber || ''}
                    onChange={(e) => setAccountNumber(Number(e.target.value))}
                  />
                </Form.Group>
              </div>
            )}

            <div className="buttons">
              <Button onClick={() => navigate('/farmer')} variant="secondary" className="back">
                Back
              </Button>
              <Button type="submit" variant="primary" className="continue">
                Continue
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Bank;
