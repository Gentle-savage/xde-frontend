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

function AdminDashboard() {
  const [shipments, setShipments] = useState<any[]>([]);
  const [createData, setCreateData] = useState<any>({});
  const [updateData, setUpdateData] = useState<any>({});
  const [response, setResponse] = useState("");

  const backend = "https://xde-backend.onrender.com";

  const fetchShipments = async () => {
    try {
      const res = await fetch(`${backend}/all-shipments`);
      const data = await res.json();
      setShipments(data);
    } catch (err) {
      console.log("Error fetching shipments");
    }
  };

  useEffect(() => {
    fetchShipments();
  }, []);

  const handleCreate = async () => {
    const res = await fetch(`${backend}/create-shipment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(createData),
    });

    const data = await res.json();
    setResponse(JSON.stringify(data, null, 2));
    fetchShipments();
  };

  const handleUpdate = async () => {
    const res = await fetch(
      `${backend}/update-status/${updateData.trackingNumber}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: updateData.status,
          currentLocation: updateData.currentLocation,
          message: updateData.message,
        }),
      }
    );

    const data = await res.json();
    setResponse(JSON.stringify(data, null, 2));
    fetchShipments();
  };

  return (
    <div className="flex min-h-screen bg-gray-100">

      <aside className="w-64 bg-red-700 text-white p-6">
        <h1 className="text-2xl font-bold mb-10">XDE Admin</h1>
        <ul className="space-y-4">
          <li className="font-semibold">Dashboard</li>
          <li>Create Shipment</li>
          <li>Update Shipment</li>
          <li>All Shipments</li>
        </ul>
      </aside>

      <main className="flex-1 p-10">

        <h2 className="text-3xl font-bold mb-8 text-red-600">
          Logistics Control Center
        </h2>

        <div className="bg-white p-8 rounded-xl shadow mb-10">
          <h3 className="text-xl font-semibold mb-6 text-red-600">
            Create Shipment
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <input placeholder="Sender Name" className="border p-3 rounded"
              onChange={(e)=>setCreateData({...createData,senderName:e.target.value})}/>
            <input placeholder="Receiver Name" className="border p-3 rounded"
              onChange={(e)=>setCreateData({...createData,receiverName:e.target.value})}/>
            <input placeholder="Origin" className="border p-3 rounded"
              onChange={(e)=>setCreateData({...createData,origin:e.target.value})}/>
            <input placeholder="Destination" className="border p-3 rounded"
              onChange={(e)=>setCreateData({...createData,destination:e.target.value})}/>
            <input placeholder="Current Location" className="border p-3 rounded"
              onChange={(e)=>setCreateData({...createData,currentLocation:e.target.value})}/>
            <input type="date" className="border p-3 rounded"
              onChange={(e)=>setCreateData({...createData,estimatedDelivery:e.target.value})}/>
          </div>

          <button
            onClick={handleCreate}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold"
          >
            Create Shipment
          </button>
        </div>

        <div className="bg-black text-green-400 p-6 rounded-xl">
          <pre className="text-sm">{response}</pre>
        </div>

      </main>
    </div>
  );
}
