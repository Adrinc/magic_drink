import { useStore } from '@nanostores/react';
import { isEnglish, isDarkMode } from '../../../data/variables';
import styles from '../css/indexSeccionBanner.module.css';

const IndexSeccionBanner = () => {
  const ingles = useStore(isEnglish);
  const darkMode = useStore(isDarkMode);

  const content = ingles ? {
    title: "Services trusted by companies like"
  } : {
    title: "Servicios confiados por empresas como"
  };

  const t = ingles ? content : content;

  const brands = [
    { name: 'Alvarado Hospital', logo: '/image/brands/alvaradohospital.png' },
    { name: 'Cox', logo: '/image/brands/cox.png' },
    { name: 'Disneyland', logo: '/image/brands/disneyland.png' },
    { name: 'Health Coalition', logo: '/image/brands/healthcoali.png' },
    { name: 'McDonalds', logo: '/image/brands/macdonals.png' },
    { name: 'Meta', logo: '/image/brands/meta.png' },
    { name: 'Nissan', logo: '/image/brands/nissan.png' },
     { name: 'Sharp', logo: '/image/brands/sharp.png' },
   { name: 'SWC', logo: '/image/brands/swc.jpg' },
    { name: 'Televisa', logo: '/image/brands/televisa.png' },
    { name: 'Google', logo: '/image/brands/google.png' },
    { name: 'HubSpot', logo: '/image/brands/hubspot.png' },
    { name: 'LinkedIn', logo: '/image/brands/linkelin.png' },
    { name: 'Microsoft', logo: '/image/brands/microsoft.png' },
    { name: 'Shopify', logo: '/image/brands/shopyfy.png' }
  ];

  const duplicatedBrands = [...brands, ...brands];

  return (
    <section className={`${styles.section} ${!darkMode ? styles.sectionLight : ''}`}>
      <div className={styles.wrapper}>
        <h2 className={styles.title}>{t.title}</h2>
        <div className={styles.container}>
          <div 
            className={styles.carouselTrack}
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
