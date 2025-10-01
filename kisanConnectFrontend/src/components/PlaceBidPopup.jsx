import { X } from "lucide-react";
import { use, useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function PlaceBidPopup({ PlaceBidPopupState, setPlaceBidPopup , currentPrice}) {
    const [bidAmount, setBidAmount] = useState("");
    const token = localStorage.getItem("token");
    const role_id = localStorage.getItem("userId");
    const userType = localStorage.getItem("userType");
    const auctionId = PlaceBidPopupState.auctionId;
    currentPrice = PlaceBidPopupState.currentPrice;
    console.log("PlaceBidPopupState", PlaceBidPopupState);
    const navigate = useNavigate();
    // useEffect(() => {
    //      currentPrice = PlaceBidPopupState.currentPrice;
    // }, [PlaceBidPopupState]);
    if (userType !== "buyer" || !token || !role_id) {
        localStorage.removeItem("token");
        localStorage.removeItem("userType");
        localStorage.removeItem("userId");
        navigate("/login");
        return null;
    }

    const placebidhandler = async (amt) => {
        if (amt < currentPrice + 100) {
            alert("Bid must be at least ₹100 more than the current price");
            return;
        }

        try {
            await axios.post(
                `http://localhost:5000/auctions/${auctionId}/bids`,
                {
                    buyer_id: role_id,
                    bid_amount: amt,
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            alert("Bid placed successfully!");
            setPlaceBidPopup({open:false, auctionId:null ,crop_name:null}); // close popup on success
        } catch (error) {
            if (error.response?.data?.error === "Invalid token.") {
                localStorage.removeItem("token");
                localStorage.removeItem("userType");
                localStorage.removeItem("userId");
                alert("Session expired. Please log in again.");
                navigate("/login");
            }
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
            <div className="bg-white rounded-2xl shadow-lg p-6 w-[350px]">
                {/* Close Button */}
                <div className="flex justify-end">
                    <button onClick={() => setPlaceBidPopup({open:false, auctionId:null ,crop_name:null})}>
                        <X className="w-5 h-5 text-black" />
                    </button>
                </div>

                <h2 className="text-center text-green-700 font-bold text-xl mb-4">Place your Bid</h2>

                <div className="bg-[#FFF7E7] rounded-xl p-4 space-y-4">
                    <div className="flex justify-between">
                        <p className="font-semibold">Crop</p>
                        <p>{PlaceBidPopupState.cropName}</p>
                    </div>

                    <div className="flex justify-between">
                        <p className="font-semibold">Current Price</p>
                        <p>{currentPrice} per quintal</p>
                    </div>

                    <div className="flex justify-between items-center">
                        <p className="font-semibold">Enter your Bid</p>
                        <input
                            type="number"
                            value={bidAmount}
                            onChange={(e) => setBidAmount(parseInt(e.target.value))}
                            className="border rounded px-2 py-1 w-24 text-right"
                            placeholder="₹"
                        />
                    </div>
                </div>

                <p className="text-xs text-gray-500 mt-4">
                    Disclaimer: Your bid must be at least ₹100 more than the current price. Lower bids won’t be accepted.
                </p>

                <button
                    onClick={() => placebidhandler(bidAmount)}
                    className="w-full mt-4 bg-[#458448] text-white font-semibold py-2 rounded-full hover:bg-green-800 transition"
                >
                    Place Bid
                </button>
            </div>
        </div>
    );
}
