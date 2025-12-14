import { useStore } from '@nanostores/react';
import { isEnglish, isDarkMode } from '../../../data/variables';
import Button from '../../global/Button';
import styles from '../css/indexSeccion4.module.css';

const IndexSeccion4 = () => {
  const ingles = useStore(isEnglish);
  const darkMode = useStore(isDarkMode);
  
  const content = {
    es: {
      title: "Hexy, la voz de Magic Drink",
      subtitle: "Hexy es la mascota oficial de Magic Drink y la idol que ha conquistado millones de playlists alrededor del mundo. Sus canciones están hechas para disfrutarse con una lata fría en la mano.",
      description: "Nadie sabe con certeza quién está detrás del nombre 'DJ Sweet Hex'. Algunos dicen que es una productora anónima, otros creen que es un equipo creativo entero. Lo único seguro es que, cuando su música suena y una Magic Drink se abre, el mundo se siente un poco más brillante.",
      stats: [
        { icon: "🎵", text: "+5 mil millones de streams en campañas y redes" },
        { icon: "🌎", text: "Presente en anuncios de más de 40 países" },
        { icon: "💜", text: "Idol número uno en el 'Día de la Magic Drink'" }
      ],
      ctaPrimary: "Escuchar a Hexy",
      ctaSecondary: "Ver discografía"
    },
    en: {
      title: "Hexy, the voice of Magic Drink",
      subtitle: "Hexy is the official mascot of Magic Drink and the idol who has conquered millions of playlists around the world. Her songs are made to be enjoyed with a cold can in hand.",
      description: "No one knows for sure who is behind the name 'DJ Sweet Hex'. Some say it's an anonymous producer, others believe it's an entire creative team. The only certainty is that when her music plays and a Magic Drink opens, the world feels a little brighter.",
      stats: [
        { icon: "🎵", text: "+5 billion streams in campaigns and social networks" },
        { icon: "🌎", text: "Present in ads in over 40 countries" },
        { icon: "💜", text: "#1 idol on 'Magic Drink Day'" }
      ],
      ctaPrimary: "Listen to Hexy",
      ctaSecondary: "View discography"
    }
  };
  
  const t = ingles ? content.en : content.es;
  
  return (
    <section 
      className={`${styles.section} ${!darkMode ? styles.sectionLight : ''}`}
    >
      {/* Columna Izquierda - Imagen de Hexy */}
      <div className={styles.imageColumn}>
        <div className={styles.imageWrapper}>
          <img 
            src="/image/hexy/hexy-highlight.png" 
            alt="Hexy - DJ Sweet Hex"
            className={styles.hexyImage}
          />
          {/* Badge decorativo */}
          <div className={styles.hexyBadge}>✨</div>
          {/* Glow effect */}
          <div className={styles.hexyGlow}></div>
        </div>
      </div>
      
      {/* Columna Derecha - Contenido */}
      <div className={styles.contentColumn}>
        {/* Título principal */}
        <h2 className={styles.title}>{t.title}</h2>
        
        {/* Subtítulo/tagline */}
        <p className={styles.subtitle}>{t.subtitle}</p>
        
        {/* Descripción corporativa */}
        <p className={styles.description}>{t.description}</p>
        
        {/* Stats de Hexy */}
        <div className={styles.statsGrid}>
          {t.stats.map((stat, index) => (
            <div key={index} className={styles.statItem}>
              <span className={styles.statIcon}>{stat.icon}</span>
              <span className={styles.statText}>{stat.text}</span>
            </div>
          ))}
        </div>
        
        {/* CTAs */}
        <div className={styles.ctaGroup}>
          <Button 
            variant="primary"
            href="/hexy"
            textEs={t.ctaPrimary}
            textEn={t.ctaPrimary}
            size="lg"
          />
          <Button 
            variant="outline"
            href="/hexy"
            textEs={t.ctaSecondary}
            textEn={t.ctaSecondary}
            size="lg"
          />
        </div>
      </div>
      
      {/* Decoraciones de fondo - Notas musicales */}
      <div className={styles.musicNotes} aria-hidden="true">
        <span className={styles.note}>♪</span>
        <span className={styles.note}>♫</span>
        <span className={styles.note}>♪</span>
        <span className={styles.note}>♫</span>
        <span className={styles.note}>♪</span>
      </div>
    </section>
  );
};

export default IndexSeccion4;
