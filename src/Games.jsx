import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { BASE_URL } from "./config";

export default function Games({ score, setScore }) {
  const titleRef = useRef();
  const descRef = useRef();
  const user = JSON.parse(localStorage.getItem("user"));
  const [flags, setFlags] = useState({});

  useEffect(() => {
    gsap.fromTo(
      titleRef.current,
      { y: -40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    );
    gsap.fromTo(
      descRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, delay: 0.5, duration: 1 }
    );
  }, []);

  const games = [
    { name: "Projectile", link: "https://minigameprojectile.netlify.app/", flagId: "flag1-snake" },
    { name: "Memory Game", link: "https://minigamememory.netlify.app/", flagId: "flag2-memory" },
    { name: "Word Puzzle", link: "https://minigameword.netlify.app/", flagId: "flag3-tic" },
    { name: "Maze Escape", link: "https://minigamemazw.netlify.app/", flagId: "flag4-maze" },
    { name: "Code-Debugger", link: "https://minigamefixbugs.netlify.app/", flagId: "flag5-quiz" },
    { name: "Color Combo", link: "https://nikhilkush078.github.io/ctf_2/", flagId: "flag6-code" },
  ];

  const handleFlagSubmit = async (flag) => {
    if (!user || !user.token) {
      toast.error("You must be logged in.");
      return;
    }

    try {
      const res = await axios.post(
          "https://vercel-backend-git-main-mahesh-kushwahs-projects.vercel.app/api/flags/submit",
      
        { flag },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );

      toast.success(res.data.message);
      if (res.data.score !== undefined) setScore(res.data.score);
    } catch (err) {
      toast.error(err.response?.data?.message || "Flag submission failed");
    }
  };

  return (
    
    <div 
      className="min-h-screen bg-black text-green-400 px-4 py-10 font-mono "
      style={{ fontFamily: "'Press Start 2P', monospace" }}
       > 
       <Toaster position="top-right" reverseOrder={false} /> {/* ✅ Add this line */}
    
      <h1
        ref={titleRef}
        className="text-3xl md:text-4xl text-center mb-6 neon-glow"
      >
        ROUND 2: GAMES CHALLENGE
      </h1>

      <p
        ref={descRef}
        className="text-sm md:text-base text-center max-w-3xl mx-auto text-green-300 mb-10"
      >
        Hack your way through each retro mini-game. Earn flags, score points,
        and prove your worth. One flag = 10 points. Good luck, Agent!
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
       
        {games.map((game, index) => (
          <div key={index} className="border border-green-500 p-6 rounded-lg shadow-lg bg-gray-900/60">
            <h2 className="text-xl text-green-300 mb-3">{game.name}</h2>

            <a
              href={game.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block mb-3 text-green-400 underline hover:text-green-200 transition"
            >
              ▶ PLAY GAME
            </a>

            <input
              type="text"
              value={flags[game.flagId] || ""}
              onChange={(e) =>
                setFlags({ ...flags, [game.flagId]: e.target.value })
              }
              placeholder="Enter flag here..."
              className="w-full p-2 mb-3 bg-black border border-green-500 text-green-200 placeholder-green-500 focus:outline-none focus:ring-2 focus:ring-green-400 rounded"
            />

            <button
              onClick={() => handleFlagSubmit(flags[game.flagId])}
              className="w-full py-2 px-4 bg-green-700 hover:bg-green-500 text-black font-bold rounded shadow"
            >
              SUBMIT FLAG
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
