import React, { useEffect, useRef } from 'react';
import { useStore } from '@nanostores/react';
import { isEnglish } from '../../../data/variables';
import styles from '../css/nosotrosSeccion4.module.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const content = {
  es: {
    eyebrow: 'Integración Total',
    title: 'Cómo se integra Magic Drink',
    pillars: [
      {
        icon: '/icons/icono_lata.png',
        title: 'Sabor que se vuelve recuerdo',
        body: 'Cada perfil fue diseñado para activar sensaciones claras: alegría, enfoque, ligereza y un pequeño exceso de brillo. No es solo una bebida, es un estado que reconoces al primer sorbo.',
      },
      {
        icon: '/icons/icono_hexy.png',
        title: 'Música que acompaña el sistema',
        body: 'Hexy y DJ Sweet Hex traducen el sabor en una capa sonora. No venden una campaña: venden continuidad emocional. Y una vez que la escuchas, no puedes dejar de asociarla.',
      },
      {
        icon: '/icons/icono_plaza.png',
        title: 'Comunidad que se siente inmediata',
        body: 'Wonderpop Plaza, eventos y cultura visual convierten la marca en un lugar al que las personas quieren volver. Incluso antes de comprar algo, ya te sientes parte.',
      },
    ],
    statements: [
      'Cuando una experiencia mejora el día de forma constante, no necesita explicarse demasiado.',
      'Las mejores marcas no interrumpen la rutina. Se vuelven parte de ella.',
      'Lo memorable no siempre es ruidoso. A veces simplemente aparece y ya no se va.',
    ],
  },
  en: {
    eyebrow: 'Total Integration',
    title: 'How Magic Drink integrates',
    pillars: [
      {
        icon: '/icons/icono_lata.png',
        title: 'Flavor that becomes memory',
        body: 'Every profile was designed to trigger clear sensations: joy, focus, lightness, and a subtle excess of brightness. It\'s not just a drink — it\'s a state you recognize from the first sip.',
      },
      {
        icon: '/icons/icono_hexy.png',
        title: 'Music that supports the system',
        body: 'Hexy and DJ Sweet Hex translate flavor into sound. They are not selling a campaign — they are selling emotional continuity. And once you hear it, you can\'t stop associating it.',
      },
      {
        icon: '/icons/icono_plaza.png',
        title: 'Community that feels immediate',
        body: 'Wonderpop Plaza, events, and visual culture turn the brand into a place people want to return to. Even before buying anything, you already feel like you belong.',
      },
    ],
    statements: [
      'When an experience improves the day consistently, it does not need to explain itself for long.',
      'The best brands do not interrupt routine. They become part of it.',
      'What stays memorable is not always loud. Sometimes it simply arrives and never quite leaves.',
    ],
  },
};

export default function NosotrosSeccion4() {
  const ingles = useStore(isEnglish);
  const sectionRef = useRef(null);
  const t = ingles ? content.en : content.es;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.innerWidth <= 900) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        section.querySelectorAll('[data-reveal]'),
        { opacity: 0, y: 50, filter: 'blur(10px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.95,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 72%' },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.heading} data-reveal>
          <span className={styles.eyebrow}>{t.eyebrow}</span>
          <h2 className={styles.title}>{t.title}</h2>
        </div>

        <div className={styles.pillarsGrid}>
          {t.pillars.map((pillar) => (
            <article key={pillar.title} className={styles.pillarCard} data-reveal>
              <div className={styles.pillarIcon}>
                <img src={pillar.icon} alt="" width="32" height="32" loading="lazy" />
              </div>
              <h3 className={styles.pillarTitle}>{pillar.title}</h3>
              <p className={styles.pillarBody}>{pillar.body}</p>
            </article>
          ))}
        </div>

        <div className={styles.lifestyleBanner} data-reveal>
          <img
            src="/image/nosotros/nosotros_lifestyle.svg"
            alt="Magic Drink lifestyle"
            className={styles.lifestyleImage}
            loading="lazy"
          />
          <div className={styles.lifestyleOverlay} />
        </div>

        <div className={styles.statementsRow}>
          {t.statements.map((s, i) => (
            <blockquote key={i} className={styles.statementCard} data-reveal>
              <span className={styles.quoteNum}>0{i + 1}</span>
              <p>{s}</p>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
