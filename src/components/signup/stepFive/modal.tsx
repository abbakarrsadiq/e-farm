import React from 'react';
import Logo from "./modalLogo.png"
import './modal.scss'

interface ModalProps {
  show: boolean;
  onClose: () => void;
  onAddAnotherFarm: () => void;
}

const Modal: React.FC<ModalProps> = ({ show, onClose, onAddAnotherFarm }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <img src={Logo} alt="Logo" className="modal-logo" />
        </div>
        <div className="modal-body">
          <h2>You have added 1 farm</h2>
          <p>Would you like to add another?</p>
        </div>
        <div className="modal-footer">
          <button onClick={onClose} className="modal-close-button">
            No, create my account
          </button>
          <button onClick={onAddAnotherFarm} className="modal-add-button">
            Yes, I have another farm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
