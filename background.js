import { blockWebsites, unblockWebsites } from "./dynamicRules.js";
const actions = { blockWebsites, unblockWebsites };
console.log(actions);

chrome.runtime.onConnect.addListener((port) => {
  console.log("Connected to:", port.name);

  // Listen for messages from the popup or other parts of the extension
  port.onMessage.addListener((msg) => {
    console.log(msg);
    console.log(actions);
    actions[msg.action]?.();
  });
});
