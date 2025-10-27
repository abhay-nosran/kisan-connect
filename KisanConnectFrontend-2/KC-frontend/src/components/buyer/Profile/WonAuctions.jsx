import { useState, useEffect } from "react";
import PurchasedAuctionCard from "./PurchasedAuctionCard"; // adjust path if needed

export default function WonAuctions() {
  const [wonAuctions, setWonAuctions] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Simulated API call (replace with your actual API later)
  async function getWonAuctions() {
    // Example data structure — replace with real fetch call
    return [
      {
        image: "https://source.unsplash.com/400x300/?wheat",
        auctionId: 101,
        purchasePrice: 2450,
        status: "payment_pending",
        endTime: "2025-10-28T18:00:00Z",
        Crop: {
          cropType: "Wheat",
          qualityGrade: "A",
          quantityKg: 2000,
          location: "Punjab, India",
        },
      },
      {
        image: "https://source.unsplash.com/400x300/?rice",
        auctionId: 102,
        purchasePrice: 3150,
        status: "in_transit",
        endTime: "2025-10-25T18:00:00Z",
        Crop: {
          cropType: "Basmati Rice",
          qualityGrade: "Premium",
          quantityKg: 1500,
          location: "Haryana, India",
        },
      },
      {
        image: "https://source.unsplash.com/400x300/?corn",
        auctionId: 103,
        purchasePrice: 2200,
        status: "delivered",
        endTime: "2025-10-20T18:00:00Z",
        Crop: {
          cropType: "Maize",
          qualityGrade: "B+",
          quantityKg: 1000,
          location: "Madhya Pradesh, India",
        },
      },
    ];
  }

  function handleViewDetails(auctionId){
    alert(`details for auction ID ${auctionId}`);
  }

  // 🔹 Handlers for button actions
  function handleMakePayment(auctionId) {
    alert(`Redirecting to payment page for auction ID ${auctionId}`);
  }

  function handleCheckDelivery(auctionId) {
    alert(`Checking delivery details for auction ID ${auctionId}`);
  }

  // 🔹 Fetch data once on component mount
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getWonAuctions();
        setWonAuctions(data);
      } catch (error) {
        console.error("Error fetching won auctions:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // 🔹 Render logic
  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh] text-gray-600 text-lg">
        Loading your won auctions...
      </div>
    );
  }

  if (wonAuctions.length === 0) {
    return (
      <div className="flex justify-center items-center h-[70vh] text-gray-600 text-lg">
        No auctions won yet 😕
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 items-center py-6 bg-gray-50 min-h-[90vh]">
      <h1 className="text-2xl font-semibold text-green-800 mb-4">
        🏆 Your Won Auctions
      </h1>

      {wonAuctions.map((auction) => (
        <PurchasedAuctionCard
          key={auction.auctionId}
          auction={auction}
          onMakePayment={handleMakePayment}
          onCheckDelivery={handleCheckDelivery}
          onViewDetails = {handleViewDetails} 
        />
      ))}
    </div>
  );
}
