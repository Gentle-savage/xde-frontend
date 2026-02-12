"use client";

import { useState } from "react";

const backend = "https://xde-backend.onrender.com";

export default function Home() {
  const [tracking, setTracking] = useState("");
  const [shipment, setShipment] = useState<any>(null);
  const [error, setError] = useState("");

  const trackShipment = async () => {
    if (!tracking) return;

    const res = await fetch(`${backend}/track/${tracking}`);
    const data = await res.json();

    if (!res.ok) {
      setShipment(null);
      setError("Tracking number not found");
    } else {
      setShipment(data);
      setError("");
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
          <a href="#" className="hover:text-purple-700">Services</a>
          <a href="#" className="hover:text-purple-700">Tracking</a>
          <a href="#" className="hover:text-purple-700">About</a>
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
              Delivering Reliability Across the Globe
            </h2>

            <p className="text-gray-600 mb-8 text-lg">
              Trusted logistics partner providing fast, secure, and
              efficient freight solutions worldwide.
            </p>

            <div className="flex gap-4">
              <input
                placeholder="Enter Tracking Number"
                className="flex-1 border p-4 rounded-lg"
                onChange={(e) => setTracking(e.target.value)}
              />
              <button
                onClick={trackShipment}
                className="bg-purple-700 hover:bg-purple-800 text-white px-6 py-4 rounded-lg"
              >
                Track
              </button>
            </div>

            {error && (
              <p className="text-red-600 mt-4">{error}</p>
            )}
          </div>

          <img
            src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1000&q=80"
            alt="Logistics"
            className="rounded-xl shadow-xl"
          />

        </div>
      </section>

      {/* TRACKING RESULT */}
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

      {/* SERVICES */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto text-center mb-16">
          <h3 className="text-3xl font-bold mb-4 text-purple-700">
            Our Services
          </h3>
          <p className="text-gray-600">
            Comprehensive logistics solutions for every industry.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-10 max-w-6xl mx-auto px-12">
          <Service title="Air Freight" />
          <Service title="Road Transport" />
          <Service title="Sea Freight" />
          <Service title="Warehousing" />
        </div>
      </section>

      {/* STATS */}
      <section className="bg-purple-700 text-white py-20">
        <div className="grid md:grid-cols-4 gap-12 text-center max-w-6xl mx-auto">
          <Stat number="120+" text="Countries Served" />
          <Stat number="50K+" text="Deliveries Completed" />
          <Stat number="24/7" text="Customer Support" />
          <Stat number="98%" text="On-Time Delivery" />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-white py-10 text-center">
        <p>© 2015 XDE Logistics Group. All rights reserved.</p>
      </footer>

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

function Service({ title }: any) {
  return (
    <div className="p-8 border rounded-xl hover:shadow-lg transition">
      <h4 className="font-semibold text-lg text-purple-700 mb-3">
        {title}
      </h4>
      <p className="text-gray-600 text-sm">
        Professional and secure global transportation services.
      </p>
    </div>
  );
}

function Stat({ number, text }: any) {
  return (
    <div>
      <h4 className="text-4xl font-bold">{number}</h4>
      <p className="mt-2 opacity-80">{text}</p>
    </div>
  );
}
