import { ArrowUpRight } from 'lucide-react';
import { storyImage } from '../data/reviews.js';

export default function StoryImage() {
  return (
    <section className="story-section section-shell" aria-label="A place for every kind of learner">
      <figure className="story-frame">
        <div className="story-photo-wrap">
          <img
            className="story-photo"
            src={storyImage.src}
            alt={storyImage.alt}
            style={{ objectPosition: storyImage.position }}
            loading="lazy"
          />
        </div>
        <div className="story-shade" />
        <figcaption className="story-caption">
          <span className="story-eyebrow">ROOM TO WONDER</span>
          <p>Every voice<br /><em>belongs here.</em></p>
          <a href="#faq" aria-label="Read frequently asked questions">
            <ArrowUpRight size={19} strokeWidth={1.7} aria-hidden="true" />
          </a>
        </figcaption>
        <span className="story-index">AUROBANA · A PLACE TO BECOME</span>
      </figure>
    </section>
  );
}