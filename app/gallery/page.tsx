import fs from "fs/promises"
import path from "path"
import MasonryGallery from "@/components/masonry-gallery"
import { siteConfig } from "@/content/site"

// Generate on each request so newly added images in public/ appear without a rebuild
export const dynamic = "force-dynamic"

async function getImagesFrom(dir: string) {
  const abs = path.join(process.cwd(), "public", dir)
  try {
    const entries = await fs.readdir(abs, { withFileTypes: true })
    return entries
      .filter((e) => e.isFile())
      .map((e) => `/${dir}/${e.name}`)
      .filter((p) => p.match(/\.(jpe?g|png|webp|gif)$/i))
      .sort((a, b) => a.localeCompare(b))
  } catch {
    return []
  }
}

export default async function GalleryPage() {
  const { brideNickname, groomNickname } = siteConfig.couple

  const [desktop, mobile] = await Promise.all([
    getImagesFrom("desktop-background"),
    getImagesFrom("mobile-background"),
  ])
  const images = [
    ...desktop.map((src) => ({ src, category: "desktop" as const })),
    ...mobile.map((src) => ({ src, category: "mobile" as const })),
  ]

  return (
    <main className="min-h-screen bg-[#BC677C] relative overflow-hidden">
      {/* Enhanced background elements with pink motif */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Background image */}
        <img
          src="/Details/background.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        
        {/* Soft gradient overlays with pink palette */}
        <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-[#BC677C]/90 via-[#E2AAAD]/70 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-[#BC677C]/95 via-[#EBC1CB]/70 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(235,193,203,0.3),transparent_55%)] opacity-90" />
        
        {/* Floating decorative circles with pink colors */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-[#EBC1CB]/26 rounded-full blur-3xl animate-pulse-slow" />
        <div
          className="absolute top-20 right-16 w-24 h-24 bg-[#E2AAAD]/26 rounded-full blur-2xl animate-pulse-slow"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute bottom-16 left-20 w-28 h-28 bg-[#FAEAEA]/22 rounded-full blur-3xl animate-pulse-slow"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute bottom-24 right-12 w-20 h-20 bg-[#BC677C]/26 rounded-full blur-2xl animate-pulse-slow"
          style={{ animationDelay: "0.5s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-[#EBC1CB]/24 rounded-full blur-3xl animate-pulse-slow"
          style={{ animationDelay: "1.5s" }}
        />
        
        {/* Decorative lines */}
        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#EBC1CB]/40 to-transparent" />
      </div>

      <section className="relative z-10 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-8 sm:py-16">
        <div className="text-center mb-6 sm:mb-8 md:mb-10 px-3 sm:px-4">
          {/* Decorative element above title */}
          <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
            <div className="w-8 sm:w-12 md:w-16 h-px bg-[#EBC1CB]/60" />
            <div className="w-1.5 h-1.5 bg-[#E2AAAD]/80 rounded-full" />
            <div className="w-1.5 h-1.5 bg-[#FAEAEA]/80 rounded-full" />
            <div className="w-1.5 h-1.5 bg-[#EBC1CB]/80 rounded-full" />
            <div className="w-8 sm:w-12 md:w-16 h-px bg-[#EBC1CB]/60" />
          </div>
          
          <h1
            className="imperial-script-regular text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal text-white mb-2 sm:mb-3 md:mb-4 drop-shadow-lg"
            style={{ textShadow: "0 4px 18px rgba(0,0,0,0.85)" }}
          >
            Our Love Story Gallery
          </h1>
          <p className="text-xs sm:text-sm md:text-base lg:text-lg text-white/90 font-light max-w-xl mx-auto leading-relaxed px-2">
            Every photograph tells a story of {brideNickname} & {groomNickname}'s journey to forever
          </p>
          
          {/* Decorative element below subtitle */}
          <div className="flex items-center justify-center gap-2 mt-3 sm:mt-4">
            <div className="w-1.5 h-1.5 bg-[#E2AAAD]/80 rounded-full" />
            <div className="w-1.5 h-1.5 bg-[#FAEAEA]/80 rounded-full" />
            <div className="w-1.5 h-1.5 bg-[#EBC1CB]/80 rounded-full" />
          </div>
        </div>

        {images.length === 0 ? (
          <div className="text-center text-white/90">
            <p className="font-light">
              No images found. Add files to{" "}
              <code className="px-2 py-1 bg-[#BC677C]/80 rounded border border-[#EBC1CB]/30 text-white">
                public/desktop-background
              </code>{" "}
              or{" "}
              <code className="px-2 py-1 bg-[#BC677C]/80 rounded border border-[#EBC1CB]/30 text-white">
                public/mobile-background
              </code>
              .
            </p>
          </div>
        ) : (
          <MasonryGallery images={images} />
        )}


      </section>
    </main>
  )
}


