import React from 'react';
import { useStore } from '@nanostores/react';
import { isEnglish } from '../../../data/variables';
import styles from '../css/wonderpopSeccion1.module.css';

const content = {
  es: {
    badge: 'Destino Oficial',
    title: 'Wonderpop Plaza',
    subtitle: 'El único lugar donde Magic Drink deja de ser solo una bebida y se convierte en un universo que puedes recorrer, sentir y compartir.',
    scroll: 'Explorar',
  },
  en: {
    badge: 'Official Destination',
    title: 'Wonderpop Plaza',
    subtitle: 'The only place where Magic Drink stops being just a drink and becomes a universe you can walk through, feel, and share.',
    scroll: 'Explore',
  },
};

export default function WonderpopSeccion1() {
  const ingles = useStore(isEnglish);
  const t = ingles ? content.en : content.es;

  return (
    <section className={styles.hero}>
      <img
        className={styles.bgImage}
        src="/image/wonderpop/wonderpop-poster.png"
        alt="Wonderpop Plaza"
        loading="eager"
      />
      <div className={styles.overlay} />

      <div className={styles.content}>
        <span className={styles.badge}>
          <img className={styles.badgeIcon} src="/icons/icono_plaza.png" alt="" />
          {t.badge}
        </span>
        <h1 className={styles.title}>{t.title}</h1>
        <p className={styles.subtitle}>{t.subtitle}</p>
      </div>

      <div className={styles.scrollHint}>
        <span>{t.scroll}</span>
        <div className={styles.scrollLine} />
      </div>
    </section>
  );
}
