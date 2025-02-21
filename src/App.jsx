import { useState } from "react";
import "./App.css";
import Query from "./components/Query/Query";
import { Routes, Route } from "react-router-dom";
import QueryDetails from "./components/QueryDetails/QueryDetails";
import VerifyToken from "./components/VerifyToken/VerifyToken";
import QueryDescription from "./components/QueryDescription/QueryDescription";
import SignInCard from "./components/admin/SignUp";

import Login from "./components/admin/Login";

function App() {
  return (
    <>
      <Routes>
      <Route path="/signup" element={<SignInCard />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/" element={<Login />}></Route>
        <Route path="/query" element={<Query />}></Route>
        <Route path="/verify" element={<VerifyToken />}></Route>
        <Route path="/details" element={<QueryDetails />}></Route>
        <Route path="/description" element={<QueryDescription />}></Route>

      </Routes>
    </>
  );
}

export default App;
