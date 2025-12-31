import React, { useState, useRef } from 'react';
import { useStore } from '@nanostores/react';
import { isEnglish } from '../../../data/variables';
import styles from '../css/indexSeccion2.module.css';
import Button from '../../global/Button';

// ReactBits Animations
import ScrollStack, { ScrollStackItem } from '../../global/animations/ScrollStack/ScrollStack';
import GradientText from '../../global/animations/GradientText/GradientText';
import ShinyText from '../../global/animations/ShinyText/ShinyText';
import BlurText from '../../global/animations/BlurText/BlurText';

const IndexSeccion2 = () => {
  const ingles = useStore(isEnglish);
  const [isHovering, setIsHovering] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const canRef = useRef(null);

  const content = {
    es: {
      brandName: "Magic Drink",
      tagline: "El original • Desde 2018",
      title: "Sabor Clásico",
      subtitle: "La magia líquida que conquistó el mundo",
      description: "Nuestro sabor original combina notas frutales moradas con una frescura imposible de describir. No contiene cafeína, pero miles de personas aseguran sentir un impulso suave de energía desde el primer sorbo.",
      features: [
        { icon: "⚡", text: "0 mg de cafeína", highlight: "Energía natural" },
        { icon: "💜", text: "Sabor morado exclusivo", highlight: "Único en el mundo" },
        { icon: "🌿", text: "Ingredientes naturales", highlight: "100% real" },
        { icon: "❄️", text: "Sensación refrescante", highlight: "Frescura mágica" },
        { icon: "🎧", text: "Compatible con Hexy™", highlight: "Música + Sabor" }
      ],
      cta: "Ver todos los sabores",
      scrollHint: "Sigue deslizando"
    },
    en: {
      brandName: "Magic Drink",
      tagline: "The original • Since 2018",
      title: "Classic Flavor",
      subtitle: "The liquid magic that conquered the world",
      description: "Our original flavor combines purple fruity notes with an indescribable freshness. It contains no caffeine, but thousands of people claim to feel a gentle burst of energy from the first sip.",
      features: [
        { icon: "⚡", text: "0 mg caffeine", highlight: "Natural energy" },
        { icon: "💜", text: "Exclusive purple flavor", highlight: "One of a kind" },
        { icon: "🌿", text: "Natural ingredients", highlight: "100% real" },
        { icon: "❄️", text: "Refreshing sensation", highlight: "Magic freshness" },
        { icon: "🎧", text: "Compatible with Hexy™", highlight: "Music + Flavor" }
      ],
      cta: "See all flavors",
      scrollHint: "Keep scrolling"
    }
  };

  const t = ingles ? content.en : content.es;

  // Colores kawaii para el gradiente (dark mode siempre)
  const kawaiiColors = ['#FF6AD7', '#AA37F2', '#82D2FF', '#AA37F2', '#FF6AD7'];

  // Efecto 3D para la lata
  const handleMouseMove = (e) => {
    if (!canRef.current) return;
    const rect = canRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePosition({ x: x * 20, y: y * -20 });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
    setIsHovering(false);
  };

  return (
    <section className={styles.section}>
      {/* Fondo decorativo animado */}
      <div className={styles.backgroundDecoration}>
        <div className={styles.gradientOrb1}></div>
        <div className={styles.gradientOrb2}></div>
        <div className={styles.gradientOrb3}></div>
      </div>

      <ScrollStack
        className={styles.scrollStackContainer}
        itemDistance={250}
        itemScale={0.04}
        itemStackDistance={40}
        stackPosition="25%"
        scaleEndPosition="15%"
        baseScale={0.88}
        blurAmount={2}
        rotationAmount={0}
        useWindowScroll={true}
      >
        {/* ═══════════════════════════════════════════════════════════════
            CARD 1: THE REVEAL - Texto gigante "Magic Drink"
        ═══════════════════════════════════════════════════════════════ */}
        <ScrollStackItem itemClassName={`${styles.stackCard} ${styles.cardReveal}`}>
          <div className={styles.cardContent}>
            <div className={styles.revealContent}>
              {/* Texto pequeño animado arriba */}
              <div className={styles.taglineWrapper}>
                <ShinyText
                  text={t.tagline}
                  speed={3}
                  color="rgba(255,255,255,0.6)"
                  shineColor="#FF6AD7"
                  className={styles.taglineText}
                />
              </div>

              {/* Título gigante con gradiente animado */}
              <div className={styles.brandNameWrapper}>
                <GradientText
                  colors={kawaiiColors}
                  animationSpeed={6}
                  showBorder={false}
                  className={styles.brandNameGradient}
                >
                  <h2 className={styles.brandName}>{t.brandName}</h2>
                </GradientText>
              </div>

              {/* Subtítulo con blur reveal */}
              <div className={styles.subtitleWrapper}>
                <BlurText
                  text={t.subtitle}
                  delay={100}
                  animateBy="words"
                  direction="top"
                  className={styles.subtitleBlur}
                />
              </div>

              {/* Indicador de scroll */}
              <div className={styles.scrollIndicator}>
                <span className={styles.scrollText}>{t.scrollHint}</span>
                <div className={styles.scrollArrow}>
                  <span>↓</span>
                </div>
              </div>
            </div>

            {/* Decoración flotante */}
            <div className={styles.floatingElements}>
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className={styles.floatingBubble}
                  style={{
                    '--delay': `${i * 0.5}s`,
                    '--size': `${20 + Math.random() * 40}px`,
                    '--left': `${10 + Math.random() * 80}%`,
                    '--duration': `${4 + Math.random() * 3}s`
                  }}
                />
              ))}
            </div>
          </div>
        </ScrollStackItem>

        {/* ═══════════════════════════════════════════════════════════════
            CARD 2: THE PRODUCT - Lata con efecto 3D
        ═══════════════════════════════════════════════════════════════ */}
        <ScrollStackItem itemClassName={`${styles.stackCard} ${styles.cardProduct}`}>
          <div className={styles.cardContent}>
            <div className={styles.productLayout}>
              {/* Lata con efecto 3D interactivo */}
              <div
                className={styles.productShowcase}
                ref={canRef}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={handleMouseLeave}
              >
                {/* Glow de fondo */}
                <div className={`${styles.productGlow} ${isHovering ? styles.glowActive : ''}`}></div>
                
                {/* Círculos decorativos */}
                <div className={styles.orbitRing}></div>
                <div className={styles.orbitRing2}></div>

                {/* La lata */}
                <div
                  className={styles.canWrapper}
                  style={{
                    transform: `perspective(1000px) rotateY(${mousePosition.x}deg) rotateX(${mousePosition.y}deg) scale(${isHovering ? 1.05 : 1})`
                  }}
                >
                  <img
                    src="./image/drinks/lata_original.png"
                    alt="Magic Drink - Sabor Clásico"
                    className={styles.canImage}
                  />
                  {/* Reflejo */}
                  <div className={styles.canReflection}></div>
                </div>

                {/* Partículas brillantes */}
                <div className={styles.sparkleContainer}>
                  {[...Array(12)].map((_, i) => (
                    <div
                      key={i}
                      className={styles.sparkle}
                      style={{
                        '--angle': `${i * 30}deg`,
                        '--delay': `${i * 0.15}s`,
                        '--distance': `${120 + Math.random() * 60}px`
                      }}
                    >✦</div>
                  ))}
                </div>
              </div>

              {/* Título del sabor */}
              <div className={styles.flavorTitle}>
                <GradientText
                  colors={['#AA37F2', '#FF6AD7', '#AA37F2']}
                  animationSpeed={4}
                  className={styles.flavorGradient}
                >
                  <h3 className={styles.flavorName}>{t.title}</h3>
                </GradientText>
                <p className={styles.flavorTagline}>{t.description}</p>
              </div>
            </div>
          </div>
        </ScrollStackItem>

        {/* ═══════════════════════════════════════════════════════════════
            CARD 3: THE EXPERIENCE - Features + CTA
        ═══════════════════════════════════════════════════════════════ */}
        <ScrollStackItem itemClassName={`${styles.stackCard} ${styles.cardExperience}`}>
          <div className={styles.cardContent}>
            <div className={styles.experienceLayout}>
         
              <div className={styles.featuresGrid}>
                <div className={styles.featuresHeader}>
                  <ShinyText
                    text={ingles ? "Why Magic Drink?" : "¿Por qué Magic Drink?"}
                    speed={2.5}
                    color="#fff"
                    shineColor="#FF6AD7"
                    className={styles.featuresTitle}
                  />
                </div>

                <div className={styles.featureCards}>
                  {t.features.map((feature, index) => (
                    <div
                      key={index}
                      className={styles.featureCard}
                      style={{ '--delay': `${index * 0.1}s` }}
                    >
                      <div className={styles.featureIconWrapper}>
                        <span className={styles.featureIcon}>{feature.icon}</span>
                      </div>
                      <div className={styles.featureContent}>
                        <span className={styles.featureHighlight}>{feature.highlight}</span>
                        <span className={styles.featureText}>{feature.text}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

          
              <div className={styles.ctaSection}>
                <div className={styles.ctaGlow}></div>
                <Button
                  textEs={t.cta}
                  textEn={t.cta}
                  href="/bebidas"
                  variant="magic"
                  size="lg"
                  showArrow={true}
                />
                <p className={styles.ctaSubtext}>
                  {ingles ? "6 unique flavors available" : "6 sabores únicos disponibles"}
                </p>
              </div>
            </div>
          </div>
        </ScrollStackItem>
      </ScrollStack>
    </section>
  );
};

export default IndexSeccion2;
