import { useState } from "react";
import axios from "axios";

export default function BidForm({ auctionId, highestBid }) {
  const [bidAmount, setBidAmount] = useState("");
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");
  const role_id = localStorage.getItem("role_id");

    if (!token) {
      navigate("/login");
      return;
    }

  const placeBid = async () => {
    if (!bidAmount || parseFloat(bidAmount) <= parseFloat(highestBid)) {
      setMessage(`Your bid must be greater than ₹${highestBid}`);
      return;
    }

    try {
      await axios.post(
        `http://localhost:5000/auctions/${auctionId}/bids`,
        {
          buyer_id: role_id, // Replace with logged-in buyer ID
          bid_amount: parseFloat(bidAmount),
        },
        {
          headers: { Authorization: `Bearer ${token}` }, // ✅ Correct placement
        }
      );
      

      setMessage("Bid placed successfully!");
      setBidAmount("");
    } catch (error) {
      console.log(token)
      if (error.response?.data?.error === "Invalid token.") {
        localStorage.removeItem("token");
        navigate("/login");
      }
      console.log(error.response);
      setMessage(error.response?.data?.error || "Error placing bid");
    }
  };

  return (
    <div className="mt-4">
      <input
        type="number"
        value={bidAmount}
        onChange={(e) => setBidAmount(e.target.value)}
        placeholder="Enter your bid"
        className="border p-2 rounded"
      />
      <button onClick={placeBid} className="ml-2 bg-blue-500 text-white px-4 py-2 rounded">
        Place Bid
      </button>
      {message && <p className="text-red-500 mt-2">{message}</p>}
    </div>
  );
}

