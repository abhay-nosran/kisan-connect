import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-green-50 to-green-100 text-gray-800">
      {/* Header */}
      <header className="absolute top-0 left-0 w-full flex justify-between items-center px-8 py-4 bg-white/70 backdrop-blur-sm shadow-sm">
        <h1 className="text-2xl font-bold text-[#458448]">Kisan Connect</h1>
        <nav className="flex gap-4">
          <Link
            to="/login"
            className="px-4 py-2 rounded-xl bg-[#458448] text-white font-medium hover:bg-green-700 transition"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="px-4 py-2 rounded-xl border-2 border-[#458448] text-[#458448] font-medium hover:bg-[#458448] hover:text-white transition"
          >
            Sign Up
          </Link>
        </nav>
      </header>

      {/* Main Content */}
      <main className="text-center px-6 mt-20">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#458448]">
          Empowering Farmers. Connecting Buyers.
        </h2>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
          Kisan Connect is a one-stop platform that bridges the gap between
          farmers and buyers through transparent auctions, efficient logistics,
          and fair pricing.
        </p>

        <div className="mt-10">
          <Link
            to="/signup"
            className="px-6 py-3 text-lg bg-[#458448] text-white rounded-xl font-semibold shadow hover:bg-green-700 transition"
          >
            Get Started
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto py-6 text-sm text-gray-500">
        © {new Date().getFullYear()} Kisan Connect. All rights reserved.
      </footer>
    </div>
  );
}
