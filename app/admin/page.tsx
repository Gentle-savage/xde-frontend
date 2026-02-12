"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";

const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);

const backend = "https://xde-backend.onrender.com";

export default function Home() {
  const [tracking, setTracking] = useState("");
  const [shipment, setShipment] = useState<any>(null);

  const trackShipment = async () => {
    const res = await fetch(`${backend}/track/${tracking}`);
    if (!res.ok) return alert("Tracking number not found");
    const data = await res.json();
    setShipment(data);
  };

  return (
    <div className="bg-white text-gray-900">

      {/* NAVBAR WITH MEGA MENU */}
      <nav className="flex justify-between items-center px-12 py-6 border-b relative">
        <h1 className="text-2xl font-bold text-purple-700">
          XDE Logistics
        </h1>

        <div className="group relative">
          <button className="font-medium hover:text-purple-700">
            Services
          </button>

          <div className="absolute hidden group-hover:block bg-white shadow-xl p-10 mt-4 w-[600px] rounded-xl transition-all duration-300">
            <div className="grid grid-cols-2 gap-8 text-sm">
              <div>
                <h4 className="font-semibold mb-2 text-purple-700">Freight</h4>
                <p>Air Freight</p>
                <p>Sea Freight</p>
                <p>Road Transport</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-purple-700">Logistics</h4>
                <p>Warehousing</p>
                <p>Supply Chain</p>
                <p>Express Delivery</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-x-8 text-sm font-medium">
          <a href="/login">Customer Login</a>
          <a href="/careers">Careers</a>
          <a href="/contact">Contact</a>
          <a href="/admin" className="bg-purple-700 text-white px-4 py-2 rounded">
            Admin
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="px-12 py-28 bg-gray-50 transition-all duration-700">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">

          <div className="animate-fadeIn">
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
          </div>

          <img
            src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1000&q=80"
            className="rounded-xl shadow-xl"
          />
        </div>
      </section>

      {/* LIVE SERVICE REGION MAP */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-purple-700 mb-8 text-center">
            Global Service Coverage
          </h3>

          <MapContainer
            center={[20, 0]}
            zoom={2}
            style={{ height: "400px", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </MapContainer>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-white py-10 text-center">
        © 2015 XDE Logistics Group. All rights reserved.
      </footer>

    </div>
  );
}
