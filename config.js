// ==================== 설정 파일 ====================
// GitHub Gist를 사용하여 모든 기기에서 점수를 공유합니다.
//
// ⚠️ 보안 주의사항:
// - 이 파일은 GitHub Pages에 배포되어 누구나 볼 수 있습니다
// - Token은 'gist' 권한만 가지므로 다른 리소스는 안전합니다
// - 하지만 누군가 이 Token으로 Gist를 수정할 수 있습니다
// - 게임 종료 후 Token을 삭제하는 것을 권장합니다
// - Token 삭제: https://github.com/settings/tokens

const CONFIG = {
    // ============================================
    // 🔐 여기에 당신의 정보를 입력하세요!
    // ============================================
    
    // GitHub Personal Access Token (gist 권한)
    // https://github.com/settings/tokens 에서 생성
    GITHUB_TOKEN: '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',
    
    // Gist ID (생성한 Gist URL에서 마지막 부분)
    // 예: https://gist.github.com/username/abc123def456 → 'abc123def456'
    GIST_ID: 'f792c46ebca8f8c88b54afe134860f2a',
    
    // Gist 파일명 (변경하지 마세요)
    GIST_FILENAME: 'fillna-scores.json',
    
    // ============================================
    // ⚠️ 아래 내용은 수정하지 마세요
    // ============================================
    
    // Gist가 설정되었는지 확인
    isConfigured() {
        return this.GITHUB_TOKEN !== 'YOUR_GITHUB_TOKEN_HERE' && 
               this.GIST_ID !== 'YOUR_GIST_ID_HERE';
    },
    
    // Gist API URL
    getGistUrl() {
        return `https://api.github.com/gists/${this.GIST_ID}`;
    }
};

// 설정 확인
if (!CONFIG.isConfigured()) {
    console.warn('⚠️ Gist가 설정되지 않았습니다. config.js 파일을 수정하세요.');
    console.warn('📖 설정 방법은 README.md를 참조하세요.');
}

