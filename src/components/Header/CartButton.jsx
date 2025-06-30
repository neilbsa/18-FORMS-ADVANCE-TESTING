import { useContext, useEffect, useState } from 'react';
import { useModal } from '../../Context/ModalProvider';
import UserCart from './UserCart';
import OrderConfirmationInfo from './OrderConfirmationInfo';
import { useOrderState } from '../../Context/OrderingContextProvider';

export default function CartButton() {
  const { orderedItems } = useOrderState();

  const { showModal, hideModal } = useModal();
  const cartView = <UserCart />;
  const handleShowModal = () => {
    showModal(cartView);
  };

  return (
    <>
      <button
        onClick={handleShowModal}
        className="text-lg cursor-pointer text-yellow-500"
      >
        Cart({orderedItems ? orderedItems.length : 0})
      </button>
    </>
  );
}
