"use client"

import { useRef, useEffect, useState, memo } from 'react'
import Image from 'next/image'
import { ExternalLink } from 'lucide-react'
import { cn } from '@/lib/utils'

const clients = [
  {
    name: "Agni Robotics",
    logo: "/images/clients/client-1.png",
    type: "Technical Leadership · CTO",
    website: "https://agnirobotics.com",
  },
  {
    name: "Specularis",
    logo: "/images/clients/specularis_logo.png",
    type: "Principal Architect · Founder",
    website: "#",
  },
  {
    name: "Fynora Entertainment",
    logo: "/images/clients/client-1.png",
    type: "Full-Stack Architecture",
    website: "https://fynoraentertainments.com",
  },
  {
    name: "Zerion Atelier",
    logo: "/images/clients/client-1.png",
    type: "Digital Strategy & Dev",
    website: "https://zerionatelier.com",
  },
  {
    name: "Uforia",
    logo: "/images/clients/client-1.png",
    type: "Web Infrastructure",
    website: "https://uforiaofficial.com",
  },
]

// Duplicate for infinite scroll effect
const duplicatedClients = [...clients, ...clients, ...clients]

export default function ClientsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const isPausedRef = useRef(false)
  const animationRef = useRef<number | null>(null)
  const isInViewRef = useRef(false)
  const lastTimeRef = useRef(0)

  // Update ref when hover state changes (no re-render needed for animation)
  const handleMouseEnter = () => {
    isPausedRef.current = true
  }
  
  const handleMouseLeave = () => {
    isPausedRef.current = false
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // Auto-scroll effect - runs once, uses refs for mutable state
  useEffect(() => {
    const container = scrollRef.current
    if (!container) return

    const targetFPS = 30
    const frameInterval = 1000 / targetFPS

    const scroll = (currentTime: number) => {
      // Always request next frame to keep loop alive
      animationRef.current = requestAnimationFrame(scroll)
      
      // Skip scrolling if not in view
      if (!isInViewRef.current) return
      
      // Skip scrolling if paused (hover)
      if (isPausedRef.current) return

      const deltaTime = currentTime - lastTimeRef.current
      
      if (deltaTime >= frameInterval) {
        lastTimeRef.current = currentTime - (deltaTime % frameInterval)
        
        container.scrollLeft += 0.5

        // Reset to beginning when reaching halfway (for infinite loop)
        const maxScroll = container.scrollWidth - container.clientWidth
        if (container.scrollLeft >= maxScroll * 0.66) {
          container.scrollLeft = 0
        }
      }
    }

    // Start animation loop immediately
    lastTimeRef.current = performance.now()
    animationRef.current = requestAnimationFrame(scroll)

    // Track visibility
    const observer = new IntersectionObserver(
      ([entry]) => {
        isInViewRef.current = entry.isIntersecting
      },
      { threshold: 0.1 }
    )

    observer.observe(container)

    return () => {
      observer.disconnect()
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, []) // Empty deps - only run once

  return (
    <section
      id="clients"
      ref={sectionRef}
      className="relative py-12 sm:py-16 lg:py-24 bg-[#030318] overflow-hidden"
    >
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-950/10 via-transparent to-transparent" />
      
      {/* Top border line with gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Section Header - Left aligned like other sections */}
        <div
          className={cn(
            "flex justify-start mb-6 sm:mb-8 transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <span 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-xs sm:text-sm text-white/60"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            Working With
          </span>
        </div>

        {/* Title and Subtitle - Left aligned */}
        <div
          className={cn(
            "mb-10 sm:mb-14 transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <h2
            className="text-2xl sm:text-3xl lg:text-5xl font-bold text-white mb-3 sm:mb-4"
            style={{ fontFamily: 'var(--font-garet), system-ui, sans-serif' }}
          >
            Clients, Collaborators & Ventures
          </h2>
          
          <p
            className="text-sm sm:text-base lg:text-lg text-white/60 max-w-2xl leading-relaxed"
            style={{ fontFamily: 'var(--font-poppins)' }}
          >
            A portfolio of technical leadership ranging from the architectural helm of Agni Robotics to high-impact consulting and full-stack development for industry partners.
          </p>
        </div>

        {/* Scrolling Clients Container */}
        <div
          className={cn(
            "relative transition-all duration-1000 delay-200",
            isVisible ? "opacity-100" : "opacity-0"
          )}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Left fade */}
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-[#030318] to-transparent z-10 pointer-events-none" />
          
          {/* Right fade */}
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-[#030318] to-transparent z-10 pointer-events-none" />

          {/* Scrollable container */}
          <div
            ref={scrollRef}
            className="overflow-x-auto py-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <div className="flex gap-4 sm:gap-6 lg:gap-8 px-4" style={{ width: 'max-content' }}>
              {duplicatedClients.map((client, index) => (
                <ClientCard key={`client-${index}`} client={client} />
              ))}
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div
          className={cn(
            "flex flex-wrap justify-center gap-6 sm:gap-12 mt-10 sm:mt-14 transition-all duration-700 delay-300",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          {[
            { value: "5+", label: "Production Deployments" },
            { value: "6+", label: "Strategic Partnerships" },
            { value: "4+", label: "Domain Verticals" },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center">
              <span
                className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
                style={{ fontFamily: 'var(--font-garet), system-ui, sans-serif' }}
              >
                {stat.value}
              </span>
              <span
                className="text-xs sm:text-sm text-white/40 mt-1"
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom border line with gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
    </section>
  )
}

const ClientCard = memo(function ClientCard({ client }: { client: typeof clients[0] }) {
  const [imgError, setImgError] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  // Extract display URL (remove https:// and trailing slash)
  const displayUrl = client.website.replace(/^https?:\/\//, '').replace(/\/$/, '')

  return (
    <a
      href={client.website}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex-shrink-0 flex flex-col items-center justify-center w-[140px] sm:w-[180px] lg:w-[200px] py-4 sm:py-6 transition-all duration-300 gpu-accelerate cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Logo Container */}
      <div className="relative w-full h-10 sm:h-12 lg:h-14 mb-2 sm:mb-3 flex items-center justify-center">
        {!imgError ? (
          <Image
            src={client.logo}
            alt={`${client.name} logo`}
            width={140}
            height={56}
            className="object-contain max-h-full opacity-40 group-hover:opacity-80 transition-opacity duration-300"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="flex items-center justify-center">
            <span
              className="text-lg sm:text-xl font-bold text-white/30 group-hover:text-white/60 transition-colors duration-300"
              style={{ fontFamily: 'var(--font-garet), system-ui, sans-serif' }}
            >
              {client.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
        )}
      </div>

      {/* Client Name */}
      <span
        className="text-[10px] sm:text-xs text-white/40 group-hover:text-white/70 transition-colors duration-300 text-center"
        style={{ fontFamily: 'var(--font-inter)' }}
      >
        {client.name}
      </span>

      {/* Website URL - always visible, enhanced on hover */}
      <div className="flex items-center gap-1 mt-1.5 transition-all duration-300">
        <span
          className={cn(
            "text-[9px] sm:text-[10px] font-mono tracking-tight transition-colors duration-300",
            isHovered ? "text-cyan-400" : "text-cyan-500/40"
          )}
        >
          {displayUrl}
        </span>
        <ExternalLink 
          className={cn(
            "w-2.5 h-2.5 sm:w-3 sm:h-3 transition-all duration-300",
            isHovered ? "text-cyan-400 translate-x-0.5 -translate-y-0.5" : "text-cyan-500/30"
          )} 
        />
      </div>

      {/* Subtle underline indicator on hover */}
      <div
        className={cn(
          "h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent transition-all duration-300 mt-1.5",
          isHovered ? "w-3/4 opacity-100" : "w-0 opacity-0"
        )}
      />
    </a>
  )
})
