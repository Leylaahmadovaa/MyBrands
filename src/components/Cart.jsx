import { CartProducts, WishListProducts } from "../store/ContextApi";
import { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import Cookies from "universal-cookie";

export default function Cart() {
  const cookies = new Cookies();
  const isLogged = useSelector((state) => state.auth.isLogged);
  const { cartProducts, setCartProducts } = useContext(CartProducts);
  const { wishListProducts, setWishListProducts } = useContext(WishListProducts);
  
  const deleteProductFromCart = async (cartProductId) => {
    if (isLogged) {
      try {
        const token = cookies.get("JWT_token");
        const response = await fetch(
          `https://test.mybrands.az/api/v1/products/cart/${cartProductId}/`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          const errorData = await response.json();
          console.error("API Error:", errorData);
          return;
        }
        console.log("Product successfully removed from cart");
        setCartProducts((prevCart) => ({
          ...prevCart,
          cart_items: prevCart.cart_items.filter(
            (item) => item.id !== cartProductId
          ),
        }));
      } catch (error) {
        console.error("Fetch error:", error);
      }
    } 
    else {
      setCartProducts("");
    }
  };

  const ClickToAddOrRemoveWishList = (productId, productImage, productTitle, productSubTitle, productPrice) => {
    setWishListProducts((prevWishList) => {
      const exists = prevWishList.some((item) => item.id === productId);
      if (exists) {
        return prevWishList.filter((item) => item.id !== productId);
      } 
      else {
        return [
          ...prevWishList,
          {
            id: productId,
            image: productImage,
            title: productTitle,
            subTitle: productSubTitle,
            price: productPrice,
          },
        ];
      }
    });
  };
  const isProductInWishlist = (productId) => {
    return wishListProducts.some((item) => item.id === productId);
  };

  useEffect(() => {
    localStorage.setItem("wishListProductsList", JSON.stringify(wishListProducts));
  }, [wishListProducts]);

  return <div className="absolute top-[125px] right-[250px] bg-white z-10 w-[640px] h-[420px] shadow-2xl p-[30px] ">
          <div className="overflow-y-scroll h-[300px]">
          {cartProducts && cartProducts.cart_items && cartProducts.cart_items.length > 0 && cartProducts.cart_items.map((cartItem) => (
              <NavLink 
              to={`/product/${cartItem.product_variation_details.product.id}`}
              key={cartItem.id}>
              <div
                className="flex border-b-2 pb-4 justify-between mb-[12px]"
              >
                <img
                  className="w-[100px] h-[140px]"
                  src={cartItem.product_variation_details.image&&cartItem.product_variation_details.image.items[0].file}
                  alt="cartitem"
                />
                <div className="ml-3 w-[60%] translate-x-[-20px]">
                  <p className="font-semibold text-[22px]">
                    <span className="font-bold text-[10px] inline-block translate-y-[-8px] mr-1">
                      &#8380;
                    </span>
                    {cartItem.product_variation_details.price}
                  </p>
                  <span>
                    {cartItem.product_variation_details.product.title_az}
                  </span>
                  <p className="mt-2">x1</p>
                </div>
                <div>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      deleteProductFromCart(cartItem.id)}}
                    className="bg-[#F6F7F9] hover:shadow-lg rounded-full p-2 mr-[10px]"
                  >
                    <img
                      src="https://mybrands.az/img/remove_gray_icon.svg"
                      alt="delete"
                    />
                  </button>
                  <button
                  onClick={(e) => {
                    e.preventDefault();
                    ClickToAddOrRemoveWishList(cartItem.product_variation_details.product.id,cartItem.product_variation_details.image?cartItem.product_variation_details.image.items[0].file:"", cartItem.product_variation_details.product.title_az, cartItem.product_variation_details.product.title_az.split(",")[1], cartItem.product_variation_details.price);
                  }}
                  style={{backgroundColor:isProductInWishlist(cartItem.product_variation_details.product.id)?"#DE163E":"#F6F6F6"}}
                  className="bg-[#F6F7F9] hover:shadow-lg rounded-full p-2">
                    <img
                      src={isProductInWishlist(cartItem.product_variation_details.product.id)?"https://mybrands.az/img/empty_heart_white_icon.svg":"https://mybrands.az/img/like_gray_icon.svg"}
                      alt="wishlist"
                    />
                  </button>
                </div>
              </div>
              </NavLink>
          ))}
        </div>
        <button className="bg-blue-950 text-white w-[580px] h-[60px] font-semibold text-[18px]">
          SƏBƏTƏ KEÇMƏK
        </button>
      </div>
}
