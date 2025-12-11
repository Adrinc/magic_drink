import React from 'react';
import { useStore } from '@nanostores/react';
import { isEnglish, isDarkMode } from '../../../data/variables';
import styles from '../css/indexSeccion2.module.css';
import Button from '../../global/Button';

const IndexSeccion2 = () => {
  const ingles = useStore(isEnglish);
  const darkMode = useStore(isDarkMode);
  
  const content = {
    es: {
      title: "Sabor Clásico",
      subtitle: "El original",
      description: "Nuestro sabor original combina notas frutales moradas con una frescura imposible de describir. No contiene cafeína, pero miles de personas aseguran sentir un impulso suave de energía desde el primer sorbo. Es la magia líquida que conquistó el mundo.",
      features: [
        "0 mg de cafeína",
        "Sabor morado exclusivo",
        "Ingredientes naturales",
        "Sensación refrescante única",
        "Compatible con la música de Hexy™"
      ],
      cta: "Ver todos los sabores"
    },
    en: {
      title: "Classic Flavor",
      subtitle: "The original",
      description: "Our original flavor combines purple fruity notes with an indescribable freshness. It contains no caffeine, but thousands of people claim to feel a gentle burst of energy from the first sip. It's the liquid magic that conquered the world.",
      features: [
        "0 mg caffeine",
        "Exclusive purple flavor",
        "Natural ingredients",
        "Unique refreshing sensation",
        "Compatible with Hexy™ music"
      ],
      cta: "See all flavors"
    }
  };
  
  const t = ingles ? content.en : content.es;
  
  return (
    <section className={`${styles.section} ${!darkMode ? styles.sectionLight : ''}`}>
      <div className={styles.container}>
        <div className={styles.content}>
          {/* Left Column: Text & Features */}
          <div className={styles.leftColumn}>
            <div className={styles.textBlock}>
              <span className={styles.subtitle}>{t.subtitle}</span>
              <h2 className={styles.title}>{t.title}</h2>
              <p className={styles.description}>{t.description}</p>
            </div>
            
            <ul className={styles.featureList}>
              {t.features.map((feature, index) => (
                <li key={index} className={styles.featureItem}>
                  <span className={styles.featureIcon}>✨</span>
                  <span className={styles.featureText}>{feature}</span>
                </li>
              ))}
            </ul>
            
            <div className={styles.ctaWrapper}>
              <Button
                textEs={t.cta}
                textEn={t.cta}
                href="/bebidas"
                variant="primary"
                size="md"
                showArrow={true}
              />
            </div>
          </div>
          
          {/* Right Column: Product Image (preparado para 3D) */}
          <div className={styles.rightColumn}>
            <div className={styles.productWrapper}>
              {/* Por ahora: imagen estática */}
              {/* TODO: Reemplazar con modelo 3D interactivo en versión futura */}
              <div className={styles.productImageContainer}>
                <img 
                  src="./image/drinks/lata_original.png" 
                  alt="Magic Drink - Sabor Clásico"
                  className={styles.productImage}
                />
                {/* Efecto de glow mágico */}
                <div className={styles.productGlow}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndexSeccion2;
