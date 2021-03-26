console.log('Im in front!');
let isPluginActive = false;

function KeyPress(e) {
    if ( e.key === 'v' && e.altKey ) {
        togglePluginActive();
    }
}

function togglePluginActive(){
    isPluginActive = !isPluginActive;
    console.log('Plugin is now', isPluginActive);
}

document.onkeydown = KeyPress;