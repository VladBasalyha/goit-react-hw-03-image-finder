import { Rings } from 'react-loader-spinner';
import css from '../Loader/Loader.module.css';
export const Loader = () => {
  return (
    <div className={css.loader}>
      <Rings
        height="80"
        width="80"
        color="#4fa94d"
        radius="6"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="rings-loading"
      />
    </div>
  );
};
