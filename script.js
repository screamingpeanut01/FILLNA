// 전역 변수
let fullData = [];
let currentUser = null;
let userView = null;
let missingCells = [];
let userInputs = {};

// NULLABLE 필드 정의
const NULLABLE_FIELDS = ['MBTI', 'AGE', 'HT_CLSS', 'FV_SNGR', 'HTWN'];

// ==================== Firebase 함수 ====================

let db = null; // Firebase Database 참조

// Firebase 초기화
function initFirebase() {
    if (!isFirebaseConfigured()) {
        console.warn('Firebase가 설정되지 않아 localStorage를 사용합니다.');
        return false;
    }
    
    try {
        if (!firebase.apps.length) {
            firebase.initializeApp(FIREBASE_CONFIG);
        }
        db = firebase.database();
        console.log('✅ Firebase 초기화 완료');
        return true;
    } catch (error) {
        console.error('Firebase 초기화 실패:', error);
        alert('⚠️ Firebase 초기화 실패. 로컬 저장소만 사용합니다.\n\n' + error.message);
        return false;
    }
}

// 로딩 표시
function showLoading() {
    document.getElementById('loadingOverlay').classList.add('active');
}

// 로딩 숨김
function hideLoading() {
    document.getElementById('loadingOverlay').classList.remove('active');
}

// Firebase에서 점수 데이터 로드
async function loadScoresFromGist() {
    if (!db) {
        console.warn('Firebase가 초기화되지 않아 localStorage를 사용합니다.');
        return JSON.parse(localStorage.getItem('allScores') || '[]');
    }
    
    try {
        showLoading();
        const snapshot = await db.ref('scores').once('value');
        const scores = snapshot.val() || [];
        
        // localStorage에도 백업
        localStorage.setItem('allScores', JSON.stringify(scores));
        
        hideLoading();
        console.log('✅ Firebase에서 점수 로드 완료:', scores.length, '개');
        return scores;
    } catch (error) {
        console.error('Firebase 로드 오류:', error);
        hideLoading();
        
        // 실패시 localStorage 사용
        alert('⚠️ 온라인 데이터 로드 실패. 로컬 데이터를 사용합니다.\n\n' + error.message);
        return JSON.parse(localStorage.getItem('allScores') || '[]');
    }
}

// Firebase에 점수 데이터 저장
async function saveScoresToGist(scores) {
    // 먼저 localStorage에 저장
    localStorage.setItem('allScores', JSON.stringify(scores));
    
    if (!db) {
        console.warn('Firebase가 초기화되지 않아 localStorage만 사용합니다.');
        return true;
    }
    
    try {
        showLoading();
        await db.ref('scores').set(scores);
        
        hideLoading();
        console.log('✅ Firebase에 점수 저장 완료');
        return true;
    } catch (error) {
        console.error('Firebase 저장 오류:', error);
        hideLoading();
        
        alert('⚠️ 온라인 저장 실패. 로컬에만 저장되었습니다.\n\n' + error.message);
        return false;
    }
}

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', async () => {
    console.log('🚀 페이지 로드 시작');
    console.log('🔍 Firebase SDK 체크:', typeof firebase !== 'undefined' ? '✅ 로드됨' : '❌ 없음');
    console.log('🔍 FIREBASE_CONFIG 체크:', typeof FIREBASE_CONFIG !== 'undefined' ? '✅ 있음' : '❌ 없음');
    
    try {
        initFirebase(); // Firebase 초기화
        await loadCSVData();
        setupEventListeners();
        checkExistingUser();
        console.log('✅ 페이지 초기화 완료');
    } catch (error) {
        console.error('❌ 페이지 초기화 오류:', error);
        alert('페이지 초기화 중 오류가 발생했습니다.\n\n' + error.message);
    }
});

// CSV 데이터 로드
async function loadCSVData() {
    try {
        console.log('📂 CSV 로드 시작...');
        const response = await fetch('data.csv');
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const csvText = await response.text();
        console.log('📄 CSV 텍스트 길이:', csvText.length);
        
        fullData = parseCSV(csvText);
        console.log(`✅ Loaded ${fullData.length} records`);
        
        if (fullData.length === 0) {
            throw new Error('CSV 파일이 비어있습니다.');
        }
    } catch (error) {
        console.error('❌ Error loading CSV:', error);
        alert('❌ 데이터를 불러오는데 실패했습니다.\n\n' + error.message + '\n\n페이지를 새로고침해주세요.');
    }
}

