const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

let posts = []; // 메모리에 게시글 저장

// body-parser를 사용해 POST 요청 데이터 처리
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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

app.get('/posts', (req, res) => {
    res.json(posts);
});

// 게시글 작성 라우트
app.post('/posts', (req, res) => {
    const { title, content } = req.body;
    
    if (!title || !content) {
      return res.status(400).send('Title and content are required.');
    }
  
    const newPost = {
      id: posts.length + 1,
      title,
      content,
      createdAt: new Date(),
    };
  
    posts.push(newPost);
  
    res.status(201).json(newPost);
});


app.use(cors());


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
