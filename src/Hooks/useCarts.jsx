import { useState, useEffect } from "react";
import auth from "../Pages/Shared/Firebase/Firebase.init";

const useCarts = () => {
  const [carts, setCarts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(
        `https://gadgets-destination.herokuapp.com/orders?uid=${auth?.currentUser?.uid}`,
        {
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      const data = await result.json();
      setCarts(data);
    };
    fetchData();
  }, []);

  return [carts];
};

export default useCarts;
