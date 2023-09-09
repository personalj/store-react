import { FC, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks/redux.ts';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchAsyncCategories, removeCategories } from '../../store/categories/categorySlice.ts';
import { getCategories, getLoading, getError } from '../../store/categories/selectors.ts';
import LoadingSpinner from '../loader/Loader.tsx';
import classes from './Categories.module.scss';

const Categories: FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const activeCategory: string | null = queryParams.get('category');
  const categories = useAppSelector(getCategories);
  const loading = useAppSelector(getLoading);
  const error = useAppSelector(getError);

  const handleItemClick = (val: string) => {
    if (val !== activeCategory) {
      queryParams.set('category', val);
    } else {
      queryParams.delete('category');
    }
    navigate({ search: queryParams.toString() });
  };

  useEffect(() => {
    dispatch(fetchAsyncCategories());
    return () => {
      dispatch(removeCategories());
    };
  }, [dispatch]);

  if (loading) {
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  }

  if (error) return <div className="error">{error}</div>;

  return (
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
  );
};

export default Categories;
