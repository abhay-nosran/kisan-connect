import { useEffect, useState } from "react";
import {updateTimer} from "./timer"
import arrow from "../assets/arrow.svg";

function AuctionCard({cardDetails , setViewDetailsPopup ,setPlaceBidPopup}) {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    updateTimer(cardDetails.endTime,setTimeLeft);
    const interval = setInterval(()=>{updateTimer(cardDetails.endTime,setTimeLeft)}, 1000);
    return () => clearInterval(interval);
  }, [cardDetails.endTime]);

  return (
    <div className="flex justify-between w-full items-center bg-white shadow-md rounded-[20px] px-5 py-2">
      {/* Crop Name */}
      <div className="text-[#458448] flex justify-center font-bold text-lg w-[150px]">
        {cardDetails.cropName}
      </div>

      {/* Details Section */}
      <div className="rounded-xl p-4 flex-grow mx-4">
        <div className="grid grid-cols-2 gap-y-1 gap-x-8 text-sm text-black">
          <div>
            <span className="font-medium">Grade: </span>
            <span className="font-light">{cardDetails.grade}</span>
          </div>
          <div>
            <span className="font-medium">Location: </span>
            <span className="font-normal">{cardDetails.location}</span>
          </div>
          <div>
            <span className="font-medium">Quantity: </span>
            <span className="font-normal">{cardDetails.quantity} Tn</span>
          </div>
          <div>
            <span className="font-medium">Base Price: </span>
            <span className="font-normal">{cardDetails.basePrice} per quintal</span>
          </div>
          <div>
            <span className="font-medium">Auction ID: </span>
            <span className="font-normal">{cardDetails.auctionId}</span>
          </div>
          <div>
            <span className="font-medium">Current Price: </span>
            <span className="font-normal">{cardDetails.currentPrice} per quintal</span>
          </div>
        </div>
      </div>

      {/* Action Buttons + Timer */}
      <div className="flex flex-col items-center space-y-2">
        <button className="border border-[#458448] text-[#458448] rounded-full px-3 font-medium hover:bg-[#f1fbe9] transition" onClick={() =>setViewDetailsPopup({open:true, auctionId:cardDetails.auctionId})}>
          <div className="flex items-center">
            View Details
            <img src={arrow} alt="arrow" className="inline ml-1.5" />
          </div>
        </button>
        <button className="bg-[#458448] text-white rounded-full px-10 py-0.5 font-medium hover:bg-[#376b37] transition" onClick={() => setPlaceBidPopup({open:true, auctionId:cardDetails.auctionId , cropName : cardDetails.cropName , currentPrice: cardDetails.currentPrice})}>
          Place Bid
        </button>
        <div className="text-sm font-medium">
          Expires in{" "}
          <span className="text-red-600 font-mono inline-block w-[120px] text-center">
            {timeLeft}
          </span>
        </div>

      </div>
    </div>
  );
}

export default AuctionCard;