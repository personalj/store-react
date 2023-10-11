import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import classes from './Nav.module.scss';

type Props = {
  styled?: string;
};

const Nav: FC<Props> = ({ styled }) => {
  const navLink = [
    { path: '/', name: 'Home' },
    { path: '/catalog', name: 'Catalog' },
  ];
  return (
    <nav>
      <ul className={`${styled === 'light' ? classes.nav_light : ''} ${classes.nav}`}>
        {navLink.map((link) => (
          <li className={classes.nav__item} key={link.path}>
            <NavLink
              to={link.path}
              className={({ isActive }) =>
                isActive ? `${classes.nav__link} ${classes.nav__link_active}` : classes.nav__link
              }
            >
              {link.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
