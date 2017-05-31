this.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('v1').then(function(cache) {
      return cache.addAll([
        '/public/',
        '/public/index.html',
        '/public/css/main.css',
        '/public/js/event.js',
      ]);
    })
  );
});

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/public/js/sw.js')
  .then(function(reg) {
    // registration worked
    console.log('Registration succeeded. Scope is ');
  }).catch(function(error) {
    // registration failed
    console.log('Registration failed with ' + error);
  });
}
