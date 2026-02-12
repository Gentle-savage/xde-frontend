"use client";

import { useEffect, useState } from "react";

const backend = "https://xde-backend.onrender.com";

export default function AdminPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [shipments, setShipments] = useState<any[]>([]);
  const [createData, setCreateData] = useState<any>({});

  const login = async () => {
    const res = await fetch(`${backend}/admin-login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (!res.ok) return alert("Invalid password");
    setLoggedIn(true);
  };

  const fetchShipments = async () => {
    const res = await fetch(`${backend}/all-shipments`);
    const data = await res.json();
    setShipments(data);
  };

  useEffect(() => {
    if (loggedIn) fetchShipments();
  }, [loggedIn]);

  const createShipment = async () => {
    await fetch(`${backend}/create-shipment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(createData),
    });
    fetchShipments();
  };

  const deleteShipment = async (trackingNumber: string) => {
    await fetch(`${backend}/delete-shipment/${trackingNumber}`, {
      method: "DELETE",
    });
    fetchShipments();
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
        </div>
      </div>
    );
  }

  return (
    <div className="p-10 bg-gray-100 min-h-screen">

      <div className="flex justify-between mb-8">
        <h1 className="text-3xl font-bold text-red-600">
          XDE Admin Dashboard
        </h1>
        <button
          onClick={() => setLoggedIn(false)}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      {/* Create Shipment */}
      <div className="bg-white p-6 rounded shadow mb-10">
        <h2 className="text-xl font-semibold mb-4 text-red-600">
          Create Shipment
        </h2>
        <input
          placeholder="Sender Name"
          className="border p-3 w-full mb-4 rounded"
          onChange={(e) => setCreateData({ ...createData, senderName: e.target.value })}
        />
        <input
          placeholder="Receiver Name"
          className="border p-3 w-full mb-4 rounded"
          onChange={(e) => setCreateData({ ...createData, receiverName: e.target.value })}
        />
        <button
          onClick={createShipment}
          className="bg-red-600 text-white px-6 py-3 rounded"
        >
          Create
        </button>
      </div>

      {/* Shipment Table */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4 text-red-600">
          All Shipments
        </h2>
        <table className="w-full">
          <thead className="bg-red-600 text-white">
            <tr>
              <th>Tracking</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {shipments.map((s, i) => (
              <tr key={i} className="border-b">
                <td>{s.trackingNumber}</td>
                <td>{s.status}</td>
                <td>
                  <button
                    onClick={() => deleteShipment(s.trackingNumber)}
                    className="bg-black text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
