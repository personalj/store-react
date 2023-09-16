import { FC } from 'react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button.tsx';
import classes from './CartItem.module.scss';

interface ChildProps {
  id: number;
  title: string;
  price: number;
  image?: string;
  quantity: number;
  onDelete: (id: number) => void;
  onIncrement: (id: number) => void;
  onDecrement: (id: number) => void;
}
const CartItem: FC<ChildProps> = ({ id, title, price, image, quantity, onDecrement, onIncrement, onDelete }) => {
  return (
    <div className={classes.product}>
      <div className={classes.product__left}>
        <Link to={`/product/${id}`} className={classes.product__image}>
          {image ? <img src={image} alt={title} /> : <div>Image not found </div>}
        </Link>
      </div>
      <div className={classes.product__right}>
        <div className={classes.product__delete}>
          <Button customStyles="btn_danger" onClick={() => onDelete(id)}>
            Delete
          </Button>
        </div>
        <Link to={`/product/${id}`} className={classes.product__title}>
          {title}
        </Link>
        <div className={classes.product__price}>{price} $</div>
        <div className={classes.product__quantity}>
          <Button onClick={() => onDecrement(id)}>-</Button>
          <div className={classes.product__quantity_amount}>{quantity}</div>
          <Button onClick={() => onIncrement(id)}>+</Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
