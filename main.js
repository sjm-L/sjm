// 1. Firebase 초기 설정 - 콘솔에서 받은 설정값을 복붙해서 사용
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
};

// 2. Firebase 앱 초기화
firebase.initializeApp(firebaseConfig);

// 3. Firebase에서 푸시 알림 메시징 객체 생성
const messaging = firebase.messaging();

// 4. 브라우저에 서비스워커 등록 - 푸시 알림을 받기 위한 필수 작업
navigator.serviceWorker.register("firebase-messaging-sw.js").then((reg) => {
  // 등록된 서비스워커를 Firebase에 연결
  messaging.useServiceWorker(reg);
});

// 5. 버튼 클릭 시 알림 권한을 요청하고, 브라우저 토큰을 받아옴
document.getElementById("pushBtn").addEventListener("click", async () => {
  try {
    // 사용자에게 알림 권한을 요청함
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      // 권한을 허용했다면 Firebase에서 알림을 받을 수 있는 토큰을 발급받음
      const token = await messaging.getToken();
      console.log("✅ 브라우저 토큰:", token);
      // 이 토큰을 나중에 서버로 보내서 알림을 전송할 때 사용함
    } else {
      alert("❌ 알림 권한이 거부되었습니다.");
    }
  } catch (err) {
    console.error("💥 알림 설정 중 오류:", err);
  }
});
