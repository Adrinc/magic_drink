import { useEffect, useRef } from 'react';

/**
 * useKawaiiFlow - Hook para animaciones progresivas con Intersection Observer
 * Sistema "Kawaii Flow" - Magic Drink
 * 
 * @param {Object} options - Opciones de configuración
 * @param {number} options.threshold - % de visibilidad para activar (default: 0.2 = 20%)
 * @param {string} options.rootMargin - Margen del viewport (default: '0px')
 * @param {boolean} options.once - Animar solo una vez (default: true)
 * @returns {Object} - { ref, isVisible }
 */
export const useKawaiiFlow = (options = {}) => {
  const {
    threshold = 0.2,
    rootMargin = '0px',
    once = true
  } = options;

  const ref = useRef(null);
  const observerRef = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Crear observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Elemento entra al viewport
            if (!hasAnimated.current || !once) {
              element.classList.add('kawaii-flow-in');
              element.classList.remove('kawaii-flow-out');
              hasAnimated.current = true;
            }
          } else {
            // Elemento sale del viewport
            if (!once && hasAnimated.current) {
              element.classList.remove('kawaii-flow-in');
              element.classList.add('kawaii-flow-out');
            }
          }
        });
      },
      {
        threshold,
        rootMargin
      }
    );

    // Observar elemento
    observerRef.current.observe(element);

    // Cleanup
    return () => {
      if (observerRef.current && element) {
        observerRef.current.unobserve(element);
      }
    };
  }, [threshold, rootMargin, once]);

  return { ref };
};

/**
 * useStaggeredKawaiiFlow - Hook para animaciones escalonadas de múltiples elementos
 * 
 * @param {number} count - Número de elementos
 * @param {Object} options - Opciones (igual que useKawaiiFlow)
 * @returns {Array} - Array de refs
 */
export const useStaggeredKawaiiFlow = (count, options = {}) => {
  const refs = useRef([]);
  const observersRef = useRef([]);
  const hasAnimated = useRef(new Array(count).fill(false));

  const {
    threshold = 0.2,
    rootMargin = '0px',
    once = true,
    staggerDelay = 100 // delay entre elementos (ms)
  } = options;

  useEffect(() => {
    // Limpiar refs viejos si count cambió
    if (refs.current.length !== count) {
      refs.current = new Array(count).fill(null);
      hasAnimated.current = new Array(count).fill(false);
    }

    refs.current.forEach((element, index) => {
      if (!element) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              if (!hasAnimated.current[index] || !once) {
                // Delay escalonado
                setTimeout(() => {
                  element.classList.add('kawaii-flow-in');
                  element.classList.remove('kawaii-flow-out');
                }, index * staggerDelay);
                hasAnimated.current[index] = true;
              }
            } else {
              if (!once && hasAnimated.current[index]) {
                element.classList.remove('kawaii-flow-in');
                element.classList.add('kawaii-flow-out');
              }
            }
          });
        },
        { threshold, rootMargin }
      );

      observer.observe(element);
      observersRef.current[index] = observer;
    });

    // Cleanup
    return () => {
      observersRef.current.forEach((observer, index) => {
        if (observer && refs.current[index]) {
          observer.unobserve(refs.current[index]);
        }
      });
    };
  }, [count, threshold, rootMargin, once, staggerDelay]);

  const setRef = (index) => (el) => {
    refs.current[index] = el;
  };

  return refs.current.map((_, index) => setRef(index));
};
