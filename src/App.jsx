import { useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import SchoolHighlights from './components/SchoolHighlights.jsx';
import CampusSections from './components/CampusSections.jsx';
import LearningStory from './components/LearningStory.jsx';
import Reviews from './components/Reviews.jsx';
import StoryImage from './components/StoryImage.jsx';
import FAQ from './components/FAQ.jsx';
import Footer from './components/Footer.jsx';

gsap.registerPlugin(ScrollTrigger);

const socialLinks = [
  { label: 'Facebook', href: 'https://www.facebook.com/aurobanaindianschoolmadurai/', Icon: FaFacebookF },
  { label: 'Instagram', href: 'https://www.instagram.com/aurobana_indian_school/', Icon: FaInstagram },
  { label: 'YouTube', href: 'https://www.youtube.com/@aurobanaindianschool', Icon: FaYoutube },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/aurobana-indian-school', Icon: FaLinkedinIn },
];

export default function App() {
  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const desktopScroll = window.matchMedia('(min-width: 1025px)');
    let lenis = null;
    const updateScroll = (time) => lenis?.raf(time * 1000);
    const syncScrollTrigger = () => ScrollTrigger.update();

    const configureLenis = () => {
      lenis?.off('scroll', syncScrollTrigger);
      lenis?.destroy();
      lenis = new Lenis({
        duration: 1.05,
        smoothWheel: desktopScroll.matches,
        wheelMultiplier: 0.92,
        anchors: true,
      });
      lenis.on('scroll', syncScrollTrigger);
    };

    if (!prefersReducedMotion) {
      configureLenis();
      desktopScroll.addEventListener('change', configureLenis);
      gsap.ticker.add(updateScroll);
      gsap.ticker.lagSmoothing(0);
    }

    let motion;
    const context = gsap.context(() => {
      motion = gsap.matchMedia();
      motion.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('.site-header', {
          y: -14,
          opacity: 0,
          duration: 0.75,
          ease: 'power2.out',
        });
        gsap.from('.intro-kicker', {
          y: 12,
          opacity: 0,
          duration: 0.6,
          delay: 0.12,
          ease: 'power2.out',
        });
        gsap.from('.intro-title [data-line]', {
          yPercent: 75,
          opacity: 0,
          duration: 0.9,
          stagger: 0.13,
          delay: 0.16,
          ease: 'power3.out',
        });
        gsap.from('.intro-copy, .intro-aside .text-link', {
          y: 18,
          opacity: 0,
          duration: 0.7,
          stagger: 0.1,
          delay: 0.44,
          ease: 'power2.out',
        });

        gsap.from('.review-card', {
          scrollTrigger: { trigger: '.reviews-grid', start: 'top 78%' },
          y: 44,
          opacity: 0,
          duration: 0.8,
          stagger: 0.14,
          ease: 'power3.out',
        });
        gsap.from('.story-frame', {
          scrollTrigger: { trigger: '.story-frame', start: 'top 82%' },
          scale: 0.965,
          opacity: 0,
          duration: 1,
          ease: 'power2.out',
        });
        gsap.to('.story-photo', {
          yPercent: 5,
          ease: 'none',
          scrollTrigger: {
            trigger: '.story-frame',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.7,
          },
        });
        gsap.from('.faq-intro, .faq-item', {
          scrollTrigger: { trigger: '.faq-section', start: 'top 76%' },
          y: 26,
          opacity: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power2.out',
        });
        gsap.from('.site-footer .footer-top, .site-footer .footer-bottom', {
          scrollTrigger: { trigger: '.site-footer', start: 'top 86%' },
          y: 24,
          opacity: 0,
          duration: 0.75,
          stagger: 0.13,
          ease: 'power2.out',
        });
      });
    });

    return () => {
      motion?.revert();
      context.revert();
      desktopScroll.removeEventListener('change', configureLenis);
      if (lenis) {
        lenis.off('scroll', syncScrollTrigger);
        lenis.destroy();
        gsap.ticker.remove(updateScroll);
      }
    };
  }, []);

  return (
    <>
      <div id="top" className="site-shell">
        <Header />
        <main>
          <Hero />
          <SchoolHighlights />
          <CampusSections />
          <LearningStory />
          <Reviews />
          <StoryImage />
          <FAQ />
        </main>
        <Footer />
      </div>
      {createPortal(
        <div className="footer-social-bar" role="group" aria-label="Contact and social channel icons">
          {socialLinks.map(({ label, href, Icon }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
              <Icon aria-hidden="true" focusable="false" />
            </a>
          ))}
        </div>,
        document.body,
      )}
    </>
  );
}