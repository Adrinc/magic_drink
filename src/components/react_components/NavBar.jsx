import React, { useState, useEffect } from "react";
import styles from "./navbar.module.css";

import { useStore } from "@nanostores/react";
import { isEnglish } from "../../data/variables"; 
import { useLang } from "../../data/signals";
import { translationsGlobal } from "../../data/translationsGlobal";

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentPath, setCurrentPath] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const { changeLang } = useLang();
  const ingles = useStore(isEnglish);
  
  // Traducciones del navbar
  const navTranslations = ingles ? translationsGlobal.en.navbar : translationsGlobal.es.navbar;

  // Función para navegar al inicio
  const handleLogoClick = (e) => {
    e.preventDefault();
    window.location.href = '/';
  };

  useEffect(() => {
    // Detectar scroll para efectos de navbar
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 24);
    };

    // Detectar la página actual inicialmente
    setCurrentPath(window.location.pathname);

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Función para verificar si el enlace está activo
  const isActiveLink = (href) => {
    if (href === "/" && currentPath === "/") return true;
    if (href !== "/" && currentPath.startsWith(href)) return true;
    return false;
  };

  // Función para cambiar idioma
  const handleLanguageChange = (newLang) => {
    if (newLang === 'en') {
      isEnglish.set(true);
      changeLang('en');
    } else {
      isEnglish.set(false);
      changeLang('es');
    }
  };

  // Función para toggle del menú móvil
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Función para cerrar el menú móvil
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  // Prevenir scroll cuando el menú móvil está abierto
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  return (
    <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ""}`}>
      {/* Contenedor Principal de la Cápsula */}
      <div className={styles.capsuleContainer}>
        
        {/* === LEFT: Logo === */}
        <div className={styles.logoSection}>
          <a href="/" onClick={handleLogoClick} className={styles.logoLink}>
            <img 
              src="/logo.png" 
              alt="Magic Drink" 
              className={`${styles.logoImage} ${isScrolled ? styles.logoCompact : ''}`}
            />
          </a>
        </div>

        {/* === CENTER: Links === */}
        <ul className={styles.navLinks}>
          <li className={styles.navItem}>
            <a 
              href="/bebidas" 
              className={`${styles.navLink} ${isActiveLink("/bebidas") ? styles.activeLink : ""}`}
            >
              {ingles ? "Drinks" : "Bebidas"}
            </a>
          </li>
          <li className={styles.navItem}>
            <a 
              href="/hexy" 
              className={`${styles.navLink} ${isActiveLink("/hexy") ? styles.activeLink : ""}`}
            >
              Hexy
            </a>
          </li>
          <li className={styles.navItem}>
            <a 
              href="/merch" 
              className={`${styles.navLink} ${isActiveLink("/merch") ? styles.activeLink : ""}`}
            >
              Merch
            </a>
          </li>
          <li className={styles.navItem}>
            <a 
              href="/wonderpop" 
              className={`${styles.navLink} ${isActiveLink("/wonderpop") ? styles.activeLink : ""}`}
            >
              Wonderpop
            </a>
          </li>
        </ul>

        {/* === RIGHT: Idioma + CTA === */}
        <div className={styles.actionsSection}>
          {/* Toggle de Idioma */}
          <div className={styles.languageToggle}>
            <button 
              className={`${styles.langButton} ${!ingles ? styles.langActive : ''}`}
              onClick={() => handleLanguageChange('es')}
            >
              ES
            </button>
            <span className={styles.langSeparator}>|</span>
            <button 
              className={`${styles.langButton} ${ingles ? styles.langActive : ''}`}
              onClick={() => handleLanguageChange('en')}
            >
              EN
            </button>
          </div>

          {/* CTA Principal */}
          <a href="/wonderpop" className={styles.ctaButton}>
            <span className={styles.ctaIcon}>📍</span>
            {ingles ? "Visit Us" : "Visítanos"}
          </a>
        </div>

        {/* === MOBILE: Hamburguesa === */}
        <button 
          className={styles.hamburger}
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <span className={`${styles.hamburgerLine} ${mobileMenuOpen ? styles.hamburgerActive : ''}`}></span>
          <span className={`${styles.hamburgerLine} ${mobileMenuOpen ? styles.hamburgerActive : ''}`}></span>
          <span className={`${styles.hamburgerLine} ${mobileMenuOpen ? styles.hamburgerActive : ''}`}></span>
        </button>

        {/* Onda Decorativa INTERNA "Liquid Signature" - 3 Capas */}
        <div className={styles.liquidWave}>
        <svg viewBox="0 0 1200 50" preserveAspectRatio="none" className={styles.waveSvg}>
          {/* Capa 1: Ola Principal Púrpura */}
          <path 
            d="M0,25 Q150,15 300,25 T600,25 T900,25 T1200,25 L1200,50 L0,50 Z" 
            className={styles.wavePath}
          />
          {/* Capa 2: Ola Secundaria Rosa */}
          <path 
            d="M0,20 Q200,30 400,20 T800,20 T1200,20 L1200,50 L0,50 Z" 
            className={styles.wavePath}
          />
          {/* Capa 3: Ola de Acento Azul */}
          <path 
            d="M0,30 Q250,25 500,30 T1000,30 T1200,30 L1200,50 L0,50 Z" 
            className={styles.wavePath}
          />
        </svg>
        </div>
      </div>

      {/* === MENÚ MÓVIL OVERLAY === */}
      {mobileMenuOpen && (
        <div className={styles.mobileOverlay} onClick={closeMobileMenu}>
          <div className={styles.mobileContent} onClick={(e) => e.stopPropagation()}>
            
            {/* Logo en menú móvil */}
            <div className={styles.mobileLogo}>
              <img src="/logo.png" alt="Magic Drink" />
            </div>

            {/* Links móvil */}
            <ul className={styles.mobileLinks}>
              <li>
                <a 
                  href="/bebidas" 
                  className={`${styles.mobileLink} ${isActiveLink("/bebidas") ? styles.mobileLinkActive : ""}`}
                  onClick={closeMobileMenu}
                >
                  {ingles ? "Drinks" : "Bebidas"}
                </a>
              </li>
              <li>
                <a 
                  href="/hexy" 
                  className={`${styles.mobileLink} ${isActiveLink("/hexy") ? styles.mobileLinkActive : ""}`}
                  onClick={closeMobileMenu}
                >
                  Hexy
                </a>
              </li>
              <li>
                <a 
                  href="/merch" 
                  className={`${styles.mobileLink} ${isActiveLink("/merch") ? styles.mobileLinkActive : ""}`}
                  onClick={closeMobileMenu}
                >
                  Merch
                </a>
              </li>
              <li>
                <a 
                  href="/wonderpop" 
                  className={`${styles.mobileLink} ${isActiveLink("/wonderpop") ? styles.mobileLinkActive : ""}`}
                  onClick={closeMobileMenu}
                >
                  Wonderpop
                </a>
              </li>
            </ul>

            {/* Idioma en móvil */}
            <div className={styles.mobileLangToggle}>
              <button 
                className={`${styles.mobileLangButton} ${!ingles ? styles.mobileLangActive : ''}`}
                onClick={() => { handleLanguageChange('es'); closeMobileMenu(); }}
              >
                ES
              </button>
              <span className={styles.langSeparator}>|</span>
              <button 
                className={`${styles.mobileLangButton} ${ingles ? styles.mobileLangActive : ''}`}
                onClick={() => { handleLanguageChange('en'); closeMobileMenu(); }}
              >
                EN
              </button>
            </div>

            {/* CTA en móvil */}
            <a href="/wonderpop" className={styles.mobileCtaButton} onClick={closeMobileMenu}>
              <span className={styles.ctaIcon}>📍</span>
              {ingles ? "Visit Us" : "Visítanos"}
            </a>

            {/* Botón cerrar */}
            <button className={styles.closeButton} onClick={closeMobileMenu}>
              ✕
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
