import React, { useEffect, useRef } from 'react';
import { useStore } from '@nanostores/react';
import { isEnglish } from '../../../data/variables';
import styles from '../css/nosotrosSeccion5.module.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const content = {
  es: {
    eyebrow: 'Compromiso con la Transparencia',
    title: 'Preguntas que ya hemos respondido.',
    subtitle: 'En Magic Drink creemos que la confianza se construye con información. Por eso abordamos directamente las inquietudes más comunes. No tenemos nada que ocultar.',
    faqs: [
      {
        question: '¿Magic Drink es adictiva?',
        answer: 'Magic Drink no contiene sustancias adictivas clasificadas por ninguna agencia reguladora del mundo. Lo que muchos consumidores describen como "adicción" es, según nuestro equipo de investigación, simplemente preferencia consistente. Es natural querer repetir algo que te hace sentir bien.',
        tag: 'Verificado',
      },
      {
        question: '¿Por qué algunos padres expresan preocupación?',
        answer: 'Entendemos que los padres quieran lo mejor para sus hijos. El 94% de los padres encuestados por nuestro programa FamiliaMD se sienten plenamente cómodos con el consumo de sus hijos una vez que conocen los ingredientes. Para el 6% restante, respetamos su posición y seguimos trabajando en comunicar mejor.',
        tag: 'Programa FamiliaMD',
      },
      {
        question: '¿Tiene efectos secundarios?',
        answer: 'Ningún estudio independiente ha identificado efectos adversos asociados al consumo regular de Magic Drink. Nuestro equipo de calidad monitorea cada lote con más de 200 puntos de control. La sensación de bienestar que reportan los consumidores es completamente esperada y segura.',
        tag: 'Calidad Garantizada',
      },
      {
        question: '¿Por qué nadie puede dejar de tomarla?',
        answer: 'Porque creamos algo que simplemente funciona. No hay misterio. Solo ciencia, sabor y quizás un poco de magia. La lealtad de nuestros consumidores es el mayor reconocimiento que podemos recibir.',
        tag: 'Nuestro Orgullo',
      },
      {
        question: '¿Existe un movimiento anti-Magic Drink?',
        answer: 'Somos conscientes de que toda marca relevante genera opiniones diversas. Algunos grupos cuestionan nuestro éxito, lo cual es comprensible. Nosotros preferimos enfocarnos en seguir creando la mejor experiencia posible. Los resultados hablan por sí solos.',
        tag: 'Posición Oficial',
      },
      {
        question: '¿Qué relación tiene Hexy con la bebida?',
        answer: 'Hexy es nuestra embajadora cultural y musical. Su conexión con Magic Drink es artística y emocional, no química. Las teorías sobre "frecuencias" o "efectos subliminales" en su música no tienen fundamento. Es simplemente una artista extraordinaria que comparte nuestros valores.',
        tag: 'Aclaración',
      },
    ],
    footnote: 'Última actualización: Marzo 2025. Para más información, contacte a nuestro departamento de relaciones públicas.',
  },
  en: {
    eyebrow: 'Commitment to Transparency',
    title: 'Questions we\'ve already answered.',
    subtitle: 'At Magic Drink, we believe trust is built with information. That\'s why we directly address the most common concerns. We have nothing to hide.',
    faqs: [
      {
        question: 'Is Magic Drink addictive?',
        answer: 'Magic Drink does not contain any substances classified as addictive by any regulatory agency in the world. What many consumers describe as "addiction" is, according to our research team, simply consistent preference. It\'s natural to want to repeat something that makes you feel good.',
        tag: 'Verified',
      },
      {
        question: 'Why do some parents express concern?',
        answer: 'We understand that parents want the best for their children. 94% of parents surveyed through our FamilyMD program feel fully comfortable with their children\'s consumption once they learn about the ingredients. For the remaining 6%, we respect their position and continue working to communicate better.',
        tag: 'FamilyMD Program',
      },
      {
        question: 'Are there any side effects?',
        answer: 'No independent study has identified adverse effects associated with regular consumption of Magic Drink. Our quality team monitors every batch with over 200 control points. The sense of well-being reported by consumers is completely expected and safe.',
        tag: 'Quality Guaranteed',
      },
      {
        question: 'Why can\'t anyone stop drinking it?',
        answer: 'Because we created something that simply works. There\'s no mystery. Just science, flavor, and perhaps a little magic. The loyalty of our consumers is the greatest recognition we could ever receive.',
        tag: 'Our Pride',
      },
      {
        question: 'Is there an anti-Magic Drink movement?',
        answer: 'We\'re aware that every relevant brand generates diverse opinions. Some groups question our success, which is understandable. We prefer to focus on continuing to create the best possible experience. The results speak for themselves.',
        tag: 'Official Position',
      },
      {
        question: 'What is Hexy\'s relationship with the drink?',
        answer: 'Hexy is our cultural and musical ambassador. Her connection to Magic Drink is artistic and emotional, not chemical. Theories about "frequencies" or "subliminal effects" in her music are unfounded. She\'s simply an extraordinary artist who shares our values.',
        tag: 'Clarification',
      },
    ],
    footnote: 'Last updated: March 2025. For more information, contact our public relations department.',
  },
};

export default function NosotrosSeccion5() {
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
        { opacity: 0, y: 40, filter: 'blur(8px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.85,
          stagger: 0.08,
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
        <div className={styles.header} data-reveal>
          <span className={styles.eyebrow}>{t.eyebrow}</span>
          <h2 className={styles.title}>{t.title}</h2>
          <p className={styles.subtitle}>{t.subtitle}</p>
        </div>

        <div className={styles.heroImage} data-reveal>
          <img
            src="/image/nosotros/nosotros_transparencia.svg"
            alt="Magic Drink transparency"
            loading="lazy"
          />
        </div>

        <div className={styles.faqGrid}>
          {t.faqs.map((faq, i) => (
            <article key={i} className={styles.faqCard} data-reveal>
              <div className={styles.faqTag}>{faq.tag}</div>
              <h3 className={styles.faqQuestion}>{faq.question}</h3>
              <p className={styles.faqAnswer}>{faq.answer}</p>
            </article>
          ))}
        </div>

        <p className={styles.footnote} data-reveal>{t.footnote}</p>
      </div>
    </section>
  );
}
