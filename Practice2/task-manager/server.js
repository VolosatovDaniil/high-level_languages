import express from 'express';
import sqlite3 from 'sqlite3';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const db = new sqlite3.Database('./database.db');

db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT, email TEXT, password TEXT)");
  db.run("CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY, text TEXT, tag TEXT)");
});


// Авторизація
app.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  db.run("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, password], function() {
    res.json({ id: this.lastID, name, email });
  });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  db.get("SELECT * FROM users WHERE email = ? AND password = ?", [email, password], (err, row) => {
    if (row) {
      const { password, ...userWithoutPassword } = row;
      res.json(userWithoutPassword);
    } else {
      res.status(401).json({ message: "Невірний email або пароль" });
    }
  });
});

app.put('/profile/:id', (req, res) => {
  const { name, password } = req.body;
  db.run("UPDATE users SET name = ?, password = ? WHERE id = ?", [name, password, req.params.id], () => {
    res.json({ success: true });
  });
});


// Дошка завдань
app.get('/tasks', (req, res) => {
  db.all("SELECT * FROM tasks", [], (err, rows) => res.json(rows));
});

app.post('/tasks', (req, res) => {
  const { text, tag } = req.body;
  db.run("INSERT INTO tasks (text, tag) VALUES (?, ?)", [text, tag], function() {
    res.json({ id: this.lastID, text, tag });
  });
});

app.delete('/tasks/:id', (req, res) => {
  db.run("DELETE FROM tasks WHERE id = ?", req.params.id, function() {
    res.json({ success: true });
  });
});

app.listen(1000, () => console.log('Backend loaded...'));