import './App.css'
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./routes/Home";
import Navbar from "./routes/Navbar";
import Articles from "./routes/Articles"
import Article from "./routes/Article"


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/article/:article_id" element={<Article />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
