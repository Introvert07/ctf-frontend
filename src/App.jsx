import React, { useState } from "react";
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
