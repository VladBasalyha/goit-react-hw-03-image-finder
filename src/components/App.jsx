import { Component } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { SearchBar } from './SearchBar/SearchBar';
import { Modal } from './Modal/Modal';
import { LoadMoreButton } from './Button/LoadMoreButton';
import { Loader } from './Loader/Loader';
import { toast } from 'react-toastify';

import fetchItems from '../services/api';
import css from './Modal/Modal.module.css';
import 'react-toastify/dist/ReactToastify.css';

export class App extends Component {
  state = {
    searchValue: '',
    gallery: [],
    page: 1,
    loading: false,
    isFull: false,
    showModal: false,
    modalImage: '',
    imageAlt: '',
    isDisabled: false,
  };
  componentDidUpdate(prevprops, prevstate) {
    const { searchValue, page } = this.state;
    if (prevstate.searchValue === searchValue && prevstate.page !== page) {
      this.setState({ loading: true, isDisabled: true });

      fetchItems(searchValue, page)
        .then(response => {
          if (response.ok) {
            return response.json();
          }
        })
        .then(images => {
          if (images.hits.length === 0) {
            this.setState({ isFull: true });
            toast.info('No more images found :(');
          }
          this.setState({
            loading: true,
            gallery: [...this.state.gallery, ...images.hits],
          });
        })

        .finally(() => {
          this.setState({ loading: false, isDisabled: false });
        });
    }
  }
  onHandleSubmit = inputValue => {
    const { searchValue, page } = this.state;
    if (inputValue === searchValue) {
      return toast.warn('You have just searched images by this request');
    }
    fetchItems(inputValue, page)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
      })
      .then(images => {
        if (images.hits.length === 0) {
          this.setState({ isFull: true });
          toast.error(`There are no images by "${inputValue}" request `);
        }
        this.setState({
          gallery: images.hits,
        });
      })
      .finally(
        () => this.setState({ loading: false }),
        this.setState(prevstate => ({ page: prevstate.page + 1 })),
        this.setState({ isDisabled: false, isFull: false })
      );
    this.setState({ searchValue: inputValue, page: 1, gallery: [] });
  };
  toggleModal = (modalImage = '', imageAlt = '') => {
    this.setState(state => ({
      showModal: !state.showModal,
      modalImage,
      imageAlt,
    }));
  };
  onLoadMore = () => {
    this.setState(prevstate => ({
      page: prevstate.page + 1,
    }));
  };
  render() {
    const {
      gallery,
      loading,
      showModal,
      modalImage,
      imageTags,
      isFull,
      isDisabled,
    } = this.state;

    return (
      <>
        <SearchBar onSubmit={this.onHandleSubmit}></SearchBar>
        <ImageGallery
          gallery={gallery}
          openModal={this.toggleModal}
        ></ImageGallery>
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img className={css.ImageModal} src={modalImage} alt={imageTags} />
          </Modal>
        )}
        {loading && <Loader></Loader>}
        {gallery.length >= 12 && !isFull && (
          <LoadMoreButton
            isDisabled={isDisabled}
            onLoadMore={this.onLoadMore}
          />
        )}
      </>
    );
  }
}