// CSV 파싱 함수
function parseCSV(csvText) {
    const lines = csvText.trim().split('\n');
    const headers = lines[0].split(',');
    const data = [];
    
    for (let i = 1; i < lines.length; i++) {
        const values = parseCSVLine(lines[i]);
        const row = {};
        
        headers.forEach((header, index) => {
            const value = values[index]?.trim();
            row[header.trim()] = value;
        });
        
        data.push(row);
    }
    
    return data;
}

// CSV 라인 파싱 (쉼표 구분, 따옴표 고려)
function parseCSVLine(line) {
    const result = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        
        if (char === '"') {
            inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
            result.push(current);
            current = '';
        } else {
            current += char;
        }
    }
    
    result.push(current);
    return result;
}

// 이벤트 리스너 설정
function setupEventListeners() {
    console.log('🎯 이벤트 리스너 설정 시작');
    
    // 로그인
    const loginBtn = document.getElementById('loginBtn');
    if (loginBtn) {
        loginBtn.addEventListener('click', handleLogin);
        console.log('✅ 로그인 버튼 이벤트 연결됨');
    } else {
        console.error('❌ loginBtn을 찾을 수 없음');
    }
    document.getElementById('studentNo').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleLogin();
    });
    document.getElementById('studentName').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleLogin();
    });
    
    // 로그아웃
    document.getElementById('logoutBtn').addEventListener('click', handleLogout);
    document.getElementById('adminLogoutBtn').addEventListener('click', handleLogout);
    
    // 저장
    document.getElementById('saveBtn').addEventListener('click', saveUserInputs);
    
    // 제출 및 채점
    document.getElementById('submitBtn').addEventListener('click', handleSubmit);
    
    // 결과 화면 버튼
    document.getElementById('backToGameBtn').addEventListener('click', () => {
        showScreen('gameScreen');
    });
    
    document.getElementById('newGameBtn').addEventListener('click', handleNewGame);
    
    // 관리자 화면 버튼
    document.getElementById('refreshScoresBtn').addEventListener('click', async () => {
        await loadAdminScreen();
    });
    
    const resetBtn = document.getElementById('resetAllBtn');
    if (resetBtn) {
        resetBtn.addEventListener('click', handleResetAll);
        console.log('✅ 초기화 버튼 이벤트 연결됨');
    } else {
        console.error('❌ resetAllBtn을 찾을 수 없음');
    }
    
    // 모달
    document.getElementById('modalCancelBtn').addEventListener('click', closeModal);
    document.getElementById('modalConfirmBtn').addEventListener('click', confirmModalInput);
    document.getElementById('modalInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') confirmModalInput();
    });
    
    // 관리자 상세 모달
    document.getElementById('adminModalClose').addEventListener('click', closeAdminDetailModal);
    
    // 모달 배경 클릭 시 닫기
    document.getElementById('adminDetailModal').addEventListener('click', (e) => {
        if (e.target.id === 'adminDetailModal') {
            closeAdminDetailModal();
        }
    });
}

// 기존 사용자 확인
function checkExistingUser() {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        
        // 관리자인지 확인
        if (currentUser.isAdmin) {
            loadAdminScreen();
        } else {
            loadUserData();
            showGameScreen();
        }
    }
}

// 로그인 처리
function handleLogin() {
    console.log('🔍 handleLogin 호출됨');
    
    const sNo = document.getElementById('studentNo').value;
    const name = document.getElementById('studentName').value.trim();
    const errorDiv = document.getElementById('loginError');
    
    console.log('입력값:', { sNo, name });
    
    errorDiv.textContent = '';
    
    // CSV 데이터 로드 확인
    if (!fullData || fullData.length === 0) {
        errorDiv.textContent = '❌ 데이터 로드 중입니다. 잠시 후 다시 시도해주세요.';
        console.error('fullData가 비어있음:', fullData);
        return;
    }
    
    if (!sNo || !name) {
        errorDiv.textContent = '기수와 이름을 모두 입력해주세요.';
        return;
    }
    
    if (sNo < 1 || sNo > 20) {
        errorDiv.textContent = '기수는 1-20 사이의 값이어야 합니다.';
        return;
    }
    
    // 관리자 체크: 기수 6, 이름 "김권택"
    if (sNo == 6 && name === '김권택') {
        currentUser = { sNo, name, userId: 'admin', isAdmin: true };
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        loadAdminScreen();
        return;
    }
    
    const userId = `${sNo}_${name}`;
    currentUser = { sNo, name, userId, isAdmin: false };
    
    // 로컬 스토리지에 사용자 저장
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    
    // 사용자 데이터 로드 또는 생성
    loadUserData();
    
    showGameScreen();
}

