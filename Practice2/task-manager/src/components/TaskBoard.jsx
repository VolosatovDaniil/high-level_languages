import React from 'react';

export default function TaskBoard({ tasks, onAddTask, onDeleteTask }) {
  return (
    <div className="card">
      <h2>Дошка завдань</h2>

      <form onSubmit={onAddTask} className="task-form">
        <input name="text" placeholder="Що зробити?" required />
        <input name="tag" placeholder="Тег/Мітка" />
        <button type="submit">Додати</button>
      </form>
      
      <ul className="task-list">
        {tasks.map(t => (
          <li key={t.id} className="task-item">
            <div className="task-content">
              <span className="task-text">{t.text}</span>
              <span className="task-tag">{t.tag}</span>
            </div>
            <button onClick={() => onDeleteTask(t.id)} className="btn-delete">Видалити</button>
          </li>
        ))}
      </ul>
    </div>
  );
}