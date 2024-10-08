export function setupListeners(port) {
  document.getElementById("start-focus").addEventListener("click", () => {
    clearYouTubeCache();
    port.postMessage({ action: "blockWebsites" });
    // console.log("Focus session started1.");
    // chrome.runtime.sendMessage({ action: "startFocus" }, (response) => {
    //   console.log("Focus session started.");
    // });
  });

  document.getElementById("end-focus").addEventListener("click", () => {
    port.postMessage({ action: "unblockWebsites" });
  });

  document.getElementById("open-options").addEventListener("click", () => {
    chrome.runtime.openOptionsPage();
  });
}

function clearYouTubeCache() {
  let removalOptions = {
    origins: [new URL("https://www.youtube.com").origin],
  };

  chrome.browsingData.remove(
    removalOptions,
    {
      cache: true,
      serviceWorkers: true,
    },
    function () {
      console.log("YouTube cache cleared!");
    }
  );
}
