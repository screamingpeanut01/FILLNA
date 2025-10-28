# 🚀 빠른 시작 가이드

**당신이 할 일은 단 2가지입니다!**

## 1️⃣ GitHub Token 만들기 (2분)

1. 여기로 이동: https://github.com/settings/tokens
2. **"Generate new token (classic)"** 클릭
3. 설정:
   - Note: `FILLNA Game` (아무거나)
   - Expiration: `No expiration` (또는 원하는 기간)
   - **Scopes: `gist`만 체크** ✅
4. **"Generate token"** 클릭
5. 🔑 생성된 토큰 복사 (예: `ghp_abc123...`)

## 2️⃣ Gist 만들기 (1분)

1. 여기로 이동: https://gist.github.com/
2. **"Create new gist"** 클릭
3. 입력:
   - Filename: `fillna-scores.json`
   - Content: `[]` (빈 배열만)
4. **"Create secret gist"** 클릭
5. 🆔 URL에서 ID 복사
   - 예: `https://gist.github.com/user/`**`abc123`** → `abc123`

## 3️⃣ config.js 수정 (30초)

`config.js` 파일을 열고 다음 두 줄만 수정:

```javascript
GITHUB_TOKEN: 'ghp_여기에_복사한_토큰_붙여넣기',
GIST_ID: '여기에_복사한_Gist_ID_붙여넣기',
```

## ✅ 완료!

이제 Git에 커밋하고 GitHub Pages에 배포하면 됩니다:

```bash
git add .
git commit -m "Setup config"
git push
```

몇 분 후 `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`에서 게임 시작! 🎮

---

## 💡 확인 방법

- A가 자기 폰에서 게임 제출 → 점수 저장됨
- B가 관리자 계정으로 로그인 → A의 점수가 보임 ✨
- 모든 기기에서 모든 점수를 실시간으로 확인 가능!

## 🔐 보안

- Token은 `gist` 권한만 가지므로 안전합니다
- 게임 종료 후 Token 삭제 권장: https://github.com/settings/tokens
- Gist도 삭제하면 모든 데이터 제거됩니다

## ❓ 문제가 생기면?

1. 브라우저 콘솔(F12) 확인
2. Token과 Gist ID가 올바른지 확인
3. README.md의 "문제 해결" 섹션 참조

