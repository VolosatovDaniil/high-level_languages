import { Link } from 'react-router-dom';

export default function CourseCard({ course, onEnroll, onRemove, isEnrolled, showRemove }) {
  return (
    <div className="card" style={{ position: 'relative' }}>
      {showRemove && (
        <button className="remove-btn" onClick={() => onRemove(course.id)}>×</button>
      )}
      
      <h3 style={{ paddingRight: '20px' }}>{course.title}</h3>
      <p>{course.description}</p>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to={`/course/${course.id}`} className="rating-link">
          ⭐ {course.rating ? Number(course.rating).toFixed(1) : "0.0"}
        </Link>
        
        {!showRemove && (
          <button 
            className="btn" 
            disabled={isEnrolled} 
            onClick={() => !isEnrolled && onEnroll && onEnroll(course.id)}
          >
            {isEnrolled ? "Записані" : "Записатися"}
          </button>
        )}
      </div>
    </div>
  );
}