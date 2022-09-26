import "./App.css";
import { createContext } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Shared/Navbar/Navbar";
import Home from "./Pages/Home/Home/Home";
import NotFound from "./Shared/NotFound/NotFound";
import { useEffect, useState } from "react";
import Login from "./Pages/Login/Login/Login";
import SignUp from "./Pages/Login/SignUp/SignUp";
import ResetPassword from "./Pages/Login/ResetPassword/ResetPassword";
import Team from "./Pages/Team/Team";
import Dashboard from "./Pages/Dashboard/Dashboard/Dashboard";
import WelcomeDashboard from "./Pages/Dashboard/WelcomeDashboard/WelcomeDashboard";
import RequireAuth from "./Auth/RequireAuth/RequireAuth";
import MyProfile from "./Pages/Dashboard/MyProfile/MyProfile";
import { Toaster } from "react-hot-toast";
import ScrollButton from "./Shared/ScrollButton/ScrollButton";
import AllUsers from "./Pages/Dashboard/AllUsers/AllUsers";
import AddProduct from "./Pages/Dashboard/AddProduct/AddProduct";
import AddReview from "./Pages/Dashboard/AddReview/AddReview";
import ProductDetails from "./Pages/Home/ProductDetails/ProductDetails";
import MyOrders from "./Pages/Dashboard/MyOrders/MyOrders";
import RequireAdmin from "./Auth/RequireAdmin/RequireAdmin";
import ManageOrder from "./Pages/Dashboard/ManageOrder/ManageOrder";
import Payment from "./Pages/Dashboard/Payment/Payment";
import Products from "./Pages/Products/Products";
import PaymentHistory from "./Pages/Dashboard/PaymentHistory/PaymentHistory";
import ManageProducts from "./Pages/Dashboard/ManageProducts/ManageProducts";
import AddTeamMember from "./Pages/Dashboard/AddTeamMember/AddTeamMember";
import ManageReviews from "./Pages/Dashboard/ManageReviews/ManageReviews";
import Blogs from "./Pages/Blogs/Blogs";
import BlogDetails from "./Pages/Blogs/BlogDetails";
import Contact from "./Pages/Contact/Contact";
import BlogManagement from "./Pages/Dashboard/BlogManagement/ManageBlog";
import ManageBlog from "./Pages/Dashboard/BlogManagement/ManageBlog";
import EditBlog from "./Pages/Dashboard/BlogManagement/EditBlog";
import AddBlog from "./Pages/Dashboard/BlogManagement/AddBlog";
import DeleteTeamMember from "./Pages/Dashboard/DeleteTeamMember/DeleteTeamMember";
import MembersDetails from "./Pages/Team/MembersDetails";
import auth from "./Firebase/Firebase.config";
import { useAuthState } from "react-firebase-hooks/auth";
import useProfileImage from "./Hooks/useProfileImage";
export const InitializeContext = createContext(null);

function App() {
  const [user] = useAuthState(auth);
  const [theme, setTheme] = useState(false);
  const [image] = useProfileImage(user);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  useEffect(() => {
    setTheme(JSON.parse(window.localStorage.getItem("theme")));
  }, []);

  const handleThemeChange = () => {
    setTheme(!theme);
    window.localStorage.setItem("theme", !theme);
  };

  return (
    <div data-theme={theme && "night"} className="App">
      <InitializeContext.Provider value={{ handleThemeChange, theme, image }}>
        {loading ? (
          <div id="preloader">
            <div id="loader"></div>
          </div>
        ) : (
          <Navbar />
        )}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/resetPassword" element={<ResetPassword />} />
          <Route path="/shop" element={<Products />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogDetails/:id" element={<BlogDetails />} />
          <Route
            path="/dashboard"
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          >
            <Route index element={<WelcomeDashboard />} />
            <Route
              path="profile"
              element={
                <RequireAuth>
                  <MyProfile />
                </RequireAuth>
              }
            ></Route>
            <Route
              path="myOrders"
              element={
                <RequireAuth>
                  <MyOrders />
                </RequireAuth>
              }
            ></Route>
            <Route
              path="paymentHistory"
              element={
                <RequireAuth>
                  <PaymentHistory />
                </RequireAuth>
              }
            ></Route>
            <Route
              path="manageReviews"
              element={
                <RequireAdmin>
                  <ManageReviews />
                </RequireAdmin>
              }
            ></Route>
            <Route
              path="allUsers"
              element={
                <RequireAdmin>
                  <AllUsers />
                </RequireAdmin>
              }
            ></Route>
            <Route
              path="addProduct"
              element={
                <RequireAdmin>
                  <AddProduct />
                </RequireAdmin>
              }
            ></Route>
            <Route
              path="manageProducts"
              element={
                <RequireAdmin>
                  <ManageProducts />
                </RequireAdmin>
              }
            ></Route>
            <Route
              path="addTeamMember"
              element={
                <RequireAdmin>
                  <AddTeamMember />
                </RequireAdmin>
              }
            ></Route>
            <Route
              path="deleteTeamMember"
              element={
                <RequireAdmin>
                  <DeleteTeamMember />
                </RequireAdmin>
              }
            ></Route>
            <Route path="addReview" element={<AddReview />}></Route>
            <Route
              path="manageOrder"
              element={
                <RequireAdmin>
                  <ManageOrder />
                </RequireAdmin>
              }
            ></Route>
            <Route
              path="payment/:paymentId"
              element={
                <RequireAuth>
                  <Payment></Payment>
                </RequireAuth>
              }
            ></Route>
            <Route path="managementBlog" element={<BlogManagement />}>
              <Route index element={<AddBlog />} />
              <Route path="addBlog" element={<AddBlog />} />
              <Route path="manageBlogs" element={<ManageBlog />} />
              <Route path="edit/:editId" element={<EditBlog />} />
            </Route>
          </Route>
          <Route
            path="/purchase/:id"
            element={
              <RequireAuth>
                <ProductDetails />
              </RequireAuth>
            }
          />
          <Route path="/teamMembers" element={<Team />} />
          <Route path="/teamMembers/:membersId" element={<MembersDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ScrollButton />
        <Toaster />
      </InitializeContext.Provider>
    </div>
  );
}

export default App;
