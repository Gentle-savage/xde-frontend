"use client";

import { useEffect, useState } from "react";

const backend = "https://xde-backend.onrender.com";

export default function AdminPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [shipments, setShipments] = useState<any[]>([]);
  const [formData, setFormData] = useState<any>({});

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
      body: JSON.stringify(formData),
    });

    alert("Shipment Created");
    fetchShipments();
  };

  const updateStatus = async (trackingNumber: string) => {
    await fetch(`${backend}/update-status/${trackingNumber}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        status: formData.status,
        currentLocation: formData.currentLocation,
        message: formData.message,
      }),
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
          XDE Enterprise Dashboard
        </h1>
        <button
          onClick={() => setLoggedIn(false)}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      {/* CREATE SHIPMENT FORM */}
      <div className="bg-white p-8 rounded shadow mb-12">
        <h2 className="text-xl font-bold mb-6 text-red-600">
          Create Shipment
        </h2>

        <div className="grid md:grid-cols-2 gap-6">

          <input placeholder="Sender Name"
            onChange={(e)=>setFormData({...formData,senderName:e.target.value})}
            className="border p-3 rounded"/>

          <input placeholder="Sender Address"
            onChange={(e)=>setFormData({...formData,senderAddress:e.target.value})}
            className="border p-3 rounded"/>

          <input placeholder="Sender Phone"
            onChange={(e)=>setFormData({...formData,senderPhone:e.target.value})}
            className="border p-3 rounded"/>

          <input placeholder="Receiver Name"
            onChange={(e)=>setFormData({...formData,receiverName:e.target.value})}
            className="border p-3 rounded"/>

          <input placeholder="Receiver Address"
            onChange={(e)=>setFormData({...formData,receiverAddress:e.target.value})}
            className="border p-3 rounded"/>

          <input placeholder="Receiver Phone"
            onChange={(e)=>setFormData({...formData,receiverPhone:e.target.value})}
            className="border p-3 rounded"/>

          <input placeholder="Origin"
            onChange={(e)=>setFormData({...formData,origin:e.target.value})}
            className="border p-3 rounded"/>

          <input placeholder="Destination"
            onChange={(e)=>setFormData({...formData,destination:e.target.value})}
            className="border p-3 rounded"/>

          <input placeholder="Current Location"
            onChange={(e)=>setFormData({...formData,currentLocation:e.target.value})}
            className="border p-3 rounded"/>

          <input type="date"
            onChange={(e)=>setFormData({...formData,estimatedDelivery:e.target.value})}
            className="border p-3 rounded"/>

        </div>

        <button
          onClick={createShipment}
          className="mt-6 bg-red-600 text-white px-6 py-3 rounded"
        >
          Create Shipment
        </button>
      </div>

      {/* ALL SHIPMENTS */}
      <div className="bg-white p-8 rounded shadow">
        <h2 className="text-xl font-bold mb-6 text-red-600">
          All Shipments
        </h2>

        <table className="w-full">
          <thead className="bg-red-600 text-white">
            <tr>
              <th>Tracking</th>
              <th>Status</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            {shipments.map((s,i)=>(
              <tr key={i} className="border-b">
                <td>{s.trackingNumber}</td>
                <td>{s.status}</td>
                <td>
                  <select
                    onChange={(e)=>setFormData({...formData,status:e.target.value})}
                    className="border p-2 mr-2"
                  >
                    <option>Processing</option>
                    <option>In Transit</option>
                    <option>Out for Delivery</option>
                    <option>Delivered</option>
                  </select>
                  <button
                    onClick={()=>updateStatus(s.trackingNumber)}
                    className="bg-black text-white px-3 py-1 rounded"
                  >
                    Update
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
