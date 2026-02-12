"use client";

import { useState } from "react";

const backend = "https://xde-backend.onrender.com";

export default function AdminPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [showReset, setShowReset] = useState(false);
  const [resetKey, setResetKey] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const login = async () => {
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

  const resetPassword = async () => {
    const res = await fetch(`${backend}/admin-reset-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        secretKey: resetKey,
        newPassword: newPassword,
      }),
    });

    const data = await res.json();
    setMessage(data.message);
  };

  if (!loggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="bg-white p-10 rounded-xl shadow w-96">

          {!showReset ? (
            <>
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
                onClick={login}
                className="bg-red-600 text-white w-full py-3 rounded"
              >
                Login
              </button>

              <p
                onClick={() => setShowReset(true)}
                className="text-sm text-blue-600 mt-4 cursor-pointer text-center"
              >
                Forgot Password?
              </p>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold mb-6 text-red-600 text-center">
                Reset Password
              </h2>

              <input
                type="text"
                placeholder="Enter Secret Reset Key"
                className="border p-3 w-full mb-4 rounded"
                value={resetKey}
                onChange={(e) => setResetKey(e.target.value)}
              />

              <input
                type="password"
                placeholder="New Password"
                className="border p-3 w-full mb-4 rounded"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />

              <button
                onClick={resetPassword}
                className="bg-red-600 text-white w-full py-3 rounded"
              >
                Reset Password
              </button>

              {message && (
                <p className="mt-4 text-green-600 text-center">
                  {message}
                </p>
              )}

              <p
                onClick={() => setShowReset(false)}
                className="text-sm text-blue-600 mt-4 cursor-pointer text-center"
              >
                Back to Login
              </p>
            </>
          )}

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div>
        <h1 className="text-3xl font-bold text-red-600 mb-6">
          Admin Dashboard
        </h1>

        <button
          onClick={() => setLoggedIn(false)}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
