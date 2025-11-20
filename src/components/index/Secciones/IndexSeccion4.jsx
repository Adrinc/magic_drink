import { useState } from 'react';
import { useStore } from '@nanostores/react';
import { isEnglish } from '../../../data/variables';
import styles from '../css/indexSeccion4.module.css';

const IndexSeccion4 = () => {
  const ingles = useStore(isEnglish);
  const [pausedRow, setPausedRow] = useState(null);

  const content = ingles ? {
    header: {
      title: "Stories That Energize",
      subtitle: "Capturing moments with the energy that defines us.",
      seeMore: "See more"
    }
  } : {
    header: {
      title: "Historias Que Energizan",
      subtitle: "Capturando momentos con la energía que nos define.",
      seeMore: "Ver más"
    }
  };

  const t = content;

  // Arrays de mockups para cada carrusel (URLs temporales de Unsplash)
  const rowOneImages = [
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&q=80", // Analytics dashboard
    "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&h=400&q=80", // Mobile app screens
    "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&q=80", // Laptop with colorful screen
    "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=600&h=400&q=80", // iPhone mockup
    "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=600&h=400&q=80", // Multiple device mockup
    "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&h=400&q=80", // App interface
    "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?w=600&h=400&q=80", // Website mockup
    "https://images.unsplash.com/photo-1600267185393-e158a98703de?w=600&h=400&q=80", // Laptop design
  ];

  const rowTwoImages = [
    "https://images.unsplash.com/photo-1557853197-aefb550b6fdc?w=600&h=400&q=80", // Gradient design
    "https://images.unsplash.com/photo-1558655146-d09347e92766?w=600&h=400&q=80", // Office desk
    "https://images.unsplash.com/photo-1586717799252-bd134ad00e26?w=600&h=400&q=80", // Device mockups
    "https://images.unsplash.com/photo-1610465299996-e4558eecb4d7?w=600&h=400&q=80", // MacBook Air
    "https://images.unsplash.com/photo-1555421689-d68471e189f2?w=600&h=400&q=80", // Code on screen
    "https://images.unsplash.com/photo-1587440871875-191322ee64b0?w=600&h=400&q=80", // Modern workspace
    "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=600&h=400&q=80", // MacBook setup
    "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600&h=400&q=80", // Desktop setup
  ];

  const rowThreeImages = [
    "https://images.unsplash.com/photo-1557821552-17105176677c?w=600&h=400&q=80", // Brand colors
    "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&h=400&q=80", // Team working
    "https://images.unsplash.com/photo-1558655146-d09347e92766?w=600&h=400&q=80", // Design workspace
    "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=600&h=400&q=80", // Design tools
    "https://images.unsplash.com/photo-1581287053822-fd7bf4f4bfec?w=600&h=400&q=80", // Abstract design
    "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=600&h=400&q=80", // Workspace
    "https://images.unsplash.com/photo-1600132806608-231446b2e7af?w=600&h=400&q=80", // Team collaboration
    "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=400&q=80", // Office setup
  ];

  // Duplicar para loop infinito
  const duplicatedRowOne = [...rowOneImages, ...rowOneImages];
  const duplicatedRowTwo = [...rowTwoImages, ...rowTwoImages];
  const duplicatedRowThree = [...rowThreeImages, ...rowThreeImages];

  return (
    <section className={styles.section}>
      <div className={styles.wrapper}>
        {/* Header */}
        <div className={styles.header}>
          <div>
            <h2 className={styles.title}>{t.header.title}</h2>
            <p className={styles.subtitle}>{t.header.subtitle}</p>
          </div>
          <button className={styles.seeMoreBtn}>{t.header.seeMore}</button>
        </div>

        {/* Contenedor 3D con perspectiva + skew */}
        <div className={styles.carouselsWrapper}>
          {/* Carrusel 1: Derecha → Izquierda (Rápido) */}
          <div className={styles.carouselContainer}>
            <div 
              className={`${styles.carouselTrack} ${styles.rowOne} ${pausedRow === 1 ? styles.paused : ''}`}
              onMouseEnter={() => setPausedRow(1)}
              onMouseLeave={() => setPausedRow(null)}
            >
              {duplicatedRowOne.map((image, index) => (
                <div key={`row1-${index}`} className={styles.imageCard}>
                  <img src={image} alt={`Story ${index + 1}`} className={styles.image} />
                </div>
              ))}
            </div>
          </div>

          {/* Carrusel 2: Izquierda → Derecha (Medio) */}
          <div className={styles.carouselContainer}>
            <div 
              className={`${styles.carouselTrack} ${styles.rowTwo} ${pausedRow === 2 ? styles.paused : ''}`}
              onMouseEnter={() => setPausedRow(2)}
              onMouseLeave={() => setPausedRow(null)}
            >
              {duplicatedRowTwo.map((image, index) => (
                <div key={`row2-${index}`} className={styles.imageCard}>
                  <img src={image} alt={`Story ${index + 1}`} className={styles.image} />
                </div>
              ))}
            </div>
          </div>

          {/* Carrusel 3: Derecha → Izquierda (Lento) */}
          <div className={styles.carouselContainer}>
            <div 
              className={`${styles.carouselTrack} ${styles.rowThree} ${pausedRow === 3 ? styles.paused : ''}`}
              onMouseEnter={() => setPausedRow(3)}
              onMouseLeave={() => setPausedRow(null)}
            >
              {duplicatedRowThree.map((image, index) => (
                <div key={`row3-${index}`} className={styles.imageCard}>
                  <img src={image} alt={`Story ${index + 1}`} className={styles.image} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndexSeccion4;
