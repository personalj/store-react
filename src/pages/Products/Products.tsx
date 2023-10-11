import { FC, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks/redux.ts';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchAsyncProducts, removeProducts } from '../../store/products/productSlice.ts';
import { fetchAsyncCategories, removeCategories } from '../../store/categories/categorySlice.ts';
import Categories from '../../components/categories/Categories.tsx';
import Main from '../../layouts/Main.tsx';
import LoadingSpinner from '../../components/loader/Loader.tsx';
import ProductList from '../../components/products/ProductList.tsx';
import { getLoading as getProductsLoading, getError as getProductsError } from '../../store/products/selectors.ts';
import {
  getCategories,
  getLoading as getCategoriesLoading,
  getError as getCategoriesError,
} from '../../store/categories/selectors.ts';
import classes from './Products.module.scss';

const Products: FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const categorySlug = queryParams.get('category');
  const activeCategory: string | null = queryParams.get('category');

  const productsLoading = useAppSelector(getProductsLoading);
  const productsError = useAppSelector(getProductsError);
  const categoriesLoading = useAppSelector(getCategoriesLoading);
  const categoriesError = useAppSelector(getCategoriesError);
  const categories = useAppSelector(getCategories);

  const handleCategoryClick = (val: string) => {
    if (val !== activeCategory) {
      queryParams.set('category', val);
    } else {
      queryParams.delete('category');
    }
    navigate({ search: queryParams.toString() });
  };

  useEffect(() => {
    dispatch(fetchAsyncProducts(categorySlug));
    return () => {
      dispatch(removeProducts());
    };
  }, [dispatch, categorySlug]);

  useEffect(() => {
    dispatch(fetchAsyncCategories());
    return () => {
      dispatch(removeCategories());
    };
  }, [dispatch]);

  return (
    <Main>
      <div className={classes.info}>
        <aside className={classes.info__aside}>
          {categoriesLoading ? (
            <div>
              <LoadingSpinner />
            </div>
          ) : (
            <Categories
              categories={categories}
              activeCategory={activeCategory}
              handleCategoryClick={handleCategoryClick}
            />
          )}
          {categoriesError && <div className="error">{categoriesError}</div>}
        </aside>
        <div className={classes.info__main}>
          {productsLoading ? (
            <div>
              <LoadingSpinner />
            </div>
          ) : (
            <ProductList />
          )}
          {productsError && <div className="error">{productsError}</div>}
        </div>
      </div>
    </Main>
  );
};

export default Products;
