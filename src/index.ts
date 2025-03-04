import axios from "axios";
import axiosRetry from "axios-retry";
import { execSync } from "child_process";
import fs from "fs";

axiosRetry(axios, { retries: 3 });

function reconnect() {
  if (!fs.existsSync("network.txt")) {
    fs.writeFileSync("network.txt", "Wi-Fi 3");
  }
  const networkName = JSON.stringify(fs.readFileSync("network.txt").toString("utf-8"));

  execSync(`netsh interface set interface ${networkName} disable`);
  execSync(`netsh interface set interface ${networkName} enable`);
}

async function main() {
  while (true) {
    try {
      await axios.get("https://api.ipify.org/");

      console.log("Connection OK");
    } catch {
      console.warn("Reconnect");
      reconnect();
      await new Promise((resolve) => setTimeout(resolve, 30000));
    }

    await new Promise((resolve) => setTimeout(resolve, 3000));
  }
}

void main();
