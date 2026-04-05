import React from 'react';
import { useStore } from '@nanostores/react';
import { isEnglish } from '../../../data/variables';
import styles from '../css/wonderpopSeccion3.module.css';

const content = {
  es: {
    eyebrow: 'Zonas de experiencia',
    heading: 'Todo lo que hay',
    headingAccent: 'dentro de la Plaza',
    subtitle: 'Cada rincón de Wonderpop Plaza está diseñado para convertir tu visita en un recuerdo. Estas son las zonas principales.',
    zones: [
      {
        icon: '/icons/icono_lata.png',
        title: 'Tienda Oficial de Sabores',
        desc: 'Todos los sabores de Magic Drink disponibles, incluyendo ediciones limitadas exclusivas de cada sucursal. Prueba antes de comprar en las estaciones de degustación.',
        tag: 'Flagship',
        color: '#FF6AD7',
        featured: false,
      },
      {
        icon: '/icons/icono_hexy.png',
        title: 'Hexy Stage',
        desc: 'Escenario equipado con proyecciones holográficas donde Hexy realiza presentaciones musicales en vivo. Eventos especiales cada fin de semana.',
        tag: 'Live Music',
        color: '#AA37F2',
        featured: false,
      },
      {
        icon: '/icons/icono_bolsa.png',
        title: 'Merch Zone',
        desc: 'Peluches, ropa, accesorios, llaveros, stickers y ediciones coleccionables. Todo el merch kawaii oficial de Magic Drink y Hexy en un solo espacio.',
        tag: 'Coleccionable',
        color: '#82D2FF',
        featured: false,
      },
      {
        icon: '/icons/icono_globo.png',
        title: 'Eventos & Activaciones',
        desc: 'Lanzamientos de nuevos sabores, meet & greets virtuales con Hexy, pop-ups temáticos y colaboraciones con artistas locales. Siempre hay algo nuevo.',
        tag: 'Temporal',
        color: '#F9F871',
        featured: true,
        image: '/image/wonderpop/wonderpop-interior.png',
      },
      {
        icon: '/icons/icono_gorro.png',
        title: 'Espacios Instagrameables',
        desc: 'Zonas de foto con escenografías kawaii rotativas, iluminación perfecta y props oficiales. El lugar más compartido de la Plaza.',
        tag: 'Social',
        color: '#98FFDE',
        featured: false,
      },
    ],
  },
  en: {
    eyebrow: 'Experience Zones',
    heading: 'Everything inside',
    headingAccent: 'the Plaza',
    subtitle: 'Every corner of Wonderpop Plaza is designed to turn your visit into a memory. These are the main zones.',
    zones: [
      {
        icon: '/icons/icono_lata.png',
        title: 'Official Flavor Store',
        desc: 'Every Magic Drink flavor available, including limited editions exclusive to each branch. Try before you buy at tasting stations.',
        tag: 'Flagship',
        color: '#FF6AD7',
        featured: false,
      },
      {
        icon: '/icons/icono_hexy.png',
        title: 'Hexy Stage',
        desc: 'Stage equipped with holographic projections where Hexy performs live musical shows. Special events every weekend.',
        tag: 'Live Music',
        color: '#AA37F2',
        featured: false,
      },
      {
        icon: '/icons/icono_bolsa.png',
        title: 'Merch Zone',
        desc: 'Plushies, clothing, accessories, keychains, stickers, and collectible editions. All official Magic Drink and Hexy kawaii merch in one space.',
        tag: 'Collectible',
        color: '#82D2FF',
        featured: false,
      },
      {
        icon: '/icons/icono_globo.png',
        title: 'Events & Activations',
        desc: 'New flavor launches, virtual meet & greets with Hexy, themed pop-ups, and collaborations with local artists. There\'s always something new.',
        tag: 'Temporary',
        color: '#F9F871',
        featured: true,
        image: '/image/wonderpop/wonderpop-interior.png',
      },
      {
        icon: '/icons/icono_gorro.png',
        title: 'Instagrammable Spaces',
        desc: 'Photo zones with rotating kawaii sets, perfect lighting, and official props. The most shared spot in the Plaza.',
        tag: 'Social',
        color: '#98FFDE',
        featured: false,
      },
    ],
  },
};

export default function WonderpopSeccion3() {
  const ingles = useStore(isEnglish);
  const t = ingles ? content.en : content.es;

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <span className={styles.eyebrow}>{t.eyebrow}</span>
          <h2 className={styles.heading}>
            {t.heading} <span className={styles.headingAccent}>{t.headingAccent}</span>
          </h2>
          <p className={styles.subtitle}>{t.subtitle}</p>
        </div>

        <div className={styles.grid}>
          {t.zones.map((zone) => (
            <div
              key={zone.title}
              className={`${styles.card} ${zone.featured ? styles.featured : ''}`}
            >
              <div className={styles.cardGlow} style={{ background: `linear-gradient(90deg, transparent, ${zone.color}, transparent)` }} />

              {zone.featured && zone.image && (
                <img
                  className={styles.featuredImage}
                  src={zone.image}
                  alt={zone.title}
                  loading="lazy"
                />
              )}

              <div className={zone.featured ? styles.featuredCopy : undefined}>
                <img className={styles.cardIcon} src={zone.icon} alt="" />
                <h3 className={styles.cardTitle}>{zone.title}</h3>
                <p className={styles.cardDesc}>{zone.desc}</p>
                <span className={styles.cardTag} style={{ background: `${zone.color}15`, color: zone.color, borderColor: `${zone.color}25` }}>
                  {zone.tag}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