// 사용자 데이터 로드 또는 생성
function loadUserData() {
    const savedView = localStorage.getItem(`userView_${currentUser.userId}`);
    const savedInputs = localStorage.getItem(`userInputs_${currentUser.userId}`);
    
    if (savedView) {
        // 기존 사용자 - 저장된 VIEW 로드
        userView = JSON.parse(savedView);
        userInputs = savedInputs ? JSON.parse(savedInputs) : {};
        console.log('Loaded existing user view');
    } else {
        // 새 사용자 - VIEW 생성
        createUserView();
        userInputs = {};
        saveUserView();
        console.log('Created new user view');
    }
}

// 사용자 VIEW 생성
function createUserView() {
    // 1. 60개 중 랜덤 20개 샘플링
    const shuffled = [...fullData].sort(() => Math.random() - 0.5);
    const sampled = shuffled.slice(0, 20);
    
    // 2. 각 레코드마다 NULLABLE 필드 중 랜덤하게 1개씩 결측값 생성 (총 20개)
    const selectedMissing = [];
    
    sampled.forEach((row, rowIndex) => {
        // 각 레코드에서 NULLABLE 필드 중 랜덤하게 1개 선택
        const randomFieldIndex = Math.floor(Math.random() * NULLABLE_FIELDS.length);
        const selectedField = NULLABLE_FIELDS[randomFieldIndex];
        
        selectedMissing.push({
            rowIndex: rowIndex,
            field: selectedField
        });
    });
    
    // 결측값 저장 (원본 값 백업)
    missingCells = selectedMissing.map(pos => ({
        rowIndex: pos.rowIndex,
        field: pos.field,
        originalValue: sampled[pos.rowIndex][pos.field],
        name: sampled[pos.rowIndex]['NAME']
    }));
    
    // VIEW에서 결측값 제거
    userView = sampled.map((row, rowIndex) => {
        const newRow = { ...row };
        selectedMissing.forEach(pos => {
            if (pos.rowIndex === rowIndex) {
                newRow[pos.field] = null;
            }
        });
        return newRow;
    });
}

// 사용자 VIEW 저장
function saveUserView() {
    localStorage.setItem(`userView_${currentUser.userId}`, JSON.stringify(userView));
    localStorage.setItem(`missingCells_${currentUser.userId}`, JSON.stringify(missingCells));
}

// 게임 화면 표시
function showGameScreen() {
    document.getElementById('currentUser').textContent = `${currentUser.name} (${currentUser.sNo}기)`;
    
    // 결측 셀 정보 로드
    const savedMissing = localStorage.getItem(`missingCells_${currentUser.userId}`);
    if (savedMissing) {
        missingCells = JSON.parse(savedMissing);
    }
    
    renderTable();
    updateFilledCount();
    showScreen('gameScreen');
}

// 테이블 렌더링
function renderTable() {
    const tbody = document.getElementById('dataTableBody');
    tbody.innerHTML = '';
    
    userView.forEach((row, rowIndex) => {
        const tr = document.createElement('tr');
        
        const fields = ['NAME', 'S_NO', 'A_NO', 'DEPT', 'MBTI', 'AGE', 'HT_CLSS', 'FV_SNGR', 'STAFF_YN', 'ELMT_SCHL', 'HTWN'];
        
        fields.forEach(field => {
            const td = document.createElement('td');
            const value = row[field];
            
            if (value === null || value === '') {
                // 결측 셀
                td.classList.add('missing-cell');
                const cellId = `${rowIndex}_${field}`;
                
                // 이미 입력된 값이 있는지 확인
                if (userInputs[cellId]) {
                    td.textContent = userInputs[cellId];
                    td.classList.add('filled');
                }
                
                td.addEventListener('click', () => openInputModal(rowIndex, field));
            } else {
                td.textContent = value;
            }
            
            tr.appendChild(td);
        });
        
        tbody.appendChild(tr);
    });
}

