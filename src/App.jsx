import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";
import Challenge1 from "./Challenge1";
import Challenge2 from "./Challenge2";
import Challenge3 from "./Challenge3";
import Endgame from "./Endgame";
import Navbar from "./Navbar";

function App() {
  const [score, setScore] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey) {
        if (e.key === "a" || e.key === "A") {
          e.preventDefault();
          alert("Ctrl + A is disabled!");
        }
        if (e.key === "f" || e.key === "F") {
          e.preventDefault();
          alert("Ctrl + F is disabled!");
        }
         if (e.key === "c" || e.key === "c") {
          e.preventDefault();
          alert("Ctrl + C is disabled!");
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Cleanup on unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <Router>
      <Navbar score={score} setScore={setScore} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/challenge1" element={<Challenge1 setScore={setScore} />} />
        <Route path="/challenge2" element={<Challenge2 setScore={setScore} />} />
        <Route path="/challenge3" element={<Challenge3 setScore={setScore} />} />
        <Route path="/endgame" element={<Endgame setScore={setScore} />} />
      </Routes>
    </Router>
  );
}

export default App;
