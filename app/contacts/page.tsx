export default function Contact() {
  return (
    <div className="min-h-screen p-16 bg-gray-50">
      <h1 className="text-4xl font-bold text-purple-700 mb-6">
        Contact Center
      </h1>

      <div className="max-w-xl">
        <input
          placeholder="Full Name"
          className="border p-3 w-full mb-4 rounded"
        />
        <input
          placeholder="Email"
          className="border p-3 w-full mb-4 rounded"
        />
        <textarea
          placeholder="Your Message"
          className="border p-3 w-full mb-4 rounded"
          rows={5}
        />

        <button className="bg-purple-700 text-white px-6 py-3 rounded">
          Send Message
        </button>
      </div>
    </div>
  );
}
