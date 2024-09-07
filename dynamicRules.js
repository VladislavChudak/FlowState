const rules = [
  {
    id: 1,
    priority: 1,
    action: {
      type: "block",
    },
    condition: {
      urlFilter: "*://*.facebook.com/*",
      resourceTypes: ["main_frame"],
    },
  },
  {
    id: 2,
    priority: 1,
    action: {
      type: "block",
    },
    condition: {
      urlFilter: "*://*.youtube.com/*",
      resourceTypes: ["main_frame", "sub_frame"],
    },
  },
  {
    id: 3,
    priority: 1,
    action: {
      type: "block",
    },
    condition: {
      urlFilter: "*://*.twitter.com/*",
      resourceTypes: ["main_frame"],
    },
  },
];

export function blockWebsites() {
  chrome.declarativeNetRequest.updateDynamicRules(
    {
      addRules: rules,
      removeRuleIds: [], // We are not removing any rules at this point
    },
    () => {
      if (chrome.runtime.lastError) {
        console.error("Error adding blocking rules:", chrome.runtime.lastError);
      } else {
        console.log("Websites blocked using dynamic rules!");
      }
    }
  );
}

export function unblockWebsites() {
  const ruleIdsToRemove = [1, 2, 3]; // IDs of the rules to remove

  chrome.declarativeNetRequest.updateDynamicRules(
    {
      removeRuleIds: ruleIdsToRemove,
    },
    () => {
      if (chrome.runtime.lastError) {
        console.error(
          "Error removing blocking rules:",
          chrome.runtime.lastError
        );
      } else {
        console.log("Websites unblocked.");
      }
    }
  );
}
