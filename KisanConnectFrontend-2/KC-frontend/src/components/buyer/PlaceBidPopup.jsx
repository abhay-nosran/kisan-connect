import { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import {placeBid} from "../../apis"

export default function PlaceBidPopup({ popupDetails, setPlaceBidPopup }) {
  const [bidAmount, setBidAmount] = useState("");
  const modalRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // Fade-in animation
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Close when clicking outside
  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      closePopup();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const closePopup = () => {
    setIsVisible(false);
    setTimeout(() => setPlaceBidPopup(false), 200); // match animation duration
  };

  const handleSubmit = async () => {

    const minBid = popupDetails.current.currentPrice + 100;
    if (bidAmount < minBid) {
      alert(`Your bid musdfasfaest be at least ₹${minBid}`);
      return;
    }
    // alert("Place Bid to be implemented");
    const result = await placeBid(popupDetails.current.auctionId,bidAmount) ;

    if(result.success){
        alert("Bid Placed Successfully !") 
    }else{
        alert(result.error) ;
    }

    closePopup() ;
  };

  return createPortal(
    <div
      className={`fixed inset-0 flex justify-center items-center z-50 transition-opacity duration-200 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Blurred Background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: "rgba(0,0,0,0.3)",
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
        }}
      ></div>

      {/* Modal */}
      <div
        ref={modalRef}
        className={`relative bg-white rounded-2xl shadow-lg w-96 p-6 z-10 transform transition-transform duration-200 ${
          isVisible ? "scale-100" : "scale-95"
        }`}
      >
        {/* Close Button */}
        <button
          onClick={closePopup}
          className="absolute top-3 right-4 text-gray-600 hover:text-gray-800 text-2xl leading-none"
        >
          &times;
        </button>

        {/* Title */}
        <h2 className="text-xl font-semibold text-center text-[#458448] mb-4">
          Place your Bid
        </h2>

        {/* Info Section */}
        <div className="bg-[#fdf7ec] rounded-lg p-4 mb-3">
          <div className="flex justify-between mb-2">
            <span className="font-medium text-gray-700">Crop</span>
            <span className="font-semibold text-gray-800">
              {popupDetails.current?.cropName || "-"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-700">Current Price</span>
            <span className="font-semibold text-gray-800">
              ₹{popupDetails.current?.currentPrice || 0} per quintal
            </span>
          </div>
        </div>

        {/* Input */}
        <div className="mb-3">
          <label className="block text-gray-700 font-medium mb-1">
            Enter your Bid
          </label>
          <input
            type="number"
            value={bidAmount}
            onChange={(e) => setBidAmount(e.target.value)}
            placeholder="5500"
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#458448]"
          />
        </div>

        {/* Disclaimer */}
        <p className="text-sm text-gray-500 mb-4">
          Disclaimer: Your bid must be at least ₹100 more than the current
          price. Lower bids won’t be accepted.
        </p>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="w-full bg-[#458448] hover:bg-[#3b6f3b] text-white py-2 rounded-lg font-semibold transition-colors"
        >
          Place Bid
        </button>
      </div>
    </div>,
    document.body
  );
}
