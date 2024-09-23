import React, { useState } from "react";
import { doCreateUserWithEmailAndPassword } from "../../firebase/auth";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import animationData from "../../assets/loading.json";

function Signup() {
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    username: "",
    password: "",
    reEnterPassword: "",
  });
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(0);
  const navigate = useNavigate();

  const handleChange = (e) => {
    e.preventDefault();

    const { name, value } = e.target;

    setFormValues((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };
  const { username, password, reEnterPassword } = formValues;
  //   console.log(username, password, reEnterPassword);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (username === "" || password === "" || reEnterPassword === "") {
      setStatus(400);
      setMessage("All the fileds are required!");
      return;
    }
    if (!(password === reEnterPassword)) {
      console.log("false");
      setMessage("Password does not match");
      return;
    }

    try {
      const results = await doCreateUserWithEmailAndPassword(
        username,
        password
      );
      console.log(results);
      setLoading(false);
      const user = results.user.email;
      navigate("/products", { state: { user } });

    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <>
      {loading ? (
        <div className="w-full flex items-center justify-center min-h-screen">
           <Lottie
          animationData={animationData}
          loop={true}
          className="w-32 h-32"
        />
        </div>
      ) : (
        <div className="w-full flex items-center justify-center min-h-screen">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md p-8 bg-[#223541] bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg">
            {message && (
              <div
                className={`${
                  status === 200
                    ? "bg-green-600 text-white"
                    : "bg-red-600 text-white"
                } p-2 mb-4 rounded text-center`}
                role="alert">
                {message}
              </div>
            )}
            <h1 className="text-3xl font-bold mb-6 text-[#86BBD8] text-center">
              SIGN UP
            </h1>
            <div>
              <div className="mb-4">
                <input
                  type="email"
                  className="border border-gray-400 p-3 w-full rounded-lg bg-gray-800 bg-opacity-50 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#86BBD8]"
                  name="username"
                  placeholder="name@example.com"
                  value={username}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-6">
                <input
                  type="password"
                  className="border border-gray-400 p-3 w-full rounded-lg bg-gray-800 bg-opacity-50 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#86BBD8]"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-6">
                <input
                  type="password"
                  className="border border-gray-400 p-3 w-full rounded-lg bg-gray-800 bg-opacity-50 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#86BBD8]"
                  name="reEnterPassword"
                  placeholder="Re-Password"
                  value={reEnterPassword}
                  onChange={handleChange}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#33658A] text-white py-3 rounded-lg hover:bg-[#86BBD8] transition duration-300 ease-in-out mb-4">
                Sign up
              </button>
              <a href="/">Already have an account? Sign in</a>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default Signup;
