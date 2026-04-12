import React, { useState } from 'react';

export default function Auth({ onRegister, onLogin }) {
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      email: e.target.email.value,
      password: e.target.password.value
    };
    if (isLogin) {
        onLogin(data);
    } else {
      data.name = e.target.name.value;
      onRegister(data);
    }
  };

  return (
    <div className="auth-container">
      <div className="card">
        <h2>{isLogin ? "Вхід" : "Реєстрація"}</h2>

        <form onSubmit={handleSubmit}>
          {!isLogin && <input name="name" placeholder="Ім'я" required />}
          <input name="email" type="email" placeholder="Email" required />
          <input name="password" type="password" placeholder="Пароль" required />
          <button type="submit">{isLogin ? "Увійти" : "Створити акаунт"}</button>
        </form>

        <p onClick={() => setIsLogin(!isLogin)} className="toggle-auth">
          {isLogin ? "Немає акаунту? Реєстрація" : "Вже є акаунт? Увійти"}
        </p>
      </div>
    </div>
  );
}