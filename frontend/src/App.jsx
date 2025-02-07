import React, { Profiler } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Profile from "./pages/profile";

// import './App.css'

function App() {

  return (
    <>
    <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} /> 
      <Route path="/Profile" element={<Profile />} />
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  </Router>

    </>
  )
}

export default App
