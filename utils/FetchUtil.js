import fetch from "node-fetch";

export async function sendDataToBackend(requestOptions, url) {
  try {
    console.info("Sending data to backend...");
    await fetch(url, requestOptions);
    console.info("Data had been sent to backend successfully");
  } catch (e) {
    console.error("Something went wrong while sending to backend" + e);
  }
}
