import React, { useEffect, useRef, useState } from 'react';
import { useStore } from '@nanostores/react';
import { isEnglish } from '../../../data/variables';
import styles from '../css/nosotrosSeccion3.module.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const content = {
  es: {
    eyebrow: 'Mensaje Institucional',
    title: 'Hexy tiene algo que decirte.',
    subtitle: 'Un mensaje especial de nuestra embajadora oficial para todos los que forman parte de la familia Magic Drink.',
    disclaimer: 'Este contenido es material oficial de Magic Drink Corp. Cualquier interpretación fuera del contexto corporativo es responsabilidad del espectador.',
  },
  en: {
    eyebrow: 'Institutional Message',
    title: 'Hexy has something to tell you.',
    subtitle: 'A special message from our official ambassador to everyone who is part of the Magic Drink family.',
    disclaimer: 'This content is official Magic Drink Corp material. Any interpretation outside the corporate context is the viewer\'s responsibility.',
  },
};

export default function NosotrosSeccion3() {
  const ingles = useStore(isEnglish);
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const t = ingles ? content.en : content.es;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.innerWidth <= 900) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        section.querySelectorAll('[data-reveal]'),
        { opacity: 0, y: 40, filter: 'blur(8px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.9,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 72%' },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handlePlayToggle = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const handleVideoEnd = () => setIsPlaying(false);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header} data-reveal>
          <span className={styles.eyebrow}>{t.eyebrow}</span>
          <h2 className={styles.title}>{t.title}</h2>
          <p className={styles.subtitle}>{t.subtitle}</p>
        </div>

        <div className={styles.videoContainer} data-reveal>
          <div className={styles.videoFrame}>
            <video
              ref={videoRef}
              className={styles.video}
              src="/videos/Hexy_real_1.mp4"
              poster="/image/hexy/hexy-live-corporate.png"
              playsInline
              onEnded={handleVideoEnd}
              onClick={handlePlayToggle}
            />
            {!isPlaying && (
              <button
                className={styles.playButton}
                onClick={handlePlayToggle}
                aria-label="Play video"
              >
                <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                  <circle cx="32" cy="32" r="31" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
                  <path d="M26 20L46 32L26 44V20Z" fill="white" />
                </svg>
              </button>
            )}
            <div className={styles.videoGlow} aria-hidden="true" />
          </div>

          <div className={styles.cornerTag}>
            <span className={styles.liveIcon} />
            MAGIC DRINK CORP
          </div>
        </div>

        <p className={styles.disclaimer} data-reveal>{t.disclaimer}</p>
      </div>
    </section>
  );
}
