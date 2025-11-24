import { useStore } from '@nanostores/react';
import { isEnglish } from '../../../data/variables';
import styles from '../css/indexSeccionBannerText.module.css';

const IndexSeccionBannerText = () => {
  const ingles = useStore(isEnglish);

  // Contenido bilingüe de servicios
  const itemsEn = [
    { text: 'Motion Graphics', color: '#F12A2A' },
    { text: 'VFX', color: '#3DBBFF' },
    { text: 'Filming', color: '#FFB638' },
    { text: 'App Creation', color: '#6F26A9' },
    { text: 'Scriptwriting', color: '#FF7A45' },
    { text: 'Sound Design', color: '#A47EB9' }
  ];

  const itemsEs = [
    { text: 'Motion Graphics', color: '#F12A2A' },
    { text: 'VFX', color: '#3DBBFF' },
    { text: 'Filmación', color: '#FFB638' },
    { text: 'Creación de Apps', color: '#6F26A9' },
    { text: 'Escritura de Guiones', color: '#FF7A45' },
    { text: 'Diseño de Sonido', color: '#A47EB9' }
  ];

  const items = ingles ? itemsEn : itemsEs;

  // Duplicar items para carrusel infinito
  const duplicatedItems = [...items, ...items];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.carouselTrack}>
          {duplicatedItems.map((item, index) => (
            <div
              key={`item-${index}`}
              className={styles.textItem}
              style={{ '--accent-color': item.color }}
            >
              <span className={styles.dot}></span>
              <span className={styles.text}>{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IndexSeccionBannerText;
