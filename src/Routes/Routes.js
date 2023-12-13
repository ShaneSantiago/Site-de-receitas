import React from "react";
import Login from "../Pages/Login/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Feed from "../Pages/Home/Feed";
import Details from "../Pages/Home/Details";

const Routers = () => {
  return (
    <Router>
      <Routes>
        {/* Outras rotas podem vir aqui */}
        <Route path="/" element={<Login />}></Route>
        <Route path="/feed" element={<Feed />}></Route>
        <Route path="/details/:id" element={<Details />}></Route>
      </Routes>
    </Router>
  );
};

export default Routers;
