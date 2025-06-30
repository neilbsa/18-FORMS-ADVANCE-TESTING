import { useContext } from 'react';
import { useModal } from '../../Context/ModalProvider';
import UserCartItem from './UserCartItem';
import OrderConfirmationInfo from './OrderConfirmationInfo';
import { useOrderState } from '../../Context/OrderingContextProvider';
export default function UserCart() {
  const { totalCost, orderedItems } = useOrderState();
  const { showModal, hideModal } = useModal();
  const userOrderConfirmation = <OrderConfirmationInfo />;

  const handleCheckoutAction = () => {
    //hideModal();
    showModal(userOrderConfirmation);
  };

  return (
    <div className="bg-red-100 p-4 w-full h-full rounded flex flex-col space-y-1 animate-fade-slide-up">
      <h2 className="font-bold text-xl">User Cart</h2>

      {orderedItems.map((item, index) => (
        <UserCartItem key={item.id} cartItem={item} />
      ))}

      <div className="flex justify-end font-bold text-xl my-5">
        <span>$ {totalCost}</span>
      </div>

      <div className="flex space-x-1 justify-end">
        <button
          className=" px-5 rounded py-1 cursor-pointer"
          onClick={hideModal}
        >
          Close
        </button>
        <button
          onClick={handleCheckoutAction}
          className="bg-yellow-400 px-5 rounded py-1 hover:bg-yellow-500 cursor-pointer"
        >
          Go to Checkout
        </button>
      </div>
    </div>
  );
}
