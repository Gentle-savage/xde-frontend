"use client";

import { useEffect, useState } from "react";

export default function AdminWrapper() {
  const [authorized, setAuthorized] = useState(false);
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (password === "XDE2026Secure") {
      setAuthorized(true);
    } else {
      alert("Invalid Password");
    }
  };

  if (!authorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="bg-white p-10 rounded-xl shadow-xl w-96">
          <h2 className="text-2xl font-bold mb-6 text-red-600 text-center">
            Admin Access
          </h2>

          <input
            type="password"
            placeholder="Enter Admin Password"
            className="border p-3 w-full mb-4 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={handleLogin}
            className="bg-red-600 hover:bg-red-700 text-white w-full py-3 rounded font-semibold"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  return <AdminDashboard />;
}
