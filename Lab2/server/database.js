const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  // Користувачі
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT
  )`);

  // Курси
  db.run(`CREATE TABLE IF NOT EXISTS courses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    description TEXT,
    rating REAL DEFAULT 0
  )`);

  // Відгуки 
  db.run(`CREATE TABLE IF NOT EXISTS reviews (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    course_id INTEGER,
    text TEXT,
    rating INTEGER,
    FOREIGN KEY(course_id) REFERENCES courses(id)
  )`);

  // Програми навчання
  db.run(`CREATE TABLE IF NOT EXISTS programs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    course_id INTEGER,
    status TEXT DEFAULT 'активний',
    UNIQUE(user_id, course_id), 
    FOREIGN KEY(user_id) REFERENCES users(id),
    FOREIGN KEY(course_id) REFERENCES courses(id)
  )`);

  // Початкові дані
  db.get("SELECT count(*) as count FROM courses", (err, row) => {
    if (row.count === 0) {
      db.run("INSERT INTO courses (title, description) VALUES ('Germany', 'Курс німецької мови')");
      db.run("INSERT INTO courses (title, description) VALUES ('English', 'Курс англійської мови')");
      db.run("INSERT INTO courses (title, description) VALUES ('French', 'Курс французької мови')");
    }
  });
});

module.exports = db;