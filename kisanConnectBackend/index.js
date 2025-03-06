import express from "express"
import cors from "cors"
import { WebSocketServer } from "ws";
import 'dotenv/config'
import  pool  from "./db.js";
import login from "./login.js";
import signUp from "./signUp.js";
import { authenticate ,authorize} from "./auth.js";
import getAllLive from "./routes/buyer/getAllLive.js";
import getAllCrops from "./routes/farmer/getAllCrops.js"
import getPendingCrops from "./routes/admin/getPendingCrops.js";
import approveCrop from "./routes/admin/approveCrop.js";
import addCrop from "./routes/representative/addCrop.js";
import getAuction from "./routes/buyer/getAuction.js";
import placeBid from "./routes/buyer/placeBid.js";
import cron from "./services/cron.js";


const port = process.env.PORT || 5000 ;
const app = express() ;
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())




// WebSocket Server
const wss = new WebSocketServer({ noServer: true });
const clients = new Map(); // Store connected clients per auction



app.post("/login",login);

app.post("/signup",signUp);

// Handle WebSocket connections
wss.on("connection", (ws, req) => {
  const auctionId = req.url.split("/").pop(); // Extract auction ID from URL

  if (!clients.has(auctionId)) {
    clients.set(auctionId, new Set());
  }
  clients.get(auctionId).add(ws);

  console.log(`New WebSocket connection for auction ${auctionId}`);

  ws.on("close", () => {
    clients.get(auctionId).delete(ws);
    if (clients.get(auctionId).size === 0) {
      clients.delete(auctionId);
    }
    console.log(`WebSocket closed for auction ${auctionId}`);
  });
});

// to get all live auctions    
app.get("/auctions/live",authenticate,authorize(["buyer"]),getAllLive);
// app.get("/auctions/live",getAllLive); // to get all live auctions  (without authentication)
  
//specific auction
// app.get("/auctions/:id",authenticate,authorize(["buyer"]), getAuction);
// app.get("/auctions/:id",getAuction);// to get specific auction (without authentication)
app.get("/auctions/:id",(req, res) => {
  if (req.headers.upgrade && req.headers.upgrade.toLowerCase() === "websocket") {
    wss.handleUpgrade(req, req.socket, Buffer.alloc(0), (ws) => {
      wss.emit("connection", ws, req);
    });
  } else {
    getAuction(req, res);
  }
  // console.log("specific auction")
  
  
});
async function broadcastBidUpdate(auctionId) {
  const result = await pool.query("SELECT * FROM auctions WHERE id = $1", [auctionId]);
  const updatedAuction = result.rows[0];

  if (clients.has(auctionId)) {
    clients.get(auctionId).forEach((ws) => {
      try {
        ws.send(JSON.stringify({ type: "auction_update", auction: updatedAuction }));
      } catch (error) {
        console.error(`Error sending WebSocket message:`, error);
      }
    });
  }
  
}

// Modify placeBid to trigger WebSocket updates
async function placeBidHandler(req, res) {
  try {
    await placeBid(req, res);
    const { auctionId } = req.params;
    await broadcastBidUpdate(auctionId);
  } catch (error) {
    console.error("Error broadcasting bid update:", error);
  }
}

//place a bid 
app.post("/auctions/:auctionId/bids",authenticate,authorize(["buyer"]),placeBidHandler);
// app.post("/auctions/:auctionId/bids",placeBidHandler);// to place a bid (without authentication)


// get auction where buyer is the higest bidder
app.get("/buyers/:buyerId/highest-bids",authenticate,authorize(["buyer"]), async (req, res) => {
  try {
      const { buyerId } = req.params;

      const query = `
          SELECT 
              a.id AS auction_id, 
              c.crop_name,  
              c.quantity, 
              a.base_price, 
              a.highest_bid, 
              a.start_time, 
              a.end_time, 
              a.status
          FROM auctions a
          JOIN crops c ON a.crop_id = c.id 
          WHERE a.highest_bidder = $1;
      `;

      const result = await pool.query(query, [buyerId]);

      res.json({
          buyer_id: buyerId,
          highest_bid_auctions: result.rows
      });

  } catch (error) {
      console.error("Error fetching highest bid auctions for buyer:", error);
      res.status(500).json({ error: "Internal Server Error" });
  }
});

//get auctions won by some particular buyer
app.get("/buyers/:buyerId/won-auctions",authenticate,authorize(["buyer"]), async (req, res) => {
  const { buyerId } = req.params;

  try {
      const client = await pool.connect();

      // Fetch auctions where the buyer was the highest bidder and the auction is closed
      const query = `
          SELECT a.id AS auction_id,  a.highest_bid AS winning_bid, a.end_time
          FROM auctions a
          WHERE a.highest_bidder = $1 AND a.status = 'closed'
          ORDER BY a.end_time DESC;
      `;

      const result = await client.query(query, [buyerId]);
      client.release();

      res.json({
          message: "Auctions won by the buyer",
          auctions: result.rows
      });

  } catch (err) {
      console.error("Error fetching won auctions:", err);
      res.status(500).json({ error: "Internal server error" });
  }
});

// get all crops by a given farmer
app.get("/farmers/:farmerId/crops",authenticate,authorize(["farmer"]),getAllCrops);

// add crop to the crops table by the our representative
app.post("/representatives/crops",authenticate,authorize(["representative"]), addCrop);


// admin can approve given crop id
app.post("/admin/approve-crop",authenticate,authorize(["admin"]), approveCrop);

// Get all pending crops
app.get("/admin/pending-crops",authenticate,authorize(["admin"]), getPendingCrops);



// app.listen(port,()=>{
//     console.log(`App is Listening on ${port}`) 
// })

const server = app.listen(port, () => {
  console.log(`App is listening on ${port}`);
});


