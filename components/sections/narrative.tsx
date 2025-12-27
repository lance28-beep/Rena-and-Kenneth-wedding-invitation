"use client"

import { useState, useEffect } from "react"
import { Section } from "@/components/section"
import { siteConfig } from "@/content/site"
import Stack from "@/components/stack"
import { motion } from "motion/react"
import { Cormorant_Garamond } from "next/font/google"

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
})

const storyTabs = [
  { id: "groom", label: "Kenneth's Story", subtitle: "His side of forever" },
  { id: "bride", label: "Rena's Story", subtitle: "Her side of forever" },
] as const

type StoryTabId = (typeof storyTabs)[number]["id"]

export function Narrative() {
  const [activeStory, setActiveStory] = useState<StoryTabId>("groom")
  const [cardDimensions, setCardDimensions] = useState({ width: 240, height: 280 })
  
  // Check if shared narrative exists
  const hasSharedNarrative = !!siteConfig.narratives?.shared
  // Use shared narrative if available, otherwise use the individual story
  const narrativeText = siteConfig.narratives?.shared || siteConfig.narratives?.[activeStory] || ""
  const storyParagraphs = narrativeText
    .trim()
    .split(/\n\s*\n/)
    .filter(Boolean)

  // Adjust card dimensions for mobile
  useEffect(() => {
    const updateCardDimensions = () => {
      if (window.innerWidth < 640) {
        // Mobile (iPhone SE: 320px)
        setCardDimensions({ width: 180, height: 220 })
      } else if (window.innerWidth < 768) {
        // Small tablets
        setCardDimensions({ width: 200, height: 240 })
      } else {
        // Desktop
        setCardDimensions({ width: 240, height: 280 })
      }
    }

    updateCardDimensions()
    window.addEventListener('resize', updateCardDimensions)
    return () => window.removeEventListener('resize', updateCardDimensions)
  }, [])

  return (
    <Section
      id="narrative"
      className="relative py-8 sm:py-10 md:py-14 lg:py-18 xl:py-20 overflow-hidden bg-gradient-to-br from-[#BC677C] via-[#E2AAAD] to-[#EBC1CB]"
    >
      {/* Background elements with Pink motif */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Background image */}
        <img
          src="/Details/background.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        
        {/* Vertical pink gradients to frame the story */}
        <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-[#BC677C]/90 via-[#E2AAAD]/78 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-[#BC677C]/88 via-[#EBC1CB]/70 to-transparent" />
        {/* Soft radial light in pink */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(235,193,203,0.42),transparent_55%)] opacity-90" />
        {/* Subtle diagonal wash of pink */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#EBC1CB]/30 via-transparent to-[#E2AAAD]/24 mix-blend-soft-light" />
        
        {/* Floating decorative circles with pink colors */}
        <div className="absolute top-6 left-8 w-32 h-32 bg-[#EBC1CB]/26 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute top-16 right-12 w-24 h-24 bg-[#E2AAAD]/26 rounded-full blur-2xl animate-pulse-slow" style={{ animationDelay: "1s" }} />
        <div className="absolute bottom-20 left-16 w-28 h-28 bg-[#FAEAEA]/22 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "2s" }} />
        <div className="absolute bottom-10 right-10 w-20 h-20 bg-[#EBC1CB]/26 rounded-full blur-2xl animate-pulse-slow" style={{ animationDelay: "0.5s" }} />
      </div>

      <div className="relative z-30 max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
        {/* Section Title */}
        <motion.div 
          className="text-center mb-4 sm:mb-6 md:mb-8 lg:mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="space-y-1 sm:space-y-2 md:space-y-3">
            <p
              className={`${cormorant.className} text-[0.65rem] sm:text-xs md:text-sm uppercase tracking-[0.24em] sm:tracking-[0.28em] text-white`}
              style={{ textShadow: "0 2px 10px rgba(0,0,0,0.75)" }}
            >
              Our Journey Together
            </p>
            <h2
              className="style-script-regular text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-white"
              style={{ textShadow: "0 4px 18px rgba(0,0,0,0.85)" }}
            >
              A Love Story Written in Time
            </h2>
            <p
              className={`${cormorant.className} text-[0.7rem] sm:text-xs md:text-sm lg:text-base text-white/95 font-light max-w-xl mx-auto leading-relaxed px-1 sm:px-2`}
            >
              From the first message to forever, discover how {siteConfig.couple.groomNickname} & {siteConfig.couple.brideNickname} found their way to each other
            </p>

            {/* Decorative flourish */}
            <div className="flex items-center justify-center gap-2 sm:gap-3 pt-0.5 sm:pt-1">
              <div className="w-6 sm:w-8 md:w-12 h-px bg-gradient-to-r from-transparent via-[#EBC1CB]/80 to-transparent" />
              <motion.div
                animate={{ scale: [1, 1.15, 1], rotate: [0, 8, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white/90" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
              </motion.div>
              <div className="w-6 sm:w-8 md:w-12 h-px bg-gradient-to-l from-transparent via-[#EBC1CB]/80 to-transparent" />
            </div>
          </div>
        </motion.div>

        {/* Main Content - Centered Layout */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-10 items-center lg:items-start"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Left Spacer */}
          <div className="hidden lg:block"></div>

          {/* Interactive Stack Component - Center */}
          <div className="flex justify-center">
            <div className="relative">
              {/* Enhanced glow effect with Pink motif */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#EBC1CB]/35 via-[#E2AAAD]/24 to-[#BC677C]/32 rounded-full blur-3xl -z-10 w-full h-full max-w-sm animate-pulse" />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#BC677C]/30 via-transparent to-[#EBC1CB]/26 rounded-full blur-2xl -z-10 w-full h-full max-w-sm" />
              <div className="absolute inset-0 bg-gradient-to-bl from-[#EBC1CB]/24 via-transparent to-[#E2AAAD]/22 rounded-full blur-xl -z-10 w-full h-full max-w-sm" />

              <Stack
                randomRotation={true}
                sensitivity={180}
                sendToBackOnClick={false}
                cardDimensions={cardDimensions}
                cardsData={[
                  { id: 1, img: "/mobile-background/couple (1).JPG" },
                  { id: 2, img: "/mobile-background/couple (2).JPG" },
                  { id: 3, img: "/mobile-background/couple (7).JPG" },
                  { id: 4, img: "/mobile-background/couple (4).JPG" },
                  { id: 5, img: "/mobile-background/couple (5).JPG" },
                  { id: 6, img: "/mobile-background/couple (6).JPG" },

                ]}
                animationConfig={{ stiffness: 260, damping: 20 }}
              />

              <motion.p 
                className="text-center text-[0.65rem] sm:text-xs md:text-sm text-white mt-2 sm:mt-3 md:mt-4 font-sans font-medium tracking-wide"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1 }}
              >
                <span className="text-[#FAEAEA]">✨</span> Drag to explore our moments <span className="text-[#FAEAEA]">✨</span>
              </motion.p>
            </div>
          </div>

          {/* Right Spacer */}
          <div className="hidden lg:block"></div>
        </motion.div>

        {/* Story Text + Tabs */}
        <motion.div 
          className="mt-6 sm:mt-8 md:mt-10 lg:mt-16 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="flex flex-col items-center text-center gap-2 sm:gap-3 md:gap-5 mb-4 sm:mb-6 md:mb-8 lg:mb-12">
            <p className={`${cormorant.className} text-[0.65rem] sm:text-[0.7rem] md:text-xs lg:text-sm text-white tracking-[0.14em] sm:tracking-[0.16em] uppercase`}>
              {hasSharedNarrative ? "Our Beautiful Beginning" : "Two Hearts, One Journey"}
            </p>
            {/* Tabs - only show if no shared narrative */}
            {!hasSharedNarrative && (
              <div className="relative inline-flex flex-wrap items-center justify-center gap-x-1 gap-y-1 sm:gap-x-1.5 sm:gap-y-1.5 md:gap-x-2 md:gap-y-1 rounded-full border border-[#EBC1CB]/30 bg-white/40 backdrop-blur-sm px-1 sm:px-1.5 py-1 sm:py-1.5 max-w-full shadow-[0_12px_40px_rgba(188,103,124,0.12)]">
                {storyTabs.map((tab) => {
                  const isActive = tab.id === activeStory
                  return (
                    <motion.button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveStory(tab.id)}
                      className={`relative px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 rounded-full text-[0.65rem] sm:text-[0.7rem] md:text-xs lg:text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#EBC1CB] focus-visible:ring-offset-white/40 ${
                        isActive
                          ? "bg-[#BC677C] text-white shadow-xl shadow-[#EBC1CB]/25 border border-[#EBC1CB]/70"
                          : "text-gray-800/80 hover:text-gray-900 border border-transparent"
                      }`}
                      aria-pressed={isActive}
                      aria-controls="story-panel"
                      whileTap={{ scale: 0.96 }}
                    >
                      <span className="block leading-snug">{tab.label}</span>
                      <span className="text-[0.5rem] sm:text-[0.55rem] md:text-[0.6rem] uppercase tracking-[0.14em] sm:tracking-[0.16em] font-normal text-gray-800/80">
                        {tab.subtitle}
                      </span>
                    </motion.button>
                  )
                })}
              </div>
            )}
          </div>

          <div className="relative bg-white/60 sm:bg-white/65 md:bg-white/70 backdrop-blur-lg border border-[#EBC1CB]/50 rounded-lg sm:rounded-xl md:rounded-2xl shadow-[0_20px_60px_rgba(188,103,124,0.3)] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#EBC1CB]/15 via-transparent to-[#BC677C]/8 pointer-events-none" />
            <div className="absolute inset-0 bg-white/20 backdrop-blur-sm pointer-events-none" />
            
            <div id="story-panel" className="relative p-3 sm:p-4 md:p-6 lg:p-8 xl:p-10 space-y-2.5 sm:space-y-3 md:space-y-4 lg:space-y-6" aria-live="polite">
              {storyParagraphs.map((paragraph, index) => (
                <motion.div 
                  key={index} 
                  className="relative"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                >
                  {/* First paragraph with drop cap */}
                  {index === 0 ? (
                    <p className="text-xs sm:text-sm md:text-base leading-relaxed text-gray-800 text-pretty font-sans font-light pl-2 sm:pl-3 md:pl-4 lg:pl-6">
                      <span className="float-left text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-serif font-bold text-[#BC677C] leading-none mr-1.5 sm:mr-2 mt-0.5 sm:mt-1 drop-shadow-[0_4px_16px_rgba(188,103,124,0.25)]">
                        {paragraph.charAt(0)}
                      </span>
                      {paragraph.slice(1)}
                    </p>
                  ) : (
                    <p className="text-xs sm:text-sm md:text-base leading-relaxed text-gray-800 text-pretty font-sans font-light pl-2 sm:pl-3 md:pl-4 lg:pl-6">
                      {paragraph}
                    </p>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Divider and CTA */}
          <motion.div 
            className="mt-6 sm:mt-8 md:mt-10 lg:mt-14 space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {/* Decorative divider with Pink motif */}
            <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#EBC1CB]/70 to-[#E2AAAD]/65" />
              <motion.div
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-5 md:h-5 text-[#EBC1CB]/85" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-5c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"/>
                </svg>
              </motion.div>
              <div className="flex-1 h-px bg-gradient-to-l from-transparent via-[#EBC1CB]/70 to-[#E2AAAD]/65" />
            </div>

            {/* Enhanced CTA Button with pink motif */}
            <div className="flex justify-center">
              <motion.a
                href="#guest-list"
                className="group relative w-full sm:w-auto px-4 sm:px-6 md:px-10 lg:px-12 py-3 sm:py-4 md:py-5 lg:py-6 text-white font-sans font-bold text-xs sm:text-sm md:text-base lg:text-lg rounded-[1.5rem] sm:rounded-[2rem] transition-all duration-500 text-center overflow-hidden shadow-xl hover:shadow-2xl border-2 border-[#EBC1CB] hover:border-[#E2AAAD]"
                style={{ 
                  backgroundImage: "linear-gradient(135deg, #BC677C, #E2AAAD)",
                  boxShadow: "0 10px 40px rgba(188,103,124,0.35), 0 4px 12px rgba(226,170,173,0.45)"
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.98 }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundImage = "linear-gradient(135deg, #E2AAAD, #EBC1CB)";
                  e.currentTarget.style.boxShadow = "0 16px 55px rgba(188,103,124,0.45), 0 6px 18px rgba(235,193,203,0.6)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundImage = "linear-gradient(135deg, #BC677C, #E2AAAD)";
                  e.currentTarget.style.boxShadow = "0 10px 40px rgba(188,103,124,0.35), 0 4px 12px rgba(226,170,173,0.45)";
                }}
              >
                {/* Pulsing glow effect with pink accent */}
                <motion.div 
                  className="absolute inset-0 bg-[#EBC1CB]/40 rounded-[2rem] blur-2xl"
                  animate={{
                    opacity: [0.4, 0.7, 0.4],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                {/* Secondary glow with soft pink accent */}
                <motion.div 
                  className="absolute inset-0 bg-[#E2AAAD]/26 rounded-[2rem] blur-xl"
                  animate={{
                    opacity: [0.2, 0.4, 0.2],
                    scale: [1, 1.15, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5,
                  }}
                />
                
                {/* Enhanced gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/10 to-transparent rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Double shimmer effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/25 to-transparent"></div>
                <div className="absolute inset-0 translate-x-full group-hover:-translate-x-full transition-transform duration-1200 delay-200 bg-gradient-to-l from-transparent via-white/15 to-transparent"></div>
                
                {/* Enhanced sparkle effects */}
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      top: `${20 + i * 15}%`,
                      left: `${10 + (i % 3) * 40}%`,
                    }}
                    animate={{
                      scale: [0, 1.2, 1],
                      rotate: [0, 180, 360],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    delay: i * 0.28,
                      ease: "easeInOut",
                    }}
                  >
                    <svg className="w-3 h-3 text-white/70" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                    </svg>
                  </motion.div>
                ))}
                
                {/* Animated gradient border */}
                <div className="absolute inset-0 rounded-[2rem] border-2 border-white/10 group-hover:border-[#EBC1CB]/60 transition-all duration-500"></div>
                <motion.div 
                  className="absolute inset-0 rounded-[2rem] border-2 border-white/25"
                  animate={{
                    opacity: [0.2, 0.5, 0.2],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                
                {/* Decorative waves on hover */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  initial={{ y: 0 }}
                  animate={{
                    y: [0, -5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <svg className="w-full h-full" fill="none" viewBox="0 0 400 100" preserveAspectRatio="none">
                    <path d="M0,50 Q100,20 200,50 T400,50 L400,100 L0,100 Z" fill="white" opacity="0.1"/>
                  </svg>
                </motion.div>
                
                {/* Button content */}
                <span className="relative z-10 tracking-wide uppercase inline-flex items-center gap-3 font-bold text-white">
                  Join Our Celebration
                  <motion.svg 
                    className="w-5 h-5 md:w-6 md:h-6 text-white" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    animate={{
                      x: [0, 4, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </motion.svg>
                </span>
                
                {/* Enhanced decorative corner ornaments */}
                <motion.div 
                  className="absolute top-2 left-2 w-2 h-2 bg-white/50 rounded-full opacity-0 group-hover:opacity-100"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: [0, 1.5, 1] }}
                  transition={{ duration: 0.5 }}
                />
                <motion.div 
                  className="absolute top-2 right-2 w-2 h-2 bg-white/50 rounded-full opacity-0 group-hover:opacity-100"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: [0, 1.5, 1] }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                />
                <motion.div 
                  className="absolute bottom-2 left-2 w-2 h-2 bg-white/50 rounded-full opacity-0 group-hover:opacity-100"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: [0, 1.5, 1] }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                />
                <motion.div 
                  className="absolute bottom-2 right-2 w-2 h-2 bg-white/50 rounded-full opacity-0 group-hover:opacity-100"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: [0, 1.5, 1] }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                />
              </motion.a>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </Section>
  )
}
