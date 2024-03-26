console.log("background.js loaded");

let count = 1;
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log({ message });
  chrome.action.setBadgeText({ text: count.toString() });
  count++;
});
