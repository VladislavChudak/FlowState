console.log("123");
document.getElementById("start-focus").addEventListener("click", () => {
  console.log("Focus session started1.");
  chrome.runtime.sendMessage({ action: "startFocus" }, (response) => {
    console.log("Focus session started.");
  });
});
