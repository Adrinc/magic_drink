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
      h1Line1: "Digital by design,",
      h1Line2: "Creative con corazón.",
      subtitle: "We turn bold ideas into ROI-driven campaigns that move culture—and your business—forward."
    },
    en: {
      h1Line1: "Digital by design.",
      h1Line2: "Creative con corazón.",
      subtitle: "We turn bold ideas into ROI-driven campaigns that move culture—and your business—forward."
    }
  };

  const t = ingles ? content.en : content.es;

  return (
    <section className={`${styles.heroSection} ${!darkMode ? styles.heroSectionLight : ''}`}>
      <div className={styles.heroContainer}>
        {/* Video de Fondo */}
        <div className={styles.videoBackground}>
          <video autoPlay muted loop playsInline className={styles.video}>
            <source src='/videos/v_bg_3.mp4' type='video/mp4' />
          </video>
          <div className={styles.transitionGradient}></div>
        </div>

        {/* Contenido Principal */}
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            <span className={styles.titleLine1}>{t.h1Line1}</span>
            <span className={styles.titleLine2}>{t.h1Line2}</span>
          </h1>
          
      {/*     <p className={styles.heroSubtitle}>{t.subtitle}</p> */}


          <div className={styles.energyBrand}>
            <span className={styles.brandLine}>Let's Start Your Story with </span>
            <span className={styles.brandName}>Energy!</span>
          </div>

          
          <div className={styles.ctaGroup}>
            <Button
              textEs="Agenda tu Consultoría Gratis"
              textEn="Book a Free Strategy Session"
              href="/contacto"
              variant="primary"
              size="md"
              showArrow={true}
            />
          </div>

          {/* CTA Card - Mobile: Aparece aquí debajo del botón */}
          <div className={styles.ctaCardMobile}>
            <CtaCard />
          </div>
        </div>

        

        {/* Degradado de Transición a Siguiente Sección (BLANCO) */}
    

        {/* Scroll Indicator */}
        <div className={styles.scrollIndicator}>
          <span className={styles.scrollText}>{ingles ? 'Scroll down' : 'Desliza hacia abajo'}</span>
          <div className={styles.scrollIcon}></div>
        </div>

        {/* CTA Card - Desktop: Esquina Inferior Derecha */}
        <div className={styles.ctaCardDesktop}>
          <CtaCard />
        </div>
      </div>
    </section>
  );
};

export default IndexSeccion1;
