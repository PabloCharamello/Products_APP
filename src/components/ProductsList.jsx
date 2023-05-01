import { useReducer, useRef, useState } from "react";
import productsReducer, {
  initialState,
} from "../productReducer/productReducer";
import { types } from "../productReducer/types";

const ProductsList = () => {
  const inputRef = useRef();
  const [productsList, dispatch] = useReducer(productsReducer, initialState);
  const [product, setProduct] = useState("");
  return (
    <>
      <h1>Products App</h1>
      <label htmlFor="addProduct">Type a product: </label>
      <input
        ref={inputRef}
        type="text"
        id="addProduct"
        value={product}
        onChange={(e) => setProduct(e.target.value)}
      />
      <button
        onClick={() => {
          inputRef.current.focus();
          setProduct("");
          dispatch({
            type: types.ADD,
            payload: { id: Date.now(), name: product, quantity: 1 },
          });
        }}
      >
        Add a Product
      </button>
      {productsList.map((product) => (
        <div key={product.id}>
          {product.name} ({product.quantity}) units
          <button
            onClick={() => dispatch({ type: types.LESS, payload: product.id })}
          >
            -
          </button>
          <button
            onClick={() => dispatch({ type: types.PLUS, payload: product.id })}
          >
            +
          </button>
          <button
            onClick={() =>
              dispatch({ type: types.DELETE, payload: product.id })
            }
          >
            x
          </button>
        </div>
      ))}
    </>
  );
};
export default ProductsList;
