import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import './security.scss';
import formImage from './security.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFingerprint } from '@fortawesome/free-solid-svg-icons';
import ProgressSteps from '../steps/progressSteps';

export const Security: React.FC = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      skip: false,
    },
    validationSchema: Yup.object({
      skip: Yup.boolean().required('You must select whether to skip or not'),
    }),
    onSubmit: () => {
      navigate('/farmer');
    },
  });

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    formik.setFieldValue('skip', event.target.checked);
  };

  return (
    <div className="security-wrapper">
      <div className="image-container">
        <img src={formImage} alt="Farm Warehouse" />
      </div>
      <ProgressSteps currentStep={3} totalSteps={4} />
      <div className="security-container">
        <div className="security-form">
          <h2>Create Account</h2>
          <h5>Security - Setup Fingerprint (Optional)</h5>
          <p>Capture Fingerprint (Your L-R index fingers)</p>
          <div className="thumbs">
            <div className="thumb-div">
              <FontAwesomeIcon icon={faFingerprint} className="thumb" />
            </div>
            <div className="thumb-div">
              <FontAwesomeIcon icon={faFingerprint} className="thumb" />

            </div>
            <div className="thumb-div">
              <FontAwesomeIcon icon={faFingerprint} className="thumb" />

            </div>
            <div className="thumb-div">
              <FontAwesomeIcon icon={faFingerprint} className="thumb" />

            </div>
          </div>
          <div className="mt-10 p-1">
            <p className='info'><i className="icon"> ℹ️  </i>Place your finger on the fingerprint scanner to capture your fingerprint. Ensure your finger covers the entire scanner.</p>
          </div>
          <div className="skip-option">
            <div className="skip-items">
              <input
                type="checkbox"
                id="skip"
                checked={formik.values.skip}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="skip">Skip for now</label>
              {formik.errors.skip && formik.touched.skip ? (
                <div className="error">{formik.errors.skip}</div>
              ) : null}
            </div>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <div className="security-buttons">
              <button type="submit" name="back" className="back" onClick={() => navigate('/bank')}>
                Back
              </button>
              <button type="submit" name="continue" className="continue" disabled={formik.isSubmitting}>
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
