import React from "react";
import useCarts from "../../../hooks/useCarts";

const AddToCart = () => {
  const [carts] = useCarts();

  if (carts?.length === undefined) {
    return [];
  }
  return (
    <div>
      <input type="checkbox" id="AddToCart" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="AddToCart"
            className="btn btn-sm btn-circle btn-primary text-white absolute right-2 top-2"
          >
            ✕
          </label>
          {
            <ul className="list-none">
              {carts?.map((cart) => (
                <li key={cart._id}>{cart?.productInfo?.productName}</li>
              ))}
            </ul>
          }
        </div>
      </div>
    </div>
  );
};

export default AddToCart;
