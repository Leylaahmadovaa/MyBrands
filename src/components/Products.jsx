import { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { AllProducts, PageNumber, WishListProducts } from "../store/ContextApi";

export default function Products() {
  const { products, setProducts } = useContext(AllProducts);
  const { wishListProducts, setWishListProducts } = useContext(WishListProducts);
  const { pageNumber, setPageNumber } = useContext(PageNumber);

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
    <div className="w-[57%]">
      <div className="grid grid-cols-3 gap-5 place-content-center">
        {products &&
          products.length > 0 &&
          products.map((element) => {
            return (
              <NavLink to={`/product/${element.product.id}`} key={element.id}>
                <div>
                  <img
                    className="h-[405px]"
                    src={element.image.items[0].file}
                    alt="item"
                  />
                  <div
                    onClick={(e) => {
                      e.preventDefault();
                      ClickToAddOrRemoveWishList(element.product.id,element.image.items[0].file, element.product.title_az, element.product.title_az.split(",")[1], element.price);
                    }}
                    style={{backgroundColor:isProductInWishlist(element.product.id)?"#DE163E":"#F6F6F6"}}
                    className="bg-[#F6F6F6] hover:shadow-lg translate-y-[-50px] translate-x-[25px] w-[40px] rounded-[100%] box-border p-[10px]"
                  >
                    <img
                      src={isProductInWishlist(element.product.id)?"https://mybrands.az/img/empty_heart_white_icon.svg":"https://mybrands.az/img/heart_empty_icon.svg"}
                      alt="wishlist"
                    />
                  </div>
                </div>
                <p className="text-sm mt-[-25px] mb-[30px]">
                  {element.product.title_az}
                </p>
                <p className="font-bold text-[20px]">&#8380; {element.price}</p>
              </NavLink>
            );
          })}
      </div>

      <div className="flex justify-center gap-[55px] mb-[20px] mt-[55px]">
        <div
        onClick={()=>{
          if(pageNumber>0){
            setPageNumber(prev=>prev-1)
          }
        }}
        className="border-[#212D4A] border-2 text-[#212D4A] w-[350px] h-[50px] flex justify-center items-center font-semibold text-lg">
          ÖNCƏKİ SƏHİFƏ {pageNumber}
        </div>
        <div
        onClick={()=>{
          setPageNumber(prev=>prev+1)
        }}
        className="border-[#212D4A] border-2 text-[#212D4A] w-[350px] h-[50px] flex justify-center items-center font-semibold text-lg">
          NÖVBƏTİ SƏHİFƏ {pageNumber}
        </div>
      </div>
    </div>
  );
}
