const client = require("./client") ;
const clients = require("./clients")

async function getMessage() {

  const rawMessage = await client.blpop("auctions",0) ;
  const message = JSON.parse(rawMessage[1]) ;
  
  return message ;
}

async function messageReader(){
  console.log("Started Reading Auciton meassages")
  while(true){
    try{
      const message = await getMessage() ;

      clients.forEach(element => {
        element.write(`data: ${JSON.stringify(message)}\n\n`)
      });

    }catch(err){
      console.error("❌ Error:", err);
      await new Promise(res => setTimeout(res, 1000)); // retry delay
    }
  }

}

module.exports = messageReader ; 

