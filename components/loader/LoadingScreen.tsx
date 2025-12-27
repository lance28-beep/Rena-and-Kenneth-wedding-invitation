import React, { useEffect, useState, useMemo } from 'react';
import Image from 'next/image';

interface LoadingScreenProps {
  onComplete: () => void;
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

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [fadeOut, setFadeOut] = useState(false);
  const [progress, setProgress] = useState(0);

  // Generate animated particles
  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      opacity: Math.random() * 0.5 + 0.3,
      color: PINK_COLORS[Math.floor(Math.random() * PINK_COLORS.length)],
    }));
  }, []);

  const [animatedParticles, setAnimatedParticles] = useState<Particle[]>(particles);

  useEffect(() => {
    // Smooth progress animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 45);

    // Animate particles
    const particleInterval = setInterval(() => {
      setAnimatedParticles((prev) =>
        prev.map((particle) => ({
          ...particle,
          x: (particle.x + particle.speedX + 100) % 100,
          y: (particle.y + particle.speedY + 100) % 100,
          opacity: Math.sin(Date.now() / 1000 + particle.id) * 0.3 + 0.5,
        }))
      );
    }, 50);

    // Simulate loading time
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(onComplete, 1000); // Wait for fade out animation
    }, 3000);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
      clearInterval(particleInterval);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center overflow-hidden transition-all duration-1000 ${
        fadeOut ? 'opacity-0 pointer-events-none scale-105' : 'opacity-100 scale-100'
      }`}
    >
      {/* Elegant layered background with pink color scheme */}
      <div className="absolute inset-0">
        {/* Base gradient with pink colors */}
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#BC677C_0%,#E2AAAD_25%,#EBC1CB_50%,#FAEAEA_75%,#FFFFFF_100%)]" />
        
        {/* Radial overlays for depth with pink tones */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,#EBC1CB_0%,transparent_50%)] opacity-60 animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,#E2AAAD_0%,transparent_50%)] opacity-50 animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#FAEAEA_0%,transparent_60%)] opacity-40 animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_30%,#DFB46F_0%,transparent_40%)] opacity-30 animate-pulse" style={{ animationDuration: '7s', animationDelay: '0.5s' }} />
        
        {/* Vignette effect */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(188,103,124,0.2)_100%)]" />
        
        {/* Subtle texture overlay */}
        <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iYSIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVHJhbnNmb3JtPSJyb3RhdGUoNDUpIj48cGF0aCBkPSJNLTEwIDMwaDYwdjJoLTYweiIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIuMDUiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjYSkiLz48L3N2Zz4=')]" />
        
        {/* Soft blur for dreamy effect */}
        <div className="absolute inset-0 backdrop-blur-[2px]" />
      </div>

      {/* Animated Particles */}
      <div className="absolute inset-0 overflow-hidden">
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

      {/* Floating decorative elements with pink colors */}
      <div className="hidden sm:block absolute top-20 left-1/4 w-2 h-2 bg-[#FAEAEA]/40 rounded-full animate-ping" style={{ animationDuration: '3s' }} />
      <div className="hidden sm:block absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-[#EBC1CB]/50 rounded-full animate-ping" style={{ animationDuration: '4s', animationDelay: '1s' }} />
      <div className="hidden sm:block absolute bottom-1/3 left-1/3 w-2.5 h-2.5 bg-[#E2AAAD]/40 rounded-full animate-ping" style={{ animationDuration: '5s', animationDelay: '2s' }} />
      <div className="hidden sm:block absolute top-1/2 right-1/3 w-2 h-2 bg-[#DFB46F]/30 rounded-full animate-ping" style={{ animationDuration: '4.5s', animationDelay: '1.5s' }} />

      <div className="relative flex flex-col items-center justify-center px-4 sm:px-8">
        {/* Main content container with elegant frame */}
        <div className="relative">
          {/* Elegant glow effects with pink colors - responsive sizing */}
          <div className="absolute -inset-12 sm:-inset-20 bg-gradient-radial from-[#FAEAEA]/20 via-[#FAEAEA]/5 to-transparent blur-3xl animate-pulse" style={{ animationDuration: '3s' }} />
          <div className="absolute -inset-10 sm:-inset-16 bg-gradient-radial from-[#EBC1CB]/20 via-[#EBC1CB]/5 to-transparent blur-2xl animate-pulse" style={{ animationDuration: '4s', animationDelay: '0.5s' }} />
          <div className="absolute -inset-8 sm:-inset-12 bg-gradient-radial from-[#E2AAAD]/15 via-[#E2AAAD]/3 to-transparent blur-xl animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }} />
          
          <div className="relative flex items-center justify-center">
            {/* Sophisticated decorative rings with pink colors and staggered animations - responsive sizing */}
            <div className="absolute w-40 sm:w-56 h-40 sm:h-56 rounded-full border border-[#FAEAEA]/20 animate-ping" style={{ animationDuration: '3s' }} />
            <div className="absolute w-36 sm:w-48 h-36 sm:h-48 rounded-full border border-[#FFFFFF]/25 animate-[spin_10s_linear_infinite]" />
            <div className="absolute w-32 sm:w-44 h-32 sm:h-44 rounded-full border-2 border-[#EBC1CB]/40 animate-[spin_15s_linear_infinite]">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 sm:w-2 h-1.5 sm:h-2 bg-[#E2AAAD]/60 rounded-full shadow-[0_0_8px_#E2AAAD]" />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1.5 sm:w-2 h-1.5 sm:h-2 bg-[#E2AAAD]/60 rounded-full shadow-[0_0_8px_#E2AAAD]" />
            </div>
            <div className="absolute w-28 sm:w-40 h-28 sm:h-40 rounded-full border-t-2 border-b-2 border-[#BC677C]/50 animate-[spin_20s_linear_infinite_reverse]" />
            <div className="hidden sm:block absolute w-36 h-36 rounded-full border border-dashed border-[#FAEAEA]/20 animate-[spin_25s_linear_infinite]" />
            <div className="hidden sm:block absolute w-24 h-24 rounded-full border border-[#DFB46F]/30 animate-[spin_12s_linear_infinite_reverse]" />

            {/* Inner glow with pink */}
            <div className="absolute w-24 sm:w-32 h-24 sm:h-32 rounded-full bg-[#EBC1CB]/20 blur-2xl" />

            {/* Monogram Logo - Elegant presentation - responsive sizing */}
            <div className="relative flex flex-col items-center justify-center z-10">
              {/* Logo with sophisticated shadow */}
              <div className="relative w-28 sm:w-40 h-28 sm:h-40 brightness-0 invert">
                <div className="absolute inset-0 blur-xl bg-[#FAEAEA]/40" />
                <Image
                  src="/monogram/newMonogram.png"
                  alt="Kenneth & Rena Monogram"
                  fill
                  className="object-contain drop-shadow-[0_0_25px_#EBC1CB]"
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        {/* Elegant divider with pink colors - responsive */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 mt-8 sm:mt-12 mb-6 sm:mb-8">
          <div className="w-8 sm:w-12 h-px bg-gradient-to-r from-transparent via-[#EBC1CB]/50 to-transparent" />
          <div className="w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full bg-[#E2AAAD]/50 rotate-45" />
          <div className="w-16 sm:w-24 h-px bg-gradient-to-r from-transparent via-[#FAEAEA]/70 to-transparent" />
          <div className="w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full bg-[#E2AAAD]/50 rotate-45" />
          <div className="w-8 sm:w-12 h-px bg-gradient-to-r from-transparent via-[#EBC1CB]/50 to-transparent" />
        </div>

        {/* Content section with refined typography - responsive */}
        <div className="text-center max-w-sm sm:max-w-2xl px-4 sm:px-6">
          {/* Poetic message - responsive text sizing */}
          <p
            className="text-xs sm:text-sm leading-relaxed sm:leading-loose tracking-wide text-[#FFFFFF]/95 mb-4 sm:mb-6 italic"
            style={{ fontFamily: '"Cinzel", serif', fontWeight: 300, textShadow: '0 2px 10px rgba(188,103,124,0.3)' }}
          >
            Please wait a moment while we set the scene,
            <br />
            <span className="text-[#FAEAEA]/90 text-[10px] sm:text-xs">tune the music, and open the doors to celebrate</span>
            <br />
            <span className="text-[#FFFFFF] text-sm sm:text-base not-italic font-normal">love, life, and forever.</span>
          </p>

          {/* Elegant divider with pink colors - responsive */}
          <div className="flex items-center justify-center gap-1.5 sm:gap-2 my-4 sm:my-6">
            <div className="w-6 sm:w-8 h-px bg-[#EBC1CB]/40" />
            <div className="w-0.5 sm:w-1 h-0.5 sm:h-1 rounded-full bg-[#E2AAAD]/50" />
            <div className="w-12 sm:w-16 h-px bg-[#FAEAEA]/50" />
            <div className="w-0.5 sm:w-1 h-0.5 sm:h-1 rounded-full bg-[#E2AAAD]/50" />
            <div className="w-6 sm:w-8 h-px bg-[#EBC1CB]/40" />
          </div>

          {/* Loading text - responsive */}
          <p
            className="text-[10px] sm:text-xs uppercase tracking-[0.3em] sm:tracking-[0.4em] text-[#FFFFFF] mb-2 sm:mb-3 animate-pulse"
            style={{ fontFamily: '"Cinzel", serif', fontWeight: 600, animationDuration: '2s', textShadow: '0 2px 8px rgba(188,103,124,0.4)' }}
          >
            Loading Invitation
          </p>

          {/* Couple names - responsive */}
          <p
            className="text-base sm:text-xl tracking-[0.12em] sm:tracking-[0.15em] text-[#FAEAEA] mb-4 sm:mb-6"
            style={{ fontFamily: '"Cinzel", serif', fontWeight: 400, textShadow: '0 2px 10px rgba(188,103,124,0.3)' }}
          >
            Kenneth & Rena
          </p>

          {/* Elegant progress bar with pink gradient - responsive */}
          <div className="relative w-48 sm:w-64 h-1 mx-auto bg-[#BC677C]/30 rounded-full overflow-hidden backdrop-blur-sm">
            <div 
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#E2AAAD] via-[#EBC1CB] to-[#FAEAEA] transition-all duration-300 ease-out rounded-full shadow-[0_0_15px_#EBC1CB,0_0_25px_#E2AAAD]"
              style={{ width: `${progress}%` }}
            />
          </div>
          
          {/* Progress percentage - responsive */}
          <p
            className="text-[9px] sm:text-[10px] tracking-[0.2em] text-[#EBC1CB]/70 mt-2 sm:mt-3"
            style={{ fontFamily: '"Cinzel", serif', fontWeight: 300 }}
          >
            {progress}%
          </p>
        </div>
      </div>

      {/* Elegant fade overlay for transition with pink tint */}
      <div className={`absolute inset-0 bg-[#FAEAEA] transition-opacity duration-700 pointer-events-none ${fadeOut ? 'opacity-10' : 'opacity-0'}`} />
    </div>
  );
};