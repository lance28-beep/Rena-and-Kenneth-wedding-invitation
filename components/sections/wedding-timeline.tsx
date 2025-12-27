"use client"

import type React from "react"
import Image from "next/image"
import { Section } from "@/components/section"
import { siteConfig } from "@/content/site"
import { Clock, MapPin } from "lucide-react"
import { motion } from "motion/react"
import { Cormorant_Garamond } from "next/font/google"

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400"],
})

const { groomNickname, brideNickname } = siteConfig.couple
const ceremonyTime = siteConfig.ceremony.time
const guestsTime = siteConfig.ceremony.guestsTime
const ceremonyVenue = siteConfig.ceremony.venue
const receptionVenue = siteConfig.reception.venue
const receptionTime = siteConfig.reception.time

type TimelineIcon = React.ComponentType<React.SVGProps<SVGSVGElement>>

interface TimelineEvent {
  time: string
  title: string
  description?: string
  location?: string
  icon: TimelineIcon
  /** Optional image source to override the default SVG icon for this event. */
  imageSrc?: string
}

const timelineEvents: TimelineEvent[] = [
  {
    time: guestsTime,
    title: "Guest Arrival",
    description: "Settle in, find your seats, and get ready to celebrate.",
    location: ceremonyVenue,
    icon: GuestsIcon,
    imageSrc: "/weddingtimeline/Guest Arrival.png",
  },
  {
    time: ceremonyTime,
    title: "Wedding Ceremony",
    description: `Celebrate ${brideNickname} & ${groomNickname} as they say "I do."`,
    location: ceremonyVenue,
    icon: RingsIcon,
    imageSrc: "/weddingtimeline/Wedding Ceremony.png",
  },
  {
    time: receptionTime,
    title: "Reception",
    description: "Dinner, program, and celebrations with family and friends.",
    location: receptionVenue,
    icon: DinnerIcon,
    imageSrc: "/weddingtimeline/Reception.png",
  },
  {
    time: "Send-off",
    title: "Send-off",
    description: `A warm send-off for ${brideNickname} & ${groomNickname} as they begin their new chapter together.`,
    location: receptionVenue,
    icon: CarIcon,
    imageSrc: "/weddingtimeline/Send-off-img.png",
  },
]

