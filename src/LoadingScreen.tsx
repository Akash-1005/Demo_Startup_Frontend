import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type LoadingScreenProps = {
  onComplete?: () => void;
};

const videoPool: string[] = [
  '/Blood1.mp4',
  '/Doctor1.mp4',
  '/Doctor2.mp4',
  '/Doctor3.mp4',
  '/Doctor4.mp4',
  '/Hospital1.mp4',
  '/Hospital2.mp4',
  '/Hospital3.mp4',
  '/Blood2.mp4',
  '/Blood3.mp4',
  '/Heart1.mp4',
];

// Transition directions for entering videos: 1 means bottom-to-top, -1 means top-to-bottom
const directions = [1, -1, 1];

// Framer Motion variants with fixed exit position
const variants = {
  // Entry animations remain directional
  initial: (direction: number) => ({
    y: direction === 1 ? '100%' : '-100%',
    opacity: 0,
  }),
  animate: {
    y: '0%',
    opacity: 1,
    transition: { 
      duration: 1, 
      ease: [0.25, 0.1, 0.25, 1]
    },
  },
  // Exit animation is only a fade out, no movement
  exit: {
    opacity: 0,
    transition: { 
      duration: 0.8,
      ease: "easeOut"
    },
  },
};

// Special final transition variants
const finalTransitionVariants = {
  initial: {
    opacity: 0,
    scale: 1.5,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
    }
  },
  exit: {
    opacity: 0,
    scale: 0,
    transition: {
      duration: 0.6,
      ease: [0.65, 0, 0.35, 1],
    }
  }
};

// Text pulse animation
const logoTextVariants = {
  initial: {
    opacity: 1,
    scale: 1,
  },
  pulse: {
    opacity: [1, 1, 1],
    scale: [1, 1.05, 1], 
    transition: {
      duration: 0.7,
      times: [0, 0.5, 1],
      ease: "easeInOut",
    }
  },
  exit: {
    opacity: 0,
    y: -50,
    filter: "blur(10px)",
    transition: {
      duration: 0.5,
    }
  }
};

// Circular rays animation
const rayVariants = {
  initial: {
    opacity: 0,
    scale: 0.8,
  },
  animate: (i: number) => ({
    opacity: [0, 0.7, 0],
    scale: [0.8, 1.5, 2.2],
    transition: {
      duration: 1.8,
      delay: i * 0.15,
      ease: "easeOut",
      repeat: 1,
      repeatType: "loop" as const,
    }
  }),
  exit: {
    opacity: 0,
    transition: { duration: 0.3 }
  }
};

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [selectedVideos, setSelectedVideos] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [showFinalTransition, setShowFinalTransition] = useState(false);

  // On mount, shuffle the video pool and select 3 random videos
  useEffect(() => {
    const shuffled = [...videoPool].sort(() => Math.random() - 0.5);
    setSelectedVideos(shuffled.slice(0, 3));
  }, []);

  // Cycle through the 3 videos, each for 2 seconds
  useEffect(() => {
    if (selectedVideos.length === 0) return;
    
    const videoTimer = setTimeout(() => {
      if (currentIndex < selectedVideos.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        // Trigger final transition
        setShowFinalTransition(true);
        
        // Allow time for the final transition to play before completing
        setTimeout(() => {
          onComplete && onComplete();
        }, 2800);
      }
    }, 2000); // 2 seconds per video
    
    return () => clearTimeout(videoTimer);
  }, [selectedVideos, currentIndex, onComplete]);

  // Preload all videos for smoother transitions
  useEffect(() => {
    if (selectedVideos.length > 0) {
      selectedVideos.forEach(videoSrc => {
        const videoEl = document.createElement('video');
        videoEl.src = videoSrc;
        videoEl.preload = 'auto';
      });
    }
  }, [selectedVideos]);

  // Generate ray elements for the final transition
  const rayElements = Array.from({ length: 12 }).map((_, i) => (
    <motion.div
      key={`ray-${i}`}
      className="absolute inset-0 rounded-full border-2 border-blue-400"
      custom={i}
      variants={rayVariants}
      initial="initial"
      animate={showFinalTransition ? "animate" : "initial"}
      exit="exit"
    />
  ));

  return (
    <div className="fixed inset-0 z-50 bg-black overflow-hidden">
      {/* SIMBIE AI text */}
      <AnimatePresence mode="wait">
        {!showFinalTransition ? (
          <motion.div 
            key="normal-logo"
            className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
            variants={logoTextVariants}
            initial="initial"
            animate="pulse"
            exit="exit"
          >
            <div className="text-center">
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight text-white drop-shadow-lg">
                <span className="inline-block px-2">STARTUP</span>
                <span className="inline-block bg-gradient-to-r from-blue-400 to-blue-600 text-transparent bg-clip-text px-2">NAME</span>
              </h1>
              <div className="h-1.5 w-32 md:w-48 bg-blue-500 mx-auto mt-6 rounded-full"></div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="transition-logo"
            className="absolute inset-0 flex items-center justify-center z-30"
            variants={finalTransitionVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <div className="relative">
              {/* Expanding rays */}
              <div className="absolute -inset-10 md:-inset-16 flex items-center justify-center">
                {rayElements}
              </div>
              
              {/* Main logo with glow effect */}
              <div className="text-center relative">
                <motion.h1 
                  className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight text-white drop-shadow-xl"
                  animate={{ 
                    textShadow: [
                      "0 0 15px rgba(59, 130, 246, 0.7)",
                      "0 0 30px rgba(59, 130, 246, 0.9)",
                      "0 0 15px rgba(59, 130, 246, 0.7)"
                    ],
                    transition: { duration: 1.5, repeat: 1, repeatType: "reverse" }
                  }}
                >
                  <span className="inline-block px-2">STARTUP</span>
                  <span className="inline-block bg-gradient-to-r from-blue-400 to-blue-600 text-transparent bg-clip-text px-2">NAME</span>
                </motion.h1>
                
                <motion.div 
                  className="h-1.5 w-32 md:w-48 bg-blue-500 mx-auto mt-6 rounded-full"
                  animate={{ 
                    width: ["8rem", "16rem", "8rem"],
                    opacity: [0.7, 1, 0.7],
                    transition: { duration: 1.5, repeat: 1, repeatType: "reverse" }
                  }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Semi-transparent overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40 z-10"></div>
      
      {/* Video sequence */}
      <AnimatePresence initial={true} mode="popLayout">
        {selectedVideos.length > 0 && !showFinalTransition && (
          <motion.div
            key={currentIndex}
            className="absolute inset-0 z-0"
            custom={directions[currentIndex]}
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <video
              key={selectedVideos[currentIndex]}
              src={selectedVideos[currentIndex]}
              autoPlay
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Final dramatic transition overlay */}
      <AnimatePresence>
        {showFinalTransition && (
          <motion.div 
            className="absolute inset-0 z-20 bg-black"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0, 0.8, 0],
              transition: { 
                duration: 2.2,
                times: [0, 0.3, 1],
                ease: "easeInOut" 
              }
            }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default LoadingScreen;