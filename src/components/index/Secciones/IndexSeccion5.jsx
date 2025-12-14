import { useStore } from '@nanostores/react';
import { isEnglish, isDarkMode } from '../../../data/variables';
import Button from '../../global/Button';
import styles from '../css/indexSeccion5.module.css';

const IndexSeccion5 = () => {
  const ingles = useStore(isEnglish);
  const darkMode = useStore(isDarkMode);
  
  const content = {
    es: {
      title: "¡Día de la Magic Drink!",
      subtitle: "El festival mundial donde celebramos la bebida más querida del planeta.",
      body: "Cada año, millones de fans se reúnen para disfrutar desfiles llenos de color, globos gigantes, música de Hexy y momentos mágicos. Lo que comenzó como una simple celebración regional… hoy es un fenómeno global que une a personas de todas las edades.",
      highlight: "Porque cuando compartes una Magic Drink, compartes felicidad.",
      cta: "Descubre más sobre el Magic Drink Day"
    },
    en: {
      title: "Magic Drink Day!",
      subtitle: "The worldwide festival celebrating the most beloved beverage on the planet.",
      body: "Every year, millions of fans gather to enjoy colorful parades, giant balloons, Hexy's music, and magical moments. What started as a simple regional celebration… today is a global phenomenon that unites people of all ages.",
      highlight: "Because when you share a Magic Drink, you share happiness.",
      cta: "Discover more about Magic Drink Day"
    }
  };
  
  const t = ingles ? content.en : content.es;
  
  return (
    <section 
      className={`${styles.section} ${!darkMode ? styles.sectionLight : ''}`}
    >
      <div className={styles.container}>
        {/* Columna Izquierda - Imagen Teaser */}
        <div className={styles.imageColumn}>
          <div className={styles.imageCard}>
            <img 
              src="/image/events/md_parade_teaser.png" 
              alt="Magic Drink Day Parade"
              className={styles.paradeImage}
            />
            {/* Badge decorativo */}
            <div className={styles.eventBadge}>🎈</div>
          </div>
        </div>
        
        {/* Columna Derecha - Contenido */}
        <div className={styles.contentColumn}>
          {/* Título principal */}
          <h2 className={styles.title}>
            <span className={styles.titleIcon}>🌟</span>
            {t.title}
          </h2>
          
          {/* Subtítulo */}
          <h3 className={styles.subtitle}>{t.subtitle}</h3>
          
          {/* Descripción */}
          <p className={styles.body}>{t.body}</p>
          
          {/* Highlight line */}
          <p className={styles.highlight}>{t.highlight}</p>
          
          {/* CTA */}
          <div className={styles.ctaWrapper}>
            <Button 
              variant="primary"
              href="/magicdrinkday"
              textEs={t.cta}
              textEn={t.cta}
              size="lg"
              icon="🔮"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndexSeccion5;
