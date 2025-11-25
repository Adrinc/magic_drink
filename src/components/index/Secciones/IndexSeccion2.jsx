import React from 'react';
import { useStore } from '@nanostores/react';
import { isEnglish, isDarkMode } from '../../../data/variables';
import { translationsIndex } from '../../../data/translationsIndex';
import styles from '../css/indexSeccion2.module.css';

const IndexSeccion2 = () => {
  const ingles = useStore(isEnglish);
  const darkMode = useStore(isDarkMode);
  const t = ingles ? translationsIndex.en.ourStory : translationsIndex.es.ourStory;
  
  return (
    <section className={`${styles.section} ${!darkMode ? styles.sectionLight : ''}`}>
      <div className={styles.container}>
        <div className={styles.content}>
          {/* Left Column: Text and Stats */}
          <div className={styles.leftColumn}>
            <h2 className={styles.title}>{t.title}</h2>
            
            <div className={styles.description}>
              <p className={styles.paragraph}>{t.paragraph1}</p>
              <p className={styles.paragraph}>{t.highlightText}</p>
              <p className={styles.paragraph}>{t.paragraph2}</p>
            </div>
            
            <div className={styles.statsGrid}>
              {t.stats.map((stat, index) => (
                <div key={index} className={styles.statCard}>
                  <span className={styles.statLabel}>{stat.label}</span>
                  <span className={styles.statNumber}>{stat.number}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Right Column: Rainbow Image */}
          <div className={styles.rightColumn}>
            <div className={styles.imageWrapper}>
              <img 
                src="/image/global/rainbow.png" 
                alt="Energy Media Rainbow" 
                className={styles.rainbowImage}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndexSeccion2;
