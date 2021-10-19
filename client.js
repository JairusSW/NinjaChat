const WebSocket = require("ws");
const readLineSync = require("readline-sync");
const Speaker = require("speaker");
const Prism = require("prism-media");
const fs = require("fs");
// Require WebSocket (ws)
const client = new WebSocket("ws://localhost:3000/");
const userInput = require("./userInput");
// Connect to server on ws://localhost:3000/
//if (!username) {
let name;
//}

client.on("message", (data) => {
  if (!data.toString().startsWith(name)) console.log(data.toString());
  // Play notification sound
  const speaker = new Speaker({
    channels: 2,
    bitDepth: 16,
    sampleRate: 44100,
  });

  const transcoder = new Prism.FFmpeg({
    args: [
      "-analyzeduration",
      "0",
      "-loglevel",
      "0",
      "-ac",
      "2",
      "-b:a",
      "44100",
      "-f",
      "s16le",
    ],
  });
  fs.createReadStream("./sound.ogg").pipe(transcoder);
  transcoder.pipe(speaker);
});

client.on("open", async () => {
  // Set the name
  name = await userInput.question("Enter a username: ");
  console.log("\nUsername accepted");
  const room = await userInput.question("Enter a room: ");
  console.log("\nRoom accepted");
  client.send(`ROOM: ${room}`);
  // When we are connected...
  while (true) {
    const message = await userInput.question("");
    console.log("");
    process.stdout.moveCursor(0, -1);
    process.stdout.clearLine(1);
    // Dis clears line (I think)
    console.log("Me: " + message);
    client.send(`${name}: ${message}`);
  }
  // Send a message to the server that says: 'Hey, Server!'
});
