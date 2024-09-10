import React from "react";
import { Route, Routes } from "react-router-dom";
import Signin from "./components/Authentication/Signin";

const App = () => {
  return (
    <div className="container my-4">
      <Routes>
        <Route path="/signin" element={<Signin />} />
        <Route path="/" element={<Signin />} />
      </Routes>
    </div>
  );
};

export default App;
