import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const API = "http://localhost:3001/api";

export default function CourseDetail({ user, showNotify }) {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [review, setReview] = useState({ text: '', rating: 5 });

  useEffect(() => {
    axios.get(`${API}/courses/${id}`).then(res => setCourse(res.data));
  }, [id]);

  const sendReview = () => {
    if (!user) return alert("Спочатку увійдіть!");
    axios.post(`${API}/courses/${id}/reviews`, review).then(res => {
      showNotify(res.data.message);
      window.location.reload();
    });
  };

  if (!course) return <div className="container">Завантаження...</div>;

  return (
    <div className="container">
      <div className="card">
        <h1>{course.title}</h1>
        <p>{course.description}</p>
        <hr />
        <h3>Залишити відгук</h3>
        <div className="star-rating">
          {[1, 2, 3, 4, 5].map(s => (
            <span 
              key={s} 
              className={s <= review.rating ? "star active" : "star"} 
              onClick={() => setReview({ ...review, rating: s })}
            >★</span>
          ))}
        </div>
        <textarea 
          placeholder="Ваші враження..." 
          onChange={e => setReview({ ...review, text: e.target.value })}
        />
        <button className="btn" onClick={sendReview}>Надіслати</button>

        <h3 style={{ marginTop: '30px' }}>Відгуки студентів</h3>
        {course.reviews?.map((r, i) => (
          <div key={i} className="review-item">
            <strong>{"⭐".repeat(r.rating)}</strong>
            <p>{r.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}