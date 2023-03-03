import { useEffect, useState } from "react";
import { BASE_API } from "../config";

const useBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    fetch(`${BASE_API}/blogs/all`)
      .then((res) => res.json())
      .then((result) => {
        setBlogs(result);
        setLoading(false);
      });
  }, []);
  return [blogs, loading, setBlogs];
};

export default useBlog;
