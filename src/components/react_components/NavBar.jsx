import React, { useState, useEffect, useRef } from "react";
import styles from "./navbar.module.css";

import { useStore } from "@nanostores/react";
import { isEnglish } from "../../data/variables"; 
import { useLang } from "../../data/signals";

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentPath, setCurrentPath] = useState("");
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);
  
  const { t, changeLang, lang } = useLang();
  const ingles = useStore(isEnglish);

  // Función para navegar al inicio
  const handleLogoClick = (e) => {
    e.preventDefault();
    window.location.href = '/';
  };

  useEffect(() => {
    // Detectar scroll para efectos de navbar
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 20);
    };

    // Detectar cambios en la URL (navegación)
    const handleLocationChange = () => {
      const newPath = window.location.pathname;
      setCurrentPath(newPath);
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
    setLangDropdownOpen(false);
  };

  return (
    <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ""}`}>
      {/* Contenedor central con blur (Logo + Links + Contact) */}
      <div className={styles.navContainer}>
        {/* Logo */}
        <a href="/" onClick={handleLogoClick} className={styles.logoLink}>
          <div className={styles.logopic}>
            <img src="/logo.png" alt="Energy Media Logo" />
          </div>
        </a>

        {/* Menú de navegación */}
        <ul className={styles.navMenu}>
          <li className={styles.navItem}>
            <a 
              href="/" 
              className={`${styles.navLink} ${isActiveLink("/") ? styles.activeLink : ""}`}
            >
              Home
            </a>
          </li>
          <li className={styles.navItem}>
            <a 
              href="/servicios" 
              className={`${styles.navLink} ${isActiveLink("/servicios") ? styles.activeLink : ""}`}
            >
              Services
            </a>
          </li>
          <li className={styles.navItem}>
            <a 
              href="/portfolio" 
              className={`${styles.navLink} ${isActiveLink("/portfolio") ? styles.activeLink : ""}`}
            >
              Our Work
            </a>
          </li>
        </ul>

        {/* Botón Contact Us */}
        <a className={styles.contactButton} href="/contacto">
          Contact Us
        </a>
      </div>

      {/* Dropdowns (Idioma y Dark Mode) - FUERA del contenedor */}
      <div className={styles.dropdownGroup}>
        {/* Language Dropdown */}
        <div className={styles.dropdown}>
          <button 
            className={styles.dropdownToggle}
            onClick={() => setLangDropdownOpen(!langDropdownOpen)}
          >
            {ingles ? 'EN' : 'ES'} ▼
          </button>
          {langDropdownOpen && (
            <div className={styles.dropdownMenu}>
              <button 
                className={styles.dropdownItem}
                onClick={() => handleLanguageChange('en')}
              >
                English
              </button>
              <button 
                className={styles.dropdownItem}
                onClick={() => handleLanguageChange('es')}
              >
                Español
              </button>
            </div>
          )}
        </div>

        {/* Theme Dropdown (hardcoded por ahora) */}
        <div className={styles.dropdown}>
          <button 
            className={styles.dropdownToggle}
            onClick={() => setThemeDropdownOpen(!themeDropdownOpen)}
          >
            Dark Mode ▼
          </button>
          {themeDropdownOpen && (
            <div className={styles.dropdownMenu}>
              <button className={styles.dropdownItem}>
                Dark Mode (Current)
              </button>
              <button className={`${styles.dropdownItem} ${styles.disabled}`}>
                Light Mode (Coming Soon)
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
