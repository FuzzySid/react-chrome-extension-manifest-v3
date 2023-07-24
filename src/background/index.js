// // If your extension doesn't need a background script, just leave this file empty
/*global chrome*/
// //Add pakcage import statements here
console.log("Background Script running...")
// // This function is called as soon as the background script is loaded

// // Listen for messages from content scripts.
// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//     console.log('Message received from content script:', message.message);
// });

// // Detecting install for chrome extension
chrome.runtime.onInstalled.addListener(function(details){
  if(details.reason == "install"){
      //call a function to handle a first install
      console.log('Detected install')
      openExtensionUI();
  }else if(details.reason == "update"){
      //call a function to handle an update
      console.log('Detected update')
  }
});

// // Listen for messages from content scripts.
// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   if (message.from === 'content_script') {
//     console.log('Message received from content script:', message.message);
//   }
// });

// //When clicked on the extension icon
chrome.action.onClicked.addListener(function (tab) {
    console.log("extention icon clicked");
    let clickedExtensionIcon = true
    openExtensionUI(clickedExtensionIcon)
});


export function openExtensionUI(clickedExtensionIcon) {
  console.log("extension icon click",clickedExtensionIcon)
  // open popup.html in new browser window if extention icon is clicked

  /**Open Extension inside current website page as side-slider */


  // avoid multi extension popup by checking if a chrome window of type=popup(thats how extension UI is opened) exists.
  chrome.windows.getAll({},(windows)=>{
      console.log("windows....", windows);
      let isPopup = windows.some((win) => {
        return win.type=="popup";
      });

      let WindowId = windows.find((win)=>{return win.type=="popup"})
      console.log("found window ->", WindowId)
      console.log("is there a popup window", isPopup)
      handleOpenWindow()
      
      // if (isPopup == false) {
      //   //open note taker window
      //   handleOpenWindow()
      // }
      // else {
      //   console.log("Extension opened ? " + true);
      //   //if already notetaker already opened, close it and reopen new window
      //   // This is helpful when you can't find notetaker window due to other opened apps
        
      //   if(clickedExtensionIcon===true){
      //     chrome.windows.remove(WindowId.id, ()=>{
      //       handleOpenWindow()
      //       console.log("reopening extension...")
      //     })
      //   }
      // }

    }) 

}


 async function handleOpenWindow() {
      /** Open Extension in sperate window */
  
      await chrome.windows.getCurrent(async (currentWindow) => {

        var maxHeight, maxWidth;
        var popupWidth = 488;
  
        // height not speficed hence will take natural window height  
        var updateInfo1 = {
            state: "normal",
        };
        //open popup.html (with a fixed height and width) in new window
        await chrome.windows.create(
          {
            url: chrome.runtime.getURL("popup.html"),
            type: "popup",
            width: popupWidth,
            top: 0,
            left: 1,
          },
          function (win) {
            // win represents the Window object from windows API
            // Do this after opening
  
            /** exit fullscreen on current main window using maximize
             this is important to avoid opening extension as fullscreen */
            let chromeExtensionWindowId = win.id
            chrome.windows.update(chromeExtensionWindowId, updateInfo1); 
          }
        );
      
    });


}

