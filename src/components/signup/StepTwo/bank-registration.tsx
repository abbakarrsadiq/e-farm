import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { Form, Button } from 'react-bootstrap';
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
      // @ts-expect-error
      bank: Yup.string().when('hasBankAccount', {
        is: 'yes',
        then: Yup.string().required('Bank selection is required'),
      }),
      // @ts-expect-error
      accountNumber: Yup.string().when('hasBankAccount', {
        is: 'yes',
        then: Yup.string()
          .matches(/^\d{10}$/, "Account number must be 10 digits")
          .required('Account number is required'),
      }),
    }),
    // @ts-expect-error
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
        <div className="bank-form">
          <form onSubmit={formik.handleSubmit} className="bank-container">
          <div className="form-container">
            <div className="bank-form">
              <Form onSubmit={formik.handleSubmit} className="bank-container">
                <h2>Create Account</h2>
                <h3>Bank Details</h3>

                <Form.Group className="mb-3">
                  <Form.Label>Do you have a Smartphone?*</Form.Label>
                  <div className="bank-options">
                    <Form.Check
                      type="radio"
                      id="yes"
                      name="smartphone"
                      value="yes"
                      checked={formik.values.smartphone === 'yes'}
                      onChange={formik.handleChange}
                      label="Yes"
                      style={{ marginRight: '20px' }}
                    />
                    <Form.Check
                      type="radio"
                      id="no"
                      name="smartphone"
                      value="no"
                      checked={formik.values.smartphone === 'no'}
                      onChange={formik.handleChange}
                      label="No"
                    />
                  </div>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Do you have a Bank Account?*</Form.Label>
                  <div className="bank-options">
                    <Form.Check
                      type="radio"
                      id="bank-yes"
                      name="bank"
                      value="yes"
                      onChange={handleBankAccountChange}
                      label="Yes"
                      style={{ marginRight: '20px' }}
                    />
                    <Form.Check
                      type="radio"
                      id="bank-no"
                      name="bank"
                      value="no"
                      onChange={handleBankAccountChange}
                      label="No"
                    />
                  </div>
                </Form.Group>

                {hasBankAccount === 'yes' && (
                  <div className="bank-details">
                    <Form.Group className="mb-3">
                      <Form.Label>Bank*</Form.Label>
                      <Form.Control as="select" {...formik.getFieldProps('bank')}>
                        <option value="">Guarantee Trust</option>
                        <option value="">Guarantee Trust</option>
                        <option value="">Guarantee Trust</option>
                        <option value="">Guarantee Trust</option>
                        <option value="">Guarantee Trust</option>
                      </Form.Control>
                      {formik.touched.bank && formik.errors.bank ? (
                        <div className="error">{formik.errors.bank}</div>
                      ) : null}
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Personal Bank Account Number*</Form.Label>
                      <Form.Control
                        type="text"
                        // @ts-expect-error
                        onChange={handleAccountNumberChange}
                        placeholder="Enter your account number"
                        {...formik.getFieldProps('accountNumber')}
                        required
                      />
                      <p className={`validation-message ${isBankAccountValid ? 'success' : 'error'}`}>
                        {validationMessage}
                      </p>
                    </Form.Group>
                  </div>
                )}

                <div className="buttons">
                  <Button type="button" onClick={() => navigate('/account')} variant="secondary" className="back">
                    Back
                  </Button>
                  <Button type="submit" variant="primary" className="continue" onClick={() => navigate('/security')}>
                    Continue
                  </Button>
                </div>
              </Form>
            </div>
          </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Bank;