// 입력 모달 열기
function openInputModal(rowIndex, field) {
    const modal = document.getElementById('inputModal');
    const fieldName = document.getElementById('modalFieldName');
    const personName = document.getElementById('modalPersonName');
    const input = document.getElementById('modalInput');
    
    // 필드 이름 한글화
    const fieldNames = {
        'MBTI': 'MBTI 성격유형',
        'AGE': '나이',
        'HT_CLSS': '가장 수강하기 싫었던 과목',
        'FV_SNGR': '가장 좋아하는 가수',
        'HTWN': '고향'
    };
    
    fieldName.textContent = fieldNames[field] || field;
    personName.textContent = userView[rowIndex]['NAME'];
    
    const cellId = `${rowIndex}_${field}`;
    input.value = userInputs[cellId] || '';
    
    modal.classList.add('active');
    input.focus();
    
    // 모달 데이터 저장
    modal.dataset.rowIndex = rowIndex;
    modal.dataset.field = field;
}

// 모달 닫기
function closeModal() {
    const modal = document.getElementById('inputModal');
    modal.classList.remove('active');
}

// 모달 입력 확인
function confirmModalInput() {
    const modal = document.getElementById('inputModal');
    const input = document.getElementById('modalInput');
    const rowIndex = parseInt(modal.dataset.rowIndex);
    const field = modal.dataset.field;
    
    const value = input.value.trim();
    const cellId = `${rowIndex}_${field}`;
    
    if (value) {
        userInputs[cellId] = value;
        renderTable();
        updateFilledCount();
    }
    
    closeModal();
}

// 채운 결측값 수 업데이트
function updateFilledCount() {
    const filledCount = Object.keys(userInputs).length;
    document.getElementById('filledCount').textContent = filledCount;
}

// 사용자 입력 저장
function saveUserInputs() {
    localStorage.setItem(`userInputs_${currentUser.userId}`, JSON.stringify(userInputs));
    
    // 저장 피드백
    const btn = document.getElementById('saveBtn');
    const originalText = btn.textContent;
    btn.textContent = '✅ 저장됨!';
    btn.style.backgroundColor = '#059669';
    
    setTimeout(() => {
        btn.textContent = originalText;
        btn.style.backgroundColor = '';
    }, 2000);
}

// 제출 및 채점
function handleSubmit() {
    const filledCount = Object.keys(userInputs).length;
    
    if (filledCount < 20) {
        const confirm = window.confirm(`아직 ${20 - filledCount}개의 결측값이 남았습니다. 그래도 제출하시겠습니까?`);
        if (!confirm) return;
    }
    
    gradeSubmission();
}

// 채점
async function gradeSubmission() {
    let correctCount = 0;
    let wrongCount = 0;
    const results = [];
    
    missingCells.forEach(cell => {
        const cellId = `${cell.rowIndex}_${cell.field}`;
        const userAnswer = userInputs[cellId];
        const correctAnswer = cell.originalValue;
        
        let isCorrect = false;
        
        if (userAnswer) {
            // 대소문자 무시, 공백 제거 후 비교
            const normalizedUser = userAnswer.toString().trim().toLowerCase();
            const normalizedCorrect = correctAnswer.toString().trim().toLowerCase();
            
            isCorrect = normalizedUser === normalizedCorrect;
        }
        
        if (isCorrect) {
            correctCount++;
        } else {
            wrongCount++;
        }
        
        results.push({
            name: cell.name,
            field: cell.field,
            userAnswer: userAnswer || '(미입력)',
            correctAnswer: correctAnswer,
            isCorrect: isCorrect
        });
    });
    
    const score = (correctCount / 20) * 100;
    
    // 결과 저장
    await saveScore({
        userId: currentUser.userId,
        name: currentUser.name,
        sNo: currentUser.sNo,
        score: score,
        correctCount: correctCount,
        wrongCount: wrongCount,
        timestamp: new Date().toISOString(),
        results: results
    });
    
    // 결과 화면 표시
    showResultScreen(score, correctCount, wrongCount, results);
}

// 점수 저장
async function saveScore(scoreData) {
    // 기존 점수 불러오기 (Gist에서)
    const allScores = await loadScoresFromGist();
    
    // 새 점수 추가
    allScores.push(scoreData);
    
    // Firebase에 저장
    await saveScoresToGist(allScores);
}


