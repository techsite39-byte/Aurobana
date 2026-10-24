import { useLayoutEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { campusCards, campusStatistics } from '../data/campusSections.js';
import {
  BookStack,
  GraduationCap,
  OpenBook,
  PaperAirplane,
  Pencil,
  Ruler,
  SchoolStar,
} from './SchoolDecorations.jsx';
import '../campus-sections.css';

gsap.registerPlugin(ScrollTrigger);

export default function CampusSections() {
  const sectionsRef = useRef(null);

  useLayoutEffect(() => {
    const sections = sectionsRef.current;
    if (!sections) return undefined;

    const media = gsap.matchMedia(sections);
    media.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo('.campus-sections__campus-heading', {
        autoAlpha: 0,
        y: 30,
      }, {
        autoAlpha: 1,
        y: 0,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.campus-sections__campuses',
          start: 'top 82%',
          once: true,
        },
      });

      gsap.fromTo('.campus-sections__campus-card', {
        autoAlpha: 0,
        y: 40,
      }, {
        autoAlpha: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.campus-sections__campus-grid',
          start: 'top 84%',
          once: true,
        },
      });

      gsap.fromTo('.campus-sections__stats-heading', {
        autoAlpha: 0,
        y: 28,
      }, {
        autoAlpha: 1,
        y: 0,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.campus-sections__stats-heading',
          start: 'top 84%',
          once: true,
        },
      });

      gsap.fromTo('.campus-sections__stat-card', {
        autoAlpha: 0,
        y: 32,
      }, {
        autoAlpha: 1,
        y: 0,
        duration: 0.65,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.campus-sections__stat-grid',
          start: 'top 86%',
          once: true,
        },
      });

      const achieversTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: '.campus-sections__achievers',
          start: 'top 82%',
          once: true,
        },
      });

      achieversTimeline
        .fromTo('.campus-sections__achievers-eyebrow', {
          autoAlpha: 0,
          y: 18,
        }, {
          autoAlpha: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
        })
        .fromTo('.campus-sections__achievers-title', {
          autoAlpha: 0,
          y: 24,
        }, {
          autoAlpha: 1,
          y: 0,
          duration: 0.65,
          ease: 'power2.out',
        }, '-=0.28')
        .fromTo('.campus-sections__achievers-copy', {
          autoAlpha: 0,
          y: 18,
        }, {
          autoAlpha: 1,
          y: 0,
          duration: 0.55,
          ease: 'power2.out',
        }, '-=0.3')
        .fromTo('.campus-sections__achievement-placeholder', {
          autoAlpha: 0,
          y: 30,
          scale: 0.97,
        }, {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          ease: 'power2.out',
        }, '-=0.2');
    });

    return () => media.revert();
  }, []);

  return (
    <div className="campus-sections" ref={sectionsRef}>
      <section
        className="campus-sections__campuses"
        aria-labelledby="campus-sections-title"
      >
        <div className="campus-decoration-layer" aria-hidden="true">
          <span className="campus-decoration campus-decoration--open-book">
            <OpenBook />
          </span>
          <span className="campus-decoration campus-decoration--paper-airplane">
            <PaperAirplane />
          </span>
        </div>
        <div className="campus-sections__inner section-shell">
          <header className="campus-sections__campus-heading">
            <h2 id="campus-sections-title">
              Learning Beyond
              <br />
              One Campus
            </h2>
          </header>

          <div className="campus-sections__campus-grid">
            {campusCards.map((campus) => (
              <article className="campus-sections__campus-card" key={campus.id}>
                <figure
                  className={`campus-sections__campus-image${campus.id === 'boarding-beyond' ? ' campus-sections__campus-image--contain' : ''}`}
                >
                  <img
                    src={campus.image.src}
                    alt={campus.image.alt}
                    style={{ '--campus-image-position': campus.image.position }}
                    loading="lazy"
                    decoding="async"
                  />
                </figure>
                <div className="campus-sections__campus-body">
                  <h3>{campus.title}</h3>
                  <p className="campus-sections__campus-subtitle">{campus.subtitle}</p>
                  <p className="campus-sections__campus-details">{campus.details}</p>
                  <a
                    className="campus-sections__know-more"
                    href="#admissions"
                    aria-label={`Know more about ${campus.subtitle}`}
                  >
                    Know More <ArrowUpRight size={15} strokeWidth={1.8} aria-hidden="true" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        className="campus-sections__statistics"
        aria-labelledby="campus-sections-statistics-title"
      >
        <div className="campus-decoration-layer" aria-hidden="true">
          <span className="campus-decoration campus-decoration--stats-pencil">
            <Pencil />
          </span>
          <span className="campus-decoration campus-decoration--stats-ruler">
            <Ruler />
          </span>
          <span className="campus-decoration campus-decoration--stats-star">
            <SchoolStar />
          </span>
        </div>
        <div className="campus-sections__inner section-shell">
          <header className="campus-sections__stats-heading">
            <p className="campus-sections__eyebrow">
              Premier ICSE institution located in the heart of the city
            </p>
            <h2 id="campus-sections-statistics-title" aria-label="Where Excellence Meets Belonging">
              <span aria-hidden="true">Where</span>
              <span aria-hidden="true">Excellence Meets</span>
              <span aria-hidden="true">Belonging</span>
            </h2>
          </header>

          <div className="campus-sections__stat-grid">
            {campusStatistics.map((statistic, index) => (
              <article className="campus-sections__stat-card" key={statistic.id}>
                <span className="campus-sections__stat-mark" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div>
                  <p className="campus-sections__stat-value">{statistic.value}</p>
                  <h3>{statistic.label}</h3>
                  <p className="campus-sections__stat-description">{statistic.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        className="campus-sections__achievers"
        aria-labelledby="campus-sections-achievers-title"
      >
        <div className="campus-decoration-layer" aria-hidden="true">
          <span className="campus-decoration campus-decoration--graduation-cap">
            <GraduationCap />
          </span>
          <span className="campus-decoration campus-decoration--book-stack">
            <BookStack />
          </span>
          <span className="campus-decoration campus-decoration--achievement-star achievement-star--one">
            <SchoolStar />
          </span>
          <span className="campus-decoration campus-decoration--achievement-star achievement-star--two">
            <SchoolStar />
          </span>
        </div>
        <div className="campus-sections__inner section-shell">
          <div className="campus-sections__achievers-panel">
            <div className="campus-sections__achievers-content">
              <p className="campus-sections__achievers-eyebrow">National Achievers</p>
              <h2
                className="campus-sections__achievers-title"
                id="campus-sections-achievers-title"
                aria-label="Honouring the Achievers of Aurobana"
              >
                <span aria-hidden="true">Honouring the</span>
                <span aria-hidden="true">Achievers of Aurobana</span>
              </h2>
              <p className="campus-sections__achievers-copy">
                Inspiring journeys of dedication,
                <br />
                discipline, and distinction.
              </p>
            </div>

            <figure
              className="campus-sections__achievement-placeholder"
            >
              <img
                src="/new/AIS-%20Photos/photo_2_2026-03-06_11-48-02.jpg"
                alt="Aurobana student achievement imagery"
                loading="lazy"
                decoding="async"
              />
            </figure>
          </div>
        </div>
      </section>
    </div>
  );
}
