"use client";

import { useState } from "react";

const backend = "https://xde-backend.onrender.com";

export default function Home() {
  const [tracking, setTracking] = useState("");
  const [shipment, setShipment] = useState<any>(null);
  const [error, setError] = useState("");

  const trackShipment = async () => {
    if (!tracking) return;

    try {
      const res = await fetch(`${backend}/track/${tracking}`);
      const data = await res.json();

      if (!res.ok) {
        setShipment(null);
        setError("Tracking number not found");
      } else {
        setShipment(data);
        setError("");
      }
    } catch {
      setError("Server error");
    }
  };

  return (
    <div className="bg-white text-gray-900">

      {/* NAVBAR */}
      <nav className="flex justify-between items-center px-12 py-6 border-b">
        <h1 className="text-2xl font-bold text-purple-700">
          XDE Logistics
        </h1>

        <div className="space-x-8 text-sm font-medium">
          <a href="/careers">Careers</a>
          <a href="/contact">Contact</a>
          <a href="/login">Customer Login</a>
          <a href="/admin" className="bg-purple-700 text-white px-4 py-2 rounded">
            Admin
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="px-12 py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">

          <div>
            <h2 className="text-5xl font-bold leading-tight mb-6">
              Global Delivery Without Limits
            </h2>

            <p className="text-gray-600 mb-8 text-lg">
              Enterprise-level logistics and freight solutions trusted
              by businesses worldwide.
            </p>

            <div className="flex gap-4">
              <input
                placeholder="Enter Tracking Number"
                className="flex-1 border p-4 rounded-lg"
                onChange={(e) => setTracking(e.target.value)}
              />
              <button
                onClick={trackShipment}
                className="bg-purple-700 text-white px-6 py-4 rounded-lg"
              >
                Track
              </button>
            </div>

            {error && (
              <p className="text-red-600 mt-4">{error}</p>
            )}
          </div>

          <img
            src="https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=1000&q=80"
            alt="Global logistics"
            className="rounded-xl shadow-xl"
          />

        </div>
      </section>

      {/* SERVICES */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h3 className="text-3xl font-bold text-purple-700">
            Our Global Services
          </h3>
        </div>

        <div className="grid md:grid-cols-4 gap-10 max-w-6xl mx-auto px-12">
          <Service title="Air Freight" />
          <Service title="Sea Freight" />
          <Service title="Road Transport" />
          <Service title="Warehousing" />
        </div>
      </section>

      {/* TRACK RESULT */}
      {shipment && (
        <section className="max-w-6xl mx-auto mt-16 p-10 border rounded-xl shadow">
          <h3 className="text-2xl font-bold mb-8 text-purple-700">
            Shipment Details
          </h3>

          <div className="grid md:grid-cols-3 gap-8 text-sm">
            <Info label="Tracking Number" value={shipment.trackingNumber} />
            <Info label="Sender" value={shipment.senderName} />
            <Info label="Receiver" value={shipment.receiverName} />
            <Info label="Origin" value={shipment.origin} />
            <Info label="Destination" value={shipment.destination} />
            <Info label="Current Location" value={shipment.currentLocation} />
            <Info label="Status" value={shipment.status} />
          </div>
        </section>
      )}

      <footer className="bg-gray-900 text-white py-10 text-center mt-20">
        © 2015 XDE Logistics Group. All rights reserved.
      </footer>

    </div>
  );
}

function Service({ title }: any) {
  return (
    <div className="p-8 border rounded-xl hover:shadow-lg transition">
      <h4 className="font-semibold text-lg text-purple-700 mb-3">
        {title}
      </h4>
      <p className="text-gray-600 text-sm">
        Professional and secure global transportation solutions.
      </p>
    </div>
  );
}

function Info({ label, value }: any) {
  return (
    <div>
      <p className="text-gray-400 uppercase text-xs mb-1">{label}</p>
      <p className="font-semibold">{value}</p>
    </div>
  );
}
