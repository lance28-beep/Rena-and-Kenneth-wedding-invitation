"use client"

import { Section } from "@/components/section"
import { siteConfig } from "@/content/site"
import {
  Clock,
  Utensils,
  Car,
  Copy,
  Check,
  Navigation,
  Heart,
  Camera,
  X,
  MapPin,
} from "lucide-react"
import { useState, useEffect } from "react"
import Image from "next/image"
import { Cormorant_Garamond } from "next/font/google"

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400"],
})

export function Details() {
  const [copiedItems, setCopiedItems] = useState<Set<string>>(new Set())
  const [showImageModal, setShowImageModal] = useState<string | null>(null)
  const ceremonyLocation = siteConfig.ceremony.location
  const receptionLocation = siteConfig.reception.location

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && showImageModal) {
        setShowImageModal(null)
      }
    }

    if (showImageModal) {
      document.addEventListener("keydown", handleEscape)
      document.body.style.overflow = "hidden"
    }
    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "unset"
    }
  }, [showImageModal])

  const copyToClipboard = async (text: string, itemId: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedItems((prev) => new Set(prev).add(itemId))
      setTimeout(() => {
        setCopiedItems((prev) => {
          const newSet = new Set(prev)
          newSet.delete(itemId)
          return newSet
        })
      }, 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  // Generate Google Maps links
  const ceremonyMapsLink = `https://maps.google.com/?q=${encodeURIComponent(siteConfig.ceremony.location)}`
  const receptionMapsLink = `https://maps.google.com/?q=${encodeURIComponent(siteConfig.reception.location)}`

  // Palettes (used only for color chips in attire card) - Pink & Gold motif
  const sponsorPalette = ["#BC677C", "#E2AAAD", "#EBC1CB", "#FAEAEA", "#FFFFFF", "#DFB46F"]
  const guestPalette = ["#BC677C", "#E2AAAD", "#EBC1CB", "#FAEAEA", "#FFFFFF", "#DFB46F"]
  const secondaryPalette = ["#BC677C", "#E2AAAD", "#EBC1CB", "#FAEAEA", "#FFFFFF", "#DFB46F"]

  const openInMaps = (link: string) => {
    window.open(link, "_blank", "noopener,noreferrer")
  }

  return (
    <Section
      id="details"
      className="relative py-12 md:py-16 lg:py-20 overflow-hidden bg-[#E2AAAD]"
    >
      {/* Background elements with Pink & Gold motif */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Subtle gradient overlays */}
        <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-[#BC677C]/85 via-[#E2AAAD]/60 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-[#EBC1CB]/90 via-[#DFB46F]/55 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(188,103,124,0.22),transparent_55%)] opacity-80" />
      </div>

      {/* Header */}
      <div className="relative z-30 text-center mb-6 sm:mb-9 md:mb-12 px-3 sm:px-4">
        {/* Small label */}
        <p
          className={`${cormorant.className} text-[0.7rem] sm:text-xs md:text-sm uppercase tracking-[0.28em] text-white mb-2`}
          style={{ textShadow: "0 2px 10px rgba(0,0,0,0.75)" }}
        >
          Ceremony & Reception Details
        </p>

        <h2
          className="style-script-regular text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white mb-1.5 sm:mb-3 md:mb-4"
          style={{ textShadow: "0 4px 18px rgba(0,0,0,0.9)" }}
        >
          Details
        </h2>

        <p className="text-[11px] sm:text-sm md:text-base lg:text-lg text-white/95 max-w-xl mx-auto leading-relaxed px-2">
          Everything you need to join us as we say&nbsp;
          <span className="font-semibold text-white">“I do.”</span>
        </p>

        {/* Simple divider */}
        <div className="flex items-center justify-center gap-2 mt-3 sm:mt-4">
          <div className="w-8 sm:w-12 md:w-16 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />
          <div className="w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_12px_rgba(255,255,255,0.7)]" />
          <div className="w-8 sm:w-12 md:w-16 h-px bg-gradient-to-l from-transparent via-white/60 to-transparent" />
        </div>
      </div>

      {/* Ceremony & Reception Location (Combined) */}
      <div className="relative z-10 mb-3 sm:mb-8 max-w-4xl mx-auto px-2 sm:px-5">
        <div className="overflow-hidden rounded-lg sm:rounded-2xl border border-[#FAEAEA]/25 bg-gradient-to-b shadow-[0_20px_60px_rgba(0,0,0,0.45)] transition-transform duration-500 group hover:scale-[1.01]">
          {/* Top image */}
          <div className="relative h-64 sm:h-80 md:h-96 lg:h-[28rem] w-full">
            <Image
              src="/Details/Rhose Garden Resort and Events Place.jpg"
              alt={`${siteConfig.ceremony.venue} - Ceremony & Reception`}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#BC677C]/95 via-[#DFB46F]/65 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end px-2 sm:px-6 pb-2 sm:pb-6 text-white">
              <h3 className="style-script-regular text-xl sm:text-4xl md:text-5xl font-normal leading-tight drop-shadow-lg">
                {siteConfig.ceremony.venue}
              </h3>
              <p className="style-script-regular text-sm sm:text-xl md:text-2xl font-normal leading-none drop-shadow-md mt-0.5 sm:mt-1">
                Ceremony &amp; Reception
              </p>
            </div>
          </div>

          {/* Details panel */}
          <div className="bg-[#FAEAEA]/95 text-gray-800 px-2 sm:px-6 py-2.5 sm:py-6 space-y-2.5 sm:space-y-4 backdrop-blur-sm">
            {/* Single Date Display */}
            {/* <div className="text-center mb-3 sm:mb-4">
              <div className="rounded-md border border-[#EBC1CB] bg-white/80 px-3 sm:px-4 py-2.5 sm:py-3 shadow-sm inline-block">
                <p className="text-[9px] sm:text-[10px] font-semibold tracking-[0.18em] text-[#DFB46F] uppercase mb-1">
                  Date
                </p>
                <p className="text-base sm:text-lg md:text-xl font-bold text-gray-800">{siteConfig.ceremony.date}</p>
              </div>
            </div> */}

            {/* Combined Ceremony & Reception Times */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
              {/* Ceremony Time */}
              <div className="rounded-lg border border-[#EBC1CB] bg-white/80 px-2 sm:px-4 py-2 sm:py-4 shadow-sm">
                <div className="flex items-center gap-1.5 sm:gap-2 mb-1 sm:mb-2">
                  <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-[#BC677C]" />
                  <p className="text-[10px] sm:text-sm font-semibold tracking-[0.12em] sm:tracking-[0.15em] text-[#BC677C] uppercase">
                    Ceremony
                  </p>
                </div>
                <p className="text-xs sm:text-base md:text-lg font-bold text-gray-800">{siteConfig.ceremony.time}</p>
              </div>

              {/* Reception Time */}
              <div className="rounded-lg border border-[#EBC1CB] bg-white/80 px-2 sm:px-4 py-2 sm:py-4 shadow-sm">
                <div className="flex items-center gap-1.5 sm:gap-2 mb-1 sm:mb-2">
                  <Utensils className="w-3 h-3 sm:w-4 sm:h-4 text-[#BC677C]" />
                  <p className="text-[10px] sm:text-sm font-semibold tracking-[0.12em] sm:tracking-[0.15em] text-[#BC677C] uppercase">
                    Reception
                  </p>
                </div>
                <p className="text-xs sm:text-base md:text-lg font-bold text-gray-800">{siteConfig.reception.time}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-3 pt-1.5 sm:pt-2">
              <button
                onClick={() => openInMaps(ceremonyMapsLink)}
                className="flex items-center justify-center gap-1.5 rounded-lg bg-[#BC677C] text-white py-2 sm:py-3 shadow-lg hover:translate-y-[-2px] hover:bg-[#E2AAAD] transition-all text-[10px] sm:text-sm font-semibold"
              >
                <Navigation className="w-3 h-3 sm:w-4 sm:h-4" />
                Get Directions
              </button>
              <button
                onClick={() => copyToClipboard(siteConfig.ceremony.location, "combined-venue")}
                className="flex items-center justify-center gap-1.5 rounded-lg border border-[#EBC1CB]/35 text-gray-800 py-2 sm:py-3 hover:bg-[#EBC1CB]/5 transition-all text-[10px] sm:text-sm font-semibold"
              >
                {copiedItems.has("combined-venue") ? (
                  <>
                    <Check className="w-4 h-4" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy Address
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Information - Compact for mobile */}
      <div className="relative z-10 mb-4 sm:mb-7 max-w-4xl mx-auto px-3 sm:px-5">
        <div className="text-center mb-3 sm:mb-5">
          <h3 className="text-base sm:text-xl md:text-2xl font-semibold mb-1 sm:mb-2 text-gray-800 drop-shadow-[0_2px_8px_rgba(255,255,255,0.8)]">
            Important Information
          </h3>
          <p className="text-[11px] sm:text-xs md:text-sm text-gray-700 max-w-xl mx-auto leading-relaxed drop-shadow-[0_1px_6px_rgba(255,255,255,0.7)]">
            Kindly take note of these details to help the day flow smoothly and beautifully.
          </p>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {/* Attire Guidelines */}
          <div className="relative rounded-2xl border border-white/40 bg-white/85 backdrop-blur-lg shadow-[0_18px_40px_rgba(223,180,111,0.18)] p-3.5 sm:p-5 overflow-hidden">
            <div className="mb-2.5 sm:mb-3 relative z-10 text-center">
              <h4 className="text-[0.75rem] sm:text-sm md:text-base font-semibold tracking-[0.3em] uppercase text-gray-800">
                Attire &amp; Motif
              </h4>
            </div>

            <div className="relative w-full rounded-2xl overflow-hidden border border-white/60 shadow-xl bg-white p-4 sm:p-6 space-y-3 sm:space-y-4">
              <div className="text-center space-y-2 sm:space-y-3">
                <p className="text-xs sm:text-sm font-semibold text-gray-800">
                  {siteConfig.dressCode.note}
                </p>
                <p className="text-xs sm:text-sm text-gray-800/90">
                  We invite you to embrace our romantic pink palette, creating a harmonious and elegant atmosphere as we celebrate our union.
                </p>
              </div>

              <div className="space-y-4">
                <div className="border-t border-[#EBC1CB] pt-4">
                  <h5 className="font-semibold text-xs sm:text-sm text-gray-800 mb-2">Principal Sponsors Attire</h5>
                  <p className="text-[10px] sm:text-xs text-gray-800/80 mb-2">Please follow the attire guidelines below to complement our wedding's elegant pink theme.</p>
                  <div className="relative w-full aspect-[4/3] sm:aspect-[5/3] rounded-xl overflow-hidden border border-[#EBC1CB] bg-[#FAEAEA] mb-3">
                    <Image
                      src="/Details/sponsor attire.png"
                      alt="Principal sponsors attire guideline"
                      fill
                      className="object-contain"
                      sizes="(min-width: 1024px) 700px, (min-width: 640px) 600px, 100vw"
                      priority={false}
                    />
                  </div>
                  <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                    <p className="text-gray-800">
                      <span className="font-semibold">Male Sponsor:</span> {siteConfig.dressCode.sponsors.male}
                    </p>
                    <p className="text-gray-800">
                      <span className="font-semibold">Female Sponsor:</span> {siteConfig.dressCode.sponsors.female}
                    </p>
                    <div className="pt-1">
                      <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.15em] text-gray-800 mb-1">
                        Color Palette
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {sponsorPalette.map((color) => (
                          <span
                            key={color}
                            className="w-7 h-7 rounded-full border border-white/70 shadow-sm"
                            style={{ backgroundColor: color }}
                            title={color}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-[#EBC1CB] pt-4">
                  <h5 className="font-semibold text-xs sm:text-sm text-gray-800 mb-2">Wedding Guests</h5>
                  <div className="relative w-full aspect-[4/3] sm:aspect-[5/3] rounded-xl overflow-hidden border border-[#EBC1CB] bg-[#FAEAEA] mb-3">
                    <Image
                      src="/Details/guest attire.png"
                      alt="Guest attire guideline"
                      fill
                      className="object-contain"
                      sizes="(min-width: 1024px) 700px, (min-width: 640px) 600px, 100vw"
                      priority={false}
                    />
                  </div>
                  <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                    <p className="text-gray-800 font-semibold">
                      Formal or Semi-Formal Attire
                    </p>
                    <p className="text-gray-800">
                      We warmly encourage you to incorporate our romantic pink color palette into your attire. Whether through accessories, accents, or full ensembles, your participation in our color theme will create a beautifully cohesive celebration.
                    </p>
                    <div className="pt-1">
                      <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.15em] text-gray-800 mb-1">
                        Our Color Palette
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {guestPalette.map((color) => (
                          <span
                            key={color}
                            className="w-7 h-7 rounded-full border border-white/70 shadow-sm"
                            style={{ backgroundColor: color }}
                            title={color}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Arrival Time & Reception Guidelines */}
          <div className="relative rounded-2xl border border-white/40 bg-white/85 backdrop-blur-lg shadow-[0_18px_40px_rgba(223,180,111,0.18)] p-3.5 sm:p-5 overflow-hidden">
            <div className="space-y-4 sm:space-y-5">
              {/* Arrival Time */}
              <div className="relative w-full rounded-2xl overflow-hidden border border-white/60 shadow-xl bg-white p-4 sm:p-6">
                <div className="mb-3 sm:mb-4">
                  <h4 className="text-[0.75rem] sm:text-sm md:text-base font-semibold tracking-[0.3em] uppercase text-gray-800 mb-3">
                    Arrival Time
                  </h4>
                  <div className="space-y-2 sm:space-y-2.5">
                    <p className="text-xs sm:text-sm text-gray-800 leading-relaxed">
                      Kindly arrive by <span className="font-semibold text-[#BC677C]">{siteConfig.ceremony.guestsTime}</span> so we can begin the wedding ceremony promptly at exactly <span className="font-semibold text-[#BC677C]">{siteConfig.ceremony.time}</span>.
                    </p>
                    <p className="text-xs sm:text-sm text-gray-800 leading-relaxed">
                      Your punctuality means so much to us — and don&apos;t forget to have a light snack beforehand so you can enjoy the celebration comfortably!
                    </p>
                  </div>
                </div>
              </div>

              {/* Reception Guidelines */}
              <div className="relative w-full rounded-2xl overflow-hidden border border-white/60 shadow-xl bg-white p-4 sm:p-6">
                <div className="mb-3 sm:mb-4">
                  <h4 className="text-[0.75rem] sm:text-sm md:text-base font-semibold tracking-[0.3em] uppercase text-gray-800 mb-3">
                    Reception Guidelines
                  </h4>
                  <div className="space-y-2 sm:space-y-2.5">
                    <p className="text-xs sm:text-sm text-gray-800 leading-relaxed">
                      The seating will be formal, RSVP-style. That's why we're asking you to fill out this invitation form to secure your spot. Kindly do not bring plus ones unless explicitly stated in your invitation.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Travel & Parking - Compact, pink motif */}
          <div className="relative rounded-2xl border border-[#EBC1CB]/70 bg-[#FAEAEA]/90 backdrop-blur-lg shadow-[0_18px_40px_rgba(188,103,124,0.18)] p-3.5 sm:p-5 overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-center gap-2 mb-2.5 sm:mb-3 relative z-10">
              <div className="p-1.5 rounded-full shadow-md bg-white/95 border border-[#EBC1CB]/60">
                <Car className="w-3.5 h-3.5 text-gray-800" />
              </div>
              <h4 className="font-semibold text-xs sm:text-base text-gray-800">Parking &amp; Travel</h4>
            </div>

            <div className="space-y-3 relative z-10">
              {/* Parking */}
              <div className="rounded-xl p-2.5 sm:p-3 border border-[#EBC1CB]/80 bg-gradient-to-br from-white/95 via-[#FAEAEA]/95 to-white/90 shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-[#BC677C]/90 text-white">
                    <Car className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[11px] sm:text-sm font-semibold text-gray-800">Parking Available</p>
                    <p className="text-[10px] sm:text-xs text-gray-800/85">
                      Parking is available at the venue. Please arrive early to find a comfortable spot.
                    </p>
                  </div>
                </div>
              </div>

              {/* Transportation */}
              <div className="rounded-xl p-2.5 sm:p-3 border border-[#EBC1CB]/80 bg-gradient-to-br from-white/95 via-[#FAEAEA]/95 to-white/90 shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-[#E2AAAD]/90 text-white">
                    <Navigation className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[11px] sm:text-sm font-semibold text-gray-800">Transportation</p>
                    <p className="text-[10px] sm:text-xs text-gray-800/85">
                      Private vehicles and local transport are welcome. Coordinate with friends or family and plan your
                      route ahead of time.
                    </p>
                  </div>
                </div>
              </div>

              {/* Tips */}
              <div className="rounded-xl p-2.5 sm:p-3 border border-[#EBC1CB]/75 bg-gradient-to-br from-white/95 via-[#FAEAEA]/95 to-white/90">
                <p className="text-[11px] sm:text-sm font-semibold mb-2 flex items-center gap-2 text-gray-800">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#BC677C]/10 text-gray-800">
                    <MapPin className="w-3.5 h-3.5" />
                  </span>
                  Quick Tips
                </p>
                <ul className="text-[10px] sm:text-xs space-y-1 text-gray-800/90">
                  <li className="flex items-start gap-2">
                    <span className="text-[#BC677C] mt-0.5">•</span>
                    <span>Plan your route ahead to avoid unexpected delays.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#BC677C] mt-0.5">•</span>
                    <span>Please avoid walking during the ceremony. Approach the coordinator or wait to be guided.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#BC677C] mt-0.5">•</span>
                    <span>Coordinate carpooling with friends or family when possible.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Image Modal */}
      {showImageModal && (
        <div
          className="fixed inset-0 backdrop-blur-xl z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-500"
          onClick={() => setShowImageModal(null)}
          style={{ backgroundColor: "rgba(248, 241, 236, 0.96)" }}
        >
          {/* Decorative background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div
              className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse"
              style={{ backgroundColor: "#BC677C", opacity: 0.12 }}
            />
            <div
              className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse"
              style={{ backgroundColor: "#E2AAAD", opacity: 0.14, animationDelay: "1s" }}
            />
          </div>

          <div
            className="relative max-w-6xl w-full max-h-[95vh] sm:max-h-[90vh] bg-gradient-to-br from-white via-white rounded-3xl overflow-hidden shadow-2xl border-2 animate-in zoom-in-95 duration-500 group"
            onClick={(e) => e.stopPropagation()}
            style={{ borderColor: "#BC677C1f", backgroundColor: "#FAEAEA" }}
          >
            {/* Decorative top accent */}
            <div
              className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r"
              style={{ background: "linear-gradient(to right, #BC677C, #E2AAAD, #FAEAEA)" }}
            />

            {/* Enhanced close button */}
            <button
              onClick={() => setShowImageModal(null)}
              className="absolute top-4 right-4 sm:top-5 sm:right-5 md:top-6 md:right-6 z-20 hover:bg-white backdrop-blur-sm p-2.5 sm:p-3 rounded-xl shadow-xl transition-all duration-300 hover:scale-110 hover:shadow-2xl active:scale-95 border-2 group/close"
              title="Close (ESC)"
              style={{ backgroundColor: "#FAEAEA", borderColor: "#BC677C33", color: "#1a1a1a" }}
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 group-hover/close:text-red-500 transition-colors" />
            </button>

            {/* Venue badge */}
            <div className="absolute top-4 left-4 sm:top-5 sm:left-5 md:top-6 md:left-6 z-20">
              <div
                className="flex items-center gap-2 backdrop-blur-md px-4 py-2 rounded-full shadow-xl border-2"
                style={{ backgroundColor: "#FAEAEA", borderColor: "#BC677C33" }}
              >
                {showImageModal === "ceremony" ? (
                  <>
                    <Heart className="w-4 h-4" fill="#BC677C" style={{ color: "#BC677C" }} />
                    <span className="text-xs sm:text-sm font-bold" style={{ color: "#1a1a1a" }}>
                      Ceremony Venue
                    </span>
                  </>
                ) : (
                  <>
                    <Utensils className="w-4 h-4" style={{ color: "#BC677C" }} />
                    <span className="text-xs sm:text-sm font-bold" style={{ color: "#1a1a1a" }}>
                      Reception Venue
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Image section with enhanced effects */}
            <div
              className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] overflow-hidden"
              style={{ backgroundColor: "#FAEAEA" }}
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-1000 z-0" />

              <Image
                src={showImageModal === "ceremony" ? "/Details/RELIGIOUS-Daraga_Church,_Albay.jpg" : "/Details/Hotel St. ellis.jpg"}
                alt={showImageModal === "ceremony" ? siteConfig.ceremony.location : siteConfig.reception.location}
                fill
                className="object-contain p-6 sm:p-8 md:p-10 transition-transform duration-700 group-hover:scale-105 z-10"
                sizes="95vw"
                priority
              />
            </div>

            {/* Enhanced content section */}
            <div
              className="p-5 sm:p-6 md:p-8 bg-gradient-to-br from-white to-white/95 backdrop-blur-sm border-t-2 relative"
              style={{ borderColor: "#BC677C1f", backgroundColor: "#FAEAEA" }}
            >
              {/* Decorative line */}
              <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-[#BC677C]/30 to-transparent" />

              <div className="space-y-5">
                {/* Header with venue info */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="space-y-2">
                    <h3
                      className="text-xl sm:text-2xl md:text-3xl font-bold flex items-center gap-3"
                      style={{ color: "#1a1a1a" }}
                    >
                      {showImageModal === "ceremony" ? (
                        <Heart className="w-6 h-6" fill="#BC677C" style={{ color: "#BC677C" }} />
                      ) : (
                        <Utensils className="w-6 h-6" style={{ color: "#BC677C" }} />
                      )}
                      {showImageModal === "ceremony" ? siteConfig.ceremony.venue : siteConfig.reception.venue}
                    </h3>
                    <div className="flex items-center gap-2 text-sm opacity-70" style={{ color: "#1a1a1a" }}>
                      <MapPin className="w-4 h-4" style={{ color: "#BC677C" }} />
                      <span>
                        {showImageModal === "ceremony"
                          ? siteConfig.ceremony.location
                          : siteConfig.reception.location}
                      </span>
                    </div>

                    {/* Date & Time info */}
                    {showImageModal === "ceremony" && (
                      <div
                        className="flex items-center gap-2 text-sm font-medium px-3 py-2 rounded-lg border"
                        style={{
                          color: "#1a1a1a",
                          backgroundColor: "#EBC1CB",
                          opacity: 0.9,
                          borderColor: "#BC677C33",
                        }}
                      >
                        <Clock className="w-4 h-4" style={{ color: "#BC677C" }} />
                        <span>
                          {siteConfig.ceremony.date} at {siteConfig.ceremony.time}
                        </span>
                      </div>
                    )}
                    {showImageModal === "reception" && (
                      <div
                        className="flex items-center gap-2 text-sm font-medium px-3 py-2 rounded-lg border"
                        style={{
                          color: "#1a1a1a",
                          backgroundColor: "#E2AAAD",
                          opacity: 0.9,
                          borderColor: "#BC677C33",
                        }}
                      >
                        <Clock className="w-4 h-4" style={{ color: "#BC677C" }} />
                        <span>
                          {siteConfig.reception.date} - {siteConfig.reception.time}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Action buttons */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
                    <button
                      onClick={() =>
                        copyToClipboard(
                          showImageModal === "ceremony"
                            ? siteConfig.ceremony.location
                            : siteConfig.reception.location,
                          `modal-${showImageModal}`,
                        )
                      }
                      className="flex items-center justify-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 bg-white border-2 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95 shadow-md hover:bg-[#EBC1CB]/25 whitespace-nowrap"
                      title="Copy address"
                      style={{ borderColor: "#BC677C33", color: "#1a1a1a" }}
                    >
                      {copiedItems.has(`modal-${showImageModal}`) ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span>Copy Address</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() =>
                        openInMaps(showImageModal === "ceremony" ? ceremonyMapsLink : receptionMapsLink)
                      }
                      className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95 shadow-lg whitespace-nowrap text-white"
                      style={{
                        background:
                          showImageModal === "ceremony"
                            ? "linear-gradient(to right, #BC677C, #E2AAAD)"
                            : "linear-gradient(to right, #E2AAAD, #FAEAEA)",
                      }}
                    >
                      <Navigation className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span>Get Directions</span>
                    </button>
                  </div>
                </div>

                {/* Additional info */}
                <div className="flex items-center gap-2 text-xs opacity-65" style={{ color: "#1a1a1a" }}>
                  <span className="flex items-center gap-1.5">
                    <Camera className="w-3 h-3" />
                    Click outside to close
                  </span>
                  <span className="hidden sm:inline">•</span>
                  <span className="hidden sm:inline-flex items-center gap-1.5">Press ESC to close</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Section>
  )
}


