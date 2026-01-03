import React, { useEffect, useRef, useState } from 'react';
import { useStore } from '@nanostores/react';
import { isEnglish } from '../../../data/variables';
import styles from '../css/indexSeccion6.module.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const IndexSeccion6 = () => {
  const ingles = useStore(isEnglish);
  
  // Refs para GSAP
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const videoWrapperRef = useRef(null);
  const videoRef = useRef(null);
  const contentColumnRef = useRef(null);
  const subtitleRef = useRef(null);
  const descriptionRef = useRef(null);
  const highlightsRef = useRef(null);
  const ctaRef = useRef(null);
  const statsContainerRef = useRef(null);
  const statCardsRef = useRef([]);
  const highlightItemsRef = useRef([]);

  // Estado para contadores animados
  const [counts, setCounts] = useState({
    locations: 0,
    visitors: 0,
    rating: 0,
    photos: 0
  });
  const [countersStarted, setCountersStarted] = useState(false);

  // Datos
  const highlights = [
    { icon: '/icons/icono_lata.png', textEs: 'Tienda oficial Magic Drink', textEn: 'Official Magic Drink Store' },
    { icon: '/icons/icono_gorro.png', textEs: 'Música y experiencias de Hexy', textEn: 'Music and Hexy experiences' },
    { icon: '/icons/icono_bolsa.png', textEs: 'Merch exclusivo y ediciones limitadas', textEn: 'Exclusive merch and limited editions' },
    { icon: '/icons/icono_globo.png', textEs: 'Eventos especiales durante el Magic Drink Day', textEn: 'Special events during Magic Drink Day' }
  ];

  // Función para animar contadores
  const animateCounters = () => {
    if (countersStarted) return;
    setCountersStarted(true);

    let loc = 0;
    const locI = setInterval(() => { 
      loc += 1; 
      if (loc >= 24) { loc = 24; clearInterval(locI); } 
      setCounts(p => ({ ...p, locations: loc })); 
    }, 50);

    let vis = 0;
    const visI = setInterval(() => { 
      vis += 80000; 
      if (vis >= 2000000) { vis = 2000000; clearInterval(visI); } 
      setCounts(p => ({ ...p, visitors: vis })); 
    }, 30);

    let rate = 0;
    const rateI = setInterval(() => { 
      rate += 0.1; 
      if (rate >= 4.9) { rate = 4.9; clearInterval(rateI); } 
      setCounts(p => ({ ...p, rating: parseFloat(rate.toFixed(1)) })); 
    }, 40);

    let photo = 0;
    const photoI = setInterval(() => { 
      photo += 20000; 
      if (photo >= 500000) { photo = 500000; clearInterval(photoI); } 
      setCounts(p => ({ ...p, photos: photo })); 
    }, 25);
  };

  // 🎬 TIMELINE CINEMÁTICO ÉPICO CON VIDEO SCRUB
  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const videoWrapper = videoWrapperRef.current;
    const video = videoRef.current;
    const contentColumn = contentColumnRef.current;
    const subtitle = subtitleRef.current;
    const description = descriptionRef.current;
    const cta = ctaRef.current;
    const statsContainer = statsContainerRef.current;

    if (!section || !video || !title) return;

    let ctx;
    let rafId;

    const initCinematicTimeline = () => {
      // 🎬 ESPERAR A QUE EL VIDEO ESTÉ CARGADO
      const waitForVideo = new Promise((resolve) => {
        if (video.readyState >= 2) {
          resolve();
        } else {
          video.addEventListener('loadeddata', resolve, { once: true });
          // Timeout por si el video no carga
          setTimeout(resolve, 3000);
        }
      });

      waitForVideo.then(() => {
        video.pause();
        video.currentTime = 0;
        
        // Duración del video (ajustar según tu video real)
        const videoDuration = video.duration || 10;
        
        console.log('🎬 Video Wonderpop cargado:', {
          duration: video.duration,
          usedDuration: videoDuration,
          readyState: video.readyState
        });

        ctx = gsap.context(() => {
          
          // 🎯 TIMELINE PRINCIPAL CON PIN - Video Scrub Épico
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "+=450%", // Largo para dar tiempo a todas las animaciones
              pin: true,
              scrub: 0.8,
              anticipatePin: 1,
              onUpdate: (self) => {
                // 🎬 VIDEO SCRUB - Sincronizado con scroll (18% - 75%)
                const progress = self.progress;
                
                if (progress >= 0.18 && progress <= 0.75) {
                  const videoProgress = (progress - 0.18) / 0.57;
                  const targetTime = videoProgress * videoDuration;
                  
                  if (Math.abs(video.currentTime - targetTime) > 0.02) {
                    video.currentTime = targetTime;
                  }
                }

                // Iniciar contadores cuando llegamos a las stats (80%)
                if (progress >= 0.80 && !countersStarted) {
                  animateCounters();
                }
              }
            }
          });

          // ═══════════════════════════════════════════════════════════
          // FASE 1: TÍTULO "WONDERPOP PLAZA" ZOOM-IN ÉPICO (0% - 15%)
          // ═══════════════════════════════════════════════════════════
          tl.fromTo(title,
            {
              scale: 0.15,
              opacity: 0,
              y: 50,
              filter: "blur(20px)"
            },
            {
              scale: 1,
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              duration: 0.15,
              ease: "back.out(1.4)"
            }, 0
          );

          // ═══════════════════════════════════════════════════════════
          // FASE 2: TÍTULO SE MUEVE ARRIBA + SE REDUCE (15% - 25%)
          // ═══════════════════════════════════════════════════════════
          tl.to(title,
            {
              scale: 0.45,
              y: "-38vh",
              duration: 0.10,
              ease: "power2.inOut"
            }, 0.15
          );

          // ═══════════════════════════════════════════════════════════
          // FASE 3: VIDEO APARECE CON BLUR-TO-SHARP (18% - 35%)
          // ═══════════════════════════════════════════════════════════
          tl.fromTo(videoWrapper,
            {
              opacity: 0,
              scale: 0.85,
              x: "0%"
            },
            {
              opacity: 1,
              scale: 1,
              x: "0%",
              duration: 0.12,
              ease: "power2.out"
            }, 0.18
          );

          // Blur to sharp en el video
          tl.fromTo(video,
            {
              filter: "blur(30px) brightness(0.5)"
            },
            {
              filter: "blur(0px) brightness(1)",
              duration: 0.12,
              ease: "power2.out"
            }, 0.18
          );

          // ═══════════════════════════════════════════════════════════
          // FASE 4: VIDEO SE MUEVE A LA IZQUIERDA (30% - 40%)
          // ═══════════════════════════════════════════════════════════
          tl.to(videoWrapper,
            {
              x: "-22%",
              scale: 0.9,
              duration: 0.10,
              ease: "power2.inOut"
            }, 0.30
          );

          // ═══════════════════════════════════════════════════════════
          // FASE 5: CONTENIDO APARECE A LA DERECHA (38% - 55%)
          // ═══════════════════════════════════════════════════════════
          // Columna de contenido
          tl.fromTo(contentColumn,
            {
              opacity: 0,
              x: 100,
              filter: "blur(10px)"
            },
            {
              opacity: 1,
              x: 0,
              filter: "blur(0px)",
              duration: 0.10,
              ease: "power2.out"
            }, 0.38
          );

          // Subtítulo
          if (subtitle) {
            tl.fromTo(subtitle,
              { opacity: 0, y: 30 },
              { opacity: 1, y: 0, duration: 0.06, ease: "power2.out" }, 0.42
            );
          }

          // Descripción
          if (description) {
            tl.fromTo(description,
              { opacity: 0, y: 25 },
              { opacity: 1, y: 0, duration: 0.06, ease: "power2.out" }, 0.46
            );
          }

          // ═══════════════════════════════════════════════════════════
          // FASE 6: HIGHLIGHTS APARECEN UNO A UNO (50% - 65%)
          // ═══════════════════════════════════════════════════════════
          const highlightItems = highlightItemsRef.current.filter(Boolean);
          highlightItems.forEach((item, index) => {
            tl.fromTo(item,
              {
                opacity: 0,
                x: 60,
                scale: 0.9
              },
              {
                opacity: 1,
                x: 0,
                scale: 1,
                duration: 0.04,
                ease: "back.out(1.3)"
              }, 0.50 + (index * 0.035)
            );
          });

          // CTA Button
          if (cta) {
            tl.fromTo(cta,
              { opacity: 0, y: 25, scale: 0.95 },
              { opacity: 1, y: 0, scale: 1, duration: 0.06, ease: "back.out(1.2)" }, 0.66
            );
          }

          // ═══════════════════════════════════════════════════════════
          // FASE 7: VIDEO Y CONTENIDO CONTINÚAN (65% - 75%)
          // ═══════════════════════════════════════════════════════════
          tl.to({}, { duration: 0.10 }, 0.65);

          // ═══════════════════════════════════════════════════════════
          // FASE 8: TRANSICIÓN A STATS - Video y contenido hacen fade (75% - 82%)
          // ═══════════════════════════════════════════════════════════
          tl.to([videoWrapper, contentColumn, title],
            {
              opacity: 0,
              y: -40,
              scale: 0.95,
              filter: "blur(8px)",
              duration: 0.07,
              ease: "power2.in"
            }, 0.75
          );

          // ═══════════════════════════════════════════════════════════
          // FASE 9: STATS APARECEN ÉPICAMENTE (80% - 100%)
          // ═══════════════════════════════════════════════════════════
          if (statsContainer) {
            tl.fromTo(statsContainer,
              { opacity: 0, y: 60, scale: 0.9 },
              { opacity: 1, y: 0, scale: 1, duration: 0.08, ease: "power2.out" }, 0.80
            );
          }

          // Stats cards con stagger
          const statCards = statCardsRef.current.filter(Boolean);
          statCards.forEach((card, index) => {
            tl.fromTo(card,
              {
                opacity: 0,
                y: 50,
                scale: 0.8,
                rotateX: 15
              },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                rotateX: 0,
                duration: 0.05,
                ease: "back.out(1.4)"
              }, 0.83 + (index * 0.03)
            );
          });

        }, section);
      });
    };

    rafId = requestAnimationFrame(() => {
      setTimeout(initCinematicTimeline, 150);
    });

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (ctx) ctx.revert();
    };
  }, [countersStarted]);

  return (
    <section ref={sectionRef} className={styles.wonderpopSection}>
      {/* Fondo oscuro con gradiente */}
      <div className={styles.darkBackground}></div>

      {/* Partículas/estrellas decorativas */}
      <div className={styles.particles}>
        <div className={styles.particle}></div>
        <div className={styles.particle}></div>
        <div className={styles.particle}></div>
        <div className={styles.particle}></div>
        <div className={styles.particle}></div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          TÍTULO GIGANTE "WONDERPOP PLAZA"
      ══════════════════════════════════════════════════════════ */}
      <div ref={titleRef} className={styles.heroTitle}>
        <h2 className={styles.titleText}>
          <span className={styles.titleIcon}>✨</span>
          Wonderpop Plaza
          <span className={styles.titleIcon}>✨</span>
        </h2>
        <p className={styles.tagline}>
          {ingles ? "The official heart of Magic Drink" : "El corazón oficial de Magic Drink"}
        </p>
      </div>

      {/* ══════════════════════════════════════════════════════════
          VIDEO SCRUB + CONTENIDO LAYOUT
      ══════════════════════════════════════════════════════════ */}
      <div className={styles.contentLayout}>
        {/* Video a la izquierda */}
        <div ref={videoWrapperRef} className={styles.videoWrapper}>
          <video 
            ref={videoRef}
            className={styles.video}
            muted
            playsInline
            preload="auto"
            poster="/image/wonderpop/wonderpop-poster.png"
          >
            <source src="/videos/wonderpop.mp4" type="video/mp4" />
          </video>
          <div className={styles.videoOverlay}></div>
          <div className={styles.videoGlow}></div>
          <div className={styles.videoFrame}></div>
        </div>

        {/* Contenido a la derecha */}
        <div ref={contentColumnRef} className={styles.contentColumn}>
          <h3 ref={subtitleRef} className={styles.subtitle}>
            {ingles 
              ? "More than a store. A Magic Drink world." 
              : "Más que una tienda. Un mundo Magic Drink."}
          </h3>
          
          <p ref={descriptionRef} className={styles.description}>
            {ingles ? (
              <>
                Wonderpop Plaza is the official shopping center of Magic Drink. 
                A space where the drink, music and creativity meet in one place.
                Here special editions are born, exclusive events and unique experiences.
              </>
            ) : (
              <>
                Wonderpop Plaza es el centro comercial oficial de Magic Drink. 
                Un espacio donde la bebida, la música y la creatividad se encuentran.
                Aquí nacen ediciones especiales, eventos exclusivos y experiencias únicas.
              </>
            )}
          </p>
          
          {/* Highlights */}
          <ul ref={highlightsRef} className={styles.highlights}>
            {highlights.map((item, index) => (
              <li 
                key={index}
                ref={el => highlightItemsRef.current[index] = el}
                className={styles.highlightItem}
              >
                <div className={styles.iconWrapper}>
                  <img src={item.icon} alt="" className={styles.icon} loading="lazy" />
                </div>
                <span className={styles.highlightText}>
                  {ingles ? item.textEn : item.textEs}
                </span>
              </li>
            ))}
          </ul>
          
          {/* CTA */}
          <div ref={ctaRef} className={styles.ctaWrapper}>
            <a href="/wonderpop" className={styles.ctaButton}>
              <span className={styles.ctaIcon}>📍</span>
              <span className={styles.ctaText}>
                {ingles ? "Explore Wonderpop Plaza" : "Explorar Wonderpop Plaza"}
              </span>
              <span className={styles.ctaArrow}>→</span>
            </a>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          STATS GRID - Aparece después del video
      ══════════════════════════════════════════════════════════ */}
      <div ref={statsContainerRef} className={styles.statsContainer}>
        <h3 className={styles.statsTitle}>
          {ingles ? "Our Global Impact" : "Nuestro Impacto Global"}
        </h3>
        <div className={styles.statsGrid}>
          <div ref={el => statCardsRef.current[0] = el} className={styles.statCard}>
            <div className={styles.statNumber}>{counts.locations}</div>
            <div className={styles.statLabel}>
              {ingles ? "Global locations" : "Ubicaciones globales"}
            </div>
            <div className={styles.statIcon}>🌍</div>
          </div>
          
          <div ref={el => statCardsRef.current[1] = el} className={styles.statCard}>
            <div className={styles.statNumber}>{(counts.visitors / 1000000).toFixed(1)}M+</div>
            <div className={styles.statLabel}>
              {ingles ? "Monthly visitors" : "Visitantes mensuales"}
            </div>
            <div className={styles.statIcon}>👥</div>
          </div>
          
          <div ref={el => statCardsRef.current[2] = el} className={styles.statCard}>
            <div className={styles.statNumber}>
              {counts.rating} <span className={styles.starIcon}>⭐</span>
            </div>
            <div className={styles.statLabel}>
              {ingles ? "Average rating" : "Calificación promedio"}
            </div>
            <div className={styles.statIcon}>💫</div>
          </div>
          
          <div ref={el => statCardsRef.current[3] = el} className={styles.statCard}>
            <div className={styles.statNumber}>{(counts.photos / 1000).toFixed(0)}K+</div>
            <div className={styles.statLabel}>
              {ingles ? "Photos shared" : "Fotos compartidas"}
            </div>
            <div className={styles.statIcon}>📸</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndexSeccion6;
