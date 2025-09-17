import React, { useEffect } from "react";
import fluxLogo from "./assets/logo.png";
import { FaInstagram, FaLinkedin } from "react-icons/fa";

export default function PoweredByFlux() {
  useEffect(() => {
    document.title = "Powered by FLUX";
  }, []);

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono px-6 py-10 space-y-16 overflow-hidden">

      {/* ------------------- PAGE 1: CTF RULES ------------------- */}
      <div className="flex flex-col items-center">
        <h1 className="text-3xl md:text-4xl font-bold tracking-wider mb-4 text-center">
          Welcome to the CTF by FLUX
        </h1>
        <p className="text-lg md:text-xl text-green-300 mb-6 text-center max-w-2xl">
          This Capture the Flag (CTF) event is designed to test your web development and hacking skills in a fun, educational format.
        </p>

        <div className="text-left text-sm md:text-base text-green-200 max-w-3xl leading-relaxed">
          <h2 className="text-xl font-bold mb-2 text-green-400 underline">Rules:</h2>
          <ul className="list-disc list-inside mb-6">
  <li>Each challenge has hidden "flags" you must find.</li>
  <li>Flags may be hidden in the source code, styles, or as riddles.</li>
  <li>Each flag is worth 10 points.</li>
  <li>No brute force or automated tools allowed.</li>
  <li>Don't share answers — play fair!</li>
  <li className="text-yellow-300 font-semibold">
    You must be logged in to access and submit the challenges.
  </li>
  <li>
    <span className="text-green-400 font-medium">Flag format:</span> For Challenge 1 and 2, include the format like <code className="bg-gray-800 px-1 rounded">flag1-html</code>, <code className="bg-gray-800 px-1 rounded">flag2-css</code>. For Challenge 3 and beyond (riddles), just enter the plain answer like <code className="bg-gray-800 px-1 rounded">bootstrap</code>.
  </li>
</ul>

          <h2 className="text-xl font-bold mb-2 text-green-400 underline">Flag Format:</h2>
          <p className="mb-4">Submit your flag in <span className="text-green-300 font-semibold">small letters</span> exactly as found. For example:</p>
          <code className="bg-green-900 text-green-300 px-3 py-1 rounded shadow-inner">hover</code>
        </div>
      </div>

      {/* ------------------- PAGE 2: FLUX INFO ------------------- */}
      <div className="flex flex-col items-center">
        <img
          src={fluxLogo}
          alt="FLUX Logo"
          className="w-32 h-32 mb-6 rounded-full shadow-[0_0_25px_#00ff88]"
        />

        <h1 className="text-3xl md:text-4xl font-bold tracking-wider mb-2 text-center">
          POWERED BY FLUX
        </h1>

        <p className="text-lg md:text-xl italic text-center text-green-300 mb-8">
          Specialized in Impossible Things 🚀
        </p>

        <div className="flex flex-col items-center mb-8">
          <p className="text-green-300 text-lg mb-2">Follow us on</p>
          <div className="flex gap-8 z-10 animate-floating mt-2">
            <a
              href="https://www.instagram.com/fluxsati/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-500 text-3xl hover:text-pink-300 transition-all drop-shadow-[0_0_10px_pink]"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.linkedin.com/company/fluxsati/posts/?feedView=all"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 text-3xl hover:text-blue-300 transition-all drop-shadow-[0_0_10px_#0ff]"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>

        <p className="text-green-300 text-center text-base mt-6">
          Visit -{" "}
          <a
            href="https://clubflux.netlify.app"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-green-200"
          >
            clubflux.netlify.app
          </a>
        </p>
      </div>
      
    </div>
  );
}
