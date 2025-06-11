import React, { useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import gsap from "gsap";
import toast, { Toaster } from "react-hot-toast";

import Typewriter from "typewriter-effect";

export default function Home() {
  const titleRef = useRef();
  const taglineRef = useRef();
  const buttonsRef = useRef();
  const descRef = useRef();
  const viewRef = useRef();

  const navigate = useNavigate();

  useEffect(() => {
    // GSAP animations
    gsap.fromTo(
      titleRef.current,
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    );

    gsap.fromTo(
      taglineRef.current,
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, delay: 0.5, duration: 1, ease: "power3.out" }
    );

    gsap.fromTo(
      buttonsRef.current,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, delay: 1, duration: 0.8, ease: "back.out(1.7)" }
    );

    gsap.fromTo(
      descRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, delay: 1.5, duration: 1 }
    );

    gsap.fromTo(
      viewRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, delay: 2, duration: 1 }
    );

    // Matrix rain background
    const canvas = document.getElementById("matrixCanvas");
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const letters = "FLUX";
    const fontSize = 18;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#0f0";
      ctx.font = fontSize + "px monospace";

      for (let i = 0; i < drops.length; i++) {
        const text = letters[Math.floor(Math.random() * letters.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.995) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33);

    const resizeHandler = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resizeHandler);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  const handleViewChallenges = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      navigate("/challenge1");
    } else {
      toast.error("Please login to access challenges.");
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono flex flex-col items-center justify-center px-4 relative overflow-hidden">
     <Toaster position="top-center" reverseOrder={false} /> {/* ✅ Add this line */}

      {/* Matrix Rain Canvas */}
      <canvas id="matrixCanvas" className="absolute top-0 left-0 w-full h-full z-0" />

      {/* Title */}
      <h1
        ref={titleRef}
        className="text-7xl md:text-7xl font-bold text-green-400 drop-shadow-lg text-center tracking-widest z-10"
      >
        CAPTURE <br /> THE FLAG
      </h1>

      {/* Tagline with Typewriter */}
      <div
        ref={taglineRef}
        className="text-lg md:text-xl text-green-400 mt-4 text-center z-10 h-12"
      >
        <Typewriter
          options={{
            strings: ["Hack the Code.", "Capture the Flag.", "Claim the Glory."],
            autoStart: true,
            loop: true,
            delay: 50,
            deleteSpeed: 30,
          }}
        />
      </div>

      {/* Top Buttons */}
      <div ref={buttonsRef} className="flex gap-4 mt-8 z-10">
        <Link to="/endgame">
          <button className="px-6 py-3 border-2 border-green-400 text-green-400 hover:bg-green-600/20 transition-all rounded shadow-md">
            KNOW CTF
          </button>
        </Link>
        <button className="px-6 py-3 border-2 border-red-400 text-red-400 hover:bg-red-600/20 transition-all rounded shadow-md">
          LEADERBOARD
        </button>
      </div>

      {/* Description */}
      <div ref={descRef} className="max-w-2xl mt-8 text-center text-green-300 z-10">
        <p>
          Welcome to the ultimate web hacking battleground. Solve challenges,
          test your skills, and race your way up the leaderboard. Ready to
          breach the system?
        </p>
      </div>
      <div ref={viewRef} className="mt-10 z-10 flex justify-center gap-6">
  {/* Round 1 → Challenge Page */}
  <button
    onClick={() => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        navigate("/challenge1");
      } else {
        toast.error("Please login to access Round 1.");
        navigate("/login");
      }
    }}
    className="px-6 py-3 bg-gradient-to-r from-green-400 to-green-600 text-white font-semibold rounded-xl shadow-md hover:from-green-500 hover:to-green-700 transition-transform transform hover:scale-105"
  >
    Round-1
  </button>

  {/* Round 2 → Games Page */}
  <button
    onClick={() => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        navigate("/games");
      } else {
        toast.error("Please login to access Round 2.");
        navigate("/login");
      }
    }}
    className=" px-6 py-3 bg-gradient-to-r from-blue-400 to-purple-600 text-white font-semibold rounded-xl shadow-md hover:from-purple-500 hover:to-pink-500 transition-transform transform hover:scale-105"
  >
    Round-2
  </button>

  {/* Round 3 → (Placeholder or another route) */}
  <button
    onClick={() => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        navigate("/round3");
      } else {
        toast.error("Please login to access Round 3.");
        navigate("/login");
      }
    }}
    className="px-6 py-3 bg-gradient-to-r from-red-400 to-yellow-500 text-white font-semibold rounded-xl shadow-md hover:from-yellow-400 hover:to-red-600 transition-transform transform hover:scale-105"
  >
    Round-3
  </button>
</div>

    </div>

  
  );
}
