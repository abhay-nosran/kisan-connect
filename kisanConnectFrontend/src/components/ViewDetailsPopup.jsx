import { useEffect, useState } from "react";
import axios from "axios";
import {updateTimer} from "./timer"
import paddyImg from "../assets/paddy.jpg";

export default function ViewDetailsPopup({ ViewDetailsPopupState, setViewDetailsPopup, currentPrice, setCurrentPrice}) {
  const [auctionDetails, setAuctionDetails] = useState(null);
  const [timeLeft, setTimeLeft] = useState(""); 
  
  useEffect(() => {
    if (!auctionDetails || !auctionDetails.end_time) return;
  
    updateTimer(auctionDetails.end_time, setTimeLeft);
    const interval = setInterval(() => {
      updateTimer(auctionDetails.end_time, setTimeLeft);
    }, 1000);
    
    return () => clearInterval(interval);
  }, [auctionDetails])


  useEffect(() => {
    if (!ViewDetailsPopupState.auctionId) return;

    const api = `http://localhost:5000/auctions/${ViewDetailsPopupState.auctionId}`;
    const fetchAuctionDetails = async () => {
      try {
        const response = await axios.get(api);
        setAuctionDetails(response.data);
        setCurrentPrice(response.data.highest_bid);
      } catch (error) {
        console.error("Error fetching auction details:", error);
      }
    };
    fetchAuctionDetails();
  }, [ViewDetailsPopupState.auctionId]);

  if (!auctionDetails) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center" onClick={() => setViewDetailsPopup({ open: false, auctionId: null })}>

      <div className="bg-white rounded-3xl p-6 w-[90%] max-w-3xl shadow-lg relative" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button
          onClick={() => setViewDetailsPopup({ open: false, auctionId: null })}
          className="absolute top-4 right-4 text-xl font-bold text-gray-600 hover:text-black"
        >
          ✕
        </button>

        {/* Crop Image & Title */}
        <div className="flex flex-col items-center">
          <img
            src={paddyImg}
            alt="Crop"
            className="rounded-full w-24 h-24 object-cover"
          />
          <h2 className="text-xl font-semibold mt-2">{auctionDetails.crop_name || "NA"}</h2>
        
         
          <span className="text-red-600 font-mono inline-block w-[150px] text-center">
            {timeLeft}
          </span>
        

        </div>

        {/* Auction Info */}
        <div className="bg-gray-50 rounded-xl shadow-inner mt-4 p-4">
          <p><strong>Grade:</strong> {auctionDetails.quality_grade}</p>
          <p><strong>Auction ID:</strong> {auctionDetails.auction_id}</p>
          <p><strong>Base Price:</strong> ₹{auctionDetails.base_price}</p>
          <p><strong>Current Price:</strong> ₹{currentPrice}</p>
          <p><strong>Quantity:</strong> {auctionDetails.quantity} Tn</p>
        </div>

        <p className="text-right mt-1 text-sm text-gray-500">
          Estimated Delivery in <strong>28 days</strong>.
        </p>


      </div>
    </div>
  );
}