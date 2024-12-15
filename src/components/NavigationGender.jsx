import { NavLink, useLocation } from "react-router-dom";
import { Gender } from "../store/ContextApi";
import { useContext } from "react";
export default function NavigationGender() {
  const { gender, setGender } = useContext(Gender);
  const location = useLocation();

  function handleClick(genderNum) {
    localStorage.setItem("gender", JSON.stringify(genderNum));
    setGender(genderNum);
  }

  return (
    <>
      <div className="absolute flex  gap-3 w-[40%] left-[400px] top-[70px] text-[18px] ">
        <NavLink to="/gender-category-page">
          <button 
          onClick={() => {
            handleClick("6");
          }}
          style={{color:gender=="6"&&location.pathname!="/usaqlar"?"black":"#B3B3B3"}}
          className="no-underline hover:underline ">Kişilər</button>
        </NavLink>
        <NavLink
        onClick={() => {
          handleClick("3");
        }}
        style={{color:gender=="3"&&location.pathname!="/usaqlar"?"black":"#B3B3B3"}}
        to="/gender-category-page">
          <button className="no-underline  hover:underline  border-x-2 px-[15px]">
            Qadınlar
          </button>
        </NavLink>
        <NavLink to="/usaqlar">
          <button
          style={{color:gender=="2"||gender=="4"||location.pathname=="/usaqlar"?"black":"#B3B3B3"}}
          className="no-underline hover:underline">Uşaqlar</button>
        </NavLink>
      </div>
    </>
  );
}
