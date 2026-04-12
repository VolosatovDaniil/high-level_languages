import React from 'react';

export default function Profile({ user, onUpdateProfile }) {
  return (
    <div className="card">
      <h2>Мій профіль</h2>

      <form onSubmit={onUpdateProfile}>
        <input name="name" defaultValue={user.name} placeholder="Ім'я" />
        <input name="password" type="password" placeholder="Новий пароль" />
        <button type="submit">Оновити дані</button>
      </form>
    </div>
  );
}