const { spawn } = require("child_process");
const figlet = require("figlet");
const chalk = require("chalk");
const axios = require("axios");

// Hiển thị logo to "anyna"
figlet.text("anyna", {
  font: "Big", // Font to hơn: Big, Slant, Banner...
  horizontalLayout: "default",
  verticalLayout: "default"
}, async (err, data) => {
  if (err || !data) {
    console.log("Khong the hien thi logo.");
  } else {
    console.log(chalk.hex("#ff69b4")(data)); // Màu hồng nhẹ
  }

  await showServerInfo();
  startBot("Dang khoi dong bot...");
});

// Hiển thị thông tin IP
async function showServerInfo() {
  try {
    const res = await axios.get("https://ipinfo.io/json");
    const { ip, hostname, country, city, org } = res.data;

    console.log(chalk.cyan("━━━━━━━━━━ THONG TIN SERVER ━━━━━━━━━━"));
    console.log("IP:", ip);
    console.log("Ten mien:", hostname || "N/A");
    console.log("Quoc gia:", country);
    console.log("Thanh pho:", city || "N/A");
    console.log("Nha mang:", org);
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
  } catch (err) {
    console.error("Loi khi lay IP:", err.message);
  }
}

// Khởi động mirai.js
function startBot(message) {
  if (message) console.log(chalk.green(message));

  const child = spawn("node", ["mirai.js"], {
    cwd: __dirname,
    stdio: "inherit",
    shell: true
  });

  child.on("close", async (code) => {
    if (code === 1) {
      return startBot("Dang khoi dong lai bot...");
    } else if (String(code).startsWith("2")) {
      const delay = parseInt(String(code).replace("2", "")) * 1000;
      console.log(`Cho ${delay / 1000}s roi khoi dong lai...`);
      await new Promise(res => setTimeout(res, delay));
      return startBot("Khoi dong lai bot sau delay...");
    }
  });

  child.on("error", (err) => {
    console.error("Loi khi chay bot:", err.message);
  });
  }
