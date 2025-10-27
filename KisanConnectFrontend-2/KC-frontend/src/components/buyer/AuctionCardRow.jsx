import { useState, useEffect } from "react";
import MapPinIcon from "../../assets/MapPinIcon.svg";
import GradeIcon from "../../assets/GradeIcon.svg"
import Countdown from "./CountDown";
import AnimatedPrice from "./AnimatedPrice";

const unit = "Quintal"

export default function AuctionCardRow({ auction , refStateHandler , refViewDetailsHandler , popupDetails , refCurrentPriceHandlers}) {
  const {
    image,
    auctionId,
    basePrice,
    status
  } = auction;
  const [currentPrice , setCurrentPrice] = useState(Math.max(parseFloat(auction.highestBid),parseFloat(basePrice)))

  const auctionEndTime = auction.endTime;
  const cropName = auction.Crop.cropType ;
  const grade = auction.Crop.qualityGrade ;
  const quantity = auction.Crop.quantityKg ;
  const location = auction.Crop.location ;

  
  console.log("Auction Card Redereded " , auctionId)
  function handleViewDetails(){
    popupDetails.current = {}
    popupDetails.current.cropName = cropName ;
    popupDetails.current.currentPrice = currentPrice ; 
    popupDetails.current.auctionId = auctionId ;

    refViewDetailsHandler.current(true) ;
    // view details has been clicked (open the popup) 
    // alert("View Details to be Implemented") 
  }

  function handlePlaceBid(){
    // place bid has been clicked (open the popup) 
    // update the popup values 
    popupDetails.current = {}
    popupDetails.current.cropName = cropName ;
    popupDetails.current.currentPrice = currentPrice ; 
    popupDetails.current.auctionId = auctionId ;

    // render the popup
    refStateHandler.current(true) ;
  }

  function changeCurrentPrice(value){
    setCurrentPrice(value) ;
  }
  useEffect(()=>{
    refCurrentPriceHandlers.current[auctionId] = changeCurrentPrice ;

    return ()=>{
      refCurrentPriceHandlers.current[auctionId] = null 
    }
  },[])
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
              <AnimatedPrice currentPrice={currentPrice}/>
            </p>
        </div>

        <hr/>

        <div className="flex justify-between">
           <div className="text-red-600 ">
                 <Countdown endTime={auctionEndTime} />
            </div>
        
            <div className="flex space-x-3">
                <button className="border border-green-700 text-green-700 px-4 py-1 rounded-lg hover:bg-green-50 transition" onClick={handleViewDetails}>
                    View Details →
                </button>
                <button
                  className={`px-4 py-1 rounded-lg font-semibold transition 
                    ${status === "closed"
                      ? "bg-gray-400 text-white cursor-not-allowed"
                      : "bg-green-700 text-white hover:bg-green-800"}
                  `}
                  onClick={handlePlaceBid}
                  disabled={status === "closed"}
                >
                  Bid
                </button>
            </div>
        </div>
      </div>
    </div>
  );
}
