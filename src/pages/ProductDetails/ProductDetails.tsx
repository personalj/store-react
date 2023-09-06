import { FC, useEffect } from 'react';
import { useParams } from 'react-router';
import { fetchAsyncProduct, removeProduct } from '../../store/products/productSlice.ts';
import { useAppSelector, useAppDispatch } from '../../hooks/redux.ts';
import { setToCart } from '../../store/cart/cartSlice.ts';
import Main from '../../layouts/Main.tsx';
import classes from './ProductDetails.module.scss';
import LoadingSpinner from '../../components/loader/Loader.tsx';
import Button from '../../components/ui/Button.tsx';

const ProductDetails: FC = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const { product, loading, error } = useAppSelector((state) => state.products);

  useEffect(() => {
    if (id) {
      dispatch(fetchAsyncProduct(id));
    }
    return () => {
      dispatch(removeProduct());
    };
  }, [dispatch, id]);

  return (
    <Main>
      <div className={classes.product}>
        {loading ? (
          <div>
            <LoadingSpinner />
          </div>
        ) : product ? (
          <div className={classes.product__info}>
            <div className={classes.product__left}>
              <div className={classes.product__img}>
                {product.image ? <img src={product.image} alt={product.title} /> : <div>Image not found </div>}
              </div>
            </div>
            <div className={classes.product__right}>
              <h1 className={classes.product__title}>{product.title}</h1>
              <div className={classes.product__price}>{product.price} $</div>
              <p className={classes.product__description}>{product.description}</p>
              <Button onClick={() => dispatch(setToCart({ ...product, quantity: 1 }))}>Add to cart</Button>
            </div>
          </div>
        ) : (
          <div className={classes.product__empty}>Product not found</div>
        )}
        {error && <div className="error">{error}</div>}
      </div>
    </Main>
  );
};

export default ProductDetails;
