import React, { useEffect, useState } from "react";
import svg from "./assets/blue-theme.gif";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const riddles = [
  {
    question:
      "In a form, I store the user’s say. Text, password, or email — I hold them all day. What HTML tag am I?",
    answer: "input",
  },
  {
    question:
      "I hide content until you click, then I slide or drop real quick. With just CSS, I come alive — What selector or feature am I?",
    answer: "hover",
  },
  {
    question:
      "I don't change size or shape, yet I decide who’s on top in this layered escape. I control the depth in a 2D space — what CSS property holds this place?",
    answer: "z-index",
  },
];

export default function Challenge3() {
  const [typedText, setTypedText] = useState("");
  const [answers, setAnswers] = useState(["", "", ""]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const text =
      "Challenge 3: Decode the Web Riddles!\nAnswer the following riddles based on your web development knowledge. Each correct answer is a flag!";
    let i = 0;
    const interval = setInterval(() => {
      setTypedText((prev) => prev + text.charAt(i));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, 30);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
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

  const newAnswers = [...answers];

  for (let i = 0; i < riddles.length; i++) {
    const userAnswer = answers[i].trim().toLowerCase();
    const correctAnswer = riddles[i].answer.toLowerCase();
    const flag = `riddle${i + 1}-${correctAnswer}`;

    if (userAnswer === correctAnswer) {
      try {
        const res = await axios.post(
          "https://vercel-backend-git-main-mahesh-kushwahs-projects.vercel.app/api/flags/submit",
          { flag },
          config
        );
        toast.success(`✅ Flag ${i + 1}: ${userAnswer} - ${res.data.message}`);
        // Keep the correct answer in input (do nothing)
      } catch (err) {
        toast.error(
          `❌ Flag ${i + 1}: ${userAnswer} - ${err.response?.data?.message || "Error"}`
        );
      }
    } else {
      toast.error(`❌ Flag ${i + 1}: Incorrect answer`);
      newAnswers[i] = ""; // Clear only the wrong answer
    }
  }

  setAnswers(newAnswers);
  setLoading(false);
};

  return (
    <div className="min-h-screen bg-black text-blue-300 font-mono px-4 py-8 relative">
      <Toaster position="top-right" />

      {/* Back Arrow */}
      <Link
        to="/challenge2"
        className="absolute top-6 left-6 flex items-center gap-2 text-blue-300 hover:text-blue-100 transition-all"
        title="Back to Challenge 2"
      >
        <FaArrowLeft className="text-xl" />
        <span className="font-bold text-sm">Back</span>
      </Link>

      {/* Content */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-10 mt-8">
        {/* Left: SVG */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src={svg}
            alt="Web riddles"
            className="max-w-sm rounded-xl shadow-[0_0_15px_#3b82f6] border-2 border-blue-400"
          />
        </div>

        {/* Right: Typed Intro */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h2 className="text-2xl font-bold mb-3">Challenge 3</h2>
          <p className="text-base leading-relaxed whitespace-pre-line">{typedText}</p>
        </div>
      </div>

      {/* Riddle Form */}
      <div className="w-full flex justify-center mt-12">
        <div className="border-2 border-blue-400 p-6 rounded-lg shadow-[0_0_15px_#3b82f6] bg-black text-blue-300 w-full max-w-xl">
          <h3 className="text-xl mb-4 text-center font-bold tracking-wide">Solve the Riddles</h3>

          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            {riddles.map((riddle, index) => (
              <div key={index}>
                <p className="mb-2 text-sm">{riddle.question}</p>
                <input
                  type="text"
                  className="w-full px-3 py-2 bg-black border border-blue-400 text-blue-100 placeholder-blue-400 text-sm rounded outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder={`Answer to riddle ${index + 1}`}
                  value={answers[index]}
                  onChange={(e) => handleChange(index, e.target.value)}
                  disabled={loading}
                />
              </div>
            ))}

            <button
              type="submit"
              disabled={loading}
              className={`px-4 py-2 mt-2 bg-blue-400 text-black font-bold text-sm hover:bg-blue-300 rounded shadow-[0_0_8px_#3b82f6] transition-all ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Submitting..." : "SUBMIT ANSWERS"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
