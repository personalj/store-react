import { FC } from 'react';
import classes from './Categories.module.scss';

interface ChildProps {
  categories: string[];
  activeCategory?: string | null;
  handleCategoryClick: (item: string) => void;
}
const Categories: FC<ChildProps> = ({ categories, activeCategory, handleCategoryClick }) => {
  return (
    <ul className={classes.list}>
      {categories?.map((item, index) => (
        <li key={index} className={classes.list__item}>
          <span
            className={`${classes.list__el} ${activeCategory === item ? classes.list__el_active : ''}`}
            onClick={() => handleCategoryClick(item)}
          >
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
};

export default Categories;
