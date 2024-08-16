import React from 'react';
import { Form, Row, Col, Button, InputGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { FaUser } from 'react-icons/fa'; // Import user thumbnail icon
import './account.scss';
import ProgressSteps from '../steps/progressSteps';
import formImage from './account.png';

const validationSchema = Yup.object({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  phoneNumber: Yup.string().required('Phone number is required'),
  email: Yup.string().email('Invalid email format'),
  age: Yup.string().required('Age is required'),
  address: Yup.string().required('Residential address is required'),
  site: Yup.string().required('Site is required'),
  idType: Yup.string().required('ID Type is required'),
  idNumber: Yup.string().required('ID Number is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[^a-zA-Z0-9]/, 'Password must contain at least one special character')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), undefined], 'Passwords must match')
    .required('Confirm Password is required'),
});

export const Account: React.FC = () => {
  const navigate = useNavigate();
  
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: '',
      age: '',
      gender: '',
      address: '',
      site: '',
      idType: '',
      idNumber: '',
      password: '',
      confirmPassword: '',
      idDocument: null,
      profilePicture: null,
    },
    validationSchema,
    onSubmit: (values) => {
      navigate('/bank');
    },
  });

  return (
    <div className="account-wrapper">
      <div className="image-container">
        <img src={formImage} alt="Farm Warehouse" className='image'/>
      </div>
      <ProgressSteps currentStep={2} totalSteps={4} />
      <div className="form">
        <div className="form-header">
          <a onClick={() => navigate('/')}>Back home</a>
          <a onClick={() => navigate('/')}>Already have an account? Log in</a>
        </div>
        <div className="account-container">
          <Form onSubmit={formik.handleSubmit}>
            <h2>Create Account</h2>
            <p>Personal Information</p>

            <Form.Group className="form-group">
              <Row>
                <Col>
                  <Form.Label>First Name*</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter first name"
                    {...formik.getFieldProps('firstName')}
                   isInvalid={Boolean(formik.touched.firstName && formik.errors.firstName)}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.firstName}
                  </Form.Control.Feedback>
                </Col>
                <Col>
                  <Form.Label>Last Name*</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter last name"
                    {...formik.getFieldProps('lastName')}
                  isInvalid={Boolean(formik.touched.lastName && formik.errors.lastName)}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.lastName}
                  </Form.Control.Feedback>
                </Col>
              </Row>
            </Form.Group>

            <Form.Group className="form-group">
              <Form.Label>Phone number*</Form.Label>
              <div className="form-input d-flex align-items-center">
                <div className="country-code-container">
                  <Form.Control as="select" className="country-code">
                    <option value="+234" className='mb-0 pb-0'>+234</option>
                  </Form.Control>
                  <div className="nigeria" />
                </div>
                <Form.Control
                  type="tel"
                  placeholder="000 0000 000"
                  {...formik.getFieldProps('phoneNumber')}
                  isInvalid={Boolean(formik.touched.phoneNumber && formik.errors.phoneNumber)}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.phoneNumber}
                </Form.Control.Feedback>
              </div>
            </Form.Group>

            <Form.Group className="form-group">
              <Form.Label>Email address (Optional)</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email address"
                {...formik.getFieldProps('email')}
is             Invalid={Boolean(formik.touched.email && formik.errors.email)}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.email}
              </Form.Control.Feedback>
            </Form.Group>

            <Row className="form-row">
              <Col>
                <Form.Group className="form-group mb-0">
                  <Form.Label htmlFor="age">Age*</Form.Label>
                  <Form.Control
                    as="select"
                    id="age"
                    {...formik.getFieldProps('age')}
                   isInvalid={Boolean(formik.touched.age && formik.errors.age)}
                  >
                    <option value="">Select age</option>
                    <option value="under-18">Under 18</option>
                    <option value="18-25">18 - 25</option>
                    <option value="26-35">26 - 35</option>
                    <option value="36-45">36 - 45</option>
                    <option value="senior">Senior</option>
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.age}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="form-group">
                  <Form.Label>Choose Gender*</Form.Label>
                  <div className="gender-options">
                    <Form.Check
                      type="radio"
                      id="male"
                      label="Male"
                      {...formik.getFieldProps('gender')}
                      isInvalid={Boolean(formik.touched.gender && formik.errors.gender)}
                    />
                    <Form.Check
                      type="radio"
                      id="female"
                      label="Female"
                      {...formik.getFieldProps('gender')}
                      isInvalid={Boolean(formik.touched.gender && formik.errors.gender)}
                    />
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.gender}
                    </Form.Control.Feedback>
                  </div>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="form-group">
              <Form.Label>Residential address*</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ex: No 21 Agaro road, Abeokuta."
                {...formik.getFieldProps('address')}
                isInvalid={Boolean(formik.touched.address && formik.errors.address)}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.address}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="form-group">
              <Form.Label>Site*</Form.Label>
              <Form.Control
                as="select"
                className="select-site"
                {...formik.getFieldProps('site')}
                isInvalid={formik.touched.site && formik.errors.site}
              >
                <option value="">Select Site</option>
                <option value="private">Private</option>
                <option value="public">Public</option>
                <option value="mix-plots">Mix plots</option>
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {formik.errors.site}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="form-group">
              <Form.Label>ID Type*</Form.Label>
              <Form.Control
                as="select"
                className="select-site"
                {...formik.getFieldProps('idType')}
                isInvalid={formik.touched.idType && formik.errors.idType}
              >
                <option value="">Select ID Type</option>
                <option value="passport">International Passport</option>
                <option value="national-id">National ID</option>
                <option value="voters-card">Voters Card</option>
                <option value="driving-license">Driving License</option>
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {formik.errors.idType}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="form-group">
              <Form.Label>ID Number*</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your ID number"
                {...formik.getFieldProps('idNumber')}
                isInvalid={formik.touched.idNumber && formik.errors.idNumber}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.idNumber}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="form-group">
            <Form.Label>Upload ID document</Form.Label>
              <Form.Control
                type="file"
                onChange={(event) => formik.setFieldValue('idDocument', event.currentTarget.files?.[0])}
              />
            </Form.Group>

            <Form.Group className="form-group">
              <Form.Label>Create Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="********"
                {...formik.getFieldProps('password')}
                isInvalid={formik.touched.password && formik.errors.password}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.password}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="form-group">
              <Form.Label>Confirm password</Form.Label>
              <Form.Control
                type="password"
                placeholder="********"
                {...formik.getFieldProps('confirmPassword')}
                isInvalid={formik.touched.confirmPassword && formik.errors.confirmPassword}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.confirmPassword}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="form-group">
              <Form.Label>Upload Profile picture (Optional)</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <FaUser /> {/* User thumbnail icon */}
                </InputGroup.Text>
                <Form.Control
                  type="file"
                  onChange={(event) => formik.setFieldValue('profilePicture', event.currentTarget.files?.[0])}
                />
              </InputGroup>
            </Form.Group>
            <div className="buttons">
              <button type="submit" name="back" className="back">
                Back
              </button>
              <button type="submit" name="continue" className="continue">
                Continue
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Account;

