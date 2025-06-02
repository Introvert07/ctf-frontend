import React, { useEffect, useState } from "react";
import svg from "./assets/Cyber attack 2.gif";
import { Link } from "react-router-dom";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

function useTypingEffect(text, speed = 50) {
  const [displayedText, setDisplayedText] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + text.charAt(i));
      i++;
      if (i >= text.length) {
        clearInterval(interval);
        setDone(true);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return { displayedText, done };
}

export default function Challenge2() {
  const [clicks, setClicks] = useState(0);
  const [showFlag, setShowFlag] = useState(false);
  const [flags, setFlags] = useState(() => {
    // Load from localStorage or default
    const saved = localStorage.getItem("challenge2Flags");
    return saved ? JSON.parse(saved) : ["", "", ""];
  });
  const [loading, setLoading] = useState(false);

  const fullText =
    "Welcome to Challenge 2: The Red Threat 🔥\nDive deeper into the digital shadows. Flags are hidden in plain sight, but danger lurks where you least expect it...";

  const { displayedText, done } = useTypingEffect(fullText, 35);

  useEffect(() => {
    if (clicks >= 5) {
      setShowFlag(true);
    }
  }, [clicks]);

  // Save flags to localStorage on change
  useEffect(() => {
    localStorage.setItem("challenge2Flags", JSON.stringify(flags));
  }, [flags]);

  const finalDisplayedText = done ? (
    <span>
      {displayedText.split("🔥")[0]}
      <span
        className="cursor-pointer hover:text-red-300"
        onClick={() => setClicks((prev) => prev + 1)
          
        }
        
        title="Click me multiple times..."
       
      >
        🔥;
        
      </span>
      {displayedText.split("🔥")[1]
      }
    </span>
  ) : (
    displayedText
  );

  const handleChange = (index, value) => {
    const updatedFlags = [...flags];
    updatedFlags[index] = value;
    setFlags(updatedFlags);
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

  const updatedFlags = [...flags];

  for (let i = 0; i < flags.length; i++) {
    const flag = flags[i].trim();
    if (flag === "") continue;

    try {
      const res = await axios.post(
        "https://vercel-backend-git-main-mahesh-kushwahs-projects.vercel.app/api/flags/submit",
        { flag },
        config
      );
      toast.success(`✅ ${flag} - ${res.data.message}`);
      // Keep the flag as is on success (no change needed)
      updatedFlags[i] = flag;
    } catch (err) {
      toast.error(`❌ ${flag} - ${err.response?.data?.message || "Error"}`);
      // Do NOT clear the flag automatically; let user fix it manually
      // updatedFlags[i] = "";  <-- Remove this line
    }
  }

  setFlags(updatedFlags);
  setLoading(false);
};

  return (
    <div className="min-h-screen bg-black text-red-400 font-mono px-4 py-8">
      <Toaster position="top-right" />

      <div className="flex flex-col md:flex-row items-center justify-center gap-10">
        {/* Left: Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src={svg}
            alt="Red hacker illustration"
            className="max-w-sm rounded-xl"
          />
        </div>

        {/* Right: Typed Text */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h2 className="text-2xl font-bold mb-3">Challenge 2</h2>
          <p className="text-base leading-relaxed whitespace-pre-line">
            {finalDisplayedText}
          </p>
          {showFlag && (
            <p className="mt-3 text-red-300 text-sm animate-pulse">
              flag3{"{packet-sniffing}"}
            </p>
          )}
        </div>
      </div>

      {/* Submission Form */}
      <div className="w-full flex justify-center mt-12">
        <div className="border-2 border-red-500 p-6 rounded-lg shadow-[0_0_15px_red] bg-black text-red-400 w-full max-w-md">
          <h3 className="text-xl mb-4 text-center font-bold tracking-wide">
            Submit Your Flags
          </h3>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            {[1, 2, 3].map((num, index) => (
              <div key={num}>
                <label className="block mb-1 text-xs">
                  FLAG {num}
                  
                </label>
                <input
                  type="text"
                  value={flags[index]}
                  onChange={(e) => handleChange(index, e.target.value)}
                  className="w-full px-3 py-1.5 bg-black border border-red-500 text-red-200 placeholder-red-400 text-sm rounded outline-none focus:ring-2 focus:ring-red-500"
                  placeholder={`Paste flag ${num}`}
                  onMouseEnter={
                    num === 2
                      ? () => console.log("flag2(man in the middle)")
                      : undefined
                  }
                  autoComplete="off"
                />
              </div>
            ))}

            <button
              type="submit"
              disabled={loading}
              className={`px-4 py-2 mt-2 bg-red-500 text-black font-bold text-sm rounded shadow-[0_0_8px_red] transition-all ${
                loading ? "opacity-50 cursor-not-allowed" : "hover:bg-red-400"
              }`}
            >
              {loading ? "Submitting..." : "SUBMIT FLAGS"}
            </button>
          </form>
        </div>
      </div>
      

      {/* Navigation Arrows */}
      <Link
        to="/challenge3"
        className="fixed bottom-6 right-6 z-50 bg-red-400 text-black rounded-full p-4 hover:bg-red-300 transition-all shadow-[0_0_15px_red]"
        title="Go to Challenge 3"
      >
        <FaArrowRight className="text-3xl" />
      </Link>

      <Link
        to="/challenge1"
        className="fixed bottom-6 left-6 z-50 bg-red-400 text-black rounded-full p-4 hover:bg-red-300 transition-all shadow-[0_0_15px_red]"
        title="Back to Challenge 1 f$l$a$g$1(phishing)"
      >
        <FaArrowLeft className="text-3xl" />
      </Link>


      {/* Hints Section */}
<div className="max-w-full mx-auto mt-12 ml-20 text-red-300 font-mono text-sm px-4">
  <h3 className="mb-2 font-bold text-red-400">Hints to Find Flags</h3>
  <ul className="list-disc list-inside space-y-2">
    <li>
      <strong>Hint 1:</strong> <em>"Beneath the pointing where it all began, lies the first trap laid by deceitful hands."</em><br />
          </li>
    <li>
      <strong>Hint 2:</strong> <em>"Hover where secrets are meant to be shared, and a silent whisper appears only for the aware."</em><br />
        </li>
    <li>
      <strong>Hint 3:</strong> <em>"Summon the flame not once but five, and the final ember will come alive."</em><br />
        </li>
  </ul>
</div>

    </div>

    
  );
}
