import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks/redux.ts';
import { clearCartList, decrementCartItem, deleteFromCart, incrementCartItem } from '../../store/cart/cartSlice.ts';
import { useCartTotalQuantity } from '../../hooks/useGetCartTotal.ts';
import Main from '../../layouts/Main.tsx';
import CartItem from '../../components/cart/CartItem.tsx';
import Button from '../../components/ui/Button.tsx';
import { getCartProducts } from '../../store/cart/selectors.ts';
import classes from './Cart.module.scss';
const Cart: FC = () => {
  const cartList = useAppSelector(getCartProducts);
  const dispatch = useAppDispatch();
  const { roundedTotalPrice } = useCartTotalQuantity(cartList);

  return (
    <Main>
      {!cartList.length ? (
        <div>
          Add
          <Link to={'/catalog'}>
            <span className={classes.featured}>Products</span>
          </Link>
          to cart
        </div>
      ) : (
        <>
          <div className={classes.cart__clear}>
            <Button onClick={() => dispatch(clearCartList())}>Clear cart</Button>
          </div>
          <ul>
            {cartList?.map((item) => (
              <li key={item.id}>
                <CartItem
                  id={item.id}
                  title={item.title}
                  price={item.price}
                  image={item.image}
                  quantity={item.quantity}
                  onDelete={() => dispatch(deleteFromCart(item.id))}
                  onIncrement={() => dispatch(incrementCartItem(item.id))}
                  onDecrement={() => dispatch(decrementCartItem(item.id))}
                />
              </li>
            ))}
          </ul>
          <div className={classes.cart__total}>
            Total: <span>{roundedTotalPrice}$</span>
          </div>
        </>
      )}
    </Main>
  );
};

export default Cart;
