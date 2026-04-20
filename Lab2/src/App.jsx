import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import MyCourses from './pages/MyCourses';
import Profile from './pages/Profile';
import AuthForm from './pages/AuthForm';
import CourseDetail from './pages/CourseDetail';
import './App.css';

export default function App() {
  const [user, setUser] = useState(null);
  const [msg, setMsg] = useState("");

  const showNotify = (m) => { 
    setMsg(m); 
    setTimeout(() => setMsg(""), 3000); 
  };

  return (
    <BrowserRouter>
      <div className="container">
        <Navbar user={user} />
        {msg && <div className="toast">{msg}</div>}
        
        <Routes>
          <Route path="/" element={<Home user={user} showNotify={showNotify} />} />
          <Route path="/my-courses" element={<MyCourses user={user} showNotify={showNotify} />} />
          <Route path="/profile" element={<Profile user={user} setUser={setUser} showNotify={showNotify} />} />
          <Route path="/course/:id" element={<CourseDetail user={user} showNotify={showNotify} />} />
          <Route path="/login" element={<AuthForm type="login" setUser={setUser} />} />
          <Route path="/register" element={<AuthForm type="register" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}