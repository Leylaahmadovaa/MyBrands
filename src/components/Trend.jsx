import { NavLink } from "react-router-dom";
import { TrendProducts, WishListProducts } from "../store/ContextApi";
import { useContext, useEffect } from "react";
export default function Trend() {
  const { trendProducts, setTrendProducts } = useContext(TrendProducts);
  const { wishListProducts, setWishListProducts } = useContext(WishListProducts);
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

  return (
    trendProducts && trendProducts.length > 0 && trendProducts.slice(0, 6).map((element) => {
      return (
        <NavLink
          style={{
            height: "430px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
          key={element.product.id}
          to={`/product/${element.product.id}`}
        >
          <div>
            <img
              className="h-[300px]"
              src={"http://test.mybrands.az"+element.image.items[0].file}
              alt="item"
            />

            <div
            onClick={(e) => {
              e.preventDefault();
              ClickToAddOrRemoveWishList(element.product.id,`http://test.mybrands.az${element.image.items[0].file}`, element.product.title_az, element.product.title_az.split(",")[1], element.price);
            }}
            style={{backgroundColor:isProductInWishlist(element.product.id)?"#DE163E":"#F6F6F6"}}
            className="bg-[#F6F7F9] hover:shadow-lg translate-y-[-50px] translate-x-[10px] w-[40px] rounded-[100%] box-border p-[10px]">
              <img
                src={isProductInWishlist(element.product.id)?"https://mybrands.az/img/empty_heart_white_icon.svg":"https://mybrands.az/img/heart_empty_icon.svg"}
                alt="wishlistIcon"
              />
            </div>
          </div>
          <p className="text-sm mt-[-25px] mb-[30px] translate-y-[-18px]">
            {element.product.title_az}
          </p>
          <p className="font-bold text-[18px] translate-y-[-35px]">
            &#8380; {element.price}
          </p>
        </NavLink>
      );
    })
  );  
}
