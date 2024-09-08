import { blockWebsites, unblockWebsites } from "./rules/dynamicRules.js";

const actions = { blockWebsites, unblockWebsites };

chrome.runtime.onConnect.addListener((port) => {
  console.log("Connected to:", port.name);

  // Listen for messages from the popup or other parts of the extension
  port.onMessage.addListener((msg) => {
    console.log(msg);
    console.log(actions);
    actions[msg.action]?.();
  });
});
