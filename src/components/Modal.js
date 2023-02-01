import '../css/Modal.css';
import ReactDOM from 'react-dom';
import { useEffect } from 'react';

const Modal = function ({ onClose, actionBar, children }) {
  useEffect(() => {
    document.body.classList.add('overflow-hidden');

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, []);

  return ReactDOM.createPortal(
    <div>
      <div onClick={() => onClose()} className="modal-seethrough"></div>
      <div className="modal-container">
        {children}

        <div className="modal-btn-container">{actionBar}</div>
      </div>
    </div>,
    document.querySelector('.modal')
  );
};

export default Modal;
