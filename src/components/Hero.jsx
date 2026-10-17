import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { heroImages } from '../data/heroImages.js';
import '../hero.css';

gsap.registerPlugin(ScrollTrigger);

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
    const updateActiveStage = (index) => {
      panels.forEach((panel, panelIndex) => {
        panel.setAttribute('aria-hidden', String(panelIndex !== index));
      });
      progressItems.forEach((item, itemIndex) => {
        if (itemIndex === index) item.setAttribute('aria-current', 'step');
        else item.removeAttribute('aria-current');
      });
      root.dataset.activeStage = String(index + 1);
    };
    const resetAccessibleStages = () => {
      panels.forEach((panel) => panel.setAttribute('aria-hidden', 'false'));
      progressItems.forEach((item) => item.removeAttribute('aria-current'));
      delete root.dataset.activeStage;
    };
    const updateProgress = (index) => {
      progressItems.forEach((item, itemIndex) => {
        if (itemIndex === index) item.setAttribute('aria-current', 'step');
        else item.removeAttribute('aria-current');
      });
      root.dataset.activeStage = String(index + 1);
    };

    const context = gsap.context(() => {
      const media = gsap.matchMedia();

      media.add('(min-width: 1025px) and (prefers-reduced-motion: no-preference)', () => {
        const frame = root.querySelector('.hero-stage');
        const photos = panels.map((panel) => panel.querySelector('.hero-photo img'));
        const copies = panels.map((panel) => panel.querySelector('.hero-copy'));
        const staggerGroups = panels.map((panel) => (
          panel.querySelectorAll('.hero-stagger > span, .hero-keywords > span')
        ));
        const transitionStarts = stages.map((_, index) => (
          index === 0 ? 0 : (index * 5 / 6) - 0.15
        ));

        root.classList.add('is-enhanced');
        updateActiveStage(0);
        gsap.set(panels, { autoAlpha: 0 });
        gsap.set(panels[0], { autoAlpha: 1 });
        gsap.set(photos, { scale: 1.08, clipPath: 'inset(0 100% 0 0)', xPercent: 0 });
        gsap.set(photos[0], { scale: 1.08, clipPath: 'inset(0)' });
        gsap.set(copies, { autoAlpha: 0, y: 40 });
        gsap.set(copies[0], { autoAlpha: 1, y: 0 });
        staggerGroups.forEach((group) => {
          if (group.length) gsap.set(group, { autoAlpha: 0, yPercent: 18 });
        });

        const timeline = gsap.timeline({
          onUpdate: () => {
            const elapsed = timeline.progress() * timeline.duration();
            let activeIndex = 0;
            transitionStarts.forEach((start, index) => {
              if (elapsed >= start) activeIndex = index;
            });
            if (root.dataset.activeStage !== String(activeIndex + 1)) {
              updateActiveStage(activeIndex);
            }
          },
          scrollTrigger: {
            trigger: root,
            pin: frame,
            pinSpacing: false,
            start: 'top top+=88',
            end: () => `+=${Math.round(window.innerHeight * 5)}`,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        timeline.to(photos[0], {
          scale: 1,
          yPercent: -2,
          clipPath: 'inset(0)',
          duration: 0.6,
          ease: 'none',
        }, 0);
        timeline.to(copies[0], {
          autoAlpha: 1,
          y: 0,
          duration: 0.55,
          ease: 'none',
        }, 0.08);

        for (let index = 1; index < panels.length; index += 1) {
          const position = transitionStarts[index];
          const revealFrom = index === 3 ? 'inset(100% 0 0 0)' : 'inset(0 100% 0 0)';

          gsap.set(photos[index], { clipPath: revealFrom });
          if (index === 2) gsap.set(photos[index], { xPercent: 2 });
          timeline.set(panels[index], { autoAlpha: 1 }, position);
          timeline.to(photos[index], {
            scale: 1,
            clipPath: 'inset(0)',
            xPercent: 0,
            duration: 0.52,
            ease: 'none',
          }, position);
          timeline.to(copies[index], {
            autoAlpha: 1,
            y: 0,
            duration: 0.32,
            ease: 'none',
          }, position + 0.1);
          timeline.to(panels[index - 1], {
            autoAlpha: 0,
            duration: 0.25,
            ease: 'none',
          }, position + 0.27);

          if (staggerGroups[index].length) {
            timeline.to(staggerGroups[index], {
              autoAlpha: 1,
              yPercent: 0,
              duration: 0.28,
              stagger: 0.08,
              ease: 'none',
            }, position + 0.12);
          }
        }

        return () => {
          root.classList.remove('is-enhanced');
          resetAccessibleStages();
        };
      });

      media.add('(max-width: 767px) and (prefers-reduced-motion: no-preference)', () => {
        updateProgress(0);
        panels.forEach((panel, index) => {
          const photo = panel.querySelector('.hero-photo img');
          const copy = panel.querySelector('.hero-copy');
          const label = copy.querySelector('.hero-label');
          const title = copy.querySelector('.hero-title');
          const support = copy.querySelector('.hero-support');
          const keywords = copy.querySelectorAll('.hero-keywords > span');

          gsap.fromTo(photo, { autoAlpha: 0, scale: 1.04 }, {
            autoAlpha: 1,
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: photo,
              start: 'top 92%',
              end: 'top 55%',
              scrub: 0.8,
              invalidateOnRefresh: true,
            },
          });

          const copyTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: copy,
              start: 'top 92%',
              end: 'top 58%',
              scrub: 0.8,
              invalidateOnRefresh: true,
            },
          });
          copyTimeline.fromTo(label, { autoAlpha: 0, y: 20 }, {
            autoAlpha: 1,
            y: 0,
            duration: 0.34,
            ease: 'none',
          }, 0);
          copyTimeline.fromTo(title, { autoAlpha: 0, y: 25 }, {
            autoAlpha: 1,
            y: 0,
            duration: 0.38,
            ease: 'none',
          }, 0.12);
          if (support) {
            copyTimeline.fromTo(support, { autoAlpha: 0, y: 20 }, {
              autoAlpha: 1,
              y: 0,
              duration: 0.34,
              ease: 'none',
            }, 0.24);
          }
          if (keywords.length) {
            copyTimeline.fromTo(keywords, { autoAlpha: 0, y: 14 }, {
              autoAlpha: 1,
              y: 0,
              duration: 0.28,
              stagger: 0.06,
              ease: 'none',
            }, 0.34);
          }

          ScrollTrigger.create({
            trigger: panel,
            start: 'top 68%',
            onEnter: () => updateProgress(index),
            onEnterBack: () => updateProgress(index),
          });
        });
        return resetAccessibleStages;
      });

      media.add('(min-width: 768px) and (max-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
        updateProgress(0);
        panels.forEach((panel, index) => {
          const photo = panel.querySelector('.hero-photo img');
          const copy = panel.querySelector('.hero-copy');

          gsap.fromTo(photo, { scale: 1.025 }, {
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: panel,
              start: 'top 88%',
              end: 'top 50%',
              scrub: true,
            },
          });
          gsap.fromTo(copy, { autoAlpha: 0.72, y: 16 }, {
            autoAlpha: 1,
            y: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: panel,
              start: 'top 88%',
              end: 'top 56%',
              scrub: true,
            },
          });
          ScrollTrigger.create({
            trigger: panel,
            start: 'top 68%',
            onEnter: () => updateProgress(index),
            onEnterBack: () => updateProgress(index),
          });
        });
        return resetAccessibleStages;
      });

      return () => media.revert();
    }, root);

    let alive = true;
    let refreshFrame;
    const refreshAfterAssets = () => {
      if (!alive) return;
      cancelAnimationFrame(refreshFrame);
      refreshFrame = requestAnimationFrame(() => {
        if (alive) ScrollTrigger.refresh();
      });
    };
    const images = Array.from(root.querySelectorAll('img'));
    const onImageLoad = () => refreshAfterAssets();
    const onImageError = (event) => {
      console.error('Unable to load Aurobana hero image:', event.currentTarget.src);
      refreshAfterAssets();
    };

    images.forEach((image) => {
      image.addEventListener('load', onImageLoad);
      image.addEventListener('error', onImageError);
      if (image.complete) {
        if (image.naturalWidth === 0) onImageError({ currentTarget: image });
        else refreshAfterAssets();
      }
    });
    document.fonts?.ready.then(refreshAfterAssets);

    return () => {
      alive = false;
      cancelAnimationFrame(refreshFrame);
      images.forEach((image) => {
        image.removeEventListener('load', onImageLoad);
        image.removeEventListener('error', onImageError);
      });
      context.revert();
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
          const image = heroImages[stage.image];
          return (
            <article
              className={`hero-panel hero-panel--${stage.image}${index === 5 ? ' hero-panel--mission' : ''}`}
              key={`${stage.image}-${index}`}
              aria-hidden="false"
            >
              <figure className="hero-photo">
                <img
                  src={image.src}
                  alt={image.alt}
                  style={{ objectPosition: image.position }}
                  loading={index === 0 ? 'eager' : 'lazy'}
                  fetchPriority={index === 0 ? 'high' : 'auto'}
                  decoding="async"
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
