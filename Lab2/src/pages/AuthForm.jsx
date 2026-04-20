import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const API = "http://localhost:3001/api";

export default function AuthForm({ type, setUser }) {
  const [f, setF] = useState({ u: '', p: '' });
  const navigate = useNavigate();

  const act = () => {
    const url = type === 'login' ? '/login' : '/register';
    axios.post(API + url, { username: f.u, password: f.p })
      .then(res => { 
        if (type === 'login') { 
          setUser(res.data); 
          navigate('/'); 
        } else navigate('/login'); 
      })
      .catch(err => alert(err.response?.data?.error));
  };

  return (
    <div className="card" style={{maxWidth: '400px', margin: '0 auto'}}>
      <h2>{type === 'login' ? 'Вхід' : 'Реєстрація'}</h2>
      <input placeholder="Логін" onChange={e => setF({...f, u: e.target.value})} />
      <input type="password" placeholder="Пароль" onChange={e => setF({...f, p: e.target.value})} />
      <button className="btn w-100" onClick={act}>{type === 'login' ? 'Увійти' : 'Створити акаунт'}</button>
      <div className="auth-switch">
        {type === 'login' ? (
          <p>Немає акаунту? <Link to="/register">Реєстрація</Link></p>
        ) : (
          <p>Є акаунт? <Link to="/login">Вхід</Link></p>
        )}
      </div>
    </div>
  );
}