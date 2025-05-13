// Firebase SDK 로딩 (서비스워커에서도 따로 import 해야 함)
importScripts(
  "https://www.gstatic.com/firebasejs/9.22.2/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.22.2/firebase-messaging-compat.js"
);

// Firebase 초기화 (여기도 다시 설정이 필요)
firebase.initializeApp({
  apiKey: "YOUR_API_KEY",
  apiKey: "AIzaSyDcIGVTaeZOMYO7n6fWIzfyL0JnWYb8atA",
  authDomain: "sjml-18f14.firebaseapp.com",
  projectId: "sjml-18f14",
  storageBucket: "sjml-18f14.firebasestorage.app",
  messagingSenderId: "937757609525",
  appId: "1:937757609525:web:289106dbbccafb6119eb7c",
  measurementId: "G-HEMV4LTQQB",
});

// 푸시 알림 처리 객체
const messaging = firebase.messaging();

// 백그라운드에서 알림을 받았을 때, 실제로 폰에 알림을 띄우는 코드
messaging.onBackgroundMessage(function (payload) {
  console.log("📩 백그라운드 메시지 수신:", payload);
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: "/icon.png", // 원하는 아이콘 넣기
  });
});
