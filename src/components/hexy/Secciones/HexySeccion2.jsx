import React from 'react';
import { useStore } from '@nanostores/react';
import { isEnglish } from '../../../data/variables';
import styles from '../css/hexySeccion2.module.css';

const content = {
  es: {
    eyebrow: 'Idol Global',
    title: '\u00BFQui\u00E9n es ',
    titleAccent: 'Hexy?',
    subtitle:
      'La brujita DJ que conquist\u00F3 al mundo entero con su magia musical y su energ\u00EDa imposible de ignorar.',
    heading: 'La chispa que le da vida a Magic Drink',
    paragraphs: [
      'Hexy es la idol oficial de Magic Drink. Con su cabello rosa, su sombrero de bruja ic\u00F3nico y sus ojos fucsia brillantes, se convirti\u00F3 en un fen\u00F3meno cultural reconocido en todo el mundo.',
      'No es solo una mascota: es una presencia musical que transforma cada momento cotidiano en algo m\u00E1s vibrante. Sus canciones acompa\u00F1an a millones de fans cada d\u00EDa, convirtiendo la experiencia de beber Magic Drink en algo que se siente, se escucha y se vive.',
    ],
    traits: [
      {
        icon: '\u2728',
        title: 'Estilo Kawaii-Pop',
        body: 'Su est\u00E9tica combina lo adorable con lo futurista: estrellas, notas musicales y efectos luminosos la acompa\u00F1an siempre.',
      },
      {
        icon: '\u266B',
        title: 'Energ\u00EDa Musical',
        body: 'Cada canci\u00F3n de Hexy est\u00E1 dise\u00F1ada para quedarse en tu cabeza: ritmos pegajosos, coros juguetones y pura vibra positiva.',
      },
      {
        icon: '\u2605',
        title: '\u00CDcono Cultural',
        body: 'Aparece en conciertos, campa\u00F1as globales, empaques y eventos. Hexy es el rostro emocional de Magic Drink en todo el mundo.',
      },
    ],
  },
  en: {
    eyebrow: 'Global Idol',
    title: 'Who is ',
    titleAccent: 'Hexy?',
    subtitle:
      'The witch DJ who conquered the entire world with her musical magic and her impossible-to-ignore energy.',
    heading: 'The spark that brings Magic Drink to life',
    paragraphs: [
      'Hexy is the official idol of Magic Drink. With her pink hair, iconic witch hat, and bright fuchsia eyes, she became a worldwide cultural phenomenon.',
      'She\u2019s not just a mascot: she\u2019s a musical presence that transforms everyday moments into something more vibrant. Her songs accompany millions of fans every day, turning the Magic Drink experience into something you feel, hear, and live.',
    ],
    traits: [
      {
        icon: '\u2728',
        title: 'Kawaii-Pop Style',
        body: 'Her aesthetic blends adorable with futuristic: stars, musical notes, and luminous effects always accompany her.',
      },
      {
        icon: '\u266B',
        title: 'Musical Energy',
        body: 'Every Hexy song is designed to stick in your head: catchy rhythms, playful choruses, and pure positive vibes.',
      },
      {
        icon: '\u2605',
        title: 'Cultural Icon',
        body: 'She appears in concerts, global campaigns, packaging, and events. Hexy is the emotional face of Magic Drink worldwide.',
      },
    ],
  },
};

export default function HexySeccion2() {
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

        <div className={styles.grid}>
          <div className={styles.imageWrap}>
            <div className={styles.glowOrb} />
            <img
              src="/image/hexy/hexy-highlight.png"
              alt="Hexy — Magic Drink Idol"
              className={styles.characterImage}
            />
          </div>

          <div className={styles.textContent}>
            <h3>{t.heading}</h3>
            {t.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>

        <div className={styles.traits}>
          {t.traits.map((trait) => (
            <div key={trait.title} className={styles.trait}>
              <div className={styles.traitIcon}>{trait.icon}</div>
              <h4>{trait.title}</h4>
              <p>{trait.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
