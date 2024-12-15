import { useContext, useState } from "react";
import { SubCategoryList, ProductCategory, SubSqrCategoryList } from "../store/ContextApi";
export default function Filter() {
  const { subCategoryList, setSubCategoryList } = useContext(SubCategoryList);
  const { subSqrCategoryList, setSubSqrCategoryList } = useContext(SubSqrCategoryList);  
  const { category, setCategory } = useContext(ProductCategory);
  const [showOrDontShowSubCategoryFilter, setShowOrDontShowSubCategoryFilter]=useState(false)
  const [showOrDontShowSubSqrCategoryFilter, setShowOrDontShowSubSqrCategoryFilter]=useState(false)

  function handleClick(CategoryNum) {
    localStorage.setItem("category", JSON.stringify(CategoryNum));
    setCategory(CategoryNum);
  }
  
  return (
    <div className="w-[328px]">
      <div className="border-2 w-full h-[70px] flex items-center  justify-between px-[40px]">
        Qiymətlər
        <img
          src="https://mybrands.az/img/select_black_pt.svg"
          alt="icon"
          className="w-[12px]"
        />
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
      onClick={()=>setShowOrDontShowSubCategoryFilter(prev=>!prev)}
      className="border-2 w-full h-[70px] flex items-center  justify-between px-[40px]">
        Kateqoriyalar
        <img
          src="https://mybrands.az/img/select_black_pt.svg"
          alt="icon"
          className="w-[12px]"
        />
      </div>
      {showOrDontShowSubCategoryFilter==true&&<div className="w-[328px] min-h-[300px] border-2 p-[20px]">
        {subCategoryList&&subCategoryList.length>0&&subCategoryList.map((element)=>{
          return (
            <p
            onClick={() => {
              handleClick(`${element.id}`);
            }}
            className="hover:cursor-pointer" key={element.id}>{element.title_az}</p>
          )
        })}
      </div>}
      <div
      onClick={()=>setShowOrDontShowSubSqrCategoryFilter(prev=>!prev)}
      className="border-2 w-full h-[70px] flex items-center  justify-between px-[40px]">
        Alt-kateqoriyalar
        <img
          src="https://mybrands.az/img/select_black_pt.svg"
          alt="icon"
          className="w-[12px]"
        />
      </div>
      {showOrDontShowSubSqrCategoryFilter==true&&<div className="w-[328px] min-h-[300px] border-2 p-[20px]">
      {subSqrCategoryList&&subSqrCategoryList.length>0&&subSqrCategoryList.map((element)=>{
          return (
            <p
            onClick={() => {
              handleClick(`${element.id}`);
            }}
            className="hover:cursor-pointer" key={element.id}>{element.title_az}</p>
          )
        })}
      </div>}
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
