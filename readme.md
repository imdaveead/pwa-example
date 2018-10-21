# PWA Example
Live at [davecode.me/pwa](https://davecode.me/pwa)

This is a example progressive web app, you can use it to test if your device supports the
add to home screen popup and [service workers][1], or use it as a starting point for your application.

What's different about this is (I couldn't find this anywhere else) that it also works on the
older iOS add to home screen, with the app icons.

## Features
- Works offline
- Cache updates new resources automatically (needs extra reload to show changes)
- Cache exactly what local and remote URLS you want.
- Can install to home screen, and the Chrome Apps section.

## Expected knowledge before viewing the code
- How to make a web app. This tutorial does not cover how to make a web app, just how to
  register a service worker and everything.
- Modern Browser APIs besides service worker. Research this list so I dont have to explain
  what each one does.
  - [ES6 Arrow Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)
  - ES6 [let](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let) and [const](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const)
  - [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
  - [Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
  - [Array.map/filter/forEach functions](https://coderwall.com/p/_ggh2w/the-array-native-every-filter-map-some-foreach-methods)

## Useful tools used
- [Web App Manifest Generator](https://app-manifest.firebaseapp.com/) used to scale images.

## License
Licensed under the [WTFPL](http://www.wtfpl.net/about/).

[1]: https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers
[2]: https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers