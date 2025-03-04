import axios from "axios";
import axiosRetry from "axios-retry";

axiosRetry(axios, { retries: 3 });

async function main() {
  while (true) {
    try {
      await axios.get("https://api.ipify.org/");

      console.log("Connection OK");
    } catch {}

    await new Promise((resolve) => setTimeout(resolve, 3000));
  }
}

void main();
