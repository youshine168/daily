// 光耀命盤解析 - 極簡 Service Worker
// 目的：讓 Chrome 判定此網站符合「可安裝」條件
// 不做積極快取，避免影響資料即時性（序號驗證、命盤計算都需要即時連線）

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  // 一律先嘗試正常連網，失敗才退回快取（目前沒有特別快取任何東西）
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
