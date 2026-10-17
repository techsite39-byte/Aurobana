import { useLayoutEffect, useRef, useState } from 'react';
import { ArrowDown } from 'lucide-react';
import gsap from 'gsap';
import { faqs } from '../data/faqs.js';

function FAQItem({ item, index, isOpen, onToggle }) {
  const answerRef = useRef(null);

  useLayoutEffect(() => {
    const answer = answerRef.current;
    if (!answer) return undefined;
    const tween = gsap.to(answer, {
      height: isOpen ? 'auto' : 0,
      opacity: isOpen ? 1 : 0,
      duration: 0.42,
      ease: 'power2.inOut',
      overwrite: true,
    });
    return () => tween.kill();
  }, [isOpen]);

  return (
    <div className={`faq-item${isOpen ? ' is-open' : ''}`}>
      <button
        className="faq-trigger"
        type="button"
        id={`faq-question-${item.id}`}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${item.id}`}
        onClick={onToggle}
      >
        <span className="faq-number">0{index + 1}</span>
        <span className="faq-question">{item.question}</span>
        <span className="faq-icon"><ArrowDown size={19} strokeWidth={1.6} aria-hidden="true" /></span>
      </button>
      <div
        className="faq-answer-wrap"
        id={`faq-answer-${item.id}`}
        role="region"
        aria-labelledby={`faq-question-${item.id}`}
        aria-hidden={!isOpen}
        inert={!isOpen}
        ref={answerRef}
      >
        <p>{item.answer}</p>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [openId, setOpenId] = useState(null);

  return (
    <section className="faq-section section-shell" id="faq" aria-labelledby="faq-title">
      <div className="faq-intro">
        <p className="eyebrow"><span className="eyebrow-dot" /> A few helpful things</p>
        <h2 id="faq-title">Curious?<br /><em>Ask away.</em></h2>
        <p className="faq-support">A little more about finding your way to Aurobana.</p>
      </div>
      <div className="faq-list">
        {faqs.map((item, index) => (
          <FAQItem
            key={item.id}
            item={item}
            index={index}
            isOpen={openId === item.id}
            onToggle={() => setOpenId((current) => current === item.id ? null : item.id)}
          />
        ))}
      </div>
    </section>
  );
}