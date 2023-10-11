import { useMemo } from 'react';
import { Product } from '../store/products/types.ts';

interface CartTotals {
  roundedTotalPrice: number;
  totalQuantity: number;
}
export const useCartTotalQuantity = (cartList: Product[]): CartTotals => {
  return useMemo(() => {
    const totalQuantity = cartList.reduce((total, item) => total + item.quantity, 0);
    const totalPrice = cartList.reduce((total, item) => total + item.price * item.quantity, 0);
    const roundedTotalPrice = parseFloat(totalPrice.toFixed(2));
    return { roundedTotalPrice, totalQuantity };
  }, [cartList]);
};
