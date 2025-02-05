import { NavLink } from "react-router-dom";
import { WishListProducts, CartProducts } from "../store/ContextApi";
import { useContext, useState } from "react";
import { useSelector } from "react-redux";
import Cart from "./Cart";

export default function Header() {
  const { wishListProducts, setWishListProducts } = useContext(WishListProducts);
  const { cartProducts, setCartProducts } = useContext(CartProducts);
  const [showOrDontShowCart, setShowOrDontShowCart]=useState(false)
  const isLogged = useSelector((state) => state.auth.isLogged);
  
  return (
    <>
      <div className="flex justify-between items-center h-9 text-xs px-14 bg-[#f4f4f4]">
        <div className="flex gap-5 pl-12">
          <div className="no-underline hover:underline hover:cursor-pointer">Haqqımızda</div>
          <div className="no-underline hover:underline hover:cursor-pointer">Müştəri xidmətləri</div>
          <div className="no-underline hover:underline hover:cursor-pointer">Bloq</div>
        </div>
        <div className="mr-12 hover:cursor-pointer">
          AZ
          <span className="ml-[2px] transform translate-y-[-0.5px] inline-block">
            <img src="https://mybrands.az/img/lang_pt.svg" alt="arrow" />
          </span>
        </div>
      </div>
      <div className="flex justify-between px-[100px] h-[100px] items-center">
        <NavLink to="/" className="no-underline hover:underline border-none"
        style={{
          border:"none"
        }}
        >
          <img style={{
            border:"none"
          }} 
          src="https://mybrands.az/img/logo.svg" alt="logoOWebsite" />
        </NavLink>
        <div className="flex gap-7">
          <div className="flex gap-7">
            <img
              className="w-5 hover:cursor-pointer"
              src="https://mybrands.az/img/search_black_icon.svg"
              alt="search"
            />
            <NavLink to="/wishlist-page" className="flex hover:cursor-pointer">
              <img
                className="w-5"
                src="https://mybrands.az/img/heart_empty_icon.svg"
                alt="wishlist"
              />
              <span 
              style={{
                backgroundColor:wishListProducts.length>0?"#DE163E":"",
                color:wishListProducts.length>0?"white":"",
                width:wishListProducts.length>0?"15px":"",
                height:wishListProducts.length>0?"15px":"",
                transform:wishListProducts.length>0? "translateX(-7px)":"",
                display:wishListProducts.length>0?"flex":"",
                justifyContent:wishListProducts.length>0?"center":"",
                alignItems:wishListProducts.length>0?"center":"",
                fontSize:wishListProducts.length>0?"10px":"",
                borderRadius:wishListProducts.length>0?"100%":""
              }}
              >{wishListProducts.length>0?wishListProducts.length:""}</span>
            </NavLink>
            <div
            onClick={()=>{
              setShowOrDontShowCart(prev=>!prev)
              if(!isLogged){
                alert("Hesabınıza daxil olmamısınız")
              }
            }}
            className="hover:cursor-pointer flex"
            >
            <img
              className="w-5"
              src="https://mybrands.az/img/basket_black_icon.svg"
              alt="bag"
            />
            <span
              style={{
                backgroundColor:cartProducts?.cart_items?.length>0?"#212D4A":"",
                color:cartProducts?.cart_items?.length>0?"white":"",
                width:cartProducts?.cart_items?.length>0?"15px":"",
                height:cartProducts?.cart_items?.length>0?"15px":"",
                transform:cartProducts?.cart_items?.length>0? "translateX(-5px)":"",
                display:cartProducts?.cart_items?.length>0?"flex":"",
                justifyContent:cartProducts?.cart_items?.length>0?"center":"",
                alignItems:cartProducts?.cart_items?.length>0?"center":"",
                fontSize:cartProducts?.cart_items?.length>0?"10px":"",
                borderRadius:cartProducts?.cart_items?.length>0?"100%":"",
              }}
              >
              {cartProducts?.cart_items?.length>0? cartProducts?.cart_items?.length:""}
              </span>
            </div>
            {showOrDontShowCart==true&&isLogged&&<Cart/>}
          </div>
          <NavLink to="/login-page">
            <div className="flex gap-3 border-l-2 pl-8">
              <img
                className="w-5"
                src="https://mybrands.az/img/user_black_icon.svg"
                alt="user"
              />
              <span>{isLogged?"Siz":"Sizin hesabınız"}</span>
              <img
                className="w-3"
                src="https://mybrands.az/img/lang_pt.svg"
                alt="arrow"
              />
            </div>
          </NavLink>
        </div>
      </div>
    </>
  );
}
