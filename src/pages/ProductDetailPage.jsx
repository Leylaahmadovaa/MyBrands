import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { WishListProducts, CartProducts } from "../store/ContextApi";
import Cookies from "universal-cookie";
import { useSelector } from "react-redux";
export default function ProductDetail() {
  let imagee
  const cookies = new Cookies();
  const isLogged = useSelector((state) => state.auth.isLogged);
  const params = useParams();
  const [productDetails, setProductDetails] = useState();
  const { wishListProducts, setWishListProducts } = useContext(WishListProducts);
  const { cartProducts, setCartProducts } = useContext(CartProducts);
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

  const isProductInCart = (productId) => {
    return cartProducts?.cart_items?.some((item) => item.product_variation_details.id === productId);
  };

  const addProductToCart = async (productID) => {
  if (isLogged) {
    try {
      const token = cookies.get("JWT_token");
      const response = await fetch("https://test.mybrands.az/api/v1/products/cart/", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product: productDetails.variations[0].id,
          quantity: 1,
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        console.error("API Error:", errorData);
        return;
      }
      const data = await response.json();
      console.log("Məhsul başarıyla əlavə edildi:", data);
      setCartProducts((prevCart) => {
      const exists = prevCart?.cart_items?.some((item) => item.product_variation_details.id === productID);
      if (exists) {
        return ({
        ...prevCart,
        cart_items: [...prevCart.cart_items]
        })
      }
      else{
        return ({
        ...prevCart,
        cart_items: [...prevCart.cart_items, data]
        })
      }
      
      })
    } catch (error) {
      console.error("Fetch error:", error);
    }
    }
    else{
      setCartProducts({});
    }
  };

  useEffect(() => {
    async function getProductDetails() {
      let data = await fetch(
        `https://test.mybrands.az/api/v1/products/${params.id}`
      )
        .then((res) => res.json())
        .then((res) => res);
      setProductDetails(data);
    }
    getProductDetails();
  }, [params.id]);

  useEffect(() => {
    localStorage.setItem("wishListProductsList", JSON.stringify(wishListProducts));
  }, [wishListProducts]);
    
  return (
    productDetails && (
      <>
        <div className="flex gap-[80px] justify-center border-t-2 pt-3">
          <div className="flex flex-col translate-x-[50px]">
          {productDetails.variations.slice(0,3).map((e,index) =>
              e.image && e.image.items && e.image.items.length > 0 ? (
                <img
                  key={`${e.image.items[0].id}-${index}`}
                  src={e.image.items[0].file}
                  className="w-[60px] h-[77px] mb-3"
                  alt="subImages"
                />
              ) : (
                ""
              )
            )}
          </div>
          {(() => {
            const firstImageVariation = productDetails.variations.find(
              (e) => e.image && e.image.items && e.image.items.length > 0
            );
            imagee=firstImageVariation.image.items[0].file;
            return firstImageVariation ? (
              <img
                src={firstImageVariation.image.items[0].file}
                className="w-[474px]"
                alt="main"
              />
            ) : (
              ""
            );
          })()}
          
          <div className="flex flex-col gap-[20px] items-center py-5">
            <h1 className="font-bold text-[20px]">
              {productDetails.manufacturer.title}
            </h1>
            <p className="font-thin text-gray-400 translate-y-[-12px]">
              {productDetails.categories[0].title_az}
            </p>
            <p className="font-bold text-[22px]">
              &#8380;{productDetails.variations[0].price}
            </p>
            <a
              href=""
              className="text-[12px] underline underline-offset-2 hover:no-underline translate-y-[-10px]"
            >
              Çatdırılma və geri qaytarılma haqqında məlumat
            </a>
            <p className="font-semibold underline underline-offset-8 mb-3">
              BİR ÖLÇÜ
            </p>
            <p className="font-thin text-[14px] underline">Ölçü cədvəli</p>
            <p className="flex text-red-600 gap-3">
              <img
                src="https://mybrands.az/img/low_stock_icon.svg"
                alt="icon"
              />
              <span className="font-semibold inline-block">MƏHDUD SAYDA</span>
            </p>
            <div
            onClick={()=>{addProductToCart(productDetails.variations[0].id)}}
            style={{backgroundColor:isProductInCart(productDetails.variations[0].id) ?"#54b76f":"#212D4A"}}
            className="bg-[#212D4A] hover:cursor-pointer text-white flex justify-center items-center h-[60px] w-[540px] text-[20px] translate-y-[12px]">
              { isProductInCart(productDetails.variations[0].id) ? "SƏBƏTƏ ƏLAVƏ EDILDI" : "SƏBƏTƏ ƏLAVƏ ET" }
            </div>
            <div
            onClick={(e) => {
              e.preventDefault();
              ClickToAddOrRemoveWishList(productDetails.id, imagee, productDetails.title_az, productDetails.title_az.split(",")[1], productDetails.variations[0].price);
            }}
            className="hover:cursor-pointer bg-[#f4f4f4] text-blue-950 flex gap-3 mt-[20px] justify-center items-center h-[60px] w-[540px] text-[20px] translate-y-[-12px]">
              <img
                src={isProductInWishlist(productDetails.id)?"https://mybrands.az/img/heart_red_icon.svg":"https://mybrands.az/img/empty_heart_blue_icon.svg"}
                alt="wishlistIcon"
              />
              {isProductInWishlist(productDetails.id)?"ARZUOLUNANLAR SİYAHISINDAN SIL":"ARZUOLUNANLAR SİYAHISINA ƏLAVƏ ET"}
            </div>
          </div>
        </div>
        <div className="flex gap-[50px] justify-center my-[50px] px-[70px]">
          <div className="border-2 w-[30%] py-[30px] px-[40px] flex flex-col gap-5">
            <h2 className="font-bold text-[17px]">
              MƏHSUL HAQQINDA ƏSAS MƏLUMAT
            </h2>
            <h3>Məhsulun kodu: {productDetails.sku}</h3>
            <div>
              <p>- {productDetails.categories[1].title_az}</p>
              <p>- {productDetails.categories[0].title_az}</p>
              <p>- {productDetails.gender.title_az}</p>
              <p>- {productDetails.season.title}</p>
              <p>- {productDetails.manufacturer.title}</p>
            </div>
          </div>
          <div className="border-2 w-[30%] py-[30px] px-[40px]">
            <h2 className="font-bold text-[17px]">
              MƏHSUL HAQQINDA ƏTRAFLI MƏLUMAT
            </h2>
          </div>
          <div className="border-2 w-[30%] py-[30px] px-[40px]  flex flex-col gap-5">
            <h2 className="font-bold text-[17px]">SEÇİLMİŞ PARAMETRLƏR</h2>
            <div>
              <p>- Ölçü: {productDetails.variations[0].size.title_az}</p>
              <p>- Rəng: {productDetails.variations[0].color.title_az}</p>
            </div>
          </div>
        </div>
      </>
    )
  );
}
