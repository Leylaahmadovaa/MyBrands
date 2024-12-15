import { NavLink } from "react-router-dom";
import { Gender } from "../store/ContextApi";
import { useContext } from "react";

export default function HomePage() {
  const { gender, setGender } = useContext(Gender);
  function handleClick(genderNum) {
    localStorage.setItem("gender", JSON.stringify(genderNum));
    setGender(genderNum);
  }
  return (
    <>
      <div className="flex flex-col items-center ">
        <div className="flex justify-center gap-[25px]">
          <NavLink to="/gender-category-page">
            <div
              onClick={() => {
                handleClick("6");
              }}
              className="hover:cursor-pointer w-[400px] transition-all duration-500 h-[500px] bg-100% hover:bg-110% bg-center bg-cover bg-no-repeat bg-[url('https://mybrands.az/fit424x570/center/pages/1/web%20photo%20men.png')] flex flex-col items-center justify-end"
            >
              <h1 className="text-white font-bold text-[30px]">KİŞİLƏR</h1>
              <button className="bg-white hover:translate-y-[-5px] transition-all duration-500 w-[200px] h-[50px] font-bold mb-[50px] mt-[30px]">
                ALIŞ-VERİŞƏ KEÇ
              </button>
            </div>
          </NavLink>
          <NavLink to="/gender-category-page">
            <div
              onClick={() => {
                handleClick("3");                
              }}
              className="hover:cursor-pointer w-[400px] transition-all duration-500 h-[500px] bg-100% hover:bg-110% bg-center bg-cover bg-no-repeat bg-[url('https://mybrands.az/fit424x570/center/pages/1/web%20photo%20women%20424x570.png')] flex flex-col items-center justify-end"
            >
              <h1 className="text-white font-bold text-[30px]">QADINLAR</h1>
              <button className="bg-white hover:translate-y-[-5px] transition-all duration-500 w-[200px] h-[50px] font-bold mb-[50px] mt-[30px]">
                ALIŞ-VERİŞƏ KEÇ
              </button>
            </div>
          </NavLink>
          <NavLink to="/usaqlar">
            <div className="hover:cursor-pointer w-[400px] transition-all duration-500 h-[500px] bg-100% hover:bg-110% bg-center bg-cover bg-no-repeat bg-[url('https://mybrands.az/fit424x570/center/pages/1/web%20photo%20kids%20.png')] flex flex-col items-center justify-end">
              <h1 className="text-white font-bold text-[30px]">UŞAQLAR</h1>
              <button className="bg-white  hover:translate-y-[-5px] transition-all duration-500 w-[200px] h-[50px] font-bold mb-[50px] mt-[30px]">
                ALIŞ-VERİŞƏ KEÇ
              </button>
            </div>
          </NavLink>
        </div>
        <div className="flex justify-between items-center bg-[#F4F4F4] w-[80%] h-[150px] px-[50px] py-[20px] my-[40px]">
          <div className="flex gap-[20px] w-[300px] items-center h-[50px]">
            <img
              src="https://mybrands.az/storage/pages/1/c6e60175-5a97-4824-81ca-02ac131971a4.svg"
              alt="icon"
            />
            <p className="font-semibold">Tez və təhlükəsiz çatdırılma</p>
          </div>
          <div className="flex gap-[20px] items-center h-[50px] ">
            <img
              src="https://mybrands.az/storage/pages/1/c7282b40-2845-4a3d-b9b6-7f6335f88dbe.svg"
              alt="icon"
            />
            <p className="w-[200px] font-semibold">
              Asan geri qaytarılma, zəmanətli və təhlükəsiz ödəniş
            </p>
          </div>
          <div className="flex items-center h-[50px] gap-[20px]">
            <img
              src="https://mybrands.az/storage/pages/1/a3cffbc3-6bce-44bb-b126-924b42d3c29b.svg"
              alt="icon"
            />
            <p className="w-[200px] font-semibold">
              Tamamilə zəmanətli satış və xidmət
            </p>
          </div>
          <div className="flex items-center h-[50px] gap-[20px]">
            <img
              src="https://mybrands.az/storage/pages/1/575fb30c-d159-42a8-b656-b867d1df2b8b.svg"
              alt="icon"
            />
            <p className="w-[200px] font-semibold">
              Geniş çeşiddə yüksək keyfiyyətli məhsullar
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
