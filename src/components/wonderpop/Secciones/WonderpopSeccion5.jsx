import React from 'react';
import { useStore } from '@nanostores/react';
import { isEnglish } from '../../../data/variables';
import styles from '../css/wonderpopSeccion5.module.css';

const content = {
  es: {
    eyebrow: 'Presencia global',
    heading: 'Donde nos ',
    headingAccent: 'encuentras',
    subtitle: '12 sucursales en las ciudades más vibrantes del mundo. Cada una con su propia personalidad, pero con la misma magia.',
    note: 'Más ubicaciones serán anunciadas durante el Magic Drink Day 2026.',
  },
  en: {
    eyebrow: 'Global presence',
    heading: 'Where to ',
    headingAccent: 'find us',
    subtitle: '12 branches in the most vibrant cities in the world. Each with its own personality, but the same magic.',
    note: 'More locations will be announced during Magic Drink Day 2026.',
  },
};

const locations = [
  {
    flag: '\u{1F1EF}\u{1F1F5}',
    city: 'Tokyo',
    country: { es: 'Jap\u00f3n', en: 'Japan' },
    details: { es: ['Shibuya District', 'Flagship \u00b7 4 pisos', 'Abierta 2023'], en: ['Shibuya District', 'Flagship \u00b7 4 floors', 'Opened 2023'] },
    badge: 'flagship',
  },
  {
    flag: '\u{1F1FA}\u{1F1F8}',
    city: 'Los Angeles',
    country: { es: 'Estados Unidos', en: 'United States' },
    details: { es: ['Hollywood Blvd', '3 pisos \u00b7 Hexy Stage', 'Abierta 2023'], en: ['Hollywood Blvd', '3 floors \u00b7 Hexy Stage', 'Opened 2023'] },
    badge: 'flagship',
  },
  {
    flag: '\u{1F1F0}\u{1F1F7}',
    city: 'Seoul',
    country: { es: 'Corea del Sur', en: 'South Korea' },
    details: { es: ['Gangnam-gu', '2 pisos \u00b7 Merch Hub', 'Abierta 2024'], en: ['Gangnam-gu', '2 floors \u00b7 Merch Hub', 'Opened 2024'] },
    badge: null,
  },
  {
    flag: '\u{1F1EC}\u{1F1E7}',
    city: 'London',
    country: { es: 'Reino Unido', en: 'United Kingdom' },
    details: { es: ['Covent Garden', '2 pisos \u00b7 Pop-up activo', 'Abierta 2024'], en: ['Covent Garden', '2 floors \u00b7 Active pop-up', 'Opened 2024'] },
    badge: null,
  },
  {
    flag: '\u{1F1F2}\u{1F1FD}',
    city: 'Ciudad de M\u00e9xico',
    country: { es: 'M\u00e9xico', en: 'Mexico' },
    details: { es: ['Polanco', '3 pisos \u00b7 Hexy Stage', 'Abierta 2025'], en: ['Polanco', '3 floors \u00b7 Hexy Stage', 'Opened 2025'] },
    badge: 'new',
  },
  {
    flag: '\u{1F1E7}\u{1F1F7}',
    city: 'S\u00e3o Paulo',
    country: { es: 'Brasil', en: 'Brazil' },
    details: { es: ['Av. Paulista', 'En construcci\u00f3n', 'Apertura Q3 2026'], en: ['Av. Paulista', 'Under construction', 'Opening Q3 2026'] },
    badge: 'comingSoon',
  },
];

const badgeLabels = {
  flagship: 'Flagship',
  new: { es: 'Nueva', en: 'New' },
  comingSoon: { es: 'Pr\u00f3ximamente', en: 'Coming Soon' },
};

export default function WonderpopSeccion5() {
  const ingles = useStore(isEnglish);
  const t = ingles ? content.en : content.es;
  const lang = ingles ? 'en' : 'es';

  const getBadgeLabel = (type) => {
    if (!type) return null;
    const label = badgeLabels[type];
    return typeof label === 'string' ? label : label[lang];
  };

  const getBadgeClass = (type) => {
    if (type === 'flagship') return styles.badgeFlagship;
    if (type === 'new') return styles.badgeNew;
    if (type === 'comingSoon') return styles.badgeComingSoon;
    return '';
  };

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <span className={styles.eyebrow}>{t.eyebrow}</span>
          <h2 className={styles.heading}>
            {t.heading}<span className={styles.headingAccent}>{t.headingAccent}</span>
          </h2>
          <p className={styles.subtitle}>{t.subtitle}</p>
        </div>

        <div className={styles.locations}>
          {locations.map((loc) => (
            <div key={loc.city} className={styles.locationCard}>
              {loc.badge && (
                <span className={`${styles.locationBadge} ${getBadgeClass(loc.badge)}`}>
                  {getBadgeLabel(loc.badge)}
                </span>
              )}
              <span className={styles.locationFlag}>{loc.flag}</span>
              <h3 className={styles.locationCity}>{loc.city}</h3>
              <span className={styles.locationCountry}>{loc.country[lang]}</span>
              <div className={styles.locationDetails}>
                {loc.details[lang].map((d, i) => (
                  <span key={i} className={styles.locationDetail}>{d}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className={styles.note}>{t.note}</p>
      </div>
    </section>
  );
}
