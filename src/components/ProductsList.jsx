import { useReducer, useRef } from "react";
import { useState } from "react";
import productsReducer, { initialState } from "../reducers/productsReducer";
import { types } from "../reducers/types";

const ProductsList = () => {
  const inputAddProduct = useRef();
  const [productsList, dispatch] = useReducer(productsReducer, initialState);
  const [product, setProduct] = useState("");
  return (
    <>
      <label htmlFor="addProduct">Type a product: </label>
      <input
        ref={inputAddProduct}
        type="text"
        id="addProduct"
        value={product}
        onChange={(e) => setProduct(e.target.value)}
      />
      <button
        onClick={() => {
          inputAddProduct.current.focus();
          setProduct("");
          dispatch({
            type: types.ADD,
            payload: { id: Date.now(), name: product, quantity: 1 },
          });
        }}
      >
        Add Product
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
