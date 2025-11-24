import { useState, useEffect, useRef } from 'react';
import { useStore } from '@nanostores/react';
import { isEnglish } from '../../../data/variables';
import styles from '../css/indexSeccion10.module.css';

/**
 * IndexSeccion10 - PREGUNTAS FRECUENTES
 * Accordion expandible para reducir fricción pre-contacto
 * Sistema "Cine-Data Multicultural" - Energy Media
 */
const IndexSeccion10 = () => {
  const ingles = useStore(isEnglish);
  
  const content = {
    es: {
      title: "Preguntas Frecuentes",
      subtitle: "Todo lo que necesitas saber antes de comenzar",
      items: [
        {
          question: "¿Cuánto tiempo toma ver resultados?",
          answer: "Primeros resultados medibles en 30 días (tráfico, engagement). ROI significativo en 90 días. Campañas de awareness pueden tomar 60-90 días. Te damos visibilidad completa con reports quincenales."
        },
        {
          question: "¿Qué pasa si no estoy satisfecho?",
          answer: "Garantía de 90 días. Si no ves resultados medibles en ese periodo, reembolso completo sin preguntas. Además, contratos flexibles sin permanencia forzada."
        },
        {
          question: "¿Trabajan con mi industria?",
          answer: "Sí. Hemos trabajado con e-commerce, servicios profesionales, B2B tech, educación, salud, fintech, retail. Si vendes online o necesitas leads, podemos ayudarte."
        },
        {
          question: "¿Qué tipo de soporte ofrecen?",
          answer: "GROWTH y PREMIUM: respuesta <2 horas en horario laboral. STARTER: <24 horas. Todos los planes incluyen account manager asignado y acceso a dashboards 24/7."
        },
        {
          question: "¿Puedo cambiar de plan después?",
          answer: "Totalmente. Muchos clientes empiezan con STARTER y escalan a GROWTH cuando ven resultados. Sin penalizaciones por upgrade/downgrade."
        },
        {
          question: "¿Requieren permanencia mínima?",
          answer: "Plan inicial de 90 días para garantizar tiempo suficiente de optimización. Después, mes a mes. Sin ataduras de 12-24 meses."
        }
      ]
    },
    en: {
      title: "Frequently Asked Questions",
      subtitle: "Everything you need to know before starting",
      items: [
        {
          question: "How long does it take to see results?",
          answer: "First measurable results in 30 days (traffic, engagement). Significant ROI in 90 days. Awareness campaigns may take 60-90 days. We give you complete visibility with biweekly reports."
        },
        {
          question: "What happens if I'm not satisfied?",
          answer: "90-day guarantee. If you don't see measurable results in that period, full refund without questions. Additionally, flexible contracts with no forced permanence."
        },
        {
          question: "Do you work with my industry?",
          answer: "Yes. We've worked with e-commerce, professional services, B2B tech, education, health, fintech, retail. If you sell online or need leads, we can help you."
        },
        {
          question: "What type of support do you offer?",
          answer: "GROWTH and PREMIUM: response <2 hours during business hours. STARTER: <24 hours. All plans include assigned account manager and 24/7 dashboard access."
        },
        {
          question: "Can I change plans later?",
          answer: "Totally. Many clients start with STARTER and scale to GROWTH when they see results. No penalties for upgrade/downgrade."
        },
        {
          question: "Do you require minimum permanence?",
          answer: "Initial 90-day plan to guarantee sufficient optimization time. After that, month to month. No 12-24 month ties."
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

  );
};

export default IndexSeccion10;
