import { useStore } from '@nanostores/react';
import { isEnglish, isDarkMode } from '../../../data/variables';
import styles from '../css/indexSeccion3.module.css';
import Button from '../../global/Button';

const IndexSeccion3 = () => {
  const ingles = useStore(isEnglish);
  const darkMode = useStore(isDarkMode);
  
  const content = {
    es: {
      sectionTitle: "Nuestros Sabores Más Queridos",
      sectionSubtitle: "Cada lata es una chispa de alegría. ¿Cuál será tu favorita hoy?",
      cta: "Ver todos los sabores",
      flavors: [
        {
          name: "Witchy Kiwi",
          description: "Refrescante, chispeante y con un toque travieso de kiwi encantado.",
          color: "#7ED957",
          bgColor: "rgba(126, 217, 87, 0.1)",
          image: "/image/drinks/lata_kiwi.png"
        },
        {
          name: "Sparkle Soda",
          description: "Burbujas mágicas con sabor a felicidad y luz de estrellas.",
          color: "#82D2FF",
          bgColor: "rgba(130, 210, 255, 0.1)",
          image: "/image/drinks/lata_sparkle.png"
        },
        {
          name: "Banana Drama",
          description: "Explosiva, tropical y con más personalidad que cualquier banana ordinaria.",
          color: "#FFE066",
          bgColor: "rgba(255, 224, 102, 0.1)",
          image: "/image/drinks/lata_banana.png"
        },
        {
          name: "Bubble Tape",
          description: "Dulzura rosa chicle con un torbellino de nostalgia mágica.",
          color: "#FF6AD7",
          bgColor: "rgba(255, 106, 215, 0.1)",
          image: "/image/drinks/lata_bubble.png"
        },
        {
          name: "Dragon Grape",
          description: "La uva más intensa del reino mágico, con carácter y un rugido dulce.",
          color: "#9B4DCA",
          bgColor: "rgba(155, 77, 202, 0.1)",
          image: "/image/drinks/lata_dragon.png"
        }
      ]
    },
    en: {
      sectionTitle: "Our Most Beloved Flavors",
      sectionSubtitle: "Every can is a spark of joy. Which one will be your favorite today?",
      cta: "See all flavors",
      flavors: [
        {
          name: "Witchy Kiwi",
          description: "Refreshing, sparkling and with a mischievous touch of enchanted kiwi.",
          color: "#7ED957",
          bgColor: "rgba(126, 217, 87, 0.1)",
          image: "/image/drinks/lata_kiwi.png"
        },
        {
          name: "Sparkle Soda",
          description: "Magical bubbles with a taste of happiness and starlight.",
          color: "#82D2FF",
          bgColor: "rgba(130, 210, 255, 0.1)",
          image: "/image/drinks/lata_sparkle.png"
        },
        {
          name: "Banana Drama",
          description: "Explosive, tropical and with more personality than any ordinary banana.",
          color: "#FFE066",
          bgColor: "rgba(255, 224, 102, 0.1)",
          image: "/image/drinks/lata_banana.png"
        },
        {
          name: "Bubble Tape",
          description: "Pink bubblegum sweetness with a whirlwind of magical nostalgia.",
          color: "#FF6AD7",
          bgColor: "rgba(255, 106, 215, 0.1)",
          image: "/image/drinks/lata_bubble.png"
        },
        {
          name: "Dragon Grape",
          description: "The most intense grape in the magical kingdom, with character and a sweet roar.",
          color: "#9B4DCA",
          bgColor: "rgba(155, 77, 202, 0.1)",
          image: "/image/drinks/lata_dragon.png"
        }
      ]
    }
  };
  
  const t = ingles ? content.en : content.es;
  
  return (
    <section className={`${styles.section} ${!darkMode ? styles.sectionLight : ''}`}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.sectionTitle}>{t.sectionTitle}</h2>
          <p className={styles.sectionSubtitle}>{t.sectionSubtitle}</p>
        </div>
        
        {/* Grid de Sabores */}
        <div className={styles.flavorsGrid}>
          {t.flavors.map((flavor, index) => (
            <div 
              key={index} 
              className={styles.flavorCard}
              style={{
                '--flavor-color': flavor.color,
                '--flavor-bg': flavor.bgColor
              }}
            >
              {/* Imagen de la lata */}
              <div className={styles.flavorImageWrapper}>
                <img 
                  src={flavor.image} 
                  alt={flavor.name}
                  className={styles.flavorImage}
                />
                {/* Glow effect */}
                <div 
                  className={styles.flavorGlow}
                  style={{ background: `radial-gradient(circle, ${flavor.color}40 0%, transparent 70%)` }}
                ></div>
              </div>
              
              {/* Info del sabor */}
              <div className={styles.flavorInfo}>
                <h3 className={styles.flavorName}>{flavor.name}</h3>
                <p className={styles.flavorDescription}>{flavor.description}</p>
                
                {/* Botón Ver más (decorativo en ALPHA) */}
                <button className={styles.viewMoreBtn}>
                  {ingles ? 'Learn more' : 'Ver más'}
                </button>
              </div>
              
              {/* Badge decorativo */}
              <div className={styles.flavorBadge}>✨</div>
            </div>
          ))}
        </div>
        
        {/* CTA */}
        <div className={styles.ctaWrapper}>
          <Button
            textEs={t.cta}
            textEn={t.cta}
            href="/bebidas"
            variant="secondary"
            size="lg"
            showArrow={true}
          />
        </div>
      </div>
    </section>
  );
};

export default IndexSeccion3;
