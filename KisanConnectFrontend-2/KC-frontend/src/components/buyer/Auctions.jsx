import { useState , useRef, useEffect} from "react";
import ActivityBar from "./ActivityBar";
import AuctionCardRow from "./AuctionCardRow";
import Filter from "./filter/Filters";
import {getAuctions} from "../../apis"
import PlaceBidPopup from "./PlaceBidPopup";
import {subscribe} from "../../apis"
import ViewDetailsPopup from "./ViewDetailsPopup";

function Auctions(){
    
    const [currentPage , setCurrentPage] = useState(1) ;
    const totalPages = useRef(10) ; // object
    const [submitClicked,setSubmitClicked] = useState(false) ;
    const [auctions,setAuctions] = useState([]) ;

    const popupDetails = useRef({
        cropName : "Dummy" ,
        currentPrice : 0 ,
        auctionId : 0 ,
    }) ;

    const refFilters = useRef({
        quantityRange : [0,1000] ,
        priceRange : [0,10000] ,
        selectedGrade : [] 
    })

    const refStateHandler = useRef(()=>{console.log("Default")}) ;
    const refViewDetailsHandler = useRef(()=>{console.log("View Details")}) ;

    const refCurrentPriceHandlers = useRef({})
    // console.log("Auction Re-rendered !")
    useEffect(()=>{
       if(submitClicked){
        const fetchAuctions = async () => {
            try {
            const filter = {
                page: currentPage,
                limit: 10,
                minQuantity: refFilters.current.quantityRange[0],
                maxQuantity: refFilters.current.quantityRange[1],
                minPrice: refFilters.current.priceRange[0],
                maxPrice: refFilters.current.priceRange[1],
                qualityGrades: refFilters.current.selectedGrade,
            };
            // console.log(filter)
            const auctions = await getAuctions(filter);
            // console.log("Fetched Auctions:", auctions);
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
        let eventSource ;
        async function fetchAuctions() {

            try{
            const filter = {
               page: currentPage,
                limit: 10,
                minQuantity: refFilters.current.quantityRange[0],
                maxQuantity: refFilters.current.quantityRange[1],
                minPrice: refFilters.current.priceRange[0],
                maxPrice: refFilters.current.priceRange[1],
                qualityGrades: refFilters.current.selectedGrade,
            };
            const auctions = await getAuctions(filter);
            setAuctions(auctions) ;
            }catch(err){
                console.error("Error fetching auctions:", err);
            }

            // subscribe to broadcast service 
        }
        async function handleSubscribe() {
            eventSource = await subscribe();
           
            eventSource.addEventListener("message",(event)=>{

                if(event.data === "Connected to server"){
                    console.log("Connected to Server")
                    return ;
                }
                const message = JSON.parse(event.data) ;
                // console.log(message.auctionId , message.currentPrice)
                if(refCurrentPriceHandlers.current[message.auctionId]){
                    refCurrentPriceHandlers.current[message.auctionId](message.currentPrice)
                }
            })
        }
        fetchAuctions() ;
        handleSubscribe() ;

        return ()=>{
            if(eventSource){
                eventSource.close();
                console.log("SSE connection closed");
            }
        }
    },[])

    // console.log(selectedGrade," ",currentPage," ",quantityRange[0] , quantityRange[1])
   
    return (
        <div className="m-2">
            <ActivityBar currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages = {totalPages} />
            <div className="flex justify-evenly">
                <Filter refFilters = {refFilters} setSubmitClicked = {setSubmitClicked}/>
                <div className="w-3/4 space-y-4">
                    {/* <AuctionCardRow auction={mockAuction}/> */}
                    {auctions.length > 0 ?
                        auctions.map((auction)=>{
                            return <AuctionCardRow key={auction.auctionId} auction={auction} refViewDetailsHandler={refViewDetailsHandler} refStateHandler={refStateHandler} popupDetails = {popupDetails} refCurrentPriceHandlers = {refCurrentPriceHandlers}/>
                        })
                     :  <div>No Auctions Available</div>
                     }
                </div>
            </div>
            <PlaceBidPopup popupDetails={popupDetails} refStateHandler={refStateHandler}/>
            <ViewDetailsPopup popupDetails={popupDetails} refViewDetailsHandler={refViewDetailsHandler}/>
        </div>
    )
}

export default Auctions ;