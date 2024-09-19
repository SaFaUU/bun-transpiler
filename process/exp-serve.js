import { watcher } from "./exp-start";

const BASE_PATH = "./www";


export const server = Bun.serve({
    reusePort: true,
    port: 3000,
    async fetch(req, server) {
        // Serve static files
        const filePath = BASE_PATH + new URL(req.url).pathname;
        try {
            const fileData = Bun.file(filePath);
            return new Response(fileData);
        } catch (e) {
            return new Response(null, { status: 404 });
        }
    },
    error() {
        return new Response(null, { status: 404 });
    },
});


console.log(`Listening on http://localhost:${server.port} ...`);
