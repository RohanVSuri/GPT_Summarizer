importScripts('summarize.js');
chrome.runtime.onInstalled.addListener(async () => {
    console.log("INSTALLED!");
    chrome.contextMenus.create({
        id: "summarize", 
        title : "Summarize Highlighted",
        type: "normal",
        contexts: ["selection"],
    });
});

chrome.contextMenus.onClicked.addListener(summarize);


