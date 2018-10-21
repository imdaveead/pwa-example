const CACHE_NAME = "pwa"
// This must contains all the URLS that your app uses as they will
// be cached for offline usage. Note how I added the google font's
// request as well, AND the fonts they use
// NOTE: Later the code I write that says if to cache something, it
// takes any url staritng with ./ and replaces that with 
// window.location.origin, so all local resources should start with ./
const CACHE_URLS = [
    './',
    './app.css',
    './manifest.json',
    './app.js',
    './readme.md',
    'https://cdn.rawgit.com/showdownjs/showdown/1.8.7/dist/showdown.min.js',
    'https://fonts.googleapis.com/css?family=Roboto:400,700',
    'https://fonts.gstatic.com/s/roboto/v18/KFOlCnqEu92Fr1MmWUlfBBc4.woff2'
];

// The Service Worker will cache all of the cache urls when you
// install it.
self.addEventListener('install', event => {
    console.log("Installing Service Worker");
    // This will wait until the promise passed gets resolved.
    event.waitUntil(
        caches.keys().then(cacheNames => {
            // Filter out any cache that is not the CACHE_NAME
            const cachesToDelete = cacheNames.filter(cacheName => cacheName !== CACHE_NAME);
            // Delete all the caches that need to be removed.
            return Promise.all(cachesToDelete.map(cacheToDelete => {
                return caches.delete(cacheToDelete);
            }));
        }).then(() => {
            return self.skipWaiting();
        })
    );
});
    
self.addEventListener('activate', event => {
    // Claim all the clients that have this service worker installed.
    // (from my understanding this pushses off any older versions
    //  of the service worker from all open tabs.)
    event.waitUntil(self.clients.claim());
    
});

// The fetch event is called whenever the page tries loading a
// resource at any point. This handler will check the cache if
// it exists, and respond with the cache or a fetch request.
self.addEventListener('fetch', event => {
    // If the url is not one of our cache urls, skip the rest.
    if(!CACHE_URLS.find(url => {
        // replace a ./ at the start with the origin, and see if it matches our request.
        return url.replace(/^\.\//, location.origin + "/") === event.request.url;
    })) {
        return;
    };
    
    event.respondWith(
        // Attempt to find inside the cache.
        caches.match(event.request).then(cachedResponse => {
            // If the cached item is found, return it
            // (which is passed over to event.respondWith)
            if (cachedResponse) {
                // in the background we will start a request
                // to check if the resource was updated, and
                // put it in the cache.
                fetch(event.request).then(response => {
                    // Add the response to the cache
                    return caches.open(CACHE_NAME).then((cache) => {
                        return cache.put(event.request, response);
                    });
                }).catch((e) => {
                    // ignore error, must be offline
                    // we just wont update the cache with the new response
                });

                // respond to the request with our cached response
                return cachedResponse;
            }

            // If not, fetch the request
            return fetch(event.request).then(response => {
                // Add the response to the cache
                return caches.open(CACHE_NAME).then((cache) => {
                    cache.put(event.request, response.clone());
                    return response;
                });  
            });
        })
    );
});
