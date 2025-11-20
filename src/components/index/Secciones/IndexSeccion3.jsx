import { useState } from 'react';
import { useStore } from '@nanostores/react';
import { isEnglish } from '../../../data/variables';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import styles from '../css/indexSeccion3.module.css';

const IndexSeccion3 = () => {
  const ingles = useStore(isEnglish);
  const [selectedService, setSelectedService] = useState(null);
  
  const content = {
    es: {
      title: "Our Services",
      subtitle: "Services Crafted to Elevate Your Vision",
      seeMore: "See more",
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
            "A/B testing creativo"
          ]
        },
        {
          title: "Branding & Diseño Gráfico",
          tagline: "Marca memorable que destaca.",
          image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
          bullets: [
            "Logos + Identidad corporativa",
            "Manual de marca + Sistema visual",
            "Diseño publicitario"
          ]
        },
        {
          title: "Desarrollo Web & Apps Móviles",
          tagline: "Portales web, CRM, apps móviles a medida.",
          image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80",
          bullets: [
            "Sitios web responsive + E-commerce",
            "Apps iOS/Android",
            "Portales empresariales + CRM personalizado"
          ]
        },
        {
          title: "Email Marketing & Automatización",
          tagline: "Nurturing que vende en piloto automático.",
          image: "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=800&q=80",
          bullets: [
            "Campañas segmentadas",
            "Automatización avanzada",
            "A/B testing + Optimización"
          ]
        },
        {
          title: "Marketing con IA & Automatización",
          tagline: "Inteligencia artificial al servicio de tu negocio.",
          image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
          bullets: [
            "Chatbots inteligentes",
            "Automatización de procesos",
            "Análisis predictivo + Personalización"
          ]
        }
      ],
      modalClose: "Cerrar",
      modalLearnMore: "Explorar servicio"
    },
    en: {
      title: "Our Services",
      subtitle: "Services Crafted to Elevate Your Vision",
      seeMore: "See more",
      items: [
        {
          title: "Professional SEO & SEM",
          tagline: "Dominate Google. More traffic, more sales.",
          image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
          bullets: [
            "Sustainable organic positioning",
            "Data-optimized Google Ads",
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
            "Creative A/B testing"
          ]
        },
        {
          title: "Branding & Graphic Design",
          tagline: "Memorable brand that stands out.",
          image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
          bullets: [
            "Logos + Corporate identity",
            "Brand manual + Visual system",
            "Advertising design"
          ]
        },
        {
          title: "Web Development & Mobile Apps",
          tagline: "Web portals, CRM, custom mobile apps.",
          image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80",
          bullets: [
            "Responsive websites + E-commerce",
            "iOS/Android apps",
            "Business portals + Custom CRM"
          ]
        },
        {
          title: "Email Marketing & Automation",
          tagline: "Nurturing that sells on autopilot.",
          image: "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=800&q=80",
          bullets: [
            "Segmented campaigns",
            "Advanced automation",
            "A/B testing + Optimization"
          ]
        },
        {
          title: "AI Marketing & Automation",
          tagline: "Artificial intelligence at your service.",
          image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
          bullets: [
            "Intelligent chatbots",
            "Process automation",
            "Predictive analysis + Personalization"
          ]
        }
      ],
      modalClose: "Close",
      modalLearnMore: "Explore service"
    }
  };
  
  const t = ingles ? content.en : content.es;

  // Keen Slider con autoplay infinito
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    mode: "free-snap",
    slides: {
      perView: 3.5,
      spacing: 24,
    },
    breakpoints: {
      "(max-width: 1024px)": {
        slides: { perView: 2.5, spacing: 20 },
      },
      "(max-width: 768px)": {
        slides: { perView: 1.5, spacing: 16 },
      },
    },
  }, [
    (slider) => {
      let timeout;
      let mouseOver = false;
      function clearNextTimeout() {
        clearTimeout(timeout);
      }
      function nextTimeout() {
        clearTimeout(timeout);
        if (mouseOver) return;
        timeout = setTimeout(() => {
          slider.next();
        }, 3000);
      }
      slider.on("created", () => {
        slider.container.addEventListener("mouseover", () => {
          mouseOver = true;
          clearNextTimeout();
        });
        slider.container.addEventListener("mouseout", () => {
          mouseOver = false;
          nextTimeout();
        });
        nextTimeout();
      });
      slider.on("dragStarted", clearNextTimeout);
      slider.on("animationEnded", nextTimeout);
      slider.on("updated", nextTimeout);
    },
  ]);

  const openModal = (service) => {
    setSelectedService(service);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedService(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div>
            <h2 className={styles.title}>{t.title}</h2>
            <p className={styles.subtitle}>{t.subtitle}</p>
          </div>
          <button className={styles.seeMoreBtn}>
            {t.seeMore} →
          </button>
        </div>

        {/* Carrusel */}
        <div ref={sliderRef} className="keen-slider">
          {t.items.map((service, index) => (
            <div 
              key={index} 
              className={`keen-slider__slide ${styles.serviceCard}`}
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
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <button className={styles.modalClose} onClick={closeModal}>×</button>
            
            <div 
              className={styles.modalImage}
              style={{ backgroundImage: `url(${selectedService.image})` }}
            ></div>
            
            <div className={styles.modalContent}>
              <h3 className={styles.modalTitle}>{selectedService.title}</h3>
              <p className={styles.modalTagline}>{selectedService.tagline}</p>
              
              <ul className={styles.modalBullets}>
                {selectedService.bullets.map((bullet, idx) => (
                  <li key={idx} className={styles.modalBullet}>
                    <span className={styles.bulletIcon}>✓</span>
                    {bullet}
                  </li>
                ))}
              </ul>
              
              <button className={styles.modalCta}>
                {t.modalLearnMore} →
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default IndexSeccion3;
