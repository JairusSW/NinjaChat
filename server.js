const WebSocket = require("ws");
// Require WebSocket (ws)
const server = new WebSocket.Server({
  port: 3000,
});
const clients = new Map();
// Create a server on ws://localhost:3000/
server.on("connection", (client) => {
  let room = "general";
  // When a client connects...
  client.on("message", (data) => {
    if (data.toString().startsWith("ROOM:")) {
      room = data.toString().split("ROOM: ")[1].trim().toLowerCase();
      if (!clients.has(room)) clients.set(room, [client]);
      else clients.get(room).push(client);
      return;
    }
    // When the client sends us a message...
    console.log("Got Message From Client: " + data.toString());
    // Print it to the console
    for (const c of clients.get(room)) {
      c.send(data, { binary: true });
    }
  });
  // Say, hey to the client!
});
