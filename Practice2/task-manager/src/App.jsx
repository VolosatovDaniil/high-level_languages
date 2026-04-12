import React, { useState, useEffect } from 'react';
import Auth from './components/Auth';
import TaskBoard from './components/TaskBoard';
import Profile from './components/Profile';
import './App.css';

const API = "http://localhost:1000";

export default function App() {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [screen, setScreen] = useState('board');

  useEffect(() => {
    fetch(`${API}/tasks`).then(r => r.json()).then(setTasks);
  }, []);

  const login = (data) => {
    fetch(`${API}/login`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    })
    .then(res => res.ok ? res.json() : Promise.reject())
    .then(setUser)
    .catch(() => alert("Помилка входу"));
  };

  const register = (data) => {
    fetch(`${API}/register`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    })
    .then(r => r.json())
    .then(setUser);
  };

  const addTask = (e) => {
    e.preventDefault();
    const body = { text: e.target.text.value, tag: e.target.tag.value };
    fetch(`${API}/tasks`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(body)
    })
    .then(r => r.json())
    .then(t => setTasks([...tasks, t]));
    e.target.reset();
  };

  const deleteTask = (id) => {
    fetch(`${API}/tasks/${id}`, { method: 'DELETE' })
      .then(() => {
        setTasks(tasks.filter(t => t.id !== id));
      });
  };

  const updateProfile = (e) => {
    e.preventDefault();
    const body = { name: e.target.name.value, password: e.target.password.value };
    fetch(`${API}/profile/${user.id}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(body)
    }).then(() => {
      setUser({...user, ...body});
      alert("Дані оновлено!");
    });
  };

  if (!user) return <Auth onLogin={login} onRegister={register} />;

  return (
    <div className="container">
      <nav>
        <button onClick={() => setScreen('board')} className={screen === 'board' ? 'active' : ''}>Дошка</button>
        <button onClick={() => setScreen('profile')} className={screen === 'profile' ? 'active' : ''}>Профіль</button>
        <button onClick={() => setUser(null)} className="btn-logout">Вихід</button>
      </nav>

      {screen === 'board' ? (
        <TaskBoard tasks={tasks} onAddTask={addTask} onDeleteTask={deleteTask} />
      ) : (
        <Profile user={user} onUpdateProfile={updateProfile} />
      )}
    </div>
  );
}