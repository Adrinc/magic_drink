import { useState } from 'react';
import { useStore } from '@nanostores/react';
import { isEnglish } from '../../../data/variables';
import styles from '../css/indexSeccionBanner.module.css';

const IndexSeccionBanner = () => {
  const ingles = useStore(isEnglish);
  const [isPaused, setIsPaused] = useState(false);

  const content = ingles ? {
    title: "Services trusted by companies like"
  } : {
    title: "Servicios confiados por empresas como"
  };

  const t = ingles ? content : content;

  const brands = [
    { name: 'Alvarado Hospital', logo: '/image/brands/alvaradohospital.avif' },
    { name: 'Cox', logo: '/image/brands/cox.avif' },
    { name: 'Disneyland', logo: '/image/brands/disneyland.avif' },
    { name: 'Health Coalition', logo: '/image/brands/healthcoali.avif' },
    { name: 'McDonalds', logo: '/image/brands/macdonals.avif' },
    { name: 'Meta', logo: '/image/brands/meta.jfif' },
    { name: 'Nissan', logo: '/image/brands/nissan.avif' },
    { name: 'Sharp', logo: '/image/brands/sharp.avif' },
    { name: 'SWC', logo: '/image/brands/swc.avif' },
    { name: 'Televisa', logo: '/image/brands/televisa.avif' },
    { name: 'Google', logo: '/image/brands/google.png' },
    { name: 'HubSpot', logo: '/image/brands/hubspot.png' },
    { name: 'LinkedIn', logo: '/image/brands/linkelin.png' },
    { name: 'Microsoft', logo: '/image/brands/microsoft.png' },
    { name: 'Shopify', logo: '/image/brands/shopyfy.png' }
  ];

  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  const duplicatedBrands = [...brands, ...brands];

  return (
    <section className={styles.section}>
      <div className={styles.wrapper}>
        <h2 className={styles.title}>{t.title}</h2>
        <div className={styles.container}>
          <div 
            className={`${styles.carouselTrack} ${isPaused ? styles.paused : ''}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {duplicatedBrands.map((brand, index) => (
              <div key={`brand-${index}`} className={styles.logoCard}>
                <img 
                  src={brand.logo} 
                  alt={brand.name}
                  className={styles.logoImage}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndexSeccionBanner;
