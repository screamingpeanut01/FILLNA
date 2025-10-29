# 🚀 빠른 시작 가이드

**Firebase로 간단하게 시작하세요!**

## 1️⃣ Firebase 프로젝트 생성 (3분)

1. **Firebase Console 접속**: https://console.firebase.google.com/
2. **"프로젝트 추가"** 클릭
3. 프로젝트 이름 입력 (예: `fillna-game`)
4. Google Analytics **선택 안 함**
5. **"프로젝트 만들기"** 클릭

## 2️⃣ Realtime Database 설정 (2분)

1. 왼쪽 메뉴 → **"Realtime Database"** 클릭
2. **"데이터베이스 만들기"** 클릭
3. 위치 선택 (아무거나, 예: United States)
4. **보안 규칙: "테스트 모드에서 시작"** 선택 ⚠️
5. **"사용 설정"** 클릭

## 3️⃣ 웹 앱 등록 (1분)

1. 프로젝트 개요로 돌아가기
2. **웹 앱 추가** (`</>` 아이콘) 클릭
3. 앱 닉네임 입력 (예: `fillna-web`)
4. Firebase Hosting **체크 안 함**
5. **"앱 등록"** 클릭
6. 🔥 **Firebase SDK 구성 복사**:

```javascript
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "fillna-game.firebaseapp.com",
  databaseURL: "https://fillna-game-default-rtdb.firebaseio.com",
  projectId: "fillna-game",
  storageBucket: "fillna-game.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

## 4️⃣ config.js 수정 (30초)

`config.js` 파일을 열고 Firebase 구성 값을 붙여넣기:

```javascript
const FIREBASE_CONFIG = {
    apiKey: "여기에_복사한_apiKey",
    authDomain: "여기에_복사한_authDomain",
    databaseURL: "여기에_복사한_databaseURL",
    projectId: "여기에_복사한_projectId",
    storageBucket: "여기에_복사한_storageBucket",
    messagingSenderId: "여기에_복사한_messagingSenderId",
    appId: "여기에_복사한_appId"
};
```

## ✅ 완료!

이제 Git에 커밋하고 GitHub Pages에 배포하면 됩니다:

```bash
git add .
git commit -m "Setup Firebase config"
git push
```

몇 분 후 `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`에서 게임 시작! 🎮

---

## 💡 작동 확인

- A가 자기 폰에서 게임 제출 → Firebase에 점수 저장됨
- B가 관리자 계정으로 로그인 → A의 점수가 실시간으로 보임 ✨
- 모든 기기에서 모든 점수를 실시간으로 확인 가능!

## 🧪 테스트 방법

로컬에서 테스트하려면:

```bash
# Python이 설치되어 있다면
python -m http.server 8000

# 또는 Node.js가 설치되어 있다면
npx serve
```

브라우저에서 `http://localhost:8000` 접속

## 🔒 보안

- Firebase API Key는 공개되어도 안전합니다 (보안 규칙이 실제 보안을 담당)
- 게임 종료 후 Firebase 보안 규칙을 엄격하게 설정하거나 프로젝트 삭제
- 보안 규칙 설정 (Firebase Console → Realtime Database → 규칙):

```json
{
  "rules": {
    ".read": "auth != null",
    ".write": "auth != null"
  }
}
```

## ❓ 문제가 생기면?

1. 브라우저 콘솔(F12)에서 에러 확인
2. Firebase Console에서 Realtime Database가 생성되었는지 확인
3. `config.js`의 Firebase 설정이 올바른지 확인
4. README.md의 "문제 해결" 섹션 참조

## 🎯 관리자 로그인

- 기수: `4`
- 이름: `김권택`

관리자로 로그인하면 팀 순위, 모든 참여자의 점수와 상세 결과를 확인할 수 있습니다!
