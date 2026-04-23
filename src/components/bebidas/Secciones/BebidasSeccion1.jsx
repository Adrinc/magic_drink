import { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@nanostores/react';
import { isEnglish } from '../../../data/variables';
import { magicDrinkFlavors } from '../../../data/magicDrinkFlavors';
import useFlavorAudio from '../../global/useFlavorAudio';
import styles from '../css/bebidasSeccion1.module.css';

const getText = (v, eng) => (typeof v === 'string' ? v : eng ? v.en : v.es);

const content = {
  es: {
    badge: '6 sabores oficiales',
    discoverMore: 'Conoce este sabor',
    back: 'Volver',
    playNow: 'Escuchar loop',
    stopNow: 'Pausar',
    ritual: 'Ritual',
    energy: 'Energía',
    taste: 'Sabor',
    vibe: 'Vibe',
    loopSuffix: 'Loop',
    clickHint: 'Toca la lata para saber más',
  },
  en: {
    badge: '6 official flavors',
    discoverMore: 'Meet this flavor',
    back: 'Back',
    playNow: 'Play loop',
    stopNow: 'Pause',
    ritual: 'Ritual',
    energy: 'Energy',
    taste: 'Taste',
    vibe: 'Vibe',
    loopSuffix: 'Loop',
    clickHint: 'Tap the can to learn more',
  },
};

/* ═══════════════════════════════════════════
   PARTICLE SVG SHAPES (24x24 viewBox)
   ═══════════════════════════════════════════ */
const S = {
  star: (c) => <path d="M12 2l3 7.4h7.8l-6.3 4.6 2.4 7.4L12 17l-6.9 4.4 2.4-7.4L1.2 9.4H9z" fill={c} strokeLinejoin="round" />,
  heart: (c) => <path d="M12 21l-1.4-1.3C5.4 15.4 2 12.3 2 8.5 2 5.4 4.4 3 7.5 3c1.7 0 3.4.8 4.5 2.1C13.1 3.8 14.8 3 16.5 3 19.6 3 22 5.4 22 8.5c0 3.8-3.4 6.9-8.6 11.5z" fill={c} />,
  dot: (c) => <circle cx="12" cy="12" r="7" fill={c} />,
  banana: (c) => <path d="M6 19c0-6.5 3.5-13 11-13-.8 2.8-.8 7.5 1.8 10.2C16 17 11 19 6 19z" fill={c} />,
  exclamation: (c) => <><rect x="10" y="3" width="4" height="12" rx="2" fill={c} /><circle cx="12" cy="19.5" r="2.5" fill={c} /></>,
  bubble: (c) => <><circle cx="12" cy="12" r="10" fill={c} opacity="0.45" /><circle cx="8" cy="7" r="2.5" fill="#fff" opacity="0.4" /></>,
  bubbleFace: (c) => <><circle cx="12" cy="12" r="10" fill={c} opacity="0.5" /><circle cx="8" cy="7" r="2.2" fill="#fff" opacity="0.35" /><circle cx="9" cy="11" r="1.2" fill="#4a2040" /><circle cx="15" cy="11" r="1.2" fill="#4a2040" /><path d="M9 15.5q3 2.5 6 0" fill="none" stroke="#4a2040" strokeWidth="1.2" strokeLinecap="round" /></>,
  serpentina: (c) => <path d="M2 12c3-5 5-5 8 0s5 5 8 0" fill="none" stroke={c} strokeWidth="3" strokeLinecap="round" />,
  clawMark: (c) => <><line x1="5" y1="3" x2="9" y2="21" stroke={c} strokeWidth="2.5" strokeLinecap="round" /><line x1="10.5" y1="2" x2="14.5" y2="20" stroke={c} strokeWidth="2.5" strokeLinecap="round" /><line x1="16" y1="3" x2="20" y2="21" stroke={c} strokeWidth="2.5" strokeLinecap="round" /></>,
  grape: (c) => <><circle cx="9" cy="8" r="3.5" fill={c} /><circle cx="15" cy="8" r="3.5" fill={c} /><circle cx="12" cy="13" r="3.5" fill={c} /><circle cx="7" cy="13" r="3.5" fill={c} /><circle cx="17" cy="13" r="3.5" fill={c} /><line x1="12" y1="1" x2="12" y2="5" stroke="#4CAF50" strokeWidth="1.5" strokeLinecap="round" /></>,
  musicNote: (c) => <><circle cx="8" cy="18" r="3.5" fill={c} /><rect x="11" y="4" width="2.2" height="14" rx="1" fill={c} /><path d="M13.2 4c2.5-.8 5.5 0 5.5 2.8s-2.5 3-5.5 2" fill={c} /></>,
  sparkle4: (c) => <path d="M12 2L13.8 9.2 21 12 13.8 14.8 12 22 10.2 14.8 3 12 10.2 9.2z" fill={c} />,
  magicWand: (c) => <><line x1="3" y1="21" x2="16" y2="6" stroke={c} strokeWidth="2" strokeLinecap="round" /><path d="M16 6l1.5 4 4-1.5z" fill={c} /><circle cx="19.5" cy="3" r="1.3" fill={c} /><circle cx="22" cy="5.5" r="0.8" fill={c} /></>,
  spiral: (c) => <path d="M12 21c-5 0-9-4-9-9s4-9 9-9c3.5 0 6.5 2.5 7.5 5.5" fill="none" stroke={c} strokeWidth="2.2" strokeLinecap="round" />,
  kiwi: (c) => <><ellipse cx="12" cy="12" rx="10" ry="10.5" fill={c} /><ellipse cx="12" cy="12" rx="4.5" ry="5" fill="#8BC34A" opacity="0.65" /><circle cx="10" cy="9" r="1" fill="#3E2723" opacity="0.55" /><circle cx="14" cy="9" r="1" fill="#3E2723" opacity="0.55" /><circle cx="9" cy="13" r="1" fill="#3E2723" opacity="0.55" /><circle cx="15" cy="13" r="1" fill="#3E2723" opacity="0.55" /><circle cx="12" cy="16" r="1" fill="#3E2723" opacity="0.55" /></>,
  witchHat: (c) => <path d="M12 1l-6 13h12L12 1zM4 14.5c0 2 3.6 3.5 8 3.5s8-1.5 8-3.5H4z" fill={c} />,
  wave: (c) => <path d="M1 12c3-5 5-5 8 0s5 5 8 0 5-5 8 0" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round" />,
};

/* ═══════════════════════════════════════════
   FLAVOR CONFIGS
   bg: background style (solid or gradient)
   p: [type, color, count, minSize, maxSize]
   ti: title icons [type, color]
   tc: text color (default white)
   ═══════════════════════════════════════════ */
const FC = {
  'magic-original': {
    bg: '#AA37F2',
    p: [
      ['star', '#F9F871', 4, 22, 38], ['star', '#82D2FF', 3, 18, 32],
      ['heart', '#FF6AD7', 3, 16, 28], ['dot', '#F9F871', 2, 10, 16], ['dot', '#FF6AD7', 2, 10, 16],
    ],
    ti: [['star', '#F9F871'], ['heart', '#FF6AD7']],
  },
  'banana-drama': {
    bg: '#FFE066',
    tc: '#5D3800',
    p: [
      ['banana', '#D4930D', 4, 22, 38], ['star', '#E67E00', 4, 18, 32],
      ['exclamation', '#D4930D', 3, 16, 26], ['dot', '#E67E00', 3, 8, 14],
    ],
    ti: [['banana', '#D4930D'], ['star', '#E67E00']],
  },
  'bubble-tape': {
    bg: '#FF6AD7',
    p: [
      ['bubble', '#FFB6E1', 3, 26, 42], ['bubbleFace', '#E8A0D0', 3, 30, 46],
      ['bubble', '#C77DBA', 3, 20, 34], ['serpentina', '#FF1493', 3, 32, 48],
      ['dot', '#FFB6E1', 2, 8, 14],
    ],
    ti: [['bubble', '#FFB6E1'], ['bubbleFace', '#E8A0D0']],
  },
  'dragon-grape': {
    bg: 'linear-gradient(180deg, #9B4DCA 0%, #C0392B 100%)',
    p: [
      ['clawMark', '#FF4444', 3, 24, 38], ['grape', '#8E44AD', 3, 26, 40],
      ['musicNote', '#FF6AD7', 3, 22, 34], ['sparkle4', '#FFD700', 3, 14, 24],
    ],
    ti: [['grape', '#8E44AD'], ['musicNote', '#FF6AD7']],
  },
  'sparkle-soda': {
    bg: 'linear-gradient(180deg, #82D2FF 0%, #FF6AD7 100%)',
    tc: '#1A3C5A',
    p: [
      ['sparkle4', '#FFFFFF', 5, 14, 28], ['star', '#F9F871', 3, 18, 30],
      ['magicWand', '#E8D5F5', 2, 28, 40], ['bubble', '#FFFFFF', 3, 18, 28],
    ],
    ti: [['sparkle4', '#fff'], ['magicWand', '#E8D5F5']],
  },
  'witchy-kiwi': {
    bg: 'linear-gradient(180deg, #7ED957 0%, #1B5E20 100%)',
    p: [
      ['wave', '#98FFDE', 3, 32, 48], ['spiral', '#B2FF59', 3, 26, 38],
      ['kiwi', '#558B2F', 3, 24, 36], ['witchHat', '#4A148C', 3, 22, 32],
    ],
    ti: [['kiwi', '#558B2F'], ['witchHat', '#4A148C']],
  },
};

/* ═══════════════════════════════════════════
   PARTICLE GENERATOR
   ═══════════════════════════════════════════ */
const genParticles = (slug) => {
  const c = FC[slug];
  if (!c) return [];
  const out = [];
  let id = 0;
  for (const [type, color, count, mn, mx] of c.p) {
    for (let i = 0; i < count; i++) {
      out.push({
        id: id++, type, color,
        size: mn + Math.random() * (mx - mn),
        x: 5 + Math.random() * 88,
        y: 5 + Math.random() * 80,
        delay: Math.random() * 5,
        dur: 6 + Math.random() * 8,
      });
    }
  }
  return out;
};

/* ═══════════════════════════════════════════
   ANIMATION VARIANTS
   ═══════════════════════════════════════════ */
const canVariants = {
  enter: (d) => ({ x: d > 0 ? 120 : -120, opacity: 0, scale: 0.82, rotateZ: d > 0 ? 8 : -8 }),
  center: { x: 0, opacity: 1, scale: 1, rotateZ: 0 },
  exit: (d) => ({ x: d > 0 ? -80 : 80, opacity: 0, scale: 0.88, rotateZ: d > 0 ? -5 : 5 }),
};

// Text that animates with flavor change in the centered header
const nameVariants = {
  enter: (d) => ({ opacity: 0, y: d > 0 ? 22 : -22 }),
  center: { opacity: 1, y: 0 },
  exit: (d) => ({ opacity: 0, y: d > 0 ? -16 : 16 }),
};

// Info panel content (right panel) — animates per flavor change
const panelInfoVariants = {
  enter: (d) => ({ opacity: 0, y: d > 0 ? 28 : -28 }),
  center: { opacity: 1, y: 0 },
  exit: (d) => ({ opacity: 0, y: d > 0 ? -18 : 18 }),
};

/* ═══════════════════════════════════════════
   WAVEFORM BARS
   ═══════════════════════════════════════════ */
function WaveformBars({ isActive, seeds }) {
  return (
    <div className={styles.waveformBars}>
      {seeds.map((seed, i) => (
        <div
          key={i}
          className={`${styles.waveBar} ${isActive ? styles.waveBarActive : ''}`}
          style={{ '--seed': seed, '--idx': i }}
        />
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════
   MAIN COMPONENT — TWO-STATE HERO
   ═══════════════════════════════════════════ */
export default function BebidasSeccion1() {
  const ingles = useStore(isEnglish);
  const t = ingles ? content.en : content.es;

  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [expanded, setExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' && window.innerWidth <= 900
  );
  const timerRef = useRef(null);
  const prevCurrentRef = useRef(0);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 900);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Audio hook (singleton global with crossfade)
  const { isPlaying, currentFlavor, toggleFlavor } = useFlavorAudio();

  // Stable waveform seeds
  const waveSeeds = useMemo(
    () => Array.from({ length: 28 }, () => 0.15 + Math.random() * 0.85),
    []
  );

  const flavor = magicDrinkFlavors[current];
  const config = FC[flavor.slug] || FC['magic-original'];
  const flavorName = flavor.slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  const tc = config.tc || '#fff';
  const particles = useMemo(() => genParticles(flavor.slug), [flavor.slug]);
  const notes = flavor.notes ? (ingles ? flavor.notes.en : flavor.notes.es) : [];

  // Is audio playing for the currently displayed flavor?
  const audioIsActive = isPlaying && currentFlavor === (flavor.audioId || flavor.slug);

  // ── Navigation ──
  const go = useCallback((dir) => {
    setDirection(dir === 'next' ? 1 : -1);
    setCurrent((prev) =>
      dir === 'next'
        ? (prev + 1) % magicDrinkFlavors.length
        : (prev - 1 + magicDrinkFlavors.length) % magicDrinkFlavors.length
    );
  }, []);

  // Auto-advance — pauses when expanded
  useEffect(() => {
    if (expanded) {
      clearInterval(timerRef.current);
      return;
    }
    timerRef.current = setInterval(() => go('next'), 10000);
    return () => clearInterval(timerRef.current);
  }, [go, expanded]);

  const handleNav = (dir) => {
    clearInterval(timerRef.current);
    go(dir);
    if (!expanded) {
      timerRef.current = setInterval(() => go('next'), 10000);
    }
  };

  const handleSelect = (i) => {
    if (i === current) return;
    clearInterval(timerRef.current);
    setDirection(i > current ? 1 : -1);
    setCurrent(i);
    if (!expanded) {
      timerRef.current = setInterval(() => go('next'), 10000);
    }
  };

  // Auto-crossfade audio when flavor changes while playing
  useEffect(() => {
    if (prevCurrentRef.current !== current && isPlaying) {
      const next = magicDrinkFlavors[current];
      toggleFlavor(next.audioId || next.slug);
    }
    prevCurrentRef.current = current;
  }, [current]); // eslint-disable-line

  const handleTogglePlay = () => {
    toggleFlavor(flavor.audioId || flavor.slug);
  };

  // CSS custom properties for theme
  const heroVars = {
    '--tc': tc,
    '--tc2': tc === '#fff' ? 'rgba(255,255,255,0.85)' : `${tc}bb`,
    '--ub': tc === '#fff' ? 'rgba(255,255,255,0.5)' : `${tc}55`,
    '--ubg': tc === '#fff' ? 'rgba(255,255,255,0.15)' : `${tc}18`,
    '--uhov': tc === '#fff' ? 'rgba(255,255,255,0.35)' : `${tc}30`,
    '--accent': flavor.accentColor,
  };

  return (
    <section
      className={`${styles.hero} ${audioIsActive ? styles.heroPlaying : ''}`}
      style={heroVars}
    >
      {/* ── Background layers (crossfade) ── */}
      {magicDrinkFlavors.map((f, i) => (
        <motion.div
          key={f.slug}
          className={`${styles.bgLayer} ${audioIsActive && i === current ? styles.bgLayerPlaying : ''}`}
          style={{ background: (FC[f.slug] || FC['magic-original']).bg }}
          animate={{ opacity: i === current ? 1 : 0 }}
          transition={{ duration: 0.85, ease: 'easeInOut' }}
        />
      ))}

      {/* ── Particles ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={flavor.slug + '-particles'}
          className={`${styles.particlesWrap} ${audioIsActive ? styles.particlesPlaying : ''}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {particles.map((p, i) => (
            <motion.div
              key={p.id}
              className={`${styles.particle} ${audioIsActive ? styles.particlePlaying : ''}`}
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                '--pdur': `${p.dur}s`,
                '--pdel': `${p.delay}s`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: audioIsActive ? 0.9 : 0.62, scale: 1 }}
              transition={{ duration: 0.35, delay: i * 0.025 }}
            >
              <svg width={p.size} height={p.size} viewBox="0 0 24 24" fill="none" stroke="none">
                {S[p.type](p.color)}
              </svg>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* ── MAIN COLUMN (shifts left when expanded) ── */}
      <motion.div
        className={styles.mainColumn}
        animate={{ x: expanded && !isMobile ? '-25%' : '0%' }}
        transition={{ duration: 0.65, ease: [0.4, 0, 0.2, 1] }}
      >
        {/* ── Collapsed Header (badge + name + tagline) — hidden when expanded ── */}
        <AnimatePresence mode="wait">
          {!expanded && (
            <motion.div
              key="collapsed-header"
              className={styles.collapsedHeader}
              initial={{ opacity: 0, y: -14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
            >
              <div className={styles.badge}>
                <span className={styles.badgeStar}>&#10022;</span>
                {t.badge}
              </div>

              <AnimatePresence mode="wait" custom={direction}>
                <motion.h2
                  key={flavor.slug + '-name'}
                  className={styles.flavorName}
                  custom={direction}
                  variants={nameVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.38, ease: [0.4, 0, 0.2, 1] }}
                >
                  <span className={styles.titleIcon}>
                    <svg width={26} height={26} viewBox="0 0 24 24" fill="none" stroke="none">
                      {S[config.ti[0][0]](config.ti[0][1])}
                    </svg>
                  </span>
                  {flavorName}
                  <span className={styles.titleIcon}>
                    <svg width={26} height={26} viewBox="0 0 24 24" fill="none" stroke="none">
                      {S[config.ti[1][0]](config.ti[1][1])}
                    </svg>
                  </span>
                </motion.h2>
              </AnimatePresence>

              <AnimatePresence mode="wait" custom={direction}>
                <motion.p
                  key={flavor.slug + '-tagline'}
                  className={styles.tagline}
                  custom={direction}
                  variants={nameVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.38, delay: 0.04, ease: [0.4, 0, 0.2, 1] }}
                >
                  {getText(flavor.tagline, ingles)}
                </motion.p>
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Can stage ── */}
        <div className={styles.canSection}>
          <button className={styles.arrow} onClick={() => handleNav('prev')} aria-label="Previous flavor">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <div className={styles.canArea}>
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={flavor.slug + '-can'}
                className={`${styles.canWrapper} ${!expanded ? styles.canClickable : ''}`}
                custom={direction}
                variants={canVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
                onClick={!expanded ? () => setExpanded(true) : undefined}
                whileHover={!expanded ? { scale: 1.06, y: -8 } : undefined}
              >
                <img
                  src={flavor.image}
                  alt={flavorName}
                  className={`${styles.canImage} ${audioIsActive ? styles.canImagePlaying : ''}`}
                  draggable={false}
                />
                <div
                  className={`${styles.canGlow} ${audioIsActive ? styles.canGlowPlaying : ''}`}
                  style={{ background: `radial-gradient(circle, ${flavor.accentColor} 0%, transparent 70%)` }}
                />
                {!expanded && (
                  <motion.div
                    className={styles.clickHint}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                  >
                    {t.clickHint}
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <button className={styles.arrow} onClick={() => handleNav('next')} aria-label="Next flavor">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

        {/* ── Bottom: dots + CTA (collapsed) OR thumbnails (expanded) ── */}
        <AnimatePresence mode="wait">
          {!expanded ? (
            <motion.div
              key="bottom-collapsed"
              className={styles.bottomCollapsed}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
            >
              <div className={styles.dots}>
                {magicDrinkFlavors.map((_, i) => (
                  <button
                    key={i}
                    className={`${styles.dot} ${i === current ? styles.dotActive : ''}`}
                    onClick={() => handleSelect(i)}
                    aria-label={`Flavor ${i + 1}`}
                  />
                ))}
              </div>
              <button
                className={styles.ctaButton}
                onClick={() => setExpanded(true)}
              >
                {t.discoverMore}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="bottom-expanded"
              className={styles.thumbnails}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.35 }}
            >
              {magicDrinkFlavors.map((f, i) => {
                const fCfg = FC[f.slug] || FC['magic-original'];
                const thumbBg = fCfg.bg.startsWith('linear') ? f.accentColor : fCfg.bg;
                return (
                  <button
                    key={f.slug}
                    className={`${styles.thumb} ${i === current ? styles.thumbActive : ''}`}
                    onClick={() => handleSelect(i)}
                    aria-label={f.slug}
                    style={{ '--thumb-bg': thumbBg }}
                  >
                    <img src={f.image} alt={f.slug} className={styles.thumbImg} draggable={false} />
                  </button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* ── INFO PANEL (slides in from right) ── */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            className={`${styles.infoPanel} ${isMobile ? styles.infoPanelMobile : ''}`}
            initial={isMobile ? { y: '100%', opacity: 0 } : { x: '100%', opacity: 0 }}
            animate={isMobile ? { y: '0%', opacity: 1 } : { x: '0%', opacity: 1 }}
            exit={isMobile ? { y: '100%', opacity: 0 } : { x: '100%', opacity: 0 }}
            transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
          >
            <button
              className={styles.backBtn}
              onClick={() => setExpanded(false)}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
              {t.back}
            </button>

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={flavor.slug + '-panel'}
                className={styles.infoContent}
                custom={direction}
                variants={panelInfoVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              >
                <h2 className={styles.panelName}>
                  <span className={styles.titleIcon}>
                    <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="none">
                      {S[config.ti[0][0]](config.ti[0][1])}
                    </svg>
                  </span>
                  {flavorName}
                </h2>

                <p className={styles.panelTagline}>{getText(flavor.tagline, ingles)}</p>

                <p className={styles.description}>{getText(flavor.description, ingles)}</p>

                <div className={styles.divider} />

                {flavor.spotlight && (
                  <p className={styles.spotlight}>"{getText(flavor.spotlight, ingles)}"</p>
                )}

                {flavor.ritual && (
                  <p className={styles.ritual}>
                    <span className={styles.ritualLabel}>{t.ritual}:</span>{' '}
                    {getText(flavor.ritual, ingles)}
                  </p>
                )}

                {notes.length > 0 && (
                  <div className={styles.noteTags}>
                    {notes.map((n) => (
                      <span key={n} className={styles.noteTag}>{n}</span>
                    ))}
                  </div>
                )}

                <div className={styles.statsRow}>
                  <div className={styles.stat}>
                    <span className={styles.statLabel}>{t.energy}</span>
                    <span className={styles.statValue}>{flavor.stats.energy}</span>
                  </div>
                  <div className={styles.stat}>
                    <span className={styles.statLabel}>{t.taste}</span>
                    <span className={styles.statValue}>{getText(flavor.stats.taste, ingles)}</span>
                  </div>
                  <div className={styles.stat}>
                    <span className={styles.statLabel}>{t.vibe}</span>
                    <span className={styles.statValue}>{getText(flavor.stats.vibe, ingles)}</span>
                  </div>
                </div>

                <div className={`${styles.player} ${audioIsActive ? styles.playerActive : ''}`}>
                  <button
                    className={`${styles.playBtn} ${audioIsActive ? styles.playBtnActive : ''}`}
                    onClick={handleTogglePlay}
                    aria-label={audioIsActive ? t.stopNow : t.playNow}
                  >
                    {audioIsActive ? (
                      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                        <rect x="6" y="5" width="4" height="14" rx="1.5" />
                        <rect x="14" y="5" width="4" height="14" rx="1.5" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                        <polygon points="5,3 20,12 5,21" />
                      </svg>
                    )}
                  </button>

                  <WaveformBars isActive={audioIsActive} seeds={waveSeeds} />

                  <span className={styles.trackName}>
                    {flavorName} {t.loopSuffix}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
