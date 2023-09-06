import { FC, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks/redux.ts';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchAsyncCategories, removeCategories } from '../../store/categories/categorySlice.ts';
import LoadingSpinner from '../loader/Loader.tsx';
import classes from './Categories.module.scss';

const Categories: FC = () => {
  const dispatch = useAppDispatch();
  const { categories, loading, error } = useAppSelector((state) => state.categories);
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const activeCategory = queryParams.get('category');

  const handleItemClick = (val: string) => {
    val !== activeCategory ? queryParams.set('category', val) : queryParams.delete('category');
    navigate({ search: queryParams.toString() });
  };

  useEffect(() => {
    dispatch(fetchAsyncCategories());
    return () => {
      dispatch(removeCategories());
    };
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <div>
          <LoadingSpinner />
        </div>
      ) : (
        <ul className={classes.list}>
          {categories?.map((item, index) => (
            <li key={index} className={classes.list__item}>
              <span
                className={`${classes.list__el} ${activeCategory === item ? classes.list__el_active : ''}`}
                onClick={() => handleItemClick(item)}
              >
                {item}
              </span>
            </li>
          ))}
        </ul>
      )}
      {error && <div className="error">{error}</div>}
    </>
  );
};

export default Categories;
