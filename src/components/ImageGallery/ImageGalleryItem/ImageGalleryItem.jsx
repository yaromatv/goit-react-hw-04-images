import PropTypes from 'prop-types';
import { Component } from 'react';
import css from './ImageGalleryItem.module.css';

class ImageGalleryItem extends Component {
  handleClick = event => {
    const img = event.target.getAttribute('alt');
    this.props.onClick(img);
  };

  render() {
    return this.props.data.map(({ id, webformatURL, largeImageURL }) => {
      return (
        <li
          key={id}
          onClick={this.handleClick}
          className={css.ImageGalleryItem}
        >
          <img
            className={css.ImageGalleryItem_image}
            src={webformatURL}
            alt={largeImageURL}
          />
        </li>
      );
    });
  }
}

ImageGalleryItem.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
