import "./App.css";
import React, { useEffect, useState } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import Apod from "./components/Apod";
import Random from "./components/Random";

const App = () => {
  const KEY = "cvlrxxc5Us9XwG6RByBvVQyh83vXczvrINBuAdi9";

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Apod KEY={KEY} />} />
        <Route path="/random" element={<Random KEY={KEY} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
