import React, { useEffect, useState } from "react";
import {
  doSignInWithEmailAndPassword,
  doSignInWithGoogle,
} from "../../firebase/auth";
// import { auth } from "../../firebase/firebase";
import animationData from "../../assets/loading.json";
import Lottie from "lottie-react";
import { useNavigate } from "react-router-dom";

function Signin() {
  const [formValues, setFormValues] = useState({
    username: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(0);

  const [user, setUser] = useState("");

  const [loading, setLoading] = useState(false);
  const [isLoggedin, setIsLoggedin] = useState(false);

  const navigate = useNavigate();
  //lottie
  //   const defaultOptions = {
  //     loop: true,
  //     autoplay: true,
  //     animationData: animationData,
  //     rendererSettings: {
  //       preserveAspectRatio: "xMidYMid slice",
  //     },
  //   };

  const handleChange = (e) => {
    e.preventDefault();

    // if (!isLoggedin) {
    // }
    const { name, value } = e.target;
    // console.log(name, value);

    setFormValues((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });

    // console.log(formValues);
  };
  const { username, password } = formValues;

  useEffect(() => {
    console.log("UF>>", loading);
    if (loading) {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [loading]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    console.log("sub>>", loading);

    if (username === "" || password === "") {
      setStatus(404); //required para not found
      setMessage("username and password required!");
      setIsLoggedin(false);
      return;
    }
    try {
      const results = await doSignInWithEmailAndPassword(username, password);
      console.log(results.user);
      setUser(results.user);
      //   setLoading(true);
      setIsLoggedin(true);
      setMessage("Sign In Successfull");
      setStatus(200);
      console.log("Success");
      const user = results.user.email;
      navigate("/products", { state: { user } });
    } catch (error) {
      setMessage(error.message);
      setIsLoggedin(false);
      setStatus(404);
    } finally {
      setFormValues("");
      console.info("Submitted");
    }
  };
  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      const results = await doSignInWithGoogle();
      console.log(results.user.email);

      const user = results.user.email;
      navigate("/products", { state: { user } });
      console.log("To Products");
    } catch (error) {
      console.log(error.message);
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
              SIGN IN
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
              <button
                type="submit"
                className="w-full bg-[#33658A] text-white py-3 rounded-lg hover:bg-[#86BBD8] transition duration-300 ease-in-out mb-4">
                Sign in
              </button>
              <div className="flex flex-col items-center justify-center gap-y-4">
                <img
                  className="cursor-pointer"
                  onClick={handleGoogleSignIn}
                  src="https://developers.google.com/static/identity/images/branding_guideline_sample_lt_rd_lg.svg"
                  alt="google signin"
                />
                <a className="cursor-pointer" href="/signup">
                  Create an account? Sign up
                </a>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default Signin;
