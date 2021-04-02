// chrome.windows.onFocusChanged.addListener(function(window) {
//     console.log("asdasd");
//     // if (window == chrome.windows.WINDOW_ID_NONE) {
//     //     inFocus = false;
//     // } else {
//     //     inFocus = true;
//     // }
// });


// chrome.commands.onCommand.addListener(function(command) {
//     console.log('Command:', command);
//     // console.log(document.activeElement)
//   });
//   let color = '#3aa757';

// chrome.runtime.onInstalled.addListener(() => {
//   chrome.storage.sync.set({ color });
//   console.log('Default background color set to %cgreen', `color: ${color}`);
// // });
// // chrome.tabs.onActivated.addListener(tab => {
//     chrome.tabs.executeScript(
//         null,
//         {
//             file: './foreground.js'
//         },
//         () => {console.log('done');}
//         );
// });
console.log( " I'm background")
console.log(document.querySelectorAll("textarea"))
document.body.style.backgroundColor = "red";