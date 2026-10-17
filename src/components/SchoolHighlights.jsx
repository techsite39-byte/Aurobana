import { useLayoutEffect, useRef } from 'react';
import { ArrowUpRight, BookOpen, School, Trophy } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { schoolFeatures, schoolHighlights, schoolPhilosophy } from '../data/schoolHighlights.js';
import '../school-highlights.css';

gsap.registerPlugin(ScrollTrigger);

const highlightIcons = {
  'school-life': School,
  academics: BookOpen,
  sports: Trophy,
};

export default function SchoolHighlights() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const context = gsap.context(() => {
      gsap.fromTo('.school-highlight-card', {
        autoAlpha: 0,
        y: 32,
      }, {
        autoAlpha: 1,
        y: 0,
        duration: 0.72,
        stagger: 0.12,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.school-highlights__grid',
          start: 'top 82%',
          once: true,
        },
      });
    }, section);

    return () => context.revert();
  }, []);

  return (
    <section
      className="school-highlights"
      ref={sectionRef}
      aria-labelledby="school-highlights-title"
    >
    <div className="school-highlights__inner">
      <header className="school-highlights__heading">
        <h2 id="school-highlights-title">School <em>highlights.</em></h2>
      </header>

        <div className="school-highlights__grid">
          {schoolHighlights.map((highlight) => {
            const Icon = highlightIcons[highlight.id];
            return (
              <article className="school-highlight-card" key={highlight.id}>
                <header className="school-highlight-card__header">
                  <Icon size={28} strokeWidth={1.5} aria-hidden="true" />
                  <div>
                    <h3>{highlight.title}</h3>
                    <span className="school-highlight-card__more">
                      Learn More <ArrowUpRight size={14} strokeWidth={1.8} aria-hidden="true" />
                    </span>
                  </div>
                </header>
                <figure className="school-highlight-card__figure">
                  <img
                    src={highlight.image.src}
                    alt={highlight.image.alt}
                    style={{ objectPosition: highlight.image.position }}
                    loading="lazy"
                    decoding="async"
                  />
                </figure>
                <p className="school-highlight-card__description">{highlight.description}</p>
              </article>
            );
          })}
        </div>

        <div className="school-highlights__philosophy" id="school-philosophy">
          <figure className="school-highlights__quote">
            <span className="school-highlights__quote-mark" aria-hidden="true">&ldquo;</span>
            <blockquote>{schoolPhilosophy.quote}</blockquote>
            <figcaption>&mdash; {schoolPhilosophy.attribution}</figcaption>
          </figure>
          <div className="school-highlights__about">
            <p className="school-highlights__eyebrow">OUR PHILOSOPHY</p>
            {schoolPhilosophy.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>

        <div className="school-highlights__features" id="school-features">
          <div className="school-highlights__features-heading">
            <h2>School <em>features.</em></h2>
          </div>
          <ul>
            {schoolFeatures.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        </div>

        <div className="school-highlights__advantages">
          <h2>Advantages for Students &amp; Parents</h2>
        </div>
      </div>
    </section>
  );
}
