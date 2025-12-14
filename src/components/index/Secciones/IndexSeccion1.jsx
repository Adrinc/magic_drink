import React from 'react';
import { useStore } from '@nanostores/react';
import { isEnglish, isDarkMode } from '../../../data/variables';
import styles from '../css/indexSeccion1.module.css';
import CtaCard from '../../global/CtaCard';
import Button from '../../global/Button';

const IndexSeccion1 = () => {
  const ingles = useStore(isEnglish);
  const darkMode = useStore(isDarkMode);

  const content = {
    es: {
      h1: "La bebida más popular del mundo",
      subtitle: "Sabor único, cero cafeína y una chispa de felicidad en cada burbuja. Magic Drink ilumina tus días con el poder de la música.",
      ctaPrimary: "Ver Sabores",
      ctaSecondary: "Conoce a Hexy"
    },
    en: {
      h1: "The world's most popular drink",
      subtitle: "Unique flavor, zero caffeine and a spark of happiness in every bubble. Magic Drink lights up your days with the power of music.",
      ctaPrimary: "See Flavors",
      ctaSecondary: "Meet Hexy"
    }
  };

  const t = ingles ? content.en : content.es;

  // Efecto spotlight con cursor
  React.useEffect(() => {
    const handleMouseMove = (e) => {
      const spotlight = document.querySelector(`.${styles.spotlightReveal}`);
      if (spotlight) {
        const x = (e.clientX / window.innerWidth) * 100;
        const y = (e.clientY / window.innerHeight) * 100;
        spotlight.style.setProperty('--mouse-x', `${x}%`);
        spotlight.style.setProperty('--mouse-y', `${y}%`);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className={`${styles.heroSection} ${!darkMode ? styles.heroSectionLight : ''}`}>
      <div className={styles.heroContainer}>
        {/* Imagen de Fondo con Efecto Spotlight */}
        <div className={styles.backgroundImageLayer}>
          <div className={styles.backgroundImage}></div>
          <div className={styles.spotlightReveal}></div>
        </div>

        {/* Gradiente Animado de Fondo */}
        <div className={styles.animatedBackground}></div>

        {/* Partículas Flotantes Kawaii */}
        <div className={styles.particlesContainer}>
          {/* Estrellas */}
          {[...Array(12)].map((_, i) => (
            <div key={`star-${i}`} className={`${styles.particle} ${styles.star}`} style={{ 
              left: `${Math.random() * 100}%`, 
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}>⭐</div>
          ))}
          
          {/* Burbujas */}
          {[...Array(8)].map((_, i) => (
            <div key={`bubble-${i}`} className={`${styles.particle} ${styles.bubble}`} style={{ 
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${4 + Math.random() * 3}s`
            }}></div>
          ))}
          
          {/* Notas Musicales */}
          {[...Array(6)].map((_, i) => (
            <div key={`note-${i}`} className={`${styles.particle} ${styles.musicNote}`} style={{ 
              left: `${Math.random() * 100}%`, 
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${5 + Math.random() * 4}s`
            }}>♪</div>
          ))}
        </div>

        {/* Estrella Icónica 3D Flotante (Favicon Oficial) */}
        <div className={styles.iconicStar}>
          <img src="/favicon.png" alt="Magic Drink Star" />
        </div>

        {/* Contenido Principal */}
        <div className={styles.heroContent}>
          {/* Headline Principal Kawaii con Sparkle */}
          <h1 className={styles.heroTitle}>
            <span className={styles.titleText}>{t.h1}</span>
            <span className={styles.sparkle}></span>
          </h1>
          
          {/* Subtítulo Mágico */}
          <p className={styles.heroSubtitle}>{t.subtitle}</p>

          {/* CTAs Principales */}
          <div className={styles.ctaGroup}>
            <Button
              textEs={t.ctaPrimary}
              textEn={t.ctaPrimary}
              href="/bebidas"
              variant="primary"
              size="lg"
              showArrow={true}
            />
            <Button
              textEs={t.ctaSecondary}
              textEn={t.ctaSecondary}
              href="/hexy"
              variant="secondary"
              size="lg"
              showArrow={false}
            />
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className={styles.scrollIndicator}>
          <span className={styles.scrollText}>{ingles ? 'Scroll to discover' : 'Desliza para descubrir'}</span>
          <div className={styles.scrollIcon}>
            <div className={styles.scrollDot}></div>
          </div>
        </div>
      </div>

      {/* Ondas SVG de Transición Realistas (Múltiples Capas) */}
      <div className={styles.waveTransition}>
        <svg viewBox="0 0 1200 150" preserveAspectRatio="none" className={styles.waveSvg}>
          {/* Ola 1 - Más profunda */}
          <path 
            d="M0,80 C200,100 400,60 600,80 C800,100 1000,60 1200,80 L1200,150 L0,150 Z" 
            className={`${styles.wavePath} ${styles.wave1}`} 
          />
          {/* Ola 2 - Media */}
          <path 
            d="M0,90 C250,110 350,70 600,90 C850,110 950,70 1200,90 L1200,150 L0,150 Z" 
            className={`${styles.wavePath} ${styles.wave2}`} 
          />
          {/* Ola 3 - Superior */}
          <path 
            d="M0,100 C300,120 400,80 600,100 C800,120 900,80 1200,100 L1200,150 L0,150 Z" 
            className={`${styles.wavePath} ${styles.wave3}`} 
          />
        </svg>
      </div>
    </section>
  );
};

export default IndexSeccion1;
