import { FC, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks/redux.ts';
import { useLocation } from 'react-router-dom';
import { fetchAsyncProducts, removeProducts } from '../../store/products/productSlice.ts';
import Categories from '../../components/categories/Categories.tsx';
import Main from '../../layouts/Main.tsx';
import LoadingSpinner from '../../components/loader/Loader.tsx';
import ProductList from '../../components/products/ProductList.tsx';
import { getLoading, getError } from '../../store/products/selectors.ts';
import classes from './Products.module.scss';

const Products: FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categorySlug = queryParams.get('category');
  const loading = useAppSelector(getLoading);
  const error = useAppSelector(getError);

  useEffect(() => {
    dispatch(fetchAsyncProducts(categorySlug));
    return () => {
      dispatch(removeProducts());
    };
  }, [dispatch, categorySlug]);

  return (
    <Main>
      <div className={classes.info}>
        <aside className={classes.info__aside}>
          <Categories />
        </aside>
        <div className={classes.info__main}>
          {loading ? (
            <div>
              <LoadingSpinner />
            </div>
          ) : (
            <ProductList />
          )}
          {error && <div className="error">{error}</div>}
        </div>
      </div>
    </Main>
  );
};

export default Products;
