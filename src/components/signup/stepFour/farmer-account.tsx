import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './farmer-account.scss';
import ProgressSteps from '../steps/progressSteps';
import formImage from './farmImage.png';
import Modal from '../stepFive/modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudArrowUp, faEdit, faCheck, faTrashAlt, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

export const Farmer: React.FC = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [files, setFiles] = useState<Array<{ name: string; size: string; progress: number; complete: boolean }>>([]);
  const [crops, setCrops] = useState<Array<{ id: number }>>([{ id: 1 }]);
  const [farms, setFarms] = useState<Array<{ id: number; name: string; longitude: string; latitude: string; crops: string[]; documents: string[] }>>([
    {
      id: 1,
      name: 'Buba Farm',
      longitude: '8.0876 E',
      latitude: '4.765 N',
      crops: ["Millet"],
      documents: ['Document1.pdf']
    }
  ]);
  const [formData, setFormData] = useState({
    name: '',
    longitude: '',
    latitude: '',
    crops: [] as string[],
    documents: [] as string[],
  });
  const [currentFarmIndex, setCurrentFarmIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // @ts-expect-error
    const target = event.nativeEvent.submitter as HTMLButtonElement;
    if (target.name === 'add-farm') {
      addFarm();
      setFormData({
        name: '',
        longitude: '',
        latitude: '',
        crops: [],
        documents: [],
      });
      setShowModal(true);
    } else if (target.name === 'back') {
      navigate('/security');
    }
  };

  const addCrop = () => {
    setCrops(prevCrops => [...prevCrops, { id: prevCrops.length + 1 }]);
  };

  const addFarm = () => {
    const newFarmId = farms.length + 1;
    setFarms(prevFarms => [
      ...prevFarms,
      {
        id: newFarmId,
        name: formData.name,
        longitude: formData.longitude,
        latitude: formData.latitude,
        crops: formData.crops,
        documents: formData.documents
      }
    ]);
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
    navigate('/login');
  };
  const handleAddAnotherFarm = () => {
    setShowModal(false);
  };
  return (
    <div className="account-creation-container">
      <div className="image-section">
        <img src={formImage} alt="Farm Warehouse" />
      </div>
      <div className="form-wrapper">
        <ProgressSteps currentStep={4} totalSteps={4} />
        <div className="form-section">
          <div className="form-header">
            <a href="/" className="back-home">Back home</a>
            <a href="/login" className="login-link">Already have an account? Log in</a>
          </div>
          <form onSubmit={handleSubmit}>
            <h2>Create Account</h2>
            <p>Farm Registration</p>
            <div>
              <div>

                {/* <table className="farms-table" ref={carouselRef}>
                  <tbody>
                    {farms.map((farm) => (
                      <>
                      <tr key={farm.id} className="first-row">
                        <td>Farm {farm.id}</td>
                        <td></td>
                        <td>
                          <FontAwesomeIcon icon={faEdit} className="edit-icon" />
                          <FontAwesomeIcon icon={faTrashAlt} className="delete-icon" />
                        </td>
                      </tr>
                      <tr className="second-row">

                      <td><p>FARM NAME</p>{farm.name}</td>
                        <td><p>LONGTITUDE</p><span className='longtitude'>{farm.longitude}</span></td>
                        <td><p>LATITUDE</p><span className='latitude'>{farm.latitude}</span></td>
                      </tr>

                      <tr className="third-row">
                      <td><p>CROPS PRODUCED</p><span className='crop'>{farm.crops.join(', ')}</span></td>
                      <td><p>DOCUMENTS</p><span className="docs">
                        
                  <FontAwesomeIcon icon={faCloudArrowUp} className="upload-icon" />
                        </span></td>
                      </tr>
                      </>
                    ))}
                  </tbody>
                </table> */}
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
              <div className="carousel-controls">
                <button className="carousel-button prev" onClick={handlePrev}>
                  <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                <div className="scroll-dots">
                  {farms.map((_, index) => (
                    <span
                      key={index}
                      className={index === currentFarmIndex ? 'active' : ''}
                    />
                  ))}
                </div>
                <button className="carousel-button next" onClick={handleNext}>
                  <FontAwesomeIcon icon={faChevronRight} />
                </button>
              </div>

            </div>



            <div className="form-group">
              <div>
                <label>Farm Name*</label>
                <input type="text" placeholder="Enter farm name" required />
              </div>
            </div>
            <div className="form-group">
              <label>Farm Coordinate (Optional)</label>
              <div className="form-group" style={{ display: "flex", gap: "10px", marginBottom: "1px" }}>
                <div style={{ flex: 1 }}>
                  <input type="text" placeholder="Enter Longitude" />
                </div>
                <div style={{ flex: 1 }}>
                  <input type="text" placeholder="Enter Latitude" />
                </div>
              </div>
              <p className='lat'>Ex: Longitude: 8.6375° E Latitude: 9.0820° N</p>
            </div>
            <h4>Crops cultivated and planting season</h4>
            {crops.map((crop, index) => (
              <div key={crop.id} className="farm-group" style={{ backgroundColor: '#F9FAFB', padding: '5px', margin: 0 }}>
                <div className="crop-number">CROP {index + 1}</div>
                <div className="form-group">
                  <label>What crop do you cultivate on this farm?</label>
                  <select className='select-site' required>
                    <option value="">Rice</option>
                    <option value="">Maize</option>
                    <option value="">Millet</option>
                    <option value="">Egusi</option>
                  </select>
                </div>
                <div className="form-group" style={{ backgroundColor: '#F9FAFB', padding: '10px' }}>
                  <div style={{ display: "flex", gap: "10px", margin: "0" }}>
                    <div style={{ flex: 1 }}>
                      <label>Start Month</label>
                      <select className='select-site' required>
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
                      </select>
                    </div>
                    <div style={{ flex: 1 }}>
                      <label>End Month</label>
                      <select className='select-site' required>
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
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <button className='add-crop-button' type='button' style={{
              backgroundColor: '#E7F5F1',
              color: "#5EBAA2",
              border: '1px solid #90D0BF',
              width: "50%"
            }} onClick={addCrop}>+ Add another crop</button>

            <div className="form-group">
              <label>Upload Farm documents</label>
              <div className="file-upload-wrapper">
                <input
                  type="file"
                  id="file-upload"
                  className="file-upload-input"
                  onChange={handleFileUpload}
                  multiple
                  style={{ display: 'none', background: "red" }}
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
            </div>
            <div className="buttons">
              <button type="submit" name="back" className="back" onClick={() => navigate("/security")}>
                Back
              </button>
              <button type="submit" name="add-farm" className="continue" onClick={addFarm}>
                Add Farm
              </button>
              <Modal show={showModal} onClose={handleCloseModal} onAddAnotherFarm={handleAddAnotherFarm} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Farmer;