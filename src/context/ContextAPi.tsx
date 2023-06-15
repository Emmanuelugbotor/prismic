import React, { createContext, useReducer } from "react";
import { CartItem, IProduct } from "../interface/product";
export const CartContext = createContext<{
  appState: AppState;
  appDispatch: React.Dispatch<AppAction>;
}>({
  appState: { items: [], products: [] },
  appDispatch: () => {},
});

interface AppState {
  items: CartItem[]
  products: IProduct[];
}

type AppAction =
  | { type: "ADD_TO_CART"; payload: IProduct }
  | { type: "REMOVE_FROM_CART"; payload: number | undefined }
  | { type: "INCREASE_QUANTITY"; payload: number | undefined }
  | { type: "DECREASE_QUANTITY"; payload: number | undefined }
  | { type: "ADD_PRODUCT"; payload: IProduct | IProduct[] }
  | { type: "REMOVE_PRODUCT"; payload: number | undefined };

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case "ADD_PRODUCT":
      const newProducts = Array.isArray(action.payload)
        ? action.payload
        : [action.payload];

      return {
        ...state,
        products: [...state.products, ...newProducts],
      };
    case "REMOVE_PRODUCT":
      return {
        ...state,
        products: state.products.filter(
          (product) => product.id !== action.payload
        ),
      };
    case "ADD_TO_CART":
      const existingItem = state.items.find(
        (item) => item.product.id === action.payload.id
      );
      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.product.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      } else {
        return {
          ...state,
          items: [...state.items, { product: action.payload, quantity: 1 }],
        };
      }
    case "REMOVE_FROM_CART":
      return {
        ...state,
        items: state.items.filter((item) => item.product.id !== action.payload),
      };
    case "INCREASE_QUANTITY":

      return {
        ...state,
        items: [...state.items].map((item) =>
          item.product.id === action.payload
            ? { ...item, quantity: item["quantity"] + 1 }
            : item
        ),
      };
    case "DECREASE_QUANTITY":
      return {
        ...state,
        items: [...state.items].map((item) =>
          item.product.id === action.payload
            ? { ...item, quantity: item["quantity"] - 1 }
            : item
        ),
      };
    default:
      return state;
  }
};

const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [appState, appDispatch] = useReducer(appReducer, {
    items: [],
    products: [],
  });
  return (
    <CartContext.Provider value={{ appState, appDispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
