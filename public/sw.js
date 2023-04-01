const staticCache = 'staticCache-v1'
const dynamicCache = 'dynamicCache-v1'

const staticassets = [
    '../',
    '../userfile/login',
    '../userfile/signup',
    '../userfile/fallback',
]

//Service Worker install
self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(staticCache).then(cache => {
            console.log('Moody we are adding files to cache');
            cache.addAll(staticassets)
        })
    );
})

//Service Worker Activate
self.addEventListener('active', e => {
    console.log('Hey Moody! Service Workers is Just Active', e);
})

//Service Worker is fetching
self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request).then(cacheRes => {
            return cacheRes || fetch(e.request)
                .then(fetchRes => {
                    return caches.open(dynamicCache).then(cache => {
                        cache.put(e.request.url, fetchRes.clone())
                        return fetchRes
                    })
                }).catch(() => caches.match('./fallback'))
        })
    )
})