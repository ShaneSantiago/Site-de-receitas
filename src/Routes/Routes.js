import React from "react";
import Login from "../Pages/Login/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Feed from "../Pages/Home/Feed";
import Details from "../Pages/Home/Details";
import Header from "../Components/Headers/Headers";
import Signup from "../Pages/Signup/Signup";

const Routers = () => {
  return (
    <Router>
      <Header />
      <Routes>
        {/* Outras rotas podem vir aqui */}
        <Route path="/" element={<Login />}></Route>
        <Route path="/feed" element={<Feed />}></Route>
        <Route path="/details/:id" element={<Details />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
      </Routes>
    </Router>
  );
};

export default Routers;
