import { useState, useRef, useEffect, memo, useCallback } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Code2, Bot, Users, Bug, Terminal } from "lucide-react";
import styles from "./Screenshots.module.scss";
import { fadeUp, staggerContainer } from "@/animations/motion";

const slides = [
  {
    id: "editor",
    icon: Code2,
    title: "A familiar, fast editor",
    description:
      "Full IntelliSense, multi-cursor editing, and instant file search built on Monaco.",
    tag: "EDITOR",
  },
  {
    id: "ai",
    icon: Bot,
    title: "AI that knows your codebase",
    description:
      "Context-aware chat and inline completions trained on your project structure.",
    tag: "AI ASSISTANT",
  },
  {
    id: "collab",
    icon: Users,
    title: "Real-time pair programming",
    description: "Live cursors, shared terminals, and instant collaboration.",
    tag: "COLLABORATION",
  },
  {
    id: "debugger",
    icon: Bug,
    title: "Integrated interactive debugger",
    description: "Set breakpoints, inspect live variables, and step through call stacks.",
    tag: "DEBUGGER",
  },
  {
    id: "terminal",
    icon: Terminal,
    title: "Built-in multi-tab terminal",
    description: "Run dev servers, execute commands, and stream logs without leaving the IDE.",
    tag: "TERMINAL",
  },
];

const Screenshots = memo((): React.ReactElement => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [offsetX, setOffsetX] = useState(0);
  const autoPlayRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200,
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalSlides = slides.length;

  const goToSlide = useCallback(
    (index: number) => {
      const newIndex = ((index % totalSlides) + totalSlides) % totalSlides;
      setCurrentIndex(newIndex);
    },
    [totalSlides],
  );

  const goToNext = useCallback(
    () => goToSlide(currentIndex + 1),
    [currentIndex, goToSlide],
  );
  const goToPrev = useCallback(
    () => goToSlide(currentIndex - 1),
    [currentIndex, goToSlide],
  );

  useEffect(() => {
    if (isDragging) {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
        autoPlayRef.current = null;
      }
      return;
    }

    autoPlayRef.current = setInterval(goToNext, 6000);
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
        autoPlayRef.current = null;
      }
    };
  }, [currentIndex, goToNext, isDragging]);

  const getCardPosition = (index: number) => {
    let diff = index - currentIndex;
    if (diff > totalSlides / 2) diff -= totalSlides;
    if (diff < -totalSlides / 2) diff += totalSlides;
    return diff;
  };

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    setStartX(clientX);
    setOffsetX(0);
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const diff = clientX - startX;
    setOffsetX(diff);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (Math.abs(offsetX) > 50) {
      if (offsetX > 0) {
        goToPrev();
      } else {
        goToNext();
      }
    }
    setOffsetX(0);
  };

  const spacing = windowWidth < 640 ? 230 : windowWidth < 1024 ? 310 : 380;

  return (
    <section className={styles.screenshots}>
      <div className={styles.container}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className={styles.header}
        >
          <motion.h2 variants={fadeUp} className={styles.title}>
            See C2X in action
          </motion.h2>
          <motion.p variants={fadeUp} className={styles.description}>
            Explore the features that make C2X a connected collaborative IDE.
          </motion.p>
        </motion.div>

        <div className={styles.carouselWrapper}>
          <div
            ref={containerRef}
            className={styles.carouselContainer}
            onMouseDown={handleDragStart}
            onMouseMove={handleDragMove}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
            onTouchStart={handleDragStart}
            onTouchMove={handleDragMove}
            onTouchEnd={handleDragEnd}
          >
            <div className={styles.cardsContainer}>
              {slides.map((slide, index) => {
                const position = getCardPosition(index);
                const isCenter = position === 0;
                const isVisible = Math.abs(position) <= 1;

                if (!isVisible) return null;

                const translateX = position * spacing + offsetX;
                const scale = isCenter ? 1 : 0.85;
                const opacity = isCenter ? 1 : 0.35;
                const zIndex = isCenter ? 3 : 1;

                return (
                  <motion.div
                    key={slide.id}
                    className={`${styles.card} ${isCenter ? styles.centerCard : ""}`}
                    style={{
                      zIndex: zIndex,
                      pointerEvents: isCenter ? "auto" : "none",
                    }}
                    animate={{
                      x: translateX,
                      scale: scale,
                      opacity: opacity,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                      mass: 1,
                    }}
                  >
                    <div className={styles.cardContent}>
                      <div className={styles.cardHeader}>
                        <div className={styles.iconWrapper}>
                          <slide.icon size={26} strokeWidth={1.5} />
                        </div>
                        <span className={styles.tag}>{slide.tag}</span>
                      </div>
                      <div>
                        <h3 className={styles.cardTitle}>{slide.title}</h3>
                        <p className={styles.cardDescription}>
                          {slide.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div className={styles.navigation}>
            <button
              className={styles.arrowBtn}
              onClick={goToPrev}
              aria-label="Previous slide"
            >
              <ChevronLeft size={22} strokeWidth={2.5} />
            </button>

            <div className={styles.dots}>
              {slides.map((_, index) => (
                <button
                  key={index}
                  className={`${styles.dot} ${index === currentIndex ? styles.active : ""}`}
                  onClick={() => goToSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            <button
              className={styles.arrowBtn}
              onClick={goToNext}
              aria-label="Next slide"
            >
              <ChevronRight size={22} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
});

Screenshots.displayName = "Screenshots";

export default Screenshots;
