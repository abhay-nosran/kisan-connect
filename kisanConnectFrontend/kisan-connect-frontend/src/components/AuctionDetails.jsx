// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import BidForm from "./BidForm";
// import axios from "axios";

// export default function AuctionDetails() {
//   const { id } = useParams();
//   const [auction, setAuction] = useState(null);
//   const [ws, setWs] = useState(null);

//   useEffect(() => {
//     // Fetch initial auction details using HTTP
//     axios.get(`http://localhost:5000/auctions/${id}`)
//       .then(response => setAuction(response.data))
//       .catch(error => console.error("Error fetching auction:", error));

//     // Open WebSocket connection
//     const socket = new WebSocket(`ws://localhost:5000/auctions/${id}`);

//     socket.onopen = () => {
//       console.log(`Connected to WebSocket for auction ${id}`);
//     };

//     socket.onmessage = (event) => {
//       const data = JSON.parse(event.data);
//       if (data.type === "auction_update") {
//         setAuction(data.auction);
//       }
//     };

//     setWs(socket);

//     return () => {
//       socket.close();
//       console.log(`WebSocket closed for auction ${id}`);
//     };
//   }, [id]);

//   if (!auction) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <div className="p-4 border rounded-lg shadow">
//       <h2 className="text-2xl font-bold">{auction.name}</h2>
//       <p className="text-lg">Highest Bid: ₹{auction.highest_bid || auction.base_price}</p>
//       <p className="text-sm text-gray-600">Ends at: {new Date(auction.end_time).toLocaleString()}</p>

//       <BidForm auctionId={id} highestBid={auction.highest_bid || auction.base_price} />
//     </div>
//   );
// }
// import { useState } from "react";
// import axios from "axios";

// export default function BidForm({ auctionId, highestBid }) {
//   const [bidAmount, setBidAmount] = useState("");
//   const [message, setMessage] = useState("");

//   const placeBid = async () => {
//     if (!bidAmount || bidAmount <= highestBid) {
//       setMessage(`Your bid must be greater than ₹${highestBid}`);
//       return;
//     }

//     try {
//       await axios.post(`http://localhost:5000/auctions/${auctionId}/bids`, {
//         buyer_id: 1, // Replace with logged-in buyer ID
//         bid_amount: parseFloat(bidAmount),
//       });

//       setMessage("Bid placed successfully!");
//       setBidAmount("");
//     } catch (error) {
//       setMessage(error.response?.data?.error || "Error placing bid");
//     }
//   };

//   return (
//     <div className="mt-4">
//       <input
//         type="number"
//         value={bidAmount}
//         onChange={(e) => setBidAmount(e.target.value)}
//         placeholder="Enter your bid"
//         className="border p-2 rounded"
//       />
//       <button onClick={placeBid} className="ml-2 bg-blue-500 text-white px-4 py-2 rounded">
//         Place Bid
//       </button>
//       {message && <p className="text-red-500 mt-2">{message}</p>}
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BidForm from "./BidForm";

export default function AuctionDetails() {
  const { id } = useParams();
  const [auction, setAuction] = useState(null);
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }
    axios.get(`http://localhost:5000/auctions/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(response => setAuction(response.data))
      .catch((error) => {
        if (error.response?.data?.error === "Invalid token.") {
          localStorage.removeItem("token");
          navigate("/login");
        }
      });

    const socket = new WebSocket(`ws://localhost:5000/auctions/${id}`);

    socket.onopen = () => {
      console.log(`Connected to WebSocket for auction ${id}`);
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "auction_update") {
        setAuction(data.auction);
      }
    };

    setWs(socket);

    return () => {
      socket.close();
      console.log(`WebSocket closed for auction ${id}`);
    };
  }, [id]);

  if (!auction) {
    return <p className="text-center text-lg text-gray-600">Loading auction details...</p>;
  }

  return (
    <div className="max-w-lg mx-auto p-6 border rounded-lg shadow-lg bg-white">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Auction Details</h2>
      
      <div className="mb-4 p-4 bg-gray-100 rounded-lg">
        <p className="text-lg font-semibold text-gray-700">Starting Price:</p>
        <p className="text-xl font-bold text-green-600">₹{auction.base_price}</p>
      </div>

      <div className="mb-4 p-4 bg-blue-100 rounded-lg">
        <p className="text-lg font-semibold text-gray-700">Current Highest Bid:</p>
        <p className="text-xl font-bold text-blue-600">
          {auction.highest_bid ? `₹${auction.highest_bid}` : "No bids yet"}
        </p>
      </div>

      <div className="p-4 bg-yellow-100 rounded-lg">
        <p className="text-lg font-semibold text-gray-700">Highest Bidder:</p>
        <p className="text-xl font-bold text-yellow-600">
          {auction.highest_bidder ? `Bidder ID: ${auction.highest_bidder}` : "No highest bidder yet"}
        </p>
      </div>

      <div className="mt-6">
        <BidForm auctionId={id} highestBid={auction.highest_bid || auction.base_price} />
      </div>
    </div>
  );
}

