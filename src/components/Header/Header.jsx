import React, { useEffect, useState } from "react";
// import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { doSignOut } from "../../firebase/auth";
import logo from "../../assets/logo.png";
function Header({ email }) {
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = location.state?.user;
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
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }
  console.log(isMenuOpen);
  return (
    <>
      <nav class="w-full bg-white border-gray-200 dark:bg-gray-900">
        <div class="w-full flex flex-wrap justify-between items-center max-w-screen-xl p-4">
          <a
            href="https://flowbite.com"
            class=" align-center flex items-center justify-center space-x-3 rtl:space-x-reverse">
            <img src={logo} class="h-10" alt="Amiri Logo" />
            <span class="self-center text-3xl font-semibold whitespace-nowrap dark:text-white pb-2">
              Amiri
            </span>
          </a>
          {/* if user is there display email and logout btn */}
          <div class="flex items-center space-x-6 rtl:space-x-reverse">
            {user && user ? (
              <>
                <a
                  href="#"
                  //   href="tel:5541251234"
                  class="text-sm  text-gray-500 dark:text-white hover:underline">
                  {user}
                </a>
                <a
                  onClick={handleSignOut}
                  class="text-sm  text-blue-600 dark:text-blue-500 hover:underline">
                  Sign out
                </a>
              </>
            ) : (
              <>
                <a
                  href="#"
                  class="text-sm  text-blue-600 dark:text-blue-500 hover:underline">
                  Signin
                </a>
                <a
                  href="#"
                  class="text-sm  text-blue-600 dark:text-blue-500 hover:underline">
                  Sign up
                </a>
              </>
            )}
          </div>
        </div>
      </nav>
      <nav class="w-full bg-gray-300 dark:bg-gray-700">
        <div class="max-w-screen-xl py-3">
          <div class="flex items-center">
            <ul class="flex flex-row items-center justify-center font-medium space-x-8 rtl:space-x-reverse text-sm mt-0 mb-0">
              <li>
                <a
                  href="#"
                  class="text-gray-900 dark:text-white hover:underline"
                  aria-current="page">
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="text-gray-900 dark:text-white hover:underline">
                  Company
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="text-gray-900 dark:text-white hover:underline">
                  Team
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="text-gray-900 dark:text-white hover:underline">
                  Features
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
