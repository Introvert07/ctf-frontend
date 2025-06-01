import React, { useEffect, useState } from "react";
import gif from "./assets/Cyber attack.gif";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

function useTypingEffect(text, speed = 50) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + text.charAt(i));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return displayedText;
}

export default function Challenge1() {
  const typedText = useTypingEffect(
    "Welcome to the Capture The Flag challenge! 🔍  \nHint: Look for the 🕵️ emoji in the text, comments in code, and clues around the image.",
    35
  );

  // Initialize flags from localStorage or fallback to empty strings
  const [flags, setFlags] = useState(() => {
    const savedFlags = localStorage.getItem("challenge1Flags");
    return savedFlags ? JSON.parse(savedFlags) : ["", "", ""];
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (index, value) => {
    const newFlags = [...flags];
    newFlags[index] = value;
    setFlags(newFlags);
    localStorage.setItem("challenge1Flags", JSON.stringify(newFlags)); // save on every change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const user = JSON.parse(localStorage.getItem("user"));
    


    if (!user || !user.token) {
      toast.error("Please log in first!");
      setLoading(false);
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };

    const newFlags = [...flags];

    for (let i = 0; i < flags.length; i++) {
      const flag = flags[i].trim();
      if (flag === "") continue;

      try {
        const res = await axios.post(
          "http://localhost:5000/api/flags/submit",
          { flag },
          config
        );
        toast.success(`✅ ${flag} - ${res.data.message}`);

        // Clear only successfully submitted flag
        newFlags[i] = "";
      } catch (err) {
        toast.error(`❌ ${flag} - ${err.response?.data?.message || "Error"}`);
      }
    }

    setFlags(newFlags);
    localStorage.setItem("challenge1Flags", JSON.stringify(newFlags)); // update localStorage after submit
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black text-green-300 font-mono px-4 py-8">
      <Toaster position="top-right" />

      <div className="flex flex-col md:flex-row items-center justify-center gap-10">
        {/* Left: GIF */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src={gif}
            alt="Cyber attack illustration flag2(jQuery)"
            className="max-w-sm rounded-xl"
          />
        </div>

        {/* Right: Auto-typed Text */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h2 className="text-2xl font-bold mb-3">
            Challenge 1 <span className="text-black">Flag1(Angular)</span>
          </h2>
          <p className="text-base leading-relaxed whitespace-pre-line">
            {typedText}
          </p>
        </div>
      </div>

      {/* Submission Form */}
      <div className="w-full flex justify-center mt-12">
        <div className="border-2 border-green-400 p-6 rounded-lg shadow-[0_0_15px_green] bg-black text-green-300 w-full max-w-md">
          <h3 className="text-xl mb-4 text-center font-bold tracking-wide">
            Submit Your Flags
          </h3>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}> 
            
            {[1, 2, 3].map((num, index) => (
              <div key={num}> 
                <label className="block mb-1 text-xs">
                  FLAG {num} <span className="text-black">flag3(vue)</span>
                </label>
                
                <input
                  type="text"
                  value={flags[index]}
                  onChange={(e) => handleChange(index, e.target.value)}
                  className="w-full px-3 py-1.5 bg-black border border-green-400 text-green-200 placeholder-green-400 text-sm rounded outline-none focus:ring-2 focus:ring-green-400"
                  placeholder={`Paste flag ${num}`}
                  autoComplete="off"
                />
              </div>
            ))}

            <button
              type="submit"
              disabled={loading}
              className={`px-4 py-2 mt-2 bg-green-400 text-black font-bold text-sm rounded shadow-[0_0_8px_green] transition-all ${
                loading ? "opacity-50 cursor-not-allowed" : "hover:bg-green-300"
              }`}
            >
              {loading ? "Submitting..." : "SUBMIT FLAGS"}
            </button>
          </form>
        </div>
        
      </div>
      

      {/* Bottom-right Arrow to Challenge2 */}
      <Link
        to="/challenge2"
        className="fixed bottom-6 right-6 z-50 bg-green-400 text-black rounded-full p-4 hover:bg-green-300 transition-all shadow-[0_0_15px_green]"
        title="Go to Challenge 2"
      >
        <FaArrowRight className="text-3xl" />
      </Link>

      {/* Bottom-left Back to Home Button */}
      <Link
        to="/"
        className="fixed bottom-6 left-6 z-50 bg-green-400 text-black rounded-full p-4 hover:bg-green-300 transition-all shadow-[0_0_15px_green]"
        title="Back to Home"
      >
        <FaArrowLeft className="text-3xl" />
      </Link>
      
    </div>
    
  );
}
