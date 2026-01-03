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
  const videoRef = useRef(null);
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
    const video = videoRef.current;
    const vignette = vignetteRef.current;
    const subtitles = subtitlesRef.current;
    const finalSubtitles = finalSubtitlesRef.current;
    
    if (!section || !title || !imageWrapper || !video) return;

    let ctx;
    let rafId;

    const initCinematicTimeline = () => {
      // 🎬 ESPERAR A QUE EL VIDEO ESTÉ COMPLETAMENTE CARGADO
      const waitForVideo = new Promise((resolve) => {
        if (video.readyState >= 2) {
          // Video ya está listo
          resolve();
        } else {
          // Esperar evento loadeddata
          video.addEventListener('loadeddata', resolve, { once: true });
        }
      });

      waitForVideo.then(() => {
        // 🎬 PRECARGAR VIDEO COMPLETAMENTE
        video.pause();
        video.currentTime = 0;
        
        // 🎯 DURACIÓN REAL: 9 SEGUNDOS (parade2.mp4)
        const videoDuration = 9; // Duración exacta del video
        
        console.log('📹 Video cargado:', {
          duration: video.duration,
          usedDuration: videoDuration,
          readyState: video.readyState
        });
        
        ctx = gsap.context(() => {
          
          // 🎯 TIMELINE PRINCIPAL con PIN
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "+=400%",
              pin: true,
              scrub: true,
              anticipatePin: 1,
              onUpdate: (self) => {
                // 🎬 VIDEO SCRUB MANUAL - Control directo frame por frame
                // Video va de 25% (inicio fade-in) hasta 100% (final de sección)
                const progress = self.progress;
                
                if (progress >= 0.25 && progress <= 1.0) {
                  // Mapear 25%-100% del scroll a 0s-9s del video
                  const videoProgress = (progress - 0.25) / 0.75; // 0.75 = 1.0 - 0.25
                  const targetTime = videoProgress * videoDuration;
                  
                  // Actualizar cada 16ms (~60fps) para fluidez máxima
                  if (Math.abs(video.currentTime - targetTime) > 0.016) {
                    video.currentTime = targetTime;
                  }
                  
                  // Debug opcional (comentar en producción)
                  // console.log(`📹 Progress: ${(progress*100).toFixed(1)}% | Video: ${targetTime.toFixed(2)}s`);
                }
              }
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

        // 🎬 VIDEO: Blur to sharp effect (el currentTime se controla en onUpdate)
        // Ya no animamos currentTime aquí - se hace en onUpdate del ScrollTrigger
        
        // Blur to sharp sobre el video (termina en 40%, video sigue hasta 78%)
        tl.fromTo(video,
          {
            filter: "blur(40px) brightness(0.7)",
            scale: 1.2,
          },
          {
            filter: "blur(0px) brightness(1)",
            scale: 1,
            duration: 0.15, // Blur más rápido
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
        // FASE 4: VIDEO NÍTIDO CONTINÚA (40% - 78%)
        // ═══════════════════════════════════════════════════════════
        // (El video sigue avanzando mientras aparecen subtítulos)
        tl.to({}, { duration: 0.05 }, 0.5);

        // ═══════════════════════════════════════════════════════════
        // FASE 5: SUBTÍTULOS APARECEN (42% - 62%)
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
            }, 0.3 // Aparecen justo después del blur (0.40)
          );

          // ═════════════════════════════════════════════════════════
          // FASE 6: SUBTÍTULOS FADE OUT (62% - 68%)
          // ═════════════════════════════════════════════════════════
          tl.to(subtitles,
            {
              opacity: 0,
              y: -20,
              duration: 0.06,
              ease: "power2.in"
            }, 0.62 // Se van antes para dar espacio al siguiente
          );
        }

        // ═══════════════════════════════════════════════════════════
        // FASE 7: SUBTÍTULOS FINALES + CTA (68% - 100%)
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
            }, 0.68 // Aparecen antes para mejor ritmo
          );
        }

      }, section);
      });
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
          FASE 3-4: VIDEO SCRUB CON VIGNETTE (TV EFFECT)
      ══════════════════════════════════════════════════════════ */}
      <div ref={imageWrapperRef} className={styles.cinematicImageWrapper}>
        <video
          ref={videoRef}
          className={styles.cinematicImage}
          muted
          playsInline
          preload="auto"
          
        >
          <source src="/videos/parade2.mp4" type="video/mp4" />
        </video>
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
