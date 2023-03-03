import React, { useContext } from "react";
import { toast } from "react-hot-toast";
import { BsGrid } from "react-icons/bs";
import { AiOutlineFire } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import Loader from "../../../Components/Loader/Loader";
import useTitle from "../../../Hooks/useTitle";
import auth from "../../../Firebase/Firebase.config";
import useAdmin from "../../../Hooks/useAdmin";
import { InitializeContext } from "../../../App";

const Dashboard = () => {
  useTitle("Dashboard");
  const { handleThemeChange, theme, image } = useContext(InitializeContext);
  const [user] = useAuthState(auth);
  const [admin, adminLoading] = useAdmin(user);
  const navigate = useNavigate();

  const handleLogOut = async () => {
    await signOut(auth).then(() => {
      navigate("/");
      toast.success(`Thank you, ${user.displayName} to stay with us!`, {
        autoClose: 3000,
        position: "bottom-left",
      });
    });
  };

  if (adminLoading) {
    return <Loader />;
  }

  return (
    <div className="drawer drawer-mobile">
      <input id="dashboard-sidebar" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content p-3 md:p-3">
        <div className="header z-50 sticky top-0 flex justify-between items-center bg-base-300 p-4 rounded">
          <label
            htmlFor="dashboard-sidebar"
            className="btn bg-base-300 text-black hover:text-white drawer-button lg:hidden "
          >
            <BsGrid className={theme ? "text-2xl text-white" : "text-2xl"} />
          </label>
          <span className="font-semibold text-xl hidden md:block">
            Welcome back,{" "}
            <span className="text-primary">
              {auth?.currentUser?.displayName} 🙂
            </span>
          </span>
          <Link
            to="/"
            className="text-lg lg:text-2xl md:text-2xl font-semibold md:hidden"
          >
            Gadgets Destination
          </Link>
          {/* <div className="lg:mr-[-65rem] pt-2 md:mr-[-11rem] flex justify-center items-center">
            <li className="list-none">
              
            </li>
          </div> */}
          <div className="dropdown dropdown-end">
            <label
              tabIndex="0"
              className="btn btn-ghost btn-circle avatar online"
            >
              <div
                style={{ display: "grid" }}
                className="w-10 h-10  place-items-center rounded-full ring ring-primary ring-offset-base-100 ring-offset-2"
              >
                {auth?.currentUser?.photoURL ? (
                  <img
                    style={{ marginTop: "0.5rem" }}
                    src={auth?.currentUser?.photoURL}
                    alt={auth?.currentUser?.displayName}
                  />
                ) : (
                  <img src={image} alt={auth?.currentUser?.displayName} />
                )}
              </div>
            </label>
            <ul
              tabIndex="0"
              className="mt-3 p-2 shadow-lg menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to="/dashboard/profile" className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li onClick={handleThemeChange}>
                {theme ? <span>Light Mode</span> : <span>Dark Mode</span>}
              </li>
              <li>
                <button onClick={handleLogOut}>Logout</button>
              </li>
            </ul>
          </div>
        </div>
        <Outlet></Outlet>
      </div>
      <div className="drawer-side">
        <label htmlFor="dashboard-sidebar" className="drawer-overlay"></label>
        <ul className="menu p-4 overflow-y-auto w-80 bg-base-300 text-base-content">
          <div className="flex flex-col items-center gap-3 text-2xl p-2 border-b pb-5">
            <Link
              to="/"
              className="logo font-semibold text-center flex items-center flex-col gap-2"
            >
              <AiOutlineFire className="text-3xl" />
              Gadgets Destination
            </Link>
          </div>
          <li className="py-2 mt-4">
            <NavLink to="/dashboard">Dashboard</NavLink>
          </li>
          {!admin && (
            <>
              <li className="py-2">
                <NavLink to="/dashboard/myOrders">My Orders</NavLink>
              </li>
              <li className="py-2">
                <NavLink to="/dashboard/addReview">Add a review</NavLink>
              </li>
              <li className="py-2">
                <NavLink to="/dashboard/paymentHistory">
                  Payment History{" "}
                  <small className="badge badge-outline text-sm">New</small>
                </NavLink>
              </li>
            </>
          )}
          {admin && (
            <>
              <li className="py-1">
                <NavLink to="/dashboard/addProduct">Add a Product</NavLink>
              </li>
              <li className="py-1">
                <NavLink to="/dashboard/allUsers">Manage Users</NavLink>
              </li>
              <li className="py-1">
                <NavLink to="/dashboard/manageOrder">Manage Orders</NavLink>
              </li>
              <li className="py-1">
                <NavLink to="/dashboard/manageProducts">
                  Manage Products
                </NavLink>
              </li>
              <li className="py-1">
                <NavLink to="/dashboard/addTeamMember">Add Team Member</NavLink>
              </li>
              <li className="py-1">
                <NavLink to="/dashboard/deleteTeamMember">
                  Delete Team Member
                </NavLink>
              </li>
              <li className="py-1">
                <NavLink to="/dashboard/manageReviews">Manage Reviews</NavLink>
              </li>
            </>
          )}
          {/* <li className="py-1">
            <NavLink to="/dashboard/managementBlog">Blog Management </NavLink>
          </li> */}
          <li className="bottom-4 absolute">
            <button
              onClick={handleLogOut}
              className="bg-primary rounded-lg text-white w-[18rem]"
            >
              <FiLogOut /> Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
