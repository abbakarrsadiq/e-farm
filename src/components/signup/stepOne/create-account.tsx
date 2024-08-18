import React from 'react';
import { Form, Row, Col, InputGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { FaUser } from 'react-icons/fa';
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
    // @ts-expect-error
    onSubmit: (values) => {
      navigate('/bank');
    },
  });

  return (
    <div className="account-wrapper">
      <div className="image-container">
        <img src={formImage} alt="Farm Warehouse" className="image" />
      </div>
      <ProgressSteps currentStep={2} totalSteps={4} />

      <div>
        <div className="account-container">
          <Form onSubmit={formik.handleSubmit} className="account-form">
            <h2>Create Account</h2>
            <p>Personal Information</p>

            <Form.Group className="mb-3">
              <Row className="d-flex justify-content-between" style={{ width: '388px', height: '72px', marginBottom: '10px' }}>
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

            <Form.Group className="mb-3">
              <Row className="d-flex justify-content-between" style={{ width: '388px', height: '70px', gap: '30px' }}>
                <Col>
                  <Form.Label>Age*</Form.Label>
                  <Form.Control
                    as="select"
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
                </Col>
                <Col>
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
                </Col>
              </Row>
            </Form.Group>

            <Form.Group className="" style={{ width: '388px', height: '70px', gap: '6px', marginTop: '10px', marginBottom: '25px' }}>
              <Form.Label>Residential Address*</Form.Label>
              <Form.Control
                type="text"
                placeholder="No. 20, Khartoum St, Wuse"
                {...formik.getFieldProps('address')}
                isInvalid={Boolean(formik.touched.address && formik.errors.confirmPassword)}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.address}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="" style={{ width: '388px', height: '70px', gap: '6px', marginTop: '10px', marginBottom: '20px' }}>
              <Form.Label>Site*</Form.Label>
              <Form.Control
                as="select"
                {...formik.getFieldProps('age')}
                isInvalid={Boolean(formik.touched.age && formik.errors.age)}
              >
                <option value="wuse">Wuse</option>
                <option value="garki">Garki</option>
                <option value="apo">Apo</option>
                <option value="gwarinpa">Gwarinpa</option>
                <option value="jabi">Jabi</option>
                <option value="maitama">Maitama</option>
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {formik.errors.site}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="" style={{ width: '388px', height: '70px', gap: '6px', marginTop: '10px', marginBottom: '20px' }}>
              <Form.Label>ID Type*</Form.Label>
              <Form.Control
                as="select"
                {...formik.getFieldProps('idType')}
                isInvalid={Boolean(formik.touched.age && formik.errors.age)}
              >
                <option value="passport">Int'l Passport</option>
                <option value="nimc">National ID</option>
                <option value="voter">Voter's Card</option>
                <option value="driving">Driving License</option>
                <option value="student">Studen ID</option>
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {formik.errors.idType}
              </Form.Control.Feedback>
            </Form.Group>


            <Form.Group className="" style={{ width: '388px', height: '70px', gap: '6px', marginTop: '10px', marginBottom: '30px' }}>
              <Form.Label>ID Number*</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter ID Number"
                {...formik.getFieldProps('idNumber')}
                isInvalid={Boolean(formik.touched.idNumber && formik.errors.idNumber)}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.idNumber}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" style={{ width: '388px', height: '84px' }}>
              <Form.Label>Upload ID document</Form.Label>
              <Form.Control
                type="file"
                // @ts-expect-error
                onChange={(event) => formik.setFieldValue('idDocument', event.currentTarget.files?.[0])}
              />
            </Form.Group>

            <Form.Group className="" style={{ width: '388px', height: '66px', marginTop: '1px', marginBottom: '33px' }}>
              <Form.Label>Create Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="********"
                {...formik.getFieldProps('password')}
                isInvalid={Boolean(formik.touched.password && formik.errors.password)}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.password}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="" style={{ width: '388px', height: '66px', marginTop: '10px', marginBottom: '33px' }}>
              <Form.Label>Confirm password</Form.Label>
              <Form.Control
                type="password"
                placeholder="********"
                {...formik.getFieldProps('confirmPassword')}
                isInvalid={Boolean(formik.touched.confirmPassword && formik.errors.confirmPassword)}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.confirmPassword}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" style={{ width: '388px', height: '80px', marginBottom: '5px' }}>
              <Form.Label>Upload Profile picture (Optional)</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <FaUser />
                </InputGroup.Text>
                <Form.Control
                  type="file"
                  // @ts-expect-error
                  onChange={(event) => formik.setFieldValue('profilePicture', event.currentTarget.files?.[0])}
                />
              </InputGroup>
            </Form.Group>
            <div className="buttons">
              <button type="button" className="back" onClick={() => navigate('/previous-step')}>
                Back
              </button>
              <button type="submit" className="continue">
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
