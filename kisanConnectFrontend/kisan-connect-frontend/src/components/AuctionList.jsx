// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const AuctionList = () => {
//     const [auctions, setAuctions] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [page, setPage] = useState(1);
//     const [crop, setCrop] = useState("");
//     const [sort, setSort] = useState("date_desc");
//     const [hasMore, setHasMore] = useState(true);
//     const limit = 10;
//     const navigate = useNavigate();

//     // Function to fetch auctions
//     const fetchAuctions = async () => {
//         const token = localStorage.getItem("token");

//         if (!token) {
//         navigate("/login");
//         return;
//         }
//         setLoading(true);
//         try {
//             const response = await axios.get("http://localhost:5000/auctions/live", {
//                 params: { page, limit, crop, sort } , headers: { Authorization: `Bearer ${token}` },
//             });
            

//             setAuctions(response.data.auctions);
//             setHasMore(response.data.auctions.length === limit);
//         } catch (error) {
//             if (error.response?.data?.error === "Invalid token.") {
//                 localStorage.removeItem("token");
//                 navigate("/login");
//               }
//             console.error("Error fetching auctions:", error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     // Fetch data on mount and when filters change
//     useEffect(() => {
//         fetchAuctions();
//     }, [page, crop, sort]);

//     return (
//         <div className="p-6">
//             <h2 className="text-2xl font-bold mb-4">Live Auctions</h2>

//             {/* Filters */}
//             <div className="flex gap-4 mb-4">
//                 <input
//                     type="text"
//                     placeholder="Search by Crop Name"
//                     value={crop}
//                     onChange={(e) => {
//                         setPage(1);
//                         setCrop(e.target.value);
//                     }}
//                     className="border px-3 py-2 rounded-md"
//                 />
//                 <select
//                     value={sort}
//                     onChange={(e) => {
//                         setPage(1);
//                         setSort(e.target.value);
//                     }}
//                     className="border px-3 py-2 rounded-md"
//                 >
//                     <option value="date_desc">Newest First</option>
//                     <option value="date_asc">Oldest First</option>
//                     <option value="price_asc">Price: Low to High</option>
//                     <option value="price_desc">Price: High to Low</option>
//                 </select>
//                 <button
//                     onClick={fetchAuctions}
//                     className="bg-blue-500 text-white px-4 py-2 rounded-md"
//                 >
//                     Refresh
//                 </button>
//             </div>

//             {/* Loading State */}
//             {loading ? (
//                 <p className="text-gray-500">Loading auctions...</p>
//             ) : auctions.length === 0 ? (
//                 <p className="text-gray-500">No live auctions found.</p>
//             ) : (
//                 <table className="w-full border-collapse border border-gray-300">
//                     <thead>
//                         <tr className="bg-gray-200">
//                             <th className="border p-2">Auction ID</th>
//                             <th className="border p-2">Crop</th>
//                             <th className="border p-2">Quantity</th>
//                             <th className="border p-2">Base Price</th>
//                             <th className="border p-2">Highest Bid</th>
//                             <th className="border p-2">Highest Bidder</th>
//                             <th className="border p-2">Farmer</th>
//                             <th className="border p-2">Start Time</th>
//                             <th className="border p-2">End Time</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {auctions.map((auction) => (
//                             <tr
//                                 key={auction.auction_id}
//                                 className="hover:bg-gray-100 cursor-pointer"
//                                 onClick={() => navigate(`/auction/${auction.auction_id}`)}
//                             >
//                                 <td className="border p-2">{auction.auction_id}</td>
//                                 <td className="border p-2">{auction.crop_name}</td>
//                                 <td className="border p-2">{auction.quantity} kg</td>
//                                 <td className="border p-2">₹{auction.base_price}</td>
//                                 <td className="border p-2">₹{auction.highest_bid || "-"}</td>
//                                 <td className="border p-2">{auction.highest_bidder || "No bids yet"}</td>
//                                 <td className="border p-2">{auction.farmer_name}</td>
//                                 <td className="border p-2">{new Date(auction.start_time).toLocaleString()}</td>
//                                 <td className="border p-2">{new Date(auction.end_time).toLocaleString()}</td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             )}

