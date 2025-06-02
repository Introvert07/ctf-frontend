import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

// Mock flag values (replace with actual logic or backend validation)
const correctFlags = {
  game1: "color",
  game2: "no-flag",
  game3: "FLAG789-GAME3",
};

export default function Games() {
  const [submittedFlags, setSubmittedFlags] = useState({
    game1: "",
    game2: "",
    game3: "",
  });

  const [isCorrect, setIsCorrect] = useState({
    game1: false,
    game2: false,
    game3: false,
  });

  const handleSubmit = (gameKey) => {
    if (submittedFlags[gameKey] === correctFlags[gameKey]) {
      toast.success(`Flag for ${gameKey.toUpperCase()} is correct!`);
      setIsCorrect((prev) => ({ ...prev, [gameKey]: true }));
    } else {
      toast.error("Incorrect flag. Try again.");
    }
  };

  const handleInputChange = (e, gameKey) => {
    const { value } = e.target;
    setSubmittedFlags((prev) => ({ ...prev, [gameKey]: value }));
  };

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono p-8">
      <Toaster />

      <h1 className="text-4xl text-center font-bold mb-8">Games & Flag Submission</h1>

      {/* List of Games */}
      <div className="grid gap-8 max-w-3xl mx-auto">
        {/* Game 1 */}
        <div className="bg-green-900/20 p-6 rounded border border-green-400 shadow-md">
          <h2 className="text-2xl mb-2 font-semibold">Match the box</h2>
          <a
            href="https://nikhilkush078.github.io/ctf_2/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            Play Game 1
          </a>
          <input
            type="text"
            placeholder="Enter flag from Game 1"
            value={submittedFlags.game1}
            onChange={(e) => handleInputChange(e, "game1")}
            className="w-full p-2 border mt-2 text-black rounded"
          />
          <button
            onClick={() => handleSubmit("game1")}
            className="mt-2 px-4 py-2 border border-green-400 text-green-300 hover:bg-green-600/20 rounded"
          >
            Submit Flag
          </button>
          {isCorrect.game1 && <p className="text-green-400 mt-2">✅ Flag verified!</p>}
        </div>

        {/* Game 2 */}
        <div className="bg-green-900/20 p-6 rounded border border-green-400 shadow-md">
          <h2 className="text-2xl mb-2 font-semibold">Snake the Flag

</h2>
          <a
            href="https://nikhilkush078.github.io/ctf/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            Play Game 2
          </a>
          <input
            type="text"
            placeholder="Enter flag from Game 2"
            value={submittedFlags.game2}
            onChange={(e) => handleInputChange(e, "game2")}
            className="w-full p-2 border mt-2 text-black rounded"
          />
          <button
            onClick={() => handleSubmit("game2")}
            className="mt-2 px-4 py-2 border border-green-400 text-green-300 hover:bg-green-600/20 rounded"
          >
            Submit Flag
          </button>
          {isCorrect.game2 && <p className="text-green-400 mt-2">✅ Flag verified!</p>}
        </div>

        {/* Game 3 */}
        <div className="bg-green-900/20 p-6 rounded border border-green-400 shadow-md">
          <h2 className="text-2xl mb-2 font-semibold">Game 3</h2>
          <a
            href="https://your-game3-url.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            Play Game 3
          </a>
          <input
            type="text"
            placeholder="Enter flag from Game 3"
            value={submittedFlags.game3}
            onChange={(e) => handleInputChange(e, "game3")}
            className="w-full p-2 border mt-2 text-black rounded"
          />
          <button
            onClick={() => handleSubmit("game3")}
            className="mt-2 px-4 py-2 border border-green-400 text-green-300 hover:bg-green-600/20 rounded"
          >
            Submit Flag
          </button>
          {isCorrect.game3 && <p className="text-green-400 mt-2">✅ Flag verified!</p>}
        </div>
      </div>
    </div>
  );
}
