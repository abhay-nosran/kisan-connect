const { kafka } = require("./kafka");

async function init() {
  const admin = kafka.admin();
  await admin.connect();

  const existingTopics = await admin.listTopics();

  if (!existingTopics.includes("bids")) {
    await admin.createTopics({
      topics: [
        {
          topic: "bids",
          numPartitions: 2,
        },
      ],
    });
    console.log("✅ 'bids' topic created");
  } else {
    console.log("⚠️ 'bids' topic already exists");
  }

  await admin.disconnect();
}

init();
