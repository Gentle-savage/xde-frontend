"use client";

import { useState, useEffect } from "react";

const API_URL = "https://xde-backend.onrender.com";

export default function AdminPage() {
  const [shipments, setShipments] = useState<any[]>([]);
  const [form, setForm] = useState({
    trackingNumber: "",
    senderName: "",
    senderAddress: "",
    senderPhone: "",
    receiverName: "",
    receiverAddress: "",
    receiverPhone: "",
    origin: "",
    destination: "",
    status: "Processing",
    currentLocation: "",
    estimatedDelivery: "",
  });

  useEffect(() => {
    fetchShipments();
  }, []);

  const fetchShipments = async () => {
    const res = await fetch(`${API_URL}/shipments`);
    const data = await res.json();
    setShipments(data);
  };

  const createShipment = async () => {
    await fetch(`${API_URL}/create-shipment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    fetchShipments();
  };

  const deleteShipment = async (id: string) => {
    await fetch(`${API_URL}/delete-shipment/${id}`, {
      method: "DELETE",
    });

    fetchShipments();
  };

  return (
    <div style={{ padding: 40, fontFamily: "Arial" }}>
      <h1 style={{ color: "#1e293b" }}>XDE Admin Dashboard</h1>

      {/* CREATE SHIPMENT */}
      <div style={{ marginTop: 40 }}>
        <h2>Create Shipment</h2>

        {Object.keys(form).map((key) => (
          <input
            key={key}
            placeholder={key}
            value={(form as any)[key]}
            onChange={(e) =>
              setForm({ ...form, [key]: e.target.value })
            }
            style={{
              display: "block",
              marginBottom: 10,
              padding: 10,
              width: "400px",
            }}
          />
        ))}

        <button
          onClick={createShipment}
          style={{
            padding: 12,
            backgroundColor: "#0f172a",
            color: "white",
            border: "none",
            borderRadius: 6,
            cursor: "pointer",
          }}
        >
          Create Shipment
        </button>
      </div>

      {/* ALL SHIPMENTS */}
      <div style={{ marginTop: 60 }}>
        <h2>All Shipments</h2>

        <table
          style={{
            width: "100%",
            marginTop: 20,
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#0f172a", color: "white" }}>
              <th style={{ padding: 10 }}>Tracking</th>
              <th>Receiver</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {shipments.map((s) => (
              <tr key={s._id}>
                <td style={{ padding: 10 }}>{s.trackingNumber}</td>
                <td>{s.receiverName}</td>
                <td>{s.status}</td>
                <td>
                  <button
                    onClick={() => deleteShipment(s._id)}
                    style={{
                      padding: 8,
                      backgroundColor: "red",
                      color: "white",
                      border: "none",
                      borderRadius: 4,
                      cursor: "pointer",
                    }}
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
