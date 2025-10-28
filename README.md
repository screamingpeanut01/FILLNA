# 결측치를 채워라! 🎮

참여자들이 데이터 테이블의 결측값을 직접 물어보며 채우는 인터랙티브 게임입니다.

## 📋 게임 소개

- 각 참여자는 기수와 이름으로 로그인합니다
- 60개의 레코드 중 랜덤하게 20개가 샘플링됩니다
- NULLABLE한 필드에 랜덤하게 10개의 결측값이 생성됩니다
- 참여자들은 돌아다니며 서로에게 물어보며 결측값을 채웁니다
- 모두 채운 후 제출하면 자동으로 채점됩니다

## 🚀 GitHub Pages 배포 방법

### 1. GitHub Personal Access Token 생성 (중요! ⭐)
**모든 기기에서 점수를 공유하려면 필수입니다!**

1. GitHub 로그인 → https://github.com/settings/tokens
2. **"Generate new token"** → **"Generate new token (classic)"** 클릭
3. Note: `FILLNA Game Token` (아무 이름이나)
4. Expiration: **No expiration** (또는 원하는 기간)
5. **Scopes**: `gist` 체크박스만 체크 ✅
6. 맨 아래 **"Generate token"** 클릭
7. 생성된 토큰 **복사** (다시 볼 수 없으니 주의!)

### 2. Gist 생성
1. https://gist.github.com/ 접속
2. **"Create new gist"** 클릭
3. Filename: `fillna-scores.json`
4. Content: `[]` (빈 배열만 입력)
5. **"Create secret gist"** 클릭 (Public도 가능하지만 Secret 권장)
6. URL에서 Gist ID 복사
   - 예: `https://gist.github.com/username/`**`abc123def456`** → **`abc123def456`**가 Gist ID

### 3. config.js 파일 수정
`config.js` 파일을 열어서 다음 두 줄을 수정:

```javascript
GITHUB_TOKEN: 'ghp_your_actual_token_here',  // 1단계에서 복사한 토큰
GIST_ID: 'abc123def456',  // 2단계에서 복사한 Gist ID
```

### 4. 저장소 생성 및 배포
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

### 5. GitHub Pages 활성화
1. GitHub 저장소로 이동
2. Settings → Pages
3. Source를 "Deploy from a branch"로 설정
4. Branch를 "main"으로 선택, 폴더는 "/ (root)" 선택
5. Save 클릭

### 6. 접속
- 몇 분 후 `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/` 에서 게임에 접속할 수 있습니다
- **이제 모든 참여자의 점수가 Gist에 저장되어 모든 기기에서 확인 가능합니다! 🎉**

## 📱 사용 방법

### 참여자 (플레이어)
1. **로그인**: 기수와 이름 입력
2. **결측값 확인**: 노란색으로 표시된 ❓ 셀이 결측값입니다
3. **정보 수집**: 다른 참여자들에게 물어보며 정보를 수집합니다
4. **결측값 입력**: 노란색 셀을 클릭하여 값을 입력합니다
5. **저장**: 💾 저장 버튼을 눌러 진행상황을 저장합니다
6. **제출**: ✅ 제출 버튼을 눌러 채점을 받습니다

### 🔐 관리자 (운영자)
- **로그인**: 기수 `6`, 이름 `김권택`으로 로그인
- **점수 확인**: 모든 참여자의 점수를 순위별로 확인
- **상세 결과**: 참여자를 클릭하면 문항별 정답/오답 팝업 표시
- **다운로드**: 📥 버튼으로 전체 점수를 CSV 파일로 다운로드
- **새로고침**: 🔄 버튼으로 최신 점수 현황 업데이트
- **데이터 초기화**: 🗑️ 버튼으로 모든 점수 및 진행 상황 삭제 (게임 재시작 시 사용)

## 🗃️ 데이터 구조

### 메타데이터
| 필드명 | 설명 | 데이터 형식 | Nullable |
|--------|------|-------------|----------|
| NAME | 학회원의 실명 | VARCHAR | FALSE |
| S_NO | 중앙대학교 학번 | INTEGER | FALSE |
| A_NO | 다트비 기수 | INTEGER | FALSE |
| DEPT | 전공 학과 | VARCHAR | FALSE |
| MBTI | MBTI 성격유형 | VARCHAR | **TRUE** |
| AGE | 학회원의 나이(한국) | INTEGER | **TRUE** |
| HT_CLSS | 가장 수강하기 싫었던 과목 | VARCHAR | **TRUE** |
| FV_SNGR | 가장 좋아하는 가수 | VARCHAR | **TRUE** |
| STAFF_YN | 운영진 활동 여부 | BOOLEAN | FALSE |
| ELMT_SCHL | 출신 초등학교 | VARCHAR | FALSE |
| HTWN | 고향 | VARCHAR | **TRUE** |

**결측값은 NULLABLE=TRUE인 5개 필드에만 생성됩니다.**

## 💾 데이터 저장

### 점수 데이터 (모든 기기 공유 🌐)
- **저장 위치**: GitHub Gist (중앙 저장소)
- **공유 범위**: 모든 참여자의 점수를 모든 기기에서 확인 가능
- **백업**: localStorage에도 자동 백업

### 개인 진행 데이터 (기기별 독립)
- **사용자 VIEW**: 각 사용자마다 유니크한 20개 레코드 + 10개 결측값
- **입력값**: 사용자가 입력한 결측값
- **저장 위치**: 브라우저의 localStorage (기기별)
- **특징**: 같은 기기에서는 새로고침해도 동일한 VIEW 유지

