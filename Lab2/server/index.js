const express = require('express');
const cors = require('cors');
const db = require('./database');
const app = express();

app.use(cors());
app.use(express.json());

// Каталог курсів
app.get('/api/courses', (req, res) => {
  db.all("SELECT * FROM courses", [], (err, rows) => res.json(rows));
});

// Деталі курсу та відгуки
app.get('/api/courses/:id', (req, res) => {
  db.get("SELECT * FROM courses WHERE id = ?", [req.params.id], (err, course) => {
    db.all("SELECT * FROM reviews WHERE course_id = ?", [req.params.id], (err, reviews) => {
      res.json({ ...course, reviews: reviews || [] });
    });
  });
});

// Реєстрація
app.post('/api/register', (req, res) => {
  const { username, password } = req.body;
  db.run("INSERT INTO users (username, password) VALUES (?, ?)", [username, password], (err) => {
    if (err) return res.status(400).json({ error: "Цей логін вже зайнятий" });
    res.json({ message: "Реєстрація успішна!" });
  });
});

// Вхід
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  db.get("SELECT * FROM users WHERE username = ? AND password = ?", [username, password], (err, user) => {
    if (user) res.json(user);
    else res.status(401).json({ error: "Невірний логін або пароль" });
  });
});

// Оновлення профілю
app.put('/api/user/:id', (req, res) => {
  const { username, password } = req.body;
  db.run("UPDATE users SET username = ?, password = ? WHERE id = ?", [username, password, req.params.id], (err) => {
    if (err) return res.status(400).json({ error: "Помилка оновлення" });
    res.json({ message: "Дані успішно змінено!" });
  });
});

// Запис на курс
app.post('/api/enroll', (req, res) => {
  const { user_id, course_id } = req.body;
  db.run("INSERT INTO programs (user_id, course_id) VALUES (?, ?)", [user_id, course_id], (err) => {
    if (err) return res.status(400).json({ error: "Ви вже записані" });
    res.json({ message: "Успішно записано!" });
  });
});

// Видалення з курсу
app.delete('/api/enroll/:userId/:courseId', (req, res) => {
  db.run("DELETE FROM programs WHERE user_id = ? AND course_id = ?", [req.params.userId, req.params.courseId], () => {
    res.json({ message: "Ви відписалися від курсу" });
  });
});

// Додавання відгуку 
app.post('/api/courses/:id/reviews', (req, res) => {
  const { text, rating } = req.body;
  const courseId = req.params.id;
  db.run("INSERT INTO reviews (course_id, text, rating) VALUES (?, ?, ?)", [courseId, text, rating], () => {
    db.run(`UPDATE courses SET rating = (SELECT AVG(rating) FROM reviews WHERE course_id = ?) WHERE id = ?`, [courseId, courseId]);
    res.json({ message: "Відгук додано" });
  });
});

// Отримання моїх курсів
app.get('/api/my-courses/:userId', (req, res) => {
  const sql = `SELECT courses.* FROM courses JOIN programs ON courses.id = programs.course_id WHERE programs.user_id = ?`;
  db.all(sql, [req.params.userId], (err, rows) => res.json(rows));
});

app.listen(3001, () => console.log("Сервер запущено..."));