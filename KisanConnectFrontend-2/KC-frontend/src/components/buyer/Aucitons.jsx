import { useState , useRef, useEffect} from "react";
import ActivityBar from "./ActivityBar";
import AuctionCardRow from "./AuctionCardRow";
import Filter from "./filter/Filters";
import {getAuctions} from "../../apis"

function Auctions(){
    const [selectedGrade, setSelectedGrade] = useState([]);
    const [currentPage , setCurrentPage] = useState(1) ;
    const [quantityRange,setQuantityRange] = useState([0,1000])
    const [priceRange,setPriceRange] = useState([0,10000])
    const totalPages = useRef(10) ; // object
    const [submitClicked,setSubmitClicked] = useState(false) ;
    const [auctions,setAuctions] = useState([]) ;

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
            setAuctions(auctions)

            } catch (err) {
            console.error("Error fetching auctions:", err);
            } finally {
            setSubmitClicked(false);
            }
        };

        fetchAuctions();
        }
    },[submitClicked])

    useEffect(()=>{

        async function fetchAuctions() {
            try{
            const filter = {
                page: currentPage,
                limit: 10,
                minQuantity: quantityRange[0],
                maxQuantity: quantityRange[1],
                minPrice: priceRange[0],
                maxPrice: priceRange[1],
                qualityGrades: selectedGrade,
            };
            const auctions = await getAuctions(filter);
            setAuctions(auctions) ;
            }catch(err){
                console.error("Error fetching auctions:", err);
            }
        }
        fetchAuctions() 
    },[])

    // console.log(selectedGrade," ",currentPage," ",quantityRange[0] , quantityRange[1])
   
    return (
        <div className="m-2">
            <ActivityBar currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages = {totalPages} />
            <div className="flex justify-evenly">
                <Filter selectedGrade = {selectedGrade} setSelectedGrade = {setSelectedGrade} quantityRange={quantityRange} setQuantityRange={setQuantityRange} setPriceRange={setPriceRange} setSubmitClicked = {setSubmitClicked}/>
                <div className="w-3/4 space-y-4">
                    {/* <AuctionCardRow auction={mockAuction}/> */}
                    {auctions.length > 0 ?
                        auctions.map((auction)=>{
                            return <AuctionCardRow key={auction.auctionId} auction={auction}/>
                        })
                     :  <div>No Auctions Available</div>
                     }
                </div>
            </div>
        </div>
    )
}

export default Auctions ;