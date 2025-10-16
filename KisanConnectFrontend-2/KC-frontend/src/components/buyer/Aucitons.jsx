import { useState , useRef, useEffect} from "react";
import ActivityBar from "./ActivityBar";
import AuctionCardRow from "./AuctionCardRow";
import riceImage from "../../assets/riceImage.jpg"
import Filter from "./filter/Filters";
import {getAuctions} from "../../apis"

function Auctions(){
    const [selectedGrade, setSelectedGrade] = useState([]);
    const [currentPage , setCurrentPage] = useState(1) ;
    const [quantityRange,setQuantityRange] = useState([0,1000])
    const [priceRange,setPriceRange] = useState([0,10000])
    const totalPages = useRef(10) ; // object
    const [submitClicked,setSubmitClicked] = useState(false) ;
    
    const mockAuction = {
        image : riceImage ,
        cropName: "Wheat Premium",
        location: "Punjab",
        grade: "A+",
        quantity: 500,
        auctionId: "AUC123",
        basePrice: 1800,
        currentPrice: 2000,
        auctionEndTime: "2025-10-15T21:30:00.000+05:30", // ends in 10 seconds
    };

    useEffect(()=>{
       if(submitClicked){
        const fetchAuctions = async () => {
            try {
            const filter = {
                page: currentPage,
                limit: 10,
                minQuantity: quantityRange[0],
                maxQuantity: quantityRange[1],
                minPrice: priceRange[0],
                maxPrice: priceRange[1],
                qualityGrades: selectedGrade,
            };
            console.log(filter)
            const auctions = await getAuctions(filter);
            console.log("Fetched Auctions:", auctions);
            } catch (err) {
            console.error("Error fetching auctions:", err);
            } finally {
            setSubmitClicked(false);
            }
        };

        fetchAuctions();
        }
    },[submitClicked])


    // console.log(selectedGrade," ",currentPage," ",quantityRange[0] , quantityRange[1])
   
    return (
        <div className="m-2">
            <ActivityBar currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages = {totalPages} />
            <div className="flex justify-between">
                <Filter selectedGrade = {selectedGrade} setSelectedGrade = {setSelectedGrade} quantityRange={quantityRange} setQuantityRange={setQuantityRange} setPriceRange={setPriceRange} setSubmitClicked = {setSubmitClicked}/>
                <AuctionCardRow auction={mockAuction}/>
            </div>
        </div>
    )
}

export default Auctions ;