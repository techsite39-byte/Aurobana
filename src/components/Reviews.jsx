import { ArrowDownRight } from 'lucide-react';
import { reviews } from '../data/reviews.js';
import ReviewCard from './ReviewCard.jsx';

export default function Reviews() {
  return (
    <section className="reviews-section section-shell" id="stories" aria-labelledby="stories-title">
      <div className="reviews-intro">
        <div className="intro-heading-wrap">
          <p className="eyebrow intro-kicker"><span className="eyebrow-dot" /> A closer look at growing up here</p>
          <h1 className="intro-title" id="stories-title">
            <span data-line>What makes</span>
            <span data-line><em>Aurobana</em></span>
            <span data-line>feel different<span className="title-period">.</span></span>
          </h1>
        </div>
        <div className="intro-aside">
          <p className="intro-copy">
            A school is made in the everyday moments: a teacher who notices, a new idea that takes hold, a child who finds their voice.
          </p>
          <a className="text-link" href="#parent-stories">
            Meet our community <ArrowDownRight size={18} strokeWidth={1.6} aria-hidden="true" />
          </a>
          <span className="intro-note">PARENT STORIES <span>·</span> 2026</span>
        </div>
      </div>

      <div className="reviews-grid" id="parent-stories">
        {reviews.map((review) => <ReviewCard key={review.number} review={review} />)}
      </div>
      <div className="reviews-footnote">
        <span>Stories from our school community</span>
        <span>01 <span className="footnote-rule" /> 03</span>
      </div>
    </section>
  );
}