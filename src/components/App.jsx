import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from 'components/Button';
import Loader from 'components/Loader';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Modal from './Modal';
import { fetchImages, PER_PAGE } from 'services/api-pixabay';

const STATUS = {
  IDLE: 'idle',
  PENDING: 'pending',
  REJECTED: 'rejected',
  RESOLVED: 'resolved',
};

const INIT_STATE = { page: 1, query: '', images: [] };

export class App extends Component {
  state = {
    ...INIT_STATE,
    status: STATUS.IDLE,
    total: 500,
    showModal: false,
    selectedImage: null,
  };

  async componentDidUpdate(_, prevState) {
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      this.setState({ status: STATUS.PENDING });
      const { page, query, images } = this.state;

      try {
        const { data } = await fetchImages(query, page);
        this.handleData(data, page, images);
      } catch (error) {
        this.setState({ status: STATUS.REJECTED });
        toast.error(error.message);
      }
    }
  }

  handleData = (data, page, images) => {
    if (data.hits.length === 0) {
      this.setState({ status: STATUS.REJECTED });
      return toast.error(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }

    this.setState({
      status: STATUS.RESOLVED,
      images: page > 1 ? [...images, ...data.hits] : [...data.hits],
      total: data.totalHits,
    });

    page === 1 && toast(` Hooray! We found ${data.totalHits} images.`);
  };

  handleClick = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  handleFormSubmit = query => {
    this.setState({ ...INIT_STATE, query });
  };

  handleModal = image => {
    this.setState({
      showModal: true,
      selectedImage: image,
    });
  };

  onCloseModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    const { images, status, page, total, showModal, selectedImage } =
      this.state;

    return (
      <div
        style={{
          textAlign: 'center',
        }}
      >
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery images={images} showModal={this.handleModal} />
        {status === STATUS.PENDING && <Loader />}
        {status === STATUS.REJECTED && <></>}
        {status === STATUS.RESOLVED && (
          <>
            {page < Math.floor(total / PER_PAGE) && (
              <Button onClick={this.handleClick} text="Load more"></Button>
            )}
            {showModal && (
              <Modal
                onCloseModal={this.onCloseModal}
                src={selectedImage.largeImageURL}
                name={selectedImage.tags}
              />
            )}
          </>
        )}
        <ToastContainer style={{ fontSize: '20px' }} />
      </div>
    );
  }
}
