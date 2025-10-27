import { useState } from "react";
import WonAuctions from "./WonAuctions";
import Profile from "./Profile";

const ProfilePage = () => {
  const [wonAuctionsDisplay, setWonAuctionsDisplay] = useState(false);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[80vh] bg-gray-50">
      
      {/* --- Slider Toggle --- */}
      <div className="absolute top-6 right-8 bg-gray-200 rounded-full p-1 flex items-center w-56 shadow-inner">
        <button
          onClick={() => setWonAuctionsDisplay(false)}
          className={`flex-1 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
            !wonAuctionsDisplay
              ? "bg-green-600 text-white shadow"
              : "text-gray-700"
          }`}
        >
          Profile
        </button>
        <button
          onClick={() => setWonAuctionsDisplay(true)}
          className={`flex-1 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
            wonAuctionsDisplay
              ? "bg-green-600 text-white shadow"
              : "text-gray-700"
          }`}
        >
          Won Auctions
        </button>
      </div>

      {/* --- Main Content --- */}
      {wonAuctionsDisplay ? (
        <div className="w-full flex justify-center mt-16">
          <WonAuctions />
        </div>
      ) : (
        <Profile/>
      )}
    </div>
  );
};

export default ProfilePage;
