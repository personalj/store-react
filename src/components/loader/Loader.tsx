import { FC } from 'react';
import classes from './Loader.module.scss';
const LoadingSpinner: FC = () => {
  return (
    <div className={classes.spinner_container}>
      <div className={classes.loading_spinner}></div>
    </div>
  );
};

export default LoadingSpinner;