export function WeddingTimeline() {
  return (
    <Section
      id="wedding-timeline"
      className="relative py-8 sm:py-10 md:py-14 lg:py-18 overflow-hidden"
    >
      {/* Header - matching details section style, sage motif */}
      <div className="relative z-10 text-center mb-6 sm:mb-9 md:mb-12 px-3 sm:px-4">
        {/* Small label */}
        <p
          className={`${cormorant.className} text-[0.7rem] sm:text-xs md:text-sm tracking-[0.3em] uppercase text-white mb-2`}
          style={{ textShadow: "0 2px 10px rgba(0,0,0,0.75)" }}
        >
          Day Schedule
        </p>

        <h2 className="style-script-regular text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal text-white mb-1.5 sm:mb-3 md:mb-4 drop-shadow-[0_6px_24px_rgba(0,0,0,0.7)]">
          Wedding Timeline
        </h2>

        <p className="text-[11px] sm:text-sm md:text-base lg:text-lg text-white/95 max-w-xl mx-auto leading-relaxed px-2">
          A glimpse of the moments we'll share throughout the day.
        </p>

        {/* Simple divider */}
        <div className="flex items-center justify-center gap-2 mt-3 sm:mt-4">
          <div className="w-8 sm:w-12 md:w-16 h-px bg-gradient-to-r from-transparent via-[#EBC1CB] to-transparent" />
          <div className="w-1.5 h-1.5 bg-[#EBC1CB] rounded-full shadow-[0_0_12px_rgba(235,193,203,0.9)]" />
          <div className="w-8 sm:w-12 md:w-16 h-px bg-gradient-to-l from-transparent via-[#EBC1CB] to-transparent" />
        </div>
      </div>

      {/* Timeline - improved desktop layout */}
      <div className="relative z-10 max-w-6xl mx-auto px-3 sm:px-5 lg:px-8">
        {/* Vertical timeline line - desktop */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#EBC1CB]/40 via-[#BC677C]/55 to-[#EBC1CB]/40 -translate-x-1/2 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#FAEAEA]" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#FAEAEA]" />
        </div>

        {/* Mobile timeline line */}
        <div className="md:hidden absolute left-6 sm:left-7 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#EBC1CB]/45 via-[#BC677C]/60 to-[#EBC1CB]/45 pointer-events-none" />

        <div className="space-y-4 sm:space-y-5 md:space-y-8 lg:space-y-10">
          {timelineEvents.map((event, index) => (
            <TimelineItem key={event.title} event={event} index={index} />
          ))}
        </div>
      </div>
    </Section>
  )
}

function TimelineItem({ event, index }: { event: TimelineEvent; index: number }) {
  const Icon = event.icon
  const isEven = index % 2 === 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="relative"
    >
      {/* Desktop layout: alternating sides - improved */}
      <div className="hidden md:flex items-center">
        {/* Left side container (for even indices: 0, 2, 4...) */}
        <div className={`flex-1 flex ${isEven ? "justify-end pr-8 lg:pr-12" : ""}`}>
          {isEven && <TimelineCard event={event} Icon={Icon} />}
        </div>

        {/* Center icon - always in the middle */}
        <div className="relative z-10 flex-shrink-0 mx-2 lg:mx-4">
          <IconBadge Icon={Icon} imageSrc={event.imageSrc} />
        </div>

        {/* Right side container (for odd indices: 1, 3, 5...) */}
        <div className={`flex-1 flex ${!isEven ? "justify-start pl-8 lg:pl-12" : ""}`}>
          {!isEven && <TimelineCard event={event} Icon={Icon} />}
        </div>
      </div>

      {/* Mobile layout: compact stacked */}
      <div className="md:hidden flex items-start gap-3">
        <div className="relative z-10 flex-shrink-0 mt-0.5">
          <IconBadge Icon={Icon} mobile imageSrc={event.imageSrc} />
        </div>
        <div className="flex-1 min-w-0">
          <TimelineCard event={event} Icon={Icon} mobile />
        </div>
      </div>
    </motion.div>
  )
}

