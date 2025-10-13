import React, { useState, useEffect, useRef } from "react";
import styles from "./navbar.module.css";

import { useStore } from "@nanostores/react";
import { isEnglish, selectedCountry } from "../../data/variables"; 
import { useLang } from "../../data/signals";
import { translations } from "../../data/translations";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentPath, setCurrentPath] = useState("");
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const country = useStore(selectedCountry);
  const { t, changeLang, lang } = useLang();
  const ingles = useStore(isEnglish);
  const textosNavbar = ingles ? translations.en.navbar : translations.es.navbar;

  // Sincronización inicial del idioma con el país seleccionado
  useEffect(() => {
    // Asegurar que el idioma y el país estén sincronizados al cargar
    const currentCountry = selectedCountry.get();
    const currentIsEnglish = isEnglish.get();
    
    // Si no hay valor en localStorage, establecer valores por defecto (inglés/USA)
    if (!localStorage.getItem('selectedCountry')) {
      selectedCountry.set('usa');
      isEnglish.set(true);
      changeLang('en');
    } else {
      // Sincronizar estado si hay desincronización
      if (currentCountry === 'usa' && !currentIsEnglish) {
        isEnglish.set(true);
        changeLang('en');
      } else if (currentCountry === 'mex' && currentIsEnglish) {
        isEnglish.set(false);
        changeLang('es');
      }
    }
  }, []); // Solo al montar el componente

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
      
      if (isOpen) {
        setIsOpen(false);
      }
    };

    // Detectar cambios de tamaño de ventana
    const handleResize = () => {
      // Si la ventana es mayor a 900px y el menú está abierto, cerrarlo
      if (window.innerWidth > 900 && isOpen) {
        setIsOpen(false);
      }
    };

    // Detectar cambios en la URL (navegación)
    const handleLocationChange = () => {
      const newPath = window.location.pathname;

      setCurrentPath(newPath);
      // Cerrar el menú móvil al navegar
      if (isOpen) {
        setIsOpen(false);
      }
    };

    // Detectar la página actual inicialmente
    setCurrentPath(window.location.pathname);

    // Event listeners
    const handleClickOutside = (event) => {
      if (
        menuRef.current && 
        !menuRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    // Listener para detectar cambios en la URL (popstate para botón atrás/adelante)
    const handlePopState = () => {
      handleLocationChange();
    };

    // Listener personalizado para detectar navegación programática
    const originalPushState = history.pushState;
    const originalReplaceState = history.replaceState;

    history.pushState = function() {
      originalPushState.apply(history, arguments);
      setTimeout(handleLocationChange, 0); // Defer to next tick
    };

    history.replaceState = function() {
      originalReplaceState.apply(history, arguments);
      setTimeout(handleLocationChange, 0); // Defer to next tick
    };

    // Listener específico para Astro view transitions
    const handleAstroBeforeSwap = () => {
      setTimeout(handleLocationChange, 0);
    };

    const handleAstroAfterSwap = () => {
      setTimeout(handleLocationChange, 100); // Dar más tiempo para que Astro complete
    };

    // Listener para cualquier cambio en el DOM que indique navegación
    const observer = new MutationObserver(() => {
      const newPath = window.location.pathname;
      if (newPath !== currentPath) {
        handleLocationChange();
      }
    });

    // Observar cambios en el title del documento (Astro lo cambia en navegación)
    observer.observe(document.querySelector('title') || document.head, {
      childList: true,
      characterData: true
    });

    // Polling como fallback para casos edge
    const pathCheckInterval = setInterval(() => {
      const newPath = window.location.pathname;
      if (newPath !== currentPath) {

        handleLocationChange();
      }
    }, 100);

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    window.addEventListener('popstate', handlePopState);
    
    // Listeners específicos para Astro
    document.addEventListener('astro:before-swap', handleAstroBeforeSwap);
    document.addEventListener('astro:after-swap', handleAstroAfterSwap);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('popstate', handlePopState);
      document.removeEventListener('astro:before-swap', handleAstroBeforeSwap);
      document.removeEventListener('astro:after-swap', handleAstroAfterSwap);
      document.body.style.overflow = '';
      
      // Limpiar observer y polling
      observer.disconnect();
      clearInterval(pathCheckInterval);
      
      // Restaurar métodos originales
      history.pushState = originalPushState;
      history.replaceState = originalReplaceState;
    };
  }, [isOpen, currentPath]); // Agregar currentPath como dependencia

  // Función para alternar el menú en móviles
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Función para manejar el cambio de país en el switch
  const handleSwitch = (country) => {
    selectedCountry.set(country);
    if (country === "mex") {
      isEnglish.set(false);
      changeLang("es");
    } else if (country === "usa") {
      isEnglish.set(true);
      changeLang("en");
    }
  };

  // Función para verificar si el enlace está activo
  const isActiveLink = (href) => {
    if (href === "/" && currentPath === "/") return true;
    if (href !== "/" && currentPath.startsWith(href)) return true;
    return false;
  };

  return (
    <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ""}`}>
      {/* Overlay para móvil */}
      {isOpen && <div className={styles.overlay} onClick={toggleMenu} />}
      
      {/* Logo con efecto de hover mejorado */}
      <a href="/" onClick={handleLogoClick} className={styles.logoLink}>
        <div className={styles.logopic}>
          <img src="/logo.gif" alt="Energy Media Logo" />
          <div className={styles.logoGlow}></div>
        </div>
      </a>

      {/* Switch de países mejorado */}
      <div className={styles.countrySwitch}>
        <div
          className={`${styles.switchIconContainer} ${country === "mex" ? styles.active : styles.inactive}`}
          onClick={() => handleSwitch("mex")}
        >
          <img src="/icons/icon_mex.webp" alt="Mexico" className={styles.switchIcon} />
        </div>
        <div
          className={`${styles.switchIconContainer} ${country === "usa" ? styles.active : styles.inactive}`}
          onClick={() => handleSwitch("usa")}
        >
          <img src="/icons/icon_usa.webp" alt="USA" className={styles.switchIcon} />
        </div>
        <div className={styles.switchIndicator}></div>
      </div>

      {/* Ícono de menú hamburguesa animado */}
      <div 
        className={`${styles.hamburger} ${isOpen ? styles.active : ""}`} 
        onClick={toggleMenu} 
        ref={buttonRef}
        aria-label="Toggle menu"
      >
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
      </div>

      {/* Menú de navegación con indicadores activos */}
      <ul className={`${styles.navMenu} ${isOpen ? styles.active : ""}`} ref={menuRef}>
    <li className={styles.navItem}>
          <a 
            href="/" 
            className={`${styles.navLink} ${isActiveLink("/") ? styles.activeLink : ""}`}
          >
            {textosNavbar.inicio}
          </a>
        </li>
        <li className={styles.navItem}>
          <a 
            href="/servicios" 
            className={`${styles.navLink} ${isActiveLink("/servicios") ? styles.activeLink : ""}`}
          >
            {textosNavbar.servicios}
          </a>
        </li>
        <li className={styles.navItem}>
          <a 
            href="/portfolio" 
            className={`${styles.navLink} ${isActiveLink("/portfolio") ? styles.activeLink : ""}`}
          >
            {textosNavbar.portfolio}
          </a>
        </li>
        <li className={styles.navItem}>
          <a 
            href="/metodologia" 
            className={`${styles.navLink} ${isActiveLink("/metodologia") ? styles.activeLink : ""}`}
          >
            {textosNavbar.metodologia}
          </a>
        </li>
        <li className={styles.navItem}>
          <a 
            href="/nosotros" 
            className={`${styles.navLink} ${isActiveLink("/nosotros") ? styles.activeLink : ""}`}
          >
            {textosNavbar.nosotros}
          </a>
        </li>
       
        
        {/* Botón de CTA separado para móvil */}
        <li className={`${styles.navItem} ${styles.mobileLoginItem} ${styles.mobileOnly}`}>
          <a className={`${styles.buyButton} ${styles.mobileLoginButton}`} href="/contacto">
            <span className={styles.buttonText}>{textosNavbar.contacto}</span>
            <div className={styles.buttonShine}></div>
          </a>
        </li>
      </ul>

      {/* Grupo de íconos sociales con efectos mejorados */}
      <div className={styles.socialIconsGroup}>
        <a href="https://www.linkedin.com/company/energy-media-pro/" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
          <img src="/icons/linkedin.svg" alt="LinkedIn" className={styles.icon} />
          <div className={styles.iconRipple}></div>
        </a>
        <a href="https://www.facebook.com/energymediaofficial" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
          <img src="/icons/facebook.svg" alt="Facebook" className={styles.icon} />
          <div className={styles.iconRipple}></div>
        </a>
        <a href="https://www.instagram.com/energymedia_official/" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
          <img src="/icons/insta.svg" alt="Instagram" className={styles.icon} />
          <div className={styles.iconRipple}></div>
        </a>
      </div>

      {/* Botón de contacto con efectos premium */}
      <div className={styles.desktopOnly}>
        <a className={styles.buyButton} href="/contacto">
          <span className={styles.buttonText}>{textosNavbar.contacto}</span>
          <div className={styles.buttonShine}></div>
        </a>
      </div>
    </nav>
  );
};

export default NavBar;
