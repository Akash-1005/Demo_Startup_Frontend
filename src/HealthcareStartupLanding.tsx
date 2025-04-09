import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LoadingScreen from './LoadingScreen';

const founderData = [
  {
    name: "Dr. ABC",
    title: "Chief Medical Officer",
    specialty: "Cardiology",
    education: "Stanford Medical School",
    experience: 15,
    mission: "Making healthcare accessible through technology",
    quote: "The stethoscope remains the symbol of medicine because it connects us directly to our patients.",
    image: "/placeholder.jpg",
  },
  {
    name: "Dr. PQR",
    title: "Chief Technology Officer",
    specialty: "AI & Machine Learning",
    education: "Stanford",
    experience: 12,
    mission: "Building AI that augments medical professionals",
    quote: "Technology should enhance the doctor-patient relationship, not replace it.",
    image: "/placeholder.jpg",
  },
  {
    name: "Dr. XYZ",
    title: "Chief Executive Officer",
    specialty: "Healthcare Administration",
    education: "Stanford Business School",
    experience: 18,
    mission: "Transforming patient care with innovative technology",
    quote: "Healthcare innovation happens at the intersection of medicine, technology, and compassion.",
    image: "/placeholder.jpg",
  },
];

export default function HealthcareStartupLanding(): JSX.Element {
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<number | null>(null);
  const [modalLoading, setModalLoading] = useState(false);
  const heartVideoRef = useRef<HTMLVideoElement | null>(null);

  // When a founder card is clicked.
  const handleProfileClick = (index: number) => {
    setModalLoading(true);
    setSelectedProfile(index);
    // Simulate additional loading time within the modal.
    setTimeout(() => {
      setModalLoading(false);
    }, 1000);
  };

  const closeModal = () => {
    setSelectedProfile(null);
    setModalLoading(false);
  };

  // Effect to control the video when modal opens/closes
  useEffect(() => {
    if (selectedProfile !== null && heartVideoRef.current) {
      heartVideoRef.current.play();
    }
  }, [selectedProfile]);

  const getSpecialtyEffect = (specialty: string) => {
    switch(specialty) {
      case "Cardiology":
        return (
          <motion.div 
            className="absolute inset-0 pointer-events-none z-0"
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.2, 0.3, 0.2]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            style={{
              background: "radial-gradient(circle at 50% 50%, rgba(255,0,0,0.2), transparent 70%)",
            }}
          />
        );
      case "AI & Machine Learning":
        return (
          <motion.div 
            className="absolute inset-0 pointer-events-none z-0"
            animate={{ 
              x: [-10, 10, -10],
              opacity: [0.2, 0.3, 0.2]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            style={{
              background: "linear-gradient(45deg, rgba(0,255,255,0.2), transparent 70%)",
            }}
          />
        );
      case "Healthcare Administration":
        return (
          <motion.div 
            className="absolute inset-0 pointer-events-none z-0"
            animate={{ 
              rotate: [0, 5, -5, 0],
              opacity: [0.2, 0.3, 0.2]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            style={{
              background: "linear-gradient(120deg, rgba(0,255,0,0.2), transparent 70%)",
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full min-h-screen relative">
      {/* Display the custom LoadingScreen until the sequence is done */}
      {!isPageLoaded && (
        <LoadingScreen onComplete={() => setIsPageLoaded(true)} />
      )}

      {isPageLoaded && (
        <>
          {/* Hero Section with Particle Background */}
          <div className="relative h-screen w-full overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700">
              {/* Animated particles */}
              <div id="particles-js" className="absolute inset-0 opacity-30"></div>
              
              {/* 3D medical model container */}
              <div className="absolute inset-0 flex items-center justify-center opacity-20">
                <div className="w-1/2 h-1/2 relative">
                  <motion.div
                    className="w-full h-full bg-contain bg-center bg-no-repeat"
                    style={{ backgroundImage: "url('/heart-model.png')" }}
                    animate={{ 
                      rotateY: [0, 360],
                      scale: [0.9, 1.1, 0.9]
                    }}
                    transition={{ 
                      rotateY: { duration: 20, repeat: Infinity, ease: "linear" },
                      scale: { duration: 8, repeat: Infinity, ease: "easeInOut" }
                    }}
                  />
                </div>
              </div>
            </div>
            
            <div className="absolute inset-0 z-10 flex items-center justify-center text-center">
              <div className="px-4">
                <motion.h1 
                  className="text-5xl md:text-6xl font-bold text-white mb-4"
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <span className="block mb-2">Visionaries Behind</span>
                  <span className="bg-gradient-to-r from-blue-400 to-purple-600 text-transparent bg-clip-text">
                    Healthcare Revolution
                  </span>
                </motion.h1>
                <motion.p 
                  className="text-xl text-blue-100 max-w-2xl mx-auto"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  Meet the team transforming medical care through cutting-edge technology and compassionate innovation
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1 }}
                  className="mt-8"
                >
                  <a 
                    href="#founders" 
                    className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                  >
                    Meet Our Team
                  </a>
                </motion.div>
              </div>
            </div>
            
            {/* Scroll indicator */}
            <motion.div 
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </motion.div>
          </div>

          {/* Founder Profile Cards with Parallax and 3D Effects */}
          <div id="founders" className="container mx-auto py-20 px-4">
            <motion.h2 
              className="text-3xl font-bold text-center mb-16 text-gray-800"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Meet The Innovators
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {founderData.map((founder, index) => (
                <motion.div
                  key={index}
                  className="relative bg-white rounded-xl overflow-hidden shadow-xl cursor-pointer"
                  initial={{ opacity: 0, y: 100, rotateY: 25 }}
                  whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  whileHover={{ 
                    scale: 1.05, 
                    rotateY: 5,
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                  }}
                  onClick={() => handleProfileClick(index)}
                >
                  {/* Animated background pattern */}
                  <div className="absolute inset-0 z-0 bg-gradient-to-br from-blue-50 to-indigo-50">
                    <svg className="absolute inset-0" width="100%" height="100%">
                      <pattern
                        id={`pattern-${index}`}
                        x="0"
                        y="0"
                        width="40"
                        height="40"
                        patternUnits="userSpaceOnUse"
                      >
                        <path
                          d="M0 20h40M20 0v40"
                          stroke="rgba(59, 130, 246, 0.1)"
                          strokeWidth="1"
                        />
                      </pattern>
                      <rect width="100%" height="100%" fill={`url(#pattern-${index})`} />
                    </svg>
                  </div>
                  
                  {/* Specialty-based subtle effect */}
                  {getSpecialtyEffect(founder.specialty)}
                  
                  <div className="h-40 bg-gradient-to-r from-blue-400 to-blue-600 relative">
                    <motion.div
                      className="absolute inset-0"
                      animate={{ 
                        background: [
                          "linear-gradient(to right, rgba(59, 130, 246, 0.8), rgba(37, 99, 235, 0.8))",
                          "linear-gradient(to right, rgba(59, 130, 246, 0.9), rgba(37, 99, 235, 0.9))",
                          "linear-gradient(to right, rgba(59, 130, 246, 0.8), rgba(37, 99, 235, 0.8))"
                        ]
                      }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    />
                  </div>
                  
                  <div className="relative -mt-20 flex justify-center">
                    <motion.div 
                      className="w-36 h-36 rounded-full border-4 border-white bg-gray-200 flex items-center justify-center overflow-hidden shadow-lg"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <img
                        src={founder.image}
                        alt={founder.name}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                  </div>
                  
                  <div className="p-6 text-center relative z-10">
                    <h3 className="text-2xl font-bold text-gray-800 mb-1">{founder.name}</h3>
                    <p className="text-blue-600 font-medium mb-3">{founder.title}</p>
                    <p className="text-sm text-gray-600 mb-4">{founder.specialty}</p>
                    {/* Removed Experience Bar and Years Experience */}
                    <motion.div
                      className="mt-4 inline-block"
                      whileHover={{ scale: 1.05 }}
                    >
                      <span className="px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium">
                        View Profile
                      </span>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Founder Detail Modal with Enhanced Visual Effects */}
      <AnimatePresence>
        {selectedProfile !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            {/* Backdrop blur with depth effect */}
            <motion.div 
              className="absolute inset-0 bg-black bg-opacity-50"
              initial={{ backdropFilter: "blur(0px)" }}
              animate={{ backdropFilter: "blur(20px)" }}
              exit={{ backdropFilter: "blur(0px)" }}
              transition={{ duration: 0.5 }}
            />
            
            {/* Background Heart Video */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <video
                ref={heartVideoRef}
                src="/Heart2.mp4"
                muted
                loop
                playsInline
                className="w-full h-full object-cover opacity-40"
              />
            </div>
            
            {/* Animated medical elements in background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <motion.div
                className="absolute w-full h-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.2 }}
                exit={{ opacity: 0 }}
              >
                {/* Medical symbols that float around */}
                {Array.from({ length: 10 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute text-blue-500 opacity-30"
                    style={{
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                      fontSize: `${Math.random() * 30 + 20}px`
                    }}
                    animate={{
                      y: [0, Math.random() * 100 - 50],
                      x: [0, Math.random() * 100 - 50],
                      rotate: [0, Math.random() * 360]
                    }}
                    transition={{
                      duration: Math.random() * 10 + 10,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  >
                    {["⚕", "♡", "+", "🔬", "💊", "🩺"][Math.floor(Math.random() * 6)]}
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Modal content with 3D transform */}
            <motion.div
              className="relative z-10 max-w-4xl mx-auto bg-white rounded-2xl overflow-hidden shadow-2xl"
              initial={{ y: 100, opacity: 0, rotateX: 10 }}
              animate={{ y: 0, opacity: 1, rotateX: 0 }}
              exit={{ y: 100, opacity: 0, rotateX: 10 }}
              transition={{ type: "spring", damping: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Remove Specialty & Education from left column */}
              <div className="md:flex">
                {/* Left column with image and basic info */}
                <div className="md:w-1/3 bg-gradient-to-br from-blue-500 to-blue-700 p-8 text-white">
                  <div className="mb-6 flex justify-center">
                    <motion.div 
                      className="w-48 h-48 rounded-full border-4 border-white overflow-hidden shadow-xl"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <img
                        src={founderData[selectedProfile].image}
                        alt={founderData[selectedProfile].name}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                  </div>
                  <motion.h2 
                    className="text-2xl font-bold mb-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    {founderData[selectedProfile].name}
                  </motion.h2>
                  <motion.p 
                    className="text-blue-200 mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    {founderData[selectedProfile].title}
                  </motion.p>
                </div>
                
                {/* Right column with detailed info */}
                <div className="md:w-2/3 p-8">
                  {/* Moved Specialty & Education here */}
                  <motion.div 
                    className="mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.65 }}
                  >
                    <p className="text-sm mb-2"><strong>Specialty:</strong> {founderData[selectedProfile].specialty}</p>
                    <p className="text-sm"><strong>Education:</strong> {founderData[selectedProfile].education}</p>
                  </motion.div>
                  <motion.h3 
                    className="text-xl font-semibold mb-4 text-gray-800"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    Mission
                  </motion.h3>
                  <motion.p 
                    className="text-gray-600 mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                  >
                    {founderData[selectedProfile].mission}
                  </motion.p>
                  
                  {/* Removed Experience section */}
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.1 }}
                  >
                    <h3 className="text-xl font-semibold mb-2 text-gray-800">Inspirational Quote</h3>
                    <blockquote className="italic text-gray-600 border-l-4 border-blue-500 pl-4 py-2 mb-4">
                      "{founderData[selectedProfile].quote}"
                    </blockquote>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