// 결과 화면 표시
function showResultScreen(score, correctCount, wrongCount, results) {
    document.getElementById('scoreValue').textContent = score.toFixed(0);
    document.getElementById('correctCount').textContent = correctCount;
    document.getElementById('wrongCount').textContent = wrongCount;
    document.getElementById('accuracyRate').textContent = score.toFixed(1);
    
    const detailedResults = document.getElementById('detailedResults');
    detailedResults.innerHTML = '<h3>상세 결과</h3>';
    
    results.forEach(result => {
        const div = document.createElement('div');
        div.className = `result-item ${result.isCorrect ? 'correct' : 'wrong'}`;
        
        const fieldNames = {
            'MBTI': 'MBTI',
            'AGE': '나이',
            'HT_CLSS': '싫었던 과목',
            'FV_SNGR': '좋아하는 가수',
            'HTWN': '고향'
        };
        
        div.innerHTML = `
            <div class="result-info">
                <strong>${result.name}</strong> - ${fieldNames[result.field]}<br>
                <small>입력: ${result.userAnswer} | 정답: ${result.correctAnswer}</small>
            </div>
            <span class="result-badge ${result.isCorrect ? 'correct' : 'wrong'}">
                ${result.isCorrect ? '✓ 정답' : '✗ 오답'}
            </span>
        `;
        
        detailedResults.appendChild(div);
    });
    
    showScreen('resultScreen');
}

// 새 게임 시작
function handleNewGame() {
    const confirm = window.confirm('새 게임을 시작하면 현재 진행상황이 모두 초기화됩니다. 계속하시겠습니까?');
    if (!confirm) return;
    
    // 사용자 데이터 삭제
    localStorage.removeItem(`userView_${currentUser.userId}`);
    localStorage.removeItem(`userInputs_${currentUser.userId}`);
    localStorage.removeItem(`missingCells_${currentUser.userId}`);
    
    // 새 VIEW 생성
    createUserView();
    userInputs = {};
    saveUserView();
    
    // 게임 화면으로
    showGameScreen();
}

// 로그아웃
function handleLogout() {
    const confirm = window.confirm('로그아웃 하시겠습니까? (진행상황은 저장됩니다)');
    if (!confirm) return;
    
    // 관리자가 아닌 경우에만 입력값 저장
    if (!currentUser.isAdmin) {
        saveUserInputs();
    }
    
    // 현재 사용자 초기화
    localStorage.removeItem('currentUser');
    currentUser = null;
    userView = null;
    userInputs = {};
    missingCells = [];
    
    // 로그인 화면으로
    document.getElementById('studentNo').value = '';
    document.getElementById('studentName').value = '';
    showScreen('loginScreen');
}

// 화면 전환
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

// ==================== 관리자 기능 ====================

