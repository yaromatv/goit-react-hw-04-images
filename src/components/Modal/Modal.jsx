import { useEffect } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

const Modal = ({ toggleScroll, resetImg, modalImg }) => {
  // componentDidMount()
  useEffect(() => {
    const handleKeyDown = event => {
      if (event.code === 'Escape') {
        resetImg();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    toggleScroll();

    // componentWillUnmount()
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      toggleScroll();
    };
  }, [resetImg, toggleScroll]);

  const handleClick = event => {
    if (event.target === event.currentTarget) {
      resetImg();
    }
  };

  return (
    <div onClick={handleClick} className={css.Overlay}>
      <div className={css.Modal}>
        <img src={modalImg} alt="" />
      </div>
    </div>
  );
};

Modal.propTypes = {
  modalImg: PropTypes.string.isRequired,
  resetImg: PropTypes.func.isRequired,
  toggleScroll: PropTypes.func.isRequired,
};

export default Modal;
