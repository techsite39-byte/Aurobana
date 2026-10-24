import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { heroImages } from '../data/heroImages.js';
import { heroStudents } from '../data/heroStudents.js';
import '../hero.css';

const stages = [
  {
    image: 'intro',
    label: 'AUROBANA',
    title: 'A legacy of excellence. A future of promise.',
    copy: 'Growing capable, courageous and compassionate minds.',
  },
  {
    image: 'school',
    label: 'OUR SCHOOL',
    title: 'Where excellence meets character.',
    copy: 'Education that connects knowledge, integrity and possibility.',
  },
  {
    image: 'community',
    label: 'OUR COMMUNITY',
    title: 'SCHOOL. HOME. COMMUNITY.',
    copy: 'Together, we create the foundation for every child to soar.',
    words: ['SCHOOL.', 'HOME.', 'COMMUNITY.'],
  },
  {
    image: 'motto',
    label: 'OUR MOTTO',
    title: 'The School Beyond Expectations',
    copy: 'Going beyond conventional education \u2014 exceeding standards, nurturing potential, and inspiring every learner to achieve more.',
  },
  {
    image: 'vision',
    label: 'OUR VISION',
    title: 'Competent. Courageous. Compassionate.',
    copy: 'Empowering learners with intellect, moral grounding and social responsibility.',
    words: ['Competent.', 'Courageous.', 'Compassionate.'],
  },
  {
    image: 'vision',
    label: 'OUR MISSION',
    title: 'Learning with purpose.',
    copy: '',
    words: ['EXCELLENCE', 'EMPATHY', 'RESPONSIBILITY'],
  },
];

function StageTitle({ stage, index }) {
  const Heading = index === 0 ? 'h1' : 'h2';
  const isWordStage = stage.words && index !== 5;
  const titleClass = index === 2 || index === 4 ? 'hero-title hero-stagger' : 'hero-title';

  return (
    <Heading className={titleClass}>
      {index === 0
        ? <>
          <span className="hero-intro-line">A legacy of excellence.</span>
          <span className="hero-intro-line">A future of promise.</span>
        </>
        : isWordStage
        ? stage.words.map((word) => <span className="hero-word" key={word}>{word}</span>)
        : index === 3
          ? <span className="hero-motto">&ldquo;{stage.title}&rdquo;</span>
          : stage.title}
    </Heading>
  );
}

