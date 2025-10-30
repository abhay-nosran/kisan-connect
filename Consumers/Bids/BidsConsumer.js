const { kafka } = require("./kafka");
const updateHighestBid = require("./auctionUpdate");

class BidsConsumer {
  constructor(partition = 0) {
    this.partition = partition;
    this.buffer = [];
    this.consumer = kafka.consumer({
      groupId: `bids-consumer-group-${partition}`,
    });
  }

  async init() {
    await this.consumer.connect();

    // Instead of .assign(), use .subscribe() with manual partition filter later
    await this.consumer.subscribe({ topic: "bids", fromBeginning: false });

    console.log(`✅ Listening to bids on partition ${this.partition}`);

    await this.consumer.run({
      eachMessage: async ({ partition, message }) => {
        if (partition !== this.partition) return; // filter only assigned partition
        const value = JSON.parse(message.value.toString());
        this.buffer.push(value);
      },
    });

    // Process buffer every 1 second
    setInterval(() => this.processBuffer(), 1000);
  }

  async processBuffer() {
    if (this.buffer.length === 0) return;

    const latest = {};
    for (const bid of this.buffer) {
      const { auctionId, bidAmount, buyerId } = bid;
      if (!latest[auctionId] || bidAmount > latest[auctionId].bidAmount) {
        latest[auctionId] = { buyerId, bidAmount };
      }
    }

    this.buffer = [];

    // Update all auctions
    for (const [auctionId, { buyerId, bidAmount }] of Object.entries(latest)) {
      await updateHighestBid({ buyerId, bidAmount, auctionId });
    }
  }
}

module.exports = BidsConsumer;
