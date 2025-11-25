import { motion, AnimatePresence } from 'framer-motion';
import styles from '../css/videoLightbox.module.css';

/**
 * VideoLightbox - Modal reutilizable para reproducir videos de Vimeo
 * Incluye: Player, título, descripción, navegación prev/next
 */

const VideoLightbox = ({
  selectedVideo,
  currentVideoIndex,
  totalVideos,
  onClose,
  onNext,
  onPrev,
  ingles = false
}) => {
  if (!selectedVideo) return null;

  // Construir URL de Vimeo con autoplay
  const getVimeoUrl = (videoId) => {
    return `https://player.vimeo.com/video/${videoId}?autoplay=1&muted=0&loop=0&autopause=0&controls=1&title=0&byline=0&portrait=0`;
  };

  return (
    <AnimatePresence>
      <motion.div
        className={styles.lightboxBackdrop}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
      >
        <motion.div
          className={styles.lightboxContent}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Botón de cierre (esquina superior derecha) */}
          <button 
            className={styles.closeButton}
            onClick={onClose}
            aria-label={ingles ? "Close" : "Cerrar"}
          >
            ✕
          </button>

          {/* Botones de navegación prev/next */}
          {totalVideos > 1 && (
            <>
              <button 
                className={styles.navButtonPrev}
                onClick={onPrev}
                aria-label={ingles ? "Previous video" : "Video anterior"}
              >
                ‹
              </button>
              
              <button 
                className={styles.navButtonNext}
                onClick={onNext}
                aria-label={ingles ? "Next video" : "Video siguiente"}
              >
                ›
              </button>
            </>
          )}

          {/* Contenido principal */}
          <div className={styles.lightboxLayout}>
            {/* Título del video */}
            <div className={styles.videoHeader}>
              <h3 className={styles.videoTitle}>{selectedVideo.title}</h3>
              <div className={styles.videoCounter}>
                {currentVideoIndex + 1} / {totalVideos}
              </div>
            </div>

            {/* Player de Vimeo */}
            <div className={styles.playerWrapper}>
              <iframe
                key={selectedVideo.id}
                src={getVimeoUrl(selectedVideo.id)}
                className={styles.videoIframe}
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                title={selectedVideo.title}
              />
            </div>

            {/* Descripción del video */}
            <div className={styles.videoDescription}>
              <p>{selectedVideo.description}</p>
              {selectedVideo.category && (
                <div className={styles.categoryBadge}>
                  📁 {selectedVideo.category}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default VideoLightbox;
