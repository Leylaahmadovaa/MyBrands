export default function Footer() {
  return (
    <>
      <div className="bg-[#212D4A] text-white flex h-[210px] flex-col text-[25px] justify-center gap-3">
        <div className="font-semibold pl-[200px]">BİZİ İZLƏMƏYİ UNUTMAYIN</div>
        <div className="flex justify-between px-[200px]">
          <div className="text-gray-300 text-[15px] w-[500px]">
            Bizim müştərilər qrupuna qoşulun. Yeni məhsullar və aksiyalardan ilk
            xəbərdar olun.
          </div>
          <div className="flex items-center transform translate-y-[-15px]">
            <div className="text-gray-300 text-[15px]">Bizi izləyin</div>
            <p className="transform translate-y-[-12px] mx-5 ">__</p>
            <div className="flex items-center gap-9">
              <img
                className="w-2 hover:cursor-pointer"
                src="https://mybrands.az/img/facebook_white_icon.svg"
                alt="facebook"
              />
              <img
                className="w-5 hover:cursor-pointer"
                src="https://mybrands.az/img/instagram_white_icon.svg"
                alt="instagram"
              />
              <img
                className="w-5 hover:cursor-pointer"
                src="https://mybrands.az/img/linkedin_white_icon.svg"
                alt="linkedin"
              />
              <img
                className="w-5 hover:cursor-pointer"
                src="https://mybrands.az/img/youtube_white_icon.svg"
                alt="youtube"
              />
              <img
                className="w-5 hover:cursor-pointer"
                src="https://mybrands.az/img/tiktok_white_icon.svg"
                alt="tiktok"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-around mt-[70px]">
        <div>
          <h2 className="font-bold mb-7">ŞİRKƏT</h2>
          <div className="text-gray-500">
            <p className="hover:cursor-pointer hover:underline">Haqqımızda</p>
          </div>
        </div>
        <div>
          <h2 className="font-bold mb-7">MÜŞTƏRİLƏR</h2>
          <div className="text-gray-500 flex flex-col gap-2">
            <p className="hover:cursor-pointer hover:underline">
              Ödəniş və Çatdırılma
            </p>
            <p className="hover:cursor-pointer hover:underline">
              Qaytarılma siyasəti
            </p>
            <p className="hover:cursor-pointer hover:underline">
              Müştəri xidmətləri
            </p>
          </div>
        </div>
        <div>
          <h2 className="font-bold mb-7">MAĞAZA</h2>
          <div className="text-gray-500 flex flex-col gap-2">
            <p className="hover:cursor-pointer hover:underline">Qadınlar</p>
            <p className="hover:cursor-pointer hover:underline">Kişilər</p>
            <p className="hover:cursor-pointer hover:underline">Uşaqlar</p>
            <p className="hover:cursor-pointer hover:underline">Endirim</p>
          </div>
        </div>
        <div>
          <h2 className="font-bold mb-7">HESAB</h2>
          <div className="text-gray-500 flex flex-col gap-2">
            <p className="hover:cursor-pointer hover:underline">Qeydiyyat</p>
            <p className="hover:cursor-pointer hover:underline">Sifarişlərim</p>
          </div>
        </div>
        <div>
          <div className="flex mb-8 gap-3">
            <img
              src="https://mybrands.az/img/letter_black_icon.svg"
              alt="mail"
            />
            <p className="font-semibold hover:cursor-pointer hover:underline">
              help@mybrands.az
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-lg hover:cursor-pointer hover:underline">
              +994504114114
            </p>
            <p className="text-gray-500 text-[14px] mb-8">Online mağaza</p>
          </div>
          <p className="text-gray-500 text-[12px] w-[380px]">
            Müştəri xidmətləri mərkəzimizlə hər gün 09:00 - 18:00-dək əlaqə
            saxlaya bilərsiniz.
          </p>
        </div>
      </div>
      <div className="flex gap-6 pl-[100px] pt-[50px] pb-[40px]">
        <div className="bg-gray-200 hover:bg-gray-300 w-[150px] flex gap-3 rounded-sm px-3 py-2 hover:cursor-pointer">
          <img src="https://mybrands.az/img/apple_black_icon.svg" alt="app" />
          <div>
            <p className="text-[10px] mb-[-5px]">Download on</p>
            <p className="font-[700] text-sm">App Store</p>
          </div>
        </div>

        <div className="bg-gray-200 hover:bg-gray-300 w-[150px] flex gap-3 rounded-sm px-3 py-2 hover:cursor-pointer">
          <img
            src="https://mybrands.az/img/googleplay_black_icon.svg"
            alt="app"
          />
          <div>
            <p className="text-[10px] mb-[-5px]">Download on</p>
            <p className="font-[700] text-sm">Google Play</p>
          </div>
        </div>
      </div>
      <hr />
      <div className="flex justify-between px-[100px] py-[20px]">
        <p className="text-[12px]">© MYBRANDS - BÜTÜN HÜQUQLAR QORUNUR</p>
        <div className="flex text-[12px] gap-5">
          <p className="hover:cursor-pointer hover:underline">
            Məxfilik Siyasəti
          </p>
          <p className="hover:cursor-pointer hover:underline">
            İstifadənin ümumi müddəaları və şərtləri
          </p>
        </div>
      </div>
    </>
  );
}
