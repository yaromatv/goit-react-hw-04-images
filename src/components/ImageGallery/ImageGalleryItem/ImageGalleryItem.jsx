import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ onClick, data }) => {
  const handleClick = event => {
    const img = event.target.getAttribute('alt');
    onClick(img);
  };

  return data.map(({ id, webformatURL, largeImageURL }) => {
    return (
      <li key={id} onClick={handleClick} className={css.ImageGalleryItem}>
        <img
          className={css.ImageGalleryItem_image}
          src={webformatURL}
          alt={largeImageURL}
        />
      </li>
    );
  });
};

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
