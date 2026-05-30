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
    { name: 'Alvarado Hospital', logo: '/image/brands/alvaradohospital.webp' },
    { name: 'Cox', logo: '/image/brands/cox.webp' },
   /*  { name: 'Disneyland', logo: '/image/brands/disneyland.webp' }, */
    { name: 'Health Coalition', logo: '/image/brands/healthcoali.webp' },
    { name: 'McDonalds', logo: '/image/brands/macdonals.webp' },
  /*   { name: 'Meta', logo: '/image/brands/meta.webp' }, */
    { name: 'Nissan', logo: '/image/brands/nissan.webp' },
     { name: 'Sharp', logo: '/image/brands/sharp.webp' },
   { name: 'SWC', logo: '/image/brands/swc.webp' },
    { name: 'Televisa', logo: '/image/brands/televisa.webp' },
/*     { name: 'Google', logo: '/image/brands/google.webp' },
    { name: 'HubSpot', logo: '/image/brands/hubspot.webp' },
    { name: 'LinkedIn', logo: '/image/brands/linkelin.webp' },
    { name: 'Microsoft', logo: '/image/brands/microsoft.webp' },
    { name: 'Shopify', logo: '/image/brands/shopyfy.webp' } */
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
