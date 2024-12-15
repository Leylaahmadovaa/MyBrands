import { NavLink } from "react-router-dom";
import { WishListProducts } from "../store/ContextApi";
import { useContext, useEffect } from "react";

export default function WishList() {
  const { wishListProducts, setWishListProducts } = useContext(WishListProducts);

  const ClickToRemoveWishList = (productId) => {
    setWishListProducts((prevWishList) => { 
        return prevWishList.filter((item) => item.id !== productId);
    });
  };

  useEffect(() => {
    localStorage.setItem("wishListProductsList", JSON.stringify(wishListProducts));
  }, [wishListProducts]);

  return (
    <div className="w-full px-[10%] py-[3%] border-t-2">
      <div className="grid grid-cols-4 gap-x-5 gap-y-10 place-content-center">
        {wishListProducts &&
          wishListProducts.length > 0 &&
          wishListProducts.map((e) => (
            <NavLink to={`/product/${e.id}`} key={e.id}>
              <div className="flex flex-col" key={e.id}>
                <img src={e.image} className="w-[315px] h-[400px]" alt="wishListProduct" />
                <div>
                  <button
                  onClick={(event) => {
                    event.preventDefault();
                    ClickToRemoveWishList(e.id);
                  }}
                  className="bg-gray-200 hover:shadow-lg hover:border-2 border-2 translate-x-[10px] translate-y-[-45px] rounded-full px-[12px] py-[10px]">
                    <img
                      src="https://mybrands.az/img/remove_black_icon.svg"
                      alt="delete"
                    />
                  </button>
                </div>
                <div className="ml-3 w-full translate-x-[-15px] translate-y-[-30px]">
                  <span>{e.title},</span>
                  <p className="text-[#6C6C6C]"> {e.subTitle}</p>
                </div>
                <p className="font-semibold text-[15px]">
                  <span className="font-bold text-[10px] inline-block translate-y-[-4px] mr-1">
                    &#8380;
                  </span>
                  {e.price}
                </p>
              </div>
            </NavLink>
          ))}
      </div>
    </div>
  );
}
