import { useOrderAction } from '../../Context/OrderingContextProvider';
import { useModal } from '../../Context/ModalProvider';
import { useActionState } from 'react';

function extractDataToObject(currentFormData) {
  let obj = {};
  currentFormData.entries().forEach((element) => {
    const [key, value] = element;
    obj = { ...obj, [key]: value };
  });

  return {
    customer: obj,
  };
}

function validateData(obj) {
  const validationError = [];

  if (!obj.customer.name || obj.customer.name.length === 0) {
    validationError.push('name is required');
  }
  if (
    !obj.customer.email ||
    obj.customer.email.length === 0 ||
    !obj.customer.email.includes('@')
  ) {
    validationError.push('proper email is required');
  }
  if (!obj.customer.street || obj.customer.street.length === 0) {
    validationError.push('street is required');
  }
  if (
    !obj.customer['postal-code'] ||
    obj.customer['postal-code'].length === 0
  ) {
    validationError.push('postalCode is required');
  }
  if (!obj.customer.city || obj.customer.city.length === 0) {
    validationError.push('city is required');
  }

  return { validationError };
}
export default function OrderConfirmationInfo() {
  const orderAction = useOrderAction();

  async function handleSubmitActionForm(prevForm, currentForm) {
    console.log(currentForm);
    try {
      const enteredValues = extractDataToObject(currentForm);

      const { validationError } = validateData(enteredValues);

      if (validationError.length > 0) {
        return { validationError, enteredValues };
      }

      var g = await orderAction.ConfirmOrder(enteredValues);
      console.log('component called');
      console.log(g);

      return { validationError: [], enteredValues: {} };
    } catch (error) {
      console.error('Error during form submission:', error);

      return {
        validationError: [error.message || 'Unknown error'],
        enteredValues: {},
      };
    }
  }
  const [OrderFormData, orderFormAction, OrderFormIsPending] = useActionState(
    handleFormSubmit,
    { validationError: [], enteredValues: {} }
  );
  return (
    <div className="bg-red-50 p-3 flex flex-col space-y-5 animate-fade-slide-up">
      <h2 className="font-bold text-xl mb-3"> Checkout</h2>
      <span className="font-bold text-sm">Total Amount: $ {}</span>

      {OrderFormData.validationError.length > 0 && (
        <div className="text-red-500">
          <h2 className="font-bold">Errors</h2>
          <ol>
            {OrderFormData.validationError.map((item, index) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        </div>
      )}
      <form action={orderFormAction}>
        <div className="flex flex-col">
          <span className="text-sm font-bold">Fullname</span>
          <input
            defaultValue={OrderFormData.enteredValues?.customer?.name}
            type="text"
            name="name"
            placeholder="Fullname"
            className="bg-white placeholder:text-left rounded p-2 shadow-md border-1 border-gray-100 drop-shadow-xl"
          />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-bold">E-mail address</span>
          <input
            defaultValue={OrderFormData.enteredValues?.customer?.email}
            type="email"
            name="email"
            placeholder="email"
            className="bg-white placeholder:text-left rounded p-2  shadow-md border-1 border-gray-100 drop-shadow-xl"
          />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-bold">Street</span>
          <input
            defaultValue={OrderFormData.enteredValues?.customer?.street}
            type="text"
            name="street"
            placeholder="Street"
            className="bg-white placeholder:text-left rounded p-2  shadow-md border-1 border-gray-100 drop-shadow-xl"
          />
        </div>
        <div className="flex space-x-5">
          <div className="flex flex-col">
            <span className="text-sm font-bold">Postal Code</span>
            <input
              type="text"
              name="postal-code"
              placeholder="Postal Code"
              className="bg-white placeholder:text-left rounded p-2  shadow-md border-1 border-gray-100 drop-shadow-xl"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold">City</span>
            <input
              defaultValue={OrderFormData.enteredValues?.customer?.city}
              type="text"
              name="city"
              placeholder="City"
              className="bg-white placeholder:text-left rounded p-2  shadow-md border-1 border-gray-100 drop-shadow-xl"
            />
          </div>
        </div>
        <div className="flex space-x-5 justify-end my-5">
          {/* <button
            type="button"
            className="px-5 py-2 rounded cursor-pointer font-bold text-sm border-1 border-transparent hover:border-black"
          >
            Close
          </button> */}
          <button
            type="submit"
            disabled={OrderFormIsPending}
            className="px-5 py-2 rounded cursor-pointer  shadow drop-shadow font-bold text-sm bg-yellow-400 hover:bg-yellow-500"
          >
            {OrderFormIsPending ? 'Loading' : 'Submit Order'}
          </button>
        </div>
      </form>
    </div>
  );
}
