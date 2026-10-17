import { Star } from 'lucide-react';

export default function ReviewCard({ review }) {
  return (
    <article className={`review-card review-card--${review.tone}`}>
      <div className="review-meta">
        <span className="review-number">{review.number} / 03</span>
        <span className="review-stars" aria-label="5 out of 5 stars">
          {Array.from({ length: 5 }, (_, index) => (
            <Star key={index} size={13} fill="currentColor" strokeWidth={1.3} aria-hidden="true" />
          ))}
        </span>
      </div>
      <blockquote>“{review.quote}”</blockquote>
      <div className="review-person">
        <img src={review.image} alt={review.imageAlt} loading="lazy" />
        <div>
          <p className="review-name">{review.name}</p>
          <p className="review-role">{review.role}</p>
        </div>
      </div>
      <span className="review-card-mark" aria-hidden="true">“</span>
    </article>
  );
}