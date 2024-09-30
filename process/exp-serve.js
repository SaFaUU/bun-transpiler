const BASE_PATH = "./www";

import { watch } from 'fs';

const clients = [];

// SSE handler for new connections
function sendEvent(req) {
    const stream = new ReadableStream({
        start(controller) {
            // Add the client (controller) to the list
            clients.push(controller);

            // Keep the connection alive by sending a comment every 30 seconds
            const keepAliveInterval = setInterval(() => {
                controller.enqueue(':\n\n'); // Comment to keep connection alive
            }, 25000);

            req.signal.addEventListener("abort", () => {
                clearInterval(keepAliveInterval);
                clients.splice(clients.indexOf(controller), 1);
            });
        }
    });

    return new Response(stream, {
        headers: {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
            'Access-Control-Allow-Origin': '*',
        }
    });
}

// Send 'change' event to all connected clients
export function broadcastChange() {
    clients.forEach((controller) => {
        controller.enqueue('event: change\n');
        controller.enqueue('data: file updated\n\n');
    });
}


export const server = Bun.serve({
    reusePort: true,
    port: 3000,
    async fetch(req) {
        const url = new URL(req.url);

        try {
            if (url.pathname === '/') {
                return new Response("Hello Mom!", { status: 200 });
            }

            if (url.pathname === '/index.js') {
                const filePath = `${BASE_PATH}/index.js`;
                const fileData = Bun.file(filePath);
                return new Response(fileData, {
                    headers: { "Content-Type": "application/javascript", 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS' }
                });
            }

            if (url.pathname === '/index.css') {
                const filePath = `${BASE_PATH}/index.css`;
                const fileData = Bun.file(filePath);
                return new Response(fileData, {
                    headers: { "Content-Type": "text/css", 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS' }
                });
            }

            if (url.pathname === '/events') {
                return sendEvent(req);
            }

            return new Response("Not Found", { status: 404 });
        } catch (error) {
            console.error('[SERVER] Error handling request:', error);
            return new Response("Internal Server Error", { status: 500 });
        }
    },
    error() {
        return new Response("Error occurred", { status: 500 });
    },
});