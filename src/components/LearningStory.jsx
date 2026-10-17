import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GraduationCap, OpenBook, Pencil } from './SchoolDecorations.jsx';
import '../learning-story.css';

gsap.registerPlugin(ScrollTrigger);

const slides = [
  {
    id: 'afs',
    label: 'AFS',
    heading: ['Learning With', 'Purpose'],
    copy: 'Curiosity grows through conversation, collaboration and a wider view of the world. Learners are encouraged to question, explore and apply what they learn.',
    image: '/images/s1.png',
    imageAlt: 'Student ready to learn with books and a school bag',
    decoration: OpenBook,
    tone: 'paper',
  },
  {
    id: 'cisce',
    label: 'CISCE',
    heading: ['Academic Excellence', 'With Character'],
    copy: 'As a premier ICSE institution, Aurobana builds strong foundations through curiosity, critical thinking and a love of learning.',
    image: '/images/s3.png',
    imageAlt: 'A group of students in school uniform',
    decoration: Pencil,
    tone: 'forest',
  },
  {
    id: 'ais',
    label: 'AIS',
    heading: ['Growing Into', 'Tomorrow'],
    copy: 'Holistic learning nurtures competence, courage, compassion and responsibility—helping every learner grow into the future.',
    image: '/images/s2.png',
    imageAlt: 'Student holding books, ready for the school day',
    decoration: GraduationCap,
    tone: 'sage',
  },
];

