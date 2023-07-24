// /*global chrome*/

// // // Modify the webpage: change the background color of all paragraphs to yellow.
const paragraphs = document.getElementsByTagName('p');
for (const paragraph of paragraphs) {
  paragraph.style.backgroundColor = 'yellow';
}

// // // // Send a message to the background script.
// chrome.runtime.sendMessage({ from: 'content_script', message: 'Hello from the content script!' });