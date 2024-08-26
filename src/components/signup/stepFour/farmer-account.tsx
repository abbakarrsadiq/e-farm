import React, { useState } from 'react';
import { Path, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, Form, Row, Col } from 'react-bootstrap';
import './farmer-account.scss';
import ProgressSteps from '../steps/progressSteps';
import formImage from './cow.png';
import Modal from '../stepFive/modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudArrowUp, faCheck, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { useSignupContext, FarmDetails } from '../../../context/signupContext';

const validationSchema = Yup.object({
  name: Yup.string().required('Farm Name is required'),
  address: Yup.string().required('Address is required'),
  long: Yup.number().required('Longitude is required'),
  lat: Yup.number().required('Latitude is required'),
  docUploads: Yup.array().of(Yup.string()),
  crops: Yup.array().of(
    Yup.object().shape({
      cropId: Yup.string().required('Crop is required'),
      farmSeasonStart: Yup.string().required('Start Month is required'),
      farmSeasonEnd: Yup.string().required('End Month is required'),
    })
  ).min(1, 'At least one crop must be selected'),
});

export const Farmer: React.FC = () => {
  const { signupData, setSignupData } = useSignupContext();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [files, setFiles] = useState<Array<{ name: string; size: string; progress: number; complete: boolean }>>([]);
  const [crops, setCrops] = useState<Array<{ id: number, farmSeasonStart: string, farmSeasonEnd: string }>>([{ 
    id: 1, 
    farmSeasonStart: "March", 
    farmSeasonEnd: "September",
  }]);

  const formik = useFormik({
    initialValues: {
      name: 'Gonar Buba',
      address: 'Lergo Abba',
      long: 4.764,
      lat: 3.867,
      docUploads: ['http'],
      crops: [{ cropId: '1', farmSeasonStart: 'jan', farmSeasonEnd: 'jun' }],
    },
    validationSchema,
    onSubmit: (values) => {
      addFarm(values);
      setShowModal(true);
    },
  });

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);
    const newFiles = selectedFiles.map(file => ({
      name: file.name,
      size: formatFileSize(file.size),
      progress: 0,
      complete: false,
      url: URL.createObjectURL(file),
    }));
    
    setFiles(prevFiles => [...prevFiles, ...newFiles]);
  
    newFiles.forEach((_, index) => {
      const fakeUploadProgress = setInterval(() => {
        setFiles(prevFiles => {
          const updated = [...prevFiles];
          const fileIndex = prevFiles.length - newFiles.length + index;
          updated[fileIndex].progress += 10;
  
          if (updated[fileIndex].progress >= 100) {
            clearInterval(fakeUploadProgress);
            updated[fileIndex].complete = true;
            updated[fileIndex].progress = 100;
          }
  
          return updated;
        });
      }, 200);
    });
  

    const newDocUploads = selectedFiles.map(file => ({
      url: URL.createObjectURL(file),
    }));
    

    formik.setFieldValue('docUploads', [
      ...formik.values.docUploads,
      ...newDocUploads,
    ]);
  };
  
  const formatFileSize = (size: number): string => {
    if (size < 1024) return `${size} bytes`;
    else if (size < 1024 * 1024) return `${(size / 1024).toFixed(2)} KB`;
    else return `${(size / (1024 * 1024)).toFixed(2)} MB`;
  };

  type AccountApprovalStatus = 'pending' | 'approved' | 'rejected';
  const signUpFarmer = async (signupData: any) => {
    const accountApprovalStatus: AccountApprovalStatus = 'pending';
    try {
      const url = `https://www.dev.farmwarehouse.ng/api/users/signup/${encodeURIComponent(accountApprovalStatus)}`;
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signupData),
      });
  
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(`Failed to sign up farmer: ${errorResponse.message}`);
      }
  
      const result = await response.json();
      console.log('API Response:', result);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  
  const handleCloseModal = () => {
    setShowModal(false);

    signUpFarmer(signupData).then(() => {
      formik.resetForm();
    });
  };

  const handleAddAnotherFarm = () => {
    setShowModal(false);
    navigate('/farmer');
    formik.resetForm();
  };

  const addCrop = () => {
    setCrops(prevCrops => [...prevCrops, { 
      id: prevCrops.length + 1, 
      farmSeasonStart: '', 
      farmSeasonEnd: ''
    }]);
  };

  const addFarm = (values: typeof formik.values) => {
    const newFarm: FarmDetails = {
      name: values.name,
      address: values.address,
      long: values.long,
      lat: values.lat,
      docUploads: values.docUploads.map(url => ({ url })), 
      crops: values.crops.map(crop => ({
        cropId: crop.cropId,
        farmSeasonStart: crop.farmSeasonStart,
        farmSeasonEnd: crop.farmSeasonEnd,
      }))
    };
  
    setSignupData({
      ...signupData,
      farmDetails: [...signupData.farmDetails, newFarm],
    });
  };
  

  return (
    <div className="farmer-wrapper">
      <div className="image-container">
        <img src={formImage} alt="Farm Warehouse" className='image'/>
      </div>
        <ProgressSteps currentStep={4} totalSteps={4} />
      <div className="farmer-container">
        <div className="farmer-form">
      <div id="farmer-back">
         <div onClick={() => navigate("/")}><FontAwesomeIcon icon={faChevronLeft}/>  Back home</div> <div onClick={() => navigate("/")}>Login</div></div>
          <Form onSubmit={formik.handleSubmit}>
            <h2>Create Account</h2>
            <p>Farm Registration</p>
            {/* <div> */}
              {/* <div>
              <table className="farms-table" ref={carouselRef}>
                  <tbody>
                    {farms.length > 0 && (
                      <>
                        <tr key={farms[currentFarmIndex].id} className="first-row">
                          <td>Farm {farms[currentFarmIndex].id}</td>
                          <td></td>
                          <td>
                            <FontAwesomeIcon icon={faEdit} className="edit-icon" />
                            <FontAwesomeIcon icon={faTrashAlt} className="delete-icon" />
                          </td>
                        </tr>
                        <tr className="second-row">
                          <td><p>FARM NAME</p>{farms[currentFarmIndex].name}</td>
                          <td><p>LONGITUDE</p><span className='longitude'>{farms[currentFarmIndex].longitude}</span></td>
                          <td><p>LATITUDE</p><span className='latitude'>{farms[currentFarmIndex].latitude}</span></td>
                        </tr>
                        <tr className="third-row">
                          <td><p>CROPS PRODUCED</p><span className='crop'>{farms[currentFarmIndex].crops.join(', ')}</span></td>
                          <td><p>DOCUMENTS</p><span className="docs">
                            <FontAwesomeIcon icon={faCloudArrowUp} className="upload-icon" />
                          </span></td>
                        </tr>
                      </>
                    )}
                  </tbody>
                </table>
              </div> */}
              {/* <div className="carousel-controls d-flex m-5">
                <Button variant="outline-secondary" className="carousel-button prev" onClick={handlePrev}>
                  <FontAwesomeIcon icon={faChevronLeft} />
                </Button>
                <div className="scroll-dots">
                  {farms.map((_, index) => (
                    <span
                      key={index}
                      className={index === currentFarmIndex ? 'active' : ''}
                    />
                  ))}
                </div>
                <Button variant="outline-secondary" className="carousel-button next" onClick={handleNext}>
                  <FontAwesomeIcon icon={faChevronRight} />
                </Button>
              </div> */}
            {/* </div> */}

            <Form.Group style={{ width: '360px', height: '70px', marginBottom: '25px' }}>
              <Form.Label htmlFor="name">Farm Name*</Form.Label>
              <Form.Control
                id="name"
                type="text"
                placeholder="Enter farm name"
                {...formik.getFieldProps('name')}
                isInvalid={!!formik.errors.name && formik.touched.name}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.name}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Row className="d-flex justify-content-between" style={{ width: '388px', height: '70px', gap: '30px' }}>
                <Col>
                  <Form.Label>Longtitude*</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Longtitude"
                    {...formik.getFieldProps('longtitude')}
                    isInvalid={Boolean(formik.touched.long && formik.errors.lat)}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.long}
                  </Form.Control.Feedback>
                </Col>
                <Col>
                  <Form.Label>Latitude*</Form.Label>
                  <div className="gender-options">
                  <Form.Control
                    type="text"
                    placeholder="Latitude"
                    {...formik.getFieldProps('latitude')}
                    isInvalid={Boolean(formik.touched.long && formik.errors.lat)}
                  />
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.lat}
                    </Form.Control.Feedback>
                  </div>
                </Col>
              </Row>
            </Form.Group>
            <Form.Group>
              <Form.Label>Crops cultivated and planting season</Form.Label>
              {crops.map((crop, index) => (
                <div key={crop.id} className="farm-group" style={{ backgroundColor: '#F9FAFB', marginBottom: '10px', width: '360px', height: '204px', gap: '8px'}}>
                  <div className="crop-number">CROP {index + 1}</div>
                  <Form.Group>
                    <Form.Label>What crop do you cultivate on this farm?</Form.Label>
                    <Form.Control
                      as="select"
                      className='select-site'
                      {...formik.getFieldProps(`crops[${index}]`)}
                    >
                      <option value="">Rice</option>
                      <option value="">Maize</option>
                      <option value="">Millet</option>
                      <option value="">Egusi</option>
                    </Form.Control>
                  </Form.Group>
                  <div className="form-group" style={{ backgroundColor: '#F9FAFB', padding: '10px', width: '360px', height: '204px' }}>
                    <div style={{ display: "flex", gap: "10px", margin: "0" }}>
                      <div style={{ flex: 1 }}>
                        <Form.Label>Start Month</Form.Label>
                        <Form.Control as="select" className='select-site' required>

                        <option value="jan">January</option>
                          <option value="feb">February</option>
                          <option value="mar">March</option>
                          <option value="apr">April</option>
                          <option value="may">May</option>
                          <option value="jun">June</option>
                          <option value="jul">July</option>
                          <option value="aug">August</option>
                          <option value="sep">September</option>
                          <option value="oct">October</option>
                          <option value="nov">November</option>
                          <option value="dec">December</option>
                        </Form.Control>
                      </div>
                      <div style={{ flex: 1 }}>
                        <Form.Label>End Month</Form.Label>
                        <Form.Control as="select" className='select-site' required>
                          <option value="jan">January</option>
                          <option value="feb">February</option>
                          <option value="mar">March</option>
                          <option value="apr">April</option>
                          <option value="may">May</option>
                          <option value="jun">June</option>
                          <option value="jul">July</option>
                          <option value="aug">August</option>
                          <option value="sep">September</option>
                          <option value="oct">October</option>
                          <option value="nov">November</option>
                          <option value="dec">December</option>
                        </Form.Control>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <Button
                variant="success"
                type="button"
                style={{
                  backgroundColor: '#E7F5F1',
                  color: "#5EBAA2",
                  border: '1px solid #90D0BF',
                  width: "60%",
                  marginBottom: "10px",
                  marginLeft: "auto",
                }}
                onClick={addCrop}
              >
                + Add another crop
              </Button>
            </Form.Group>
            <Form.Group style={{ width: '360px', height: '102px', gap: '16px', marginTop: '10px' }}>
            <Form.Label>Upload Farm documents</Form.Label>
              <div>
                <Form.Control
                  type="file"
                  id="file-upload"
                  className="file-upload-input"
                  onChange={handleFileUpload}
                  multiple
                  style={{ display: 'none' }}
                />
                <label htmlFor="file-upload" className="file-upload-label">
                  <FontAwesomeIcon icon={faCloudArrowUp} className="upload-icon" />
                  <div className="upload-placeholder">
                    <span style={{ color: '#28a745'}}>Click to upload</span> or drag and drop PNG, JPG, or PDF (max. 10mb)
                  </div>
                </label>
              </div>
              {files.length > 0 && (
                <div className="upload-progress-wrapper" style={{ width: '360px', height: '50px', gap: '16px', marginTop: '10px' }}>
                  {files.map((file, index) => (
                    <div key={index} className="upload-details">
                      <div className="file-name">{file.name}</div>
                      <div className="file-size">{file.size}</div>
                      <div className="upload-progress">
                        <div
                          className="upload-progress-bar"
                          style={{ width: `${file.progress}%`, backgroundColor: '#429875' }}
                        >
                          {file.complete && (
                            <FontAwesomeIcon icon={faCheck} className="check-icon" style={{ gap: '16px', marginTop: '15px' }} />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Form.Group>

            <div className="farmer-buttons">
              <Button variant="secondary" type="button" className="back" onClick={() => navigate("/security")}>
                Back
              </Button>
              <Button type="submit" variant="primary" className="continue">
                Add Farm
              </Button>
              <Modal show={showModal} onClose={handleCloseModal} onAddAnotherFarm={handleAddAnotherFarm} />
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Farmer;
