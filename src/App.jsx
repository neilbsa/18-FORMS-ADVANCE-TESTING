import CartContainer from './components/CartItem/CartContainer.jsx';
import Headers from './components/Header/Header.jsx';
import ModalProvider from './Context/ModalProvider.jsx';
import OrderingContextProvider from './Context/OrderingContextProvider.jsx';
import ProductsContextProvider from './Context/ProductsContextProvider.jsx';
import OrderConfirmationInfo from './components/Header/OrderConfirmationInfo.jsx';
import { useActionState } from 'react';
function App() {
  async function checkOutAction(prevForm, currentForm) {
    console.log('=== FORM SUBMIT STARTED ===');
    console.log('prevForm:', prevForm);
    console.log('currentForm:', currentForm);

    try {
      console.log('accessing server');
      // ----this is working without any full page reload----
      const orderCreateRequest = await fetch(
        'https://jsonplaceholder.typicode.com/posts',
        {
          method: 'POST',
          body: JSON.stringify({
            title: 'foo',
            body: 'bar',
            userId: 1,
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        }
      );
      //----this is working without any full page reload----

      // const orderCreateRequest = await fetch('http://localhost:3000/opinions', {
      //   method: 'POST',
      //   body: JSON.stringify({
      //     user: {
      //       id: 1751135867154,
      //       votes: 0,
      //       userName: '1111111111111',
      //       title: '23333333333 title',
      //       body: '12341234123123',
      //     },
      //   }),
      //   headers: { 'Content-Type': 'application/json; charset=UTF-8' },
      // });

      //-----this call is not working and causing full page reload
      // const orderCreateRequest = await fetch('http://localhost:3000/orders', {
      //   method: 'POST',
      //   body: JSON.stringify({
      //     order: {
      //       customer: {
      //         name: 'Nppppppppppppppppppppppppppppppppp',
      //         city: 'Manila',
      //         email: 'neilbryan.abarabar@gmail.com',
      //         street: '44 ',
      //         ['postal-code']: '1400',
      //       },
      //       items: [
      //         { id: 'm2', name: 'Margherita Pizza', price: '12.99', qty: 10 },
      //         { id: 'm1', name: 'Mac & Cheese', price: '8.99', qty: 10 },
      //         { id: 'm3', name: 'Caesar Salad', price: '7.99', qty: 11 },
      //         { id: 'm5', name: 'Veggie Burger', price: '9.99', qty: 10 },
      //         { id: 'm11', name: 'Seafood Paella', price: '19.99', qty: 10 },
      //       ],
      //     },
      //   }),
      //   headers: { 'Content-Type': 'application/json; charset=UTF-8' },
      // });
      //-----this call is not working and causing full page reload

      console.log('Response status:', orderCreateRequest.status);
      console.log('Response ok:', orderCreateRequest.ok);

      if (!orderCreateRequest.ok) {
        const errorData = await orderCreateRequest.json();
        console.log('Error data:', errorData);
        throw new Error(
          errorData.message || `Server error: ${orderCreateRequest.status}`
        );
      }

      const orderRequestData = await orderCreateRequest.json();
      console.log('Success data:', orderRequestData);
      console.log('=== FORM SUBMIT SUCCESS ===');

      return {};
    } catch (error) {
      console.error('=== FORM SUBMIT ERROR ===');
      console.error('Error during form submission:', error);
      console.error('Error name:', error.name);
      console.error('Error message:', error.message);

      return {
        validationError: [error.message || 'Unknown error'],
        enteredValues: {},
      };
    }
  }

  const [OrderFormData, orderFormAction, OrderFormIsPending] = useActionState(
    checkOutAction,
    {}
  );
  return (
    <>
      <form action={orderFormAction}>
        <button type="submit" className="bg-red-900">
          TEST
        </button>
      </form>
      {/* <OrderingContextProvider>
        <ProductsContextProvider>
          <ModalProvider>
            <Headers />
            <CartContainer />
          </ModalProvider>
        </ProductsContextProvider>
      </OrderingContextProvider> */}
    </>
  );
}

export default App;