function TimelineCard({ event, Icon, mobile }: { event: TimelineEvent; Icon: TimelineIcon; mobile?: boolean }) {
  return (
    <div
      className={`rounded-lg sm:rounded-xl border border-[#EBC1CB]/60 bg-white/90 backdrop-blur-sm shadow-md hover:shadow-lg transition-all duration-300 ${
        mobile ? "p-3" : "p-4 sm:p-5 md:p-6 lg:p-7"
      } max-w-md`}
    >
      <div className={`${mobile ? "space-y-2" : "space-y-3 md:space-y-4"}`}>
        {/* Time */}
        <div className="flex items-center gap-1.5">
          <Clock
            className={`${mobile ? "w-3.5 h-3.5" : "w-4 h-4 md:w-5 md:h-5"} text-[#BC677C] flex-shrink-0`}
          />
          <p
            className={`${mobile ? "text-[10px]" : "text-xs sm:text-sm md:text-base"} font-bold tracking-[0.15em] text-[#BC677C] uppercase`}
          >
            {event.time}
          </p>
        </div>

        {/* Title */}
        <h3
          className={`${mobile ? "text-sm sm:text-base" : "text-base sm:text-lg md:text-xl lg:text-2xl"} font-semibold text-[#243127] leading-tight`}
        >
          {event.title}
        </h3>

        {/* Description */}
        {event.description && (
          <p
            className={`${mobile ? "text-[10px] sm:text-xs" : "text-xs sm:text-sm md:text-base"} text-[#37413A]/80 leading-relaxed`}
          >
            {event.description}
          </p>
        )}

        {/* Location */}
        {event.location && (
          <div
            className={`flex items-start gap-1.5 ${
              mobile ? "pt-1.5" : "pt-2 md:pt-3"
            } border-t border-[#EBC1CB]/70`}
          >
            <MapPin
              className={`${mobile ? "w-3 h-3" : "w-3.5 h-3.5 md:w-4 md:h-4"} text-[#BC677C] mt-0.5 flex-shrink-0`}
            />
            <p className={`${mobile ? "text-[10px]" : "text-xs md:text-sm"} text-[#37413A]/80 leading-relaxed`}>
              {event.location}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

function IconBadge({
  Icon,
  mobile,
  imageSrc,
}: {
  Icon: TimelineIcon
  mobile?: boolean
  imageSrc?: string
}) {
  if (imageSrc) {
    // Display image as-is without container, white color, bigger size
    return (
      <div className="flex items-center justify-center">
        <Image
          src={imageSrc}
          alt=""
          width={mobile ? 100 : 200}
          height={mobile ? 100 : 200}
          className={`${
            mobile ? "w-[100px] h-auto" : "w-[200px] md:w-[240px] lg:w-[280px] h-auto"
          } object-contain brightness-0 invert`}
          unoptimized
        />
      </div>
    )
  }
  
  // Display icon with container for non-image events
  return (
    <div
      className={`${
        mobile ? "w-10 h-10" : "w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20"
      } rounded-full border-2 border-[#EBC1CB]/70 bg-gradient-to-br from-white to-[#FAEAEA] flex items-center justify-center shadow-md hover:scale-105 transition-transform duration-300`}
    >
      <Icon
        className={`${
          mobile ? "w-5 h-5" : "w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8"
        }`}
      />
    </div>
  )
}

/* Hand-drawn–style timeline icons (pink line art) */

const iconStroke = "#BC677C"

function GuestsIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke={iconStroke} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M11 16a4 4 0 1 0-4-4 4 4 0 0 0 4 4Z" />
      <path d="M21 16a3.5 3.5 0 1 0-3.5-3.5A3.5 3.5 0 0 0 21 16Z" />
      <path d="M4 24.5c1.2-3 3.9-4.5 7-4.5s5.8 1.5 7 4.5" />
      <path d="M17.5 19.5A6 6 0 0 1 26 24" />
    </svg>
  )
}

function ChurchIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke={iconStroke} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M16 3v6" />
      <path d="M13.5 6H18.5" />
      <path d="M8 26V14l8-5 8 5v12" />
      <path d="M6 26h20" />
      <path d="M14 26v-6a2 2 0 0 1 4 0v6" />
      <path d="M11 18h-3" />
      <path d="M24 18h-3" />
    </svg>
  )
}

function RingsIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke={iconStroke} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="20" r="6" />
      <circle cx="20" cy="20" r="6" />
      <path d="M14 9 16 5l2 4" />
      <path d="M13 7h6" />
    </svg>
  )
}

function CameraIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke={iconStroke} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="5" y="9" width="22" height="16" rx="3" />
      <circle cx="16" cy="17" r="5" />
      <path d="M11 7h3l1-2h4l1 2h3" />
    </svg>
  )
}

function FireworksIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke={iconStroke} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M16 5v4" />
      <path d="M9 7l2.5 2.5" />
      <path d="M23 7 20.5 9.5" />
      <path d="M8 14h4" />
      <path d="M20 14h4" />
      <path d="M11 21 8 24" />
      <path d="M21 21 24 24" />
      <circle cx="16" cy="14" r="3" />
    </svg>
  )
}

function MicrophoneIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke={iconStroke} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="13" y="5" width="6" height="11" rx="3" />
      <path d="M11 12v1a5 5 0 0 0 10 0v-1" />
      <path d="M16 17v4" />
      <path d="M12 25h8" />
    </svg>
  )
}

function DinnerIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke={iconStroke} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="16" cy="16" r="7" />
      <path d="M7 8v12" />
      <path d="M9.5 8v12" />
      <path d="M23 8v12" />
      <path d="M5 24h22" />
    </svg>
  )
}

function CarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke={iconStroke} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M6 21v-4l3-6h14l3 6v4" />
      <path d="M8 21h16" />
      <circle cx="11" cy="22.5" r="1.8" />
      <circle cx="21" cy="22.5" r="1.8" />
      <path d="M14 11.5 16 9l2 2.5" />
    </svg>
  )
}

