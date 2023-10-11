import { FC, useState } from 'react';
import { useAppSelector } from '../../hooks/redux.ts';
import ProductItem from '../products/ProductItem.tsx';
import { getProducts } from '../../store/products/selectors.ts';
import classes from './ProductList.module.scss';

interface Columns {
  cols: string;
  value: string;
}
const ProductList: FC = () => {
  const products = useAppSelector(getProducts);
  const columns: Columns[] = [
    { cols: '|', value: '' },
    { cols: '||', value: 'cols-2x' },
    { cols: '||||', value: 'cols-4x' },
  ];
  const [listColumns, setListColumns] = useState<string>('cols-4x');
  return (
    <>
      <ul className={classes.columns}>
        {columns?.map((column) => (
          <li
            key={column.cols}
            className={`${classes.columns__item} ${listColumns === column.value ? classes.columns__item_active : ''}`}
            onClick={() => setListColumns(column.value)}
          >
            {column.cols}
          </li>
        ))}
      </ul>
      <ul className={classes.products}>
        {products?.map((product) => (
          <li key={product.id} className={`${classes.products__item} ${classes[listColumns]}`}>
            <ProductItem product={product} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default ProductList;
