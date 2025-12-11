import React, { useState, useEffect, useRef } from "react";
import styles from "./navbar.module.css";

import { useStore } from "@nanostores/react";
import { isEnglish, isDarkMode } from "../../data/variables"; 
import { useLang } from "../../data/signals";
import { translationsGlobal } from "../../data/translationsGlobal";
import Button from "../global/Button";

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentPath, setCurrentPath] = useState("");
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const { t, changeLang, lang } = useLang();
  const ingles = useStore(isEnglish);
  const darkMode = useStore(isDarkMode);
  
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

  // Función para cambiar tema
  const handleThemeToggle = () => {
    isDarkMode.set(!darkMode);
    setThemeDropdownOpen(false);
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
      {/* Logo en esquina izquierda - Contenedor independiente */}
      <div className={styles.logoContainer}>
        <a href="/" onClick={handleLogoClick} className={styles.logoLink}>
          <div className={styles.logopic}>
            <img src="/logo.png" alt="Energy Media Logo" />
          </div>
        </a>
      </div>

      {/* Contenedor central con blur (Links + Contact) */}
      <div className={styles.navContainer}>
        {/* Menú de navegación */}
        <ul className={styles.navMenu}>
          <li className={styles.navItem}>
            <a 
              href="/" 
              className={`${styles.navLink} ${isActiveLink("/") ? styles.activeLink : ""}`}
            >
              {navTranslations.home}
            </a>
          </li>
          <li className={styles.navItem}>
            <a 
              href="/servicios" 
              className={`${styles.navLink} ${isActiveLink("/servicios") ? styles.activeLink : ""}`}
            >
              {navTranslations.services}
            </a>
          </li>
          <li className={styles.navItem}>
            <a 
              href="/portfolio" 
              className={`${styles.navLink} ${isActiveLink("/portfolio") ? styles.activeLink : ""}`}
            >
              {navTranslations.ourWork}
            </a>
          </li>
        </ul>

        {/* Botón Contact Us */}
        <a className={styles.contactButton} href="/contacto">
          {navTranslations.contactUs}
        </a>
      </div>

      {/* Botón Hamburguesa (solo móvil) - FUERA del contenedor central */}
      <button 
        className={styles.hamburgerButton}
        onClick={toggleMobileMenu}
        aria-label="Toggle menu"
      >
        <span className={`${styles.hamburgerLine} ${mobileMenuOpen ? styles.hamburgerLineActive : ''}`}></span>
        <span className={`${styles.hamburgerLine} ${mobileMenuOpen ? styles.hamburgerLineActive : ''}`}></span>
        <span className={`${styles.hamburgerLine} ${mobileMenuOpen ? styles.hamburgerLineActive : ''}`}></span>
      </button>

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

        {/* Theme Dropdown */}
        <div className={styles.dropdown}>
          <button 
            className={styles.dropdownToggle}
            onClick={() => setThemeDropdownOpen(!themeDropdownOpen)}
          >
            {/* {darkMode ? '🌙' : '☀️'}  */}{darkMode ? navTranslations.darkMode : navTranslations.lightMode} ▼
          </button>
          {themeDropdownOpen && (
            <div className={styles.dropdownMenu}>
              <button 
                className={`${styles.dropdownItem} ${darkMode ? styles.active : ''}`}
                onClick={handleThemeToggle}
                disabled={darkMode}
              >
                {navTranslations.darkMode}
              </button>
              <button 
                className={`${styles.dropdownItem} ${!darkMode ? styles.active : ''}`}
                onClick={handleThemeToggle}
                disabled={!darkMode}
              >
                {navTranslations.lightMode}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Menú Móvil Overlay */}
      {mobileMenuOpen && (
        <div className={styles.mobileMenuOverlay} onClick={closeMobileMenu}>
          {/* Botón Cerrar - FUERA del content */}
      

          <div className={styles.mobileMenuContent} onClick={(e) => e.stopPropagation()}>
            {/* Navegación Móvil */}
            <ul className={styles.mobileNavMenu}>
              <li className={styles.mobileNavItem}>
                <a 
                  href="/" 
                  className={`${styles.mobileNavLink} ${isActiveLink("/") ? styles.activeLink : ""}`}
                  onClick={closeMobileMenu}
                >
                  {navTranslations.home}
                </a>
              </li>
              <li className={styles.mobileNavItem}>
                <a 
                  href="/servicios" 
                  className={`${styles.mobileNavLink} ${isActiveLink("/servicios") ? styles.activeLink : ""}`}
                  onClick={closeMobileMenu}
                >
                  {navTranslations.services}
                </a>
              </li>
              <li className={styles.mobileNavItem}>
                <a 
                  href="/portfolio" 
                  className={`${styles.mobileNavLink} ${isActiveLink("/portfolio") ? styles.activeLink : ""}`}
                  onClick={closeMobileMenu}
                >
                  {navTranslations.ourWork}
                </a>
              </li>
            </ul>

            {/* Botón Contact Móvil */}
            <div className={styles.mobileContactButtonWrapper} onClick={closeMobileMenu}>
              <Button
                textEs="Contáctanos"
                textEn="Contact Us"
                href="/contacto"
                variant="primary"
                size="lg"
                fullWidth={true}
                showArrow={true}
              />
            </div>

            {/* Dropdowns Móvil */}
            <div className={styles.mobileDropdowns}>
              {/* Language Selector */}
              <div className={styles.mobileDropdown}>
                <span className={styles.mobileDropdownLabel}>{navTranslations.language}</span>
                <div className={styles.mobileLanguageButtons}>
                  <button 
                    className={`${styles.mobileLangButton} ${!ingles ? styles.mobileLangButtonActive : ''}`}
                    onClick={() => handleLanguageChange('es')}
                  >
                    ES
                  </button>
                  <button 
                    className={`${styles.mobileLangButton} ${ingles ? styles.mobileLangButtonActive : ''}`}
                    onClick={() => handleLanguageChange('en')}
                  >
                    EN
                  </button>
                </div>
              </div>

              {/* Theme Selector */}
              <div className={styles.mobileDropdown}>
                <span className={styles.mobileDropdownLabel}>{navTranslations.theme}</span>
                <div className={styles.mobileLanguageButtons}>
                  <button 
                    className={`${styles.mobileLangButton} ${darkMode ? styles.mobileLangButtonActive : ''}`}
                    onClick={handleThemeToggle}
                    disabled={darkMode}
                  >
                    {navTranslations.darkMode}
                  </button>
                  <button 
                    className={`${styles.mobileLangButton} ${!darkMode ? styles.mobileLangButtonActive : ''}`}
                    onClick={handleThemeToggle}
                    disabled={!darkMode}
                  >
                    {navTranslations.lightMode}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
