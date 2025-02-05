import { NavLink } from "react-router-dom";
import { ProductCategory, SubSqrCategoryList, Gender } from "../store/ContextApi";
import { useContext, useEffect, useState } from "react";
export default function Categories() {
  const { category, setCategory } = useContext(ProductCategory);
  const { subSqrCategoryList, setSubSqrCategoryList } = useContext(SubSqrCategoryList);
  const { gender, setGender } = useContext(Gender);
  const [subCategories, setSubCategories] = useState([]);
  const [showPopup, setShowPopup] = useState("");
  const [hoverEffect, setHoverEffect] = useState(0);

  function handleClick(CategoryNum) {
    localStorage.setItem("category", JSON.stringify(CategoryNum));
    setCategory(CategoryNum);
    setSubSqrCategoryList([])
  }
  
  function handleClickk(CategoryNum) {
      localStorage.setItem("category", JSON.stringify(CategoryNum));
      setCategory(CategoryNum);
  }

  async function getSubCategories() {
    if (!showPopup) {
      return;
    }
    fetch(
      `https://test.mybrands.az/api/v1/products/categories?genders=${gender}&key=category&parent=${showPopup}`
    )
      .then((response) => {
        if (!response.ok) {
          return Promise.reject("Failed to fetch categories");
        }
        return response.json();
      })
      .then((data) => {
        setSubCategories(data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }
  
  useEffect(() => {
    getSubCategories();
  }, [showPopup]);

  return (
    <>
      <div className="flex items-center pl-[100px] gap-5 w-full left-[400px] text-[15px] font-semibold border-t-2 h-[70px]">
        <button className="text-black">YENILIKLƏR</button>
        <NavLink to="/brands-page">
          <button className="text-black">BRENDLƏR</button>
        </NavLink>
        <button className="text-black">RƏQƏMSAL HƏDİYYƏ KARTLARI</button>
        <NavLink
        onClick={() => {
          handleClick("2");
        }}
        onMouseEnter={() => {
          setShowPopup("2")
          setHoverEffect(1)
        }}
        onMouseLeave={() => {
          setShowPopup("")
          setHoverEffect(0)
        }}
        to="/products">
        <button className="text-black h-[70px] flex items-center">GEYİM</button>
        </NavLink>
        <NavLink
        onClick={() => {
          handleClick("5");
        }}
        onMouseEnter={() => {
          setShowPopup("5")
          setHoverEffect(1)
        }}
        onMouseLeave={() => {
          setShowPopup("")
          setHoverEffect(0)
        }}
        to="/products">
        <button className="text-black h-[70px] flex items-center">AYAQQABI</button>
        </NavLink>
        <NavLink
        onClick={() => {
          handleClick("1");
        }}
        onMouseEnter={() => {
          setShowPopup("1")
          setHoverEffect(1)
        }}
        onMouseLeave={() => {
          setShowPopup("")
          setHoverEffect(0)
        }}
        to="/products">
        <button className="text-black h-[70px] flex items-center">ÇANTA VƏ AKSESUARLAR</button>
        </NavLink>
        <NavLink
        onClick={() => {
          handleClick("4");
        }}
        onMouseEnter={() => setShowPopup("4")}
        onMouseLeave={() => setShowPopup("")}
        to="/products">
        <button className="text-black h-[70px] flex items-center">GÖZƏLLİK</button>
        </NavLink>
        <button className="text-black h-full flex items-center">EV</button>
        <button className="text-red-500">ENDIRIM</button>
      </div>

    <div>
      {subCategories && subCategories.length > 0 && (
        <div
        style={{
          opacity:hoverEffect==1?"1":"0",
          visibility:hoverEffect==1?"visible":"hidden",
          transition: "ease 0.5s"
        }}
        onMouseEnter={() => {
          setShowPopup(showPopup)
          setHoverEffect(1)
        }}
        onMouseLeave={() => {
          setShowPopup("")
          setHoverEffect(0)
        }}
        className="absolute pb-[25px] z-10 min-h-[400px] border-b-2 border-t-2 w-full bg-white flex gap-[40px] px-[100px] pt-[40px]"
        >
          <div>
            <h1 className="font-bold mb-[30px]">Kateqoriyalar üzrə</h1>
            <div className="grid grid-cols-2 gap-y-[15px] gap-x-[60px]">
              {subCategories && subCategories.length > 0 && subCategories.map((element) => {
                  return (
                    <NavLink
                    to="/products"
                    onClick={() => handleClickk(`${element.id}`)}
                      className="hover:cursor-pointer hover:underline"
                      key={element.id}
                      >
                      {element.title_az}
                    </NavLink>
                  );
                })}
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
}
