import React, { useEffect, useRef, useState } from "react";
import { isEnglish } from '../../../data/variables';
import { useStore } from '@nanostores/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from "../css/indexSeccion2.module.css";

gsap.registerPlugin(ScrollTrigger);

const IndexSeccion2 = () => {
  const ingles = useStore(isEnglish);
  const sectionRef = useRef(null);
  const statsRef = useRef([]);
  const [hasAnimated, setHasAnimated] = useState(false);

  const content = {
    es: {
      title: "Más allá del código",
      manifesto: "No solo desarrollo software—",
      manifestoBold: "creo experiencias completas",
      manifestoEnd: ". Combino ingeniería avanzada, diseño 3D, música e inteligencia artificial para construir productos que funcionan y emocionan.",
      stats: [
        {
          value: 3,
          suffix: "+",
          label: "Años de experiencia profesional",
          icon: "💼"
        },
        {
          value: 10,
          suffix: "+",
          label: "Años en contacto con desarrollo",
          icon: "💻"
        },
        {
          value: 4,
          suffix: "",
          label: "Pilares creativos (Code · 3D · Music · AI)",
          icon: "🎨"
        },
        {
          value: 5,
          suffix: "+",
          label: "Proyectos completos de principio a fin",
          icon: "🚀"
        }
      ]
    },
    en: {
      title: "Beyond the code",
      manifesto: "I don't just build software—",
      manifestoBold: "I create complete experiences",
      manifestoEnd: ". I blend advanced engineering, 3D design, music, and artificial intelligence to craft products that work and inspire.",
      stats: [
        {
          value: 3,
          suffix: "+",
          label: "Years of professional experience",
          icon: "💼"
        },
        {
          value: 10,
          suffix: "+",
          label: "Years in touch with development",
          icon: "💻"
        },
        {
          value: 4,
          suffix: "",
          label: "Creative pillars (Code · 3D · Music · AI)",
          icon: "🎨"
        },
        {
          value: 5,
          suffix: "+",
          label: "Complete end-to-end projects",
          icon: "🚀"
        }
      ]
    }
  };

  const textos = ingles ? content.en : content.es;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || hasAnimated) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            
            // Animar stats con GSAP
            statsRef.current.forEach((stat, index) => {
              if (!stat) return;
              
              const valueElement = stat.querySelector(`.${styles.statValue}`);
              const targetValue = textos.stats[index].value;
              const suffix = textos.stats[index].suffix;
              
              // Crear objeto para animar el counter
              const counterObj = { value: 0 };
              gsap.to(counterObj, {
                value: targetValue,
                duration: 2,
                delay: index * 0.15,
                ease: "power2.out",
                onUpdate: function() {
                  valueElement.textContent = Math.floor(counterObj.value) + suffix;
                }
              });

              // Animar la card con stagger
              gsap.fromTo(
                stat,
                {
                  opacity: 0,
                  y: 40,
                  scale: 0.9
                },
                {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  duration: 0.8,
                  delay: index * 0.15,
                  ease: "back.out(1.2)"
                }
              );
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, [hasAnimated, textos.stats]);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.container}>
        {/* Manifesto principal */}
        <div className={styles.manifestoWrapper}>
          <h2 className={styles.title}>{textos.title}</h2>
          <p className={styles.manifesto}>
            {textos.manifesto}
            <span className={styles.manifestoBold}>{textos.manifestoBold}</span>
            {textos.manifestoEnd}
          </p>
        </div>

        {/* Stats Grid */}
        <div className={styles.statsGrid}>
          {textos.stats.map((stat, index) => (
            <div
              key={index}
              ref={(el) => (statsRef.current[index] = el)}
              className={styles.statCard}
            >
              <div className={styles.statIcon}>{stat.icon}</div>
              <div className={styles.statValue}>0{stat.suffix}</div>
              <div className={styles.statLabel}>{stat.label}</div>
              <div className={styles.statGlow}></div>
            </div>
          ))}
        </div>
      </div>

      {/* Decoración de fondo */}
      <div className={styles.bgDecoration}></div>
    </section>
  );
};

export default IndexSeccion2;