import {
  AllProducts,
  Gender,
  ProductCategory,
  SubCategoryList,
  SubSqrCategoryList,
  Banners,
  TrendProducts,
  WishListProducts,
  CartProducts,
  PageNumber
} from "../src/store/ContextApi";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./RootLayout";
import ProductDetailPage from "./pages/ProductDetailPage";
import ProductsPage from "./pages/ProductsPage";
import ErrorPage from "./pages/ErrorPage";
import BrandsPage from "./pages/BrandsPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import WishListPage from "./pages/WishListPage";
import ChildrenPage from "./pages/ChildrenPage";
import GenderCategoryPage from "./pages/GenderCategoryPage";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { useSelector } from "react-redux";
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/usaqlar",
        element: <ChildrenPage />,
      },
      {
        path: "/wishlist-page",
        element: <WishListPage />,
      },
      {
        path: "/brands-page",
        element: <BrandsPage />,
      },
      {
        path: "/login-page",
        element: <LoginPage />,
      },
      {
        path: `/gender-category-page`,
        element: <GenderCategoryPage />,
      },
      {
        path: "/products",
        element: <ProductsPage />,
      },
      {
        path: "/product/:id",
        element: <ProductDetailPage />,
      },
    ],
  },
]);

function App() {
  const cookies = new Cookies();
  const isLogged = useSelector((state) => state.auth.isLogged);
  let userGender = JSON.parse(localStorage.getItem("gender"));
  let productCatgeory = JSON.parse(localStorage.getItem("category"));
  let productSubCategoryList = JSON.parse(localStorage.getItem("subCategoryList"));
  let productSubSqrCategoryList = JSON.parse(localStorage.getItem("subSqrCategoryList"));
  let wishListProductsList = JSON.parse(localStorage.getItem("wishListProductsList"));
  const [products, setProducts] = useState([]);
  const [banners, setBanners] = useState([]);
  const [trendProducts, setTrendProducts] = useState([]);
  const [wishListProducts, setWishListProducts] = useState(wishListProductsList);
  const [cartProducts, setCartProducts] = useState([]);
  const [gender, setGender] = useState(userGender);
  const [category, setCategory] = useState(productCatgeory);
  const [subCategoryList, setSubCategoryList] = useState(productSubCategoryList);
  const [subSqrCategoryList, setSubSqrCategoryList] = useState(productSubSqrCategoryList);
  const [pageNumber, setPageNumber] = useState(1);
  useEffect(() => {
    async function getBanners() {
      let bannerss = await fetch(
        `https://test.mybrands.az/api/v1/campaigns`
      )
      .then((res) => res.json())
        .then((res) => res);
      setBanners(bannerss);
    }
    getBanners();

    async function getTrendProducts() {
      let trendData = await fetch(
        `https://test.mybrands.az/api/v1/products/top-sale-trend-products/`
      )
      .then((res) => res.json())
      .then((res) => res.trend_products);
      setTrendProducts(trendData);
    }
    getTrendProducts();

    async function getProducts() {
      let data = await fetch(
        `http://test.mybrands.az/api/v1/products/?categories=${category}&page=${pageNumber}&product__gender=${gender}` //geyim kisiler
      )
      .then((res) => res.json())
      .then((res) => res.results);
      setProducts(data);
    }
    getProducts();
    
    if(category=="2"||category=="1"||category=="5"||category=="4"||category=="6"){
      async function getSubCategoryList() {
        let info = await fetch(
          `https://test.mybrands.az/api/v1/products/categories?genders=${gender}&key=category&parent=${category}`
        )
          .then((res) => res.json())
          .then((res) => res);
        setSubCategoryList(info);
      }
      getSubCategoryList();
    }
    else if(Number(category)<=92){
      async function getSubSqrCategoryList() { //Sub Square
        let infoo = await fetch(
          `https://test.mybrands.az/api/v1/products/categories?genders=${gender}&key=sub_category&parent=${category}`
        )
        .then((res) => res.json())
        .then((res) => res);
        setSubSqrCategoryList(infoo);        
      }
      getSubSqrCategoryList();
    }
    
  }, [gender, category, pageNumber]);
  
  useEffect(()=>{
    if (isLogged) {
      async function getCartProducts() {
        try {
            const token = cookies.get("JWT_token");
            const response = await fetch('https://test.mybrands.az/api/v1/products/cart/', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                const errorData = await response.json();
                console.error('API Error:', errorData);
                return;
            }
            const data = await response.json();
            setCartProducts(data);
        } catch (error) {
            console.error('Fetch error:', error);
        }
    }
    getCartProducts();
    }
    else{
      setCartProducts("");
    }
  },[isLogged])
  
  if(wishListProductsList==null){
    localStorage.setItem("wishListProductsList", JSON.stringify([]));
  }
  if(productSubCategoryList==null){
    localStorage.setItem("subCategoryList", JSON.stringify([]));
  }
  else{
    localStorage.setItem("subCategoryList", JSON.stringify(subCategoryList));
    localStorage.setItem("wishListProductsList", JSON.stringify(wishListProducts));
  }
  return (
    <AllProducts.Provider value={{ products, setProducts }}>
      <Gender.Provider value={{ gender, setGender }}>
        <ProductCategory.Provider value={{ category, setCategory }}>
            <SubCategoryList.Provider value={{ subCategoryList, setSubCategoryList }}>
              <SubSqrCategoryList.Provider value={{ subSqrCategoryList, setSubSqrCategoryList }}>
                <Banners.Provider value={{ banners, setBanners }}>
                  <TrendProducts.Provider value={{ trendProducts, setTrendProducts }}>
                    <WishListProducts.Provider value={{ wishListProducts, setWishListProducts }}>
                      <CartProducts.Provider value={{ cartProducts, setCartProducts }}>
                        <PageNumber.Provider value={{ pageNumber, setPageNumber }}>
                           <RouterProvider router={router} />
                        </PageNumber.Provider>
                      </CartProducts.Provider>
                    </WishListProducts.Provider>
                  </TrendProducts.Provider>
                </Banners.Provider>
              </SubSqrCategoryList.Provider>
            </SubCategoryList.Provider>
        </ProductCategory.Provider>
      </Gender.Provider>
    </AllProducts.Provider>
  );
}
export default App;
