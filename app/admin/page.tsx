"use client";

import { useState } from "react";

const backend = "https://xde-backend.onrender.com";

export default function AdminPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const res = await fetch(`${backend}/admin-login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (!res.ok) {
      alert("Invalid password");
      return;
    }

    setLoggedIn(true);
  };

  if (!loggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="bg-white p-10 rounded-xl shadow w-96">
          <h2 className="text-2xl font-bold mb-6 text-red-600 text-center">
            Admin Login
          </h2>

          <input
            type="password"
            placeholder="Enter Password"
            className="border p-3 w-full mb-4 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={handleLogin}
            className="bg-red-600 text-white w-full py-3 rounded"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold text-red-600">
        Admin Dashboard (Secure)
      </h1>
    </div>
  );
}
