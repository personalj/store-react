import { FC } from 'react';
import Logo from '../logo/Logo.tsx';
import Nav from '../nav/Nav.tsx';
import classes from './Footer.module.scss';

const Footer: FC = () => {
  return (
    <footer className={classes.footer}>
      <div className={`container ${classes.footer__container}`}>
        <Logo styled="light" />
        <Nav styled="light" />
      </div>
    </footer>
  );
};

export default Footer;
