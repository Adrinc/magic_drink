/**
 * TRADUCCIONES INDEX - Energy Media
 * Contenido completo para las 11 secciones de la página principal
 * Sistema "Cine-Data Multicultural"
 */

export const translationsIndex = {
  es: {
    // ==========================================
    // SECCIÓN 1: HERO CON VIDEO TEASER
    // ==========================================
    hero: {
      title: "Creatividad multicultural + performance digital = ",
      titleHighlight: "crecimiento real",
      subtitle: "Conectamos marcas con audiencias hispanas y multiculturales con estrategias data-driven y video que vende.",
      ctaPrimary: "Agenda tu consultoría gratuita",
      ctaSecondary: "Ver casos de éxito",
      trustIndicators: {
        roas: {
          value: "+42%",
          label: "ROAS promedio"
        },
        experience: {
          value: "15+",
          label: "Años de experiencia"
        },
        award: {
          value: "ROI",
          label: "Resultados medibles"
        }
      }
    },

    // ==========================================
    // SECCIÓN 2: OUR STORY
    // ==========================================
    ourStory: {
      title: "Nuestra Historia",
      paragraph1: "Nacidos en San Diego y criados en ambos lados de la frontera, Energy Media fusiona casi 40 años de experiencia en broadcast con la precisión digital de hoy. Nos especializamos en Marketing Digital, Redes Sociales y Desarrollo de Apps Móviles, impulsados por nuestros equipos Creativos y de Producción galardonados con un Emmy que hacen que las marcas destaquen en un mundo ruidoso.",
      highlightText: "Desde videos virales hasta campañas programáticas, entregamos soluciones dentro del presupuesto que resuenan, no se evaporan—porque la conexión importa más que los clics.",
      paragraph2: "A través de EE.UU. y México, hemos ayudado a marcas de salud, automotriz y de consumo a contar historias con impacto, cultura y el pulso inconfundible de la energía latina.",
      stats: [
        { label: "AÑOS DE EXPERIENCIA", number: "39" },
        { label: "CLIENTES RECURRENTES", number: "25" },
        { label: "PROYECTOS COMPLETADOS", number: "475" },
        { label: "CLIENTES FELICES", number: "335" }
      ]
    },

    // ==========================================
    // SECCIÓN 3: DIFERENCIADORES CLAVE
    // ==========================================
    differentiators: {
      title: "Por qué Energy Media",
      subtitle: "Diferenciadores que nos hacen únicos en marketing multicultural",
      items: [
        {
          icon: "🎭", // Cultura
          title: "Cultura que convierte",
          description: "Insight cultural auténtico para campañas que resuenan con audiencias hispanas y multiculturales."
        },
        {
          icon: "🎬", // Video
          title: "Video enfocado a performance",
          description: "Producción profesional para plataformas digitales con métricas que importan: CTR, conversiones, ROI."
        },
        {
          icon: "📊", // Data
          title: "Datos en tiempo real",
          description: "Análisis de datos y métricas para decisiones ágiles y optimización continua."
        },
        {
          icon: "📈", // Escalabilidad
          title: "Escalabilidad con reporting claro",
          description: "Desde pruebas piloto hasta campañas multimillonarias con visibilidad total."
        }
      ]
    },

    // ==========================================
    // SECCIÓN 3: SERVICIOS DESTACADOS
    // ==========================================
    services: {
      title: "Servicios que impulsan crecimiento",
      subtitle: "Soluciones integrales para marcas que quieren conectar con audiencias multiculturales",
      items: [
        {
          icon: "🎥",
          title: "Video Marketing Digital",
          description: "Social ads, reels, YouTube y video corporativo optimizado para conversión y engagement.",
          link: "/servicios/video-marketing"
        },
        {
          icon: "🚀",
          title: "Marketing Digital 360",
          description: "SEO, SEM, Social Ads, Email, Influencers. Estrategia completa integrada.",
          link: "/servicios/marketing-360"
        },
        {
          icon: "🎨",
          title: "Branding & Creatividad Cultural",
          description: "Identidad que conecta. Desde naming hasta guías de marca multicultural.",
          link: "/servicios/branding"
        },
        {
          icon: "💻",
          title: "Web & Apps",
          description: "Portales, e-commerce, landings optimizadas para conversión.",
          link: "/servicios/web-apps"
        },
        {
          icon: "📡",
          title: "Analítica Avanzada",
          description: "Análisis de datos + insights accionables en tiempo real.",
          link: "/servicios"
        }
      ],
      cta: "Ver todos los servicios"
    },

    // ==========================================
    // SECCIÓN 4: CASOS CON MÉTRICAS
    // ==========================================
    cases: {
      title: "Resultados que hablan",
      subtitle: "Casos reales con métricas medibles",
      items: [
        {
          industry: "E-commerce Moda",
          client: "Marca latinoamericana",
          challenge: "Aumentar ROAS en audiencia hispana en EE.UU.",
          solution: "Video ads bilingües + segmentación cultural + A/B testing creativo",
          metrics: {
            roas: {
              value: "+42%",
              label: "ROAS"
            },
            cac: {
              value: "–28%",
              label: "CAC"
            },
            leads: {
              value: "+3.1x",
              label: "Leads"
            }
          },
          testimonial: "Energy Media entendió nuestra audiencia mejor que nadie. Los resultados llegaron en 60 días.",
          link: "/casos/ecommerce-moda"
        },
        {
          industry: "Servicios Financieros",
          client: "Fintech para Latinx",
          challenge: "Lanzamiento de app en mercado hispano competido",
          solution: "Influencer marketing + YouTube Ads + landing pages optimizadas",
          metrics: {
            ctr: {
              value: "+67%",
              label: "CTR"
            },
            downloads: {
              value: "25K",
              label: "Downloads"
            },
            retention: {
              value: "78%",
              label: "Retention D30"
            }
          },
          testimonial: "Superamos nuestras proyecciones de descarga en un 310%. Equipo excepcional.",
          link: "/casos/fintech-app"
        },
        {
          industry: "Retail Alimenticio",
          client: "Cadena de restaurantes",
          challenge: "Aumentar tráfico a tiendas físicas con campaña digital",
          solution: "Video storytelling + geo-targeting + promociones localizadas",
          metrics: {
            traffic: {
              value: "+89%",
              label: "Tráfico"
            },
            sales: {
              value: "+3.5x",
              label: "Ventas"
            },
            recall: {
              value: "92%",
              label: "Brand Recall"
            }
          },
          testimonial: "El video conectó emocionalmente. Vimos filas en nuestras tiendas la semana del lanzamiento.",
          link: "/casos/retail-food"
        }
      ],
      cta: "Ver todos los casos"
    },

    // ==========================================
    // SECCIÓN 5: METODOLOGÍA (TIMELINE 5 PASOS)
    // ==========================================
    methodology: {
      title: "Cómo trabajamos",
      subtitle: "Metodología probada en +200 campañas multiculturales",
      steps: [
        {
          number: 1,
          icon: "🔍",
          title: "Descubrimiento cultural & de negocio",
          description: "Audit inicial de marca, competencia y audiencia. Identificamos insights culturales clave.",
          deliverable: "Reporte de descubrimiento + insights accionables"
        },
        {
          number: 2,
          icon: "🗺️",
          title: "Plan de crecimiento (90 días + KPIs)",
          description: "Roadmap con objetivos medibles, canales priorizados y creatividad alineada a cultura.",
          deliverable: "Plan estratégico + dashboard de KPIs"
        },
        {
          number: 3,
          icon: "🎬",
          title: "Producción & setup",
          description: "Video, diseño, tracking y martech configurado. Todo listo para lanzar.",
          deliverable: "Assets creativos + campaña configurada"
        },
        {
          number: 4,
          icon: "📊",
          title: "Optimización continua",
          description: "A/B testing creativo, ajuste de audiencias, iteración basada en datos.",
          deliverable: "Reports quincenales + mejoras implementadas"
        },
        {
          number: 5,
          icon: "🚀",
          title: "Escalamiento",
          description: "Nuevas audiencias, formatos y canales. Crecimiento sostenible con ROI positivo.",
          deliverable: "Plan de escala + expansión multicanal"
        }
      ],
      cta: "Conoce la metodología completa"
    },

    // ==========================================
    // SECCIÓN 6: LOGOS DE CLIENTES
    // ==========================================
    clients: {
      title: "Marcas que confían en nosotros",
      subtitle: "Empresas B2B y B2C que crecen con estrategias data-driven",
      cta: "Ver casos de éxito",
      
      // Copy puente hacia Sección 7 (Reel)
      bridge: {
        text1: "Ya viste ",
        highlight1: "con quién trabajamos",
        text2: ".",
        text3: "Ahora mira ",
        highlight2: "cómo se ve en pantalla",
        text4: "."
      }
    },

    // ==========================================
    // SECCIÓN 7: 🎬 VIDEO REEL (LA JOYA)
    // ==========================================
    reel: {
      intro: {
        title: "Nuestro Trabajo en Video",
        subtitle: "Producción profesional para plataformas digitales: social ads, reels, YouTube, corporativo."
      },
      
      // Videos con metadata (se mapean con vimeoVideos.js)
      videos: [
        {
          id: 0,
          client: "E-commerce Moda",
          campaign: "Black Friday",
          tag: "Meta Ads",
          metric: {
            value: "+89% Ventas",
            label: "vs. año anterior"
          },
          objective: "Maximizar ventas en fin de semana clave",
          solution: "Carousel ads + dynamic retargeting",
          result: "$1.2M en ventas, ROAS 4.8x"
        },
        {
          id: 1,
          client: "Fintech",
          campaign: "App de Remesas",
          tag: "Social Ads",
          metric: {
            value: "3.1x ROAS",
            label: "Orgánico + Paid"
          },
          objective: "Awareness en mercado competido",
          solution: "Influencers + UGC + video storytelling",
          result: "25K downloads en 30 días"
        },
        {
          id: 2,
          client: "Retail Alimenticio",
          campaign: "Día de la Madre",
          tag: "Campaña 360",
          metric: {
            value: "92% Recall",
            label: "Brand lift study"
          },
          objective: "Conectar emocionalmente con audiencia objetivo",
          solution: "Spot multimedia + social + influencers",
          result: "+78% tráfico a tiendas"
        },
        {
          id: 3,
          client: "Tech Startup",
          campaign: "Lanzamiento SaaS B2B",
          tag: "LinkedIn Ads",
          metric: {
            value: "+124% Leads",
            label: "Q1 2024"
          },
          objective: "Penetrar mercado B2B",
          solution: "Thought leadership videos + case studies",
          result: "Pipeline de $3.2M generado"
        },
        {
          id: 4,
          client: "Healthcare",
          campaign: "Servicios Médicos",
          tag: "YouTube Pre-roll",
          metric: {
            value: "–35% CPA",
            label: "vs. promedio sector"
          },
          objective: "Captar pacientes en sector salud",
          solution: "Testimoniales de clientes + targeting preciso",
          result: "560 citas calificadas"
        },
        {
          id: 5,
          client: "Marca Automotriz",
          campaign: "Lanzamiento SUV Híbrida",
          tag: "YouTube Ads",
          metric: {
            value: "+42% CTR",
            label: "Campaña de video"
          },
          objective: "Aumentar test drives en mercado competido",
          solution: "Video ads 15s + landing pages optimizadas",
          result: "+167% conversiones vs. campaña anterior"
        },
        {
          id: 6,
          client: "Real Estate",
          campaign: "Desarrollo Residencial",
          tag: "Meta + Google",
          metric: {
            value: "85% Sellout",
            label: "Primeros 90 días"
          },
          objective: "Vender unidades de segmento premium",
          solution: "Virtual tours + ads geo-targetizados",
          result: "$18M en ventas, ROAS 6.2x"
        },
        {
          id: 7,
          client: "Beauty Brand",
          campaign: "Línea Skincare",
          tag: "TikTok + Reels",
          metric: {
            value: "12M Vistas",
            label: "Alcance orgánico"
          },
          objective: "Lanzamiento en mercado competitivo",
          solution: "Micro-influencers + UGC + tutoriales",
          result: "Producto agotado en 3 semanas"
        },
        {
          id: 8,
          client: "Hospitality",
          campaign: "Resort & Spa",
          tag: "YouTube + Display",
          metric: {
            value: "+215% Reservas",
            label: "Temporada verano"
          },
          objective: "Llenar capacidad en segmento premium",
          solution: "Videos inmersivos + retargeting estacional",
          result: "97% ocupación, +$2.4M revenue"
        }
      ],
      
      // Micro-storytelling (3 argumentos)
      storytelling: [
        {
          icon: "🎥",
          title: "Producción profesional",
          description: "Calidad cinematográfica optimizada para plataformas digitales"
        },
        {
          icon: "📱",
          title: "Nativos digitales",
          description: "Piezas para social ads, reels, YouTube, streaming y más"
        },
        {
          icon: "📊",
          title: "Performance first",
          description: "Medimos views, CTR, conversiones y ROI en cada campaña"
        }
      ],
      
      // CTA destacado al final del reel
      cta: {
        title: "Convierte tu mensaje en el próximo video que todos recuerdan",
        button: "Agenda tu consultoría de video marketing"
      },
      
      // Lightbox (modal)
      lightbox: {
        close: "Cerrar",
        client: "Cliente:",
        objective: "Objetivo:",
        solution: "Solución:",
        result: "Resultado:",
        tagline: "Video profesional para plataformas digitales"
      }
    },

    // ==========================================
    // SECCIÓN 8: LOGOS DE CLIENTES
    // ==========================================
    clients: {
      title: "Marcas que crecen con nosotros",
      subtitle: "Confían en Energy Media para impulsar su crecimiento digital",
      // Nota: Logos se cargan desde /public/image/clients/
      logos: [
        { name: "Toyota", filename: "toyota.png" },
        { name: "Univision", filename: "univision.png" },
        { name: "Target", filename: "target.png" },
        { name: "Wells Fargo", filename: "wells-fargo.png" },
        { name: "AT&T", filename: "att.png" },
        { name: "Coca-Cola", filename: "cocacola.png" },
        { name: "McDonald's", filename: "mcdonalds.png" },
        { name: "Verizon", filename: "verizon.png" },
        { name: "Bank of America", filename: "bankofamerica.png" },
        { name: "Walmart", filename: "walmart.png" }
      ]
    },

    // ==========================================
    // SECCIÓN 9: TESTIMONIOS
    // ==========================================
    testimonials: {
      title: "Lo que dicen nuestros clientes",
      subtitle: "Resultados reales, relaciones de largo plazo",
      items: [
        {
          quote: "Energy Media entendió nuestra audiencia hispana mejor que cualquier otra agencia. Los resultados llegaron en 60 días y no hemos parado de crecer desde entonces.",
          author: "María Rodríguez",
          role: "CMO",
          company: "Marca E-commerce",
          avatar: "maria.png",
          result: "+310% ventas en Q1 2024"
        },
        {
          quote: "El equipo combina insight cultural auténtico con rigor en datos. Cada campaña es medible, optimizable y escalable. Socios estratégicos, no solo vendors.",
          author: "Carlos Méndez",
          role: "VP Marketing",
          company: "Fintech Latinx",
          avatar: "carlos.png",
          result: "ROAS 4.2x sostenido"
        },
        {
          quote: "La producción de video es de nivel profesional pero con velocidad de agencia digital. Crearon toda nuestra campaña de social ads en menos de una semana.",
          author: "Ana Silva",
          role: "Brand Director",
          company: "Retail Nacional",
          avatar: "ana.png",
          result: "92% brand recall"
        }
      ]
    },

    // ==========================================
    // SECCIÓN 10: PLANES (START / GROW / SCALE)
    // ==========================================
    plans: {
      title: "Planes que se adaptan a tu etapa de crecimiento",
      subtitle: "Desde pruebas piloto hasta campañas enterprise. Todos personalizables.",
      
      items: [
        {
          name: "Start",
          tagline: "Para marcas que inician en digital multicultural",
          price: "Desde $5K/mes",
          description: "Ideal para validar hipótesis y aprender de tu audiencia",
          features: [
            "Video ads piloto (2-3 piezas)",
            "Setup de tracking y analytics básico",
            "Campaña en 1 canal (Meta o Google)",
            "Segmentación cultural inicial",
            "Report mensual de resultados",
            "Email support (respuesta en 24h)"
          ],
          highlight: false,
          cta: "Solicitar propuesta"
        },
        {
          name: "Grow",
          tagline: "Para marcas escalando con data",
          price: "Desde $15K/mes",
          description: "El plan más popular. Performance + optimización continua",
          features: [
            "Producción mensual de video (6-8 piezas)",
            "Campaña multi-canal (Meta, Google, TikTok)",
            "A/B testing creativo y de audiencias",
            "Análisis de datos básico",
            "Landing pages optimizadas",
            "Report quincenal + call estratégico",
            "Slack/email support prioritario"
          ],
          highlight: true, // Este plan se destaca visualmente
          cta: "Agendar consultoría"
        },
        {
          name: "Scale",
          tagline: "Para marcas con presupuesto 6 figuras+",
          price: "Custom",
          description: "Equipo dedicado + tecnología enterprise",
          features: [
            "Producción ilimitada + equipo creativo dedicado",
            "Campañas en todos los canales (incluye programmatic)",
            "Análisis de datos avanzado + consultoría estratégica",
            "Influencer management & partnerships",
            "CRO + desarrollo web/apps",
            "Report semanal + optimización en tiempo real",
            "Account Manager dedicado + acceso directo a founders"
          ],
          highlight: false,
          cta: "Contactar ventas"
        }
      ],
      
      note: "Todos los planes son personalizables según tus objetivos y presupuesto.",
      compareCta: "Comparar planes completos"
    },

    // ==========================================
    // SECCIÓN 11: CTA FINAL + NEWSLETTER
    // ==========================================
    finalCta: {
      title: "Listos para crecer con cultura y datos",
      subtitle: "Agenda tu consultoría gratuita y descubre cómo hacer que tu marca conecte",
      ctaPrimary: "Agenda tu consultoría",
      
      // Newsletter opcional
      newsletter: {
        title: "O recibe tips de marketing multicultural en tu inbox",
        placeholder: "tu@email.com",
        button: "Suscribirse",
        privacy: "Nunca compartimos tu email. Puedes desuscribirte en cualquier momento.",
        successMessage: "¡Gracias! Revisa tu inbox para confirmar.",
        errorMessage: "Hubo un error. Intenta de nuevo."
      }
    }
  },

  // ==========================================
  // ENGLISH VERSION
  // ==========================================
  en: {
    // ==========================================
    // SECTION 1: HERO - "Transform Your Business"
    // ==========================================
    hero: {
      h1: "Transform your business into a digital leader with guaranteed results",
      subtitle: "Digital marketing + web development + AI. Everything in one place. First results in 30 days or full refund.",
      ctaPrimary: "Schedule your free consultation",
      ctaValue: "($5,000 USD value)",
      ctaSecondary: "View our results",
      trustBadges: {
        results: "First results in 30 days",
        guarantee: "90-day guarantee",
        response: "Response <2 hours"
      }
    },

    // ==========================================
    // SECTION 2: OUR STORY
    // ==========================================
    ourStory: {
      title: "Our Story",
      paragraph1: "Born in San Diego and raised on both sides of the border, Energy Media fuses nearly 40 years of broadcast experience with today's digital precision. We specialize in Digital Marketing, Social Media, and Mobile App Development, powered by our Emmy-winning Creative and Production teams that make brands stand out in a noisy world.",
      highlightText: "From viral videos to programmatic campaigns, we deliver in-budget solutions that resonate, not evaporate—because connection matters more than clicks.",
      paragraph2: "Across the U.S. and Mexico, we've helped healthcare, automotive, and consumer brands tell stories with impact, culture, and the unmistakable pulse of Latino energy.",
      stats: [
        { label: "YEARS OF EXPERIENCE", number: "39" },
        { label: "REPEATED CLIENTS", number: "25" },
        { label: "COMPLETED PROJECTS", number: "475" },
        { label: "HAPPY CLIENTS", number: "335" }
      ]
    },

    // ==========================================
    // SECTION 3: WHY CHOOSE US?
    // ==========================================
    whyUs: {
      title: "Why Choose Us?",
      subtitle: "Proven benefits for your digital success",
      reasons: [
        {
          icon: "⭐",
          title: "Proven Experience",
          description: "+8 years transforming digital businesses with +200 satisfied clients across multiple industries."
        },
        {
          icon: "📊",
          title: "Data-Driven Approach",
          description: "Decisions based on real data, not hunches. Measurable ROI in every campaign with full transparency."
        },
        {
          icon: "👥",
          title: "Multidisciplinary Team",
          description: "Marketers + Designers + Developers + AI Specialists working together for your success."
        },
        {
          icon: "🤖",
          title: "Cutting-Edge Technology",
          description: "Complete stack: CRM, automation, AI, real-time analytics. Always ahead of the curve."
        },
        {
          icon: "💬",
          title: "Priority Support",
          description: "Response in <2 hours. No waiting, no excuses. Your success is our priority."
        },
        {
          icon: "�",
          title: "Flexible Plans",
          description: "From startups to enterprises. Grow at your pace with customizable solutions."
        }
      ]
    },

    // ==========================================
    // SECTION 3: GUARANTEED RESULTS (PROOF UPFRONT)
    // ==========================================
    results: {
      title: "Results that Transform Businesses",
      subtitle: "We don't promise magic. We deliver measurable growth backed by a 90-day guarantee.",
      metrics: [
        {
          value: "+200%",
          label: "Web Traffic",
          description: "Average in first 6 months"
        },
        {
          value: "+150%",
          label: "Lead Generation",
          description: "With continuous optimization"
        },
        {
          value: "+300%",
          label: "Engagement",
          description: "On organic and paid social media"
        },
        {
          value: "400-600%",
          label: "ROI",
          description: "On well-executed email campaigns"
        }
      ],
      guarantee: {
        title: "90-DAY GUARANTEE",
        description: "If you don't see measurable results in 90 days, full refund. No questions asked.",
        features: [
          "First results in 30 days",
          "Response <2 hours",
          "Satisfaction guaranteed"
        ]
      }
    },

    // ==========================================
    // SECTION 4: COMPREHENSIVE SERVICES
    // ==========================================
    services: {
      title: "Comprehensive Services for Your Digital Growth",
      subtitle: "From strategy to execution. Everything in one place.",
      items: [
        {
          icon: "�",
          title: "Professional SEO & SEM",
          tagline: "Dominate Google. More traffic, more sales.",
          bullets: [
            "Sustainable organic positioning",
            "Data-optimized Google Ads",
            "Advanced analytics for decisions"
          ],
          metric: "+200% organic traffic in 6 months (average)",
          link: "/en/services/seo-sem"
        },
        {
          icon: "�",
          title: "Social Media & Paid Ads",
          tagline: "Turn scrollers into customers.",
          bullets: [
            "Meta Ads + TikTok Ads + LinkedIn Ads",
            "Community management",
            "Creative A/B testing"
          ],
          metric: "+300% engagement with optimized strategy",
          link: "/en/services/social-ads"
        },
        {
          icon: "🎨",
          title: "Branding & Graphic Design",
          tagline: "Memorable brand that stands out.",
          bullets: [
            "Logos + Corporate identity",
            "Brand manual + Visual system",
            "Advertising design"
          ],
          metric: "Complete brand in 2-3 weeks",
          link: "/en/services/branding"
        },
        {
          icon: "💻",
          title: "Web Development & Mobile Apps",
          tagline: "Web portals, CRM, custom mobile apps.",
          bullets: [
            "Responsive websites + E-commerce",
            "iOS/Android apps",
            "Business portals + Custom CRM"
          ],
          metric: "Professional launch in 4-6 weeks",
          link: "/en/services/web-development",
          highlighted: true,
          badge: "⚡ FEATURED"
        },
        {
          icon: "�",
          title: "Email Marketing & Automation",
          tagline: "Nurturing that sells on autopilot.",
          bullets: [
            "Segmented campaigns",
            "Advanced automation",
            "A/B testing + Optimization"
          ],
          metric: "400-600% ROI on email campaigns",
          link: "/en/services/email-marketing"
        },
        {
          icon: "🤖",
          title: "AI Marketing & Automation",
          tagline: "Artificial intelligence at your business service.",
          bullets: [
            "Intelligent chatbots",
            "Process automation",
            "Predictive analysis + Personalization at scale"
          ],
          metric: "Up to 70% time saved with automation",
          link: "/en/services/ai-marketing",
          highlighted: true,
          badge: "⚡ FEATURED"
        }
      ]
    },

    // ==========================================
    // SECTION 5: PACKAGES & SOLUTIONS
    // ==========================================
    packages: {
      title: "Choose Your Growth Plan",
      subtitle: "Scalable solutions starting from $400 USD/month. Customizable plans according to your goals.",
      disclaimer: "* Customizable plans. Schedule free consultation for exact quote.",
      plans: [
        {
          name: "STARTER",
          subtitle: "First Digital Steps",
          price: "$400 - $750 USD/month",
          forWho: "For small businesses starting in digital or with limited budget",
          features: [
            "Professional responsive website (up to 5 pages)",
            "Basic SEO + Optimized Google My Business",
            "Management of 2 social networks (organic content)",
            "Analytics and tracking configuration",
            "Monthly report with key metrics",
            "Email support (<24hrs)"
          ],
          cta: "Request custom proposal"
        },
        {
          name: "GROWTH",
          subtitle: "Data-Driven Scaling",
          price: "$800 - $1,500 USD/month",
          badge: "⭐ MOST POPULAR",
          forWho: "For growing companies looking to maximize ROI and scale with strategy",
          features: [
            "Everything in STARTER +",
            "Multi-channel paid campaigns (Meta, Google, LinkedIn)",
            "Automated email marketing (up to 10K contacts)",
            "Monthly video production (2-3 pieces for social ads)",
            "Creative and copy A/B testing",
            "Conversion-optimized landing pages",
            "Biweekly report + strategy call",
            "Priority support (<2hrs)"
          ],
          cta: "Request custom proposal"
        },
        {
          name: "PREMIUM",
          subtitle: "Total Digital Leadership",
          price: "$1,550 - $2,500+ USD/month",
          forWho: "For established companies with 6-figure budget looking to dominate their industry",
          features: [
            "Everything in GROWTH +",
            "Advanced web/app development (portals, CRM, e-commerce)",
            "AI implementation (chatbots, automation, predictive analysis)",
            "Unlimited video production + dedicated creative team",
            "Monthly strategic consulting (quarterly roadmap)",
            "Campaigns on all available channels",
            "Weekly report + continuous optimization",
            "Dedicated Account Manager + 24/7 support"
          ],
          cta: "Request custom proposal"
        }
      ]
    },

    // ==========================================
    // SECTION 6: OUR WORK PROCESS
    // ==========================================
    process: {
      title: "How We Transform Your Business (Step by Step)",
      subtitle: "Process proven with +200 clients. No surprises, only results.",
      steps: [
        {
          number: 1,
          title: "Discovery & Audit",
          description: "We analyze your business, competition, audience, current digital situation",
          duration: "Week 1",
          deliverable: "Complete diagnosis with identified opportunities",
          icon: "🔍"
        },
        {
          number: 2,
          title: "Strategy & Roadmap",
          description: "We create 90-day growth plan with measurable KPIs",
          duration: "Week 2",
          deliverable: "Detailed roadmap + investment proposal",
          icon: "🗺️"
        },
        {
          number: 3,
          title: "Implementation & Setup",
          description: "We configure tools, tracking, martech stack, initial production",
          duration: "Weeks 3-4",
          deliverable: "Digital infrastructure running + first campaigns live",
          icon: "⚙️"
        },
        {
          number: 4,
          title: "Continuous Optimization",
          description: "A/B testing, creative iteration, segmentation adjustment, CTR/CVR improvement",
          duration: "Month 2+",
          deliverable: "Biweekly reports + data-driven adjustments",
          icon: "📈"
        },
        {
          number: 5,
          title: "Reporting & Transparency",
          description: "Real-time dashboards + strategic review calls",
          duration: "Ongoing",
          deliverable: "Custom reports + 24/7 analytics access",
          icon: "📊"
        },
        {
          number: 6,
          title: "Scaling & Growth",
          description: "Expansion to new channels, audiences, formats based on results",
          duration: "Month 3+",
          deliverable: "Scaling plan + recommended incremental investment",
          icon: "🚀"
        }
      ]
    },

    // ==========================================
    // SECTION 7: VIDEO SHOWCASE (Simplified)
    // ==========================================
    reel: {
      title: "Our Work in Video",
      subtitle: "We produce video for digital platforms: social ads, reels, YouTube, corporate",
      cta: "Need professional video for your brand?",
      ctaButton: "Schedule your consultation"
    },

    // ==========================================
    // SECTION 8: CERTIFICATIONS & PARTNERS
    // ==========================================
    certifications: {
      title: "Certified by the Best",
      subtitle: "Official partners of leading marketing and technology platforms",
      partners: [
        "Google Partner",
        "Meta Business Partner",
        "HubSpot Partner",
        "Shopify Partner",
        "LinkedIn Marketing Partner",
        "Microsoft Advertising"
      ],
      footer: "Continuous training in the latest market tools and strategies"
    },

    // ==========================================
    // SECTION 9: TESTIMONIALS + STATS
    // ==========================================
    testimonials: {
      title: "What Our Clients Say",
      subtitle: "More than 200 companies trusted us. These are their results.",
      items: [
        {
          text: "We increased sales 3x in 6 months with their digital strategy. Measurable results from day one.",
          author: "Carlos Mendoza",
          role: "CMO",
          company: "Tech Startup Inc.",
          result: "3x sales increase in 6 months"
        },
        {
          text: "Professionalism and transparency. They handle our campaigns with impressive metrics and constant optimization.",
          author: "Maria Lopez",
          role: "Marketing Director",
          company: "Fashion Retail Co.",
          result: "ROAS +42%, CAC -28%"
        },
        {
          text: "The video quality is exceptional, and the ROI in our social ads exceeded all expectations.",
          author: "Juan Perez",
          role: "CEO",
          company: "E-commerce Latam",
          result: "+3.1x qualified leads"
        }
      ],
      stats: [
        {
          value: "98%",
          label: "Satisfaction Rate",
          icon: "⭐"
        },
        {
          value: "85%",
          label: "Recurring Clients",
          description: "Renew service",
          icon: "🔁"
        },
        {
          value: "92%",
          label: "Recommend Energy Media",
          icon: "👍"
        },
        {
          value: "4.9/5",
          label: "Average Rating",
          icon: "⭐⭐⭐⭐⭐"
        }
      ]
    },

    // ==========================================
    // SECTION 10: FAQs - FREQUENTLY ASKED QUESTIONS
    // ==========================================
    faqs: {
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
    },

    // ==========================================
    // SECTION 11: FINAL CTA + SPECIAL OFFER
    // ==========================================
    finalCta: {
      badge: "LIMITED OFFER - New Clients",
      title: "Schedule Your Free Strategic Consultation",
      subtitle: "Value: $5,000 USD. Today: FREE. We analyze your business and give you growth roadmap with no commitment.",
      features: [
        "✓ Complete audit of your digital presence (30-45 min)",
        "✓ Identification of 3-5 quick growth opportunities",
        "✓ Personalized investment recommendations",
        "✓ Expected ROI estimate in 90 days",
        "✓ Immediate action plan (no fine print)"
      ],
      cta: "Schedule Now (No Cost)",
      guarantee: "🛡️ 90-day guarantee. Results or refund.",
      newsletter: {
        title: "Or receive digital marketing tips + success cases in your inbox",
        emailPlaceholder: "your@email.com",
        buttonText: "Subscribe",
        successMessage: "Thanks! Check your inbox to confirm.",
        errorMessage: "There was an error. Please try again."
      }
    }
  }
};
