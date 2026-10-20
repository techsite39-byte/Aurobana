import { useLayoutEffect, useRef } from 'react';
import { ArrowUpRight, Mail, MapPin, Phone, Play, UsersRound } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BookStack, OpenBook, PaperAirplane, Pencil, SchoolStar } from './SchoolDecorations.jsx';

gsap.registerPlugin(ScrollTrigger);

const discoverLinks = [
  { label: 'About Us', href: '#school-philosophy' },
  { label: 'Academics', href: '#school-features' },
  { label: 'School Life', href: '#school-highlights-title' },
];

const exploreLinks = [
  { label: 'Admissions', href: '#admissions' },
  { label: 'Blog', href: '#stories' },
  { label: 'Learning Beyond One Campus', href: '#campus-sections-title' },
];

export default function Footer() {
  const footerRef = useRef(null);

  useLayoutEffect(() => {
    const footer = footerRef.current;
    if (!footer || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    let portraitFloat;
    const context = gsap.context(() => {
      gsap.fromTo('.footer-portrait', {
        autoAlpha: 0,
        y: 50,
        scale: 0.97,
      }, {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: footer,
          start: 'top 82%',
          once: true,
        },
        onComplete: () => {
          portraitFloat = gsap.to('.footer-portrait', {
            y: -8,
            duration: 6,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          });
        },
      });

      gsap.fromTo('.footer-social-bar', {
        autoAlpha: 0,
        y: 20,
        scale: 0.96,
      }, {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        delay: 0.12,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: footer,
          start: 'top 82%',
          once: true,
        },
      });
    }, footer);

    return () => {
      portraitFloat?.kill();
      context.revert();
    };
  }, []);

  return (
    <>
      <div className="footer-transition" aria-hidden="true">
        <span className="footer-transition__book"><BookStack /></span>
        <span className="footer-transition__pencil"><Pencil /></span>
        <span className="footer-transition__paper"><PaperAirplane /></span>
        <span className="footer-transition__star"><SchoolStar /></span>
      </div>
      <footer className="site-footer" id="admissions" ref={footerRef}>
        <div className="footer-background-decorations" aria-hidden="true">
          <span className="footer-background-decorations__book"><BookStack /></span>
          <span className="footer-background-decorations__open-book"><OpenBook /></span>
          <span className="footer-background-decorations__pencil"><Pencil /></span>
          <span className="footer-background-decorations__plane"><PaperAirplane /></span>
          <span className="footer-background-decorations__star"><SchoolStar /></span>
          <span className="footer-background-decorations__particle footer-background-decorations__particle--one" />
          <span className="footer-background-decorations__particle footer-background-decorations__particle--two" />
          <span className="footer-background-decorations__particle footer-background-decorations__particle--three" />
          <span className="footer-background-decorations__particle footer-background-decorations__particle--four" />
        </div>
        <div className="footer-inner">
          <div className="footer-main">
            <section className="footer-contact-card" aria-labelledby="footer-contact-title">
              <span className="footer-contact-card__tag" id="footer-contact-title">Reach Us</span>
              <a className="footer-contact-card__brand" href="#top">
                <img src="/images/aurobana-logo.png" alt="Aurobana Indian School" />
              </a>
              <div className="footer-contact-card__details">
                <p><Phone aria-hidden="true" /><span><strong>Phone</strong><a href="tel:+919943090991">99430 90991</a></span></p>
                <p><Mail aria-hidden="true" /><span><strong>Email</strong><a href="mailto:principal@aurobanaindian.org">principal@aurobanaindian.org</a></span></p>
                <p><MapPin aria-hidden="true" /><span><strong>Campus</strong>Campus @ Nehru Nagar,<br />By-pass Road,<br />Madurai - 625 010</span></p>
              </div>
            </section>

            <div className="footer-editorial">
              <p className="footer-kicker">Aurobana Indian School</p>
              <h2 className="footer-headline">Growing Minds.<br />Shaping Tomorrow.</h2>
              <nav className="footer-links" aria-label="Footer navigation">
                <div className="footer-column">
                  <h3>Discover</h3>
                  {discoverLinks.map((link) => <a key={link.href} href={link.href}>{link.label}</a>)}
                </div>
                <div className="footer-column">
                  <h3>Explore</h3>
                  {exploreLinks.map((link) => <a key={link.href} href={link.href}>{link.label}</a>)}
                </div>
              </nav>
            </div>

            <figure className="footer-portrait">
              <img
                src="/images/footer.png"
                alt="Aurobana students standing together in school uniform"
                loading="lazy"
                decoding="async"
              />
            </figure>
          </div>

          <div className="footer-bottom">
            <span>© 2026 Aurobana Indian School</span>
            <a href="#top" aria-label="Back to top">Back to top <ArrowUpRight size={13} aria-hidden="true" /></a>
          </div>
        </div>
        <div className="footer-social-bar" role="group" aria-label="Contact and social channel icons">
          <span aria-hidden="true"><Mail /></span>
          <span aria-hidden="true"><Play /></span>
          <span aria-hidden="true"><UsersRound /></span>
          <span aria-hidden="true"><Phone /></span>
        </div>
      </footer>
    </>
  );
}
