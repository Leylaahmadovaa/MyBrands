import { Carousel } from "antd";
import Trend from "../components/Trend";
import { Banners } from "../store/ContextApi";
import { useContext } from "react";
export default function GenderCategoryPage() {
  const { banners, setBanners } = useContext(Banners);

  return (
    <>
      <div className="ml-[90px]">
        <Carousel
          className="w-[1350px]"
          draggable={true}
          arrows={true}
          infinite={true}
        >
        {banners && banners.length > 0 && banners.map((element) => {
              return (
                <div key={element.id}>
                  <img
                    src={element.cover_photo_az}
                    className="w-[1350px] h-[615px]"
                    alt="banner"
                  />
                </div>
              );
            })}
          </Carousel>
      </div>
      <div className="pl-[90px] mt-[50px]">
        <h2 className="text-[27px] font-bold">HAZIRDA TREND</h2>
        <div className="mt-[30px]">
          <div className="grid grid-cols-6 gap-5 place-content-center w-[95%] ">
            <Trend/>
          </div>
        </div>
      </div>
    </>
  );
}
