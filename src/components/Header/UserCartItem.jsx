import { memo } from 'react';
import { useOrderAction } from '../../Context/OrderingContextProvider';
import { useActionState } from 'react';

const UserCartItem = memo(function ({ cartItem }) {
  const { AddQty, DeductQty } = useOrderAction();
  const { id, qty, price, name } = cartItem;

  const [deductdata, deductAction, deductIsPending] = useActionState(() => {
    DeductQty(id);
  });
  const [addData, addAction, addIsPending] = useActionState(() => {
    AddQty(id);
  });
  return (
    <div className="flex  justify-between space-x-20 md:space-x-60">
      <span className="text-left">{name}</span>
      <form>
        <div className="flex items-center space-x-2">
          <button
            formAction={deductAction}
            className="bg-stone-700 cursor-pointer text-white w-7 h-7  text-bold text-center rounded-full"
          >
            -
          </button>

          <span>{qty}</span>
          <button
            formAction={addAction}
            className="bg-stone-700 cursor-pointer text-white w-7 h-7 text-bold text-center rounded-full"
          >
            +
          </button>
        </div>
      </form>
    </div>
  );
});

export default UserCartItem;
