import React from 'react';
import { useStore } from '@nanostores/react';
import { isEnglish } from '../../../data/variables';
import styles from '../css/hexySeccion4.module.css';

const content = {
  es: {
    heading: 'Tu pr\u00F3xima ',
    headingAccent: 'experiencia m\u00E1gica',
    headingSuffix: ' te espera',
    description:
      'Descubre todos los sabores de Magic Drink o explora la Wonderpop Plaza. Hexy estar\u00E1 ah\u00ED, en cada canci\u00F3n, en cada sorbo, en cada momento.',
    ctaPrimary: 'Ver todos los sabores',
    ctaSecondary: 'Entrar a Wonderpop Plaza',
  },
  en: {
    heading: 'Your next ',
    headingAccent: 'magical experience',
    headingSuffix: ' awaits',
    description:
      'Discover every Magic Drink flavor or explore the Wonderpop Plaza. Hexy will be there\u2014in every song, every sip, every moment.',
    ctaPrimary: 'See every flavor',
    ctaSecondary: 'Enter Wonderpop Plaza',
  },
};

export default function HexySeccion4() {
  const ingles = useStore(isEnglish);
  const t = ingles ? content.en : content.es;

  return (
    <section className={styles.section}>
      <div className={styles.bg} />

      {/* Decorative sparkles */}
      <div className={styles.sparkles}>
        <span className={styles.sparkle} />
        <span className={styles.sparkle} />
        <span className={styles.sparkle} />
        <span className={styles.sparkle} />
        <span className={styles.sparkle} />
      </div>

      <div className={styles.shell}>
        <div className={styles.imageWrap}>
          <img
            src="/image/hexy/hexy-anime-chibi.webp"
            alt="Hexy chibi"
            className={styles.chibi}
          />
        </div>

        <h2 className={styles.heading}>
          {t.heading}
          <span className={styles.headingAccent}>{t.headingAccent}</span>
          {t.headingSuffix}
        </h2>

        <p className={styles.description}>{t.description}</p>

        <div className={styles.actions}>
          <a href="/bebidas" className={styles.btnPrimary}>
            {t.ctaPrimary} {'\u2192'}
          </a>
          <a href="/wonderpop-plaza" className={styles.btnSecondary}>
            {t.ctaSecondary} {'\u2192'}
          </a>
        </div>
      </div>
    </section>
  );
}
