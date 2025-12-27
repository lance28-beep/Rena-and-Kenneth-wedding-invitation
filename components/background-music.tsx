"use client"

import { useEffect, useRef } from "react"
import { useAudio } from "@/contexts/audio-context"

const BackgroundMusic = () => {
  const { audioRef } = useAudio()
  const hasInteracted = useRef(false)
  const interactionHandlers = useRef<(() => void)[]>([])

  useEffect(() => {
    const audioEl = audioRef.current
    if (!audioEl) return

    // Set volume to a comfortable level (50%)
    audioEl.volume = 0.5

    // Wait for audio to be ready before attempting to play
    const handleCanPlay = () => {
      if (!hasInteracted.current) {
        audioEl.play().catch((error) => {
          console.log("Autoplay blocked, waiting for user interaction:", error)
          setupUserInteraction()
        })
      }
    }

    // Try to play when metadata is loaded
    const handleLoadedMetadata = () => {
      if (!hasInteracted.current) {
        audioEl.play().catch((error) => {
          console.log("Autoplay blocked, waiting for user interaction:", error)
          setupUserInteraction()
        })
      }
    }

    const handleUserInteraction = () => {
      if (audioEl && audioEl.paused) {
        audioEl.play()
          .then(() => {
            hasInteracted.current = true
            console.log("Background music started")
            // Remove all interaction listeners
            interactionHandlers.current.forEach(handler => {
              document.removeEventListener("click", handler)
              document.removeEventListener("touchstart", handler)
              document.removeEventListener("keydown", handler)
            })
            interactionHandlers.current = []
          })
          .catch((error) => {
            console.log("Playback failed:", error)
          })
      }
    }

    const setupUserInteraction = () => {
      // Add multiple interaction types
      const events = ["click", "touchstart", "keydown"]
      events.forEach(eventType => {
        document.addEventListener(eventType, handleUserInteraction, { once: true })
        interactionHandlers.current.push(handleUserInteraction)
      })
    }

    // Set up event listeners
    audioEl.addEventListener("canplay", handleCanPlay)
    audioEl.addEventListener("loadedmetadata", handleLoadedMetadata)

    // Try immediate play if audio is already loaded
    if (audioEl.readyState >= 2) {
      handleCanPlay()
    }

    return () => {
      audioEl.removeEventListener("canplay", handleCanPlay)
      audioEl.removeEventListener("loadedmetadata", handleLoadedMetadata)
      interactionHandlers.current.forEach(handler => {
        document.removeEventListener("click", handler)
        document.removeEventListener("touchstart", handler)
        document.removeEventListener("keydown", handler)
      })
      interactionHandlers.current = []
    }
  }, [audioRef])

  return (
    <audio
      ref={audioRef}
      src="/background_music/From This Moment On - Violin & Piano - Zet & Rusdi Cover.mp3"
      loop
      preload="auto"
      playsInline
      style={{ display: "none" }}
    />
  )
}

export default BackgroundMusic