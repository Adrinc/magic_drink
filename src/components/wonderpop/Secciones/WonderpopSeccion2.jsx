import React from 'react';
import { useStore } from '@nanostores/react';
import { isEnglish } from '../../../data/variables';
import styles from '../css/wonderpopSeccion2.module.css';

const content = {
  es: {
    eyebrow: 'El destino Magic Drink',
    heading: 'Más que un mall.',
    headingAccent: 'Un universo.',
    body: 'Wonderpop Plaza es el centro comercial temático oficial de Magic Drink. Un espacio inmersivo donde la bebida, la música de Hexy, el merch kawaii y la comunidad convergen en una experiencia que no existe en ningún otro lugar del mundo.',
    stats: [
      { number: '12', label: 'Sucursales globales' },
      { number: '4.8M', label: 'Visitantes al año' },
      { number: '200+', label: 'Eventos anuales' },
    ],
    tag: 'Sucursal Tokyo — Flagship',
  },
  en: {
    eyebrow: 'The Magic Drink destination',
    heading: 'More than a mall.',
    headingAccent: 'A universe.',
    body: 'Wonderpop Plaza is the official Magic Drink themed shopping center. An immersive space where the drink, Hexy\'s music, kawaii merch, and community converge in an experience that doesn\'t exist anywhere else in the world.',
    stats: [
      { number: '12', label: 'Global locations' },
      { number: '4.8M', label: 'Yearly visitors' },
      { number: '200+', label: 'Annual events' },
    ],
    tag: 'Tokyo Branch — Flagship',
  },
};

export default function WonderpopSeccion2() {
  const ingles = useStore(isEnglish);
  const t = ingles ? content.en : content.es;

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.copy}>
          <span className={styles.eyebrow}>{t.eyebrow}</span>
          <h2 className={styles.heading}>
            {t.heading}
            <br />
            <span className={styles.headingAccent}>{t.headingAccent}</span>
          </h2>
          <p className={styles.body}>{t.body}</p>
          <div className={styles.stats}>
            {t.stats.map((s) => (
              <div key={s.label} className={styles.stat}>
                <span className={styles.statNumber}>{s.number}</span>
                <span className={styles.statLabel}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.visual}>
          <img
            src="/image/wonderpop/wonderpop-exterior.png"
            alt="Wonderpop Plaza exterior"
            loading="lazy"
          />
          <span className={styles.visualTag}>{t.tag}</span>
        </div>
      </div>
    </section>
  );
}
