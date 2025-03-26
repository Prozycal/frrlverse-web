// File: app/page.jsx
"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaInstagram,
  FaEnvelope,
  FaCode,
  FaPalette,
  FaLaptopCode,
  FaCertificate,
  FaUser,
  FaQuoteLeft,
  FaClock,
  FaLink,
  FaBook,
  FaMoneyBillWaveAlt,
} from "react-icons/fa";
import { format } from "date-fns";
import { id } from "date-fns/locale";

// Main component
export default function Home() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // Check if device is desktop (width > 768px)
    const checkDevice = () => {
      setIsDesktop(window.innerWidth > 768);
    };
    
    // Initial check
    checkDevice();
    
    // Add resize listener
    window.addEventListener('resize', checkDevice);

    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    const handleMouseMove = (e) => {
      if (isDesktop) {
        setMousePosition({
          x: e.clientX,
          y: e.clientY
        });
      }
    };

    // Add hover detection for interactive elements
    const handleElementHover = (e) => {
      if (!isDesktop) return;
      
      const target = e.target;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('button') ||
        target.closest('a') ||
        target.closest('[role="button"]') ||
        target.closest('[onClick]') ||
        target.closest('.cursor-pointer')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleElementHover);

    // Add global style to hide cursor only on desktop
    const style = document.createElement('style');
    style.textContent = `
      @media (min-width: 769px) {
        * {
          cursor: none !important;
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      clearTimeout(timer);
      clearInterval(timeInterval);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleElementHover);
      window.removeEventListener('resize', checkDevice);
      style.remove();
    };
  }, [isDesktop]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-gray-950 text-white p-3 md:p-6 lg:p-8 relative overflow-hidden flex flex-col"
    >
      {/* Custom Cursor - Only show on desktop */}
      {isDesktop && (
        <>
          <div
            className="fixed top-0 left-0 w-3 h-3 bg-white rounded-sm pointer-events-none z-50 mix-blend-difference transition-transform duration-200 ease-out"
            style={{
              transform: `translate(${mousePosition.x - 6}px, ${mousePosition.y - 6}px) rotate(45deg) scale(${isHovering ? 1.2 : 1})`
            }}
          />
          <div
            className="fixed top-0 left-0 w-6 h-6 border border-white/50 rounded-sm pointer-events-none z-50 mix-blend-difference transition-transform duration-300 ease-out"
            style={{
              transform: `translate(${mousePosition.x - 12}px, ${mousePosition.y - 12}px) rotate(45deg) scale(${isHovering ? 1.5 : 1})`
            }}
          />
        </>
      )}

      {/* Enhanced Background Effects */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Animated Gradient Orbs */}
        <motion.div
          className="absolute -top-[40vh] -left-[20vw] w-[70vw] h-[70vh] rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 blur-[120px]"
          animate={{
            opacity: [0.03, 0.05, 0.03],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />

        <motion.div
          className="absolute -bottom-[30vh] -right-[20vw] w-[60vw] h-[60vh] rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 blur-[100px]"
          animate={{
            opacity: [0.03, 0.06, 0.03],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 1,
          }}
        />

        {/* Interactive Mouse Follow Effect */}
        <motion.div
          className="absolute w-[300px] h-[300px] rounded-full bg-gradient-to-r from-purple-500/10 to-blue-500/30 blur-[100px]"
          animate={{
            x: mousePosition.x - 150,
            y: mousePosition.y - 150,
          }}
          transition={{
            type: "spring",
            damping: 30,
            stiffness: 200,
          }}
        />

        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black,transparent)]" />

        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/10 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: Math.random() * 0.5 + 0.5,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "reverse",
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex-1 flex flex-col">
        <Header />
        <main className="flex-1 flex flex-col py-1 md:py-3 overflow-hidden">
          <BentoGrid>
            <ProfileWidget className="md:col-span-1 row-span-1" />
            <AboutMeWidget className="md:col-span-1 row-span-1" />
            <SkillsWidget className="md:col-span-1 row-span-1" />
            <ProjectsWidget className="md:col-span-2 row-span-1" />
            <CertificatesWidget className="md:col-span-1 row-span-1" />
            <ContactsWidget className="md:col-span-1 row-span-1" />
            <DateTimeWidget currentTime={currentTime} className="md:col-span-1 row-span-1" />
            <QuoteWidget className="md:col-span-1 row-span-1" />
            <SocialLinksWidget className="md:col-span-2 row-span-1" />
            <BlogWidget className="md:col-span-1 row-span-1" />
          </BentoGrid>
        </main>
        <Footer />
      </div>
    </motion.div>
  );
}

// Header Component
function Header() {
  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
      className="relative text-center py-5 md:py-6 lg:py-8 overflow-hidden"
    >
      <div className="relative">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <h1 className="font-extrabold text-4xl md:text-6xl lg:text-7xl tracking-tight mb-2 md:mb-3">
            <span className="inline-block bg-gradient-to-r from-gray-300 via-white to-gray-300 bg-clip-text text-transparent pb-1 relative">
              Hi, I'm Farrel!
              <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-gray-400 to-gray-600 transform scale-x-0 origin-left animate-expandLine"></span>
            </span>
          </h1>
        </motion.div>

        <motion.p
          className="text-sm md:text-base lg:text-lg text-gray-400 max-w-md mx-auto tracking-wide font-light"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          Welcome to my digital space
        </motion.p>
      </div>
    </motion.header>
  );
}

// Footer Component
function Footer() {
  return (
    <footer className="mt-6 md:mt-12 text-center text-gray-500 pb-4 md:pb-6">
      <p>© 2025 Muhammad Farrel Rabbani. All rights reserved.</p>
    </footer>
  );
}

// BentoGrid Component
function BentoGrid({ children }) {
  return (
    <div
      className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-3 lg:gap-4 
      max-w-7xl mx-auto h-[calc(98vh-80px)] min-h-[500px]
      overflow-y-auto md:overflow-visible overflow-x-hidden 
      grid-flow-dense auto-rows-min"
    >
      {children}
    </div>
  );
}

// BentoCard Component
function BentoCard({ children, className = "", onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className={`relative overflow-hidden rounded-xl backdrop-blur-md 
        bg-gray-900/80 border border-gray-800 p-3 md:p-4 
        min-h-[120px] md:min-h-[140px] h-full ${className}`}
      onClick={onClick}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gray-800/20 via-transparent to-gray-700/20 opacity-50" />
      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  );
}

// Profile Widget
function ProfileWidget({ className = "" }) {
  const titles = [
    "Front End Web Developer",
    "Graphic Designer",
    "Hobbyist"
  ];
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    // Initial check
    checkDevice();
    
    // Add resize listener
    window.addEventListener('resize', checkDevice);

    const interval = setInterval(() => {
      setCurrentTitleIndex((prev) => (prev + 1) % titles.length);
    }, 3000); // Change title every 3 seconds

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', checkDevice);
    };
  }, []);

  const handleFlip = () => {
    if (isMobile) {
      setIsFlipped(!isFlipped);
    }
  };

  return (
    <BentoCard className={`bg-gradient-to-br from-gray-800/30 to-gray-700/30 ${className}`}>
      <div className="flex flex-col items-center justify-center h-full text-center">
        <div 
          className="relative w-24 h-24 mb-4 [perspective:1000px] cursor-pointer"
          onClick={handleFlip}
        >
          <motion.div
            className="relative w-full h-full [transform-style:preserve-3d]"
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
            onHoverStart={() => !isMobile && setIsFlipped(true)}
            onHoverEnd={() => !isMobile && setIsFlipped(false)}
          >
            {/* Front side */}
            <div className="absolute inset-0 [backface-visibility:hidden]">
              <img
                src="/images/profile.jpg"
                alt="Profile"
                className="w-full h-full object-cover rounded-3xl border-2 border-gray-400/30"
              />
            </div>
            {/* Back side */}
            <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]">
              <img
                src="/images/logo.jpg"
                alt="Logo"
                className="w-full h-full object-cover rounded-3xl border-2 border-gray-400/30"
              />
            </div>
          </motion.div>
        </div>
        <h2 className="text-xl font-bold text-gray-200 mb-2">Muhammad Farrel Rabbani</h2>
        <div className="h-8 w-full relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTitleIndex}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ 
                duration: 0.5,
                ease: "easeInOut"
              }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <span className="text-sm text-gray-300 font-medium">
                {titles[currentTitleIndex]}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </BentoCard>
  );
}

// About Me Widget
function AboutMeWidget({ className = "" }) {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (showModal) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [showModal]);

  return (
    <>
      <BentoCard
        className={`bg-gradient-to-br from-gray-800/30 to-gray-700/30 cursor-pointer ${className}`}
        onClick={() => setShowModal(true)}
      >
        <div className="flex flex-col h-full justify-between">
          <div className="flex items-center mb-2">
            <FaUser className="text-gray-400 text-lg mr-2" />
            <h2 className="text-lg font-bold text-gray-200">About Me</h2>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-800/50">
                <img
                  src="/images/farrel-2.jpg"
                  alt="About Me"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-sm text-gray-300 line-clamp-2 flex-1">
                Passionate Front End Developer with expertise in modern web technologies. 
                Currently in Network information systems and applications major at SMK Negeri 2 Depok Sleman.
              </p>
            </div>
            <p className="text-xs text-gray-400">
              Click to learn more about my journey
            </p>
          </div>
        </div>
      </BentoCard>

      <AnimatePresence>
        {showModal && (
          <motion.div
            className="modal-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowModal(false)}
          >
            <motion.div
              className="modal-content"
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <h2 className="text-2xl font-bold text-gray-200">About Me</h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 rounded-full hover:bg-gray-800 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="modal-scrollable">
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-200 mb-3">Background</h3>
                    <p className="text-gray-300 mb-4">
                      I am a passionate Front End Developer currently in Network information systems and applications major at SMK Negeri 2 Depok Sleman.
                      My journey in web development started with a curiosity about creating beautiful and functional websites, 
                      which led me to explore various technologies and frameworks.
                    </p>
                    <div className="w-full h-48 bg-gray-800/50 rounded-lg overflow-hidden">
                      <img
                        src="/images/farrel-1.jpg"
                        alt="Background"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-200 mb-3">Interests</h3>
                    <p className="text-gray-300 mb-4">
                      I have a keen interest in modern web technologies, particularly React and its ecosystem. 
                      I enjoy creating responsive and user-friendly interfaces, and I'm always excited to learn 
                      about new tools and techniques in web development.
                    </p>
                    <div className="w-full h-48 bg-gray-800/50 rounded-lg overflow-hidden">
                      <img
                        src="/images/farrel-2.jpg"
                        alt="Interests"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-200 mb-3">Goals</h3>
                    <p className="text-gray-300 mb-4">
                      My goal is to become a full-stack developer who can create comprehensive web applications 
                      that solve real-world problems. I'm constantly working on improving my skills and 
                      contributing to the developer community.
                    </p>
                    <div className="w-full h-48 bg-gray-800/50 rounded-lg overflow-hidden">
                      <img
                        src="/images/farrel-3.jpg"
                        alt="Goals"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Skills Widget
function SkillsWidget({ className = "" }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    if (showModal) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [showModal]);

  const techStack = {
    frontend: [
      { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
      { name: "Tailwind CSS", icon: "https://qurtifa.me/icon/tailwind.png" },
      { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
      { name: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
      { name: "CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
      { name: "Vite", icon: "https://vitejs.dev/logo.svg" }
    ],
    backend: [
      { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
      { name: "Express", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
      { name: "MySQL", icon: "https://upload.wikimedia.org/wikipedia/en/d/dd/MySQL_logo.svg" },
      { name: "PHP", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg" },
      { name: "Aiven", icon: "https://rejaka.me/_next/image?url=https%3A%2F%2Faiven.io%2Ffavicons%2Ffavicon-64x64.png&w=128&q=75" }
    ],
    tools: [
      { name: "VS Code", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
      { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
      { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
      { name: "Vercel", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg" },
      { name: "Cloudflare", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cloudflare/cloudflare-original.svg" },
      { name: "WebStorm", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/webstorm/webstorm-original.svg" },
      { name: "Cursor", icon: "https://images.prismic.io/sacra/Z0Sul68jQArT1Sb7_cursorlogo.png" },
    ],
    design: [
      { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
      { name: "Canva", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/canva/canva-original.svg" },
      { name: "Pixellab", icon: "https://i.postimg.cc/Th8DNhtK/pixellab.png" },
      { name: "CapCut", icon: "https://static.vecteezy.com/system/resources/previews/013/948/546/non_2x/capcut-logo-on-transparent-white-background-free-vector.jpg" },
      { name: "Hypic", icon: "https://play-lh.googleusercontent.com/Izb4AbKLUUUeFCvdUjWBnA7OyJZhY4U8Y9vbWTxV203-OAb35JvKEyw8gxoQupPrSfc" },
    ]
  };

  const categories = [
    { id: "all", name: "All" },
    { id: "frontend", name: "Frontend" },
    { id: "backend", name: "Backend" },
    { id: "tools", name: "Tools" },
    { id: "design", name: "Design & Editing" }
  ];

  const getFilteredTech = () => {
    if (selectedCategory === "all") {
      return Object.values(techStack).flat();
    }
    return techStack[selectedCategory] || [];
  };

  return (
    <>
      <BentoCard
        className={`bg-gradient-to-br from-gray-800/30 to-gray-700/30 cursor-pointer ${className}`}
        onClick={() => setShowModal(true)}
      >
        <div className="flex flex-col h-full justify-between">
          <div className="flex items-center mb-2">
            <FaCode className="text-gray-400 text-lg mr-2" />
            <h2 className="text-lg font-bold text-gray-200">Skills</h2>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-800/50">
                <img
                  src="/images/react.png"
                  alt="Skills"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap gap-2">
                  {["React", "Next.js", "Javascript", "Tailwind CSS"].map((tech, i) => (
                    <span key={i} className="px-2 py-1 bg-gray-800/50 rounded-full text-xs text-gray-300">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <p className="text-xs text-gray-400">
              Click to view all skills
            </p>
          </div>
        </div>
      </BentoCard>

      <AnimatePresence>
        {showModal && (
          <motion.div
            className="modal-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowModal(false)}
          >
            <motion.div
              className="modal-content"
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <h2 className="text-2xl font-bold text-gray-200">Skills & Expertise</h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 rounded-full hover:bg-gray-800 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="modal-scrollable">
                <div className="space-y-6">
                  {/* Skills Chart */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-gray-200">Technical Skills</h3>
                    <div className="space-y-3">
                      {[
                        { name: "Graphic Design", level: 90 },
                        { name: "Front End Development", level: 85 },
                        { name: "Video Editing", level: 80 },
                      ].map((skill, index) => (
                        <div key={index} className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-300">{skill.name}</span>
                            <span className="text-gray-400">{skill.level}%</span>
                          </div>
                          <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                            <motion.div
                              className="h-full bg-gray-400 rounded-full"
                              initial={{ width: 0 }}
                              animate={{ width: `${skill.level}%` }}
                              transition={{ duration: 1, delay: index * 0.1 }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tech Stack */}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-200 mb-4">Tech Stack</h3>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {categories.map((category) => (
                        <button
                          key={category.id}
                          onClick={() => setSelectedCategory(category.id)}
                          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                            selectedCategory === category.id
                              ? "bg-gray-700 text-gray-200"
                              : "bg-gray-800/50 text-gray-400 hover:text-gray-200"
                          }`}
                        >
                          {category.name}
                        </button>
                      ))}
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {getFilteredTech().map((tech, index) => (
                        <motion.div
                          key={index}
                          className="bg-gray-800/50 rounded-lg p-4 flex flex-col items-center gap-3 hover:bg-gray-700/50 transition-colors"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <img
                            src={tech.icon}
                            alt={tech.name}
                            className="w-12 h-12 object-contain"
                          />
                          <span className="text-gray-300 text-sm text-center">{tech.name}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Projects Widget
function ProjectsWidget({ className = "" }) {
  const [showModal, setShowModal] = useState(false);
  const [viewMode, setViewMode] = useState("cards");
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    if (showModal) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [showModal]);

  const projects = [
    {
      title: "Twibbon MPLS SMK Negeri 2 Depok Sleman 2024",
      description: "Website alternatif untuk twibbon MPLS Stembayo.",
      image: "/images/twb.png",
      tech: ["HTML", "CSS", "JavaScript"],
      link: "https://twibbon-stembayo.vercel.app/"
    },
    {
      title: "Konest | Koperasi Digital",
      description: "Konest adalah platform koperasi digital untuk sekolah, menyediakan berbagai kebutuhan dengan mudah dan cepat.",
      image: "/images/konest.png",
      tech: ["React", "Tailwind CSS", "Node.js", "Express", "MySQL", "Aiven"],
      link: "http://konest.sijabright.my.id/"
    },
    {
      title: "Free To Use React Links Website",
      description: "This is a simple and modern links website built with React.",
      image: "/images/linkweb.png",
      tech: ["React", "Tailwind CSS"],
      link: "https://github.com/Prozycal/react-links-web"
    },
    {
      title: "IoT Hidroponic Tracker Website",
      description: "IoT Hidroponic Tracker Website adalah website yang digunakan untuk mengontrol hidroponik.",
      image: "/images/hidro.jpg",
      tech: ["PHP", "MySQL", "Arduino"],
      link: "https://github.com/Prozycal/hidroponik-iot"
    }
  ];

  const designs = [
    {
      title: "March 17th HSR GFX",
      image: "/images/anime-2.jpeg",
      category: "Graphic Design"
    },
    {
      title: "Raiden Shogun Interface GFX",
      image: "/images/anime-1.jpg",
      category: "Graphic Design"
    },
    {
      title: "Roblox GFX Commisions #1",
      image: "/images/roblox-1.jpeg",
      category: "Graphic Design"
    },
    {
      title: "Roblox GFX Commisions #2",
      image: "/images/roblox-2.jpeg",
      category: "Graphic Design"
    },
    {
      title: "Avengers Eternity War - Fan Made Poster",
      image: "/images/poster-1.jpg",
      category: "Graphic Design"
    },
    {
      title: "Fha-Fun Milk Mockup Concept",
      image: "/images/mockup.jpg",
      category: "Graphic Design"
    }
  ];

  return (
    <>
      <BentoCard
        className={`bg-gradient-to-br from-gray-800/30 to-gray-700/30 cursor-pointer ${className}`}
        onClick={() => setShowModal(true)}
      >
        <div className="flex flex-col h-full justify-between">
          <div className="flex items-center mb-2">
            <FaLaptopCode className="text-gray-400 text-lg mr-2" />
            <h2 className="text-lg font-bold text-gray-200">Projects</h2>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-800/50">
                <img
                  src="/images/anime-1.jpg"
                  alt="Projects"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="grid grid-cols-2 gap-2">
                  {projects.slice(0, 2).map((project, index) => (
                    <div key={index} className="bg-gray-800/50 rounded-lg p-2">
                      <p className="text-xs text-gray-300 truncate">{project.title}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <p className="text-xs text-gray-400">
              Click to view all projects
            </p>
          </div>
        </div>
      </BentoCard>

      <AnimatePresence>
        {showModal && (
          <motion.div
            className="modal-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowModal(false)}
          >
            <motion.div
              className="modal-content"
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <h2 className="text-2xl font-bold text-gray-200">Projects</h2>
                <div className="flex items-center gap-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setViewMode("cards")}
                      className={`p-2 rounded-lg transition-colors ${
                        viewMode === "cards"
                          ? "bg-gray-700 text-gray-200"
                          : "text-gray-400 hover:text-gray-200"
                      }`}
                    >
                      Webs
                    </button>
                    <button
                      onClick={() => setViewMode("gallery")}
                      className={`p-2 rounded-lg transition-colors ${
                        viewMode === "gallery"
                          ? "bg-gray-700 text-gray-200"
                          : "text-gray-400 hover:text-gray-200"
                      }`}
                    >
                      Gallery
                    </button>
                  </div>
                  <button
                    onClick={() => setShowModal(false)}
                    className="p-2 rounded-full hover:bg-gray-800 transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="modal-scrollable">
                {viewMode === "cards" ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {projects.map((project, index) => (
                      <motion.div
                        key={index}
                        className="bg-gray-800/50 rounded-xl overflow-hidden"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="aspect-video bg-gray-700 relative overflow-hidden">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-4">
                          <h3 className="text-lg font-semibold text-gray-200 mb-2">
                            {project.title}
                          </h3>
                          <p className="text-sm text-gray-400 mb-4">
                            {project.description}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {project.tech.map((tech, i) => (
                              <span
                                key={i}
                                className="px-2 py-1 bg-gray-700 rounded-full text-xs text-gray-300"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-4 inline-block text-sm text-gray-400 hover:text-white transition-colors"
                          >
                            View Project →
                          </a>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {designs.map((design, index) => (
                      <motion.div
                        key={index}
                        className="group relative aspect-square bg-gray-800/50 rounded-xl overflow-hidden cursor-pointer"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ scale: 1.02 }}
                        onClick={() => setPreviewImage(design.image)}
                      >
                        <div className="absolute inset-0">
                          <img
                            src={design.image}
                            alt={design.title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4">
                            <span className="text-white font-medium text-center">{design.title}</span>
                            <span className="text-gray-300 text-sm mt-1">{design.category}</span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Image Preview Modal */}
      <AnimatePresence>
        {previewImage && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPreviewImage(null)}
          >
            <motion.div
              className="relative max-w-[90vw] max-h-[90vh]"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={previewImage}
                alt="Preview"
                className="max-w-full max-h-[90vh] object-contain rounded-lg"
              />
              <button
                onClick={() => setPreviewImage(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Certificates Widget
function CertificatesWidget({ className = "" }) {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (showModal) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [showModal]);

  const certificates = [
    {
      title: "Juara 1 Kompetisi Pahlawan Digital Nasional",
      organization: "PT. ITHO Indostock",
      date: "17 Mei 2024 ",
      image: "/images/ses.jpg"
    },
    {
      title: "Grand Finalis Website SMK - Micro Influencer Competition GSS 2024",
      organization: "Yayasan Sagasitas Indonesia",
      date: "1 Oktober 2024",
      image: "/images/sagasitas.jpeg"
    },
    {
      title: "Belajar Dasar Pemrograman Web",
      organization: "Dicoding Indonesia",
      date: "18 Oktober 2023",
      image: "/images/dicoding.jpg"
    },
    {
      title: "Belajar Dasar Visualisasi Data",
      organization: "Dicoding Indonesia",
      date: "28 Januari 2024",
      image: "/images/dicoding.jpg"
    },
    {
      title: "Memulai Pemrograman dengan Python",
      organization: "Dicoding Indonesia",
      date: "04 Februari 2024",
      image: "/images/dicoding.jpg"
    },
    {
      title: "Belajar Dasar Pemrograman JavaScript",
      organization: "Dicoding Indonesia",
      date: "15 September 2024",
      image: "/images/dicoding.jpg"
    },
    {
      title: "Belajar Membuat Front-End Web untuk Pemula",
      organization: "Dicoding Indonesia",
      date: "15 September 2024",
      image: "/images/dicoding.jpg"
    },
    {
      title: "Belajar Membuat Aplikasi Web dengan React",
      organization: "Dicoding Indonesia",
      date: "21 Desember 2024",
      image: "/images/dicoding.jpg"
    }
  ];

  return (
    <>
      <BentoCard
        className={`bg-gradient-to-br from-gray-800/30 to-gray-700/30 cursor-pointer ${className}`}
        onClick={() => setShowModal(true)}
      >
        <div className="flex flex-col h-full justify-between">
          <div className="flex items-center mb-2">
            <FaCertificate className="text-gray-400 text-lg mr-2" />
            <h2 className="text-lg font-bold text-gray-200">Certificates</h2>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-800/50">
                <img
                  src="/images/dicoding.jpg"
                  alt="Certificates"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="grid grid-cols-2 gap-2">
                  {certificates.slice(0, 2).map((cert, index) => (
                    <div key={index} className="bg-gray-800/50 rounded-lg p-2">
                      <p className="text-xs text-gray-300 truncate">{cert.title}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <p className="text-xs text-gray-400">
              Click to view all certificates
            </p>
          </div>
        </div>
      </BentoCard>

      <AnimatePresence>
        {showModal && (
          <motion.div
            className="modal-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowModal(false)}
          >
            <motion.div
              className="modal-content"
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <h2 className="text-2xl font-bold text-gray-200">Certificates</h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 rounded-full hover:bg-gray-800 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="modal-scrollable">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {certificates.map((cert, index) => (
                    <motion.div
                      key={index}
                      className="bg-gray-800/50 rounded-xl p-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-16 h-16 bg-gray-700 rounded-lg flex-shrink-0">
                          <img
                            src={cert.image}
                            alt={cert.title}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-200 mb-1">
                            {cert.title}
                          </h3>
                          <p className="text-sm text-gray-400 mb-2">
                            {cert.organization}
                          </p>
                          <p className="text-xs text-gray-500">
                            Issued: {cert.date}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Contacts Widget
function ContactsWidget({ className = "" }) {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  useEffect(() => {
    if (showModal) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [showModal]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
    setShowModal(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      <BentoCard
        className={`bg-gradient-to-br from-gray-800/30 to-gray-700/30 cursor-pointer ${className}`}
        onClick={() => setShowModal(true)}
      >
        <div className="flex flex-col h-full justify-between">
          <div className="flex items-center mb-2">
            <FaEnvelope className="text-gray-400 text-lg mr-2" />
            <h2 className="text-lg font-bold text-gray-200">Contact</h2>
          </div>
          <div className="space-y-4">
            <motion.div 
              className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-colors"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <FaEnvelope className="text-gray-400" />
              <span className="text-gray-300">farrelrabbani88@gmail.com</span>
            </motion.div>
          </div>
          <motion.p 
            className="text-xs text-gray-400 mt-4 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Click to send a message
          </motion.p>
        </div>
      </BentoCard>

      <AnimatePresence>
        {showModal && (
          <motion.div
            className="modal-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowModal(false)}
          >
            <motion.div
              className="modal-content"
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <h2 className="text-2xl font-bold text-gray-200">Get in Touch</h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 rounded-full hover:bg-gray-800 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="modal-scrollable">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 text-gray-200"
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 text-gray-200"
                      placeholder="youremail@gmail.com"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="4"
                      className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 text-gray-200 resize-none"
                      placeholder="Your message..."
                      required
                    ></textarea>
                  </div>
                  <motion.button
                    type="submit"
                    className="w-full py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Send Message
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// DateTime Widget
function DateTimeWidget({ currentTime, className = "" }) {
    return (
    <BentoCard className={`bg-gradient-to-br from-gray-800/30 to-gray-700/30 ${className}`}>
      <div className="flex flex-col h-full justify-between">
        <div className="flex items-center mb-2">
          <FaClock className="text-gray-400 text-lg mr-2" />
          <h2 className="text-lg font-bold text-gray-200">Time</h2>
        </div>
        <div className="text-center space-y-2">
          <div className="relative">
            <motion.p 
              className="text-4xl md:text-5xl font-bold text-gray-200 mb-1 font-mono tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {format(currentTime, "HH:mm:ss")}
            </motion.p>
            <div className="absolute -bottom-1 left-1/2 w-16 h-0.5 bg-gradient-to-r from-transparent via-gray-400 to-transparent transform -translate-x-1/2"></div>
          </div>
          <motion.p 
            className="text-sm text-gray-400 font-light tracking-wide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {format(currentTime, "EEEE", { locale: id })}
          </motion.p>
          <motion.p 
            className="text-xs text-gray-500 font-light tracking-wider"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {format(currentTime, "dd MMMM yyyy", { locale: id })}
          </motion.p>
        </div>
      </div>
    </BentoCard>
  );
}

// Quote Widget
function QuoteWidget({ className = "" }) {
  const quotes = [
    "The best way to predict the future is to create it.",
    "Code is like humor. When you have to explain it, it's bad.",
    "Design is not just what it looks like and feels like. Design is how it works.",
    "The only way to do great work is to love what you do.",
    "Innovation distinguishes between a leader and a follower.",
  ];

  const [currentQuote, setCurrentQuote] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <BentoCard className={`bg-gradient-to-br from-gray-800/30 to-gray-700/30 ${className}`}>
      <div className="flex flex-col items-center justify-center h-full text-center py-3">
        <FaQuoteLeft className="text-xl text-gray-400 mb-2" />
        <motion.p
          key={currentQuote}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="italic text-sm text-gray-300"
        >
          "{quotes[currentQuote]}"
        </motion.p>
      </div>
    </BentoCard>
  );
}

// Social Links Widget
function SocialLinksWidget({ className = "" }) {
  const socialLinks = [
    { icon: FaGithub, href: "https://github.com/Prozycal", label: "GitHub" },
    { icon: FaLinkedin, href: "https://www.linkedin.com/in/frrlverse/", label: "LinkedIn" },
    { icon: FaInstagram, href: "https://instagram.com/frrlrbn", label: "Instagram" },
    { icon: FaMoneyBillWaveAlt, href: "https://saweria.co/Prozycal", label: "Saweria" },
  ];

  return (
    <BentoCard className={`bg-gradient-to-br from-gray-800/30 to-gray-700/30 ${className}`}>
      <div className="flex flex-col h-full justify-between">
        <div className="flex items-center mb-2">
          <FaLink className="text-gray-400 text-lg mr-2" />
          <h2 className="text-lg font-bold text-gray-200">Social Links</h2>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {socialLinks.map((social, index) => (
            <motion.a
              key={index}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <social.icon className="text-gray-400" />
              <span className="text-gray-300">{social.label}</span>
            </motion.a>
          ))}
        </div>
      </div>
    </BentoCard>
  );
}

// Blog Widget
function BlogWidget({ className = "" }) {
  return (
    <BentoCard className={`bg-gradient-to-br from-gray-800/30 to-gray-700/30 ${className}`}>
      <div className="flex flex-col h-full justify-between">
        <div className="flex items-center mb-2">
          <FaBook className="text-gray-400 text-lg mr-2" />
          <h2 className="text-lg font-bold text-gray-200">Blog</h2>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-gray-800/30 rounded-full blur-xl"></div>
            <div className="relative">
              <motion.div
                className="text-2xl md:text-3xl font-bold mb-2 bg-gradient-to-r from-gray-200 via-white to-gray-200 bg-clip-text text-transparent"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Under Construction
              </motion.div>
              <motion.div
                className="h-0.5 w-16 mx-auto bg-gradient-to-r from-transparent via-gray-400 to-transparent mb-3"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              ></motion.div>
              <motion.p
                className="text-xs text-gray-400 font-light tracking-wide"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                Something amazing is coming soon
              </motion.p>
            </div>
          </motion.div>
        </div>
      </div>
    </BentoCard>
  );
}

// Loading Screen Component
function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950">
      <div className="text-center">
        <div className="inline-block w-16 h-16 relative">
          <div className="absolute inset-0 rounded-full border-4 border-gray-500/20"></div>
          <div className="absolute inset-0 rounded-full border-4 border-t-gray-400 border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
        </div>
        <p className="mt-4 text-gray-400">‎</p>
      </div>
    </div>
  );
}
