import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { BASE_URL } from "./config";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false); // 👈 New state

  const navigate = useNavigate();

  const handleLogin = async (e) => {
  e.preventDefault();
  const isFinished = localStorage.getItem("isFinished") === "true";
if (isFinished) {
  toast.error("Game Over. You have already submitted.");
   // or show a Game Over screen
  return;
}


  if (!username || !password) {
    toast.error("Please enter both username and password.");
    return;
  }

  try {
    const response = await axios.post(`${BASE_URL}/api/auth/login`, {
      username,
      password,
    });

    const user = response.data.user;
    const token = response.data.token;  // make sure this matches your backend response

    // Save combined user + token object in localStorage
    localStorage.setItem("user", JSON.stringify({ ...user, token }));
    localStorage.setItem("isLoggedIn", "true");


    toast.success("Login successful!");
    navigate("/");
  } catch (error) {
    toast.error(
      error.response?.data?.message || "Invalid username or password"
    );
  }
};


  return (
    <div className="min-h-screen bg-black flex items-center justify-center font-mono">
      <Toaster position="top-right" reverseOrder={false} /> {/* ✅ Add this line */}

      <div className="border-4 border-green-400 p-10 rounded-xl shadow-[0_0_20px_#00ff00] bg-black text-green-400 max-w-md w-full">
        <h2 className="text-3xl mb-6 text-center font-bold tracking-widest">
          LOGIN
        </h2>

        <form className="flex flex-col gap-6" onSubmit={handleLogin}>
          <div>
            <label className="block mb-2 text-sm">USERNAME</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 bg-black border border-green-400 text-green-200 placeholder-green-500 rounded outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Enter your username"
            />
          </div>
         <div>
            <label className="block mb-2 text-sm">PASSWORD</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 pr-10 bg-black border border-green-400 text-green-200 placeholder-green-500 rounded outline-none focus:ring-2 focus:ring-green-400"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-0 px-3 flex items-center text-xl"
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "👁️" : "🙈"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="px-6 py-3 mt-4 bg-green-400 text-black font-bold hover:bg-green-300 rounded shadow-[0_0_10px_#00ff00] transition-all"
          >
            ENTER SYSTEM
          </button>
        </form>

        <p className="text-xs mt-6 text-center text-green-600">
          Not registered?{" "}
          <Link to="/signup" className="underline hover:text-green-300">
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
}
