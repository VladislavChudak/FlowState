import services from "../services/index.js";

(function () {
  const port = chrome.runtime.connect({ name: "popup" });

  services.setupListeners(port);
})();
