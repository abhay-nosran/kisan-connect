import { useEffect, useState } from "react";

// Placeholder API call (replace these with actual API integrations)
async function getBuyerInfo() {
  // Simulate API delay
  return new Promise((resolve) =>
    setTimeout(
      () =>
        resolve({
          buyerId: "B12345",
          name: "Abhay Nosran",
          email: "abhay@example.com",
          phone: "+91 98765 43210",
          buyerType: "Individual",
          companyName: null,
          verified: 1,
        }),
      500
    )
  );
}

async function updateBuyerInfo(updatedData) {
  console.log("Updating buyer info:", updatedData);
  // Replace with actual PUT/PATCH request to backend
  return { success: true };
}

const Profile = () => {
  const [buyer, setBuyer] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    phone: "",
    buyerType: "",
    companyName: "",
  });

  useEffect(() => {
    async function fetchBuyer() {
      const data = await getBuyerInfo();
      setBuyer(data);
      setFormData({
        phone: data.phone,
        buyerType: data.buyerType,
        companyName: data.companyName || "",
      });
    }
    fetchBuyer();
  }, []);

  async function handleSave() {
    const updated = await updateBuyerInfo(formData);
    if (updated.success) {
      setBuyer({ ...buyer, ...formData });
      setEditing(false);
    }
  }

  if (!buyer)
    return (
      <div className="flex justify-center items-center h-64 text-gray-600">
        Loading profile...
      </div>
    );

  return (
    <div className="bg-white p-8 rounded-xl shadow-md w-96 text-center mt-16">
      <img
        src="https://randomuser.me/api/portraits/men/44.jpg"
        alt="Profile"
        className="w-24 h-24 rounded-full mx-auto mb-4"
      />
      <h2 className="text-2xl font-semibold text-gray-800">{buyer.name}</h2>
      <p className="text-gray-600 text-sm mb-4">Buyer | Kisan Connect</p>

      <div className="flex flex-col gap-2 text-left text-gray-700">
        <p>
          <span className="font-medium">Buyer ID:</span> {buyer.buyerId}
        </p>
        <p>
          <span className="font-medium">Email:</span> {buyer.email}
        </p>

        <p>
          <span className="font-medium">Phone:</span>{" "}
          {editing ? (
            <input
              type="text"
              className="border border-gray-300 rounded px-2 py-1 w-40"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />
          ) : (
            buyer.phone
          )}
        </p>

        <p>
          <span className="font-medium">Buyer Type:</span>{" "}
          {editing ? (
            <select
              className="border border-gray-300 rounded px-2 py-1"
              value={formData.buyerType}
              onChange={(e) =>
                setFormData({ ...formData, buyerType: e.target.value })
              }
            >
              <option value="Individual">Individual</option>
              <option value="Company">Company</option>
            </select>
          ) : (
            buyer.buyerType
          )}
        </p>

        {/* ✅ Company Name Field (only when buyerType is Company) */}
        {formData.buyerType === "Company" && (
          <p>
            <span className="font-medium">Company Name:</span>{" "}
            {editing ? (
              <input
                type="text"
                className="border border-gray-300 rounded px-2 py-1 w-40"
                value={formData.companyName}
                onChange={(e) =>
                  setFormData({ ...formData, companyName: e.target.value })
                }
                placeholder="Enter company name"
              />
            ) : (
              buyer.companyName || "—"
            )}
          </p>
        )}

        <p>
          <span className="font-medium">Verified:</span>{" "}
          {buyer.verified ? (
            <span className="text-green-600 font-medium">✅ Yes</span>
          ) : (
            <span className="text-red-600 font-medium">❌ No</span>
          )}
        </p>
      </div>

      {editing ? (
        <div className="flex justify-center gap-3 mt-6">
          <button
            onClick={handleSave}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
          >
            Save
          </button>
          <button
            onClick={() => setEditing(false)}
            className="border border-gray-400 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition"
          >
            Cancel
          </button>
        </div>
      ) : (
        <button
          onClick={() => setEditing(true)}
          className="mt-6 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
        >
          Edit Profile
        </button>
      )}
    </div>
  );
};

export default Profile;
