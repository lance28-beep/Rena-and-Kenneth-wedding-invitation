import React, { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { FadeIn } from './FadeIn';

interface HeroProps {
  onOpen: () => void;
  visible: boolean;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  color: string;
}

// Pink color palette
const PINK_COLORS = ['#BC677C', '#E2AAAD', '#EBC1CB', '#FAEAEA', '#FFFFFF', '#DFB46F'];

const desktopImages: string[] = [
  ' /desktop-background/couple (1).JPG',
  '/desktop-background/couple (2).JPG',
  '/desktop-background/couple (3).JPG',
  '/desktop-background/couple (4).JPG',
  '/desktop-background/couple (5).JPG',
];

const mobileImages: string[] = [
  '/mobile-background/couple (1).JPG',
  '/mobile-background/couple (2).JPG',
  '/mobile-background/couple (3).JPG',
  '/mobile-background/couple (6).JPG',
  '/mobile-background/couple (7).JPG',
];

export const Hero: React.FC<HeroProps> = ({ onOpen, visible }) => {
  const [index, setIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Generate animated particles
  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 5 + 2,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: (Math.random() - 0.5) * 0.4,
      opacity: Math.random() * 0.4 + 0.2,
      color: PINK_COLORS[Math.floor(Math.random() * PINK_COLORS.length)],
    }));
  }, []);

  const [animatedParticles, setAnimatedParticles] = useState<Particle[]>(particles);

  useEffect(() => {
    setMounted(true);
    if (typeof window === 'undefined') return;

    const media = window.matchMedia('(max-width: 768px)');
    const handleChange = () => setIsMobile(media.matches);
    handleChange();
    media.addEventListener('change', handleChange);
    return () => media.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % 5);
    }, 5500);
    return () => clearInterval(timer);
  }, [mounted]);

  useEffect(() => {
    if (!visible) return;
    
    // Animate particles
    const particleInterval = setInterval(() => {
      setAnimatedParticles((prev) =>
        prev.map((particle) => ({
          ...particle,
          x: (particle.x + particle.speedX + 100) % 100,
          y: (particle.y + particle.speedY + 100) % 100,
          opacity: Math.sin(Date.now() / 1000 + particle.id) * 0.2 + 0.4,
        }))
      );
    }, 50);

    return () => clearInterval(particleInterval);
  }, [visible]);


  const images = useMemo(() => (isMobile ? mobileImages : desktopImages), [isMobile]);

  return (
    <div className={`fixed inset-0 z-30 flex items-center justify-center overflow-hidden transition-all duration-1000 ${visible ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
      {/* Background Image Carousel */}
      <div className="absolute inset-0 z-0">
        {images.map((src, i) => (
          <img
            key={src}
            src={src}
            alt="Couple"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${i === index ? 'opacity-90' : 'opacity-0'}`}
          />
        ))}

        {/* Soft overlay tint with pink gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#BC677C]/40 via-[#E2AAAD]/35 to-[#EBC1CB]/40 pointer-events-none" />
        <div className="absolute inset-0 bg-[#BC677C]/25 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(188,103,124,0.15)_100%)] pointer-events-none" />

      </div>

      {/* Animated Particles */}
      {visible && (
        <div className="absolute inset-0 overflow-hidden z-[1]">
          {animatedParticles.map((particle) => (
            <div
              key={particle.id}
              className="absolute rounded-full transition-all duration-300 ease-out"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                backgroundColor: particle.color,
                opacity: particle.opacity,
                boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
                transform: `translate(-50%, -50%)`,
              }}
            />
          ))}
        </div>
      )}

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center text-center p-6 w-full max-w-md mx-auto h-full">
        
        {/* Top Logo/Monogram */}
        <FadeIn show={visible} delay={300} className="mb-auto mt-8">
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-[#EBC1CB]/60 flex items-center justify-center backdrop-blur-md bg-[#BC677C]/30 shadow-lg shadow-[#E2AAAD]/20">
            {/* Monogram Image - White version */}
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 brightness-0 invert">
              <Image
                src="/monogram/newMonogram.png"
                alt="Kenneth & Rena Monogram"
                fill
                className="object-contain drop-shadow-[0_0_15px_#EBC1CB]"
                priority
              />
            </div>
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-full bg-[#EBC1CB]/20 blur-xl animate-pulse" style={{ animationDuration: '3s' }} />
          </div>
        </FadeIn>

        <div className="flex-1" />

        <div className="flex flex-col items-center justify-end w-full gap-4 pb-14 sm:pb-16 md:pb-20">
          <FadeIn show={visible} delay={600}>
          <h2
            className="text-6xl md:text-8xl text-white transform -rotate-6 drop-shadow-lg opacity-95"
            style={{
              fontFamily: '"Great Vibes", cursive',
              fontWeight: 400,
              textShadow: '0 6px 18px rgba(188,103,124,0.4), 0 0 12px rgba(235,193,203,0.5)',
            }}
          >
            You are
          </h2>
          </FadeIn>
          
          <FadeIn show={visible} delay={900}>
          <h1
            className="text-5xl md:text-7xl text-white font-bold tracking-wider uppercase drop-shadow-[0_10px_24px_rgba(188,103,124,0.4)]"
            style={{
              fontFamily: '"Cinzel", serif',
              fontWeight: 700,
              textShadow: '0 8px 22px rgba(188,103,124,0.45), 0 0 14px rgba(235,193,203,0.4)',
            }}
          >
            Invited!
          </h1>
          </FadeIn>

          <FadeIn show={visible} delay={1500}>
          <button 
            onClick={() => {
              onOpen();
            }}
            className="group relative px-10 py-4 bg-gradient-to-r from-[#BC677C] via-[#E2AAAD] to-[#BC677C] text-white font-serif text-sm tracking-[0.2em] uppercase transition-all duration-500 hover:from-[#E2AAAD] hover:via-[#EBC1CB] hover:to-[#E2AAAD] shadow-lg hover:shadow-2xl hover:shadow-[#EBC1CB]/50 hover:-translate-y-1 active:translate-y-0 rounded-sm overflow-hidden border border-[#EBC1CB]/40"
          >
            <span
              className="relative z-10 text-white drop-shadow-md"
              style={{ fontFamily: '"Cinzel", serif', fontWeight: 500 }}
            >
              Open Invitation
            </span>
            {/* Button sheen effect */}
            <div className="absolute top-0 left-[-100%] w-full h-full bg-white/20 skew-x-12 group-hover:animate-[shimmer_1s_infinite]" />
            {/* Button glow effect */}
            <div className="absolute inset-0 bg-[#EBC1CB]/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </button>
          </FadeIn>
        </div>

        {/* Bottom Spacer */}
        <div className="h-4" />
      </div>
    </div>
  );
};