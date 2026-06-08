import React from 'react';
import { useStore } from '@nanostores/react';
import { isEnglish, isDarkMode } from '../../../data/variables';
import styles from '../css/indexSeccion1.module.css';
import CtaCard from '../../global/CtaCard';
import Button from '../../global/Button';
import SplashCursor from '../../global/SplashCursor';

// ReactBits Animations
import BlurText from '../../global/animations/BlurText/BlurText';

const createParticleStyle = (index, variant) => {
  const seed = (index + 1) * (variant * 37);
  const left = (seed * 29) % 100;
  const top = (seed * 47) % 100;
  const delay = ((seed * 13) % 60) / 10;
  const duration = 3 + ((seed * 17) % 40) / 10;

  return {
    left: `${left}%`,
    top: `${top}%`,
    animationDelay: `${delay}s`,
    animationDuration: `${duration}s`
  };
};

const starParticles = Array.from({ length: 12 }, (_, i) => createParticleStyle(i, 1));
const bubbleParticles = Array.from({ length: 8 }, (_, i) => {
  const style = createParticleStyle(i, 2);
  return {
    left: style.left,
    animationDelay: style.animationDelay,
    animationDuration: `${4 + i * 0.28}s`
  };
});
const noteParticles = Array.from({ length: 6 }, (_, i) => ({
  ...createParticleStyle(i, 3),
  animationDuration: `${5 + i * 0.42}s`
}));

const IndexSeccion1 = () => {
  const ingles = useStore(isEnglish);
  const darkMode = useStore(isDarkMode);

  const content = {
    es: {
      h1: "La bebida más popular del mundo",
      subtitle: "Sabor único, cero cafeína y una chispa de felicidad en cada burbuja. Magic Drink ilumina tus días con el poder de la música.",
      ctaPrimary: "Ver Sabores",
      ctaSecondary: "Conoce a Hexy",
      scrollText: "Desliza, disfruta la magia"
    },
    en: {
      h1: "The world's most popular drink",
      subtitle: "Unique flavor, zero caffeine and a spark of happiness in every bubble. Magic Drink lights up your days with the power of music.",
      ctaPrimary: "See Flavors",
      ctaSecondary: "Meet Hexy",
      scrollText: "Swipe and discover the magic"
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
    <>
      {/* SplashCursor global: fuera de la máscara del hero para que no se corte. */}
      <SplashCursor
        SPLAT_RADIUS={0.18}
        DENSITY_DISSIPATION={2.15}
        VELOCITY_DISSIPATION={1.55}
        COLOR_UPDATE_SPEED={15}
        CURL={5}
        SPLAT_FORCE={7200}
        zIndex={2}
        opacity={0.68}
        mixBlendMode="screen"
      />

      <section className={`${styles.heroSection} ${!darkMode ? styles.heroSectionLight : ''}`}>
        <div className={styles.heroClip}>
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
          {starParticles.map((style, i) => (
            <div key={`star-${i}`} className={`${styles.particle} ${styles.star}`} style={style}>✦</div>
          ))}
          
          {/* Burbujas */}
          {bubbleParticles.map((style, i) => (
            <div key={`bubble-${i}`} className={`${styles.particle} ${styles.bubble}`} style={style}></div>
          ))}
          
          {/* Notas Musicales */}
          {noteParticles.map((style, i) => (
            <div key={`note-${i}`} className={`${styles.particle} ${styles.musicNote}`} style={style}>♪</div>
          ))}
        </div>

        {/* Contenido Principal */}
        <div className={styles.heroContent}>
          {/* Headline Principal Kawaii con Sparkle */}
          <h1 className={styles.heroTitle}>
            <div className={styles.titleLine}>
              <BlurText
                text={ingles ? "The world's" : "La bebida"}
                delay={50}
                animateBy="words"
                direction="bottom"
                className={styles.titlePart1}
              />
            </div>
            <div className={styles.titleLine}>
              <BlurText
                text={ingles ? "most popular" : "más popular"}
                delay={70}
                animateBy="words"
                direction="bottom"
                className={styles.titlePart2}
              />
            </div>
            <div className={styles.titleLine}>
              <BlurText
                text={ingles ? "drink" : "del mundo"}
                delay={90}
                animateBy="words"
                direction="bottom"
                className={styles.titlePart3}
              />
            </div>
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
              variant="magic"
              size="lg"
              showArrow={true}
            />
            <Button
              textEs={t.ctaSecondary}
              textEn={t.ctaSecondary}
              href="/hexy"
              variant="magic"
              size="lg"
              showArrow={false}
            />
          </div>
        </div>

     
        {/* Scroll Indicator con Estrella */}
        <div className={styles.scrollIndicator}>
          <span className={styles.scrollText}>{t.scrollText}</span>
          <div className={styles.iconicStar}>
            <img src="/favicon.webp" alt="Magic Drink Star" />
          </div>
        </div>
          </div>
      </div>
    </section>
    </>
  );
};

export default IndexSeccion1;
