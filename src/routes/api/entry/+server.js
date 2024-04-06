
import client from "../../../server/redis";

export async function GET() {
    //const stream = { 'ORDER_ENTRY'};

    try {
        const result = await client.xRead({ key: 'order_entry', id: '0' });

        if (result && Object.keys(result).length > 0) {
            const responseData = [];

            for (const [stream, streamData] of Object.entries(result)) {
                if (Array.isArray(streamData.messages)) {
                    streamData.messages.forEach((message) => {
                        responseData.push(message.message); // Push message data to responseData array
                    });
                }
            }

            // Returning a successful response with JSON data
            return new Response(JSON.stringify(responseData), {
                status: 200,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        } else {
            // No messages available
            return new Response(JSON.stringify({ message: 'No messages available' }), {
                status: 404,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
    } catch (err) {
        console.error('Error reading messages:', err);
        // Returning an error response
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}