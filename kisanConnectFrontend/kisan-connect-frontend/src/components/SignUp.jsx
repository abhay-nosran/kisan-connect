import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("buyer"); // Default role
  const [location, setLocation] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await axios.post("http://localhost:5000/signup", {
        name,
        email,
        phone,
        password,
        role,
        ...(role === "farmer" && { location }),
        ...(role === "buyer" && { company_name: companyName }),
      });

      navigate("/login"); // Redirect to login page after successful signup
    } catch (err) {
      setError(err.response?.data?.error || "Signup failed");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center text-green-700 mb-6">Sign Up</h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter your name"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter your email"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Phone</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter your phone number"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter your password"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Confirm your password"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="admin">Admin</option>
            <option value="representative">Representative</option>
            <option value="buyer">Buyer</option>
            <option value="farmer">Farmer</option>
          </select>
        </div>

        {/* Conditional Fields for Buyer and Farmer */}
        {role === "buyer" && (
          <div className="mb-4">
            <label className="block text-gray-700">Company Name</label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your company name"
            />
          </div>
        )}

        {role === "farmer" && (
          <div className="mb-4">
            <label className="block text-gray-700">Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your location"
            />
          </div>
        )}

        <button 
          onClick={handleSignup} 
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">
          Sign Up
        </button>

        <p className="text-center text-gray-600 mt-4">
          Already have an account? 
          <button onClick={() => navigate("/login")} className="text-green-600 hover:underline ml-1">
            Login
          </button>
        </p>
      </div>
    </div>
  );
}
