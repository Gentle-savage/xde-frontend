"use client";

import { useState } from "react";

export default function Home() {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [shipment, setShipment] = useState<any>(null);
  const [error, setError] = useState("");

  const backend = "https://xde-backend.onrender.com";

  const trackShipment = async () => {
    try {
      const res = await fetch(`${backend}/track/${trackingNumber}`);
      const data = await res.json();

      if (!res.ok) {
        setError("Tracking number not found");
        setShipment(null);
      } else {
        setShipment(data);
        setError("");
      }
    } catch {
      setError("Server error");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">

      <section className="relative h-[600px] flex items-center justify-center text-white text-center">
        <img
          src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1600&q=80"
          className="absolute inset-0 w-full h-full object-cover"
          alt="Logistics"
        />
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative z-10 max-w-4xl px-6">
          <h1 className="text-5xl font-bold mb-6">
            XDE Logistics
          </h1>
          <p className="text-xl mb-8">
            Nationwide Fast & Reliable Delivery Across the World
          </p>

          <div className="bg-white p-6 rounded-xl shadow-xl flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Enter Tracking Number"
              className="flex-1 border p-3 rounded text-black"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
            />
            <button
              onClick={trackShipment}
              className="bg-red-600 text-white px-6 py-3 rounded font-semibold"
            >
              Track Package
            </button>
          </div>

          {error && <p className="text-red-300 mt-4">{error}</p>}
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-8 text-center">
        <p>© 2015 XDE Logistics Group. All rights reserved.</p>
      </footer>

    </div>
  );
}
