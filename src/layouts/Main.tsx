import React, { FC } from 'react';
import Header from '../components/header/Header.tsx';
import Nav from '../components/nav/Nav.tsx';
import Footer from '../components/footer/Footer.tsx';
import classes from './Main.module.scss';
type Props = {
  children: React.ReactNode;
};

const Main: FC<Props> = ({ children }) => {
  return (
    <>
      <div className={classes.top}>
        <Header />
        <Nav />
      </div>
      <main className="container">{children}</main>
      <Footer />
    </>
  );
};

export default Main;
