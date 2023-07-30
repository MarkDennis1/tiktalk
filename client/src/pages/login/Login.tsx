import { useState, useEffect, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../../hooks/useLogin";
import { useAuthContext } from "../../hooks/useAuthContext";
import logo from "../../assets/logo.png";
import loginPic from "../../assets/login_pic.jpg";
import PasswordNotVisibleIcon from "../../components/icons/PasswordNotVisibleIcon";
import PasswordVisibleIcon from "../../components/icons/PasswordVisibleIcon";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayPassword, setDisplayPassword] = useState(false);
  const { login, loading, error } = useLogin();
  const navigate = useNavigate();
  const { user } = useAuthContext();

  useEffect(() => {
    if (user) navigate("/");
  }, [user]);

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await login(email, password);
  };

  return (
    <div>
      <img
        className="fixed top-16 left-16 h-16"
        src={logo}
        alt="tiktalk_logo"
      />
      <div className="h-screen w-screen mx-auto flex">
        <div className="hidden w-2/3 h-full lg:flex justify-center items-center">
          <img className="h-full object-cover" src={loginPic} alt="login_pic" />
        </div>
        <div className="w-full lg:w-1/3 flex flex-col items-center justify-center relative text-gray-600 px-16">
          <p className="absolute bottom-16 font-semibold">
            By{" "}
            <a
              className="hover:underline"
              href="https://markdennis.netlify.app"
              target="_blank"
            >
              <span className="text-red-500">Mark</span>
              <span className="text-black">Dennis</span>
            </a>
          </p>
          <form className="flex flex-col gap-6 w-full" onSubmit={handleLogin}>
            <h3 className="text-4xl font-bold">Login</h3>
            <div className="w-full">
              <label className="block" htmlFor="email">
                Email
              </label>
              <input
                required
                id="email"
                className="w-full px-4 py-2 rounded-lg bg-gray-200 outline-none focus:ring-1 ring-blue-500"
                type="email"
                placeholder="johndoe@gmail.com"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="w-full relative">
              <label className="block" htmlFor="password">
                Password
              </label>
              <input
                required
                id="password"
                className="w-full px-4 py-2 rounded-lg bg-gray-200 outline-none focus:ring-1 ring-blue-500"
                type={!displayPassword ? "password" : "text"}
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <div
                className="absolute right-4 top-8 cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  setDisplayPassword(!displayPassword);
                }}
              >
                {!displayPassword ? (
                  <PasswordNotVisibleIcon />
                ) : (
                  <PasswordVisibleIcon />
                )}
              </div>
            </div>
            <button
              className={`w-full text-white py-2 rounded-lg ${
                !loading ? "bg-blue-600 hover:bg-blue-500" : "bg-blue-300"
              }`}
              type="submit"
              disabled={loading}
            >
              {!loading ? "Login" : "Loading..."}
            </button>
            <p>
              Don't have an account? Register{" "}
              <Link className="hover:underline text-blue-600" to="/register">
                here
              </Link>
              .
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
