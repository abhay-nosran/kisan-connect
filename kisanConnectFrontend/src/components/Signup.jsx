import React from "react";
import { BrowserRouter as Router, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

/**
 * Sign Up page for Kisan-Connect using React Hook Form.
 * Fields: Name, Email, Phone, Password, Confirm Password, Role selector (Farmer/Buyer/Crop Inspector).
 * Conditional: Location for Farmers, Company Name for Buyers.
 * Green theme with Tailwind CSS.
 * Wrapped in Router to enable useNavigate hook.
 */
const Signup = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues: { role: "farmer" }
  });

  const role = watch("role");

  const onSubmit = async (data) => {
  try {
    const response = await fetch("http://localhost:5000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: data.password,
        role: data.role,
        company_name: data.role === "buyer" ? data.company : null,
        location: data.role === "farmer" ? data.location : null
      })
    });

    const result = await response.json();

    if (response.ok) {
      alert("Registration successful!");
      navigate("/login");
    } else {
      alert(result.error || "Failed to register user.");
    }
  } catch (error) {
    console.error("Signup error:", error);
    alert("Something went wrong. Please try again later.");
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-green-100 p-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 space-y-6"
      >
        <h2 className="text-2xl font-bold text-green-700 text-center">Create Your Account</h2>

        {/* Full Name */}
        <div>
          <label className="block text-gray-700 mb-1">Full Name</label>
          <input
            {...register("name", { required: "Full name is required" })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
            placeholder="Your full name"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="block text-gray-700 mb-1">Email Address</label>
          <input
            {...register("email", {
              required: "Email is required",
              pattern: { value: /\S+@\S+\.\S+/, message: "Enter a valid email" }
            })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
            placeholder="you@example.com"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-gray-700 mb-1">Phone Number</label>
          <input
            {...register("phone", { required: "Phone number is required" })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
            placeholder="e.g. +91 98765 43210"
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
        </div>

        {/* Password */}
        <div>
          <label className="block text-gray-700 mb-1">Password</label>
          <input
            type="password"
            {...register("password", { required: "Password is required", minLength: { value: 6, message: "Minimum 6 characters" } })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
            placeholder="Create a password"
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-gray-700 mb-1">Confirm Password</label>
          <input
            type="password"
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) => value === watch("password") || "Passwords do not match"
            })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
            placeholder="Confirm your password"
          />
          {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
        </div>

        {/* Role Selector */}
        <div>
          <label className="block text-gray-700 mb-1">I am a</label>
          <select
            {...register("role")}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
          >
            <option value="farmer">Farmer</option>
            <option value="buyer">Buyer</option>
            <option value="representative">Crop Inspector</option>
          </select>
        </div>

        {/* Conditional Fields */}
        {role === "farmer" && (
          <div>
            <label className="block text-gray-700 mb-1">Location</label>
            <input
              {...register("location", { required: "Location is required for farmers" })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
              placeholder="Enter your location"
            />
            {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>}
          </div>
        )}

        {role === "buyer" && (
          <div>
            <label className="block text-gray-700 mb-1">Company Name</label>
            <input
              {...register("company", { required: "Company name is required for buyers" })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
              placeholder="Enter your company name"
            />
            {errors.company && <p className="text-red-500 text-sm mt-1">{errors.company.message}</p>}
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-3 bg-green-700 text-white rounded-2xl font-semibold hover:bg-green-800 transition"
        >
          Sign Up
        </button>

        {/* Login Link */}
        <p className="text-center text-gray-600 text-sm">
          Already have an account?{' '}
          <a href="/login" className="text-green-700 hover:underline">
            Log In
          </a>
        </p>
      </form>
    </div>
  );
};



export default Signup;
