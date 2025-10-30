const { kafka } = require("../kafka/kafka");

class KafkaProducer {
  static instance;

  constructor() {
    if (KafkaProducer.instance) {
      return KafkaProducer.instance; // return existing instance
    }

    this.producer = kafka.producer();
    this.isConnected = false;
    KafkaProducer.instance = this;
  }

  // Connect producer only once
  async connect() {
    if (!this.isConnected) {
      await this.producer.connect();
      this.isConnected = true;
      console.log("✅ Kafka Producer connected");
    }
  }

  /**
   * Send message to any topic
   * @param {string} topic - Kafka topic name
   * @param {object} message - message object (will be stringified)
   * @param {string|number} [key] - optional partition key
   */
  async send({ topic, message, key = null }) {
    try {
      await this.connect();

      await this.producer.send({
        topic,
        messages: [
          {
            key: key ? String(key) : null,
            value: JSON.stringify({
              ...message,
              timestamp: Date.now(),
            }),
          },
        ],
      });

      console.log(`📨 Message sent to topic '${topic}'`);
    } catch (err) {
      console.error(`❌ Error producing to topic '${topic}':`, err);
    }
  }

  // Graceful disconnect
  async disconnect() {
    if (this.isConnected) {
      await this.producer.disconnect();
      this.isConnected = false;
      console.log("🔌 Kafka Producer disconnected");
    }
  }
}

module.exports = new KafkaProducer();
