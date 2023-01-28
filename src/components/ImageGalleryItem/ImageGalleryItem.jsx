import css from '../ImageGalleryItem/ImageGalleryItem.module.css';
import PropTypes from 'prop-types';
export const ImageGalleryItem = ({ id, url, name, openModal, largeImage }) => {
  return (
    <li
      key={id}
      className={css.ImageGalleryItem}
      onClick={() => openModal(largeImage, name)}
    >
      <img
        className={css.ImageGalleryItemImage}
        width="200"
        height="150"
        src={url}
        alt={name}
      />
    </li>
  );
};
ImageGalleryItem.propTypes = {
  url: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
  largeImage: PropTypes.string.isRequired,
};
