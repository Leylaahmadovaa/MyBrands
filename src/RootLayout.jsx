import { Outlet, useLocation } from "react-router-dom";
import ProductCategories from "./components/ProductCategories";
import Header from "./components/Header";
import Footer from "./components/Footer";
import NavigationGender from "./components/NavigationGender";
import { useEffect, useState } from "react";
export default function RootLayout() {
  const [showNavigationGenderOrNot,setShowNavigationGenderOrNot]=useState(true)
  const [showProductCategoriesOrNot,setShowProductCategoriesOrNot]=useState(true)
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/") {
      setShowNavigationGenderOrNot(false)
      setShowProductCategoriesOrNot(false);
    }
    else if (location.pathname === "/usaqlar") {
      setShowProductCategoriesOrNot(false);
    }
    else if (location.pathname === "/login-page") {
      setShowNavigationGenderOrNot(false)
      setShowProductCategoriesOrNot(false);
    }
    else{
      setShowNavigationGenderOrNot(true)
      setShowProductCategoriesOrNot(true);
    }
    
  }, [location.pathname]);
  return (
    <>
      <Header />
      {showNavigationGenderOrNot==true&&<NavigationGender />}
      {showProductCategoriesOrNot==true&&<ProductCategories />}
      <Outlet />
      <Footer />
    </>
  );
}
