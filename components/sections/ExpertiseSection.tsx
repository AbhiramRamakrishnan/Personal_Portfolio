"use client"

import { useRef, useEffect, useState, useCallback } from 'react'
import { X, Bot, Code, Brain, Server, Briefcase, Rocket, Laptop, ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

const expertiseData = [
  {
    id: 1,
    title: 'Core Engineering',
    description: 'Developing a strong foundation in CS fundamentals, focusing on logic-driven programming and efficient memory management.',
    details: ['C', 'Java', 'Python', 'Data Structures', 'Algorithms', 'Logic Building'],
    icon: Code,
    color: 'blue',
    year: '2021', // Starting your journey
  },
  {
    id: 2,
    title: 'Full Stack Development',
    description: 'Mastering the complete lifecycle of web applications, bridging interactive user interfaces with functional server-side logic.',
    details: ['Next.js', 'TypeScript', 'Node.js', 'React', 'State Management', 'API Integration', 'Tailwind CSS'],
    icon: Laptop,
    color: 'sky',
    year: '2022',
  },
  {
    id: 3,
    title: 'Backend Architecture',
    description: 'Architecting the core logic of complex systems with a focus on high-performance Java environments and secure data management.',
    details: ['Java', 'Spring Boot', 'Spring Security', 'PostgreSQL', 'Microservices', 'Hibernate/JPA', 'System Design'],
    icon: Server,
    color: 'green',
    year: '2023',
  },
  {
    id: 4,
    title: 'Freelance & Consulting',
    description: 'Launching professional web solutions through Specularis, delivering production-ready platforms for event and music brands.',
    details: ['Client Strategy', 'Technical Audits', 'Vibe Coding', 'Project Management', 'Branding'],
    icon: Briefcase,
    color: 'indigo',
    year: '2024',
  },
  {
    id: 5,
    title: 'ROS & Robotics Systems',
    description: 'Specializing in the Robot Operating System for autonomous navigation and sensor fusion in agro-defense applications.',
    details: ['ROS', 'ROS2', 'Navigation Stack', 'SLAM', 'Sensor Fusion', 'Gazebo'],
    icon: Bot,
    color: 'cyan',
    year: '2024',
  },
  {
    id: 6,
    title: 'Edge AI & Intelligence',
    description: 'Integrating Agentic AI and computer vision into hardware for real-time decision making at the edge.',
    details: ['Agentic AI', 'Computer Vision', 'Edge Inference', 'TensorFlow', 'Automation'],
    icon: Brain,
    color: 'purple',
    year: '2025',
  },
  {
    id: 7,
    title: 'Startup Leadership',
    description: 'As CTO at Agni Robotics, driving the technical vision for smart agro-defense platforms and autonomous infrastructure.',
    details: ['Technical Strategy', 'Architecture Oversight', 'Innovation Leadership', 'Team Coordination'],
    icon: Rocket,
    color: 'red',
    year: '2026', // Current Era
  },
]

const colorClasses: Record<string, { bg: string; border: string; text: string; glow: string }> = {
  blue: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-400', glow: 'shadow-blue-500/20' },
  cyan: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', text: 'text-cyan-400', glow: 'shadow-cyan-500/20' },
  purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-400', glow: 'shadow-purple-500/20' },
  green: { bg: 'bg-green-500/10', border: 'border-green-500/30', text: 'text-green-400', glow: 'shadow-green-500/20' },
  sky: { bg: 'bg-sky-500/10', border: 'border-sky-500/30', text: 'text-sky-400', glow: 'shadow-sky-500/20' },
  orange: { bg: 'bg-orange-500/10', border: 'border-orange-500/30', text: 'text-orange-400', glow: 'shadow-orange-500/20' },
  pink: { bg: 'bg-pink-500/10', border: 'border-pink-500/30', text: 'text-pink-400', glow: 'shadow-pink-500/20' },
  indigo: { bg: 'bg-indigo-500/10', border: 'border-indigo-500/30', text: 'text-indigo-400', glow: 'shadow-indigo-500/20' },
  red: { bg: 'bg-red-500/10', border: 'border-red-500/30', text: 'text-red-400', glow: 'shadow-red-500/20' },
  yellow: { bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', text: 'text-yellow-400', glow: 'shadow-yellow-500/20' },
}

export default function ExpertiseSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedExpertise, setSelectedExpertise] = useState(expertiseData[0])
  const [scrollProgress, setScrollProgress] = useState(0)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [isTouching, setIsTouching] = useState(false)

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

  // Update scroll state
  const updateScrollState = useCallback(() => {
    if (!scrollContainerRef.current) return
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
    setCanScrollLeft(scrollLeft > 10)
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    setScrollProgress(scrollLeft / (scrollWidth - clientWidth))
  }, [])

  // Scroll the timeline based on page scroll when in view (mobile only - not touching)
  useEffect(() => {
    // Throttled scroll handler for better performance
    let ticking = false
    let lastScrollTime = 0
    const throttleMs = 16 // ~60fps max
    
    const handleScroll = () => {
      const now = Date.now()
      if (now - lastScrollTime < throttleMs) return
      lastScrollTime = now
      
      if (!sectionRef.current || !scrollContainerRef.current || isTouching) return
      
      // Only auto-scroll on mobile
      if (window.innerWidth >= 1024) return
      
      if (!ticking) {
        requestAnimationFrame(() => {
          const sectionRect = sectionRef.current?.getBoundingClientRect()
          if (!sectionRect || !scrollContainerRef.current) {
            ticking = false
            return
          }
          
          const sectionTop = sectionRect.top
          const sectionHeight = sectionRect.height
          const windowHeight = window.innerHeight
          
          // Calculate how much the section is visible
          if (sectionTop < windowHeight && sectionTop > -sectionHeight) {
            const progress = Math.max(0, Math.min(1, (windowHeight - sectionTop) / (windowHeight + sectionHeight)))
            
            // Scroll the container horizontally based on scroll progress
            const maxScroll = scrollContainerRef.current.scrollWidth - scrollContainerRef.current.clientWidth
            scrollContainerRef.current.scrollLeft = progress * maxScroll
            updateScrollState()
          }
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isTouching, updateScrollState])

  // Touch handlers for mobile swipe
  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    const handleTouchStart = () => setIsTouching(true)
    const handleTouchEnd = () => {
      setTimeout(() => setIsTouching(false), 1000)
      updateScrollState()
    }
    const handleScroll = () => updateScrollState()

    container.addEventListener('touchstart', handleTouchStart)
    container.addEventListener('touchend', handleTouchEnd)
    container.addEventListener('scroll', handleScroll)

    return () => {
      container.removeEventListener('touchstart', handleTouchStart)
      container.removeEventListener('touchend', handleTouchEnd)
      container.removeEventListener('scroll', handleScroll)
    }
  }, [updateScrollState])

  // Desktop button navigation
  const scrollBy = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return
    const cardWidth = 320 // approx card width + gap
    const scrollAmount = direction === 'left' ? -cardWidth : cardWidth
    scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    setTimeout(updateScrollState, 300)
  }

  const handleViewMore = useCallback((expertise: typeof expertiseData[0]) => {
    setSelectedExpertise(expertise)
    setModalOpen(true)
  }, [])

  return (
    <section
      id="expertise"
      ref={sectionRef}
      className="relative py-16 sm:py-20 lg:py-32 bg-[#030318] overflow-hidden"
    >
      {/* Background - same as testimonials */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-950/15 via-transparent to-transparent" />
      
      {/* Floating elements */}
      <div className="absolute top-40 left-10 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl animate-float-3d" />
      <div className="absolute bottom-40 right-10 w-48 h-48 bg-purple-500/5 rounded-full blur-3xl animate-morph" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Section Eyebrow */}
        <div
          className={cn(
            "flex justify-start mb-8 sm:mb-12 transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-xs sm:text-sm text-white/60"
            style={{ fontFamily: 'var(--font-inter)' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
            My Journey
          </span>
        </div>

        {/* Section Header with Desktop Nav Buttons */}
        <div className="flex items-end justify-between mb-10 sm:mb-16">
          <div className="max-w-3xl">
            <h2
              className={cn(
                "text-2xl sm:text-3xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 transition-all duration-700",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
              style={{ fontFamily: 'var(--font-garet), system-ui, sans-serif' }}
            >
              Engineering across the entire stack.
            </h2>
            <p
              className={cn(
                "text-sm sm:text-base lg:text-lg text-white/60 leading-relaxed transition-all duration-700 delay-100",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
              style={{ fontFamily: 'var(--font-poppins)' }}
            >
              A comprehensive technical foundation in ROS and Agentic AI, paired with modern full-stack mastery to build systems that solve real-world challenges.
            </p>
          </div>

          {/* Desktop Navigation Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => scrollBy('left')}
              disabled={!canScrollLeft}
              className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300",
                "bg-blue-500/10 border border-blue-400/20 backdrop-blur-sm",
                canScrollLeft 
                  ? "hover:bg-blue-500/20 hover:border-blue-400/40 cursor-pointer" 
                  : "opacity-30 cursor-not-allowed"
              )}
            >
              <ChevronLeft className="w-5 h-5 text-blue-300" />
            </button>
            <button
              onClick={() => scrollBy('right')}
              disabled={!canScrollRight}
              className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300",
                "bg-blue-500/10 border border-blue-400/20 backdrop-blur-sm",
                canScrollRight 
                  ? "hover:bg-blue-500/20 hover:border-blue-400/40 cursor-pointer" 
                  : "opacity-30 cursor-not-allowed"
              )}
            >
              <ChevronRight className="w-5 h-5 text-blue-300" />
            </button>
          </div>
        </div>

        {/* Horizontal Timeline */}
        <div className="relative">
          {/* Timeline Line - horizontal */}
          <div className="absolute top-8 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
          
          {/* Progress indicator */}
          <div 
            className="absolute top-8 left-0 h-px bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-100"
            style={{ width: `${scrollProgress * 100}%` }}
          />

          {/* Scrollable container */}
          <div 
            ref={scrollContainerRef}
            className="overflow-x-auto pb-6 -mx-4 px-4 scrollbar-hide touch-pan-x"
          >
            <div className="flex gap-4 sm:gap-6 min-w-max">
              {expertiseData.map((expertise, index) => {
                const Icon = expertise.icon
                const colors = colorClasses[expertise.color]

                return (
                  <div
                    key={expertise.id}
                    className={cn(
                      "relative transition-all duration-700",
                      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                    )}
                    style={{ 
                      transitionDelay: `${200 + index * 100}ms`,
                    }}
                  >
                    {/* Timeline Dot */}
                    <div className="flex justify-center mb-4">
                      <div className={cn(
                        "w-4 h-4 rounded-full z-10 relative",
                        colors.bg,
                        colors.border,
                        "border-2"
                      )}>
                        <div className={cn("absolute inset-0 rounded-full animate-ripple", colors.bg)} />
                      </div>
                    </div>

                    {/* Year Badge */}
                    <div className="flex justify-center mb-3">
                      <span
                        className={cn(
                          "px-3 py-1 rounded-full text-xs",
                          colors.bg, colors.text
                        )}
                        style={{ fontFamily: 'var(--font-inter)' }}
                      >
                        {expertise.year}
                      </span>
                    </div>

                    {/* Content Card */}
                    <div
                      className={cn(
                        "group w-[260px] sm:w-[300px] p-4 sm:p-5 rounded-xl sm:rounded-2xl cursor-pointer transition-all duration-500",
                        "bg-blue-500/[0.03] border border-blue-400/[0.1]",
                        "hover:bg-blue-500/[0.06] hover:border-blue-400/[0.2]",
                        "hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(100,149,237,0.15)]",
                        colors.glow
                      )}
                      onClick={() => handleViewMore(expertise)}
                    >
                      <div className="flex items-start gap-3 sm:gap-4">
                        {/* Icon */}
                        <div className={cn(
                          "flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center transition-all duration-300",
                          colors.bg,
                          "group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(100,149,237,0.2)]"
                        )}>
                          <Icon className={cn("w-5 h-5 sm:w-6 sm:h-6", colors.text)} />
                        </div>

                        <div className="flex-grow min-w-0">
                          {/* Number */}
                          <span className={cn("text-xs sm:text-sm font-bold opacity-50", colors.text)}
                            style={{ fontFamily: 'var(--font-inter)' }}>
                            0{expertise.id}
                          </span>

                          {/* Title */}
                          <h3
                            className="text-base sm:text-lg font-semibold text-white mb-2 group-hover:text-blue-200 transition-colors"
                            style={{ fontFamily: 'var(--font-garet), system-ui, sans-serif' }}
                          >
                            {expertise.title}
                          </h3>
                        </div>
                      </div>

                      {/* Description */}
                      <p
                        className="text-xs sm:text-sm text-white/50 line-clamp-3 mt-3"
                        style={{ fontFamily: 'var(--font-poppins)' }}
                      >
                        {expertise.description}
                      </p>

                      {/* View More */}
                      <button
                        className={cn(
                          "mt-3 text-xs sm:text-sm transition-all duration-300",
                          colors.text,
                          "opacity-60 group-hover:opacity-100"
                        )}
                        style={{ fontFamily: 'var(--font-inter)' }}
                      >
                        View Details →
                      </button>

                      {/* Bottom glow line */}
                      <div className={cn(
                        "absolute bottom-0 left-0 right-0 h-[2px] rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity",
                        "bg-gradient-to-r from-transparent via-blue-500/60 to-transparent"
                      )} />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Mobile Navigation Buttons with Scroll Hint */}
          <div className="flex items-center justify-center gap-4 mt-4 lg:hidden">
            <button
              onClick={() => scrollBy('left')}
              disabled={!canScrollLeft}
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300",
                "bg-blue-500/10 backdrop-blur-xl border border-blue-400/20",
                canScrollLeft 
                  ? "hover:bg-blue-500/20 hover:border-blue-400/40 active:scale-95" 
                  : "opacity-30"
              )}
            >
              <ChevronLeft className="w-4 h-4 text-blue-300" />
            </button>
            <span className="text-[10px] text-white/40" style={{ fontFamily: 'var(--font-inter)' }}>
              Swipe or tap
            </span>
            <button
              onClick={() => scrollBy('right')}
              disabled={!canScrollRight}
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300",
                "bg-blue-500/10 backdrop-blur-xl border border-blue-400/20",
                canScrollRight 
                  ? "hover:bg-blue-500/20 hover:border-blue-400/40 active:scale-95" 
                  : "opacity-30"
              )}
            >
              <ChevronRight className="w-4 h-4 text-blue-300" />
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#030318]/90 backdrop-blur-sm animate-fade-in"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="relative max-w-lg w-full p-6 sm:p-8 rounded-2xl sm:rounded-3xl glass-strong animate-slide-up-bounce max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 rounded-full bg-blue-500/[0.1] hover:bg-blue-500/[0.2] transition-colors"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5 text-white/60" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className={cn(
                "w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center",
                colorClasses[selectedExpertise.color].bg
              )}>
                <selectedExpertise.icon className={cn("w-5 h-5 sm:w-6 sm:h-6", colorClasses[selectedExpertise.color].text)} />
              </div>
              <span
                className={cn("px-3 py-1 rounded-full text-xs", colorClasses[selectedExpertise.color].bg, colorClasses[selectedExpertise.color].text)}
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                {selectedExpertise.year}
              </span>
            </div>

            <h3
              className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4"
              style={{ fontFamily: 'var(--font-garet), system-ui, sans-serif' }}
            >
              {selectedExpertise.title}
            </h3>

            <p
              className="text-sm sm:text-base text-white/60 mb-4 sm:mb-6 leading-relaxed"
              style={{ fontFamily: 'var(--font-poppins)' }}
            >
              {selectedExpertise.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {selectedExpertise.details.map((detail) => (
                <span
                  key={detail}
                  className="px-3 py-1.5 rounded-full text-xs sm:text-sm text-blue-200/70 bg-blue-500/[0.1] border border-blue-400/[0.15]"
                  style={{ fontFamily: 'var(--font-inter)' }}
                >
                  {detail}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  )
}
