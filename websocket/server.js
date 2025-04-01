const WebSocket = require("ws");

const server = new WebSocket.Server({ port: 8080 });

server.on("connection", (ws) => {
    console.log("Client connected");

    ws.on("message", (message) => {
        //console.log(`Received: ${message}`);

        // TO DO: Right now the WebSocket broadcast to all connected clients. 
        // - Implement the logic to check if the user data are valid
        // - Implement the logic to send messages to a specific user

        server.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({ id: 12, lastName: 'Termon', firstName: 'David', age: 43, distance: 151 }));
            }
        });
    });

    ws.on("close", () => {
        console.log("Client disconnected");
    });
});

//console.log("WebSocket server is running on ws://localhost:8080");