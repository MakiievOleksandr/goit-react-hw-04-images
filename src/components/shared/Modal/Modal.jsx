// import PropTypes from 'prop-types';

import { useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';

import scss from './modal.module.scss';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ close, children }) => {
  const closeModal = useCallback(
    ({ target, currentTarget, code }) => {
      if (target === currentTarget || code === 'Escape') {
        close();
        document.removeEventListener('keydown', closeModal);
      }
    },
    [close]
  );

  useEffect(() => {
    document.addEventListener('keydown', closeModal);
  }, [closeModal]);

  return createPortal(
    <div className={scss.overlay} onClick={closeModal}>
      <div className={scss.modal}>{children}</div>
    </div>,
    modalRoot
  );
};

export default Modal;

// Modal.propTypes = {
//   close: PropTypes.func.isRequired,
//   children: PropTypes.any.isRequired,
// };
