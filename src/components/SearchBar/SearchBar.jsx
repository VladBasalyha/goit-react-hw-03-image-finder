import { Component } from 'react';
import { MdOutlineScreenSearchDesktop } from 'react-icons/md';
import { ToastContainer, toast } from 'react-toastify';
import PropTypes from 'prop-types';
import 'react-toastify/dist/ReactToastify.css';
import css from '../SearchBar/SearchBar.module.css';

export class SearchBar extends Component {
  state = {
    gallerySearchValue: '',
  };
  submitForm = e => {
    e.preventDefault();
    const { gallerySearchValue } = this.state;
    if (gallerySearchValue.trim() === '') {
      toast.warn('Input for search can not be an empty field!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,

        theme: 'light',
      });
      return;
    }
    this.props.onSubmit(gallerySearchValue.toLowerCase());
  };
  onInputChange = e => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  };
  render() {
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.submitForm}>
          <button type="submit" className={css.SearchFormButton}>
            <MdOutlineScreenSearchDesktop />
          </button>

          <input
            className={css.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            name="gallerySearchValue"
            placeholder="Search images and photos"
            onChange={this.onInputChange}
            value={this.state.gallerySearchValue}
          />
        </form>
        <ToastContainer />
      </header>
    );
  }
}
SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
