import PropTypes from 'prop-types';
import css from './Modal.module.css';
import { Component } from 'react';
// import { createPortal } from 'react-dom';

// const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
    this.props.toggleScroll();
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
    // this.props.resetImg();
    this.props.toggleScroll();
  }

  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.resetImg();
    }
  };

  handleClick = event => {
    if (event.target === event.currentTarget) {
      this.props.resetImg();
    }
  };

  render() {
    return (
      <div onClick={this.handleClick} className={css.Overlay}>
        <div className={css.Modal}>
          <img src={this.props.modalImg} alt="" />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  modalImg: PropTypes.string.isRequired,
  resetImg: PropTypes.func.isRequired,
  toggleScroll: PropTypes.func.isRequired,
};

export default Modal;
