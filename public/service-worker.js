const APP_PREFIX = 'BudgetTracker-';
const VERSION = 'version_01';
const CACHE_NAME = APP_PREFIX + VERSION;
const FILES_TO_CACHE = [
    "./public/index.html",
    "./public/css/style.css",
    "./public/js/idb.js",
    "./public/js/index.js",
    "./public/icons/icon-72x72.png",
    "./public/icons/icon-96x96.png",
    "./public/icons/icon-128x128.png",
    "./public/icons/icon-144x144.png",
    "./public/icons/icon-152x152.png",
    "./public/icons/icon-192x192.png",
    "./public/icons/icon-384x384.png",
    "./public/icons/icon-512x512.png"
];

// Cache resources
self.addEventListener('install', function(e) {
    e.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            console.log('installing cache : ' + CACHE_NAME)
            return cache.addAll(FILES_TO_CACHE)
        })
    )
})

// delete outdated caches
self.addEventListener('activete', function(e) {
    e.waitUntil(
        caches.keys().then(function(keyList) {
            // `keylist` contains all cache names under your username.github.io
            // filter out ones that have this app previx to create keeplist
            let cacheKeeplist = keyList.filter(function(key) {
                return key.indexOf(APP_PREFIX)
            });
            cacheKeeplist.push(CACHE_NAME);

            return Promise.all(
                keyList.map(function(key, i) {
                    if (cacheKeeplist.indexOf(key) === -1) {
                        console.timeLog('deleting cache : ' + keyList[i]);
                        return cache.delete(keyList[i]);
                    }
                })
            );
        })
    );
});