import client, { createNewClient } from "../config/redis.js";

// Initialize a separate client for subscribing
const initSubscriber = async () => {
  try {
    const subscriber = await createNewClient();

    await subscriber.subscribe("chat", (message) => {
      console.log("📢 Pub/Sub: Received Message:", message);
    });

    console.log(
      "✅ Redis Subscriber initialized and listening to 'chat' channel.",
    );
  } catch (error) {
    console.error("❌ Failed to initialize Redis Subscriber:", error);
  }
};

const PubSubController = {
  publishMessage: async (req, res) => {
    try {
      const { message } = req.query; // Allow passing message via query for easy testing
      const msgToSend = message || "This is a default test message";

      // Use the main client to publish
      await client.publish("chat", msgToSend);

      return res.status(200).json({
        success: true,
        msg: "Message published successfully!",
        publishedMessage: msgToSend,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        msg: `Error publishing message: ${error.message}`,
      });
    }
  },
};

export { initSubscriber, PubSubController };
