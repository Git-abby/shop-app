import React from "react";
import { Route, Routes } from "react-router-dom";
import Signin from "./components/Authentication/Signin";
import Products from "./components/Products/Products";
import Header from "./components/Header/Header";
import Signup from "./components/Authentication/Signup";

const App = () => {
  return (
    <div className="min-w-full min-h-[100vh] flex flex-col items-center justify-center bg-gradient-to-br from-[#2F4858] to-[#33658A] border">
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/products"
          element={
            <>
              <Header /> <Products /> 
            </>
          }
        />
        <Route path="/" element={<Signin />} />
      </Routes>
    </div>
  );
};

export default App;
