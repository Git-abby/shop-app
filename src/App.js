import React from "react";
import { Route, Routes } from "react-router-dom";
import Signin from "./components/Authentication/Signin";
import Products from "./components/Products/Products";
import Header from "./components/Header/Header";
import Signup from "./components/Authentication/Signup";
import Product from "./components/Products/Product";
import NotFound from "./components/NotFound/NotFound";

const App = () => {
  // const param = useParams();
  // console.log(param.id);
  return (
    <div className="min-w-full min-h-[100vh] flex flex-col bg-gradient-to-br from-[#2F4858] to-[#33658A]">
      <Routes>
        <Route
          path="/product/:id"
          element={
            <>
              <Header />
              <Product />
            </>
          }
        />
        <Route
          path="/products"
          element={
            <>
              <Header /> <Products />
            </>
          }
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Signin />} />
        {/*Not Found*/}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
