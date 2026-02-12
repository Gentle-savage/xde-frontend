"use client";

import { useEffect, useState } from "react";

const backend = "https://xde-backend.onrender.com";

export default function AdminPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState("dashboard");
  const [shipments, setShipments] = useState<any[]>([]);
  const [createData, setCreateData] = useState<any>({});
  const [updateData, setUpdateData] = useState<any>({});

  const fetchShipments = async () => {
    const res = await fetch(`${backend}/all-shipments`);
    const data = await res.json();
    setShipments(data);
  };

  useEffect(() => {
    if (loggedIn) fetchShipments();
  }, [loggedIn]);

  const login = async () => {
    const res = await fetch(`${backend}/admin-login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (!res.ok) return alert("Invalid password");
    setLoggedIn(true);
  };

  const createShipment = async () => {
    await fetch(`${backend}/create-shipment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(createData),
    });
    fetchShipments();
  };

  const updateShipment = async () => {
    await fetch(`${backend}/update-status/${updateData.trackingNumber}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updateData),
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
    <div className="flex min-h-screen bg-gray-100">

      <aside className="w-64 bg-red-700 text-white p-6">
        <h1 className="text-2xl font-bold mb-10">XDE Admin</h1>
        <ul className="space-y-4">
          <li onClick={()=>setActiveTab("dashboard")} className="cursor-pointer">Dashboard</li>
          <li onClick={()=>setActiveTab("create")} className="cursor-pointer">Create Shipment</li>
          <li onClick={()=>setActiveTab("update")} className="cursor-pointer">Update Shipment</li>
          <li onClick={()=>setActiveTab("all")} className="cursor-pointer">All Shipments</li>
        </ul>
        <button
          onClick={()=>setLoggedIn(false)}
          className="mt-10 bg-black px-4 py-2 rounded w-full"
        >
          Logout
        </button>
      </aside>

      <main className="flex-1 p-10">

        {activeTab==="dashboard" && (
          <h2 className="text-3xl font-bold text-red-600">
            Total Shipments: {shipments.length}
          </h2>
        )}

        {activeTab==="create" && (
          <div>
            <input placeholder="Sender" onChange={(e)=>setCreateData({...createData,senderName:e.target.value})}/>
            <button onClick={createShipment}>Create</button>
          </div>
        )}

        {activeTab==="all" && (
          <table className="w-full bg-white shadow mt-6">
            <thead className="bg-red-600 text-white">
              <tr>
                <th>Tracking</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {shipments.map((s,i)=>(
                <tr key={i}>
                  <td>{s.trackingNumber}</td>
                  <td>{s.status}</td>
                  <td>
                    <button onClick={()=>deleteShipment(s.trackingNumber)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

      </main>
    </div>
  );
}
