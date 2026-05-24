const rdxFca = require("./index");
const fs = require("fs");
const path = require("path");

const appStatePath = path.join(__dirname, "appState.json");

const loginData = fs.existsSync(appStatePath) 
  ? JSON.parse(fs.readFileSync(appStatePath, "utf8"))
  : null;

if (!loginData) {
  console.error("[RDX-FCA] Error: appState.json not found!");
  console.log("[RDX-FCA] Please provide your Facebook appState in appState.json");
  process.exit(1);
}

const api = rdxFca(loginData, {
  selfListen: true,
  listenEvents: true,
  listenTyping: true,
  autoMarkRead: true
}, (err, api) => {
  if (err) {
    console.error("[RDX-FCA] Login Error:", err);
    process.exit(1);
  }

  console.log("[RDX-FCA] ✅ Logged in successfully!");
  console.log("[RDX-FCA] 👤 User ID:", api.getCurrentUserID());
  console.log("[RDX-FCA] 🏠 Owner: Sardar RDX");
  console.log("[RDX-FCA] 📦 Version:", api.version);

  api.listenMqtt((err, message) => {
    if (err) return console.error("[RDX-FCA] Listen error:", err);
    
    if (message && message.body) {
      console.log(`[RDX-FCA] 📩 Message from ${message.senderID}: ${message.body}`);
      
      if (message.body.toLowerCase() === "ping") {
        api.sendMessage("pong", message.threadID);
      }
    }
  });

  api.setOptions({ online: true });
});

process.on("SIGINT", () => {
  console.log("[RDX-FCA] Shutting down...");
  process.exit(0);
});
module.exports.credits = "SARDAR RDX";
