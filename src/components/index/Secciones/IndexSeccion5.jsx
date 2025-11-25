import { useState, useEffect, useRef } from 'react';
import { useStore } from '@nanostores/react';
import { isEnglish, isDarkMode } from '../../../data/variables';
import styles from '../css/indexSeccion5.module.css';

const IndexSeccion5 = () => {
   const ingles = useStore(isEnglish);
   const darkMode = useStore(isDarkMode);
  
  const content = {
    es: {
      title: "¿Curioso? ¡Entérate de todo! (FAQs)",
      subtitle: "Respuestas a las preguntas más comunes sobre nuestros servicios",
      items: [
        {
          question: "¿Qué servicios ofrecen?",
          answer: "Ofrecemos una gama completa de servicios digitales que incluyen producción de video, marketing digital, branding, desarrollo web y soluciones impulsadas por IA para ayudar a crecer tu negocio."
        },
        {
          question: "¿Cuánto cuesta la producción de video?",
          answer: "Los costos varían según la complejidad, duración y requisitos específicos del proyecto. Ofrecemos paquetes flexibles desde clips básicos para redes sociales hasta producciones comerciales a gran escala."
        },
        {
          question: "¿Cuánto tiempo toma producir un video?",
          answer: "Un cronograma de producción típico oscila entre 2 y 6 semanas, dependiendo del alcance. Esto incluye preproducción, filmación y edición de postproducción."
        },
        {
          question: "¿Pueden ayudar con la redacción de guiones y storyboards?",
          answer: "¡Absolutamente! Nuestro equipo creativo se especializa en elaborar guiones convincentes y storyboards detallados para asegurar que tu mensaje se transmita efectivamente."
        },
        {
          question: "¿Cómo es el proceso de producción?",
          answer: "Nuestro proceso implica tres etapas principales: Preproducción (planificación), Producción (filmación) y Postproducción (edición). Te mantenemos involucrado en cada paso."
        },
        {
          question: "¿Ofrecen servicios de video marketing?",
          answer: "Sí, ayudamos a distribuir tus videos con estrategias que incluyen optimización SEO, campañas de anuncios en redes sociales y análisis para maximizar tu ROI."
        },
        {
          question: "¿Pueden trabajar con un presupuesto específico?",
          answer: "Entendemos que cada negocio tiene diferentes limitaciones financieras. Estamos encantados de discutir tu presupuesto y adaptar una solución que ofrezca el mejor valor."
        }
      ]
    },
    en: {
      title: "Curious? Check Out the Scoop! (FAQs)",
      subtitle: "Answers to the most common questions about our services",
      items: [
        {
          question: "What services do you offer?",
          answer: "We offer a comprehensive range of digital services including video production, digital marketing, branding, web development, and AI-powered solutions to help your business grow."
        },
        {
          question: "How much does video production cost?",
          answer: "Costs vary depending on the project's complexity, length, and specific requirements. We offer flexible packages starting from basic social media clips to full-scale commercial productions."
        },
        {
          question: "How long does it take to produce a video?",
          answer: "A typical production timeline ranges from 2 to 6 weeks, depending on the scope. This includes pre-production, filming, and post-production editing."
        },
        {
          question: "Can you help with scriptwriting and storyboarding?",
          answer: "Absolutely! Our creative team specializes in crafting compelling scripts and detailed storyboards to ensure your message is conveyed effectively."
        },
        {
          question: "What is the production process like?",
          answer: "Our process involves three main stages: Pre-production (planning), Production (filming), and Post-production (editing). We keep you involved at every step."
        },
        {
          question: "Do you provide video marketing services?",
          answer: "Yes, we help distribute your videos with strategies including SEO optimization, social media ad campaigns, and analytics to maximize your ROI."
        },
        {
          question: "Can you work with a specific budget?",
          answer: "We understand that every business has different financial constraints. We are happy to discuss your budget and tailor a solution that delivers the best possible value."
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
