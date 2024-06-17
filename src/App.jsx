import './App.css'
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Navbar from "./routes/Navbar";
import Articles from "./routes/Articles"


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/articles" element={<Articles/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
