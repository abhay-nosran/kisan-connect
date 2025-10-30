require("dotenv").config();
const BidsConsumer = require("./BidsConsumer");

// Read partition number from command line args
// Example usage: node entryPoint.js 1
const partition = parseInt(process.argv[2], 10);

if (isNaN(partition)) {
  console.error("❌ Please provide a valid partition number.\nExample: node entryPoint.js 0");
  process.exit(1);
}

(async () => {
  try {
    const consumer = new BidsConsumer(partition);
    await consumer.init();

    console.log(`🚀 Bids consumer started for partition ${partition}`);
  } catch (err) {
    console.error("❌ Error starting Bids Consumer:", err);
    process.exit(1);
  }
})();
