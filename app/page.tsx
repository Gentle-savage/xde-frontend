"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [shipment, setShipment] = useState<any>(null);
  const [error, setError] = useState("");

  const fetchShipment = async () => {
    try {
      const res = await fetch(
        `https://xde-backend.onrender.com/track/${trackingNumber}`
      );

      if (!res.ok) {
        throw new Error("Tracking number not found");
      }

      const data = await res.json();
      setShipment(data);
      setError("");
    } catch (err) {
      setShipment(null);
      setError("Tracking number not found");
    }
  };

  const handleTrack = () => {
    fetchShipment();
  };

  useEffect(() => {
    if (!shipment) return;

    const interval = setInterval(() => {
      fetchShipment();
    }, 10000);

    return () => clearInterval(interval);
  }, [shipment]);

  const getRouteWidth = () => {
    switch (shipment?.status) {
      case "Processing":
        return "10%";
      case "In Transit":
        return "40%";
      case "Arrived at Hub":
        return "60%";
      case "Out for Delivery":
        return "80%";
      case "Delivered":
        return "100%";
      default:
        return "10%";
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">

      {/* HERO */}
      <section className="relative h-[500px] flex items-center justify-center text-white text-center">
        <img
          src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1600&q=80"
          alt="Logistics warehouse"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative z-10 max-w-3xl px-6">
          <h1 className="text-5xl font-extrabold mb-6">
            XDE Logistics
          </h1>
          <p className="text-xl font-light">
            Nationwide Fast & Reliable Delivery Across the World
          </p>
        </div>
      </section>

      {/* TRACKING CARD */}
      <section className="max-w-5xl mx-auto px-6">
        <div className="bg-white shadow-2xl rounded-xl p-10 -mt-20 border border-gray-100">

          <h2 className="text-2xl font-semibold text-gray-800 mb-8">
            Track Your Shipment
          </h2>

          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <input
              type="text"
              placeholder="Enter Tracking Number"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              className="border border-gray-300 p-4 flex-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />

            <button
              onClick={handleTrack}
              className="bg-red-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-red-700 transition-all duration-200 shadow-md"
            >
              Track Package
            </button>
          </div>

          {error && (
            <p className="text-red-500 font-medium">{error}</p>
          )}

          {shipment && (
            <div className="mt-10 border-t pt-8">

              {/* ROUTE TRACKER */}
              <div className="mb-12 relative flex justify-between items-center">
                <div className="absolute top-4 left-0 w-full h-1 bg-gray-300"></div>
                <div
                  className="absolute top-4 left-0 h-1 bg-red-600 transition-all duration-700"
                  style={{ width: getRouteWidth() }}
                ></div>

                {["Processing","In Transit","Out for Delivery","Delivered"].map((step) => (
                  <div key={step} className="relative z-10 text-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      shipment.status === step ? "bg-red-600 text-white" : "bg-gray-300"
                    }`}>
                      📍
                    </div>
                    <p className="text-xs mt-2">{step}</p>
                  </div>
                ))}
              </div>

              {/* DETAILS */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-700 mb-12">

                <div>
                  <p className="text-sm text-gray-400 uppercase tracking-wide">Tracking Number</p>
                  <p className="font-semibold text-lg">{shipment.trackingNumber}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-400 uppercase tracking-wide">Current Location</p>
                  <p className="font-semibold text-lg">{shipment.currentLocation}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-400 uppercase tracking-wide">Origin</p>
                  <p className="font-semibold text-lg">{shipment.origin}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-400 uppercase tracking-wide">Destination</p>
                  <p className="font-semibold text-lg">{shipment.destination}</p>
                </div>

                {/* NEW FIELDS */}
                <div>
                  <p className="text-sm text-gray-400 uppercase tracking-wide">Sender</p>
                  <p className="font-semibold text-lg">{shipment.senderName}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-400 uppercase tracking-wide">Receiver</p>
                  <p className="font-semibold text-lg">{shipment.receiverName}</p>
                </div>

              </div>

              {/* TIMELINE */}
              <div>
                <h3 className="text-lg font-semibold mb-6 text-gray-800">
                  Shipment Activity
                </h3>

                <div className="space-y-6">
                  {shipment.history?.map((event: any, index: number) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-3 h-3 bg-red-600 rounded-full mt-2"></div>
                      <div>
                        <p className="font-medium text-gray-800">
                          {event.message}
                        </p>
                        <p className="text-sm text-gray-500">
                          {event.location} — {new Date(event.date).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

        </div>
      </section>

      <footer className="mt-24 bg-gray-900 text-gray-400 text-center py-8">
        <p>© {new Date().getFullYear()} XDE Logistics Group. All rights reserved.</p>
      </footer>

    </main>
  );
}