//             {/* Pagination Controls */}
//             <div className="flex justify-center gap-4 mt-4">
//                 <button
//                     onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
//                     className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
//                     disabled={page === 1}
//                 >
//                     Previous
//                 </button>
//                 <span className="font-semibold">Page {page}</span>
//                 <button
//                     onClick={() => setPage((prev) => prev + 1)}
//                     className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
//                     disabled={!hasMore}
//                 >
//                     Next
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default AuctionList;


import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuctionList = () => {
    const [auctions, setAuctions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [crop, setCrop] = useState("");
    const [sort, setSort] = useState("date_desc");
    const [hasMore, setHasMore] = useState(true);
    const limit = 10;
    const navigate = useNavigate();

    // Function to fetch auctions
    const fetchAuctions = async () => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/login");
            return;
        }

        setLoading(true);
        try {
            const response = await axios.get("http://localhost:5000/auctions/live", {
                params: { page, limit, crop, sort },
                headers: { Authorization: `Bearer ${token}` },
            });

            setAuctions(response.data.auctions);
            setHasMore(response.data.auctions.length === limit);
        } catch (error) {
            if (error.response?.data?.error === "Invalid token.") {
                localStorage.removeItem("token");
                navigate("/login");
            }
            console.error("Error fetching auctions:", error);
        } finally {
            setLoading(false);
        }
    };

    // Logout function
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role_id"); // Remove token
        navigate("/login"); // Redirect to login page
    };

    // Fetch data on mount and when filters change
    useEffect(() => {
        fetchAuctions();
    }, [page, crop, sort]);

    return (
        <div className="p-6">
            {/* Header with Logout Button */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Live Auctions</h2>
                <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                >
                    Logout
                </button>
            </div>

            {/* Filters */}
            <div className="flex gap-4 mb-4">
                <input
                    type="text"
                    placeholder="Search by Crop Name"
                    value={crop}
                    onChange={(e) => {
                        setPage(1);
                        setCrop(e.target.value);
                    }}
                    className="border px-3 py-2 rounded-md"
                />
                <select
                    value={sort}
                    onChange={(e) => {
                        setPage(1);
                        setSort(e.target.value);
                    }}
                    className="border px-3 py-2 rounded-md"
                >
                    <option value="date_desc">Newest First</option>
                    <option value="date_asc">Oldest First</option>
                    <option value="price_asc">Price: Low to High</option>
                    <option value="price_desc">Price: High to Low</option>
                </select>
                <button
                    onClick={fetchAuctions}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                    Refresh
                </button>
            </div>

            {/* Loading State */}
            {loading ? (
                <p className="text-gray-500">Loading auctions...</p>
            ) : auctions.length === 0 ? (
                <p className="text-gray-500">No live auctions found.</p>
            ) : (
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border p-2">Auction ID</th>
                            <th className="border p-2">Crop</th>
                            <th className="border p-2">Quantity</th>
                            <th className="border p-2">Base Price</th>
                            <th className="border p-2">Highest Bid</th>
                            <th className="border p-2">Highest Bidder</th>
                            <th className="border p-2">Farmer</th>
                            <th className="border p-2">Start Time</th>
                            <th className="border p-2">End Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {auctions.map((auction) => (
                            <tr
                                key={auction.auction_id}
                                className="hover:bg-gray-100 cursor-pointer"
                                onClick={() => navigate(`/auction/${auction.auction_id}`)}
                            >
                                <td className="border p-2">{auction.auction_id}</td>
                                <td className="border p-2">{auction.crop_name}</td>
                                <td className="border p-2">{auction.quantity} kg</td>
                                <td className="border p-2">₹{auction.base_price}</td>
                                <td className="border p-2">₹{auction.highest_bid || "-"}</td>
                                <td className="border p-2">{auction.highest_bidder || "No bids yet"}</td>
                                <td className="border p-2">{auction.farmer_name}</td>
                                <td className="border p-2">{new Date(auction.start_time).toLocaleString()}</td>
                                <td className="border p-2">{new Date(auction.end_time).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {/* Pagination Controls */}
            <div className="flex justify-center gap-4 mt-4">
                <button
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
                    disabled={page === 1}
                >
                    Previous
                </button>
                <span className="font-semibold">Page {page}</span>
                <button
                    onClick={() => setPage((prev) => prev + 1)}
                    className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
                    disabled={!hasMore}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default AuctionList;