### 데이터 흐름
```
참여자 제출 → Gist에 점수 저장 → 관리자가 모든 기기에서 확인 가능
```

## 🗑️ 데이터 초기화 (관리자 전용)

게임을 다시 시작하거나 테스트 데이터를 삭제하고 싶을 때 사용합니다.

### 초기화 방법
1. 관리자(기수 6, 이름 김권택)로 로그인
2. 화면 하단의 **"⚠️ 위험 구역"** 섹션 확인
3. **"🗑️ 모든 데이터 초기화"** 버튼 클릭
4. 2번의 확인 대화상자에서 **"확인"** 클릭

### 삭제되는 데이터
- ✅ **Gist의 모든 점수** (모든 참여자의 제출 기록)
- ✅ **모든 사용자의 VIEW** (각자 받은 20개 레코드)
- ✅ **모든 사용자의 입력값** (진행 중인 답변)
- ✅ **localStorage의 모든 게임 데이터**

### 유지되는 데이터
- ✅ **data.csv** (원본 60개 레코드는 그대로)
- ✅ **config.js** (Gist 설정은 그대로)

### 주의사항
- ⚠️ **이 작업은 되돌릴 수 없습니다!**
- ⚠️ 모든 참여자가 처음부터 다시 시작해야 합니다
- ⚠️ 초기화 전에 점수 CSV를 다운로드 받아두는 것을 권장합니다

## 🎯 채점 방식

- 정답: 원본 데이터와 정확히 일치 (대소문자 무시, 공백 제거)
- 점수: (정답 개수 / 10) × 100점
- 결과: 각 항목별 정답/오답 상세 표시

## 🛠️ 기술 스택

- **Frontend**: HTML, CSS, JavaScript (순수 바닐라)
- **데이터 공유**: GitHub Gist API (중앙 점수 저장소)
- **로컬 저장**: localStorage (개인 진행 상황 & 백업)
- **Hosting**: GitHub Pages (정적 사이트)
- **데이터**: CSV 파일

백엔드 서버 없이 Gist를 간단한 데이터베이스로 활용합니다!

## 📂 파일 구조

```
.
├── index.html          # 메인 HTML 파일
├── styles.css          # 스타일시트
├── script.js           # JavaScript 로직
├── config.js           # 설정 파일 (Token, Gist ID)
├── data.csv            # 원본 데이터 (60개 레코드)
└── README.md           # 이 파일
```

## 📝 실제 데이터 사용 시

`data.csv` 파일을 실제 참여자 데이터로 교체하세요:
1. 60개의 레코드를 준비합니다
2. 위의 메타데이터 구조에 맞게 CSV 파일을 작성합니다
3. `data.csv` 파일을 교체합니다
4. Git에 커밋하고 푸시합니다

```bash
git add data.csv
git commit -m "Update data.csv with real participant data"
git push
```

## 🔒 개인정보 보호

### 점수 데이터
- GitHub Gist에 저장 (당신의 GitHub 계정 소유)
- Gist는 Secret으로 설정하면 URL을 아는 사람만 접근 가능
- 언제든지 Gist를 삭제하여 모든 점수 데이터 제거 가능

### 개인 진행 데이터
- 사용자의 브라우저 localStorage에만 저장
- 외부로 전송되지 않음
- localStorage를 지우면 삭제됨

### Token 보안
- ⚠️ GitHub Token은 `config.js`에 저장되므로 공개 저장소에 올릴 때 주의!
- Token은 `gist` 권한만 가지므로 다른 리소스 접근 불가
- 필요시 언제든지 Token 삭제 가능: https://github.com/settings/tokens

## 🐛 문제 해결

### Gist 설정 관련

#### "⚠️ 온라인 데이터 로드 실패" 오류
1. `config.js` 파일의 `GITHUB_TOKEN`과 `GIST_ID`가 올바른지 확인
2. GitHub Token이 만료되지 않았는지 확인
3. Gist가 삭제되지 않았는지 확인
4. 브라우저 콘솔(F12)에서 자세한 오류 메시지 확인

#### 관리자가 다른 참여자 점수를 못 봐요
1. `config.js`가 올바르게 설정되었는지 확인
2. Gist에 실제로 데이터가 저장되었는지 확인 (Gist URL 직접 방문)
3. 네트워크 연결 확인
4. 🔄 새로고침 버튼 클릭

### 일반 문제

#### 데이터가 로드되지 않아요
- 브라우저 콘솔(F12)을 열어 오류를 확인하세요
- `data.csv` 파일이 올바른 위치에 있는지 확인하세요
- GitHub Pages가 올바르게 배포되었는지 확인하세요

#### 저장한 진행상황이 사라졌어요
- **개인 진행상황**(VIEW, 입력값)은 localStorage에 저장되어 **기기별로 독립적**입니다
- 같은 브라우저를 사용하고 있는지 확인하세요
- 시크릿 모드에서는 localStorage가 저장되지 않습니다

#### Gist 없이 사용하고 싶어요
- `config.js`를 수정하지 않으면 자동으로 localStorage만 사용합니다
- 단, 이 경우 **각 기기별로 점수가 독립적**으로 저장됩니다
- 관리자는 자기 기기에서 제출된 점수만 볼 수 있습니다

## 📄 라이선스

이 프로젝트는 교육 목적으로 자유롭게 사용할 수 있습니다.

## 👥 기여

버그 리포트나 기능 제안은 GitHub Issues를 통해 제출해주세요.

