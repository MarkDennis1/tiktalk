import { useState, useEffect, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../../hooks/useLogin";
import { useAuthContext } from "../../hooks/useAuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
    <div className="h-screen w-screen grid place-items-center bg-gray-400 text-gray-700">
      <div className="h-screen md:h-auto md:w-96 bg-white p-6 rounded-xl">
        <h2 className="text-2xl text-center mb-4 font-bold">TIKTALK</h2>
        <p className="text-center mb-4">
          Experience the power of conversations that bring people closer.
        </p>
        <hr />
        <form
          onSubmit={handleLogin}
          className="space-y-4 rounded-xl p-2 w-full"
        >
          {error && <div className="text-red-500">{error}</div>}
          <div className="w-full">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              className="px-4 py-2 w-full bg-gray-200 rounded-lg outline-none focus:ring-1 focus:ring-blue-500"
              type="email"
              placeholder="johndoe@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="w-full">
            <label htmlFor="password">Password</label>

            <input
              id="password"
              className="px-4 py-2 w-full bg-gray-200 rounded-lg outline-none focus:ring-1 focus:ring-blue-500"
              type="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="w-full flex justify-between items-center">
            <button
              className="w-full bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded-lg"
              type="submit"
              disabled={loading}
            >
              {!loading ? "Login" : "Loading"}
            </button>
          </div>
        </form>
        <hr />
        <div className="flex gap-1 mt-6 justify-center">
          <p>Don't have an account?</p>
          <Link to="/register" className="text-blue-700 hover:underline">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
