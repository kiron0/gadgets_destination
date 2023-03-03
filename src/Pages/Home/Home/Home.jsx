import React from "react";
import useTitle from "../../../Hooks/useTitle";
import Footer from "../../../Shared/Footer/Footer";
import Banner from "../Banner/Banner";
import GetInTouch from "../GetInTouch/GetInTouch";
import Hero from "../Hero/Hero";
import OrderStep from "../OrderStep/OrderStep";
import Products from "../Products/Products";
import Reviews from "../Reviews/Reviews";
import Stats from "../Stats/Stats";
import Teams from "../Teams/Teams";

const Home = () => {
  useTitle("Home");
  return (
    <>
      <Banner />
      <Hero />
      <Products />
      <Teams />
      <Reviews />
      <OrderStep />
      <Stats />
      <GetInTouch />
      <Footer />
    </>
  );
};

export default Home;
