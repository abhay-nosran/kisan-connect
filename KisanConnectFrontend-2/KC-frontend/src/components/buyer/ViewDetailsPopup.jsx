import { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import { getDetails } from "../../apis"; // ← your API function

export default function ViewDetailsPopup({ popupDetails, refViewDetailsHandler }) {
  const modalRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [showPortal, setShowPortal] = useState(false);
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  // Function to toggle popup visibility
  function changeState(value) {
    if (value) {
      setShowPortal(true);
      setTimeout(() => setIsVisible(true), 10);
      fetchDetails(); // fetch data when opening
    } else {
      setIsVisible(false);
      setTimeout(() => setShowPortal(false), 200);
    }
  }

  // Expose changeState to parent
  useEffect(() => {
    refViewDetailsHandler.current = changeState;
  }, [refViewDetailsHandler]);

  // Fetch details using auctionId
  async function fetchDetails() {
    const auctionId = popupDetails.current?.auctionId;
    if (!auctionId) return;

    try {
      setLoading(true);
      const result = await getDetails(auctionId);
      setDetails(result);
    } catch (err) {
      console.error("Error fetching details:", err);
      alert("⚠️ Failed to fetch auction details.");
    } finally {
      setLoading(false);
    }
  }

  // Close when clicking outside
  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      changeState(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!showPortal) return null;

  return createPortal(
    <div
      className={`fixed inset-0 flex justify-center items-center z-50 transition-opacity duration-200 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Overlay */}
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
        className={`relative bg-white rounded-2xl shadow-lg w-[480px] p-6 z-10 transform transition-transform duration-200 ${
          isVisible ? "scale-100" : "scale-95"
        }`}
      >
        <button
          onClick={() => changeState(false)}
          className="absolute top-3 right-4 text-gray-600 hover:text-gray-800 text-2xl leading-none"
        >
          &times;
        </button>

        <h2 className="text-xl font-semibold text-center text-[#458448] mb-4">
          Auction Details
        </h2>

        {loading ? (
          <p className="text-center text-gray-600">Loading details...</p>
        ) : details ? (
          <div className="space-y-3 text-gray-700">
            <div className="flex justify-between">
              <span className="font-medium">Auction ID:</span>
              <span>{details.auctionId}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Base Price:</span>
              <span>₹{details.basePrice}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Start Time:</span>
              <span>{new Date(details.startTime).toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">End Time:</span>
              <span>{new Date(details.endTime).toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Status:</span>
              <span className="capitalize">{details.status}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Highest Bid:</span>
              <span>₹{details.highestBid || "—"}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Highest Bidder:</span>
              <span>{details.highestBidder || "—"}</span>
            </div>

            <hr className="my-3" />

            <h3 className="text-lg font-semibold text-[#458448]">Crop Info</h3>
            <div className="flex justify-between">
              <span className="font-medium">Type:</span>
              <span>{details.crops.cropType}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Quantity:</span>
              <span>{details.crops.quantityKg} kg</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Quality Grade:</span>
              <span>{details.crops.qualityGrade}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Farmer Location:</span>
              <span>{details.crops.farmers?.location}</span>
            </div>

            {details.crops.certification && (
              <div className="text-center mt-3">
                <a
                  href={details.crops.certification}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#458448] underline font-medium hover:text-[#356d36]"
                >
                  View Certification (PDF)
                </a>
              </div>
            )}
          </div>
        ) : (
          <p className="text-center text-gray-600">No details available.</p>
        )}
      </div>
    </div>,
    document.body
  );
}
