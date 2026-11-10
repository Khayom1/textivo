const CACHE='textivo-v14';
const FILES=['./','./index.html','./css/style.css?v=14','./js/app.js?v=14','./manifest.json','./assets/textivo-icon.svg'];
self.addEventListener('install',event=>event.waitUntil((async()=>{
  const cache=await caches.open(CACHE);
  await cache.addAll(FILES);
  await self.skipWaiting();
})()));
self.addEventListener('activate',event=>event.waitUntil((async()=>{
  const keys=await caches.keys();
  await Promise.all(keys.filter(key=>key.startsWith('textivo-')&&key!==CACHE).map(key=>caches.delete(key)));
  await self.clients.claim();
})()));
self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET')return;
  const url=new URL(event.request.url);
  const isAppAsset=(url.pathname.endsWith('/index.html')||url.pathname.endsWith('/'))||url.pathname.endsWith('/js/app.js')||url.pathname.endsWith('/css/style.css');
  if(isAppAsset){
    event.respondWith((async()=>{
      try{
        const fresh=await fetch(event.request,{cache:'no-store'});
        if(fresh.ok){const cache=await caches.open(CACHE);await cache.put(event.request,fresh.clone());}
        return fresh;
      }catch(error){return (await caches.match(event.request))||Response.error();}
    })());
    return;
  }
  event.respondWith((async()=>{
    const cached=await caches.match(event.request);
    if(cached)return cached;
    const response=await fetch(event.request);
    if(response.ok){const cache=await caches.open(CACHE);await cache.put(event.request,response.clone());}
    return response;
  })());
});
