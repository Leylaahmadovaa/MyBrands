import { useContext, useState } from "react";
import { SubCategoryList, ProductCategory, SubSqrCategoryList, MinimumPrice, MaximumPrice } from "../store/ContextApi";
export default function Filter() {
  const { subCategoryList, setSubCategoryList } = useContext(SubCategoryList);
  const { subSqrCategoryList, setSubSqrCategoryList } = useContext(SubSqrCategoryList);  
  const { category, setCategory } = useContext(ProductCategory);
  const { minPrice, setMinPrice } = useContext(MinimumPrice);
  const { maxPrice, setMaxPrice } = useContext(MaximumPrice);
  const [hoverEffectPrice, setHoverEffectPrice] = useState(false);
  const [hoverEffectSubCategory, setHoverEffectSubCategory] = useState(false);
  const [hoverEffectSubSqrCategory, setHoverEffectSubSqrCategory] = useState(false);

  function handleClick(CategoryNum) {
    localStorage.setItem("category", JSON.stringify(CategoryNum));
    setCategory(CategoryNum);
  }
  
  return (
    <div className="w-[328px]">
      <div
      onClick={()=>{
        setHoverEffectPrice(prev=>!prev)
      }}
      className="border-2 w-full h-[70px] flex items-center  justify-between px-[40px] cursor-pointer">
        Qiymətlər
        <img
          src="https://mybrands.az/img/select_black_pt.svg"
          alt="icon"
          className="w-[12px]"
          style={{
            transition:"all 1s",
            transform: hoverEffectPrice?"rotate(180deg)":"",
          }}
        />
      </div>
      <div 
       style={{
        opacity:hoverEffectPrice?"1":"0",
        visibility:hoverEffectPrice?"visible":"hidden",
        transition: "ease-in-out 1s",
        maxHeight:hoverEffectPrice?"220px":"0px",
        border:hoverEffectPrice?"2px solid #e5e7eb":"",
        padding:hoverEffectPrice?"20px":""
      }}
      className="w-[328px]">
        <div className="flex justify-around">
          <input value={minPrice} onChange={(e) => setMinPrice(e.target.value)} type="text" placeholder="Min" className="bg-[#f7f7f7] w-[120px] h-[54px] pl-[14px]"/>
          <input value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} type="text" placeholder="Max" className="bg-[#f7f7f7] w-[120px] h-[54px] pl-[14px]"/>
        </div>
        <div className="ml-[20px] mt-[20px] flex flex-col gap-[5px]">
          <p
          onClick={()=>{
            setMinPrice("0")
            setMaxPrice("100")
          }}
          className="hover:underline hover:cursor-pointer"
          >0 - 100 AZN</p>
          <p
          onClick={()=>{
            setMinPrice("100")
            setMaxPrice("200")
          }}
          className="hover:underline hover:cursor-pointer"
          >100 - 200 AZN</p>
          <p
          onClick={()=>{
            setMinPrice("200")
            setMaxPrice("300")
          }}
          className="hover:underline hover:cursor-pointer"
          >200 - 300 AZN</p>
          <p
          onClick={()=>{
            setMinPrice("300")
            setMaxPrice("")
          }}
          className="hover:underline hover:cursor-pointer"
          > &gt; 300</p>
        </div>
      </div>

      <div className="border-2 w-full h-[70px] flex items-center  justify-between px-[40px]">
        Kolleksiyalar
        <img
          src="https://mybrands.az/img/select_black_pt.svg"
          alt="icon"
          className="w-[12px]"
        />
      </div>
      <div
      onClick={()=>setHoverEffectSubCategory(prev=>!prev)}
      className="border-2 w-full h-[70px] flex items-center  justify-between px-[40px]">
        Kateqoriyalar
        <img
          src="https://mybrands.az/img/select_black_pt.svg"
          alt="icon"
          className="w-[12px]"
          style={{
            transition:"all 1s",
            transform: hoverEffectSubCategory?"rotate(180deg)":"",
          }}
        />
      </div>
      <div
      style={{
        opacity:hoverEffectSubCategory?"1":"0",
        visibility:hoverEffectSubCategory?"visible":"hidden",
        transition: "ease-in-out 1s",
        maxHeight:hoverEffectSubCategory?"750px":"0px",
        border:hoverEffectSubCategory?"2px solid #e5e7eb":"",
        padding:hoverEffectSubCategory?"20px":"",
      }}
      className="w-[328px]">
        {subCategoryList&&subCategoryList.length>0&&subCategoryList.map((element)=>{
          return (
            <p
            onClick={() => {
              handleClick(`${element.id}`);
            }}
            className="hover:cursor-pointer" key={element.id}>{element.title_az}</p>
          )
        })}
      </div>
      <div
      onClick={()=>setHoverEffectSubSqrCategory(prev=>!prev)}
      className="border-2 w-full h-[70px] flex items-center  justify-between px-[40px]">
        Alt-kateqoriyalar
        <img
          src="https://mybrands.az/img/select_black_pt.svg"
          alt="icon"
          className="w-[12px]"
          style={{
            transition:"all 1s",
            transform: hoverEffectSubSqrCategory?"rotate(180deg)":"",
          }}
        />
      </div>
      <div 
      style={{
        opacity:hoverEffectSubSqrCategory?"1":"0",
        visibility:hoverEffectSubSqrCategory?"visible":"hidden",
        transition: "ease-in-out 1s",
        maxHeight:hoverEffectSubSqrCategory?"300px":"0px",
        border:hoverEffectSubSqrCategory?"2px solid #e5e7eb":"",
        padding:hoverEffectSubSqrCategory?"20px":"",
      }}
      className="w-[328px]">
      {subSqrCategoryList&&subSqrCategoryList.length>0?subSqrCategoryList.map((element)=>{
          return (
            <p
            onClick={() => {
              handleClick(`${element.id}`);
            }}
            className="hover:cursor-pointer" key={element.id}>{element.title_az}</p>
          )
        }):<p className="text-[14px] ml-[14px]">Alt Kateqoriya yoxdur və ya seçilməyib</p>}
      </div>
      <div className="border-2 w-full h-[70px] flex items-center  justify-between px-[40px]">
        Brend
        <img
          src="https://mybrands.az/img/select_black_pt.svg"
          alt="icon"
          className="w-[12px]"
        />
      </div>
      <div className="border-2 w-full h-[70px] flex items-center justify-between px-[40px]">
        Ölçü
        <img
          src="https://mybrands.az/img/select_black_pt.svg"
          alt="icon"
          className="w-[12px]"
        />
      </div>
      <div className="border-2 w-full h-[70px] flex items-center justify-between px-[40px]">
        Rəng
        <img
          src="https://mybrands.az/img/select_black_pt.svg"
          alt="icon"
          className="w-[12px]"
        />
      </div>
    </div>
  );
}
