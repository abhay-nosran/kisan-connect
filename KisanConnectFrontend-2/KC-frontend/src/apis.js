import axios from "axios";
import { url } from "./config.js";

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjYsInJvbGUiOiJidXllciIsInJvbGVJZCI6MSwiaWF0IjoxNzYwNjE1NzgwLCJleHAiOjE3NjA2MTkzODB9.GNRdQ9d2Ga36B11RaQCqjxCVACJg0KHkC1IL-VV2niM";

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

    // Make GET request with Authorization header
    const response = await axios.get(`${url}buyer/auctions`, {
      params,
      headers: {
        Authorization: `Bearer ${token}`,
      },
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



