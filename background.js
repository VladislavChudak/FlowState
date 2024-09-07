chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "startFocus") {
    console.log("Focus session initiated.");
    // Here you can add logic for blocking distracting websites
    blockDistractingSites();
    sendResponse({ status: "Focus started" });
  }
});

function blockDistractingSites() {
  const distractingUrls = [
    "*://*.facebook.com/*",
    "*://*.youtube.com/*",
    "*://*.twitter.com/*",
  ];

  chrome.webRequest.onBeforeRequest.addListener(
    (details) => {
      return { cancel: true }; // Block the request
    },
    { urls: distractingUrls },
    ["blocking"]
  );
}
