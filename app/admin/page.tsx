"use client";

import { useEffect, useState } from "react";

export default function AdminWrapper() {
  const [authorized, setAuthorized] = useState(false);
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (password === "XDE2026Secure") {
      setAuthorized(true);
    } else {
      alert("Invalid Password");
    }
  };

  if (!authorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="bg-white p-10 rounded-xl shadow-xl w-96">
          <h2 className="text-2xl font-bold mb-6 text-red-600 text-center">
            XDE Admin Access
          </h2>

          <input
            type="password"
            placeholder="Enter Admin Password"
            className="border p-3 w-full mb-4 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={handleLogin}
            className="bg-red-600 hover:bg-red-700 text-white w-full py-3 rounded font-semibold"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  return <AdminDashboard />;
}

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [shipments, setShipments] = useState<any[]>([]);
  const [createData, setCreateData] = useState<any>({});
  const [updateData, setUpdateData] = useState<any>({});
  const [response, setResponse] = useState("");

  const backend = "https://xde-backend.onrender.com";

  const fetchShipments = async () => {
    try {
      const res = await fetch(`${backend}/all-shipments`);
      const data = await res.json();
      setShipments(data);
    } catch (err) {
      console.log("Error fetching shipments");
    }
  };

  useEffect(() => {
    fetchShipments();
  }, []);

  const handleCreate = async () => {
    const res = await fetch(`${backend}/create-shipment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(createData),
    });

    const data = await res.json();
    setResponse(JSON.stringify(data, null, 2));
    fetchShipments();
  };

  const handleUpdate = async () => {
    const res = await fetch(
      `${backend}/update-status/${updateData.trackingNumber}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: updateData.status,
          currentLocation: updateData.currentLocation,
          message: updateData.message,
        }),
      }
    );

    const data = await res.json();
    setResponse(JSON.stringify(data, null, 2));
    fetchShipments();
  };

  const handleDelete = async (trackingNumber: string) => {
    await fetch(`${backend}/delete-shipment/${trackingNumber}`, {
      method: "DELETE",
    });
    fetchShipments();
  };

  const total = shipments.length;
  const delivered = shipments.filter(s => s.status === "Delivered").length;
  const transit = shipments.filter(s => s.status === "In Transit").length;
  const processing = shipments.filter(s => s.status === "Processing").length;

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* SIDEBAR */}
      <aside className="w-64 bg-red-700 text-white p-6">
        <h1 className="text-2xl font-bold mb-10">XDE Admin</h1>

        <ul className="space-y-4">
          <li onClick={() => setActiveTab("dashboard")}
              className={`cursor-pointer ${activeTab==="dashboard" && "font-bold"}`}>
            Dashboard
          </li>
          <li onClick={() => setActiveTab("create")}
              className={`cursor-pointer ${activeTab==="create" && "font-bold"}`}>
            Create Shipment
          </li>
          <li onClick={() => setActiveTab("update")}
              className={`cursor-pointer ${activeTab==="update" && "font-bold"}`}>
            Update Shipment
          </li>
          <li onClick={() => setActiveTab("all")}
              className={`cursor-pointer ${activeTab==="all" && "font-bold"}`}>
            All Shipments
          </li>
        </ul>

        <button
          onClick={() => window.location.reload()}
          className="mt-10 bg-black text-white px-4 py-2 rounded w-full"
        >
          Logout
        </button>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-10">

        {activeTab === "dashboard" && (
          <div>
            <h2 className="text-3xl font-bold mb-8 text-red-600">
              Dashboard Overview
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Metric title="Total Shipments" value={total} />
              <Metric title="Delivered" value={delivered} />
              <Metric title="In Transit" value={transit} />
              <Metric title="Processing" value={processing} />
            </div>
          </div>
        )}

        {activeTab === "create" && (
          <Section title="Create Shipment">
            <FormInput placeholder="Sender Name"
              onChange={(v)=>setCreateData({...createData,senderName:v})}/>
            <FormInput placeholder="Receiver Name"
              onChange={(v)=>setCreateData({...createData,receiverName:v})}/>
            <FormInput placeholder="Origin"
              onChange={(v)=>setCreateData({...createData,origin:v})}/>
            <FormInput placeholder="Destination"
              onChange={(v)=>setCreateData({...createData,destination:v})}/>
            <FormInput placeholder="Current Location"
              onChange={(v)=>setCreateData({...createData,currentLocation:v})}/>
            <FormInput type="date"
              onChange={(v)=>setCreateData({...createData,estimatedDelivery:v})}/>

            <PrimaryButton onClick={handleCreate}>
              Create Shipment
            </PrimaryButton>
          </Section>
        )}

        {activeTab === "update" && (
          <Section title="Update Shipment">
            <FormInput placeholder="Tracking Number"
              onChange={(v)=>setUpdateData({...updateData,trackingNumber:v})}/>
            <select className="border p-3 w-full rounded mb-4"
              onChange={(e)=>setUpdateData({...updateData,status:e.target.value})}>
              <option>Processing</option>
              <option>In Transit</option>
              <option>Arrived at Hub</option>
              <option>Out for Delivery</option>
              <option>Delivered</option>
            </select>
            <FormInput placeholder="Current Location"
              onChange={(v)=>setUpdateData({...updateData,currentLocation:v})}/>
            <FormInput placeholder="Status Message"
              onChange={(v)=>setUpdateData({...updateData,message:v})}/>

            <PrimaryButton onClick={handleUpdate}>
              Update Shipment
            </PrimaryButton>
          </Section>
        )}

        {activeTab === "all" && (
          <Section title="All Shipments">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-red-600 text-white">
                  <tr>
                    <th className="p-3">Tracking</th>
                    <th className="p-3">Sender</th>
                    <th className="p-3">Receiver</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {shipments.map((s,i)=>(
                    <tr key={i} className="border-b">
                      <td className="p-3">{s.trackingNumber}</td>
                      <td className="p-3">{s.senderName}</td>
                      <td className="p-3">{s.receiverName}</td>
                      <td className="p-3">
                        <StatusBadge status={s.status}/>
                      </td>
                      <td className="p-3">
                        <button
                          onClick={()=>handleDelete(s.trackingNumber)}
                          className="bg-red-600 text-white px-3 py-1 rounded"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>
        )}

        <div className="bg-black text-green-400 p-6 rounded-xl mt-10">
          <pre className="text-sm">{response}</pre>
        </div>

      </main>
    </div>
  );
}

/* COMPONENTS */

function Section({title,children}:any){
  return(
    <div className="bg-white p-8 rounded-xl shadow mb-10">
      <h3 className="text-xl font-semibold mb-6 text-red-600">{title}</h3>
      {children}
    </div>
  );
}

function FormInput({placeholder,type="text",onChange}:any){
  return(
    <input
      type={type}
      placeholder={placeholder}
      className="border p-3 w-full rounded mb-4"
      onChange={(e)=>onChange(e.target.value)}
    />
  );
}

function PrimaryButton({children,onClick}:any){
  return(
    <button
      onClick={onClick}
      className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded font-semibold"
    >
      {children}
    </button>
  );
}

function Metric({title,value}:any){
  return(
    <div className="bg-white p-6 rounded-xl shadow text-center">
      <p className="text-gray-500">{title}</p>
      <h4 className="text-2xl font-bold text-red-600">{value}</h4>
    </div>
  );
}

function StatusBadge({status}:any){
  const color =
    status==="Processing"?"bg-yellow-500":
    status==="In Transit"?"bg-blue-600":
    status==="Out for Delivery"?"bg-purple-600":
    status==="Delivered"?"bg-green-600":
    status==="Arrived at Hub"?"bg-orange-500":
    "bg-gray-500";

  return(
    <span className={`px-3 py-1 rounded-full text-white text-sm font-semibold ${color}`}>
      {status}
    </span>
  );
}
