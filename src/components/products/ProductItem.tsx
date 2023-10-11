import { FC } from 'react';
import { Link } from 'react-router-dom';
import { setToCart } from '../../store/cart/cartSlice.ts';
import { useAppDispatch } from '../../hooks/redux.ts';
import { Product } from '../../store/products/types.ts';
import Button from '../ui/Button.tsx';
import classes from './ProductItem.module.scss';

interface ChildProps {
  product: Product;
}
const ProductItem: FC<ChildProps> = (props) => {
  const { id, title, price, image } = props.product;
  const dispatch = useAppDispatch();
  return (
    <div className={classes.product}>
      <Link to={`/product/${id}`} className={classes.product__image}>
        {image ? <img src={image} alt={title} /> : <div>Image not found </div>}
      </Link>
      <Link to={`/product/${id}`} className={classes.product__title}>
        {title}
      </Link>
      <div className={classes.product__price}>{price} $</div>
      <div className={classes.product__btn}>
        <Button onClick={() => dispatch(setToCart({ ...props.product, quantity: 1 }))}>Add to cart</Button>
      </div>
    </div>
  );
};

export default ProductItem;
