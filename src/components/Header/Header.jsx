import React, { useEffect, useState } from "react";
// import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import { useLocation, useNavigate } from "react-router-dom";
import { doSignOut } from "../../firebase/auth";
import logo from "../../assets/logo.png";
function Header({ email }) {
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const user = location.state?.user;
  // console.log(user)
  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  }, [loading]);

  const navigate = useNavigate();
  const handleSignOut = async () => {
    try {
      await doSignOut();
      setLoading(true);
      localStorage.removeItem("user");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const onClickLogo = (e) => {
    e.preventDefault();
    navigate("/products", { state: { user } });
  }
  if (loading) {
    return <h1>Loading...</h1>;
  }
  // console.log(isMenuOpen);
  return (
    <>
      <nav className="w-full bg-white border-gray-200 dark:bg-gray-900">
        <div className="w-full flex flex-wrap justify-between items-center max-w-screen-xl p-4">
          <button
            onClick={onClickLogo}
            className=" align-center flex items-center justify-center space-x-3 rtl:space-x-reverse">
            <img src={logo} className="h-10" alt="Amiri Logo" />
            <span className="self-center text-3xl font-semibold whitespace-nowrap dark:text-white pb-2">
              Amiri
            </span>
          </button>
          {/* if user is there display email and logout btn */}
          <div className="flex items-center space-x-6 rtl:space-x-reverse">
            {user && user ? (
              <>
                <span
                  className="text-sm  text-gray-500 dark:text-white hover:underline">
                  {user}
                </span>
                <button
                  onClick={handleSignOut}
                  className="text-sm  text-blue-600 dark:text-blue-500 hover:underline">
                  Sign out
                </button>
              </>
            ) : (
              <>
                <a
                  href="/"
                  className="text-sm  text-blue-600 dark:text-blue-500 hover:underline">
                  Signin
                </a>
                <a
                  href="/signup"
                  className="text-sm  text-blue-600 dark:text-blue-500 hover:underline">
                  Sign up
                </a>
              </>
            )}
          </div>
        </div>
      </nav>
      <nav className="w-full bg-gray-300 dark:bg-gray-700">
        <div className="max-w-screen-xl py-3">
          <div className="flex items-center">
            <ul className="flex flex-row items-center justify-center font-medium space-x-8 rtl:space-x-reverse text-sm mt-0 mb-0">
              <li>
                <a
                  href="/products"
                  className="text-gray-900 dark:text-white hover:underline"
                  aria-current="page">
                  Home
                </a>
              </li>
              <li>
                <a
                  href="mailto:malekabrar56@gmail.com"
                  className="text-gray-900 dark:text-white hover:underline">
                  E-mail
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Git-abby"
                  className="text-gray-900 dark:text-white hover:underline">
                  GitHub
                </a>
              </li>
              {user &&               <li>
                <a
                  href="/products"
                  className="text-gray-900 dark:text-white hover:underline">
                  Products
                </a>
              </li>}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
