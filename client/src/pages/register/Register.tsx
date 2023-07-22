import { useState, useEffect, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useRegister } from "../../hooks/useRegister";
import logo from "../../assets/logo.png";

const Register = () => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const { register, loading, error } = useRegister();

  useEffect(() => {
    if (user) navigate("/");
  }, [user]);

  const toTitleCase = (str: string) => {
    return str.toLowerCase().replace(/(?:^|\s)\w/g, (match) => {
      return match.toUpperCase();
    });
  };

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const name = toTitleCase(`${fname} ${lname}`);
    await register(name, email, password);
  };
  return (
    <div className="h-screen w-screen grid place-items-center bg-gray-400 text-gray-700">
      <div className="h-screen md:h-auto md:w-96 bg-white p-6 rounded-xl">
        <div className="flex justify-center">
          <img className="h-16" src={logo} alt="tiktalk_logo" />
        </div>
        <p className="text-center mb-4">Create your Tiktalk account.</p>
        <hr />
        <form
          onSubmit={handleRegister}
          className="space-y-4 rounded-xl p-2 w-full"
        >
          {error && <div className="text-red-500">{error}</div>}
          <div className="w-full">
            <label htmlFor="fname">First Name</label>
            <input
              id="fname"
              className="px-4 py-2 w-full bg-gray-200 rounded-lg outline-none focus:ring-1 focus:ring-blue-500"
              type="text"
              placeholder="John"
              onChange={(e) => setFname(e.target.value)}
              required
            />
          </div>
          <div className="w-full">
            <label htmlFor="lname">Last Name</label>
            <input
              id="lname"
              className="px-4 py-2 w-full bg-gray-200 rounded-lg outline-none focus:ring-1 focus:ring-blue-500"
              type="text"
              placeholder="Doe"
              onChange={(e) => setLname(e.target.value)}
              required
            />
          </div>
          <div className="w-full">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              className="px-4 py-2 w-full bg-gray-200 rounded-lg outline-none focus:ring-1 focus:ring-blue-500"
              type="text"
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
              {!loading ? "Register" : "Loading"}
            </button>
          </div>
        </form>
        <hr />
        <div className="flex gap-1 mt-6 justify-center">
          <p>Already have an account?</p>
          <Link to="/login" className="text-blue-700 hover:underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
