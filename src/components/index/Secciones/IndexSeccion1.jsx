import React, { useEffect, useState } from "react";
import { isEnglish } from '../../../data/variables';
import { useStore } from '@nanostores/react';
import { GridScan } from '../../global/animations/GridScan/GridScan';
import styles from "../css/indexSeccion1.module.css";

const IndexSeccion1 = () => {
  const ingles = useStore(isEnglish);
  
  // Typing effect para el nombre
  const [displayedName, setDisplayedName] = useState("");
  const fullName = "Abraham Domínguez";
  
  // Alternador de subtítulo
  const [subtitleIndex, setSubtitleIndex] = useState(0);
  const subtitles = ingles ? [
    "Creative Full-Stack Engineer",
    "Technical Artist",
    "AI Enthusiast"
  ] : [
    "Creative Full-Stack Engineer",
    "Technical Artist", 
    "Entusiasta de IA"
  ];

  // Skills con iconos modernos
  const skills = [
    { icon: "💻", label: ingles ? "Code" : "Código" },
    { icon: "🎨", label: ingles ? "3D Art" : "Arte 3D" },
    { icon: "🎵", label: ingles ? "Music" : "Música" },
    { icon: "🤖", label: ingles ? "AI" : "IA" }
  ];

  // Typing effect
  useEffect(() => {
    if (displayedName.length < fullName.length) {
      const timeout = setTimeout(() => {
        setDisplayedName(fullName.slice(0, displayedName.length + 1));
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [displayedName]);

  // Alternar subtítulo cada 3 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setSubtitleIndex((prev) => (prev + 1) % subtitles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [subtitles.length]);

  return (
    <section className={styles.section}>
      {/* Grid Scan Background */}
      <div className={styles.backgroundGrid}>
         <GridScan
    sensitivity={0.01}
    lineThickness={1.2}
    linesColor="#2D2447"
    gridScale={0.08}
    scanColor="#6366F1"
    scanOpacity={0.5}
    scanGlow={0.7}
    scanSoftness={2.5}
    enablePost
    bloomIntensity={0.4}
    chromaticAberration={0.002}
    noiseIntensity={0.01}
  />
      </div>

      {/* Overlay gradient sutil */}
      <div className={styles.overlay}></div>

      {/* Contenido principal */}
      <div className={styles.heroContent}>
        {/* Nombre con typing effect */}
        <h1 className={styles.heroName}>
          {displayedName}
          <span className={styles.cursor}>|</span>
        </h1>

        {/* Subtítulo alternante */}
        <div className={styles.subtitleWrapper}>
          <h2 className={styles.heroSubtitle} key={subtitleIndex}>
            {subtitles[subtitleIndex]}
          </h2>
        </div>

        {/* Tagline */}
        <p className={styles.heroTagline}>
          {ingles 
            ? "Building complete experiences: from code to 3D art, music, and artificial intelligence"
            : "Construyo experiencias completas: desde código hasta arte 3D, música e inteligencia artificial"
          }
        </p>

        {/* Skills Grid */}
        <div className={styles.skillsGrid}>
          {skills.map((skill, i) => (
            <div key={i} className={styles.skillCard}>
              <span className={styles.skillIcon}>{skill.icon}</span>
              <span className={styles.skillLabel}>{skill.label}</span>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className={styles.ctaButtons}>
          <a href="#proyectos" className={styles.ctaPrimary}>
            {ingles ? "View Projects" : "Ver Proyectos"}
          </a>
          <a href="/contacto" className={styles.ctaSecondary}>
            {ingles ? "Get in Touch" : "Contactar"}
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className={styles.scrollIndicator}>
        <span className={styles.scrollText}>
          {ingles ? "Scroll down" : "Desliza hacia abajo"}
        </span>
        <div className={styles.scrollIcon}></div>
      </div>
    </section>
  );
};

export default IndexSeccion1;