import { NavLink } from "react-router-dom";
import { Gender } from "../store/ContextApi";
import { useContext } from "react";
export default function ChildrenPage() {
    const { gender, setGender } = useContext(Gender);
  function handleClick(genderNum) {
    localStorage.setItem("gender", JSON.stringify(genderNum));
    setGender(genderNum);
  }
  return (
    <div className="flex h-[700px] justify-center gap-[30px]">
      <NavLink to="/gender-category-page">
        <div 
        onClick={() => {
            handleClick("2");
          }}
        className="hover:cursor-pointer pl-[70px] pb-[80px] h-[650px] w-[540px] bg-no-repeat bg-[url('https://mybrands.az/fit650x650/center/pages/45/2022.03.09_b.png')] flex flex-col justify-end gap-[40px]">
          <h1 className="text-[35px] text-white font-bold">OĞLANLAR ÜÇÜN</h1>
          <div className="bg-white cursor-pointer w-[115px] h-[60px] flex justify-center items-center font-bold text-[#131E38]">
            İNDİ AL
          </div>
        </div>
      </NavLink>
      <NavLink to="/gender-category-page">
        <div
        onClick={() => {
            handleClick("4");
          }}
        className="hover:cursor-pointer pl-[70px] pb-[80px] h-[650px] w-[540px] bg-no-repeat bg-[url('https://mybrands.az/fit650x650/center/pages/45/2022.03.09_g.png')] flex flex-col justify-end gap-[40px]">
          <h1 className="text-[35px] text-white font-bold">QIZLAR ÜÇÜN</h1>
          <div className="bg-white cursor-pointer w-[115px] h-[60px] flex justify-center items-center font-bold text-[#131E38]">
            İNDİ AL
          </div>
        </div>
      </NavLink>
    </div>
  );
}
