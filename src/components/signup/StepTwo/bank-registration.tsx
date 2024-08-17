import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './bank.scss';
import ProgressSteps from '../steps/progressSteps';
import formImage from './bank.png';

export const Bank: React.FC = () => {
  const [hasBankAccount, setHasBankAccount] = useState<string | null>(null);
  const [isBankAccountValid, setIsBankAccountValid] = useState<boolean>(false);
  const [validationMessage, setValidationMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      smartphone: '',
      bank: '',
      accountNumber: '',
    },
    validationSchema: Yup.object({
      smartphone: Yup.string().required('Smartphone selection is required'),
      bank: Yup.string().when('hasBankAccount', {
        is: 'yes',
        then: Yup.string().required('Bank selection is required'),
      }),
      accountNumber: Yup.string().when('hasBankAccount', {
        is: 'yes',
        then: Yup.string()
          .matches(/^\d{10}$/, "Account number must be 10 digits")
          .required('Account number is required'),
      }),
    }),
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(false);
      if (hasBankAccount === 'yes' && isBankAccountValid) {
        navigate('/security');
      } else if (hasBankAccount === 'no') {
        navigate('/security');
      }
    },
  });

  const handleBankAccountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHasBankAccount(event.target.value);
  };

  const handleAccountNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const accountNumber = event.target.value;
    formik.setFieldValue('accountNumber', accountNumber);
    if (/^\d{10}$/.test(accountNumber)) {
      setIsBankAccountValid(true);
      setValidationMessage("Account Name: ABUBAKAR MUHAMMAD BELLO");
    } else {
      setIsBankAccountValid(false);
      setValidationMessage("Couldn't verify account number.");
    }
  };

  return (
    <div className="bank-wrapper">
      <div className="image-container d-none d-md-block">
        <img src={formImage} alt="Farm Warehouse" />
      </div>
      <ProgressSteps currentStep={2} totalSteps={4} />
      <div className="form-container">
        <div className="form">
          <div className="form-header">
            <a href="/">Back home</a>
            <a href="/login" className="login-link">Already have an account? Log in</a>
          </div>
          <form onSubmit={formik.handleSubmit} className="bank-container">
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
                  checked={formik.values.smartphone === 'yes'}
                  onChange={formik.handleChange}
                  style={{
                    width: '20px',
                    height: '20px',
                    backgroundColor: '#EAECF0',
                    border: '1px solid #36b37e',
                    borderRadius: '50%',
                    position: 'relative',
                    margin: '10px',
                    marginRight: '10px',
                  }}
                  required
                />
                <label htmlFor="smartphone-yes" style={{ marginRight: '20px' }}>Yes</label>
                <input
                  type="radio"
                  id="no"
                  name="smartphone"
                  value="no"
                  checked={formik.values.smartphone === 'no'}
                  onChange={formik.handleChange}
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
                <label htmlFor="bank-yes" style={{ marginRight: '20px' }}>Yes</label>
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
                  <select id="bank" className="form-control" {...formik.getFieldProps('bank')}>
                    <option value="">Guarantee Trust</option>
                    <option value="">Guarantee Trust</option>
                    <option value="">Guarantee Trust</option>
                    <option value="">Guarantee Trust</option>
                    <option value="">Guarantee Trust</option>
                  </select>
                  {formik.touched.bank && formik.errors.bank ? (
                    <div className="error">{formik.errors.bank}</div>
                  ) : null}
                </div>
                <div className="form-group">
                  <label>Personal Bank Account Number*</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={handleAccountNumberChange}
                    placeholder="Enter your account number"
                    {...formik.getFieldProps('accountNumber')}
                    required
                  />
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
