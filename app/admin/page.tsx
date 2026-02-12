"use client";

import { useEffect, useState } from "react";

const backend = "https://xde-backend.onrender.com";

export default function AdminPage() {
  const [shipments, setShipments] = useState<any[]>([]);
  const [form, setForm] = useState({
    senderName: "",
    receiverName: "",
    origin: "",
    destination: "",
    status: "Processing",
    currentLocation: "",
  });

  const fetchShipments = async () => {
    const res = await fetch(`${backend}/all-shipments`);
    const data = await res.json();
    setShipments(data);
  };

  useEffect(() => {
    fetchShipments();
  }, []);

  const createShipment = async () => {
    await fetch(`${backend}/create-shipment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    fetchShipments();
  };

  const deleteShipment = async (id: string) => {
    await fetch(`${backend}/delete-shipment/${id}`, {
      method: "DELETE",
    });

    fetchShipments();
  };

  return (
    <div className="bg-slate-100 min-h-screen p-10">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold text-slate-900">
          XDE Admin Dashboard
        </h1>
        <button
          onClick={() => {
            localStorage.removeItem("adminToken");
            window.location.href = "/admin/login";
          }}
          className="bg-slate-900 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      {/* CREATE SHIPMENT */}
      <div className="bg-white p-8 rounded-xl shadow mb-12">
        <h2 className="text-xl font-bold mb-6 text-slate-800">
          Create Shipment
        </h2>

        <div className="grid grid-cols-2 gap-4">
          <input
            placeholder="Sender Name"
            className="border p-3 rounded"
            onChange={(e) =>
              setForm({ ...form, senderName: e.target.value })
            }
          />
          <input
            placeholder="Receiver Name"
            className="border p-3 rounded"
            onChange={(e) =>
              setForm({ ...form, receiverName: e.target.value })
            }
          />
          <input
            placeholder="Origin"
            className="border p-3 rounded"
            onChange={(e) =>
              setForm({ ...form, origin: e.target.value })
            }
          />
          <input
            placeholder="Destination"
            className="border p-3 rounded"
            onChange={(e) =>
              setForm({ ...form, destination: e.target.value })
            }
          />
          <input
            placeholder="Current Location"
            className="border p-3 rounded"
            onChange={(e) =>
              setForm({ ...form, currentLocation: e.target.value })
            }
          />

          <select
            className="border p-3 rounded"
            onChange={(e) =>
              setForm({ ...form, status: e.target.value })
            }
          >
            <option>Processing</option>
            <option>In Transit</option>
            <option>Out for Delivery</option>
            <option>Delivered</option>
          </select>
        </div>

        <button
          onClick={createShipment}
          className="mt-6 bg-red-600 text-white px-6 py-3 rounded-lg"
        >
          Create Shipment
        </button>
      </div>

      {/* ALL SHIPMENTS */}
      <div className="bg-white p-8 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-6 text-slate-800">
          All Shipments
        </h2>

        <table className="w-full">
          <thead>
            <tr className="bg-slate-900 text-white text-left">
              <th className="p-3">Tracking + Receiver</th>
              <th className="p-3">Status</th>
              <th className="p-3">Location</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {shipments.map((s) => (
              <tr key={s._id} className="border-b">
                <td className="p-3">
                  <div className="font-semibold text-slate-900">
                    {s.trackingNumber}
                  </div>
                  <div className="text-sm text-gray-500">
                    Receiver: {s.receiverName}
                  </div>
                </td>

                <td className="p-3 text-slate-700">
                  {s.status}
                </td>

                <td className="p-3 text-slate-700">
                  {s.currentLocation}
                </td>

                <td className="p-3">
                  <button
                    onClick={() => deleteShipment(s._id)}
                    className="bg-red-600 text-white px-4 py-1 rounded"
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
