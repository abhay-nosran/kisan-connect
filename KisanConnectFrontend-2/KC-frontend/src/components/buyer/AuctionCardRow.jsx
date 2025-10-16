import { useState, useEffect } from "react";
import MapPinIcon from "../../assets/MapPinIcon.svg";
import GradeIcon from "../../assets/GradeIcon.svg"
export default function AuctionCardRow({ auction }) {
  const {
    image,
    cropName,
    location,
    grade,
    quantity,
    auctionId,
    basePrice,
    currentPrice,
    auctionEndTime,
  } = auction;

  const [expiresIn, setExpiresIn] = useState("");

  const unit = "Quintal"
  // 🕒 Calculate countdown
  useEffect(() => {
    if (!auctionEndTime) return;

    const end = new Date(auctionEndTime).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const diff = end - now;

      if (diff <= 0) {
        clearInterval(interval);
        setExpiresIn("Expired");
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setExpiresIn(
        `${days.toString().padStart(2, "0")}d ${hours
          .toString()
          .padStart(2, "0")}h ${minutes
          .toString()
          .padStart(2, "0")}m ${seconds.toString().padStart(2, "0")}s`
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [auctionEndTime]);

  return (
    <div className="flex bg-white rounded-2xl shadow-md overflow-hidden w-full max-w-5xl mx-auto border">
      {/* Left: Image */}
      <div className="w-1/3">
        <img
          src={image}
          alt={cropName}
          className="object-cover h-full w-full rounded-l-2xl"
        />
      </div>

      {/* Right: Info */}
      <div className="flex-1 p-2 flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <h2 className="text-xl font-semibold text-green-800">{cropName}</h2>
        </div>

        <div className="flex items-center gap-2.5 text-gray-500 text-sm mt-1 space-x-1">
          <div className="flex gap-1">
            <img src={MapPinIcon} alt="Location" />
            <span>{location}</span>
          </div>
          <div className="flex">
            <img src={GradeIcon} alt="grade"/>
            <span>{grade}</span>
          </div>
        </div>

        <div className="flex justify-between text-gray-600 mt-2">
          <p>
            Quantity: <span className="font-medium">{quantity} Quintal</span>
          </p>
          <p>
            Auction ID: <span className="font-medium">{auctionId}</span>
          </p>
        </div>

        <div className="flex justify-between items-center text"> 
            <p>
              Base Price :{" "}
              <span className="font-semibold">{basePrice} / {unit}</span>
            </p>
            <p>
              Current Price :{" "}
              <span className="text-green-700 font-semibold">
                {currentPrice} / {unit}
              </span>
            </p>
        </div>

        <hr/>

        <div className="flex justify-between">
            <div className="text-red-600 ">
                <span>
                {expiresIn === "Expired"
                    ? "Auction Closed"
                    : `Expires in ${expiresIn}`}
                </span>
            </div>
        
            <div className="flex space-x-3">
                <button className="border border-green-700 text-green-700 px-4 py-1 rounded-lg hover:bg-green-50 transition">
                    View Details →
                </button>
                <button className="bg-green-700 text-white px-4 py-1 rounded-lg hover:bg-green-800 transition">
                    Bid
                </button>
            </div>
        </div>
      </div>
    </div>
  );
}
