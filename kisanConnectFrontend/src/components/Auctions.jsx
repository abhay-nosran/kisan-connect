import Card from "./Card";
import FilterSidebar from "./FilterSidebar";
import SearchBar from "./Searchbar";
import { useRef } from "react";
import { useEffect, useState } from "react";  
import ViewDetailsPopup from "./ViewDetailsPopup";
import PlaceBidPopup from "./PlaceBidPopup";
import axios from "axios";

export default  function Auctions() {
    
  const api = "http://localhost:5000/auctions/live";
  let auctionDisplaying = useRef(new Set());

  useEffect(()=>{
    handleFetchData();
    const evtSource = new EventSource("http://localhost:5000/auctionsUpdate");
    evtSource.addEventListener("establish",(event)=>{
      console.log("Connection established with ",event.data); 
    })

    evtSource.addEventListener("update",(event)=>{
      const eventData = JSON.parse(event.data);
      console.log("New auction data:", eventData);
      if (auctionDisplaying.current.has(String(eventData.auctionId))) {
        console.log("updating");
        updateAuction(String(eventData.auctionId), eventData); // normalize ID
      } else {
        console.log("Auction not displayed:");
      }
      
    })
    return()=>{
      evtSource.close();
    }
  },[])

  function updateAuction(auctionId, auctionData) {
    setResult((prevResult) => {
      return prevResult.map((auction) => {
        if (String(auction.auctionId) === String(auctionId)) {
          return {
            ...auction,
            currentPrice: auctionData.highest_bid,
          };
        }
        return auction;
      });
    });
    console.log("Popup State:", ViewDetailsPopupRef);
    if(ViewDetailsPopupRef.current.open && ViewDetailsPopupRef.current.auctionId == auctionId){
      console.log("updating current price in popup");
      setCurrentPrice(auctionData.highest_bid);
    }
    if(PlaceBidPopupRef.current.open && PlaceBidPopupRef.current.auctionId == auctionId){
      console.log("updating current price in place-bid popup");
      setCurrentPrice(auctionData.highest_bid);
    }


  }
  async function handleFetchData(){
    let response = await axios.get(api, { 
      params: {
        cropType: filters.cropType,
        qualityGrade: filters.qualityGrade,
        shelfLife: filters.shelfLife,
        location: filters.location,
        sortBy: filters.sortBy,
        quantityMin: filters.quantityMin,
        quantityMax: filters.quantityMax,
        priceMin: filters.priceMin,
        priceMax: filters.priceMax,
        immediateDelivery: filters.immediateDelivery,
      }
    });
    
    for (let i = 0; i < response.data.auctions.length; i++) {
      auctionDisplaying.current.add(String(response.data.auctions[i].auction_id));
    }

    console.log(auctionDisplaying.current);

   const transformedData = response.data.auctions.map((auction) => ({
    cropName: auction.crop_name || "Unknown",
    grade: auction.quality_grade || "Unknown",
    quantity: auction.quantity || "0",
    auctionId: String(auction.auction_id), // 👈 ensure string
    location: auction.crop_location || "Unknown",
    basePrice: auction.base_price,
    currentPrice: auction.highest_bid || auction.base_price,
    endTime: auction.end_time,
  }));

    console.log(response.data.auctions);
    setResult(transformedData);
  }

  function handleSearch(){
    handleFetchData();
  }
  
  const [filters, setFilters] = useState({
    cropType: '',
    qualityGrade: '',
    shelfLife: '',
    location: '',
    sortBy: 'Low to High',
    quantityMin: '',
    quantityMax: '',
    priceMin: '',
    priceMax: '',
    immediateDelivery: false,
  });

  const [currentPrice, setCurrentPrice] = useState(null);
  const [result, setResult] = useState([]);
  const [ViewDetailsPopupState,setViewDetailsPopup] = useState({open:false, auctionId:null});
  const [PlaceBidPopupState,setPlaceBidPopup] = useState({open:false, auctionId:null ,crop_name:null,currentPrice:null});
  const ViewDetailsPopupRef = useRef(ViewDetailsPopupState);
  const PlaceBidPopupRef = useRef(PlaceBidPopupState);

  useEffect(() => {
    ViewDetailsPopupRef.current = ViewDetailsPopupState;
  },[ViewDetailsPopupState])
  useEffect(() => {
    PlaceBidPopupRef.current = PlaceBidPopupState;
  },[PlaceBidPopupState])
    return (
      <div>
        <div className={`flex flex-row my-8 gap-8 ${ViewDetailsPopupState.open ? "pointer-events-none" : ""}`}>
          <div className="">
          <FilterSidebar filter = {{filters,setFilters,handleSearch}}/>
          </div>
          <div className="grow flex flex-col items-center gap-6">
            <div className="w-full"><SearchBar /></div>
            <div className="text-[#458448] font-extrabold">ORDER BOARD</div>
            
              {result.map((cardDetails, index) => (
                <Card key={cardDetails.auctionId || index} cardDetails={cardDetails} setViewDetailsPopup = {setViewDetailsPopup} setPlaceBidPopup = {setPlaceBidPopup}/>
              ))} 
            
          </div>
        </div> 
        {ViewDetailsPopupState.open &&(
          <ViewDetailsPopup ViewDetailsPopupState = {ViewDetailsPopupState} setViewDetailsPopup={setViewDetailsPopup} currentPrice={currentPrice} setCurrentPrice={setCurrentPrice}/>
        )}{
          PlaceBidPopupState.open && (
            <PlaceBidPopup PlaceBidPopupState = {PlaceBidPopupState} setPlaceBidPopup={setPlaceBidPopup} currentPrice={currentPrice}/>
          )
        }
      </div> 
    )
} 