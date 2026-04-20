import { useState, useEffect } from 'react';
import axios from 'axios';
import CourseCard from '../components/CourseCard';

const API = "http://localhost:3001/api";

export default function MyCourses({ user, showNotify }) {
  const [list, setList] = useState([]);

  const loadData = () => {
    if (user) axios.get(`${API}/my-courses/${user.id}`).then(res => setList(res.data));
  };

  useEffect(loadData, [user]);

  const handleRemove = (courseId) => {
    axios.delete(`${API}/enroll/${user.id}/${courseId}`).then(res => {
      showNotify(res.data.message);
      loadData();
    });
  };

  return (
    <div className="container">
      <h2>Мої навчальні програми</h2>
      <div className="course-grid">
        {list.map(c => (
          <CourseCard 
            key={c.id} 
            course={c} 
            showRemove={true} 
            onRemove={handleRemove} 
          />
        ))}
      </div>
    </div>
  );
}