// 관리자 화면 로드
async function loadAdminScreen() {
    const allScores = await loadScoresFromGist();
    
    // 점수 기준으로 정렬 (높은 순)
    allScores.sort((a, b) => b.score - a.score);
    
    // 참여자 수 업데이트
    document.getElementById('totalParticipants').textContent = allScores.length;
    
    // 테이블 렌더링
    const tbody = document.getElementById('scoresTableBody');
    tbody.innerHTML = '';
    
    if (allScores.length === 0) {
        const tr = document.createElement('tr');
        tr.innerHTML = '<td colspan="6" style="text-align: center; padding: 30px; color: #6b7280;">아직 제출한 참여자가 없습니다.</td>';
        tbody.appendChild(tr);
    } else {
        allScores.forEach((score, index) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${index + 1}</td>
                <td>${score.name}</td>
                <td>${score.sNo}기</td>
                <td><strong>${score.score.toFixed(0)}점</strong></td>
                <td>${score.correctCount} / ${score.wrongCount}</td>
                <td>${new Date(score.timestamp).toLocaleString('ko-KR', { 
                    month: 'short', 
                    day: 'numeric', 
                    hour: '2-digit', 
                    minute: '2-digit' 
                })}</td>
            `;
            
            // 클릭 이벤트 추가
            tr.addEventListener('click', () => showAdminDetail(score));
            
            tbody.appendChild(tr);
        });
    }
    
    showScreen('adminScreen');
}

// 관리자 상세 결과 모달 표시
function showAdminDetail(scoreData) {
    // 기본 정보 설정
    document.getElementById('adminDetailName').textContent = scoreData.name;
    document.getElementById('adminDetailSNo').textContent = scoreData.sNo + '기';
    document.getElementById('adminDetailScore').textContent = scoreData.score.toFixed(1);
    document.getElementById('adminDetailAccuracy').textContent = scoreData.score.toFixed(1);
    document.getElementById('adminDetailTime').textContent = new Date(scoreData.timestamp).toLocaleString('ko-KR');
    
    // 상세 결과 렌더링
    const detailedResults = document.getElementById('adminDetailResults');
    detailedResults.innerHTML = '<h4 style="margin-bottom: 15px;">문항별 상세 결과</h4>';
    
    const fieldNames = {
        'MBTI': 'MBTI',
        'AGE': '나이',
        'HT_CLSS': '싫었던 과목',
        'FV_SNGR': '좋아하는 가수',
        'HTWN': '고향'
    };
    
    scoreData.results.forEach((result, index) => {
        const div = document.createElement('div');
        div.className = `result-item ${result.isCorrect ? 'correct' : 'wrong'}`;
        
        div.innerHTML = `
            <div class="result-info">
                <strong>${index + 1}. ${result.name}</strong> - ${fieldNames[result.field]}<br>
                <small>입력: <strong>${result.userAnswer}</strong> | 정답: <strong>${result.correctAnswer}</strong></small>
            </div>
            <span class="result-badge ${result.isCorrect ? 'correct' : 'wrong'}">
                ${result.isCorrect ? '✓ 정답' : '✗ 오답'}
            </span>
        `;
        
        detailedResults.appendChild(div);
    });
    
    // 모달 표시
    document.getElementById('adminDetailModal').classList.add('active');
}

// 관리자 상세 모달 닫기
function closeAdminDetailModal() {
    document.getElementById('adminDetailModal').classList.remove('active');
}

// 모든 데이터 초기화
async function handleResetAll() {
    console.log('🗑️ handleResetAll 호출됨');
    
    // 첫 번째 확인
    const confirm1 = window.confirm(
        '⚠️ 경고!\n\n' +
        '이 작업은 다음을 모두 삭제합니다:\n' +
        '• 모든 참여자의 점수 (Firebase)\n' +
        '• 모든 사용자의 진행 상황 (localStorage)\n' +
        '• 모든 VIEW 데이터\n\n' +
        '이 작업은 되돌릴 수 없습니다!\n\n' +
        '정말 계속하시겠습니까?'
    );
    
    if (!confirm1) {
        console.log('❌ 첫 번째 확인 취소됨');
        return;
    }
    
    // 두 번째 확인 (안전장치)
    const confirm2 = window.confirm(
        '🔴 최종 확인\n\n' +
        '정말로 모든 데이터를 삭제하시겠습니까?\n' +
        '이 작업은 되돌릴 수 없습니다!'
    );
    
    if (!confirm2) {
        console.log('❌ 두 번째 확인 취소됨');
        return;
    }
    
    console.log('✅ 확인 완료, 초기화 시작...');
    
    try {
        showLoading();
        
        // 1. Firebase의 모든 점수 삭제 (빈 배열로 초기화)
        console.log('🔥 Firebase 데이터 삭제 중...');
        await saveScoresToGist([]);
        console.log('✅ Firebase 데이터 삭제 완료');
        
        // 2. localStorage의 모든 데이터 삭제
        console.log('💾 localStorage 데이터 삭제 중...');
        const keysToRemove = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            // 게임 관련 데이터만 삭제 (다른 앱 데이터는 유지)
            if (key.startsWith('userView_') || 
                key.startsWith('userInputs_') || 
                key.startsWith('missingCells_') || 
                key === 'allScores' || 
                key === 'currentUser') {
                keysToRemove.push(key);
            }
        }
        
        console.log(`📋 삭제할 키 목록:`, keysToRemove);
        
        // 삭제 실행
        keysToRemove.forEach(key => localStorage.removeItem(key));
        console.log('✅ localStorage 데이터 삭제 완료');
        
        hideLoading();
        
        // 성공 메시지
        alert(
            '✅ 초기화 완료!\n\n' +
            `삭제된 항목:\n` +
            `• Firebase의 모든 점수 데이터\n` +
            `• localStorage의 ${keysToRemove.length}개 항목\n\n` +
            '모든 데이터가 삭제되었습니다.'
        );
        
        console.log('🔄 관리자 화면 새로고침 중...');
        // 관리자 화면 새로고침
        await loadAdminScreen();
        console.log('✅ 초기화 완료!');
        
    } catch (error) {
        hideLoading();
        console.error('❌ 초기화 오류:', error);
        alert('❌ 초기화 중 오류가 발생했습니다:\n\n' + error.message);
    }
}

