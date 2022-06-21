import { useNavigate } from "react-router-dom";
import { MdOutlineShoppingCart } from "react-icons/md";
import Loader from "../../Shared/Loader/Loader";
import TItle from "../../Shared/Title/Title";
import { useQuery } from "react-query";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../Shared/Firebase/Firebase.init";
import useAdmin from "../../../hooks/useAdmin";

const Products = () => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const [admin] = useAdmin(user);

  const { data: products, isLoading } = useQuery("allProducts", async () => {
    const res = await fetch("http://localhost:5000/products?sort=1", {
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    const data = await res.json();
    return data;
  });

  if (isLoading || products?.length === undefined) {
    return <Loader />;
  }

  // add to cart button
  const addToCart = () => {
    console.log("add to cart");
  };

  return (
    <div className="py-28 lg:px-12">
      <TItle
        title="Our Awesome Products"
        subTitle="What Products we can provide?"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mx-auto px-6 md:px-10 lg:px-16 py-8">
        {products
          ?.slice(0, 4)
          ?.map(
            ({
              _id,
              image,
              productName,
              productDescription,
              price,
              orderQty,
              availableQty,
            }) => (
              <div className="card bg-base-100 shadow-xl" key={_id}>
                <figure>
                  <img src={image} className="h-52 rounded-xl" alt="Shoes" />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">
                    {productName}
                    <div className="badge badge-secondary text-white">NEW</div>
                  </h2>
                  <p>{productDescription?.slice(0, 60)}...</p>
                  <div className="card-actions justify-end">
                    <div className="badge badge-ghost bg-base-300">
                      <span title="Minimum Order Quantity">MOQ</span>-{" "}
                      {orderQty}pcs
                    </div>
                    <div className="badge badge-ghost bg-base-300">
                      Available - {availableQty}pcs
                    </div>
                    <div className="badge badge-ghost bg-base-300">
                      Price - {price}$
                    </div>
                  </div>
                  <div className="card-actions justify-center mt-2">
                    {admin ? (
                      <div className="alert bg-primary shadow-lg text-white text-sm lg:text-base">
                        <div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="stroke-current flex-shrink-0 h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <span>Hey, Admin! You can't order🙂</span>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => navigate(`/purchase/${_id}`)}
                        className="btn btn-primary text-white mt-4"
                      >
                        Order Now
                      </button>
                    )}
                    {admin ? (
                      <></>
                    ) : (
                      <button
                        className="btn btn-primary text-white mt-4"
                        onClick={addToCart}
                      >
                        <MdOutlineShoppingCart className="text-xl" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )
          )}
      </div>
      <div className="flex justify-center items-center mt-10">
        <button
          onClick={() => navigate(`/shop`)}
          className="btn btn-primary text-white"
        >
          See More
        </button>
      </div>
    </div>
  );
};

export default Products;
