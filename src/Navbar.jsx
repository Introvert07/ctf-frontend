import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { BASE_URL } from "./config";


export default function Navbar({ score: externalScore, setScore }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [localScore, setLocalScore] = useState(null);

  useEffect(() => {
    const fetchScore = async () => {
      if (!user || !user.token) return;

      try {
        const response = await axios.get(`${BASE_URL}/api/auth/score`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setScore(response.data.score);
        setLocalScore(response.data.score);
      } catch (err) {
        console.error("Error fetching score:", err);
        toast.error("Failed to fetch score.");
      }
    };

    fetchScore();
  }, [user, setScore]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    toast.success("Logged out!");
    navigate("/login");
  };

  const handleFinalSubmit = async () => {
    try {
      await axios.post(
        `https://vercel-backend-git-main-mahesh-kushwahs-projects.vercel.app/api/auth/final-submit`,
        {
          submittedAt: new Date().toISOString(),
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      toast.success("Final time submitted!");
      localStorage.setItem("isFinished", "true");
localStorage.removeItem("user"); // optionally log them out

        

      navigate("/");
      toast.success("Game over")
    } catch (err) {
      console.error("Submission error:", err);
      toast.error("Failed to submit final time.");
    }
  };

  const goHome = () => {
    navigate("/");
  };

  const displayScore = externalScore !== undefined ? externalScore : localScore;

  return (
    <div className="sticky top-0 z-50 w-full flex justify-between items-center p-4 bg-black border-b border-green-500 text-green-400 font-mono shadow-md">
      <h1
        onClick={goHome}
        className="text-2xl font-bold tracking-widest cursor-pointer select-none"
        title="Go to Home"
      >
        CTF SYSTEM
      </h1>

      {user ? (
        <div className="flex gap-6 items-center">
          <div className="flex flex-col text-right">
            <span className="text-green-300 uppercase text-sm tracking-wider">
              {user.username}
            </span>
            {displayScore !== null && (
              <span className="text-xs text-green-500 tracking-wide">
                Score: {displayScore}
              </span>
            )}
          </div>

          {/* FINAL SUBMIT BUTTON */}
          <button
            onClick={handleFinalSubmit}
            className="px-4 py-2 text-sm font-bold border-2 border-blue-400 text-blue-300 bg-black hover:bg-blue-400 hover:text-black transition-all rounded-md shadow-[0_0_10px_blue]"
          >
            FINAL SUBMIT
          </button>

          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm font-bold border-2 border-red-400 text-red-300 bg-black hover:bg-red-400 hover:text-black transition-all rounded-md shadow-[0_0_10px_red]"
          >
            LOGOUT
          </button>
        </div>
      ) : (
        <div className="flex gap-4">
          <Link to="/login">
            <button className="px-4 py-2 text-sm font-bold border-2 border-yellow-400 text-yellow-300 bg-black hover:bg-yellow-400 hover:text-black transition-all rounded-md shadow-[0_0_10px_yellow]">
              LOGIN
            </button>
          </Link>
          <Link to="/signup">
            <button className="px-4 py-2 text-sm font-bold border-2 border-pink-400 text-pink-300 bg-black hover:bg-pink-400 hover:text-black transition-all rounded-md shadow-[0_0_10px_pink]">
              SIGNUP
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
