// background.js

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab)=>{
  chrome.tabs.query({
      active: true,
      currentWindow: true
  }, (tabs) => {
      if((tabId == tabs[0].id) && (changeInfo.status == "complete")) {
        // Send a message to the content script, that the current active tab has been updated
        chrome.tabs.sendMessage(tabId, {data:tab}, function(response) { });
      };
  })})