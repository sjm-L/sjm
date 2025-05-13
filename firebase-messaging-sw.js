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
  appId: "1:937757609525:web:289106dbbccafb6119eb7c",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("[firebase-messaging-sw.js] 백그라운드 메시지 수신:", payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});
