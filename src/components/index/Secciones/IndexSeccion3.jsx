import { useState } from 'react';
import { useStore } from '@nanostores/react';
import { isEnglish, isDarkMode } from '../../../data/variables';
import styles from '../css/indexSeccion3.module.css';

const IndexSeccion3 = () => {
  const ingles = useStore(isEnglish);
  const darkMode = useStore(isDarkMode);
  const [selectedService, setSelectedService] = useState(null);
  const [isPaused, setIsPaused] = useState(false);

  const content = ingles ? {
    header: {
      title: "Our Services",
      subtitle: "Integral solutions for your digital growth. From strategy to execution.",
      seeMore: "See more"
    },
    items: [
      {
        title: "SEO & SEM Professional",
        tagline: "Dominate Google. More traffic, more sales.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
        bullets: [
          "Sustainable organic positioning",
          "Google Ads optimized with data",
          "Advanced analytics for decisions"
        ]
      },
      {
        title: "Social Media & Paid Ads",
        tagline: "Turn scrollers into customers.",
        image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80",
        bullets: [
          "Meta Ads + TikTok Ads + LinkedIn Ads",
          "Community management",
          "Creative content for conversions"
        ]
      },
      {
        title: "Branding & Graphic Design",
        tagline: "Memorable brand that stands out.",
        image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
        bullets: [
          "Logos + Corporate identity",
          "Brand manual + Visual guidelines",
          "Advertising design for all channels"
        ]
      },
      {
        title: "Web Development & Mobile Apps",
        tagline: "Web portals, CRM, custom mobile apps.",
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80",
        bullets: [
          "Responsive websites",
          "E-commerce with payment integration",
          "iOS/Android apps",
          "Business portals + Custom CRM"
        ]
      },
      {
        title: "Email Marketing & Automation",
        tagline: "Nurturing that sells on autopilot.",
        image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80",
        bullets: [
          "Segmented campaigns",
          "Automation + A/B testing",
          "400-600% ROI"
        ]
      },
      {
        title: "AI Marketing & Automation",
        tagline: "Artificial intelligence at your business service.",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
        bullets: [
          "Intelligent chatbots",
          "Process automation",
          "Predictive analysis",
          "Personalization at scale"
        ]
      }
    ],
    modalClose: "Close",
    modalLearnMore: "Explore service"
  } : {
    header: {
      title: "Nuestros Servicios",
      subtitle: "Soluciones integrales para tu crecimiento digital. De la estrategia a la ejecución.",
      seeMore: "Ver más"
    },
    items: [
      {
        title: "SEO & SEM Profesional",
        tagline: "Domina Google. Más tráfico, más ventas.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
        bullets: [
          "Posicionamiento orgánico sostenible",
          "Google Ads optimizados con datos",
          "Analítica avanzada para decisiones"
        ]
      },
      {
        title: "Redes Sociales & Paid Ads",
        tagline: "Convierte scrollers en clientes.",
        image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80",
        bullets: [
          "Meta Ads + TikTok Ads + LinkedIn Ads",
          "Gestión de comunidad",
          "Contenido creativo para conversión"
        ]
      },
      {
        title: "Branding & Diseño Gráfico",
        tagline: "Marca memorable que destaca.",
        image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
        bullets: [
          "Logos + Identidad corporativa",
          "Manual de marca + Guías visuales",
          "Diseño publicitario para todos los canales"
        ]
      },
      {
        title: "Desarrollo Web & Apps Móviles",
        tagline: "Portales web, CRM, apps móviles a medida.",
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80",
        bullets: [
          "Sitios web responsive",
          "E-commerce con integración de pagos",
          "Apps iOS/Android",
          "Portales empresariales + CRM personalizado"
        ]
      },
      {
        title: "Email Marketing & Automatización",
        tagline: "Nurturing que vende en piloto automático.",
        image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80",
        bullets: [
          "Campañas segmentadas",
          "Automatización + A/B testing",
          "ROI 400-600%"
        ]
      },
      {
        title: "Marketing con IA & Automatización",
        tagline: "Inteligencia artificial al servicio de tu negocio.",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
        bullets: [
          "Chatbots inteligentes",
          "Automatización de procesos",
          "Análisis predictivo",
          "Personalización a escala"
        ]
      }
    ],
    modalClose: "Cerrar",
    modalLearnMore: "Explorar servicio"
  };

  const t = ingles ? content : content;

  const openModal = (service) => {
    setSelectedService(service);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedService(null);
    document.body.style.overflow = 'auto';
  };

  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  // Duplicar items para carrusel infinito sin saltos
  const duplicatedItems = [...t.items, ...t.items];

  return (
    <section className={`${styles.section} ${!darkMode ? styles.sectionLight : ''}`}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>{t.header.title}</h2>
          <p className={styles.subtitle}>{t.header.subtitle}</p>
        </div>
        <button className={styles.seeMoreBtn}>{t.header.seeMore}</button>
      </div>

      <div className={styles.container}>
          <div 
            className={`${styles.carouselTrack} ${isPaused ? styles.paused : ''}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {duplicatedItems.map((service, index) => (
              <div
                key={`service-${index}`}
                className={styles.serviceCard}
                onClick={() => openModal(service)}
              >
                <div 
                  className={styles.cardImage}
                  style={{ backgroundImage: `url(${service.image})` }}
                >
                  <div className={styles.overlay}></div>
                </div>
                <div className={styles.cardContent}>
                  <h3 className={styles.cardTitle}>{service.title}</h3>
                  <p className={styles.cardTagline}>{service.tagline}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      {/* Modal */}
      {selectedService && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
            <button className={styles.modalCloseBtn} onClick={closeModal}>
              ✕
            </button>
            
            <div 
              className={styles.modalImage}
              style={{ backgroundImage: `url(${selectedService.image})` }}
            >
              <div className={styles.modalImageOverlay}></div>
            </div>

            <div className={styles.modalContent}>
              <h3 className={styles.modalTitle}>{selectedService.title}</h3>
              <p className={styles.modalTagline}>{selectedService.tagline}</p>

              <ul className={styles.modalBullets}>
                {selectedService.bullets.map((bullet, index) => (
                  <li key={index} className={styles.modalBulletItem}>
                    <div className={styles.bulletCheck}>✓</div>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              <button className={styles.modalCta}>{t.modalLearnMore}</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default IndexSeccion3;
