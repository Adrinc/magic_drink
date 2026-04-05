import React from 'react';
import { useStore } from '@nanostores/react';
import { isEnglish } from '../../../data/variables';
import styles from '../css/wonderpopSeccion4.module.css';

const content = {
  es: {
    eyebrow: 'Galería visual',
    heading: 'Así se vive ',
    headingAccent: 'la Plaza',
  },
  en: {
    eyebrow: 'Visual Gallery',
    heading: 'This is how you live ',
    headingAccent: 'the Plaza',
  },
};

const gallery = [
  {
    src: '/image/wonderpop/wonderpop-exterior.png',
    alt: { es: 'Fachada principal Wonderpop Plaza', en: 'Wonderpop Plaza main facade' },
    size: 'sizeLarge',
    caption: { es: 'Fachada Wonderpop Tokyo', en: 'Wonderpop Tokyo Facade' },
  },
  {
    src: '/image/wonderpop/wonderpop-interior.png',
    alt: { es: 'Interior Wonderpop Plaza', en: 'Wonderpop Plaza Interior' },
    size: 'sizeMedium',
    caption: { es: 'Atrio central', en: 'Central Atrium' },
  },
  {
    src: null, // placeholder
    alt: { es: 'Hexy Stage — presentación en vivo', en: 'Hexy Stage — live show' },
    size: 'sizeSmall',
    caption: { es: 'Hexy Stage', en: 'Hexy Stage' },
    placeholder: { es: 'Imagen: Escenario Hexy con luces holográficas', en: 'Image: Hexy stage with holographic lights' },
  },
  {
    src: null,
    alt: { es: 'Zona de merch kawaii', en: 'Kawaii merch zone' },
    size: 'sizeWide',
    caption: { es: 'Merch Zone', en: 'Merch Zone' },
    placeholder: { es: 'Imagen: Pasillos de merch con vitrinas coloridas llenas de peluches y accesorios', en: 'Image: Merch aisles with colorful cases full of plushies and accessories' },
  },
  {
    src: null,
    alt: { es: 'Espacio instagrameable', en: 'Instagram-ready space' },
    size: 'sizeSmall',
    caption: { es: 'Photo Spot', en: 'Photo Spot' },
    placeholder: { es: 'Imagen: Set fotográfico kawaii con estrellas y neones', en: 'Image: Kawaii photo set with stars and neons' },
  },
  {
    src: null,
    alt: { es: 'Evento de lanzamiento', en: 'Launch event' },
    size: 'sizeMedium',
    caption: { es: 'Season Launch Event', en: 'Season Launch Event' },
    placeholder: { es: 'Imagen: Evento nocturno con multitud, confeti y escenario iluminado', en: 'Image: Night event with crowd, confetti and lit stage' },
  },
];

export default function WonderpopSeccion4() {
  const ingles = useStore(isEnglish);
  const t = ingles ? content.en : content.es;
  const lang = ingles ? 'en' : 'es';

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <span className={styles.eyebrow}>{t.eyebrow}</span>
          <h2 className={styles.heading}>
            {t.heading}<span className={styles.headingAccent}>{t.headingAccent}</span>
          </h2>
        </div>

        <div className={styles.mosaic}>
          {gallery.map((item, i) => (
            <div key={i} className={`${styles.mosaicItem} ${styles[item.size]}`}>
              {item.src ? (
                <>
                  <img src={item.src} alt={item.alt[lang]} loading="lazy" />
                  <div className={styles.mosaicCaption}>
                    <span>{item.caption[lang]}</span>
                  </div>
                </>
              ) : (
                <div className={styles.placeholder}>
                  <span className={styles.placeholderIcon}>&#9733;</span>
                  <span className={styles.placeholderText}>{item.placeholder[lang]}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
