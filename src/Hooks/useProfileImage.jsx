import { useState, useEffect } from "react";
import auth from "../Firebase/Firebase.config";

const useProfileImage = (user) => {
  const [image, setImage] = useState({});
  const [imageLoading, setImageLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(
        `https://gadgets-destination.herokuapp.com/users?uid=${auth?.currentUser?.uid}`
      );
      const data = await result.json();
      setImage(data[0]?.image);
      setImageLoading(false);
    };
    fetchData();
  }, [user, image]);

  return [image, imageLoading];
};

export default useProfileImage;
