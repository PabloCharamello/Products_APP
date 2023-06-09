import { types } from "../productReducer/types";

export const initialState = [
  {
    id: 1,
    name: "Arandanos",
    quantity: 4,
  },
  {
    id: 2,
    name: "Bacon",
    quantity: 2,
  },
];

function productsReducer(state, action) {
  switch (action.type) {
    case types.LESS:
      return state.map((product) =>
        action.payload === product.id && product.quantity > 1
          ? { ...product, quantity: product.quantity - 1 }
          : product
      );
    case types.PLUS:
      return state.map((product) =>
        action.payload === product.id
          ? { ...product, quantity: product.quantity + 1 }
          : product
      );
    case types.DELETE:
      return state.filter((product) => action.payload !== product.id);
    case types.ADD:
      return [...state, action.payload];
  }
}

export default productsReducer;
