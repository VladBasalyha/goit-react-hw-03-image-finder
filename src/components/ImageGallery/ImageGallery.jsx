import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import css from '../ImageGallery/ImageGallery.module.css';
import PropTypes from 'prop-types';
export const ImageGallery = ({ gallery, openModal }) => {
  return (
    <ul className={css.ImageGallery}>
      {gallery.map(({ id, webformatURL, largeImageURL, tags }) => (
        <ImageGalleryItem
          openModal={openModal}
          largeImage={largeImageURL}
          name={tags}
          key={id}
          url={webformatURL}
          alt={tags}
        />
      ))}
    </ul>
  );
};
ImageGallery.propTypes = {
  gallery: PropTypes.arrayOf(PropTypes.object),
  openModal: PropTypes.func.isRequired,
};
