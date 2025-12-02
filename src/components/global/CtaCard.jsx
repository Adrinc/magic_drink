import { useStore } from '@nanostores/react';
import { isEnglish, isDarkMode } from '../../data/variables';
import styles from './css/ctaCard.module.css';
import Button from './Button';

const CtaCard = () => {
  const ingles = useStore(isEnglish);
  const darkMode = useStore(isDarkMode);

  const content = {
    es: {
      title: "¡Hagamos realidad tus ideas con Energy!"
    },
    en: {
      title: "Let's bring your ideas to life with Energy!"
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
        <Button
          textEs="Contáctanos"
          textEn="Contact Us"
          href="/contacto"
          variant="primary"
          size="sm"
          showArrow={true}
        />
      </div>
    </div>
  );
};

export default CtaCard;
