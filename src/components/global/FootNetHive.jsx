import React from "react";
import { isEnglish } from '../../data/variables';
import { useStore } from '@nanostores/react';
import styles from "./css/footnethive.module.css";
import { useState, useEffect, useRef } from 'react';
const FootNetHive = () => {
 
  const ingles = useStore(isEnglish);
  
  const content = {
    es: {
      title: "Convierte Ideas Audaces en Campañas de Alto ROI.",
      subtitle: "¿Tienes preguntas, ideas de proyectos o solo quieres saludar? ¡Somos todo oídos!",
      ctaButton: "Colaboremos",
      addressLabel: "Dirección:",
      address: "123 Example St, Suite 32, CA,",
      emailLabel: "Email:",
      email: "contact@energymedia.com",
      phoneLabel: "Teléfono:",
      phone: "(619) 123-4567",
      hoursLabel: "Horario:",
      hours: "Domingo - Jueves : 9am a 5pm",
      newsletterText: "¡Comparte tu email para contactarte!",
      subscribeBtn: "Suscribirse",
      quickLinksTitle: "Enlaces Rápidos",
      legalTitle: "Legal",
      socialTitle: "Redes Sociales",
      links: {
        home: "INICIO",
        services: "SERVICIOS",
        work: "NUESTRO TRABAJO",
        contact: "CONTACTO",
        privacy: "POLÍTICA DE PRIVACIDAD",
        terms: "TÉRMINOS Y CONDICIONES"
      }
    },
    en: {
      title: "Turn Bold Ideas into ROI-Driven Campaigns.",
      subtitle: "Got questions, project ideas, or just want to say hi? We're all ears!",
      ctaButton: "Let's Collaborate",
      addressLabel: "Address:",
      address: "123 Example St, Suite 32, CA,",
      emailLabel: "Email:",
      email: "contact@energymedia.com",
      phoneLabel: "Phone:",
      phone: "(619) 123-4567",
      hoursLabel: "Business Hours:",
      hours: "Sunday - Thursday : 9am to 5pm",
      newsletterText: "Share your email to contact you!",
      subscribeBtn: "Subscribe",
      quickLinksTitle: "Quick Links",
      legalTitle: "Legal",
      socialTitle: "Social Medias",
      links: {
        home: "HOME",
        services: "SERVICES",
        work: "OUR WORK",
        contact: "CONTACT",
        privacy: "PRIVACY POLICY",
        terms: "TERMS & CONDITIONS"
      }
    }
  };
  
  const t = ingles ? content.en : content.es;
  
  const sectionRef = useRef(null);
  return (
    <footer ref={sectionRef} className={styles.footer}>
 <div className={styles.container}>
        
        {/* Top CTA Box */}
        <div className={styles.ctaBox}>
          <div className={styles.logoWrapper}>
            <img src="/logo.png" alt="Energy Media" className={styles.logo} />
          </div>
          <h2 className={styles.title}>{t.title}</h2>
          <p className={styles.subtitle}>{t.subtitle}</p>
          <a href="/contacto" className={styles.ctaButton}>{t.ctaButton}</a>
        </div>

        {/* Middle Grid */}
        <div className={styles.middleGrid}>
          
          {/* Left: Contact Info */}
          <div className={styles.infoBox}>
            <div className={styles.contactDetails}>
              <p><span className={styles.label}>{t.addressLabel}</span> {t.address}</p>
              <p><span className={styles.label}>{t.emailLabel}</span> {t.email}</p>
              <p><span className={styles.label}>{t.phoneLabel}</span> {t.phone}</p>
              <p><span className={styles.label}>{t.hoursLabel}</span> {t.hours}</p>
            </div>
            
            <div className={styles.newsletter}>
              <p className={styles.newsletterText}>{t.newsletterText}</p>
              <form className={styles.subscribeForm} onSubmit={(e) => e.preventDefault()}>
                <div className={styles.inputRow}>
                  <input 
                    type="text" 
                    placeholder={ingles ? "Your name" : "Tu nombre"} 
                    className={styles.nameInput} 
                    required
                  />
                  <input 
                    type="email" 
                    placeholder={ingles ? "your@email.com" : "tu@email.com"} 
                    className={styles.emailInput} 
                    required
                  />
                </div>
                <button type="submit" className={styles.subscribeBtn}>{t.subscribeBtn}</button>
              </form>
            </div>
          </div>

          {/* Right: Links */}
          <div className={styles.linksBox}>
            <div className={styles.linkColumn}>
              <h3>{t.quickLinksTitle}</h3>
              <ul>
                <li><a href="/">{t.links.home}</a></li>
                <li><a href="/servicios">{t.links.services}</a></li>
                <li><a href="/portfolio">{t.links.work}</a></li>
                <li><a href="/contacto">{t.links.contact}</a></li>
              </ul>
            </div>
            <div className={styles.linkColumn}>
              <h3>{t.legalTitle}</h3>
              <ul>
                <li><a href="/privacy">{t.links.privacy}</a></li>
                <li><a href="/terms">{t.links.terms}</a></li>
              </ul>
            </div>
            <div className={styles.linkColumn}>
              <h3>{t.socialTitle}</h3>
              <ul>
                <li><a href="#">FACEBOOK</a></li>
                <li><a href="#">VIMEO</a></li>
                <li><a href="#">TIKTOK</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Social Buttons */}
        <div className={styles.socialGrid}>
          <a href="#" className={styles.socialBtn}>TWITTER</a>
          <a href="#" className={styles.socialBtn}>LINKEDIN</a>
          <a href="#" className={styles.socialBtn}>YOUTUBE</a>
          <a href="#" className={styles.socialBtn}>INSTAGRAM</a>
        </div>

      </div>


    </footer>
  );
};

export default FootNetHive;