export default function LearningStory() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const media = gsap.matchMedia(section);
    const slidesInSection = gsap.utils.toArray('.learning-story__slide', section);
    const indicators = gsap.utils.toArray('.learning-story__progress-item', section);

    const setActiveIndicator = (index) => {
      indicators.forEach((indicator, indicatorIndex) => {
        indicator.classList.toggle('is-active', indicatorIndex === index);
        if (indicatorIndex === index) {
          indicator.setAttribute('aria-current', 'step');
        } else {
          indicator.removeAttribute('aria-current');
        }
      });
    };

    media.add('(min-width: 801px) and (prefers-reduced-motion: no-preference)', () => {
      const stage = section.querySelector('.learning-story__stage');
      const timeline = gsap.timeline({
        defaults: { ease: 'power1.inOut' },
        scrollTrigger: {
          trigger: stage,
          start: 'top top+=88',
          end: '+=220%',
          pin: stage,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const activeIndex = self.progress < 0.42 ? 0 : self.progress < 0.76 ? 1 : 2;
            setActiveIndicator(activeIndex);
          },
        },
      });

      slidesInSection.forEach((slide, index) => {
        const content = slide.querySelector('.learning-story__copy');
        const label = slide.querySelector('.learning-story__label');
        const headingLines = slide.querySelectorAll('[data-heading-line]');
        const supportingCopy = slide.querySelector('.learning-story__copy > p');
        const image = slide.querySelector('.learning-story__image');
        const visual = slide.querySelector('.learning-story__visual');

        gsap.set(slide, {
          autoAlpha: index === 0 ? 1 : 0,
          x: index === 1 ? 80 : index === 2 ? -80 : 0,
          scale: index === 0 ? 1 : 0.96,
        });
        gsap.set(label, { autoAlpha: 0 });
        gsap.set([content, visual], { y: 18 });
        gsap.set(headingLines, { yPercent: 45, autoAlpha: 0.35 });
        gsap.set(supportingCopy, { y: 14, autoAlpha: 0 });
        gsap.set(image, {
          clipPath: 'inset(0 0 0 100% round 22px)',
          scale: 1.08,
        });
      });

      timeline
        .to(slidesInSection[0].querySelector('.learning-story__copy'), {
          y: 0,
          duration: 0.25,
        }, 0)
        .to(slidesInSection[0].querySelector('.learning-story__label'), {
          autoAlpha: 1,
          duration: 0.2,
        }, 0)
        .to(slidesInSection[0].querySelectorAll('[data-heading-line]'), {
          yPercent: 0,
          autoAlpha: 1,
          duration: 0.25,
          stagger: 0.08,
        }, 0)
        .to(slidesInSection[0].querySelector('.learning-story__copy > p'), {
          y: 0,
          autoAlpha: 1,
          duration: 0.3,
        }, 0.2)
        .to(slidesInSection[0].querySelector('.learning-story__visual'), {
          y: 0,
          duration: 0.3,
        }, 0)
        .to(slidesInSection[0].querySelector('.learning-story__image'), {
          clipPath: 'inset(0 0 0 0 round 22px)',
          scale: 1,
          y: -7,
          duration: 0.5,
        }, 0)
        .to(slidesInSection[0], {
          autoAlpha: 0,
          scale: 0.97,
          duration: 0.65,
        }, 1.45)
        .to(slidesInSection[1], {
          autoAlpha: 1,
          x: 0,
          scale: 1,
          duration: 0.75,
        }, 1.55)
        .to(slidesInSection[1].querySelector('.learning-story__copy'), {
          y: 0,
          duration: 0.3,
        }, 1.7)
        .to(slidesInSection[1].querySelector('.learning-story__label'), {
          autoAlpha: 1,
          duration: 0.2,
        }, 1.65)
        .to(slidesInSection[1].querySelectorAll('[data-heading-line]'), {
          yPercent: 0,
          autoAlpha: 1,
          duration: 0.25,
          stagger: 0.08,
        }, 1.72)
        .to(slidesInSection[1].querySelector('.learning-story__copy > p'), {
          y: 0,
          autoAlpha: 1,
          duration: 0.3,
        }, 1.92)
        .to(slidesInSection[1].querySelector('.learning-story__visual'), {
          y: 0,
          duration: 0.3,
        }, 1.7)
        .to(slidesInSection[1].querySelector('.learning-story__image'), {
          clipPath: 'inset(0 0 0 0 round 22px)',
          scale: 1,
          y: -7,
          duration: 0.5,
        }, 1.65)
        .to(slidesInSection[1], {
          autoAlpha: 0,
          x: -60,
          scale: 0.97,
          duration: 0.65,
        }, 3.05)
        .to(slidesInSection[2], {
          autoAlpha: 1,
          x: 0,
          scale: 1,
          duration: 0.75,
        }, 3.15)
        .to(slidesInSection[2].querySelector('.learning-story__copy'), {
          y: 0,
          duration: 0.3,
        }, 3.3)
        .to(slidesInSection[2].querySelector('.learning-story__label'), {
          autoAlpha: 1,
          duration: 0.2,
        }, 3.25)
        .to(slidesInSection[2].querySelectorAll('[data-heading-line]'), {
          yPercent: 0,
          autoAlpha: 1,
          duration: 0.25,
          stagger: 0.08,
        }, 3.32)
        .to(slidesInSection[2].querySelector('.learning-story__copy > p'), {
          y: 0,
          autoAlpha: 1,
          duration: 0.3,
        }, 3.52)
        .to(slidesInSection[2].querySelector('.learning-story__visual'), {
          y: 0,
          duration: 0.3,
        }, 3.3)
        .to(slidesInSection[2].querySelector('.learning-story__image'), {
          clipPath: 'inset(0 0 0 0 round 22px)',
          scale: 1,
          y: -7,
          duration: 0.5,
        }, 3.25)
        .to({}, { duration: 0.8 });

      return () => setActiveIndicator(0);
    });

    media.add('(max-width: 800px) and (prefers-reduced-motion: no-preference)', () => {
      slidesInSection.forEach((slide, index) => {
        const content = slide.querySelector('.learning-story__copy');
        const headingLines = slide.querySelectorAll('[data-heading-line]');
        const image = slide.querySelector('.learning-story__image');

        gsap.fromTo([slide.querySelector('.learning-story__label'), content], {
          autoAlpha: 0,
          y: 20,
        }, {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: slide,
            start: 'top 78%',
            once: true,
          },
        });
        gsap.fromTo(headingLines, {
          autoAlpha: 0,
          y: 24,
        }, {
          autoAlpha: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: slide,
            start: 'top 78%',
            once: true,
          },
        });
        gsap.fromTo(image, {
          autoAlpha: 0,
          scale: 0.96,
        }, {
          autoAlpha: 1,
          scale: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: slide,
            start: 'top 72%',
            once: true,
          },
        });
        gsap.fromTo(slide.querySelector('.learning-story__decoration'), {
          y: 8,
          rotation: index % 2 ? -4 : 4,
        }, {
          y: 0,
          rotation: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: slide,
            start: 'top 78%',
            once: true,
          },
        });

        ScrollTrigger.create({
          trigger: slide,
          start: 'top center',
          end: 'bottom center',
          onToggle: ({ isActive }) => {
            if (isActive) setActiveIndicator(index);
          },
        });
      });
    });

    return () => media.revert();
  }, []);

  return (
    <section className="learning-story" ref={sectionRef} aria-labelledby="learning-story-title">
      <header className="learning-story__intro section-shell">
        <p className="learning-story__eyebrow">Aurobana, beyond the classroom</p>
        <h2 id="learning-story-title">Beyond Classrooms. <em>Beyond Boundaries.</em></h2>
        <p>Learning that prepares every learner for the world ahead.</p>
      </header>

      <div className="learning-story__stage">
        {slides.map(({ id, label, heading, copy, image, imageAlt, decoration: Decoration, tone }) => (
          <article className={`learning-story__slide learning-story__slide--${tone}`} key={id}>
            <div className="learning-story__slide-inner">
              <div className="learning-story__copy">
                <span className="learning-story__label">{label}</span>
                <h3>
                  {heading.map((line) => (
                    <span data-heading-line key={line}>{line}</span>
                  ))}
                </h3>
                <p>{copy}</p>
              </div>
              <figure className="learning-story__visual">
                <span className="learning-story__visual-index" aria-hidden="true">{label}</span>
                <img
                  className="learning-story__image"
                  src={image}
                  alt={imageAlt}
                  loading="lazy"
                  decoding="async"
                />
                <span className="learning-story__decoration" aria-hidden="true">
                  <Decoration />
                </span>
              </figure>
            </div>
          </article>
        ))}

        <div className="learning-story__progress" role="group" aria-label="Story progress">
          {slides.map(({ id, label }, index) => (
            <span
              className={`learning-story__progress-item${index === 0 ? ' is-active' : ''}`}
              key={id}
              aria-label={`${index + 1}: ${label}`}
              aria-current={index === 0 ? 'step' : undefined}
            >
              0{index + 1}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
