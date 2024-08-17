import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Table, Button, Form, InputGroup } from 'react-bootstrap';
import './farmer-account.scss';
import ProgressSteps from '../steps/progressSteps';
import formImage from './cow.png';
import Modal from '../stepFive/modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudArrowUp, faEdit, faCheck, faTrashAlt, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const validationSchema = Yup.object({
  name: Yup.string().required('Farm Name is required'),
  longitude: Yup.string(),
  latitude: Yup.string(),
  documents: Yup.array().of(Yup.string())
});

export const Farmer: React.FC = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [files, setFiles] = useState<Array<{ name: string; size: string; progress: number; complete: boolean }>>([]);
  const [crops, setCrops] = useState<Array<{ id: number }>>([{ id: 1 }]);
  const [formData, setFormData] = useState({
    name: '',
    longitude: '',
    latitude: '',
    crops: [] as string[],
    documents: [] as string[],
  });
  const [farms, setFarms] = useState<Array<{ id: number; name: string; longitude: string; latitude: string; crops: string[]; documents: string[] }>>([
    {
      id: 1,
      name: 'Buba Farm',
      longitude: '8.0876 E',
      latitude: '4.765 N',
      crops: ["Millet"],
      documents: ['Docs.pdf']
    }
  ]);
  const [currentFarmIndex, setCurrentFarmIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const formik = useFormik({
    initialValues: {
      name: '',
      longitude: '',
      latitude: '',
      crops: [] as string[],
      documents: [] as string[],
    },
    validationSchema,
    onSubmit: (values) => {
      addFarm(values);
      setFormData({
        name: '',
        longitude: '',
        latitude: '',
        crops: [],
        documents: [],
      });
      setShowModal(true);
    },
  });

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);
    const newFiles = selectedFiles.map(file => ({
      name: file.name,
      size: formatFileSize(file.size),
      progress: 0,
      complete: false
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
  };

  const formatFileSize = (size: number): string => {
    if (size < 1024) return `${size} bytes`;
    else if (size < 1024 * 1024) return `${(size / 1024).toFixed(2)} KB`;
    else return `${(size / (1024 * 1024)).toFixed(2)} MB`;
  };

  const handleNext = () => {
    if (currentFarmIndex < farms.length - 1) {
      setCurrentFarmIndex(prevIndex => prevIndex + 1);
      carouselRef.current?.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (currentFarmIndex > 0) {
      setCurrentFarmIndex(prevIndex => prevIndex - 1);
      carouselRef.current?.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    navigate('/');
  };

  const handleAddAnotherFarm = () => {
    setShowModal(false);
  };
  const addCrop = () => {
    setCrops(prevCrops => [...prevCrops, { id: prevCrops.length + 1 }]);
  };
  const addFarm = (values: typeof formik.values) => {
    const newFarmId = farms.length + 1;
    setFarms(prevFarms => [
      ...prevFarms,
      {
        id: newFarmId,
        name: values.name,
        longitude: values.longitude,
        latitude: values.latitude,
        crops: values.crops,
        documents: values.documents
      }
    ]);
  };

  return (
    <div className="farmer-wrapper">
      <div className="image-container">
        <img src={formImage} alt="Farm Warehouse" className='image'/>
      </div>
        <ProgressSteps currentStep={4} totalSteps={4} />
      <div className="form">
        <div className="form-section">
            <div style={{ width: '350px', display: 'flex', justifyContent: 'space-between', color: 'red' }}>
              <a href="/" className="">Back home</a>
              <a href="/login" className="">Already have an account? Log in</a>
            </div>
          <Form onSubmit={formik.handleSubmit}>
            <h2>Create Account</h2>
            <p>Farm Registration</p>
            <div>
              <div>
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
              </div>
              <div className="carousel-controls d-flex m-5">
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
              </div>
            </div>

            <Form.Group>
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
             <Form.Group>
              <Form.Label htmlFor="coordinate">Farm Coordinate (Optional)</Form.Label>
              <div className="form-group">
                <div className="coordinate-inputs">
                  <div className="coordinate-item">
                    <Form.Control
                      id="longitude"
                      type="text"
                      placeholder="Enter Longitude"
                      {...formik.getFieldProps('longitude')}
                    />
                    <p className='lat'>Ex: 8.0876° E</p>
                  </div>
                  <div className="coordinate-item">
                    <Form.Control
                      id="latitude"
                      type="text"
                      placeholder="Enter Latitude"
                      {...formik.getFieldProps('latitude')}
                    />
                    <p className='lat'>4.7650° N</p>
                  </div>
                </div>
              </div>
            </Form.Group>


            <Form.Group>
              <Form.Label>Crops cultivated and planting season</Form.Label>
              {crops.map((crop, index) => (
                <div key={crop.id} className="farm-group" style={{ backgroundColor: '#F9FAFB', padding: '5px', margin: 0 }}>
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
                  <div className="form-group" style={{ backgroundColor: '#F9FAFB', padding: '10px' }}>
                    <div style={{ display: "flex", gap: "10px", margin: "0" }}>
                      <div style={{ flex: 1 }}>
                        <Form.Label>Start Month</Form.Label>
                        <Form.Control as="select" className='select-site' required>
                          <option value="">January</option>
                          <option value="">February</option>
                          <option value="">March</option>
                          <option value="">April</option>
                          <option value="">May</option>
                          <option value="">June</option>
                          <option value="">July</option>
                          <option value="">August</option>
                          <option value="">September</option>
                          <option value="">October</option>
                          <option value="">November</option>
                          <option value="">December</option>
                        </Form.Control>
                      </div>
                      <div style={{ flex: 1 }}>
                        <Form.Label>End Month</Form.Label>
                        <Form.Control as="select" className='select-site' required>
                          <option value="">January</option>
                          <option value="">February</option>
                          <option value="">March</option>
                          <option value="">April</option>
                          <option value="">May</option>
                          <option value="">June</option>
                          <option value="">July</option>
                          <option value="">August</option>
                          <option value="">September</option>
                          <option value="">October</option>
                          <option value="">November</option>
                          <option value="">December</option>
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

            <Form.Group>
              <Form.Label>Upload Farm documents</Form.Label>
              <div className="file-upload-wrapper">
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
                    <span style={{ color: '#28a745' }}>Click to upload</span> or drag and drop PNG, JPG, or PDF (max. 10mb)
                  </div>
                </label>
              </div>
              {files.length > 0 && (
                <div className="upload-progress-wrapper">
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
                            <FontAwesomeIcon icon={faCheck} className="check-icon" />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Form.Group>

            <div className="buttons">
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
