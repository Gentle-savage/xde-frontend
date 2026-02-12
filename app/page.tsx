"use client";

import { useState } from "react";

const backend = "https://xde-backend.onrender.com";

export default function AdminPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

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

  const handleChangePassword = async () => {
    const res = await fetch(`${backend}/admin-change-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ oldPassword, newPassword }),
    });

    const data = await res.json();
    setMessage(data.message);
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
            className="bg-red-600 hover:bg-red-700 text-white w-full py-3 rounded"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-10">

      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold text-red-600">
          Admin Dashboard
        </h1>

        <button
          onClick={() => setLoggedIn(false)}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      {/* CHANGE PASSWORD SECTION */}
      <div className="bg-white p-8 rounded-xl shadow max-w-md">
        <h2 className="text-xl font-semibold mb-6 text-red-600">
          Change Password
        </h2>

        <input
          type="password"
          placeholder="Old Password"
          className="border p-3 w-full mb-4 rounded"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="New Password"
          className="border p-3 w-full mb-4 rounded"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <button
          onClick={handleChangePassword}
          className="bg-red-600 hover:bg-red-700 text-white w-full py-3 rounded"
        >
          Update Password
        </button>

        {message && (
          <p className="mt-4 text-green-600">{message}</p>
        )}
      </div>

    </div>
  );
}
