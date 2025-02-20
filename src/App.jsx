
import { useState } from 'react';
import './App.css'
import Query from './components/Query/Query';
import { Routes, Route } from "react-router-dom";
import QueryDetails from './components/QueryDetails/QueryDetails';
import VerifyToken from './components/VerifyToken/VerifyToken';
import QueryDescription from './components/QueryDescription/QueryDescription';

function App() {

  return (
    <>
    <Routes>
    <Route path="/" element={<Query/>}></Route>
    <Route path="/verify" element={<VerifyToken/>}></Route>
    <Route path="/details" element={<QueryDetails/>}></Route>
    <Route path="/description" element={<QueryDescription/>}></Route>

    </Routes>
     
    </>
  )
}

export default App
