(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
function getPhotoURL(e){return"https://farm"+e.farm+".staticflickr.com/"+e.server+"/"+e.id+"_"+e.secret+"_c.jpg"}function flickrAPIResponse(e){if(e.headers.get("x-use-cache-only"))return caches.match(e);if(e.headers.get("x-cache-warmup")){var t=new Headers(e.headers);return t["delete"]("x-cache-warmup"),flickrAPIResponse(new Request(e,{headers:t})).then(function(e){return e.json()}).then(function(e){var t=e.photos.photo.map(getPhotoURL).map(function(e){return new Request(e,{mode:"no-cors"})});return Promise.all(t.map(flickrImageResponse))}).then(function(){return caches.match(e)})}return fetch(e).then(function(t){return caches.open("trains-data").then(function(n){return Promise.all([t.clone().json(),caches.open("trains-imgs")]).then(function(e){var t=e[0],n=e[1],c=t.photos.photo.map(getPhotoURL);n.keys().then(function(e){e.forEach(function(e){-1==c.indexOf(e.url)&&n["delete"](e)})})}),n.put(e,t.clone()),t})})}function flickrImageResponse(e){return caches.match(e).then(function(t){return t?t:fetch(e).then(function(t){return caches.open("trains-imgs").then(function(n){n.put(e,t)}),t.clone()})})}require("serviceworker-cache-polyfill");var version="v15",staticCacheName="trains-static-v15";self.oninstall=function(e){self.skipWaiting(),e.waitUntil(caches.open(staticCacheName).then(function(e){return e.addAll(["./","css/all.css","js/page.js","imgs/logo.svg","imgs/icon.png"])}))};var expectedCaches=[staticCacheName,"trains-imgs","trains-data"];self.onactivate=function(e){self.clients&&clients.claim&&clients.claim(),e.waitUntil(caches.keys().then(function(e){return Promise.all(e.map(function(e){return/^trains-/.test(e)&&-1==expectedCaches.indexOf(e)?caches["delete"](e):void 0}))}))},self.onfetch=function(e){var t=new URL(e.request.url);e.respondWith("api.flickr.com"==t.hostname?flickrAPIResponse(e.request):/\.staticflickr\.com$/.test(t.hostname)?flickrImageResponse(e.request):caches.match(e.request,{ignoreVary:!0}))};
},{"serviceworker-cache-polyfill":2}],2:[function(require,module,exports){
Cache.prototype.add||(Cache.prototype.add=function(t){return this.addAll([t])}),Cache.prototype.addAll||(Cache.prototype.addAll=function(t){function e(t){this.name="NetworkError",this.code=19,this.message=t}var r=this;return e.prototype=Object.create(Error.prototype),Promise.resolve().then(function(){if(arguments.length<1)throw new TypeError;return t=t.map(function(t){return t instanceof Request?t:String(t)}),Promise.all(t.map(function(t){"string"==typeof t&&(t=new Request(t));var r=new URL(t.url).protocol;if("http:"!==r&&"https:"!==r)throw new e("Invalid scheme");return fetch(t.clone())}))}).then(function(e){return Promise.all(e.map(function(e,n){return r.put(t[n],e)}))}).then(function(){return void 0})});


},{}]},{},[1]);

//# sourceMappingURL=sw.js.map