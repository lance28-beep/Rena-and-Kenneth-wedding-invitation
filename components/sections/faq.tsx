"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { Section } from "@/components/section"
import { Cormorant_Garamond } from "next/font/google"
import { siteConfig } from "@/content/site"

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
})

interface FAQItem {
  question: string
  answer: string
}

const faqItems: FAQItem[] = [
  {
    question: "When is the wedding?",
    answer:
      `Our wedding will be held on ${siteConfig.ceremony.date} (${siteConfig.ceremony.day}) at ${siteConfig.ceremony.time}. We kindly ask guests to arrive by ${siteConfig.ceremony.guestsTime} to help us begin promptly.`,
  },
  {
    question: "Where will the ceremony and reception take place?",
    answer:
      `The ceremony will be held at ${siteConfig.ceremony.location}. The reception will follow at ${siteConfig.reception.location}. You can find detailed directions, addresses, and maps in the Details section above.`,
  },
  {
    question: "What time should I arrive?",
    answer:
      `Kindly arrive by ${siteConfig.ceremony.guestsTime} so we can begin the ceremony promptly at exactly ${siteConfig.ceremony.time}. The entourage will arrive at ${siteConfig.ceremony.entourageTime}. Your punctuality means so much to us!`,
  },
  {
    question: "How do I RSVP?",
    answer:
      `Please RSVP on or before ${siteConfig.details.rsvp.deadline} through the RSVP section on this invitation. Simply search for your name in the guest list, confirm your attendance, and let us know if you'll be bringing companions. We kindly ask for your response to help us prepare for the big day.`,
  },
  {
    question: "Can I bring a plus one or additional guests?",
    answer:
      "Each invitation includes a specific number of reserved seats. Please check your invitation details in the RSVP section. If you need to request additional seats, you can use the 'Request to Join' feature, and we'll do our best to accommodate based on availability.",
  },
  {
    question: "Is there a dress code?",
    answer:
      `Yes! We kindly request our guests to dress in formal attire matching our Pink & Rose motif. Please see the Attire section in Details for specific guidelines:\n\nPrincipal Sponsors:\n• Male: ${siteConfig.dressCode.sponsors.male}\n• Female: ${siteConfig.dressCode.sponsors.female}\n\nGuests:\n• Gents: ${siteConfig.dressCode.guests.gents}\n• Ladies: ${siteConfig.dressCode.guests.ladies}`,
  },
  {
    question: "Will there be assigned seating?",
    answer:
      "Yes, there will be assigned seating at the reception. Your table number will be displayed in the Book of Guests section once your RSVP is confirmed. Our reception team will gladly guide you to your table so you can relax and enjoy the celebration.",
  },
  {
    question: "Is there parking available?",
    answer:
      "Yes, parking is available at both venues. Please follow the parking signs and instructions from our venue coordinators.",
  },
  {
    question: "What should I give as a gift?",
    answer:
      "With all that we have, we are truly blessed. Your presence and prayers are what we request most. However, if you desire to give nonetheless, a monetary gift to help us begin our new life together would be humbly appreciated. You can find our gift registry information in the Gift Guide section.",
  },
  {
    question: "Can I take photos and videos during the ceremony?",
    answer:
      "We have a professional photographer and videographer capturing our special moments. We kindly ask that you keep your phones on silent and refrain from taking photos during the ceremony. However, we'd love to see your photos and videos from the reception! Please check the Snap & Share section for details on how to upload them.",
  },
  {
    question: "What if I have dietary restrictions or allergies?",
    answer:
      "Please let us know about any dietary restrictions or allergies when you RSVP. We want to ensure everyone can enjoy the celebration comfortably.",
  },
  {
    question: "Will the wedding be indoors or outdoors?",
    answer:
      "Both the ceremony and reception will be held at covered venues, so we're prepared for any weather. However, we recommend checking the weather forecast and dressing accordingly.",
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <Section
      id="faq"
      className="relative py-12 md:py-16 lg:py-20 overflow-hidden bg-[#BC677C]"
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
        
        {/* Subtle gradient overlays */}
        <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-[#BC677C]/85 via-[#E2AAAD]/60 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-[#BC677C]/90 via-[#EBC1CB]/55 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(188,103,124,0.22),transparent_55%)] opacity-80" />
        
        {/* Floating decorative circles with pink colors */}
        <div className="absolute top-6 left-8 w-32 h-32 bg-[#EBC1CB]/26 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute top-16 right-12 w-24 h-24 bg-[#E2AAAD]/26 rounded-full blur-2xl animate-pulse-slow" style={{ animationDelay: "1s" }} />
        <div className="absolute bottom-20 left-16 w-28 h-28 bg-[#FAEAEA]/22 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "2s" }} />
        <div className="absolute bottom-10 right-10 w-20 h-20 bg-[#EBC1CB]/26 rounded-full blur-2xl animate-pulse-slow" style={{ animationDelay: "0.5s" }} />
      </div>

      {/* Section Header */}
      <div className="relative z-30 text-center mb-6 sm:mb-9 md:mb-12 px-3 sm:px-4">
        {/* Small label */}
        <p
          className={`${cormorant.className} text-[0.7rem] sm:text-xs md:text-sm uppercase tracking-[0.28em] text-white mb-2`}
          style={{ textShadow: "0 2px 10px rgba(0,0,0,0.75)" }}
        >
          Questions & Answers
        </p>

        <h2
          className="style-script-regular text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white mb-1.5 sm:mb-3 md:mb-4"
          style={{ textShadow: "0 4px 18px rgba(0,0,0,0.85)" }}
        >
          Frequently Asked Questions
        </h2>

        {/* Simple divider */}
        <div className="flex items-center justify-center gap-2 mt-3 sm:mt-4">
          <div className="w-8 sm:w-12 md:w-16 h-px bg-gradient-to-r from-transparent via-[#EBC1CB]/80 to-transparent" />
          <div className="w-1.5 h-1.5 bg-[#EBC1CB] rounded-full shadow-[0_0_12px_rgba(235,193,203,0.7)]" />
          <div className="w-8 sm:w-12 md:w-16 h-px bg-gradient-to-l from-transparent via-[#EBC1CB]/80 to-transparent" />
        </div>
      </div>

      {/* FAQ content */}
      <div className="relative z-30 max-w-4xl mx-auto px-3 sm:px-5">
        {/* Main card */}
        <div className="relative bg-[#FAEAEA]/95 backdrop-blur-md border border-[#EBC1CB]/60 rounded-lg sm:rounded-xl md:rounded-2xl shadow-[0_20px_60px_rgba(188,103,124,0.3)] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#EBC1CB]/10 via-transparent to-[#BC677C]/5 pointer-events-none" />
          
          {/* FAQ items */}
          <div className="relative p-2.5 sm:p-4 md:p-5 lg:p-6">
            <div className="space-y-1.5 sm:space-y-2 md:space-y-3">
              {faqItems.map((item, index) => {
                const isOpen = openIndex === index
                const contentId = `faq-item-${index}`
                return (
                  <div
                    key={index}
                    className="rounded-lg sm:rounded-xl border border-[#EBC1CB]/40 bg-white/50 hover:border-[#BC677C]/60 hover:bg-white/70 transition-all duration-300 overflow-hidden shadow-sm"
                  >
                    <button
                      onClick={() => toggleItem(index)}
                      className="group w-full px-2.5 sm:px-3 md:px-4 lg:px-5 py-2 sm:py-2.5 md:py-3 lg:py-4 flex items-center justify-between text-left outline-none focus-visible:ring-2 focus-visible:ring-[#BC677C]/50 focus-visible:ring-offset-2 transition-colors"
                      aria-expanded={isOpen}
                      aria-controls={contentId}
                    >
                      <span className={`${cormorant.className} font-semibold text-[#BC677C] pr-2 sm:pr-3 md:pr-4 text-xs sm:text-sm md:text-base lg:text-lg leading-snug sm:leading-relaxed transition-colors duration-200 group-hover:text-[#E2AAAD]`}>
                        {item.question}
                      </span>
                      <ChevronDown
                        size={18}
                        className={`text-[#BC677C]/60 flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180 text-[#BC677C]" : ""} w-4 h-4 sm:w-5 sm:h-5`}
                        aria-hidden
                      />
                    </button>

                    <div
                      id={contentId}
                      role="region"
                      className={`grid transition-all duration-300 ease-out ${
                        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="px-2.5 sm:px-3 md:px-4 lg:px-5 py-2 sm:py-2.5 md:py-3 lg:py-4 bg-white/30 border-t border-[#EBC1CB]/40">
                          {item.answer.includes("[RSVP_LINK]") ? (
                            <p className={`${cormorant.className} text-gray-700 font-medium leading-relaxed sm:leading-loose text-xs sm:text-sm md:text-base lg:text-lg whitespace-pre-line tracking-wide`}>
                              {item.answer.split("[RSVP_LINK]")[0]}
                              <a 
                                href="#guest-list" 
                                className="text-[#BC677C] underline font-bold hover:text-[#E2AAAD] transition-colors"
                                onClick={(e) => {
                                  e.preventDefault()
                                  document.getElementById('guest-list')?.scrollIntoView({ behavior: 'smooth' })
                                }}
                              >
                                {item.answer.match(/\[RSVP_LINK\](.*?)\[\/RSVP_LINK\]/)?.[1]}
                              </a>
                              {item.answer.split("[/RSVP_LINK]")[1]}
                            </p>
                          ) : (
                            <p className={`${cormorant.className} text-gray-700 font-medium leading-relaxed sm:leading-loose text-xs sm:text-sm md:text-base lg:text-lg whitespace-pre-line tracking-wide`}>
                              {item.answer}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
