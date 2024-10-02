document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // 기본 폼 제출 동작 방지

    const enteredId = document.getElementById('id').value;
    const enteredPassword = document.getElementById('password').value;

    // 서버에 로그인 데이터 전송
    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: enteredId, password: enteredPassword }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // 인증 성공 시 adminpage로 이동
            window.location.href = data.redirect;
        } else {
            // 인증 실패 시 에러 메시지 표시
            document.getElementById('errorMessage').textContent = data.message;
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('errorMessage').textContent = '로그인 중 오류가 발생했습니다.';
    });
});
