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
    <div className="bg-white text-gray-800">

      {/* HERO */}
      <section className="relative h-[700px] flex items-center justify-center text-white text-center">
        <img
          src="https://images.unsplash.com/photo-1601582589901-1d1a7c5e0b52?auto=format&fit=crop&w=1600&q=80"
          className="absolute inset-0 w-full h-full object-cover"
          alt="Global Logistics"
        />
        <div className="absolute inset-0 bg-black/70"></div>

        <div className="relative z-10 max-w-4xl px-6">
          <h1 className="text-6xl font-bold mb-6">
            Global Freight & Express Logistics
          </h1>
          <p className="text-xl mb-8">
            Delivering Excellence Across Continents Since 2015
          </p>

          <div className="bg-white p-6 rounded-xl shadow-xl flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Enter Tracking Number"
              className="flex-1 border p-4 rounded text-black"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
            />
            <button
              onClick={trackShipment}
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded font-semibold"
            >
              Track Shipment
            </button>
          </div>

          {error && <p className="text-red-400 mt-4">{error}</p>}
        </div>
      </section>

      {/* TRACKING RESULT */}
      {shipment && (
        <section className="max-w-6xl mx-auto bg-gray-50 p-10 mt-16 rounded-xl shadow">
          <h2 className="text-2xl font-bold text-red-600 mb-6">
            Shipment Details
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Detail label="Tracking" value={shipment.trackingNumber} />
            <Detail label="Sender" value={shipment.senderName} />
            <Detail label="Receiver" value={shipment.receiverName} />
            <Detail label="Origin" value={shipment.origin} />
            <Detail label="Destination" value={shipment.destination} />
            <Detail label="Current Location" value={shipment.currentLocation} />
            <Detail label="Status" value={shipment.status} />
          </div>
        </section>
      )}

      {/* GLOBAL STATS */}
      <section className="py-20 bg-gray-900 text-white text-center">
        <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          <Stat title="120+" desc="Countries Served" />
          <Stat title="50,000+" desc="Shipments Delivered" />
          <Stat title="24/7" desc="Customer Support" />
          <Stat title="98%" desc="On-Time Delivery Rate" />
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-20 bg-gray-100">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-red-600">
            Comprehensive Logistics Solutions
          </h2>
        </div>

        <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto px-6">
          <Service image="https://images.unsplash.com/photo-1509395176047-4a66953fd231?auto=format&fit=crop&w=800&q=80" title="Air Freight" />
          <Service image="https://images.unsplash.com/photo-1566203092180-2b9c75e3a8f1?auto=format&fit=crop&w=800&q=80" title="Road Transport" />
          <Service image="https://images.unsplash.com/photo-1581091870627-3e7c1fbaad8c?auto=format&fit=crop&w=800&q=80" title="Warehousing" />
          <Service image="https://images.unsplash.com/photo-1509395176047-4a66953fd231?auto=format&fit=crop&w=800&q=80" title="Sea Freight" />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black text-white py-10 text-center">
        <p>© 2015 XDE Logistics Group. All rights reserved.</p>
      </footer>

    </div>
  );
}

function Detail({ label, value }: any) {
  return (
    <div>
      <p className="text-xs uppercase text-gray-400 mb-1">{label}</p>
      <p className="font-semibold">{value}</p>
    </div>
  );
}

function Stat({ title, desc }: any) {
  return (
    <div>
      <h3 className="text-4xl font-bold text-red-500">{title}</h3>
      <p className="mt-2">{desc}</p>
    </div>
  );
}

function Service({ image, title }: any) {
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-xl transition">
      <img src={image} className="h-48 w-full object-cover rounded-t-xl" />
      <div className="p-6 text-center">
        <h3 className="text-lg font-semibold text-red-600">{title}</h3>
      </div>
    </div>
  );
}
