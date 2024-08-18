import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFingerprint, faEye, faEyeSlash, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { Form, Button } from 'react-bootstrap';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import axios from 'axios';
import './login.scss';

import loginImage from './loginLogo.png'

const validationSchema = Yup.object({
  credential: Yup.string()
    .required('Credential is required')
    .email('Must be a valid email address'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(/[A-Z]/, 'Password must have at least one uppercase letter')
    .matches(/[a-z]/, 'Password must have at least one lowercase letter')
    .matches(/\d/, 'Password must have at least one number')
    .matches(/[@$!%*?&#]/, 'Password must have at least one special character'),
});

const Login: React.FC = () => {
  const API_BASE_URL = "https://api.bgn.com";
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      credential: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      if (success) navigate('/verify');
      try {
        const response = await axios.post(
          `${API_BASE_URL}/users/login`,
          values
        );
        response ? setSuccess(true) : setSuccess(false);
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    },
  });

  return (
    <div className="login-wrapper">
      <div className="image-container">
        <img src={loginImage} alt="Farm Warehouse" />
      </div>
      <div className="login-container">
      <div className="back-arrow">
        <FontAwesomeIcon icon={faChevronLeft}/> Back home</div>
        <Form className="login-form" onSubmit={formik.handleSubmit}>
        <h1>Welcome back!</h1>
        <p>Welcome back! Please enter your details.</p>
          <Form.Group controlId="credential">
            <Form.Label>Email address / Phone number</Form.Label>
            <Form.Control
              type="text"
              name="credential"
              placeholder="Enter email or phone number"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.credential}
              isInvalid={formik.touched.credential && !!formik.errors.credential}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.credential}
            </Form.Control.Feedback>
            <Form.Text className="text-muted lat">
              Phone number must have a country code, e.g., +234.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="password" className="password-group">
            <Form.Label>Password</Form.Label>
            <div className="password-wrapper">
              <Form.Control
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Enter password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                isInvalid={formik.touched.password && !!formik.errors.password}
                id="password-input"
              />
              <FontAwesomeIcon
                icon={showPassword ? faEyeSlash : faEye}
                className="eye-icon"
                onClick={() => setShowPassword(!showPassword)}
              />
              <FontAwesomeIcon
                icon={faFingerprint}
                className="fingerprint-icon"
              />
            </div>
            <Form.Control.Feedback type="invalid">
              {formik.errors.password}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="rememberMe" className="remember-me-group">
            <Form.Check type="checkbox" label="Remember for 30 days" />
          </Form.Group>

          <a onClick={() => navigate('/verify')} className="forgot-password">Forgot password</a>

          <Button type="submit" className="btn-login">
            Login
          </Button>
          <div id="signup">
          Don’t have an account? <a onClick={() => navigate('/account')} className='signup-link'>Sign up</a>
        </div>
        </Form>
        
      </div>
    </div>
  );
};

export default Login;
