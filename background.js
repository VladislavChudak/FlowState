import { blockWebsites, unblockWebsites } from "./rules/dynamicRules.js";

const actions = { blockWebsites, unblockWebsites };
// List of URLs to block
const blockedUrls = ["youtube.com", "facebook.com", "twitter.com"];

// Object to keep track of blocked tabs and their original URLs
let blockedTabs = {};

// Flag to control whether blocking is active
let blockingEnabled = false; // By default, blocking is enabled

// Function to check if the current URL matches any of the blocked URLs
function isBlockedUrl(url) {
  return blockedUrls.some((blockedUrl) => url.includes(blockedUrl));
}

// Function to block the tab and store its original URL
function blockTab(tabId, url) {
  if (!blockedTabs[tabId]) {
    blockedTabs[tabId] = url; // Store the original URL only if it's not already stored
  }
  chrome.tabs.update(tabId, { url: "about:blank" }); // Redirect to about:blank
}

// Listen for SPA navigation and block if necessary
chrome.webNavigation.onHistoryStateUpdated.addListener(
  (details) => {
    if (blockingEnabled && isBlockedUrl(details.url)) {
      console.log(`Blocking SPA navigation to: ${details.url}`);
      blockTab(details.tabId, details.url); // Store and block
    }
  },
  {
    url: [{ urlMatches: ".*" }], // Listen for navigation on all URLs
  }
);

// Listen for regular page loads and block if necessary
chrome.webNavigation.onCompleted.addListener(
  (details) => {
    if (blockingEnabled && isBlockedUrl(details.url)) {
      console.log(`Blocking page load: ${details.url}`);
      blockTab(details.tabId, details.url); // Store and block
    }
  },
  {
    url: [{ urlMatches: ".*" }], // Listen for all URLs
  }
);

// Function to stop blocking and restore all blocked pages
export function stopBlocking() {
  console.log("Stopping blocking...");
  blockingEnabled = false; // Disable blocking

  // Iterate through all blocked tabs and reload them to their original URLs
  for (const tabId in blockedTabs) {
    const originalUrl = blockedTabs[tabId];
    console.log(`Restoring tab ${tabId} to ${originalUrl}`);
    chrome.tabs.update(parseInt(tabId), { url: originalUrl }, (tab) => {
      if (chrome.runtime.lastError) {
        console.error(
          `Error restoring tab ${tabId}: ${chrome.runtime.lastError.message}`
        );
      } else {
        console.log(`Tab ${tabId} successfully restored to ${originalUrl}`);
      }
    });
  }

  // Clear the list of blocked tabs after restoring
  blockedTabs = {};
}

// Function to start blocking (in case you want to re-enable blocking)
export function startBlocking() {
  console.log("Starting blocking...");
  blockingEnabled = true; // Enable blocking again
}

chrome.runtime.onConnect.addListener((port) => {
  console.log("Connected to:", port.name);

  // Listen for messages from the popup or other parts of the extension
  port.onMessage.addListener((msg) => {
    console.log(msg);
    console.log(actions);
    actions[msg.action]?.();
  });
});
