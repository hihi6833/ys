const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

let menus = []; // 메뉴 데이터를 저장하는 배열

// body-parser를 사용해 POST 요청 데이터 처리
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// CORS 설정
app.use(cors());

// 'public' 폴더를 정적 파일 제공을 위해 사용
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'admin')));

// 기본 라우트
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'main.html'));
});

// 메뉴를 가져오는 API
app.get('/menus', (req, res) => {
    res.json(menus);
});

// 메뉴 추가 API
app.post('/menus', (req, res) => {
    const newMenu = req.body; // 요청 본문에서 새 메뉴 데이터를 가져옴

    if (!newMenu.name || !newMenu.category) {
        return res.status(400).send('메뉴 이름과 카테고리가 필요합니다.');
    }

    menus.push(newMenu); // 새 메뉴를 배열에 추가
    res.status(201).json(newMenu); // 추가된 메뉴 반환
});

// 기존의 라우트들
app.get('/breakfast', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'breakfast.html'));
});

app.get('/snack', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'snack.html'));
});

app.get('/convenience', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'convenience.html'));
});

app.get('/healthy', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'healthy.html'));
});

app.get('/midnight', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'midnight.html'));
});

app.get('/refrigerator', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'refrigerator.html'));
});

app.get('/adminpage', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin', 'adminpage.html'));
});

// 로그인 처리 라우트 추가
app.post('/login', (req, res) => {
    const { id, password } = req.body;

    // 실제로는 데이터베이스에서 사용자 정보를 조회하고 검증해야 합니다.
    const validId = '000';
    const validPassword = '1111';

    if (id === validId && password === validPassword) {
        // 인증 성공 시 adminpage.html로 리다이렉션
        res.json({ success: true, redirect: '/adminpage' });
    } else {
        // 인증 실패 시 에러 메시지 반환
        res.json({ success: false, message: '아이디 또는 비밀번호가 올바르지 않습니다.' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
