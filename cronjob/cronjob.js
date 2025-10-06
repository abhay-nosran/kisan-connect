const cron = require('node-cron');
const client = require("./client")
const notifier = require("./Notifier")

async function updateAuctions(){

    try{
        
        const query = {
            text: 'SELECT * FROM update_auction_status();',
            rowMode: 'array',
        }

        const res = await client.query(query);
        console.log('Updated auctions:', res.rows);
        // push records into the redis 
        res.rows.forEach(row => notifier(row));
    }catch(err){

        console.log("Error in Auction Status Update Cron Job : " , err) ;
    }
}
cron.schedule('* * * * *', () => {
  updateAuctions() ;
});

