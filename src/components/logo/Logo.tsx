import { FC } from 'react';
import { Link } from 'react-router-dom';
import classes from './Logo.module.scss';
type Props = {
  styled?: string;
};

const Logo: FC<Props> = ({ styled }) => {
  return (
    <Link to="/" className={`${styled === 'light' ? classes.logo_light : ''} ${classes.logo}`}>
      Shop
    </Link>
  );
};

export default Logo;
