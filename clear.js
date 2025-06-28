// clear.js - Tự động clear terminal

const os = require("os");
const { execSync } = require("child_process");

function clearTerminal() {
  try {
    if (os.platform() === "win32") {
      execSync("cls", { stdio: "inherit" });
    } else {
      execSync("clear", { stdio: "inherit" });
    }
  } catch (err) {
    process.stdout.write("\x1Bc"); // fallback nếu execSync lỗi
  }
}

module.exports = clearTerminal;
