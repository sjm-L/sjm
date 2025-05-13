importScripts(
  "https://www.gstatic.com/firebasejs/9.22.2/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.22.2/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyDcIGVTaeZOMYO7n6fWIzfyL0JnWYb8atA",
  authDomain: "sjml-18f14.firebaseapp.com",
  projectId: "sjml-18f14",
  messagingSenderId: "937757609525",
  appId: "1:937757609525:web:3f8b13a84fe9792b19eb7c",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("📥 [SW] 백그라운드 메시지:", payload);
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: "/icon-192.png",
  });
  // 알림 창은 iOS에서 무시되므로 대신 데이터 저장
  caches.open("push-cache").then((cache) => {
    const data = new Response(JSON.stringify(payload));
    cache.put("/last-message", data);
  });
});
self.addEventListener("push", function (event) {
  if (event.data) {
    const data = event.data.json();
    console.log("📥 [SW] push 수신됨:", data);

    const { title, body } = data.notification;

    const options = {
      body,
      icon: "/icon-192.png",
    };

    // ✅ 이 부분 꼭 추가
    event.waitUntil(self.registration.showNotification(title, options));
  }
});
