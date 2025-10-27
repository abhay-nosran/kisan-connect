import MapPinIcon from "../../../assets/MapPinIcon.svg";
import GradeIcon from "../../../assets/GradeIcon.svg";

const unit = "Quintal";

export default function PurchasedAuctionCard({
  auction,
  onMakePayment,
  onCheckDelivery,
  onViewDetails, // 👈 new handler prop
}) {
  const {
    image,
    auctionId,
    purchasePrice,
    status,
    endTime,
    Crop,
  } = auction;

  const cropName = Crop.cropType;
  const grade = Crop.qualityGrade;
  const quantity = Crop.quantityKg;
  const location = Crop.location;

  // 🔹 Helper: Action button (depends on status)
  function renderActionButton() {
    if (status === "payment_pending") {
      return (
        <button
          className="bg-green-700 text-white px-4 py-1 rounded-lg hover:bg-green-800 transition"
          onClick={() => onMakePayment(auctionId)}
        >
          💰 Make Payment
        </button>
      );
    } else if (status === "paid" || status === "in_transit") {
      return (
        <button
          className="border border-green-700 text-green-700 px-4 py-1 rounded-lg hover:bg-green-50 transition"
          onClick={() => onCheckDelivery(auctionId)}
        >
          🚚 Check Delivery
        </button>
      );
    } else if (status === "delivered") {
      return (
        <span className="text-green-700 font-semibold">✅ Delivered</span>
      );
    } else {
      return (
        <span className="text-gray-500 italic">No actions available</span>
      );
    }
  }

  return (
    <div className="flex bg-white rounded-2xl shadow-md overflow-hidden w-full min-h-[180px] max-w-4xl mx-auto border">
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
            <img src={GradeIcon} alt="grade" />
            <span>{grade}</span>
          </div>
        </div>

        <div className="flex justify-between text-gray-600 mt-2">
          <p>
            Quantity: <span className="font-medium">{quantity} {unit}</span>
          </p>
          <p>
            Auction ID: <span className="font-medium">{auctionId}</span>
          </p>
        </div>

        <div className="flex justify-between items-center text-gray-700 mt-1">
          <p>
            Purchase Price:{" "}
            <span className="font-semibold">{purchasePrice} / {unit}</span>
          </p>
          {endTime && (
            <div className="text-red-600 text-sm">
              Ends at: {new Date(endTime).toLocaleString()}
            </div>
          )}
        </div>

        <hr className="my-1" />

        <div className="flex justify-end items-center space-x-3">
          {/* 👇 New View Details button */}
          <button
            className="border border-green-700 text-green-700 px-4 py-1 rounded-lg hover:bg-green-50 transition"
            onClick={() => onViewDetails(auctionId)}
          >
            View Details →
          </button>

          {renderActionButton()}
        </div>
      </div>
    </div>
  );
}
