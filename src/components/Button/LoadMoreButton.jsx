import css from '../Button/Button.module.css';
import PropTypes from 'prop-types';
export const LoadMoreButton = ({ onLoadMore, isDisabled }) => {
  return (
    <div className={css.ButtonWrapper}>
      <button
        disabled={isDisabled}
        className={css.Button}
        type="button"
        onClick={onLoadMore}
      >
        Load more
      </button>
    </div>
  );
};
LoadMoreButton.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool.isRequired,
};
