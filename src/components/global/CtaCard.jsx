import { useStore } from '@nanostores/react';
import { isEnglish, isDarkMode } from '../../data/variables';
import styles from './css/ctaCard.module.css';

const CtaCard = () => {
  const ingles = useStore(isEnglish);
  const darkMode = useStore(isDarkMode);

  const content = {
    es: {
      title: "¡Hagamos realidad tus ideas con Energy!",
      cta: "Contáctanos"
    },
    en: {
      title: "Let's bring your ideas to life with Energy!",
      cta: "Contact Us"
    }
  };

  const t = ingles ? content.en : content.es;

  return (
    <div className={`${styles.ctaCard} ${!darkMode ? styles.ctaCardLight : ''}`}>
      <div className={styles.imageSection}>
        <img 
          src="/favicon.png" 
          alt="Energy Media Isotipo" 
          className={styles.image}
        />
      </div>
      <div className={styles.contentSection}>
        <h3 className={styles.title}>{t.title}</h3>
        <a href="/contacto" className={styles.ctaButton}>
          {t.cta} <span className={styles.arrow}>→</span>
        </a>
      </div>
    </div>
  );
};

export default CtaCard;
