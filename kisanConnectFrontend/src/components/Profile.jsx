import React, { useState, useEffect } from "react";
import axios from "axios";

const BuyerProfile = () => {
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  const [buyer, setBuyer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBuyerProfile = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/buyer/getProfile/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBuyer(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to load buyer profile:", err);
        setError(err.response?.data?.error || err.message || "Something went wrong");
        setLoading(false);
      }
    };

    fetchBuyerProfile();
  }, [userId, token]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-green-100 p-6">
        <p className="text-gray-600">Loading profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-green-100 p-6">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  const { name, email, phone, company_name } = buyer;

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 p-6 flex justify-center">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">Buyer Profile</h2>

        <div className="space-y-4">
          <div>
            <h3 className="text-sm text-gray-500 uppercase">Full Name</h3>
            <p className="text-lg font-medium text-gray-800">{name}</p>
          </div>

          <div>
            <h3 className="text-sm text-gray-500 uppercase">Email Address</h3>
            <p className="text-lg font-medium text-gray-800">{email}</p>
          </div>

          <div>
            <h3 className="text-sm text-gray-500 uppercase">Phone Number</h3>
            <p className="text-lg font-medium text-gray-800">{phone}</p>
          </div>

          <div>
            <h3 className="text-sm text-gray-500 uppercase">Company Name</h3>
            <p className="text-lg font-medium text-gray-800">{company_name}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyerProfile;
