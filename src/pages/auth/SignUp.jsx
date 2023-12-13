import React, { useState } from "react";
import { Link } from "react-router-dom";
import RotatingContainer from "../../components/RotatingContainer";

const SignUp = () => {
  const [rotate, setRotate] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userType, setUserType] = useState("NORMAL_USER"); // Default to NORMAL_USER
  const [error, setError] = useState("");

  const toggleRotation = () => {
    setRotate(!rotate);
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/ecommerce/rest/auth/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
          confirmPassword,
          userType,
        }),
      });

      if (response.ok) {
        // Registration successful, you may want to redirect the user or show a success message
        console.log("Registration successful");
      } else {
        // Registration failed, handle the error (show an error message, etc.)
        const data = await response.json();
        setError(data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setError("An error occurred during registration");
    }
  };

  return (
    <RotatingContainer rotate={rotate}>
      <div className="absolute inset-0 bg-opacity-50 backdrop-filter backdrop-blur-[2px] flex items-center justify-center">
        <div className="container bg-white p-8 rounded-md w-full md:w-1/2 lg:w-1/3 sm:w-2/3">
          <h2 className="text-4xl font-bold mb-4 text-[var(--primary-blue)] text-[30px] text-center mt-[5px]">
            Welcome to{" "}
            <span className="text-[var(--primary-pink)]">
              <span className="text-[50px]">C</span>ool
            </span>
            <span className="text-4xl">
              <span className="text-[50px]">S</span>tuff
            </span>
          </h2>
          <h3 className="text-gray-500 mb-6 text-center text-[17px] font-bold">
            Please SignUp
          </h3>
          <form onSubmit={handleSignup}>
            <label htmlFor="username" className="text-sm">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="kwach"
              required
              className="input border-t-2 border-l-2 border-r border-b border-gray-500 focus:border-[var(--primary-blue)] rounded-md w-full px-4 py-2"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <label htmlFor="email" className="text-sm mt-4">
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="kwach@test.com"
              required
              className="input border-t-2 border-l-2 border-r border-b border-gray-500 focus:border-[var(--primary-blue)] rounded-md w-full px-4 py-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor="password" className="text-sm mt-4">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="  *****"
              required
              className="input border-t-2 border-l-2 border-r border-b border-gray-500 focus:border-[var(--primary-blue)] rounded-md w-full px-4 py-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <label htmlFor="confirmPassword" className="text-sm mt-4">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="  *****"
              required
              className="input border-t-2 border-l-2 border-r border-b border-gray-500 focus:border-[var(--primary-blue)] rounded-md w-full px-4 py-2"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <div className="text-left flex justify-between mt-4">
              <div className="flex">
                <label htmlFor="adminRadio">ADMIN</label>
                <input
                  type="radio"
                  id="adminRadio"
                  name="userType"
                  value="ADMIN"
                  required
                  checked={userType === "ADMIN"}
                  onChange={() => setUserType("ADMIN")}
                />
              </div>
              <div className="flex">
                <label htmlFor="normalUserRadio">NORMAL USER</label>
                <input
                  type="radio"
                  id="normalUserRadio"
                  name="userType"
                  value="NORMAL_USER"
                  required
                  checked={userType === "NORMAL_USER"}
                  onChange={() => setUserType("NORMAL_USER")}
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-4 bg-[var(--primary-blue)] text-white py-3 px-4 border-none cursor-pointer rounded-md text-base hover:bg-[var(--primary-pink)]"
            >
              Signup
            </button>
            {error && <p className="text-red-500 text-center mt-4">{error}</p>}
            <h5 className="mt-4 text-center">
              <span className="mt-4 text-gray-500 text-center">
                Already have an account?
              </span>{" "}
              <Link
                to="/"
                onClick={toggleRotation}
                className="text-[var(--primary-blue)] cursor-pointer"
              >
                Signin
              </Link>
            </h5>
          </form>
        </div>
      </div>
    </RotatingContainer>
  );
};

export default SignUp;
