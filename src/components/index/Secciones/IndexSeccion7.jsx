import { useStore } from '@nanostores/react';
import { isEnglish } from '../../../data/variables';
import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import styles from '../css/indexSeccion7.module.css';

const IndexSeccion7 = () => {
  const ingles = useStore(isEnglish);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  // Animación de contador para stats
  const [counts, setCounts] = useState({
    locations: 0,
    visitors: 0,
    rating: 0,
    photos: 0
  });

  useEffect(() => {
    if (isInView) {
      // Animar contador de ubicaciones (0 → 24)
      const locInterval = setInterval(() => {
        setCounts(prev => {
          if (prev.locations >= 24) {
            clearInterval(locInterval);
            return prev;
          }
          return { ...prev, locations: prev.locations + 1 };
        });
      }, 30);

      // Animar visitantes (0 → 2000000, mostrar como "2M+")
      let visitorCount = 0;
      const visInterval = setInterval(() => {
        visitorCount += 100000;
        if (visitorCount >= 2000000) {
          visitorCount = 2000000;
          clearInterval(visInterval);
        }
        setCounts(prev => ({ ...prev, visitors: visitorCount }));
      }, 40);

      // Animar rating (0 → 4.9)
      let ratingCount = 0;
      const rateInterval = setInterval(() => {
        ratingCount += 0.1;
        if (ratingCount >= 4.9) {
          ratingCount = 4.9;
          clearInterval(rateInterval);
        }
        setCounts(prev => ({ ...prev, rating: parseFloat(ratingCount.toFixed(1)) }));
      }, 50);

      // Animar fotos (0 → 500000, mostrar como "500K+")
      let photoCount = 0;
      const photoInterval = setInterval(() => {
        photoCount += 25000;
        if (photoCount >= 500000) {
          photoCount = 500000;
          clearInterval(photoInterval);
        }
        setCounts(prev => ({ ...prev, photos: photoCount }));
      }, 30);

      return () => {
        clearInterval(locInterval);
        clearInterval(visInterval);
        clearInterval(rateInterval);
        clearInterval(photoInterval);
      };
    }
  }, [isInView]);

  // Datos de bullets
  const highlights = [
    {
      icon: '/icons/icono_lata.png',
      textEs: 'Tienda oficial Magic Drink',
      textEn: 'Official Magic Drink Store'
    },
    {
      icon: '/icons/icono_gorro.png',
      textEs: 'Música y experiencias de Hexy',
      textEn: 'Music and Hexy experiences'
    },
    {
      icon: '/icons/icono_bolsa.png',
      textEs: 'Merch exclusivo y ediciones limitadas',
      textEn: 'Exclusive merch and limited editions'
    },
    {
      icon: '/icons/icono_globo.png',
      textEs: 'Eventos especiales durante el Magic Drink Day',
      textEn: 'Special events during Magic Drink Day'
    }
  ];

  // Variantes de animación
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const videoVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <section ref={sectionRef} className={styles.wonderpopSection}>
      {/* Fondo con estrellas discretas */}
      <div className={styles.starryBackground}>
        <div className={styles.star}></div>
        <div className={styles.star}></div>
        <div className={styles.star}></div>
        <div className={styles.star}></div>
        <div className={styles.star}></div>
      </div>

      {/* Container principal */}
      <div className={styles.container}>
        
        {/* Encabezado centrado */}
        <motion.div 
          className={styles.sectionHeader}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className={styles.title}>Wonderpop Plaza</h2>
          <p className={styles.tagline}>
            {ingles ? "The official heart of Magic Drink" : "El corazón oficial de Magic Drink"}
          </p>
        </motion.div>
        
        {/* Layout 2 columnas */}
        <motion.div 
          className={styles.contentGrid}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          
          {/* Columna izquierda - Video */}
          <motion.div 
            className={styles.visualColumn}
            variants={videoVariants}
          >
            <div className={styles.videoWrapper}>
              <video 
                className={styles.video}
                autoPlay 
                muted 
                loop 
                playsInline
                poster="/images/wonderpop-poster.jpg"
              >
                <source src="/videos/wonderpop.mp4" type="video/mp4" />
                {ingles 
                  ? "Your browser does not support video playback." 
                  : "Tu navegador no soporta reproducción de video."}
              </video>
              {/* Overlay sutil para mejor legibilidad */}
              <div className={styles.videoOverlay}></div>
            </div>
          </motion.div>
          
          {/* Columna derecha - Contenido */}
          <motion.div 
            className={styles.contentColumn}
            variants={itemVariants}
          >
            <h3 className={styles.subtitle}>
              {ingles 
                ? "More than a store. A Magic Drink world." 
                : "Más que una tienda. Un mundo Magic Drink."}
            </h3>
            
            <p className={styles.description}>
              {ingles ? (
                <>
                  Wonderpop Plaza is the official shopping center of Magic Drink. 
                  A space where the drink, music and creativity meet in one place.
                  <br /><br />
                  Here special editions are born, exclusive events and unique 
                  experiences that only exist within the Magic Drink universe.
                </>
              ) : (
                <>
                  Wonderpop Plaza es el centro comercial oficial de Magic Drink. 
                  Un espacio donde la bebida, la música y la creatividad se encuentran en un solo lugar.
                  <br /><br />
                  Aquí nacen ediciones especiales, eventos exclusivos y experiencias únicas 
                  que solo existen dentro del universo Magic Drink.
                </>
              )}
            </p>
            
            {/* Bullets con iconos custom */}
            <ul className={styles.highlights}>
              {highlights.map((item, index) => (
                <motion.li 
                  key={index}
                  className={styles.highlightItem}
                  variants={itemVariants}
                  custom={index}
                >
                  <div className={styles.iconWrapper}>
                    <img 
                      src={item.icon} 
                      alt="" 
                      className={styles.icon}
                      loading="lazy"
                    />
                  </div>
                  <span className={styles.highlightText}>
                    {ingles ? item.textEn : item.textEs}
                  </span>
                </motion.li>
              ))}
            </ul>
            
            {/* CTA */}
            <motion.div 
              className={styles.ctaWrapper}
              variants={itemVariants}
            >
              <a href="/wonderpop" className={styles.ctaButton}>
                <span className={styles.ctaIcon}>📍</span>
                <span className={styles.ctaText}>
                  {ingles ? "Explore Wonderpop Plaza" : "Explorar Wonderpop Plaza"}
                </span>
              </a>
              <p className={styles.ctaSubtext}>
                {ingles 
                  ? "Discover locations, events and exclusive experiences" 
                  : "Descubre ubicaciones, eventos y experiencias exclusivas"}
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
        
        {/* Stats Grid (Prueba Social) */}
        <motion.div 
          className={styles.statsGrid}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className={styles.statCard}>
            <div className={styles.statNumber}>{counts.locations}</div>
            <div className={styles.statLabel}>
              {ingles ? "Global locations" : "Ubicaciones globales"}
            </div>
          </div>
          
          <div className={styles.statCard}>
            <div className={styles.statNumber}>
              {(counts.visitors / 1000000).toFixed(1)}M+
            </div>
            <div className={styles.statLabel}>
              {ingles ? "Monthly visitors" : "Visitantes mensuales"}
            </div>
          </div>
          
          <div className={styles.statCard}>
            <div className={styles.statNumber}>
              {counts.rating} <span className={styles.starIcon}>⭐</span>
            </div>
            <div className={styles.statLabel}>
              {ingles ? "Average rating" : "Calificación promedio"}
            </div>
          </div>
          
          <div className={styles.statCard}>
            <div className={styles.statNumber}>
              {(counts.photos / 1000).toFixed(0)}K+
            </div>
            <div className={styles.statLabel}>
              {ingles ? "Photos on social media" : "Fotos en redes"} 📸
            </div>
          </div>
        </motion.div>
        
      </div>
    </section>
  );
};

export default IndexSeccion7;
