chrome.commands.onCommand.addListener(async function (command) {
	switch (command) {
		case "toggle-vim-mode":
			const id = (await getCurrentTab()).id;

			if (typeof id === "undefined") {
				console.log("Cannot find active tab...");
				break;
			}
			chrome.tabs.sendMessage(id, { msg: "please toggle plugin" });
			break;
		default:
			console.log(`Command ${command} not found`);
	}
});

/**
 * https://developer.chrome.com/docs/extensions/reference/api/tabs#get_the_current_tab
 */
async function getCurrentTab() {
	let queryOptions = { active: true, lastFocusedWindow: true };
	// `tab` will either be a `tabs.Tab` instance or `undefined`.
	let [tab] = await chrome.tabs.query(queryOptions);
	return tab;
}
