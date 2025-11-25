import { useState, useEffect, useRef } from 'react';
import { useStore } from '@nanostores/react';
import { isEnglish, isDarkMode } from '../../../data/variables';
import styles from '../css/indexSeccion5.module.css';

const IndexSeccion5 = () => {
   const ingles = useStore(isEnglish);
   const darkMode = useStore(isDarkMode);
  
  const content = {
    es: {
      title: "¿Preguntas? ¡Tenemos respuestas!",
      subtitle: "Respuestas a las preguntas más comunes sobre nuestros servicios",
      items: [
        {
          question: "¿En qué industrias se especializan?",
          answer: "Trabajamos en múltiples verticales—desde salud y educación hasta hospitalidad, automotriz, tecnología y legal. Nuestro equipo se adapta a la voz de tu marca, regulaciones de la industria y comportamiento de la audiencia para ofrecer contenido que funciona."
        },
        {
          question: "¿Cómo determinan el precio de los proyectos?",
          answer: "Cada proyecto se cotiza de manera personalizada según complejidad, entregables, plazos y recursos. Después de una breve llamada de descubrimiento, proporcionamos una estimación transparente y opciones que se ajustan a tus objetivos y presupuesto."
        },
        {
          question: "¿Cuál es su tiempo de entrega típico?",
          answer: "Los plazos varían según el tipo de proyecto—videos, campañas completas, aplicaciones móviles o contenido creativo. Después del descubrimiento, te damos un cronograma claro que cubre preproducción, producción y revisiones para que no haya sorpresas."
        },
        {
          question: "¿Ofrecen soporte continuo después de completar un proyecto?",
          answer: "¡Sí! Ya sea que necesites gestión mensual de redes sociales, creación continua de contenido, actualizaciones de aplicaciones, reportes de analítica o estrategia de marketing a largo plazo, ofrecemos opciones de retención y soporte continuo."
        },
        {
          question: "¿Pueden trabajar con mi equipo existente de branding o marketing?",
          answer: "Absolutamente. Colaboramos sin problemas con equipos internos, agencias y socios de marca. También podemos desarrollar nuevas estrategias creativas, branding o bases de campaña si es necesario."
        },
        {
          question: "¿Cómo miden el éxito de sus campañas o contenido?",
          answer: "Nuestro trabajo está basado en datos. Rastreamos el rendimiento usando analítica, KPIs adaptados a tu proyecto e insights en tiempo real para optimizar resultados—ya sea engagement, conversiones, instalaciones o conocimiento de marca."
        },
        {
          question: "¿Cómo es el proceso de incorporación?",
          answer: "Después de una consulta inicial, comenzamos con una sesión de descubrimiento para entender tus objetivos, audiencia, tono y entregables. Desde ahí, creamos un roadmap del proyecto, recopilamos activos, iniciamos el desarrollo creativo y te mantenemos actualizado en cada etapa."
        }
      ]
    },
    en: {
      title: "Questions? We Have Answers!",
      subtitle: "Answers to the most common questions about our services",
      items: [
        {
          question: "What industries do you specialize in?",
          answer: "We work across multiple verticals—from healthcare and education to hospitality, automotive, tech, and legal. Our team adapts to your brand's voice, industry regulations, and audience behavior to deliver content that performs."
        },
        {
          question: "How do you determine pricing for projects?",
          answer: "Every project is custom-scoped based on complexity, deliverables, timelines, and resources. After a quick discovery call, we provide a transparent estimate and options that match your goals and budget."
        },
        {
          question: "What is your typical turnaround time?",
          answer: "Timelines vary by project type—videos, full campaigns, mobile apps, or creative content. After discovery, we give you a clear schedule that covers pre-production, production, and revisions so there are no surprises."
        },
        {
          question: "Do you offer ongoing support after a project is completed?",
          answer: "Yes! Whether you need monthly social media management, ongoing content creation, app updates, analytics reporting, or long-term marketing strategy, we provide retainer options and ongoing support."
        },
        {
          question: "Can you work with my existing branding or marketing team?",
          answer: "Absolutely. We seamlessly collaborate with internal teams, agencies, and brand partners. We can also develop fresh creative strategies, branding, or campaign foundations if needed."
        },
        {
          question: "How do you measure success for your campaigns or content?",
          answer: "Our work is data-driven. We track performance using analytics, KPIs tailored to your project, and real-time insights to optimize results—whether it's engagement, conversions, installs, or brand awareness."
        },
        {
          question: "What does the onboarding process look like?",
          answer: "After an initial consultation, we kick off with a discovery session to understand your goals, audience, tone, and deliverables. From there, we create a project roadmap, gather assets, begin creative development, and keep you updated throughout each stage."
        }
      ]
    }
  };
  
  const t = ingles ? content.en : content.es;

  const [isVisible, setIsVisible] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState(null);
  const sectionRef = useRef(null);

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
   <section className={`${styles.section} ${!darkMode ? styles.sectionLight : ''}`}>
      <div ref={sectionRef} className={styles.faqsContainer}>
        {/* Header */}
        <div className={`${styles.sectionHeader} ${isVisible ? styles.visible : ''}`}>
          <h2 className={styles.sectionTitle}>{t.title}</h2>
          <p className={styles.sectionSubtitle}>{t.subtitle}</p>
        </div>

        {/* FAQs Accordion */}
        <div className={styles.faqsList}>
          {t.items.map((faq, index) => (
            <div
              key={index}
              className={`${styles.faqItem} ${
                isVisible ? styles.visible : ''
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <button
                className={styles.faqQuestion}
                onClick={() => toggleFaq(index)}
                aria-expanded={expandedFaq === index}
              >
                <span>{faq.question}</span>
                <span className={styles.faqIcon}>
                  {expandedFaq === index ? '−' : '+'}
                </span>
              </button>
              
              {expandedFaq === index && (
                <div className={styles.faqAnswer}>
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
 </section>
  );
};

export default IndexSeccion5;
