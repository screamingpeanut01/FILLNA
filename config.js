// ==================== Firebase 설정 파일 ====================
// Firebase Realtime Database를 사용하여 모든 기기에서 점수를 공유합니다.
//
// 📖 Firebase 설정 방법:
// 1. https://console.firebase.google.com/ 접속
// 2. 새 프로젝트 생성 (또는 기존 프로젝트 선택)
// 3. Realtime Database 생성 (테스트 모드로 시작)
// 4. 프로젝트 설정 > 일반 > "웹 앱" 추가
// 5. Firebase 구성 객체를 아래에 복사

const FIREBASE_CONFIG = {
    // ============================================
    // 🔥 Firebase 설정 (자동 적용됨)
    // ============================================
    apiKey: "AIzaSyBeBC3p6bLZV4I_DlMLfI32zmSh7nXhYrg",
    authDomain: "fillna.firebaseapp.com",
    databaseURL: "https://fillna-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "fillna",
    storageBucket: "fillna.firebasestorage.app",
    messagingSenderId: "661539314031",
    appId: "1:661539314031:web:5708ac91cc13b50be5b09a",
    measurementId: "G-D5KMEY1WW3"
};

// ============================================
// ⚠️ 아래 내용은 수정하지 마세요
// ============================================

// Firebase 설정 확인
function isFirebaseConfigured() {
    return FIREBASE_CONFIG.apiKey !== 'YOUR_API_KEY';
}

// 설정 확인
if (!isFirebaseConfigured()) {
    console.warn('⚠️ Firebase가 설정되지 않았습니다. config.js 파일을 수정하세요.');
    console.warn('📖 설정 방법: https://console.firebase.google.com/');
}
