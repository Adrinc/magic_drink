import { useStore } from '@nanostores/react';
import { isEnglish } from '../../../data/variables';
import styles from '../css/indexSeccion1.module.css';

const IndexSeccion1 = () => {
  const ingles = useStore(isEnglish);

  const content = {
    es: {
      h1Line1: "Digital by design.",
      h1Line2: "Creative con corazón.",
      subtitle: "We turn bold ideas into ROI-driven campaigns that move culture—and your business—forward.",
      cta: "Book a Free Strategy Call"
    },
    en: {
      h1Line1: "Digital by design.",
      h1Line2: "Creative con corazón.",
      subtitle: "We turn bold ideas into ROI-driven campaigns that move culture—and your business—forward.",
      cta: "Book a Free Strategy Call"
    }
  };

  const t = ingles ? content.en : content.es;

  return (
    <section className={styles.heroSection}>
      <div className={styles.heroContainer}>
        {/* Video de Fondo */}
        <div className={styles.videoBackground}>
          <video autoPlay muted loop playsInline className={styles.video}>
            <source src='/videos/v_bg_1.mp4' type='video/mp4' />
          </video>
          <div className={styles.videoOverlay}></div>
        </div>

        {/* Partículas Flotantes de Fondo */}
        <div className={styles.particlesContainer}>
          {[...Array(30)].map((_, i) => (
            <div 
              key={i} 
              className={styles.particle}
              style={{
                '--x': `${Math.random() * 100}%`,
                '--y': `${Math.random() * 100}%`,
                '--duration': `${15 + Math.random() * 15}s`,
                '--delay': `${Math.random() * 5}s`,
                '--size': `${2 + Math.random() * 4}px`
              }}
            ></div>
          ))}
        </div>

        {/* Contenido Principal */}
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            <span className={styles.titleLine1}>{t.h1Line1}</span>
            <span className={styles.titleLine2}>{t.h1Line2}</span>
          </h1>
          
          <p className={styles.heroSubtitle}>{t.subtitle}</p>

          <div className={styles.ctaGroup}>
            <button className={styles.btnPrimary}>
              <span className={styles.ctaText}>{t.cta}</span>
              <span className={styles.ctaArrow}>→</span>
            </button>
          </div>

          <div className={styles.energyBrand}>
            <span className={styles.brandLine}>Let's Start Your Story with </span>
            <span className={styles.brandName}>Energy</span>
            <span className={styles.brandExclaim}>!</span>
          </div>
        </div>

        {/* Degradado de Transición a Siguiente Sección (BLANCO) */}
       {/*  <div className={styles.transitionGradient}></div> */}

        {/* Scroll Indicator */}
        <div className={styles.scrollIndicator}>
          <span className={styles.scrollText}>{ingles ? 'Scroll down' : 'Desliza hacia abajo'}</span>
          <div className={styles.scrollIcon}></div>
        </div>
      </div>
    </section>
  );
};

export default IndexSeccion1;
