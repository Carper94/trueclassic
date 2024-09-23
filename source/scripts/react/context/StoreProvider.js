import { h, createContext } from 'preact';
import { useReducer, useContext } from 'preact/hooks';
import { v4 as uuidv4 } from 'uuid';

// TODO make this editable via theme settings
const discounts = [0, 500, 1500, 4000];

export const initialState = {
  size: null,
  subtotal: 0,
  discount: { max: 20000, amount: discounts[0], next: discounts[1] },
  max: 200,
  items: [],
  products: [],
  error: null,
  locale: 'en-US',
  currency: 'USD',
  rate: 1,
};

function calcSubtotal(items) {
  return items.reduce((total, item) => {
    return total + item.variant.price * item.quantity;
  }, 0);
}

// TODO make this editable via theme settings
function calcDiscount(subtotal) {
  // max is the next discount bracket
  // discount amount is the total value of the discounts applied to all items in bundle

  if (subtotal >= 20000) {
    const i = 3;
    return { max: 20000, amount: discounts[i], next: null };
  }
  if (subtotal >= 19000) {
    const i = 2;
    return { max: 20000, amount: discounts[i], next: discounts[i + 1] };
  }
  if (subtotal >= 10000) {
    const i = 2;
    return { max: 20000, amount: discounts[i], next: discounts[i + 1] };
  }
  if (subtotal >= 5000) {
    const i = 1;
    return { max: 20000, amount: discounts[i], next: discounts[i + 1] };
  }

  const i = 0;
  return { max: 15000, amount: discounts[i], next: discounts[i + 1] };
}

function reducer(state, action) {
  switch (action.type) {
    case 'sizechange': {
      return { ...state, size: action.payload };
    }
    case 'addtobundle': {
      let isExistingItem = false;
      let nextItems = state.items.map((item) => {
        // if item already exists, increment
        if (item.id === action.payload.id) {
          isExistingItem = true;
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });

      if (!isExistingItem) {
        nextItems = [...nextItems, { ...action.payload, key: uuidv4() }];
      }

      const nextSubtotal = calcSubtotal(nextItems);
      const nextDiscount = calcDiscount(nextSubtotal);
      return {
        ...state,
        subtotal: nextSubtotal,
        discount: nextDiscount,
        items: nextItems,
        error: null,
      };
    }
    case 'remove': {
      const nextItems = [...state.items.filter((item) => item.key !== action.payload.key)];
      const nextSubtotal = calcSubtotal(nextItems);
      const nextDiscount = calcDiscount(nextSubtotal);
      return {
        ...state,
        subtotal: nextSubtotal,
        discount: nextDiscount,
        items: nextItems,
        error: null,
      };
    }
    case 'quantitychange': {
      const nextItems = state.items.map((item) => {
        if (item.key === action.payload.key) {
          return { ...item, quantity: action.payload.quantity };
        }
        return item;
      });
      const nextSubtotal = calcSubtotal(nextItems);
      const nextDiscount = calcDiscount(nextSubtotal);
      return {
        ...state,
        subtotal: nextSubtotal,
        discount: nextDiscount,
        items: nextItems,
        error: null,
      };
    }
    case 'setproducts': {
      return { ...state, products: action.payload };
    }
    case 'setstoredstate': {
      return { ...action.payload };
    }
    case 'clear': {
      return {
        ...initialState,
        products: state.products,
        locale: state.locale,
        currency: state.currency,
        rate: state.rate,
      };
    }
    case 'seterror': {
      return { ...state, error: action.payload };
    }
    case 'clearerror': {
      return { ...state, error: action.payload };
    }
    case 'setlocale': {
      return { ...state, locale: action.payload };
    }
    case 'setcurrency': {
      return { ...state, currency: action.payload };
    }
    case 'setrate': {
      return { ...state, rate: action.payload };
    }
    default:
      throw new Error();
  }
}

const StoreContext = createContext();
export const useStore = () => useContext(StoreContext);

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <StoreContext.Provider value={{ state, dispatch }}>{children}</StoreContext.Provider>;
}
