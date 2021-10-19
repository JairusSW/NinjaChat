function question(message) {
  return new Promise((resolve, reject) => {
    if (message) process.stdout.write(message);
    let data = "";
    let destoyed = false;
    const terminal = process.stdin;
    terminal.setMaxListeners(0);
    terminal.setRawMode(true);
    terminal.resume();
    terminal.setEncoding("utf8");
    terminal.on("data", function (key) {
      // ctrl+c
      if (key === "\u0003") {
        process.exit();
        // enter
      }/* else if (key == "\22") {
        data += clipboardy.default.readSync();
      }*/ else if (key.charCodeAt(0) == 13) {
        destoyed = true;
        resolve(data);
      } else if (destoyed == false) {
        data += key;
        process.stdout.write(key);
      }
    });
  });
}

module.exports = {
  question: question,
};
