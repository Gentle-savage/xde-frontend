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
    } catch (err) {
      setError("Server error");
    }
  };

  return (
    <div className="bg-gray-100 text-gray-800">

      {/* HERO SECTION */}
      <section className="relative h-[600px] flex items-center justify-center text-white text-center">
        <img
          src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1600&q=80"
          alt="Logistics warehouse"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative z-10 max-w-4xl px-6">
          <h1 className="text-5xl font-extrabold mb-6">
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
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded font-semibold"
            >
              Track Package
            </button>
          </div>

          {error && <p className="text-red-300 mt-4">{error}</p>}
        </div>
      </section>

      {/* TRACKING RESULT */}
      {shipment && (
        <section className="max-w-5xl mx-auto bg-white p-8 mt-10 rounded-xl shadow">
          <h2 className="text-2xl font-bold text-red-600 mb-6">
            Shipment Details
          </h2>
          <p><strong>Tracking:</strong> {shipment.trackingNumber}</p>
          <p><strong>Sender:</strong> {shipment.senderName}</p>
          <p><strong>Receiver:</strong> {shipment.receiverName}</p>
          <p><strong>Status:</strong> {shipment.status}</p>
          <p><strong>Current Location:</strong> {shipment.currentLocation}</p>
          <p><strong>Estimated Delivery:</strong> {new Date(shipment.estimatedDelivery).toLocaleDateString()}</p>
        </section>
      )}

      {/* SERVICES SECTION */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold text-red-600">Our Services</h2>
          <p className="text-gray-600 mt-4">
            Global logistics solutions tailored to your business needs.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto px-6">
          <ServiceCard
            image="https://images.unsplash.com/photo-1601582589901-1d1a7c5e0b52?auto=format&fit=crop&w=800&q=80"
            title="Air Freight"
            desc="Fast international air cargo delivery worldwide."
          />
          <ServiceCard
            image="https://images.unsplash.com/photo-1509395176047-4a66953fd231?auto=format&fit=crop&w=800&q=80"
            title="Sea Freight"
            desc="Secure and cost-efficient ocean transportation."
          />
          <ServiceCard
            image="https://images.unsplash.com/photo-1566203092180-2b9c75e3a8f1?auto=format&fit=crop&w=800&q=80"
            title="Road Transport"
            desc="Reliable cross-border trucking services."
          />
          <ServiceCard
            image="https://images.unsplash.com/photo-1581091870627-3e7c1fbaad8c?auto=format&fit=crop&w=800&q=80"
            title="Warehousing"
            desc="Secure storage and inventory management."
          />
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-20 bg-white text-center">
        <h2 className="text-3xl font-bold text-red-600 mb-10">
          Why Choose XDE Logistics?
        </h2>

        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto px-6">
          <Feature title="Global Network" desc="Operating across 120+ countries worldwide." />
          <Feature title="24/7 Support" desc="Dedicated customer service team ready anytime." />
          <Feature title="Secure & Reliable" desc="Advanced tracking and secure handling systems." />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-white py-8 text-center">
        <p>© 2015 XDE Logistics Group. All rights reserved.</p>
      </footer>

    </div>
  );
}

/* COMPONENTS */

function ServiceCard({ image, title, desc }: any) {
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition">
      <img src={image} alt={title} className="h-48 w-full object-cover rounded-t-xl" />
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-3 text-red-600">{title}</h3>
        <p className="text-gray-600 text-sm">{desc}</p>
      </div>
    </div>
  );
}

function Feature({ title, desc }: any) {
  return (
    <div>
      <h4 className="text-xl font-semibold mb-3">{title}</h4>
      <p className="text-gray-600">{desc}</p>
    </div>
  );
}
