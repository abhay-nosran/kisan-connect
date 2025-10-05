const clients = require("./clients")

function subscribeController(req,res){

    // header to keep the connection alive 
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');


     // Send an initial message
    res.write(`data: Connected to server\n\n`);

    clients.add(res) ;
    console.log("New client connected. Total:", clients.size);

    req.on('close', () => {
        clients.delete(res) ;
        console.log("Client disconnected. Total:", clients.size);
        res.end();
    });
}

module.exports = subscribeController 