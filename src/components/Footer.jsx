import { ArrowUpRight, Camera, Play, Users } from 'lucide-react';

const exploreLinks = [
  { label: 'Parent stories', href: '#stories' },
  { label: 'Frequently asked questions', href: '#faq' },
];

const socialLinks = [
  { label: 'Instagram', href: 'https://www.instagram.com/', Icon: Camera },
  { label: 'Facebook', href: 'https://www.facebook.com/', Icon: Users },
  { label: 'YouTube', href: 'https://www.youtube.com/', Icon: Play },
];

export default function Footer() {
  return (
    <footer className="site-footer" id="admissions">
      <div className="footer-inner section-shell">
        <div className="footer-top">
          <div className="footer-brand-block">
            <a className="footer-wordmark" href="#top">AUROBANA<span>.</span></a>
            <p>A place to learn, wonder,<br />create and become.</p>
          </div>
          <div className="footer-column">
            <h2>Explore</h2>
            {exploreLinks.map((link) => <a key={link.href} href={link.href}>{link.label}</a>)}
          </div>
          <div className="footer-column footer-admissions">
            <h2>Admissions</h2>
            <a href="mailto:admissions@aurobana.school">Enquire <ArrowUpRight size={14} aria-hidden="true" /></a>
            <a href="mailto:admissions@aurobana.school?subject=Campus%20visit">Visit campus <ArrowUpRight size={14} aria-hidden="true" /></a>
          </div>
          <div className="footer-column footer-social">
            <h2>Find us</h2>
            {socialLinks.map(({ label, href, Icon }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer">
                <Icon size={15} strokeWidth={1.7} aria-hidden="true" />{label}
              </a>
            ))}
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Aurobana School</span>
          <span>Made for all the ways a child can grow.</span>
          <a href="#top" aria-label="Back to top">BACK TO TOP <ArrowUpRight size={13} aria-hidden="true" /></a>
        </div>
      </div>
    </footer>
  );
}