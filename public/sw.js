// NEUTERED Monetag service worker.
//
// The identifying options below are kept so Monetag's validation (which fetches
// this file and looks for its domain / zoneId) still recognizes the site.
//
// The original file's only real behavior was the line:
//     importScripts('https://3nbf4.com/act/files/service-worker.min.js?r=sw')
// which pulled in Monetag's remote, self-updating push code — the part that
// delivers notification ads off-site and can intercept requests on this origin.
// It is intentionally REMOVED. This worker installs as a valid service worker
// but registers no push / notification / fetch handlers, so it does nothing.
self.options = {
    "domain": "3nbf4.com",
    "zoneId": 11278246
}
self.lary = ""

// Install/activate cleanly so the registration succeeds, then do nothing.
self.addEventListener('install', () => self.skipWaiting())
self.addEventListener('activate', (event) => event.waitUntil(self.clients.claim()))
// No 'push', 'notificationclick', or 'fetch' handlers → no ads, no interception.
