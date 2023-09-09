import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux.ts';
import { ReactComponent as CartIcon } from '../../assets/bag.svg';
import { useCartTotalQuantity } from '../../hooks/useGetCartTotal.ts';
import Logo from '../logo/Logo.tsx';
import classes from './Header.module.scss';

const Header: FC = () => {
  const { cartList } = useAppSelector((state) => state.cart);
  const { totalQuantity } = useCartTotalQuantity(cartList);
  return (
    <header className={classes.header}>
      <div className="container">
        <div className={classes.header__container}>
          <Logo />
          <Link to="/cart" className={classes.header__cart}>
            <CartIcon />
            <span className={classes.header__cartAmount}>{totalQuantity}</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
