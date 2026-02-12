export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-10 rounded-xl shadow w-96">
        <h2 className="text-2xl font-bold mb-6 text-purple-700 text-center">
          Customer Portal
        </h2>

        <input
          placeholder="Email"
          className="border p-3 w-full mb-4 rounded"
        />
        <input
          placeholder="Password"
          type="password"
          className="border p-3 w-full mb-4 rounded"
        />

        <button className="bg-purple-700 text-white w-full py-3 rounded">
          Login
        </button>
      </div>
    </div>
  );
}
