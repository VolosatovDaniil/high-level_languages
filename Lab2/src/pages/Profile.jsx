import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API = "http://localhost:3001/api";

export default function Profile({ user, setUser, showNotify }) {
  const [data, setData] = useState({ 
    username: user?.username || '', 
    password: user?.password || '' 
  });
  const navigate = useNavigate();

  const update = () => {
    axios.put(`${API}/user/${user.id}`, data)
      .then(res => { 
        setUser({ ...user, ...data });
        showNotify(res.data.message); 
      })
      .catch(err => alert("Цей логін вже зайнятий або виникла помилка"));
  };

  const logout = () => {
    setUser(null);
    navigate('/');
  };

  if (!user) return <p className="container">Будь ласка, увійдіть у систему.</p>;

  return (
    <div className="card" style={{ maxWidth: '400px', margin: '40px auto' }}>
      <h2>Особистий кабінет</h2>
      
      <label>Ваш логін:</label>
      <input 
        value={data.username} 
        onChange={e => setData({ ...data, username: e.target.value })} 
      />
      
      <label>Новий пароль:</label>
      <input 
        type="password" 
        value={data.password} 
        onChange={e => setData({ ...data, password: e.target.value })} 
      />
      
      <button className="btn w-100" onClick={update}>Зберегти зміни</button>
      
      <button 
        className="btn w-100" 
        style={{ marginTop: '15px', background: '#f87171' }} 
        onClick={logout}
      >
        Вийти з акаунту
      </button>
    </div>
  );
}