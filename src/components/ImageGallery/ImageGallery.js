import PropTypes from 'prop-types';

import { List } from './ImageGallery.styled';
import ImageGalleryItem from 'components/ImageGalleryItem';

const ImageGallery = ({ images, showModal }) => {
  return (
    <List>
      {images.map(image => {
        return (
          <ImageGalleryItem
            onClick={() => {
              showModal(image);
            }}
            src={image.webformatURL}
            name={image.tags}
            key={image.id}
          />
        );
      })}
    </List>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
  showModal: PropTypes.func.isRequired,
};

export default ImageGallery;
