import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { authAction } from "../store/auth";
import Cookies from "universal-cookie";
export default function LoginPage() {
  const isLogged = useSelector((state) => state.auth.isLogged);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const cookies = new Cookies();

  useEffect(() => {
      const token = cookies.get("JWT_token");
      if (token && !isLogged) {
        dispatch(authAction.login({ access: token, refresh: "" }));
      }
    }, [isLogged, dispatch, cookies]);

  const login = async () => {
    const response = await fetch("https://test.mybrands.az/api/v1/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    }).then((res) => res.json());
    let date = new Date();
    date.setFullYear(2025);
    if (response.access) {
      cookies.set("JWT_token", response.access, { expires: date });
      dispatch(
        authAction.login({ access: response.access, refresh: response.refresh })
      );
      navigate("/");
    }
  };
  const logout = () => {
    cookies.remove("JWT_token");
    dispatch(authAction.logout());
  };
  function handleChangeEmail(event) {
    setEmail(event.target.value);
  }
  function handleChangePassword(event) {
    setPassword(event.target.value);
  }
  return (
    <div className="flex justify-center w-full h-[950px] bg-gray-200 p-[50px]">
      <div className="w-[50%] bg-white">
        <div className="flex border-b-4 h-[90px]">
          <div className="hover:cursor-pointer bg-blue-950 text-white w-[50%] flex justify-center items-center text-[20px] font-semibold">
            DAXIL OLUN
          </div>
          <div className="hover:cursor-pointer flex justify-center items-center w-[50%] text-[20px] font-semibold">
            QEYDIYYATDAN KEÇİN
          </div>
        </div>
        <div className="flex flex-col justify-center items-center pt-[60px] gap-10">
          <h1 className="font-bold text-[24px]">E-MAIL ILƏ DAXİL OLUN</h1>
          <form className="flex flex-col self-start ml-[100px] gap-3">
            <label htmlFor="mail" className="text-gray-500">
              E-mail ünvanı
            </label>
            <input
              value={email}
              onChange={handleChangeEmail}
              type="email"
              placeholder="E-mail"
              className="border-[1px] w-[500px] h-[50px] border-gray-500 pl-5"
            />
            <label htmlFor="password" className="text-gray-500">
              Şifrə
            </label>
            <input
              value={password}
              onChange={handleChangePassword}
              type="password"
              placeholder="Şifrə"
              className="border-[1px] w-[500px] h-[50px] border-gray-500 pl-5"
            />
            <button
              type="button"
              onClick={isLogged ? logout : login}
              className="w-full bg-blue-950 text-white h-[60px] text-[22px] mt-[9px]"
            >
              {isLogged ? "Logout" : "DAXIL OLUN"}
            </button>
          </form>
          <p className="hover:cursor-pointer hover:underline">
            Şifrənizi unutmusunuz?
          </p>
          <div className="flex w-[80%] items-center gap-3">
            <div className="border-t-[1px] border-gray-400 w-[50%]"></div>
            <p className="font-bold text-[20px] w-[20%] text-center">VƏ YA</p>
            <div className="border-t-[1px] border-gray-400 w-[50%]"></div>
          </div>
          <p className="font-bold text-[24px]">DAXIL OLUN</p>
          <div className="flex gap-3 w-full px-[60px] items-center justify-center">
            <div className="hover:cursor-pointer hover:border-[1px] hover:border-black transition-all duration-500 flex border-[1px] border-gray-400 w-[50%] items-center justify-center h-[60px] gap-3">
              <img
                src="https://mybrands.az/img/google_colored_icon.svg"
                alt="google"
              />
              <span>Google</span>
            </div>
            <div className="hover:cursor-pointer hover:border-[1px] hover:border-black transition-all duration-500 flex border-[1px] border-gray-400 w-[50%] items-center justify-center h-[60px] gap-3">
              <img
                src="https://mybrands.az/img/facebook_colored_icon.svg"
                alt="facebook"
              />
              <span>Facebook</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
