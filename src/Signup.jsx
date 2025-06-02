import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { BASE_URL } from "./config";

export default function Signup() {
  const [enrollment, setEnrollment] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // 👁 Toggle

  const validateEnrollment = (value) => /^[a-zA-Z0-9]{1,20}$/.test(value);
  const validatePassword = (value) =>
    /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]{6,20}$/.test(value);

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!enrollment || !username || !email || !password) {
      toast.error("Please fill all fields");
      return;
    }

    if (!validateEnrollment(enrollment)) {
      toast.error("Enrollment must be alphanumeric and max 20 characters");
      return;
    }

    if (!validatePassword(password)) {
      toast.error(
        "Password must be 6–20 characters and include at least one letter and one number"
      );
      return;
    }

    try {
      await axios.post(`${BASE_URL}/api/auth/signup`, {
        enrollment,
        username,
        email,
        password,
      });
      toast.success("Account created successfully!");
      
      setEnrollment("");
      setUsername("");
      setEmail("");
      setPassword("");
        
      // Wait 2 seconds before navigating to login
  setTimeout(() => {
    navigate('/login');
  }, 2000);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Signup failed. Try again."
      );
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center font-mono">
      <Toaster position="top-right" reverseOrder={false} />

      <div className="border-4 border-pink-400 p-10 rounded-xl shadow-[0_0_20px_#ff00ff] bg-black text-pink-300 max-w-md w-full">
        <h2 className="text-3xl mb-6 text-center font-bold tracking-widest">
          SIGNUP
        </h2>

        <form className="flex flex-col gap-6" onSubmit={handleSignup}>
          <div>
            <label className="block mb-2 text-sm">ENROLLMENT NUMBER</label>
            <input
              type="text"
              value={enrollment}
              onChange={(e) => setEnrollment(e.target.value)}
              className="w-full px-4 py-2 bg-black border border-pink-400 text-pink-200 placeholder-pink-400 rounded outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="Enter your enrollment number"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm">USERNAME</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 bg-black border border-pink-400 text-pink-200 placeholder-pink-400 rounded outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="Choose a username"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm">EMAIL</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 bg-black border border-pink-400 text-pink-200 placeholder-pink-400 rounded outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm">PASSWORD</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 bg-black border border-pink-400 text-pink-200 placeholder-pink-400 rounded outline-none focus:ring-2 focus:ring-pink-400"
                placeholder="Create a password"
              />
              <span
                className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer text-pink-400 hover:text-pink-200"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>
          </div>

          <button
            type="submit"
            className="px-6 py-3 mt-4 bg-pink-400 text-black font-bold hover:bg-pink-300 rounded shadow-[0_0_10px_#ff00ff] transition-all"
          >
            CREATE ACCOUNT
          </button>
        </form>

        <p className="text-xs mt-6 text-center text-pink-600">
          Already registered?{" "}
          <Link to="/login" className="underline hover:text-pink-300">
            Go to login
          </Link>
        </p>
      </div>
    </div>
  );
}
