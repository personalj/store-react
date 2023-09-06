import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types/product.ts';
import { useAppDispatch } from '../../hooks/redux.ts';
import { incrementCartItem, decrementCartItem, deleteFromCart } from '../../store/cart/cartSlice.ts';
import Button from '../ui/Button.tsx';
import classes from './CartItem.module.scss';

interface ChildProps {
  product: Product;
}
const CartItem: FC<ChildProps> = (props) => {
  const { id, title, price, image, quantity } = props.product;
  const dispatch = useAppDispatch();
  return (
    <div className={classes.product}>
      <div className={classes.product__left}>
        <Link to={`/product/${id}`} className={classes.product__image}>
          {image ? <img src={image} alt={title} /> : <div>Image not found </div>}
        </Link>
      </div>
      <div className={classes.product__right}>
        <div className={classes.product__delete}>
          <Button customStyles="btn_danger" onClick={() => dispatch(deleteFromCart(id))}>
            Delete
          </Button>
        </div>
        <Link to={`/product/${id}`} className={classes.product__title}>
          {title}
        </Link>
        <div className={classes.product__price}>{price} $</div>
        <div className={classes.product__quantity}>
          <Button onClick={() => dispatch(decrementCartItem(id))}>-</Button>
          <div className={classes.product__quantity_amount}>{quantity}</div>
          <Button onClick={() => dispatch(incrementCartItem(id))}>+</Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
