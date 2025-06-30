import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useMemo,
} from 'react';

export const ProductContext = createContext({
  products: [],
});

export function useProduct() {
  return useContext(ProductContext);
}

function ProductReducer(state, action) {
  switch (action.identifier) {
    case 'set-products': {
      const { products } = action.payload;
      return {
        ...state,
        products,
      };
    }
    case 'get-product': {
      break;
    }
    default: {
      return state;
    }
  }
}

export default function ProductsContextProvider({ children }) {
  const [productsProvider, dispatchProductsProvider] = useReducer(
    ProductReducer,
    {
      products: [],
    }
  );

  const { products } = productsProvider;

  useEffect(() => {
    async function getMealsData() {
      try {
        console.log('calling');
        const response = await fetch('http://localhost:3000/meals');
        const products = await response.json();

        dispatchProductsProvider({
          identifier: 'set-products',
          payload: { products },
        });
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    }

    getMealsData();
  }, []);

  const providerValue = useMemo(
    () => ({
      products,
    }),
    [products]
  );
  return (
    <ProductContext.Provider value={providerValue}>
      {children}
    </ProductContext.Provider>
  );
}
