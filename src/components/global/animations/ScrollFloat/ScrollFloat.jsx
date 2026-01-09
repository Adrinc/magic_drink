import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ScrollFloat = ({
  children,
  scrollContainerRef,
  containerClassName = "",
  textClassName = "",
  animationDuration = 1,
  ease = "back.inOut(2)",
  scrollStart = "center bottom+=50%",
  scrollEnd = "bottom bottom-=40%",
  stagger = 0.03
}) => {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const text = textRef.current;
    if (!container || !text) return;

    // Obtener el scroller correcto
    const scroller = scrollContainerRef?.current || window;

    // Dividir el texto en caracteres si es string
    const chars = text.querySelectorAll('.scroll-float-char');
    
    gsap.fromTo(
      chars,
      {
        willChange: "opacity, transform",
        opacity: 0,
        yPercent: 120,
        scaleY: 2.3,
        scaleX: 0.7,
        transformOrigin: "50% 0%"
      },
      {
        duration: animationDuration,
        ease: ease,
        opacity: 1,
        yPercent: 0,
        scaleY: 1,
        scaleX: 1,
        stagger: stagger,
        scrollTrigger: {
          trigger: container,
          scroller: scroller === window ? undefined : scroller,
          start: scrollStart,
          end: scrollEnd,
          scrub: true
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === container) {
          trigger.kill();
        }
      });
    };
  }, [scrollContainerRef, animationDuration, ease, scrollStart, scrollEnd, stagger]);

  // Procesar children para dividir en caracteres
  const renderContent = () => {
    if (typeof children === "string") {
      return children.split("").map((char, index) => (
        <span
          key={index}
          className={`scroll-float-char inline-block ${textClassName}`}
          style={{ display: 'inline-block' }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ));
    }
    return children;
  };

  return (
    <div ref={containerRef} className={containerClassName}>
      <span ref={textRef} style={{ display: 'inline-block' }}>
        {renderContent()}
      </span>
    </div>
  );
};

export default ScrollFloat;
