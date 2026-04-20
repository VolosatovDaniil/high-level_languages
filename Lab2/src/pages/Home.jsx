import { useState, useEffect } from 'react';
import axios from 'axios';
import CourseCard from '../components/CourseCard';

const API = "http://localhost:3001/api";

export default function Home({ user, showNotify }) {
  const [courses, setCourses] = useState([]);
  const [myIds, setMyIds] = useState([]);

  useEffect(() => {
    axios.get(`${API}/courses`).then(res => setCourses(res.data));
    if (user) {
      axios.get(`${API}/my-courses/${user.id}`).then(res => setMyIds(res.data.map(c => c.id)));
    }
  }, [user]);

  const handleEnroll = (id) => {
    if (!user) return showNotify("Будь ласка, увійдіть у систему");
    axios.post(`${API}/enroll`, { user_id: user.id, course_id: id })
      .then(res => {
        showNotify(res.data.message);
        setMyIds([...myIds, id]);
      }).catch(err => showNotify(err.response?.data?.error));
  };

  return (
    <div className="course-grid">
      {courses.map(c => (
        <CourseCard 
          key={c.id} 
          course={c} 
          onEnroll={handleEnroll} 
          isEnrolled={myIds.includes(c.id)} 
        />
      ))}
    </div>
  );
}