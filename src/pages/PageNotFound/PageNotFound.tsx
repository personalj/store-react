import { FC } from 'react';
import classes from './PageNotFound.module.scss';
import Main from '../../layouts/Main.tsx';

const PageNotFound: FC = () => {
  return (
    <Main>
      <h1 className={classes.title}>Page not found</h1>
    </Main>
  );
};

export default PageNotFound;
