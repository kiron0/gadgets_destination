import React from "react";
import Fade from "react-reveal/Fade";
import { toast } from "react-hot-toast";
import { BsSearch } from "react-icons/bs";
import Loader from "../../Components/Loader/Loader";
import { Link } from "react-router-dom";
import useTitle from "../../Hooks/useTitle";
import CardBlog from "./CardBlog";
import useBlog from "../../Hooks/useBlog";
import { BASE_API } from "../../config";

const Blogs = () => {
  useTitle("BLogs");
  const [blogs, loading, setBlogs] = useBlog();

  if (loading) return <Loader />;
  /* Handle Blog Search */
  const handleBlogSearch = async (e) => {
    e.preventDefault();
    const searchText = e.target.searchText.value;
    if (!searchText) return toast.error(`Search field is required`);
    await fetch(`${BASE_API}/blogs/search?q=${searchText}`)
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data);
      });
  };

  return (
    <section className="body-font">
      <div className="breadcrumb text-center py-20 bg-base-300">
        <h2 className="text-3xl">Blog Page</h2>
        <div className="text-md breadcrumbs px-3 md:px-0">
          <ul className="justify-center">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>Blogs </li>
          </ul>
          <form
            onSubmit={handleBlogSearch}
            className="search flex items-stretch p-2 bg-base-100 rounded-md w-full md:w-5/12 mx-auto my-8 lg:my-3"
          >
            <input
              type="search"
              placeholder="Search Blog..."
              className="p-4 outline-none w-full"
              name="searchText"
            />
            <button className="px-6 bg-primary text-white rounded-md">
              <BsSearch />
            </button>
          </form>
        </div>
      </div>
      <Fade bottom distance="30px">
        <div className="container px-5 py-24 mx-auto">
          {loading ? (
            <Loader />
          ) : (
            <>
              {blogs?.length > 0 ? (
                <div className="flex flex-wrap -m-4">
                  {blogs?.map((blog) => (
                    <CardBlog key={blog._id} blog={blog}></CardBlog>
                  ))}
                </div>
              ) : (
                <div className="text-center">
                  <h2 className="text-3xl">No Blog Found</h2>
                </div>
              )}
            </>
          )}
        </div>
      </Fade>
    </section>
  );
};

export default Blogs;
