import React, { useEffect, useRef } from 'react';
import { useStore } from '@nanostores/react';
import { isEnglish } from '../../../data/variables';
import styles from '../css/indexSeccion3.module.css';
import Button from '../../global/Button';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Registrar ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const IndexSeccion3 = () => {
  const ingles = useStore(isEnglish);
  const sectionRef = useRef(null);
  const triggerRef = useRef(null);
  const horizontalRef = useRef(null);
  
  const content = {
    es: {
      sectionTitle: "Descubre Nuestros Sabores",
      sectionSubtitle: "Cada lata es una chispa de alegría mágica",
      cta: "Ver todos los sabores",
      endTitle: "¿Cuál será tu favorito?",
      endSubtitle: "6 sabores únicos esperándote",
      flavors: [
        {
          name: "Magic Original",
          tagline: "El clásico que lo empezó todo",
          description: "Notas frutales moradas con una frescura imposible de describir. Sin cafeína, pero con toda la energía.",
          color: "#AA37F2",
          accentColor: "#FF6AD7",
          image: "/image/drinks/lata_original.png",
          stats: { energy: "100%", taste: "Clásico", vibe: "Mágico" }
        },
        {
          name: "Witchy Kiwi",
          tagline: "Un hechizo de frescura",
          description: "Refrescante, chispeante y con un toque travieso de kiwi encantado.",
          color: "#7ED957",
          accentColor: "#98FFDE",
          image: "/image/drinks/lata_kiwi.png",
          stats: { energy: "95%", taste: "Tropical", vibe: "Místico" }
        },
        {
          name: "Sparkle Soda",
          tagline: "Luz de estrellas líquida",
          description: "Burbujas mágicas con sabor a felicidad y luz de estrellas.",
          color: "#82D2FF",
          accentColor: "#F9F871",
          image: "/image/drinks/lata_sparkle.png",
          stats: { energy: "98%", taste: "Estelar", vibe: "Brillante" }
        },
        {
          name: "Banana Drama",
          tagline: "Explosión tropical dramática",
          description: "Explosiva, tropical y con más personalidad que cualquier banana ordinaria.",
          color: "#FFE066",
          accentColor: "#FF6AD7",
          image: "/image/drinks/lata_banana.png",
          stats: { energy: "110%", taste: "Tropical", vibe: "Intenso" }
        },
        {
          name: "Bubble Tape",
          tagline: "Nostalgia rosa chicle",
          description: "Dulzura rosa chicle con un torbellino de nostalgia mágica.",
          color: "#FF6AD7",
          accentColor: "#82D2FF",
          image: "/image/drinks/lata_bubble.png",
          stats: { energy: "92%", taste: "Dulce", vibe: "Retro" }
        },
        {
          name: "Dragon Grape",
          tagline: "El rugido de la uva",
          description: "La uva más intensa del reino mágico, con carácter y un rugido dulce.",
          color: "#9B4DCA",
          accentColor: "#FF6AD7",
          image: "/image/drinks/lata_dragon.png",
          stats: { energy: "105%", taste: "Intenso", vibe: "Épico" }
        }
      ]
    },
    en: {
      sectionTitle: "Discover Our Flavors",
      sectionSubtitle: "Every can is a spark of magical joy",
      cta: "See all flavors",
      endTitle: "Which one will be your favorite?",
      endSubtitle: "6 unique flavors waiting for you",
      flavors: [
        {
          name: "Magic Original",
          tagline: "The classic that started it all",
          description: "Purple fruity notes with an indescribable freshness. No caffeine, but all the energy.",
          color: "#AA37F2",
          accentColor: "#FF6AD7",
          image: "/image/drinks/lata_original.png",
          stats: { energy: "100%", taste: "Classic", vibe: "Magical" }
        },
        {
          name: "Witchy Kiwi",
          tagline: "A spell of freshness",
          description: "Refreshing, sparkling and with a mischievous touch of enchanted kiwi.",
          color: "#7ED957",
          accentColor: "#98FFDE",
          image: "/image/drinks/lata_kiwi.png",
          stats: { energy: "95%", taste: "Tropical", vibe: "Mystical" }
        },
        {
          name: "Sparkle Soda",
          tagline: "Liquid starlight",
          description: "Magical bubbles with a taste of happiness and starlight.",
          color: "#82D2FF",
          accentColor: "#F9F871",
          image: "/image/drinks/lata_sparkle.png",
          stats: { energy: "98%", taste: "Stellar", vibe: "Bright" }
        },
        {
          name: "Banana Drama",
          tagline: "Dramatic tropical explosion",
          description: "Explosive, tropical and with more personality than any ordinary banana.",
          color: "#FFE066",
          accentColor: "#FF6AD7",
          image: "/image/drinks/lata_banana.png",
          stats: { energy: "110%", taste: "Tropical", vibe: "Intense" }
        },
        {
          name: "Bubble Tape",
          tagline: "Pink bubblegum nostalgia",
          description: "Pink bubblegum sweetness with a whirlwind of magical nostalgia.",
          color: "#FF6AD7",
          accentColor: "#82D2FF",
          image: "/image/drinks/lata_bubble.png",
          stats: { energy: "92%", taste: "Sweet", vibe: "Retro" }
        },
        {
          name: "Dragon Grape",
          tagline: "The grape's roar",
          description: "The most intense grape in the magical kingdom, with character and a sweet roar.",
          color: "#9B4DCA",
          accentColor: "#FF6AD7",
          image: "/image/drinks/lata_dragon.png",
          stats: { energy: "105%", taste: "Intense", vibe: "Epic" }
        }
      ]
    }
  };
  
  const t = ingles ? content.en : content.es;

  // GSAP ScrollTrigger - Scroll Horizontal
  useEffect(() => {
    const section = sectionRef.current;
    const horizontal = horizontalRef.current;
    const trigger = triggerRef.current;
    
    if (!section || !horizontal || !trigger) return;

    let ctx;
    let rafId;
    
    // Función para inicializar ScrollTrigger
    const initScrollTrigger = () => {
      // Calcular el ancho total del scroll horizontal
      const totalWidth = horizontal.scrollWidth - window.innerWidth;

      ctx = gsap.context(() => {
        // Crear el ScrollTrigger para el efecto horizontal
        const scrollTween = gsap.to(horizontal, {
          x: -totalWidth,
          ease: "none",
          scrollTrigger: {
            trigger: trigger,
            start: "top top",
            end: () => `+=${horizontal.scrollWidth - window.innerWidth}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            // Importante: onRefresh para sincronizar alturas
            onRefresh: (self) => {
              // Asegurar que la sección padre tenga la altura correcta
              const scrollDistance = self.end - self.start;
              section.style.minHeight = `${scrollDistance + window.innerHeight}px`;
            },
          }
        });

        // Animaciones de entrada para cada card
        const cards = horizontal.querySelectorAll(`.${styles.flavorCard}`);
        cards.forEach((card) => {
          gsap.fromTo(card.querySelector(`.${styles.canImage}`), 
            { scale: 0.8, rotation: -10, opacity: 0.5 },
            {
              scale: 1,
              rotation: 0,
              opacity: 1,
              duration: 1,
              scrollTrigger: {
                trigger: card,
                start: "left 90%",
                end: "left 50%",
                scrub: true,
                containerAnimation: scrollTween,
              }
            }
          );
        });
      }, sectionRef);
    };

    // Esperar a que el DOM esté completamente renderizado
    // Usamos múltiples estrategias para asegurar compatibilidad cross-browser
    const waitForLayout = () => {
      // 1. Esperar al siguiente frame de animación
      rafId = requestAnimationFrame(() => {
        // 2. Pequeño timeout adicional para Chrome/Edge
        setTimeout(() => {
          initScrollTrigger();
          
          // 3. Refresh adicional después de que las imágenes carguen
          const images = horizontal.querySelectorAll('img');
          let loadedImages = 0;
          const totalImages = images.length;
          
          if (totalImages === 0) {
            ScrollTrigger.refresh();
            return;
          }
          
          images.forEach((img) => {
            if (img.complete) {
              loadedImages++;
              if (loadedImages === totalImages) {
                ScrollTrigger.refresh();
              }
            } else {
              img.addEventListener('load', () => {
                loadedImages++;
                if (loadedImages === totalImages) {
                  ScrollTrigger.refresh();
                }
              }, { once: true });
            }
          });
        }, 100);
      });
    };

    // Verificar si el documento ya está cargado
    if (document.readyState === 'complete') {
      waitForLayout();
    } else {
      window.addEventListener('load', waitForLayout, { once: true });
    }

    // Cleanup
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      {/* Fondo con orbes flotantes */}
      <div className={styles.backgroundOrbs}>
        <div className={styles.orb1}></div>
        <div className={styles.orb2}></div>
        <div className={styles.orb3}></div>
      </div>

      {/* Contenedor del trigger para el pin */}
      <div ref={triggerRef} className={styles.horizontalTrigger}>
        {/* Track horizontal con las cards */}
        <div ref={horizontalRef} className={styles.horizontalTrack}>
          
          {/* Panel Intro */}
          <div className={styles.introPanel}>
            <div className={styles.introContent}>
              <span className={styles.introTag}>✨ {ingles ? "The Collection" : "La Colección"}</span>
              <h2 className={styles.introTitle}>{t.sectionTitle}</h2>
              <p className={styles.introSubtitle}>{t.sectionSubtitle}</p>
              <div className={styles.scrollHint}>
                <span>{ingles ? "Scroll to explore" : "Desliza para explorar"}</span>
                <div className={styles.scrollArrow}>→</div>
              </div>
            </div>
          </div>

          {/* Cards de Sabores */}
          {t.flavors.map((flavor, index) => (
            <div 
              key={index} 
              className={styles.flavorCard}
              style={{
                '--flavor-color': flavor.color,
                '--flavor-accent': flavor.accentColor,
              }}
            >
              {/* Número del sabor */}
              <div className={styles.flavorNumber}>
                <span>0{index + 1}</span>
              </div>

              {/* Contenido de la card */}
              <div className={styles.cardContent}>
                {/* Lado izquierdo - Info */}
                <div className={styles.cardInfo}>
                  <span className={styles.flavorTagline}>{flavor.tagline}</span>
                  <h3 className={styles.flavorName}>{flavor.name}</h3>
                  <p className={styles.flavorDescription}>{flavor.description}</p>
                  
                  {/* Stats del sabor */}
                  <div className={styles.flavorStats}>
                    <div className={styles.statItem}>
                      <span className={styles.statLabel}>{ingles ? "Energy" : "Energía"}</span>
                      <span className={styles.statValue}>{flavor.stats.energy}</span>
                    </div>
                    <div className={styles.statItem}>
                      <span className={styles.statLabel}>{ingles ? "Taste" : "Sabor"}</span>
                      <span className={styles.statValue}>{flavor.stats.taste}</span>
                    </div>
                    <div className={styles.statItem}>
                      <span className={styles.statLabel}>Vibe</span>
                      <span className={styles.statValue}>{flavor.stats.vibe}</span>
                    </div>
                  </div>
                </div>

                {/* Lado derecho - Imagen */}
                <div className={styles.cardVisual}>
                  <div className={styles.canContainer}>
                    {/* Glow de fondo */}
                    <div className={styles.canGlow}></div>
                    {/* Círculos orbitales */}
                    <div className={styles.orbitRing}></div>
                    <div className={styles.orbitRing2}></div>
                    {/* La lata */}
                    <img 
                      src={flavor.image} 
                      alt={flavor.name}
                      className={styles.canImage}
                    />
                    {/* Partículas */}
                    <div className={styles.particles}>
                      {[...Array(8)].map((_, i) => (
                        <span 
                          key={i} 
                          className={styles.particle}
                          style={{ '--i': i }}
                        >✦</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Decoración de esquina */}
              <div className={styles.cornerDecor}>
                <span>Magic Drink</span>
              </div>
            </div>
          ))}

          {/* Panel Final / CTA */}
          <div className={styles.endPanel}>
            <div className={styles.endContent}>
              <h3 className={styles.endTitle}>{t.endTitle}</h3>
              <p className={styles.endSubtitle}>{t.endSubtitle}</p>
              <Button
                textEs={t.cta}
                textEn={t.cta}
                href="/bebidas"
                variant="magic"
                size="lg"
                showArrow={true}
              />
            </div>
            {/* Colección mini de todas las latas */}
            <div className={styles.miniCollection}>
              {t.flavors.map((flavor, i) => (
                <img 
                  key={i}
                  src={flavor.image} 
                  alt={flavor.name}
                  className={styles.miniCan}
                  style={{ '--delay': `${i * 0.1}s` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndexSeccion3;
