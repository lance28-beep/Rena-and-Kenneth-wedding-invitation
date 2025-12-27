"use client"

import { useState, useEffect, useMemo, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { siteConfig } from "@/content/site"
import StaggeredMenu from "./StaggeredMenu"
import { Cormorant_Garamond } from "next/font/google"

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400"],
})

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#countdown", label: "Countdown" },
  { href: "#gallery", label: "Gallery" },
  { href: "#messages", label: "Messages" },
  { href: "#details", label: "Details" },
  { href: "#entourage", label: "Entourage" },
  { href: "#sponsors", label: "Sponsors" },
  { href: "#guest-list", label: "RSVP" },
  { href: "#registry", label: "Registry" },
  { href: "#faq", label: "FAQ" },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("#home")

  const rafIdRef = useRef<number | null>(null)

  useEffect(() => {
    const onScroll = () => {
      if (rafIdRef.current != null) return
      rafIdRef.current = window.requestAnimationFrame(() => {
        rafIdRef.current = null
        setIsScrolled(window.scrollY > 50)
      })
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      if (rafIdRef.current != null) cancelAnimationFrame(rafIdRef.current)
      window.removeEventListener("scroll", onScroll as EventListener)
    }
  }, [])

  useEffect(() => {
    if (typeof window === "undefined") return
    const sectionIds = navLinks.map(l => l.href.substring(1))
    const elements = sectionIds
      .map(id => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el)

    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio - a.intersectionRatio))
        if (visible.length > 0) {
          const topMost = visible[0]
          if (topMost.target && topMost.target.id) {
            const newActive = `#${topMost.target.id}`
            setActiveSection(prev => (prev === newActive ? prev : newActive))
          }
        }
      },
      {
        root: null,
        rootMargin: "-20% 0px -70% 0px",
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1]
      }
    )

    elements.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const menuItems = useMemo(() => navLinks.map((l) => ({ label: l.label, ariaLabel: `Go to ${l.label}`, link: l.href })), [])

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-700 ease-out ${
        isScrolled
          ? "bg-[#BC677C]/96 backdrop-blur-xl shadow-[0_10px_40px_rgba(188,103,124,0.35)] border-b border-[#EBC1CB]/70"
          : "bg-[#BC677C]/92 backdrop-blur-lg border-b border-[#EBC1CB]/60"
      }`}
    >
      {/* Elegant glow effect when scrolled */}
      {isScrolled && (
        <div className="absolute inset-0 bg-gradient-to-r from-[#EBC1CB]/28 via-[#E2AAAD]/16 to-[#EBC1CB]/28 pointer-events-none" />
      )}
      {/* Subtle texture overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/8 via-transparent to-[#EBC1CB]/12 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 relative">
        <div className="flex justify-between items-center h-14 sm:h-16 md:h-20">
          <Link href="#home" className="flex-shrink-0 group relative z-10">
            <div className="relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20">
              <Image
                src="/monogram/newMonogram.png"
                alt={`${siteConfig.couple.groomNickname} & ${siteConfig.couple.brideNickname} Monogram`}
                fill
                className="object-contain group-hover:scale-110 group-active:scale-105 transition-all duration-500 drop-shadow-[0_4px_16px_rgba(188,103,124,0.3)] group-hover:drop-shadow-[0_6px_22px_rgba(188,103,124,0.4)]"
                style={{
                  filter: "brightness(0) saturate(100%) invert(1)",
                }}
              />
            </div>
            
            {/* Subtle background glow on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#EBC1CB]/40 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10" />
          </Link>

          <div className="hidden md:flex gap-1 items-center">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 lg:px-4 py-2 text-xs lg:text-sm ${cormorant.className} font-medium rounded-lg transition-all duration-500 relative group ${
                    isActive
                      ? "text-[#BC677C] bg-[#FAEAEA]/95 backdrop-blur-md shadow-[0_6px_18px_rgba(188,103,124,0.35)] border border-[#EBC1CB]"
                      : "text-[#FAEAEA]/95 hover:text-[#BC677C] hover:bg-[#FAEAEA]/95 hover:border hover:border-[#EBC1CB]/80 hover:shadow-[0_6px_18px_rgba(188,103,124,0.3)] hover:scale-105 active:scale-95 bg-white/0 border border-transparent"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#BC677C] via-[#E2AAAD] to-[#EBC1CB] transition-all duration-500 rounded-full ${
                      isActive
                        ? "w-full shadow-[0_0_10px_rgba(188,103,124,0.6)]"
                        : "w-0 group-hover:w-full group-hover:shadow-[0_0_8px_rgba(188,103,124,0.5)]"
                    }`}
                  />
                  {/* Active indicator dot */}
                  {isActive && (
                    <div className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-[#BC677C] animate-pulse shadow-[0_0_6px_rgba(188,103,124,0.8)]" />
                  )}
                  {/* Subtle accent on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-[#EBC1CB]/40 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
                </Link>
              )
            })}
          </div>

          <div className="md:hidden flex items-center h-full">
            {/* Decorative halo to improve tap target and visual affordance */}
            <div className="relative">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-[#EBC1CB]/20 via-[#E2AAAD]/14 to-transparent blur-md pointer-events-none" />
              <StaggeredMenu
                position="left"
                items={menuItems}
                socialItems={[]}
                displaySocials={false}
                displayItemNumbering={true}
                menuButtonColor="#FAEAEA"
                openMenuButtonColor="#BC677C"
                changeMenuColorOnOpen={true}
                colors={["#BC677C", "#E2AAAD", "#EBC1CB", "#FAEAEA", "#DFB46F"]}
                accentColor="#EBC1CB"
                isFixed={true}
                onMenuOpen={() => {}}
                onMenuClose={() => {}}
              />
            </div>
          </div>
        </div>

      </div>
    </nav>
  )
}
