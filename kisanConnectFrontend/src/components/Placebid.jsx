import { useState } from "react";
import { X } from "lucide-react"; // You can also use an SVG if preferred

function PlaceBid({ cropName, currentPrice, onClose, onSubmitBid }) {
  const [bid, setBid] = useState("");

  const handleBidSubmit = () => {
    const bidAmount = parseInt(bid, 10);
    if (bidAmount >= currentPrice + 100) {
      onSubmitBid(bidAmount);
    } else {
      alert("Bid must be at least ₹100 more than the current price.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
      <div className="bg-white rounded-2xl p-6 w-[350px] shadow-lg relative">
        {/* Close Button */}
        <button className="absolute top-3 right-3" onClick={onClose}>
          <X className="w-5 h-5 text-black" />
        </button>

        {/* Title */}
        <h2 className="text-[#145314] text-xl font-bold text-center mb-5">Place your Bid</h2>

        {/* Info Box */}
        <div className="bg-[#fdf6e8] rounded-xl px-4 py-3 text-sm space-y-3 mb-4">
          <div className="flex justify-between font-semibold">
            <span>Crop</span>
            <span className="font-normal">{cropName}</span>
          </div>
          <div className="flex justify-between font-semibold">
            <span>Current Price</span>
            <span className="font-normal">₹{currentPrice} per quintal</span>
          </div>
          <div className="flex justify-between font-semibold">
            <span>Enter your Bid</span>
            <input
              type="number"
              className="border rounded-md px-2 py-1 w-24 text-right font-normal"
              value={bid}
              onChange={(e) => setBid(e.target.value)}
            />
          </div>
        </div>

        {/* Disclaimer */}
        <p className="text-xs text-gray-500 mb-4 text-center">
          Disclaimer: Your bid must be at least ₹100 more than the current price. Lower bids won’t be accepted.
        </p>

        {/* Place Bid Button */}
        <button
          className="w-full bg-[#458448] text-white py-2 rounded-full font-semibold hover:bg-[#376b37] transition"
          onClick={handleBidSubmit}
        >
          Place Bid
        </button>
      </div>
    </div>
  );
}

export default PlaceBid;
