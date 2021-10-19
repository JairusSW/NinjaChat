const Speaker = require("speaker");
const Prism = require("prism-media");
const fs = require("fs");
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
