import { NavLink } from 'react-router-dom';

export default function Navbar({ user }) {
  return (
    <nav className="navbar">
      <NavLink to="/" className="nav-item" style={{fontSize: '1.2rem', fontWeight: 'bold', color: '#6366f1'}}>EduCatalog</NavLink>
      <div style={{display: 'flex', gap: '10px', alignItems: 'center'}}>
        <NavLink to="/" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>Всі курси</NavLink>
        {user && <NavLink to="/my-courses" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>Мої курси</NavLink>}
        {user ? (
          <NavLink to="/profile" className="nav-item" style={{background: '#f1f5f9'}}>👤 {user.username}</NavLink>
        ) : (
          <NavLink to="/login" className="nav-item">Вхід</NavLink>
        )}
      </div>
    </nav>
  );
}