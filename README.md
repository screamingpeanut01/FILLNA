# 결측치를 채워라! 🎮

참여자들이 데이터 테이블의 결측값을 직접 물어보며 채우는 인터랙티브 게임입니다.

## 📋 게임 소개

- 각 참여자는 **기수(0-30)**와 **이름**으로 로그인합니다
- 총 **59명**의 참여자가 **10개 팀**(팀당 5-6명)으로 나뉘어져 있습니다
  - **설문 참여자**: 52명 (data.csv에 데이터 있음)
  - **설문 미참여자**: 7명 (게임 참여 가능, 본인 데이터 없음)
- 본인 팀을 제외한 다른 참여자들의 레코드가 출제됩니다
- 각 레코드마다 3개의 필드가 랜덤하게 결측처리됩니다
- **모든 필드**(NAME, S_NO, DEPT, MBTI 등 11개 필드)가 결측 가능합니다
- 참여자들은 돌아다니며 서로에게 물어보며 결측값을 채웁니다
- 모두 채운 후 제출하면 자동으로 채점됩니다
- 관리자는 개인별 점수와 팀 평균 점수를 확인할 수 있습니다

## 🚀 GitHub Pages 배포 방법

### 1. Firebase 프로젝트 생성 (중요! ⭐)
**모든 기기에서 점수를 공유하려면 필수입니다!**

1. **Firebase Console 접속**: https://console.firebase.google.com/
2. **"프로젝트 추가"** 클릭
3. 프로젝트 이름 입력 (예: `fillna-game`)
4. Google Analytics는 **선택 안 함** (필요 없음)
5. **"프로젝트 만들기"** 클릭

### 2. Realtime Database 생성
1. 왼쪽 메뉴에서 **"Realtime Database"** 클릭
2. **"데이터베이스 만들기"** 클릭
3. 위치: **United States** (또는 가까운 지역 선택)
4. **보안 규칙**: **"테스트 모드에서 시작"** 선택 ⚠️
5. **"사용 설정"** 클릭

### 3. Firebase 웹 앱 등록
1. 프로젝트 개요로 돌아가기
2. **"웹 앱 추가"** (`</>` 아이콘) 클릭
3. 앱 닉네임 입력 (예: `fillna-web`)
4. Firebase Hosting은 **체크 안 함**
5. **"앱 등록"** 클릭

### 4. Firebase 구성 복사
화면에 표시되는 **Firebase SDK 구성**을 복사:

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

### 5. config.js 파일 수정
`config.js` 파일을 열어서 Firebase 구성 값을 붙여넣기:

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

