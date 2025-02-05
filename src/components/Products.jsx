import { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { AllProducts, PageNumber, WishListProducts, LoadingProducts, Productss } from "../store/ContextApi";
import { LoadingOutlined } from '@ant-design/icons';
import { Flex, Spin } from 'antd';
import './productsImageHover.css'

export default function Products() {
  const { products, setProducts } = useContext(AllProducts);
  const { wishListProducts, setWishListProducts } = useContext(WishListProducts);
  const { pageNumber, setPageNumber } = useContext(PageNumber);
  const { loading, setLoading } = useContext(LoadingProducts);
  const { productss, setProductss } = useContext(Productss); //to determine finish page

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
      <div className="text-gray-500 font-semibold text-[14px] underline underline-offset-2 cursor-default w-[100px] text-center mb-[5px]">Səhifə {pageNumber}</div>
      <div className="grid grid-cols-3 gap-5 place-content-center">
        {loading&&<div className="flex flex-col gap-[20px] items-center w-[800px] h-[370px] pt-[38px]">  
        <Flex align="center" gap="middle">
          <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
        </Flex>
        </div>}
        {!loading&&products &&
          products.length > 0 &&
          products.map((element) => {
            return (
              <div className="div" key={element.id}>
              <NavLink to={`/product/${element.product.id}`}>
                <div className=" relative h-[409px] flex flex-col justify-end overflow-hidden">
                  <img
                    className="img h-[409px] w-[279px] absolute z-[-1] transition-all duration-700"
                    src={element.image.items[0].file}
                    alt="item"
                  />
                  <div
                    onClick={(e) => {
                      e.preventDefault();
                      ClickToAddOrRemoveWishList(element.product.id,element.image.items[0].file, element.product.title_az, element.product.title_az.split(",")[1], element.price);
                    }}
                    style={{backgroundColor:isProductInWishlist(element.product.id)?"#DE163E":"#F6F6F6"}}
                    className="bg-[#F6F6F6] hover:shadow-lg translate-y-[-14px] translate-x-[25px] w-[40px] rounded-[100%] box-border p-[10px]"
                  >
                    <img
                      src={isProductInWishlist(element.product.id)?"https://mybrands.az/img/empty_heart_white_icon.svg":"https://mybrands.az/img/heart_empty_icon.svg"}
                      alt="wishlist"
                    />
                  </div>
                </div>
                <p className="text-sm mt-[14px] mb-[30px]">
                  {element.product.title_az}
                </p>
                <p className="font-bold text-[20px]">&#8380; {element.price}</p>
              </NavLink>
              </div>
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
        className="border-[#212D4A] border-2 text-[#212D4A] w-[350px] h-[50px] flex justify-center items-center font-semibold text-lg hover:cursor-pointer hover:border-[3px]">
          ÖNCƏKİ SƏHİFƏ
        </div>
        <div
        onClick={()=>{
          // if(products&&products.length>=1){
            // }
            if(productss!=undefined){
              setPageNumber(prev=>prev+1)
          }
        }}
        className="border-[#212D4A] border-2 text-[#212D4A] w-[350px] h-[50px] flex justify-center items-center font-semibold text-lg hover:cursor-pointer hover:border-[3px]">
          NÖVBƏTİ SƏHİFƏ
        </div>
      </div>
    </div>
  );
}
