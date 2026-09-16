const CACHE='magnet-mayhem-v11';
const ASSETS=['./','./index.html','./style.css','./game2.js','./systems.js','./mobile-enhancements.js','./boss-system.js','./challenge-system.js','./accessibility-controls.js','./gameplay-overdrive.js','./polish-system.js','./level-select.js','./advanced-gameplay.js','./main-menu.js','./manifest.json','./icon.svg'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(caches.match(e.request).then(cached=>cached||fetch(e.request).then(r=>{const copy=r.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));return r}).catch(()=>caches.match('./index.html'))))});