export default function Hero() {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const panels = Array.from(root.querySelectorAll('.hero-panel'));
    const progressItems = Array.from(root.querySelectorAll('.hero-progress li'));
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    root.classList.add('is-enhanced', 'is-mobile-enhanced');
    const updateActiveStage = (index) => {
      panels.forEach((panel, panelIndex) => {
        panel.setAttribute('aria-hidden', String(panelIndex !== index));
        panel.classList.toggle('is-active', panelIndex === index);
      });
      progressItems.forEach((item, itemIndex) => {
        if (itemIndex === index) item.setAttribute('aria-current', 'step');
        else item.removeAttribute('aria-current');
      });
      root.dataset.activeStage = String(index + 1);
    };

    const context = gsap.context(() => {
      updateActiveStage(0);

      const photos = panels.map((panel) => panel.querySelector('.hero-photo img:not(.hero-student)'));
      const students = panels.map((panel) => panel.querySelector('.hero-student'));
      const copies = panels.map((panel) => panel.querySelector('.hero-copy'));

      gsap.set(panels, { autoAlpha: 0, zIndex: 0 });
      gsap.set(photos, { autoAlpha: 0, scale: 1, xPercent: 0 });
      gsap.set(students, { autoAlpha: 0, scale: 0.98, x: 0, y: 12 });
      gsap.set(copies, { autoAlpha: 0, y: 22 });
      gsap.set(panels[0], { autoAlpha: 1, zIndex: 2 });
      gsap.set(photos[0], { autoAlpha: 1, scale: 1 });
      gsap.set(students[0], { autoAlpha: 1, scale: 1, x: 0, y: 0 });
      gsap.set(copies[0], { autoAlpha: 1, y: 0 });

      if (reducedMotion) {
        gsap.set(photos[0], { autoAlpha: 1, scale: 1 });
        return;
      }

      const slideDuration = 3;
      const transitionDuration = 0.95;
      const transitionStart = slideDuration - transitionDuration;
      const timeline = gsap.timeline({ repeat: -1 });

      for (let index = 0; index < panels.length; index += 1) {
        const nextIndex = (index + 1) % panels.length;
        const sectionStart = index * slideDuration;
        const transitionAt = sectionStart + transitionStart;
        const direction = index % 2 === 0 ? 1 : -1;

        timeline.to(photos[index], {
          scale: 1,
          duration: transitionStart,
          ease: 'sine.inOut',
        }, sectionStart);

        timeline.to(students[index], {
          y: -5,
          duration: transitionStart,
          ease: 'sine.inOut',
        }, sectionStart);

        timeline
          .set(panels[nextIndex], { autoAlpha: 1, zIndex: 3 }, transitionAt)
          .set(photos[nextIndex], {
            autoAlpha: 0,
            scale: 1,
            xPercent: direction * 1.2,
          }, transitionAt)
          .set(students[nextIndex], {
            autoAlpha: 0,
            scale: 0.98,
            x: direction * 20,
            y: 12,
          }, transitionAt)
          .set(copies[nextIndex], { autoAlpha: 0, y: 22 }, transitionAt)
          .call(() => updateActiveStage(nextIndex), [], transitionAt);

        timeline.to(photos[index], {
          autoAlpha: 0,
          scale: 1,
          duration: transitionDuration,
          ease: 'power2.inOut',
        }, transitionAt);
        timeline.to(students[index], {
          autoAlpha: 0,
          scale: 0.98,
          x: -direction * 12,
          duration: transitionDuration,
          ease: 'power2.inOut',
        }, transitionAt);
        timeline.to(copies[index], {
          autoAlpha: 0,
          y: -16,
          duration: transitionDuration * 0.8,
          ease: 'power2.inOut',
        }, transitionAt);
        timeline.to(photos[nextIndex], {
          autoAlpha: 1,
          scale: 1,
          xPercent: 0,
          duration: transitionDuration,
          ease: 'power2.out',
        }, transitionAt);
        timeline.to(students[nextIndex], {
          autoAlpha: 1,
          scale: 1,
          x: 0,
          y: 0,
          duration: transitionDuration,
          ease: 'power2.out',
        }, transitionAt);
        timeline.to(copies[nextIndex], {
          autoAlpha: 1,
          y: 0,
          duration: transitionDuration - 0.08,
          ease: 'power2.out',
        }, transitionAt + 0.08);
        timeline.set(panels[index], { autoAlpha: 0, zIndex: 0 }, sectionStart + slideDuration);
      }
    }, root);

    return () => {
      context.revert();
      root.classList.remove('is-enhanced', 'is-mobile-enhanced');
      delete root.dataset.activeStage;
    };
  }, []);

  return (
    <section className="hero-story" id="hero" ref={rootRef} aria-label="Aurobana school story">
      <div className="hero-stage">
        <ol className="hero-progress" aria-label="Hero story progress">
          {stages.map((stage, index) => (
            <li key={`${stage.label}-${index}`} aria-current={index === 0 ? 'step' : undefined}>
              {String(index + 1).padStart(2, '0')}
            </li>
          ))}
        </ol>
        {stages.map((stage, index) => {
          const image = heroImages[index === 5 ? 'mission' : stage.image];
          const student = heroStudents[index];
          return (
            <article
              className={`hero-panel hero-panel--${stage.image}${index === 5 ? ' hero-panel--mission' : ''}`}
              key={`${stage.image}-${index}`}
              aria-hidden={index !== 0}
            >
              <figure className="hero-photo">
                <img
                  src={image.src}
                  alt={image.alt}
                  style={{ objectPosition: image.position }}
                  loading="eager"
                  fetchPriority={index === 0 ? 'high' : 'auto'}
                  decoding="async"
                  onError={(event) => console.error('Unable to load Aurobana hero image:', event.currentTarget.src)}
                />
                <img
                  className="hero-student"
                  src={student}
                  alt=""
                  aria-hidden="true"
                  loading="eager"
                  fetchPriority={index === 0 ? 'high' : 'auto'}
                  decoding="async"
                  onError={(event) => console.error('Unable to load Aurobana hero student image:', event.currentTarget.src)}
                />
              </figure>
              <div className="hero-copy">
                <p className="hero-label">{stage.label}</p>
                <StageTitle stage={stage} index={index} />
                {stage.copy && <p className="hero-support">{stage.copy}</p>}
                {index === 5 && (
                  <div className="hero-keywords hero-stagger" aria-label="Excellence, empathy, responsibility">
                    {stage.words.map((word) => <span key={word}>{word}</span>)}
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
