import { Component } from 'react';
import PropTypes from 'prop-types';
import { Overlay, ModalWrapper } from './Modal.styled';

class Modal extends Component {
  static propTypes = {
    onCloseModal: PropTypes.func.isRequired,
    src: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  };

  componentDidMount() {
    document.addEventListener('keydown', this.handleClose);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleClose);
  }

  handleClose = e => {
    const { onCloseModal } = this.props;
    if (e.currentTarget === e.target || e.code === 'Escape') {
      onCloseModal();
    }
  };
  render() {
    const { src, name } = this.props;
    return (
      <Overlay onClick={this.handleClose}>
        <ModalWrapper>
          <img src={src} alt={name} />
        </ModalWrapper>
      </Overlay>
    );
  }
}

export default Modal;
