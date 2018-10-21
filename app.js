// Here is where you write your app
// This app will do a fetch() on the
// readme.md file, and convert it to
// html using showdown
fetch("/readme.md")
.then(res => res.text())
.then(text => {
    var converter = new showdown.Converter();
    var html = converter.makeHtml(text);
    var container = document.querySelector("#markdown");
    container.innerHTML = html;
    // Remove the top level heading.
    container.querySelector("h1").remove();
});

// The magic part: Register a service worker
// We have to check if navigator.serviceWorker
// exists or else there will be an error on some
// browsers.
if('serviceWorker' in navigator) {
    navigator.serviceWorker.register("sw.js");
}

// We will add an event listener for "beforeinstallprompt"
// this event is fired when the browser supports installing
// our PWA as a app, which is exactly what we need.

// Before the event wil go off we need to meet this criteria
//  1. Use HTTPS
//  2. Register a service worker
//  3. Have a valid app manifest
window.addEventListener('beforeinstallprompt', function beforeInstallPrompt(event) {
    // Prevent Chrome 67 and earlier from automatically
    // showing the prompt.
    event.preventDefault();
    // We can call event.prompt() to show the
    // install prompt at any point now. Let's
    // make a banner at the bottom of the screen visible
    const banner = document.querySelector("#install-banner");
    const button = document.querySelector("#install-banner button");
    // The banner is currently -50px from the bottom of the screen,
    // setting it to 0 should create a transition
    banner.style.bottom = "0";
    
    button.addEventListener("click", () => {
        // Show the install prompt
        banner.style.bottom = "-50px";
        event.prompt();
    });

    // Remove the install prompt listener, ive seen it
    // get actived multiple times if you cancel the prompt.
    window.removeEventListener("beforeinstallprompt", beforeInstallPrompt);
});