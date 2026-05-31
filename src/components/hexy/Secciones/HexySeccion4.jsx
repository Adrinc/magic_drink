import React from 'react';
import { useStore } from '@nanostores/react';
import { isEnglish } from '../../../data/variables';
import styles from '../css/hexySeccion4.module.css';

const content = {
  es: {
    heading: 'Que el coro ',
    headingAccent: 'vuelva a sonar',
    headingSuffix: '',
    description:
      'Explora los sabores de Magic Drink o entra a Wonderpop Plaza, donde Hexy, las luces y los Magic Bunnies convierten cada momento en algo que se queda tarareando.',
    ctaPrimary: 'Ver todos los sabores',
    ctaSecondary: 'Entrar a Wonderpop Plaza',
  },
  en: {
    heading: 'Let the chorus ',
    headingAccent: 'play again',
    headingSuffix: '',
    description:
      'Explore every Magic Drink flavor or enter Wonderpop Plaza, where Hexy, the lights, and the Magic Bunnies turn each moment into something you keep humming.',
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
