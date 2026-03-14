import { createClient } from "redis";

const client = createClient({
  url: "rediss://default:gQAAAAAAAQ4PAAIncDFlOTZjNTBkMTU1NzI0ZDJlYjAwNjdiZDllOWUyZjExZHAxNjkxMzU@whole-cod-69135.upstash.io:6379",
});

client.on("error", function (err) {
  console.error("Redis Error:", err);
});

await client.connect();

const createNewClient = async () => {
  const newClient = createClient({
    url: "rediss://default:gQAAAAAAAQ4PAAIncDFlOTZjNTBkMTU1NzI0ZDJlYjAwNjdiZDllOWUyZjExZHAxNjkxMzU@whole-cod-69135.upstash.io:6379",
  });
  newClient.on("error", (err) => console.error("New Client Redis Error:", err));
  await newClient.connect();
  return newClient;
};

export { createNewClient };
export default client;