### 6. 저장소 생성 및 배포
```bash
# 로컬에서 Git 초기화
git init
git add .
git commit -m "Initial commit: 결측치를 채워라 게임"

# GitHub에 저장소 생성 후
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

### 7. GitHub Pages 활성화
1. GitHub 저장소로 이동
2. Settings → Pages
3. Source를 "Deploy from a branch"로 설정
4. Branch를 "main"으로 선택, 폴더는 "/ (root)" 선택
5. Save 클릭

### 8. 접속
- 몇 분 후 `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/` 에서 게임에 접속할 수 있습니다
- **이제 모든 참여자의 점수가 Firebase에 저장되어 모든 기기에서 실시간으로 확인 가능합니다! 🎉**

## 📱 사용 방법

### 참여자 (플레이어)

#### ✅ 설문 참여자 (51명)
1. **로그인**: 기수(0-30)와 이름 입력
2. **결측값 확인**: 노란색으로 표시된 ❓ 셀이 결측값입니다
3. **정보 수집**: 다른 참여자들에게 물어보며 정보를 수집합니다
4. **결측값 입력**: 노란색 셀을 클릭하여 값을 입력합니다
5. **저장**: 💾 저장 버튼을 눌러 진행상황을 저장합니다
6. **제출**: ✅ 제출 버튼을 눌러 채점을 받습니다

#### ✅ 설문 미참여자 (7명)
- 기수와 이름으로 로그인 **가능**
- 본인 데이터가 없으므로 다른 사람이 본인에 대한 문제를 받지 않음
- 본인은 다른 참여자들의 결측값 채우기 가능
- **설문 미참여자**: 장서현(2기), 김태연(4기), 이유정(3기), 김수린(4기), 송재호(2기), 서효정(0기), 김선교(4기)

### 🔐 관리자 (운영자)
- **로그인**: 기수 `4`, 이름 `김권택`으로 로그인
- **팀 순위**: 10개 팀의 평균 점수를 순위별로 확인
- **개인 점수**: 모든 참여자의 점수를 순위별로 확인
- **상세 결과**: 참여자를 클릭하면 문항별 정답/오답 팝업 표시
- **채점 수정**: 관리자 상세 화면에서 개별 문항 정답/오답 토글 가능
- **새로고침**: 🔄 버튼으로 최신 점수 현황 업데이트
- **데이터 초기화**: 🗑️ 버튼으로 모든 점수 및 진행 상황 삭제 (게임 재시작 시 사용)

## 🗃️ 데이터 구조

### 메타데이터
| 필드명 | 설명 | 데이터 형식 | 결측 가능 |
|--------|------|-------------|----------|
| NAME | 학회원의 실명 | VARCHAR | **TRUE** |
| S_NO | 기수 (0-30) | INTEGER | **TRUE** |
| A_NO | 번호 | INTEGER | **TRUE** |
| DEPT | 전공 학과 | VARCHAR | **TRUE** |
| MBTI | MBTI 성격유형 | VARCHAR | **TRUE** |
| AGE | 학회원의 나이(한국) | INTEGER | **TRUE** |
| HT_CLSS | 가장 수강하기 싫었던 과목 | VARCHAR | **TRUE** |
| FV_SNGR | 가장 좋아하는 가수 | VARCHAR | **TRUE** |
| STAFF_YN | 운영진 활동 여부 | BOOLEAN (true/false) | **TRUE** |
| ELMT_SCHL | 출신 초등학교 | VARCHAR | **TRUE** |
| HTWN | 고향 | VARCHAR | **TRUE** |

**모든 필드가 결측 가능합니다.**

### 팀 구성
- 총 **58명**이 **10개 팀**으로 구성됩니다 (팀당 5-6명)
- 각 참여자는 본인 팀원 제외한 다른 참여자들의 데이터를 받습니다
- 팀 정보는 `teams.json` 파일에 정의되어 있습니다
- 팀 구성 상세 내역은 `teams.md` 파일을 참고하세요

#### 동명이인 처리
- **김태연**: 2팀(5기) vs 3팀(4기) - 기수로 구분
- **김채원**: 4팀(6기) vs 5팀(3기) - 기수로 구분

#### 참여 현황
| 구분 | 인원 | 게임 참여 | 비고 |
|------|------|-----------|------|
| 팀 + 설문 참여 | 52명 | ✅ | 일반 참여자 |
| 팀 + 설문 미참여 | 7명 | ✅ | 본인 데이터 없지만 게임 가능 |
| **총계** | 59명 | **59명 모두 참여 가능** | |

## 💾 데이터 저장

### 점수 데이터 (모든 기기 공유 🌐)
- **저장 위치**: Firebase Realtime Database (클라우드 중앙 저장소)
- **공유 범위**: 모든 참여자의 점수를 모든 기기에서 실시간 확인 가능
- **백업**: localStorage에도 자동 백업

### 개인 진행 데이터 (기기별 독립)
- **사용자 VIEW**: 각 사용자마다 유니크한 결측값 배치
  - 본인 팀원은 출제되지 않음
  - 각 레코드당 3개 필드 랜덤 결측
- **입력값**: 사용자가 입력한 결측값
- **저장 위치**: 브라우저의 localStorage (기기별)
- **특징**: 같은 기기에서는 새로고침해도 동일한 VIEW 유지

### 데이터 흐름
```
참여자 제출 → Firebase에 점수 저장 → 관리자가 모든 기기에서 실시간 확인 가능
```

## 🗑️ 데이터 초기화 (관리자 전용)

게임을 다시 시작하거나 테스트 데이터를 삭제하고 싶을 때 사용합니다.

### 초기화 방법
1. 관리자(기수 4, 이름 김권택)로 로그인
2. 화면 하단의 **"⚠️ 위험 구역"** 섹션 확인
3. **"🗑️ 모든 데이터 초기화"** 버튼 클릭
4. 2번의 확인 대화상자에서 **"확인"** 클릭

### 삭제되는 데이터
- ✅ **Firebase의 모든 점수** (모든 참여자의 제출 기록)
- ✅ **모든 사용자의 VIEW** (각자 받은 결측값 배치)
- ✅ **모든 사용자의 입력값** (진행 중인 답변)
- ✅ **localStorage의 모든 게임 데이터**

### 유지되는 데이터
- ✅ **data.csv** (원본 52개 레코드는 그대로)
- ✅ **teams.json** (팀 구성 정보는 그대로)
- ✅ **config.js** (Firebase 설정은 그대로)

### 주의사항
- ⚠️ **이 작업은 되돌릴 수 없습니다!**
- ⚠️ 모든 참여자가 처음부터 다시 시작해야 합니다
- ⚠️ 초기화 전에 점수 CSV를 다운로드 받아두는 것을 권장합니다

## 🎯 채점 방식

### 기본 채점
- **정답**: 원본 데이터와 일치 (유연한 매칭 적용)
- **개인 점수**: (정답 개수 / 총 결측값) × 100점
- **팀 평균 점수**: 팀원들의 개인 점수 평균
- **결과**: 각 항목별 정답/오답 상세 표시

### 유연한 답안 매칭 (answers.json)
`answers.json` 파일을 통해 다양한 표현을 정답으로 인정합니다:

#### FV_SNGR (좋아하는 가수)
- **아이유** = "아이유", "IU", "iu", "아유"
- **테일러 스위프트** = "테일러스위프트", "Taylor Swift", "테일러"
- **Ed Sheeran** = "에드시런", "ed sheeran", "에드 시런"
- 총 55개 아티스트의 다양한 표기 지원

#### DEPT (전공)
- **"과"/"부" 유무 모두 허용**: 
  - 경영학과 = 경영학 = 경영 = 경영과
  - 예술공학부 = 예술공학 = 예술공학과
- **약어 지원**: 
  - 응용통계학과 = 응통 = 통계
  - 소프트웨어학과 = 소웨 = SW
  - 영어영문학과 = 영문
  - 중국어문학과 = 중문
- **영문명 지원**: Business, Statistics, Economics 등
- 총 16개 전공의 다양한 표기 지원

#### STAFF_YN (운영진 여부)
- **true** = "true", "yes", "o", "운영진", "참여"
- **false** = "false", "no", "x", "비운영진", "미참여"

#### 기타 필드
- **MBTI**: 대소문자 무관 (INTJ = intj)
- **HT_CLSS**: 대소문자 무관 (ACT = act)
- **ELMT_SCHL, HTWN**: 공백/특수문자 관대 처리

## 🛠️ 기술 스택

- **Frontend**: HTML, CSS, JavaScript (순수 바닐라)
- **데이터베이스**: Firebase Realtime Database (클라우드 중앙 저장소)
- **로컬 저장**: localStorage (개인 진행 상황 & 백업)
- **Hosting**: GitHub Pages (정적 사이트)
- **데이터**: CSV 파일 + JSON 설정 파일

백엔드 서버 없이 Firebase를 간단한 클라우드 데이터베이스로 활용합니다!

## 📂 파일 구조

```
.
├── index.html          # 메인 HTML 파일
├── styles.css          # 스타일시트
├── script.js           # JavaScript 로직 (1300+ 줄)
├── config.js           # Firebase 설정 파일
├── data.csv            # 원본 데이터 (52명)
├── teams.json          # 팀 구성 정보 (10개 팀, 59명)
├── teams.md            # 팀 구성 상세 문서
├── answers.json        # 허용 답안 목록 (채점 규칙)
├── README.md           # 이 파일
└── SETUP.md            # 빠른 시작 가이드
```

## 📝 실제 데이터 사용 시

### 1. data.csv 업데이트
`data.csv` 파일을 실제 참여자 데이터로 교체하세요:

```bash
# CSV 형식 (헤더 포함)
NAME,S_NO,A_NO,DEPT,MBTI,AGE,HT_CLSS,FV_SNGR,STAFF_YN,ELMT_SCHL,HTWN
홍길동,1,1,컴퓨터공학과,INTJ,23,자료구조,아이유,true,서울초등학교,서울
...
```

**주의사항**:
- STAFF_YN은 `true` 또는 `false`로 입력
- 기수는 0-30 사이의 정수
- UTF-8 인코딩 사용

### 2. teams.json 업데이트
팀 구성 정보를 업데이트하세요:

```json
{
  "teams": [
    {
      "teamNumber": 1,
      "teamName": "팀 이름",
      "members": [
        {"name": "홍길동", "sNo": 1, "aNo": 1, "dept": "컴퓨터공학과", "inData": true}
      ]
    }
  ]
}
```

**inData 플래그**:
- `true`: data.csv에 데이터 있음 (일반 참여자)
- `false`: data.csv에 데이터 없음 (설문 미참여자, 게임 참여 가능)

### 3. answers.json 업데이트 (선택)
자주 나오는 답안의 동의어를 추가하세요:

```json
{
  "globalRules": {
    "FV_SNGR": {
      "아티스트명": ["표기1", "표기2", "표기3"]
    }
  }
}
```

### 4. Git 커밋 및 배포
```bash
git add data.csv teams.json answers.json
git commit -m "Update participant data"
git push
```

## 🔒 개인정보 보호

### 점수 데이터
- Firebase Realtime Database에 저장 (당신의 Firebase 프로젝트 소유)
- Firebase 보안 규칙으로 접근 제어 가능
- 언제든지 Firebase 프로젝트를 삭제하여 모든 데이터 제거 가능

### 개인 진행 데이터
- 사용자의 브라우저 localStorage에만 저장
- 외부로 전송되지 않음
- localStorage를 지우면 삭제됨

### Firebase 보안
- 📖 자세한 보안 규칙 설정: https://firebase.google.com/docs/database/security
- 게임 종료 후 보안 규칙을 엄격하게 변경하거나 프로젝트 삭제 권장
- Firebase API Key는 공개되어도 안전합니다 (보안 규칙이 실제 보안을 담당)

## 🐛 문제 해결

### Firebase 설정 관련

#### "⚠️ Firebase 초기화 실패" 오류
1. `config.js` 파일의 Firebase 설정이 올바른지 확인
2. Firebase Console에서 Realtime Database가 생성되었는지 확인
3. `databaseURL`이 올바른지 확인
4. 브라우저 콘솔(F12)에서 자세한 오류 메시지 확인

#### "Permission denied" 오류
1. Firebase Console → Realtime Database → 규칙 탭
2. 다음과 같이 설정:
```json
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```

#### 관리자가 다른 참여자 점수를 못 봐요
1. `config.js`가 올바르게 설정되었는지 확인
2. Firebase Console에서 데이터가 실제로 저장되었는지 확인
3. 네트워크 연결 확인
4. 🔄 새로고침 버튼 클릭

### 게임 플레이 관련

#### "팀을 찾을 수 없습니다" 오류
- `teams.json`에 해당 이름과 기수가 있는지 확인
- 동명이인의 경우 기수가 정확한지 확인
  - 예: 김태연(2팀 5기) vs 김태연(3팀 4기)

#### 데이터가 로드되지 않아요
- 브라우저 콘솔(F12)을 열어 오류를 확인하세요
- `data.csv` 파일이 올바른 위치에 있는지 확인하세요
- CSV 파일이 UTF-8 인코딩인지 확인하세요
- GitHub Pages가 올바르게 배포되었는지 확인하세요

#### 저장한 진행상황이 사라졌어요
- **개인 진행상황**(VIEW, 입력값)은 localStorage에 저장되어 **기기별로 독립적**입니다
- 같은 브라우저를 사용하고 있는지 확인하세요
- 시크릿 모드에서는 localStorage가 저장되지 않습니다

#### Firebase 없이 사용하고 싶어요
- `config.js`를 수정하지 않으면 자동으로 localStorage만 사용합니다
- 단, 이 경우 **각 기기별로 점수가 독립적**으로 저장됩니다
- 관리자는 자기 기기에서 제출된 점수만 볼 수 있습니다

## 📊 게임 통계 예시

```
총 참여자: 58명
총 팀: 10개
총 제출: 45명
평균 점수: 78.5점
최고 점수: 95.2점
```

## 🎮 게임 팁

### 참여자를 위한 팁
1. **체계적으로 접근**: 팀별로 묶어서 물어보기
2. **메모 활용**: 물어본 정보를 메모장에 기록
3. **자주 저장**: 💾 버튼으로 진행상황 저장
4. **동의어 활용**: "아이유" 대신 "IU"로 입력해도 정답 인정

### 관리자를 위한 팁
1. **실시간 모니터링**: 🔄 버튼으로 주기적 새로고침
2. **채점 수정**: 오답으로 표시된 항목 클릭하여 수동 정답 처리 가능
3. **데이터 백업**: 초기화 전 반드시 점수 데이터 저장

## 📄 라이선스

이 프로젝트는 교육 목적으로 자유롭게 사용할 수 있습니다.

## 👥 기여

버그 리포트나 기능 제안은 GitHub Issues를 통해 제출해주세요.

---

**마지막 업데이트**: 2025-10-31
**버전**: 2.0 (실제 팀 구성 및 설문 미참여자 지원)
