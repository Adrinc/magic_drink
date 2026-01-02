import React, { useEffect, useRef } from 'react';
import { useStore } from '@nanostores/react';
import { isEnglish, isDarkMode } from '../../../data/variables';
import Button from '../../global/Button';
import styles from '../css/indexSeccion5.module.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const IndexSeccion5 = () => {
  const ingles = useStore(isEnglish);
  const darkMode = useStore(isDarkMode);
  
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const imageWrapperRef = useRef(null);
  const imageRef = useRef(null);
  const vignetteRef = useRef(null);
  const subtitlesRef = useRef(null);
  const finalSubtitlesRef = useRef(null);
  
  const content = {
    es: {
      title: "¡Día de la Magic Drink!",
      subtitle: "El festival mundial donde celebramos la bebida más querida del planeta.",
      body: "Cada año, millones de fans se reúnen para disfrutar desfiles llenos de color, globos gigantes, música de Hexy y momentos mágicos.",
      highlight: "Porque cuando compartes una Magic Drink, compartes felicidad.",
      cta: "Descubre más sobre el Magic Drink Day"
    },
    en: {
      title: "Magic Drink Day!",
      subtitle: "The worldwide festival celebrating the most beloved beverage on the planet.",
      body: "Every year, millions of fans gather to enjoy colorful parades, giant balloons, Hexy's music, and magical moments.",
      highlight: "Because when you share a Magic Drink, you share happiness.",
      cta: "Discover more about Magic Drink Day"
    }
  };
  
  const t = ingles ? content.en : content.es;
  
  // 🎬 TIMELINE CINEMÁTICO - Efecto tipo GTA VI / Trailer de película
  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const imageWrapper = imageWrapperRef.current;
    const image = imageRef.current;
    const vignette = vignetteRef.current;
    const subtitles = subtitlesRef.current;
    const finalSubtitles = finalSubtitlesRef.current;
    
    if (!section || !title || !imageWrapper) return;

    let ctx;
    let rafId;

    const initCinematicTimeline = () => {
      ctx = gsap.context(() => {
        
        // 🎯 TIMELINE PRINCIPAL con PIN
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=400%", // Sección larga para timeline completo
            pin: true,
            scrub: 1.2,
            anticipatePin: 1,
          }
        });

        // ═══════════════════════════════════════════════════════════
        // FASE 1: TÍTULO ZOOM IN (0% - 15%)
        // ═══════════════════════════════════════════════════════════
        tl.fromTo(title,
          {
            scale: 0.3,
            opacity: 0,
          },
          {
            scale: 1.8,
            opacity: 1,
            duration: 0.15,
            ease: "power2.out"
          }, 0
        );

        // ═══════════════════════════════════════════════════════════
        // FASE 2: TÍTULO FADE OUT (15% - 25%)
        // ═══════════════════════════════════════════════════════════
        tl.to(title,
          {
            opacity: 0,
            scale: 2.2,
            duration: 0.1,
            ease: "power2.in"
          }, 0.15
        );

        // ═══════════════════════════════════════════════════════════
        // FASE 3: IMAGEN FADE IN + BLUR TO SHARP (25% - 50%)
        // ═══════════════════════════════════════════════════════════
        tl.fromTo(imageWrapper,
          {
            opacity: 0,
          },
          {
            opacity: 1,
            duration: 0.15,
            ease: "power2.inOut"
          }, 0.25
        );

        // Blur to sharp effect
        tl.fromTo(image,
          {
            filter: "blur(40px) brightness(0.7)",
            scale: 1.2,
          },
          {
            filter: "blur(0px) brightness(1)",
            scale: 1,
            duration: 0.25,
            ease: "power2.out"
          }, 0.25
        );

        // Vignette fade in (efecto TV encendiéndose)
        if (vignette) {
          tl.fromTo(vignette,
            {
              opacity: 0,
            },
            {
              opacity: 1,
              duration: 0.2,
              ease: "power2.inOut"
            }, 0.3
          );
        }

        // ═══════════════════════════════════════════════════════════
        // FASE 4: IMAGEN NÍTIDA (50% - 55%)
        // ═══════════════════════════════════════════════════════════
        // (pausa visual - imagen completamente visible)
        tl.to({}, { duration: 0.05 }, 0.5);

        // ═══════════════════════════════════════════════════════════
        // FASE 5: SUBTÍTULOS APARECEN (55% - 70%)
        // ═══════════════════════════════════════════════════════════
        if (subtitles) {
          tl.fromTo(subtitles,
            {
              opacity: 0,
              y: 40,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.1,
              ease: "power2.out"
            }, 0.55
          );

          // ═════════════════════════════════════════════════════════
          // FASE 6: SUBTÍTULOS FADE OUT (70% - 78%)
          // ═════════════════════════════════════════════════════════
          tl.to(subtitles,
            {
              opacity: 0,
              y: -20,
              duration: 0.08,
              ease: "power2.in"
            }, 0.7
          );
        }

        // ═══════════════════════════════════════════════════════════
        // FASE 7: SUBTÍTULOS FINALES + CTA (78% - 100%)
        // ═══════════════════════════════════════════════════════════
        if (finalSubtitles) {
          tl.fromTo(finalSubtitles,
            {
              opacity: 0,
              y: 40,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.12,
              ease: "power2.out"
            }, 0.78
          );
        }

      }, section);
    };

    // Esperar al layout
    rafId = requestAnimationFrame(() => {
      setTimeout(initCinematicTimeline, 100);
    });

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (ctx) ctx.revert();
    };
  }, []);
  
  return (
    <section 
      ref={sectionRef}
      className={`${styles.cinematicSection} ${!darkMode ? styles.sectionLight : ''}`}
    >
      {/* Background oscuro total */}
      <div className={styles.cinematicBackground}></div>

      {/* ══════════════════════════════════════════════════════════
          FASE 1-2: TÍTULO GIGANTE CENTRADO
      ══════════════════════════════════════════════════════════ */}
      <div ref={titleRef} className={styles.cinematicTitle}>
        <h1 className={styles.titleText}>{t.title}</h1>
      </div>

      {/* ══════════════════════════════════════════════════════════
          FASE 3-4: IMAGEN CON VIGNETTE (TV EFFECT)
      ══════════════════════════════════════════════════════════ */}
      <div ref={imageWrapperRef} className={styles.cinematicImageWrapper}>
        <img
          ref={imageRef}
          src="/image/events/md_parade_teaser.png"
          alt="Magic Drink Day"
          className={styles.cinematicImage}
        />
        {/* Vignette overlay - efecto TV oscura */}
        <div ref={vignetteRef} className={styles.vignetteOverlay}></div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          FASE 5-6: SUBTÍTULOS INICIALES (como película)
      ══════════════════════════════════════════════════════════ */}
      <div ref={subtitlesRef} className={styles.subtitlesBox}>
        <h3 className={styles.subtitleText}>{t.subtitle}</h3>
        <p className={styles.bodyText}>{t.body}</p>
      </div>

      {/* ══════════════════════════════════════════════════════════
          FASE 7: SUBTÍTULOS FINALES + CTA
      ══════════════════════════════════════════════════════════ */}
      <div ref={finalSubtitlesRef} className={styles.finalSubtitlesBox}>
        <p className={styles.highlightText}>{t.highlight}</p>
        <div className={styles.ctaBox}>
          <Button
            variant="magic"
            href="/magicdrinkday"
            textEs={t.cta}
            textEn={t.cta}
            size="lg"
            showArrow={true}
          />
        </div>
      </div>
    </section>
  );
};

export default IndexSeccion5;
