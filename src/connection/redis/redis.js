import { createClient } from "redis"

export const redis_connection = async () => {
    const client = createClient({
        url: "rediss://default:gQAAAAAAAsS6AAIgcDE0NDcyY2I3YjlmYzE0ZjM4OGJhMTBjYmJlMWFlNTM3OA@cosmic-gorilla-181434.upstash.io:6379"
    });

    client.on("error", function (err) {
        throw err;
    });
    await client.connect()
    console.log("redis connected")

    return client
}
