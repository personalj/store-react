import { FC, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks/redux.ts';
import { useLocation } from 'react-router-dom';
import { fetchAsyncProducts, removeProducts } from '../../store/products/productSlice.ts';
import classes from './Products.module.scss';
import Categories from '../../components/categories/Categories.tsx';
import Main from '../../layouts/Main.tsx';
import LoadingSpinner from '../../components/loader/Loader.tsx';
import ProductList from '../../components/products/ProductList.tsx';

const Products: FC = () => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.products);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categorySlug = queryParams.get('category');

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
