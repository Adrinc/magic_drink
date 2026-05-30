import React from 'react';
import { useStore } from '@nanostores/react';
import { isEnglish } from '../../../data/variables';
import styles from '../css/hexySeccion3.module.css';

const albums = [
  { title: 'Starlight Addiction', artist: 'DJ Sweet Hex', cover: '/image/hexy/hexy-anime-poster.webp' },
  { title: 'Sparkle Dreams',     artist: 'DJ Sweet Hex', cover: '/image/hexy/hexy-anime-chibi.webp' },
  { title: 'Bubble Pop Magic',   artist: 'DJ Sweet Hex', cover: '/image/hexy/hexy-anime-banner.webp' },
  { title: 'Banana Overdrive',   artist: 'DJ Sweet Hex', cover: '/image/hexy/hexy-live-can.webp' },
  { title: 'Dragon Beat Fury',   artist: 'DJ Sweet Hex', cover: '/image/hexy/hexy-live-corporate.webp' },
  { title: 'Kiwi Hex Ritual',    artist: 'DJ Sweet Hex', cover: '/image/hexy/hexy1.webp' },
];

const content = {
  es: {
    eyebrow: 'El Misterio',
    title: 'DJ ',
    titleAccent: 'Sweet Hex',
    subtitle:
      'Nadie sabe qui\u00E9n est\u00E1 detr\u00E1s de la m\u00FAsica. Solo que funciona. Solo que se queda en tu cabeza.',
    heading: 'La firma invisible',
    paragraphs: [
      'Las canciones que Hexy interpreta est\u00E1n firmadas por un nombre que aparece en cr\u00E9ditos, posters y plataformas digitales: DJ Sweet Hex. Sobre esta identidad no existe informaci\u00F3n oficial.',
      'No se sabe si es una persona real, un estudio musical o una inteligencia artificial. No hay entrevistas, no hay rostro, no hay historia p\u00FAblica. Solo un nombre que aparece como una firma fantasma y desaparece.',
    ],
    rumorText:
      'Cuando bebes una Magic Drink, la m\u00FAsica de DJ Sweet Hex se vuelve m\u00E1s adictiva. Las canciones se pegan con m\u00E1s fuerza. Se repiten involuntariamente en la cabeza.',
    rumorSource: '\u2014 Rumor persistente entre fans de Magic Drink',
    details: [
      {
        title: 'Sincronia Inexplicable',
        body: 'Los fans reportan que la m\u00FAsica de DJ Sweet Hex "se siente mejor" cuando se consume Magic Drink. La empresa lo llama coincidencia y marketing exitoso.',
      },
      {
        title: 'Energ\u00EDa Emocional',
        body: 'Magic Drink no da energ\u00EDa con cafe\u00EDna. La m\u00FAsica de Hexy no es solo entretenimiento. Juntas, crean algo que nadie puede explicar del todo.',
      },
    ],
  },
  en: {
    eyebrow: 'The Mystery',
    title: 'DJ ',
    titleAccent: 'Sweet Hex',
    subtitle:
      'Nobody knows who\u2019s behind the music. Only that it works. Only that it stays in your head.',
    heading: 'The invisible signature',
    paragraphs: [
      'The songs Hexy performs are signed by a name that appears in credits, posters, and digital platforms: DJ Sweet Hex. There is no official information about this identity.',
      'Nobody knows if it\u2019s a real person, a music studio, or an artificial intelligence. No interviews, no face, no public history. Just a name that appears as a phantom signature and vanishes.',
    ],
    rumorText:
      'When you drink a Magic Drink, DJ Sweet Hex\u2019s music becomes more addictive. The songs stick harder. They repeat involuntarily in your head.',
    rumorSource: '\u2014 Persistent rumor among Magic Drink fans',
    details: [
      {
        title: 'Unexplainable Synergy',
        body: 'Fans report that DJ Sweet Hex\u2019s music "feels better" when consuming Magic Drink. The company calls it coincidence and successful marketing.',
      },
      {
        title: 'Emotional Energy',
        body: 'Magic Drink doesn\u2019t give energy with caffeine. Hexy\u2019s music isn\u2019t just entertainment. Together, they create something no one can fully explain.',
      },
    ],
  },
};

export default function HexySeccion3() {
  const ingles = useStore(isEnglish);
  const t = ingles ? content.en : content.es;

  return (
    <section className={styles.section}>
      <div className={styles.shell}>
        <div className={styles.header}>
          <span className={styles.eyebrow}>{t.eyebrow}</span>
          <h2 className={styles.sectionTitle}>
            {t.title}
            <span className={styles.titleAccent}>{t.titleAccent}</span>
          </h2>
          <p className={styles.sectionSubtitle}>{t.subtitle}</p>
        </div>

        <div className={styles.mysteryGrid}>
          <div className={styles.mysteryText}>
            <h3>{t.heading}</h3>
            {t.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}

            <div className={styles.rumor}>
              <p className={styles.rumorText}>{t.rumorText}</p>
              <span className={styles.rumorSource}>{t.rumorSource}</span>
            </div>
          </div>

          <div className={styles.albumGrid}>
            {albums.map((album) => (
              <div key={album.title} className={styles.album}>
                <img
                  src={album.cover}
                  alt={album.title}
                  className={styles.albumImage}
                />
                <div className={styles.albumOverlay}>
                  <span className={styles.albumTitle}>{album.title}</span>
                  <span className={styles.albumArtist}>{album.artist}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.details}>
          {t.details.map((detail) => (
            <div key={detail.title} className={styles.detail}>
              <h4>{detail.title}</h4>
              <p>{detail.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
