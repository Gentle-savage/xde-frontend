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
  const [activeTab, setActiveTab] = useState("dashboard");
  const [shipments, setShipments] = useState<any[]>([]);
  const [createData, setCreateData] = useState<any>({});
  const [updateData, setUpdateData] = useState<any>({});
  const [response, setResponse] = useState("");

  const backend = "https://xde-backend.onrender.com";

  const fetchShipments = async () => {
    const res = await fetch(`${backend}/all-shipments`);
    const data = await res.json();
    setShipments(data);
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

  const total = shipments.length;

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* SIDEBAR */}
      <aside className="w-64 bg-red-700 text-white p-6">
        <h1 className="text-2xl font-bold mb-10">XDE Admin</h1>

        <ul className="space-y-4">
          <li
            onClick={() => setActiveTab("dashboard")}
            className={`cursor-pointer ${activeTab === "dashboard" ? "font-bold" : ""}`}
          >
            Dashboard
          </li>

          <li
            onClick={() => setActiveTab("create")}
            className={`cursor-pointer ${activeTab === "create" ? "font-bold" : ""}`}
          >
            Create Shipment
          </li>

          <li
            onClick={() => setActiveTab("update")}
            className={`cursor-pointer ${activeTab === "update" ? "font-bold" : ""}`}
          >
            Update Shipment
          </li>

          <li
            onClick={() => setActiveTab("all")}
            className={`cursor-pointer ${activeTab === "all" ? "font-bold" : ""}`}
          >
            All Shipments
          </li>
        </ul>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-10">

        {activeTab === "dashboard" && (
          <div>
            <h2 className="text-3xl font-bold mb-6 text-red-600">
              Dashboard Overview
            </h2>
            <div className="bg-white p-6 rounded shadow">
              <p className="text-lg">Total Shipments: {total}</p>
            </div>
          </div>
        )}

        {activeTab === "create" && (
          <div>
            <h2 className="text-2xl font-bold mb-6 text-red-600">
              Create Shipment
            </h2>

            <div className="bg-white p-6 rounded shadow space-y-4">
              <input placeholder="Sender Name" className="border p-3 w-full rounded"
                onChange={(e)=>setCreateData({...createData,senderName:e.target.value})}/>
              <input placeholder="Receiver Name" className="border p-3 w-full rounded"
                onChange={(e)=>setCreateData({...createData,receiverName:e.target.value})}/>
              <input placeholder="Origin" className="border p-3 w-full rounded"
                onChange={(e)=>setCreateData({...createData,origin:e.target.value})}/>
              <input placeholder="Destination" className="border p-3 w-full rounded"
                onChange={(e)=>setCreateData({...createData,destination:e.target.value})}/>
              <input placeholder="Current Location" className="border p-3 w-full rounded"
                onChange={(e)=>setCreateData({...createData,currentLocation:e.target.value})}/>
              <input type="date" className="border p-3 w-full rounded"
                onChange={(e)=>setCreateData({...createData,estimatedDelivery:e.target.value})}/>

              <button
                onClick={handleCreate}
                className="bg-red-600 text-white px-6 py-3 rounded"
              >
                Create Shipment
              </button>
            </div>
          </div>
        )}

        {activeTab === "update" && (
          <div>
            <h2 className="text-2xl font-bold mb-6 text-red-600">
              Update Shipment
            </h2>

            <div className="bg-white p-6 rounded shadow space-y-4">
              <input placeholder="Tracking Number" className="border p-3 w-full rounded"
                onChange={(e)=>setUpdateData({...updateData,trackingNumber:e.target.value})}/>

              <select className="border p-3 w-full rounded"
                onChange={(e)=>setUpdateData({...updateData,status:e.target.value})}>
                <option>Processing</option>
                <option>In Transit</option>
                <option>Arrived at Hub</option>
                <option>Out for Delivery</option>
                <option>Delivered</option>
              </select>

              <input placeholder="Current Location" className="border p-3 w-full rounded"
                onChange={(e)=>setUpdateData({...updateData,currentLocation:e.target.value})}/>

              <input placeholder="Status Message" className="border p-3 w-full rounded"
                onChange={(e)=>setUpdateData({...updateData,message:e.target.value})}/>

              <button
                onClick={handleUpdate}
                className="bg-red-600 text-white px-6 py-3 rounded"
              >
                Update Shipment
              </button>
            </div>
          </div>
        )}

        {activeTab === "all" && (
          <div>
            <h2 className="text-2xl font-bold mb-6 text-red-600">
              All Shipments
            </h2>

            <div className="bg-white p-6 rounded shadow overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-red-600 text-white">
                  <tr>
                    <th className="p-3">Tracking</th>
                    <th className="p-3">Sender</th>
                    <th className="p-3">Receiver</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {shipments.map((s, i) => (
                    <tr key={i} className="border-b">
                      <td className="p-3">{s.trackingNumber}</td>
                      <td className="p-3">{s.senderName}</td>
                      <td className="p-3">{s.receiverName}</td>
                      <td className="p-3">{s.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
