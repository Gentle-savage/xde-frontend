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
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import("react-leaflet").then((mod) => mod.Popup),
  { ssr: false }
);

const backend = "https://xde-backend.onrender.com";

export default function Home() {
  const [tracking, setTracking] = useState("");
  const [shipment, setShipment] = useState<any>(null);

  const trackPackage = async () => {
    if (!tracking) return;

    const res = await fetch(`${backend}/track/${tracking}`);
    if (!res.ok) {
      alert("Tracking number not found");
      return;
    }
    const data = await res.json();
    setShipment(data);
  };

  const getCoordinates = () => {
    if (!shipment) return [52.2297, 21.0122]; // Default Warsaw
    if (shipment.currentLocation?.toLowerCase().includes("krakow"))
      return [50.0647, 19.945];
    return [52.2297, 21.0122];
  };

  const stages = [
    "Processing",
    "In Transit",
    "Out for Delivery",
    "Delivered",
  ];

  return (
    <div className="bg-slate-50 min-h-screen">

      {/* HERO */}
      <div className="bg-slate-900 text-white py-28 text-center">
        <h1 className="text-5xl font-bold mb-4 tracking-wide">
          XDE Logistics
        </h1>
        <p className="text-lg opacity-80">
          Nationwide Fast & Reliable Delivery Across the World
        </p>
      </div>

      {/* TRACKING BOX */}
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-xl p-8 -mt-16 relative z-10">
        <div className="flex gap-4">
          <input
            placeholder="Enter Tracking Number"
            className="flex-1 border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            onChange={(e) => setTracking(e.target.value)}
          />
          <button
            onClick={trackPackage}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition"
          >
            Track Package
          </button>
        </div>
      </div>

      {shipment && (
        <div className="max-w-6xl mx-auto mt-16 grid md:grid-cols-2 gap-12">

          {/* TIMELINE */}
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-xl font-bold mb-8 text-slate-800">
              Shipment Timeline
            </h2>

            {stages.map((stage, index) => (
              <div key={index} className="flex items-center mb-6">
                <div
                  className={`w-5 h-5 rounded-full mr-4 ${
                    shipment.status === stage
                      ? "bg-emerald-600 animate-pulse"
                      : "bg-gray-300"
                  }`}
                />
                <div>
                  <p className="text-slate-800 font-medium">{stage}</p>
                  {shipment.status === stage && (
                    <p className="text-sm text-gray-500">
                      Current Location: {shipment.currentLocation}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* MAP */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-bold mb-6 text-slate-800">
              Live Tracking Map
            </h2>

            <MapContainer
              center={getCoordinates() as any}
              zoom={6}
              style={{ height: "320px", width: "100%" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={getCoordinates() as any}>
                <Popup>{shipment.currentLocation}</Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="text-center mt-28 py-10 bg-slate-900 text-white">
        © 2015 XDE Logistics Group. All rights reserved.
      </footer>
    </div>
  );
}
