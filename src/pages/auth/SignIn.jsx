import React, {useState} from "react";
import { Link } from "react-router-dom";
import RotatingContainer from "../../components/RotatingContainer";

const SignIn = () => {
  const [rotate, setRotate] = useState(false);

  const toggleRotation = () => {
    setRotate(!rotate);
  };

  return (
    <RotatingContainer rotate={rotate}>
  
      <div className="absolute inset-0 bg-opacity-50 backdrop-filter backdrop-blur-[2px] flex items-center justify-center">
        <div className="container bg-white p-8 rounded-md w-full md:w-1/2 lg:w-1/3 sm:w-2/3">
          <h2 className="text-4xl font-bold mb-4 text-[var(--primary-blue)] text-[30px] text-center mt-[20px]">
            Welcome to{" "}
            <span className="text-[var(--primary-pink)]">
              <span className="text-[50px]">C</span>ool
            </span>
            <span className="text-4xl">
              <span className="text-[50px]">S</span>tuff
            </span>
          </h2>
          <h3 className="text-gray-500 mb-6 text-center text-[17px] font-bold">
            Please Login
          </h3>
          <form action="./login" method="post">
            <label htmlFor="username" className="text-sm block">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="kwach"
              required
              className="input border-t-2 border-l-2 border-r border-b border-gray-500 focus:border-[var(--primary-blue)] rounded-md w-full px-4 py-2"
            />

            <label htmlFor="password" className="text-sm mt-4 block">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="  *****"
              required
              className="input border-t-2 border-l-2 border-r border-b border-gray-500 focus:border-[var(--primary-blue)] rounded-md w-full px-4 py-2"
            />

            <h5 className="text-right">
              <span className="text-[var(--primary-blue)]">
                Forgot<Link to="#" className="ml-1">password?</Link>
              </span>
            </h5><br />

            <button
              type="submit"
              className="w-full mt-4 bg-[var(--primary-blue)] text-white py-3 px-4 border-none cursor-pointer rounded-md text-base hover:bg-[var(--primary-pink)]"
            >
              Login
            </button>
            <h5 className="mt-4 text-gray-500 text-center">
              Don't have an account?{" "}
              <Link to="/signup" onClick={toggleRotation} className="text-[var(--primary-blue)]">
                Signup
              </Link>
            </h5>
          </form>
        </div>
      </div>
    
      </RotatingContainer>
  );
};

export default SignIn;
