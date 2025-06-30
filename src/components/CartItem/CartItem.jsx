import { memo } from 'react';
import { useOrderAction } from '../../Context/OrderingContextProvider';

const CartItem = memo(function ({ cartItem, onOrderPlaceAction }) {
  const { name, price, description, image } = cartItem;
  const { AddOrderItem } = useOrderAction();
  return (
    <div className="bg-stone-900 m-2 rounded-xl ">
      <div>
        <img className="rounded-t-xl" src={'http://localhost:3000/' + image} />
        <div className="item-details text-white flex flex-col justify-center items-center space-y-5">
          <div className="font-bold text-xl">{name}</div>
          <div className="bg-stone-700 rounded-md px-5 text-yellow-500">
            {price}
          </div>
          <div className="text-sm text-center px-10">{description}</div>
          <div className="text-sm text-center px-10">
            <button
              onClick={() => {
                AddOrderItem(cartItem);
              }}
              className="bg-yellow-400 hover:bg-yellow-600 cursor-pointer text-black px-5 py-1 rounded-md mb-5"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});
export default CartItem;
