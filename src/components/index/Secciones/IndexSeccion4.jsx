import { useState } from 'react';
import { useStore } from '@nanostores/react';
import { isEnglish, isDarkMode } from '../../../data/variables';
import VideoLightbox from '../components/VideoLightbox';
import styles from '../css/indexSeccion4.module.css';

const IndexSeccion4 = () => {
  const ingles = useStore(isEnglish);
  const darkMode = useStore(isDarkMode);
  const [pausedRow, setPausedRow] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [currentCarousel, setCurrentCarousel] = useState(null);

  const content = ingles ? {
    header: {
      title: "Stories That Energize",
      subtitle: "Capturing moments with the energy that defines us.",
      seeMore: "See more"
    }
  } : {
    header: {
      title: "Historias Que Energizan",
      subtitle: "Capturando momentos con la energía que nos define.",
      seeMore: "Ver más"
    }
  };

  const t = content;

  // Row 1: General / Mixed Projects
  const rowOneVideos = [
    { id: '1054239205', title: 'Brand Launch Campaign', description: 'Dynamic brand introduction with multicultural appeal and data-driven messaging.', category: 'Social Ads' },
    { id: '1135534073', title: 'Product Showcase Reel', description: 'High-impact product visuals optimized for digital platforms and mobile viewing.', category: 'Commercial' },
    { id: '1098651741', title: 'Digital Transformation Story', description: 'Corporate storytelling highlighting innovation and technology adoption journey.', category: 'Corporate' },
    { id: '1134373054', title: 'Event Highlights Video', description: 'Professional event coverage with cinematic editing and social media optimization.', category: 'Event' },
    { id: '1119883818', title: 'App Launch Teaser', description: 'Vertical-first mobile app promotion designed for TikTok and Instagram Reels.', category: 'App Marketing' },
    { id: '649746601', title: 'Service Overview Video', description: 'Clear and engaging explanation of service offerings with call-to-action focus.', category: 'Explainer' },
    { id: '649732140', title: 'Customer Success Story', description: 'Authentic testimonial showcasing measurable results and client satisfaction.', category: 'Testimonial' }
  ];

  // Row 2: Corporate Videos
  const rowTwoVideos = [
    { id: '649725439', title: 'Company Culture Video', description: 'Behind-the-scenes look at workplace culture and team dynamics for recruitment.', category: 'Corporate' },
    { id: '738395334', title: 'Annual Report Highlights', description: 'Visual summary of yearly achievements with data visualization and storytelling.', category: 'Corporate' },
    { id: '866963712', title: 'Leadership Message', description: 'Executive communication piece with professional production and clear messaging.', category: 'Corporate' },
    { id: '1106533496', title: 'Corporate Values Video', description: 'Mission and values storytelling with emotional connection and brand alignment.', category: 'Corporate' },
    { id: '515507947', title: 'Office Tour Video', description: 'Engaging workspace showcase highlighting facilities and work environment.', category: 'Corporate' },
    { id: '1106542411', title: 'Team Introduction Reel', description: 'Meet-the-team video with personality and professional presentation balance.', category: 'Corporate' },
    { id: '906190895', title: 'Corporate Event Recap', description: 'Professional event documentation with highlight editing and social shareability.', category: 'Corporate' }
  ];

  // Row 3: Promotional Videos
  const rowThreeVideos = [
    { id: '839149771', title: 'Seasonal Sale Promo', description: 'High-energy promotional video with urgency triggers and conversion optimization.', category: 'Promo' },
    { id: '688620646', title: 'Product Feature Spotlight', description: 'Focused product demo highlighting key features with clear benefits messaging.', category: 'Promo' },
    { id: '225594533', title: 'Limited Offer Campaign', description: 'Time-sensitive promotional content designed for maximum engagement and action.', category: 'Promo' },
    { id: '329440716', title: 'New Collection Launch', description: 'Fashion and retail launch video with aesthetic appeal and shopping call-to-action.', category: 'Promo' },
    { id: '906468836', title: 'Service Promotion Video', description: 'B2B service promotion with professional tone and clear value proposition.', category: 'Promo' },
    { id: '853196062', title: 'Flash Sale Announcement', description: 'Urgent promotional video optimized for social media rapid consumption.', category: 'Promo' },
    { id: '839203813', title: 'Grand Opening Promo', description: 'Location launch video with excitement building and community engagement focus.', category: 'Promo' }
  ];

  // Obtener thumbnail de Vimeo
  const getVimeoThumbnail = (videoId) => {
    return `https://vumbnail.com/${videoId}.jpg`;
  };

  // Abrir lightbox
  const openLightbox = (video, carouselType, videos) => {
    const index = videos.findIndex(v => v.id === video.id);
    setCurrentVideoIndex(index);
    setSelectedVideo(video);
    setCurrentCarousel({ type: carouselType, videos });
    document.body.style.overflow = 'hidden';
  };

  // Cerrar lightbox
  const closeLightbox = () => {
    setSelectedVideo(null);
    setCurrentCarousel(null);
    document.body.style.overflow = 'auto';
  };

  // Navegación en lightbox
  const goToNextVideo = () => {
    if (!currentCarousel) return;
    const nextIndex = (currentVideoIndex + 1) % currentCarousel.videos.length;
    setCurrentVideoIndex(nextIndex);
    setSelectedVideo(currentCarousel.videos[nextIndex]);
  };

  const goToPrevVideo = () => {
    if (!currentCarousel) return;
    const prevIndex = (currentVideoIndex - 1 + currentCarousel.videos.length) % currentCarousel.videos.length;
    setCurrentVideoIndex(prevIndex);
    setSelectedVideo(currentCarousel.videos[prevIndex]);
  };

  // Duplicar para loop infinito
  const duplicatedRowOne = [...rowOneVideos, ...rowOneVideos];
  const duplicatedRowTwo = [...rowTwoVideos, ...rowTwoVideos];
  const duplicatedRowThree = [...rowThreeVideos, ...rowThreeVideos];

  return (
    <>
      <section className={`${styles.section} ${!darkMode ? styles.sectionLight : ''}`}>
        <div className={styles.wrapper}>
          {/* Header */}
          <div className={styles.header}>
            <div>
              <h2 className={styles.title}>{t.header.title}</h2>
              <p className={styles.subtitle}>{t.header.subtitle}</p>
            </div>
          </div>

          {/* Contenedor con overlay para fade masks */}
          <div className={styles.carouselsOverlay}>
            {/* Contenedor 3D con perspectiva + skew */}
            <div className={styles.carouselsWrapper}>
              {/* Carrusel 1: General / Mixed Projects */}
              <div className={styles.carouselContainer}>
                <div 
                  className={`${styles.carouselTrack} ${styles.rowOne} ${pausedRow === 1 ? styles.paused : ''}`}
                  onMouseEnter={() => setPausedRow(1)}
                  onMouseLeave={() => setPausedRow(null)}
                >
                  {duplicatedRowOne.map((video, index) => (
                    <div 
                      key={`row1-${index}`} 
                      className={styles.videoCard}
                      onClick={() => openLightbox(video, 'row1', rowOneVideos)}
                    >
                      <img 
                        src={getVimeoThumbnail(video.id)} 
                        alt={video.title} 
                        className={styles.videoThumbnail}
                        loading="lazy"
                      />
                      <div className={styles.playOverlay}>
                        <div className={styles.playIcon}>▶</div>
                      </div>
                      <div className={styles.videoInfo}>
                        <span className={styles.videoCategory}>{video.category}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Carrusel 2: Corporate Videos */}
              <div className={styles.carouselContainer}>
                <div 
                  className={`${styles.carouselTrack} ${styles.rowTwo} ${pausedRow === 2 ? styles.paused : ''}`}
                  onMouseEnter={() => setPausedRow(2)}
                  onMouseLeave={() => setPausedRow(null)}
                >
                  {duplicatedRowTwo.map((video, index) => (
                    <div 
                      key={`row2-${index}`} 
                      className={styles.videoCard}
                      onClick={() => openLightbox(video, 'row2', rowTwoVideos)}
                    >
                      <img 
                        src={getVimeoThumbnail(video.id)} 
                        alt={video.title} 
                        className={styles.videoThumbnail}
                        loading="lazy"
                      />
                      <div className={styles.playOverlay}>
                        <div className={styles.playIcon}>▶</div>
                      </div>
                      <div className={styles.videoInfo}>
                        <span className={styles.videoCategory}>{video.category}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Carrusel 3: Promotional Videos */}
              <div className={styles.carouselContainer}>
                <div 
                  className={`${styles.carouselTrack} ${styles.rowThree} ${pausedRow === 3 ? styles.paused : ''}`}
                  onMouseEnter={() => setPausedRow(3)}
                  onMouseLeave={() => setPausedRow(null)}
                >
                  {duplicatedRowThree.map((video, index) => (
                    <div 
                      key={`row3-${index}`} 
                      className={styles.videoCard}
                      onClick={() => openLightbox(video, 'row3', rowThreeVideos)}
                    >
                      <img 
                        src={getVimeoThumbnail(video.id)} 
                        alt={video.title} 
                        className={styles.videoThumbnail}
                        loading="lazy"
                      />
                      <div className={styles.playOverlay}>
                        <div className={styles.playIcon}>▶</div>
                      </div>
                      <div className={styles.videoInfo}>
                        <span className={styles.videoCategory}>{video.category}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedVideo && currentCarousel && (
        <VideoLightbox
          selectedVideo={selectedVideo}
          currentVideoIndex={currentVideoIndex}
          totalVideos={currentCarousel.videos.length}
          onClose={closeLightbox}
          onNext={goToNextVideo}
          onPrev={goToPrevVideo}
          ingles={ingles}
        />
      )}
    </>
  );
};

export default IndexSeccion4;
