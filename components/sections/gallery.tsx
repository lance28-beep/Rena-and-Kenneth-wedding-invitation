"use client"

import { useState, useEffect, useCallback } from "react"
import NextImage from "next/image"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { Section } from "@/components/section"
import { motion } from "motion/react"
import { Cormorant_Garamond, WindSong } from "next/font/google"
import { siteConfig } from "@/content/site"
// Removed circular gallery in favor of a responsive masonry layout

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
})

const windSong = WindSong({
  subsets: ["latin"],
  weight: "400",
})

const galleryHashtag = "#KennethAndRenaWedding"

const galleryItems = [
  { image: "/mobile-background/couple (1).JPG", text: " " },  
  { image: "/mobile-background/couple (2).JPG", text: " " },
  { image: "/mobile-background/couple (3).JPG", text: " " },
  { image: "/mobile-background/couple (5).JPG", text: " " },
  { image: "/mobile-background/couple (6).JPG", text: " " },
  { image: "/desktop-background/couple (5).JPG", text: " " },

]

export function Gallery() {
  const { brideNickname, groomNickname } = siteConfig.couple
  const coupleDisplayName = `${brideNickname} & ${groomNickname}`
  const [selectedImage, setSelectedImage] = useState<(typeof galleryItems)[0] | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  // reserved for potential skeleton tracking; not used after fade-in simplification
  const [touchStartX, setTouchStartX] = useState<number | null>(null)
  const [touchDeltaX, setTouchDeltaX] = useState(0)
  const [zoomScale, setZoomScale] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [pinchStartDist, setPinchStartDist] = useState<number | null>(null)
  const [pinchStartScale, setPinchStartScale] = useState(1)
  const [lastTap, setLastTap] = useState(0)
  const [panStart, setPanStart] = useState<{ x: number; y: number; panX: number; panY: number } | null>(null)

  useEffect(() => {
    // Simulate loading for better UX
    const timer = setTimeout(() => setIsLoading(false), 500)
    return () => clearTimeout(timer)
  }, [])

  const navigateImage = useCallback((direction: 'prev' | 'next') => {
    setCurrentIndex((prevIndex) => {
      let newIndex = prevIndex
      if (direction === 'next') {
        newIndex = (prevIndex + 1) % galleryItems.length
      } else {
        newIndex = (prevIndex - 1 + galleryItems.length) % galleryItems.length
      }
      setSelectedImage(galleryItems[newIndex])
      return newIndex
    })
  }, [])

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!selectedImage) return
      if (e.key === 'ArrowLeft') navigateImage('prev')
      if (e.key === 'ArrowRight') navigateImage('next')
      if (e.key === 'Escape') setSelectedImage(null)
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [selectedImage, currentIndex, navigateImage])

  // Prevent background scroll when lightbox is open
  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [selectedImage])

  // Preload adjacent images for smoother nav
  useEffect(() => {
    if (selectedImage) {
      if (typeof window !== "undefined") {
        const nextImg = new window.Image()
        nextImg.src = galleryItems[(currentIndex + 1) % galleryItems.length].image
        const prevImg = new window.Image()
        prevImg.src = galleryItems[(currentIndex - 1 + galleryItems.length) % galleryItems.length].image
      }
    }
  }, [selectedImage, currentIndex])

  const clamp = (val: number, min: number, max: number) => Math.min(max, Math.max(min, val))
  const resetZoom = () => {
    setZoomScale(1)
    setPan({ x: 0, y: 0 })
    setPanStart(null)
  }

  return (
    <Section
      id="gallery"
      className="relative bg-[#BC677C] py-10 sm:py-12 md:py-16 lg:py-20 overflow-hidden"
    >
      {/* Background image and decorative overlays */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Background image */}
        <img
          src="/Details/background.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />

        {/* Pink gradients */}
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-[#BC677C]/90 via-[#E2AAAD]/70 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#EBC1CB]/95 via-[#FAEAEA]/70 to-transparent" />
        {/* Pink radial spotlight */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(235,193,203,0.3),transparent_55%)] opacity-90" />

        {/* Floating decorative circles with pink colors */}
        <div className="absolute top-6 left-8 w-32 h-32 bg-[#EBC1CB]/26 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute top-16 right-12 w-24 h-24 bg-[#E2AAAD]/26 rounded-full blur-2xl animate-pulse-slow" style={{ animationDelay: "1s" }} />
        <div className="absolute bottom-20 left-16 w-28 h-28 bg-[#FAEAEA]/22 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "2s" }} />
        <div className="absolute bottom-10 right-10 w-20 h-20 bg-[#D2B48C]/26 rounded-full blur-2xl animate-pulse-slow" style={{ animationDelay: "0.5s" }} />
      </div>

      {/* Header */}
      <div className="relative z-10 text-center mb-8 sm:mb-10 md:mb-12 px-4">
        <div className="space-y-2 sm:space-y-3">
          <p
            className={`${cormorant.className} text-[0.7rem] sm:text-xs md:text-sm uppercase tracking-[0.28em] text-white`}
            style={{ textShadow: "0 2px 10px rgba(0,0,0,0.75)" }}
          >
            Cherished Moments with {coupleDisplayName}
          </p>
          <h2
            className="style-script-regular text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white"
            style={{ textShadow: "0 4px 18px rgba(0,0,0,0.9)" }}
          >
            Our Love Story in Pictures
          </h2>
        </div>

        <p className={`${cormorant.className} text-xs sm:text-sm md:text-base text-white/95 font-light max-w-xl mx-auto leading-relaxed mt-3`}>
          Beautiful frames capturing the journey of Kenneth and Rena — each photograph a precious memory of laughter, love, and the moments that led us to forever.
        </p>

        <div className="flex items-center justify-center gap-2 mt-6">
          <div className="w-8 sm:w-12 h-px bg-gradient-to-r from-transparent via-[#EBC1CB]/80 to-transparent" />
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-white/80"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <div className="w-8 sm:w-12 h-px bg-gradient-to-l from-transparent via-[#EBC1CB]/80 to-transparent" />
        </div>
      </div>

      {/* Gallery content */}
      <div className="relative z-10 w-full">
        <div className="flex justify-center px-4 sm:px-5 md:px-6">
          <div className="max-w-5xl w-full">
            {isLoading ? (
              <div className="flex items-center justify-center h-48 sm:h-60 md:h-72">
                <div className="w-10 h-10 border-[3px] border-[#FAEAEA]/40 border-t-[#BC677C] rounded-full animate-spin" />
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3.5 md:gap-4.5">
                {galleryItems.map((item, index) => (
                  <motion.button
                    key={item.image + index}
                    type="button"
                    className="group relative w-full overflow-hidden rounded-lg sm:rounded-xl bg-white/5 backdrop-blur-lg border border-white/15 shadow-lg hover:shadow-xl hover:border-white/40 transition-all duration-300"
                    onClick={() => {
                      setSelectedImage(item)
                      setCurrentIndex(index)
                    }}
                    aria-label={`Open image ${index + 1}`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    {/* Subtle glow on hover with pink motif */}
                    <div className="absolute -inset-0.5 bg-gradient-to-br from-[#EBC1CB]/45 via-[#E2AAAD]/28 to-[#FAEAEA]/20 rounded-lg sm:rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
                    
                    <div className="relative aspect-[3/4] md:aspect-square overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.text || `Gallery image ${index + 1}`}
                        loading="lazy"
                        decoding="async"
                        sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      {/* Gradient overlay on hover with pink motif colors */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    
                    {/* Image counter badge with pink motif colors */}
                    <div className="absolute top-2 right-2 bg-[#BC677C]/90 backdrop-blur-sm rounded-full px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-[#EBC1CB]/70">
                      <span className="text-xs font-medium text-white tracking-wide">
                        {index + 1}/{galleryItems.length}
                      </span>
                    </div>
                  </motion.button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Lightbox Modal - Compact for iPhone SE */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-sm flex items-center justify-center p-1 sm:p-2 md:p-4"
          onClick={() => {
            setSelectedImage(null)
            resetZoom()
          }}
        >
            <div
              className="relative max-w-6xl w-full h-full sm:h-auto flex flex-col items-center justify-center"
              onTouchStart={(e) => {
                if (e.touches.length === 1) {
                  const now = Date.now()
                  if (now - lastTap < 300) {
                    setZoomScale((s) => (s > 1 ? 1 : 2))
                    setPan({ x: 0, y: 0 })
                  }
                  setLastTap(now)
                  const t = e.touches[0]
                  setTouchStartX(t.clientX)
                  setTouchDeltaX(0)
                  if (zoomScale > 1) {
                    setPanStart({ x: t.clientX, y: t.clientY, panX: pan.x, panY: pan.y })
                  }
                }
                if (e.touches.length === 2) {
                  const dx = e.touches[0].clientX - e.touches[1].clientX
                  const dy = e.touches[0].clientY - e.touches[1].clientY
                  const dist = Math.hypot(dx, dy)
                  setPinchStartDist(dist)
                  setPinchStartScale(zoomScale)
                }
              }}
              onTouchMove={(e) => {
                if (e.touches.length === 2 && pinchStartDist) {
                  const dx = e.touches[0].clientX - e.touches[1].clientX
                  const dy = e.touches[0].clientY - e.touches[1].clientY
                  const dist = Math.hypot(dx, dy)
                  const scale = clamp((dist / pinchStartDist) * pinchStartScale, 1, 3)
                  setZoomScale(scale)
                } else if (e.touches.length === 1) {
                  const t = e.touches[0]
                  if (zoomScale > 1 && panStart) {
                    const dx = t.clientX - panStart.x
                    const dy = t.clientY - panStart.y
                    setPan({ x: panStart.panX + dx, y: panStart.panY + dy })
                  } else if (touchStartX !== null) {
                    setTouchDeltaX(t.clientX - touchStartX)
                  }
                }
              }}
              onTouchEnd={() => {
                setPinchStartDist(null)
                setPanStart(null)
                if (zoomScale === 1 && Math.abs(touchDeltaX) > 50) {
                  navigateImage(touchDeltaX > 0 ? 'prev' : 'next')
                }
                setTouchStartX(null)
                setTouchDeltaX(0)
              }}
            >
            {/* Top bar with counter and close - Compact for iPhone SE */}
            <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between p-2 sm:p-3 md:p-4 lg:p-6">
              {/* Image counter - Smaller on mobile */}
              <div className="bg-black/50 backdrop-blur-md rounded-full px-2.5 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-2 border border-white/20">
                <span className="text-xs sm:text-sm md:text-base font-medium text-white">
                  {currentIndex + 1} / {galleryItems.length}
                </span>
              </div>
              
              {/* Close button - Compact but touch-friendly */}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setSelectedImage(null)
                  resetZoom()
                }}
                className="bg-black/50 hover:bg-black/70 active:bg-black/80 backdrop-blur-md rounded-full p-1.5 sm:p-2 md:p-2.5 lg:p-3 transition-all duration-200 border border-white/20 hover:border-white/40 touch-manipulation"
                aria-label="Close lightbox"
              >
                <X size={16} className="sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
              </button>
            </div>

            {/* Navigation buttons - Compact for iPhone SE */}
            {galleryItems.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    navigateImage('prev')
                    resetZoom()
                  }}
                  className="absolute left-1 sm:left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 active:bg-black/80 backdrop-blur-md rounded-full p-2 sm:p-2.5 md:p-3 lg:p-4 transition-all duration-200 border border-white/20 hover:border-white/40 touch-manipulation"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={18} className="sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    navigateImage('next')
                    resetZoom()
                  }}
                  className="absolute right-1 sm:right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 active:bg-black/80 backdrop-blur-md rounded-full p-2 sm:p-2.5 md:p-3 lg:p-4 transition-all duration-200 border border-white/20 hover:border-white/40 touch-manipulation"
                  aria-label="Next image"
                >
                  <ChevronRight size={18} className="sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" />
                </button>
              </>
            )}

            {/* Image container - Optimized for iPhone SE */}
            <div className="relative w-full h-full flex items-center justify-center pt-12 sm:pt-14 md:pt-16 lg:pt-20 pb-2 sm:pb-3 md:pb-4 lg:pb-6 overflow-hidden">
              <div
                className="relative inline-block max-w-full max-h-full"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={selectedImage.image || "/placeholder.svg"}
                  alt={selectedImage.text || "Gallery image"}
                  style={{ 
                    transform: `translate3d(${pan.x}px, ${pan.y}px, 0) scale(${zoomScale})`, 
                    transition: pinchStartDist ? 'none' : 'transform 200ms ease-out' 
                  }}
                  className="max-w-full max-h-[calc(100vh-4rem)] sm:max-h-[calc(100vh-5rem)] md:max-h-[85vh] object-contain rounded sm:rounded-lg shadow-2xl will-change-transform"
                />
                
                {/* Close button on image - Top right */}
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedImage(null)
                    resetZoom()
                  }}
                  className="absolute top-1 right-1 sm:top-2 sm:right-2 bg-black/70 hover:bg-black/90 active:bg-black backdrop-blur-md rounded-full p-1.5 sm:p-2 md:p-2.5 transition-all duration-200 border border-white/30 hover:border-white/50 touch-manipulation z-30"
                  aria-label="Close lightbox"
                >
                  <X size={16} className="sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
                </button>
                
                {/* Zoom reset button - Compact */}
                {zoomScale > 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      resetZoom()
                    }}
                    className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 bg-black/70 hover:bg-black/90 active:bg-black backdrop-blur-md text-white rounded-full px-2 py-1 sm:px-3 sm:py-1.5 text-[10px] sm:text-xs font-medium border border-white/20 transition-all duration-200 touch-manipulation z-20"
                  >
                    Reset
                  </button>
                )}
              </div>
            </div>

            {/* Bottom hint for mobile - Compact */}
            {galleryItems.length > 1 && (
              <div className="absolute bottom-1 left-1/2 -translate-x-1/2 sm:hidden z-20">
                <p className="text-[10px] text-white/70 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1 border border-white/15">
                  Swipe
                </p>
              </div>
            )}
          </div>
        </div>
      )}
      {/* View more button with pink motif */}
      <div className="relative z-10 mt-8 sm:mt-10 md:mt-12 flex justify-center px-4">
        <motion.a
          href="/gallery"
          className="group inline-flex items-center gap-2 px-6 sm:px-8 md:px-10 lg:px-12 py-3 sm:py-3.5 md:py-4 rounded-lg sm:rounded-xl font-semibold sm:font-bold transition-all duration-300 uppercase tracking-wider text-xs sm:text-sm md:text-base whitespace-nowrap relative overflow-hidden border-2 backdrop-blur-sm"
          style={{
            backgroundImage: "linear-gradient(135deg, #BC677C, #E2AAAD)",
            borderColor: "#FAEAEA",
            color: "#FFFFFF",
            boxShadow: "0 6px 26px rgba(188,103,124,0.45), 0 2px 10px rgba(226,170,173,0.6)",
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.98 }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundImage = "linear-gradient(135deg, #E2AAAD, #EBC1CB)";
            e.currentTarget.style.borderColor = "#EBC1CB";
            e.currentTarget.style.boxShadow = "0 10px 34px rgba(188,103,124,0.55), 0 4px 14px rgba(235,193,203,0.8)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundImage = "linear-gradient(135deg, #BC677C, #E2AAAD)";
            e.currentTarget.style.borderColor = "#FAEAEA";
            e.currentTarget.style.boxShadow = "0 6px 26px rgba(188,103,124,0.45), 0 2px 10px rgba(226,170,173,0.6)";
          }}
        >
          <span className="relative z-10">View Full Gallery</span>
          <motion.div
            animate={{
              x: [0, 4, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <ChevronRight size={16} className="sm:w-5 sm:h-5 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
          </motion.div>
          <div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-[#EBC1CB]/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 transform -skew-x-12 -translate-x-full group-hover:translate-x-full"
          />
          {/* Pulsing glow effect */}
          <motion.div 
            className="absolute inset-0 bg-[#E2AAAD]/25 rounded-lg sm:rounded-xl blur-xl -z-10"
            animate={{
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.a>
      </div>
    </Section>
  )
}
