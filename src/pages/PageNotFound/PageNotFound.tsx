import { FC } from 'react';
import Main from '../../layouts/Main.tsx';
import classes from './PageNotFound.module.scss';

const PageNotFound: FC = () => {
  return (
    <Main>
      <h1 className={classes.title}>Page not found</h1>
    </Main>
  );
};

export default PageNotFound;
