import api from "./config.js";

export async function getAuctions(filter) {
  try {
    const params = {};

    // Pagination
    if (filter.page) params.page = filter.page;
    if (filter.limit) params.limit = filter.limit;

    // Basic filters
    if (filter.isLive !== null && filter.isLive !== undefined)
      params.isLive = filter.isLive;

    if (filter.minQuantity !== null && filter.minQuantity !== undefined)
      params.minQuantity = filter.minQuantity;

    if (filter.maxQuantity !== null && filter.maxQuantity !== undefined)
      params.maxQuantity = filter.maxQuantity;

    // Locations
    if (Array.isArray(filter.locations) && filter.locations.length > 0)
      params.locations = JSON.stringify(filter.locations);

    // Grades → renamed to qualityGrades
    if (Array.isArray(filter.qualityGrades) && filter.qualityGrades.length > 0)
      params.qualityGrades = JSON.stringify(filter.qualityGrades);

    const token = localStorage.token 
    // Make GET request with Authorization header
    const response = await api.get("buyer/auctions", {
      params
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // },
    });

    return response.data; // array of object 
    // [
    //     {
    //         auctionId: 1,
    //         basePrice: '1200.00',
    //         startTime: '2025-10-06T16:59:39.000Z',
    //         endTime: '2025-10-06T17:10:04.000Z',
    //         status: 'closed',
    //         highestBid: '2800.00',
    //         highestBidder: 1,
    //         cropId: 1,
    //         Crop: { cropType: 'Wheat', quantityKg: '22.00', qualityGrade: 'A' }
    //     }
    // ]
  } catch (error) {
    console.error("Error fetching auctions:", error.response?.data || error.message);
    throw error;
  }
}

export async function login(email,password){

  try{
    const response = await api.post("login",{email:email,password:password});

    // extract token , user 
    const {token , user} = response.data ;

    localStorage.setItem("token",token) ;
    localStorage.setItem("user",JSON.stringify(user)) ;

    return {success : true , user} ;
  }catch(err){
    return {success : false , error : err.response?.data?.message || "Login failed"}
  }
}

export async function placeBid(auctionId, bidAmount) {
  
  
  try {
    const response = await api.post("buyer/placeBid",{
      auctionId : auctionId ,
      bidAmount : bidAmount 
    })

    return {success : true}

  } catch (error) {
    return {success : false , error : error.response?.data?.message || "Bid not placed"}
  }
}

export async function subscribe() {
    try {
     
    } catch (error) {
      
    }
}