import CartItem from './CartItem';
import { useProduct } from '../../Context/ProductsContextProvider.jsx';
import { useOrderAction } from '../../Context/OrderingContextProvider.jsx';
import { memo } from 'react';
const CartContainer = function () {
 
  const { products } = useProduct();

  return (
    <div className="grid pt-20 grid-cols-1 md:grid-cols-2 md:px-10 lg:grid-cols-3 lg:px-20 xl:px-30 2xl:px-[20%]">
      {products.map((item) => {
        return (
          <CartItem
            key={item.id}
          
            cartItem={item}
          ></CartItem>
        );
      })}
    </div>
  );
};

export default memo(CartContainer);
