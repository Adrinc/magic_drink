import React, { useEffect, useRef } from 'react';
import { useStore } from '@nanostores/react';
import { isEnglish } from '../../../data/variables';
import styles from '../css/nosotrosSeccion1.module.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const content = {
  es: {
    eyebrow: 'Presentación Oficial',
    title: 'Nosotros no describimos una bebida.',
    titleAccent: 'Describimos una presencia.',
    subtitle:
      'Magic Drink nació para verse luminosa, sonar familiar y sentirse natural en los días de millones de personas. Lo sorprendente es lo fácil que lo logra.',
  },
  en: {
    eyebrow: 'Official Presentation',
    title: 'We don\'t describe a drink.',
    titleAccent: 'We describe a presence.',
    subtitle:
      'Magic Drink was built to look luminous, sound familiar, and feel natural inside the lives of millions. The surprising part is how easily it does all three.',
  },
};

export default function NosotrosSeccion1() {
  const ingles = useStore(isEnglish);
  const sectionRef = useRef(null);
  const t = ingles ? content.en : content.es;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const isMobile = window.innerWidth <= 900;
    if (isMobile) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        section.querySelectorAll('[data-reveal]'),
        { opacity: 0, y: 60, filter: 'blur(12px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 80%' },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.hero}>
      <div className={styles.bgLayer} aria-hidden="true">
        <img
          src="/image/backgrounds/team1.webp"
          alt=""
          className={styles.bgImage}
          loading="eager"
        />
        <div className={styles.bgOverlay} />
      </div>

      <div className={styles.content}>
        <span className={styles.eyebrow} data-reveal>{t.eyebrow}</span>
        <h1 className={styles.title} data-reveal>
          {t.title}
          <br />
          <span className={styles.titleAccent}>{t.titleAccent}</span>
        </h1>
        <p className={styles.subtitle} data-reveal>{t.subtitle}</p>

        <div className={styles.scrollHint} data-reveal aria-hidden="true">
          <div className={styles.scrollLine} />
        </div>
      </div>
    </section>
  );
}
