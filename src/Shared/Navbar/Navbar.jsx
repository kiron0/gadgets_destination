import React, { useEffect, useState, useContext } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { AiOutlineFire } from "react-icons/ai";
import { CgMenuLeft } from "react-icons/cg";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { toast } from "react-hot-toast";
import { BiLogInCircle } from "react-icons/bi";
import auth from "../../Firebase/Firebase.config";
import useAdmin from "../../Hooks/useAdmin";
import { InitializeContext } from "../../App";

const Navbar = () => {
  const { handleThemeChange, theme, image } = useContext(InitializeContext);
  const [user] = useAuthState(auth);
  const [admin] = useAdmin(user);
  const { pathname } = useLocation();
  const [scrollY, setScrollY] = useState();

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollY(position);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollY]);

  // console.log(scrollY);

  const handleLogOut = () => {
    signOut(auth);
    localStorage.removeItem("accessToken");
    toast.success(`Thank you, ${user.displayName} to stay with us!`, {
      position: "up-center",
      autoClose: 5000,
    });
  };

  const NavbarMenus = (
    <>
      <li className="py-1 lg:py-0">
        <NavLink className="uppercase" to="/">
          Home
        </NavLink>
      </li>
      <li className="py-1 lg:py-0">
        <NavLink className="uppercase" to="/shop">
          Shop
        </NavLink>
      </li>
      {/* <li className="py-1 lg:py-0">
        <NavLink className="uppercase" to="/blogs">
          Blogs
        </NavLink>
      </li> */}
      <li className="py-1 lg:py-0">
        <NavLink className="uppercase" to="/teamMembers">
          Team
        </NavLink>
      </li>

      <li className="py-1 lg:py-0">
        <NavLink className="uppercase" to="/contact">
          Contact
        </NavLink>
      </li>
      {user && (
        <li className="py-1 lg:py-0">
          <Link className="uppercase bg-secondary text-white" to="/dashboard">
            Dashboard
          </Link>
        </li>
      )}
      {!user && (
        <li className="py-1 lg:py-0" onClick={handleThemeChange}>
          {theme ? <span>Light Mode</span> : <span>Dark Mode</span>}
        </li>
      )}
    </>
  );

  return (
    <div className="fixed top-0 w-full z-50">
      <div
        className={`drawer-content flex flex-col bg-base-300 ${
          scrollY > 100 && "glass duration-500"
        }`}
        style={
          pathname.includes("dashboard")
            ? { display: "none" }
            : { display: "flex" }
        }
      >
        <div className="navbar py-3 container mx-auto">
          <div className="navbar-start">
            <div className="dropdown">
              <label tabIndex="0" className="btn btn-ghost lg:hidden">
                <CgMenuLeft className="text-3xl" />
              </label>
              <ul
                tabIndex="0"
                className="menu menu-compact dropdown-content mt-3 p-2 shadow-xl bg-base-100 rounded-box w-52"
              >
                {NavbarMenus}
              </ul>
            </div>
            <Link
              className="btn btn-ghost normal-case text-xl flex gap-2 items-center"
              to="/"
            >
              <AiOutlineFire className="hidden md:block text-2xl" />{" "}
              {!user ? (
                <span className="text-[16px] md:text-xl lg:text-xl">
                  Gadgets Destination
                </span>
              ) : (
                <span>Gadgets Destination</span>
              )}
            </Link>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal p-0 gap-3">{NavbarMenus}</ul>
          </div>
          <div className="navbar-end gap-3">
            {!user && (
              <NavLink
                to="/login"
                className="btn flex gap-2 items-center btn-primary"
              >
                <BiLogInCircle /> Login
              </NavLink>
            )}
            {user && (
              <div className="flex-none gap-2">
                <div className="dropdown dropdown-end">
                  <label
                    tabIndex="0"
                    className="btn btn-ghost btn-circle avatar"
                  >
                    <div
                      style={{ display: "grid" }}
                      className="w-10 h-10 rounded-full border bg-base-300 grid place-items-center ring ring-primary ring-offset-base-100 ring-offset-2"
                    >
                      {auth?.currentUser?.photoURL ? (
                        <img src={auth?.currentUser?.photoURL} alt="avatar" />
                      ) : (
                        <img src={image} alt="profile" />
                      )}
                    </div>
                  </label>
                  <ul
                    tabIndex="0"
                    className="mt-3 p-2 shadow-xl menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
                  >
                    <li>
                      <Link className="justify-between" to="/dashboard/profile">
                        Profile
                        <span className="badge">New</span>
                      </Link>
                    </li>
                    {!admin ? (
                      <li>
                        <Link to="/dashboard/myOrders">My Orders</Link>
                      </li>
                    ) : (
                      <></>
                    )}
                    <li>
                      <Link to="/dashboard">Dashboard</Link>
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
