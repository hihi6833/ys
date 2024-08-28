const express = require('express');
const path = require('path');
const app = express();

function link_to_breakfast(){
     window.location.href = 'localhost:3000/breakfast'
}

// 'public' 폴더를 정적 파일 제공을 위해 사용
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'main.html'));
});

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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
