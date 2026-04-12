"use client"

import { useRef, useEffect, useState, useCallback, memo } from 'react'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

const testimonials = [
  {
    name: "Akash Krishna U",
    role: "Founder & CEO, Agni Robotics",
    quote: "As CTO, Abhiram doesn't just manage the stack; he architects the vision. His ability to bridge the gap between complex ROS logic and our deployment infrastructure is what makes Agni possible.",
    rating: 5,
  },
  {
    name: "Mithun M S Kurup",
    role: "Director, Fynora Entertainment",
    quote: "Abhiram handled everything from the Fynora brand site to the Uforia event platform. He understands high-pressure deadlines and builds systems that stay stable under heavy traffic.",
    rating: 5,
  },
  {
    name: "Mahajan M S Kurup",
    role: "Director, Zerion Atelier",
    quote: "A rare mix of technical depth and design sense. He took the Zerion vision and turned it into a high-performance digital presence that truly represents our artist collective.",
    rating: 5,
  },
  {
    name: "Abu Sinan",
    role: "Mentee · Mobile Developer",
    quote: "Abhiram didn't just teach me how to code; he taught me the full lifecycle of a product—from choosing the right stack to hosting and maintenance. He simplifies the complex.",
    rating: 5,
  },
  {
    name: "Arjun B",
    role: "Python Developer, Agni Robotics",
    quote: "Working alongside Abhiram on the backend is a masterclass in logic. He has a knack for finding the most efficient way to solve a hardware-software integration problem.",
    rating: 5,
  },
  {
    name: "Abhijith R S",
    role: "Developer · Lab Collaborator",
    quote: "Whenever we hit a wall in the lab, Abhiram is the guy who can jump into the code, find the bug, and get the system running. His debugging logic is on another level.",
    rating: 5,
  },
  {
    name: "Ananthjith B",
    role: "Designer & Dev Student",
    quote: "Abhiram's advice on deep tech and the intersection of UI/UX is what changed my perspective on development. He builds with the user and the architecture in mind simultaneously.",
    rating: 5,
  },
  {
    name: "Abel K Sabu",
    role: "Flutter Developer, Agni Robotics",
    quote: "Seamless integration is hard, but Abhiram makes it look easy. His architectural oversight ensures that our mobile frontends and robotic backends speak the same language.",
    rating: 5,
  },
]

// Single row of testimonials, duplicated for infinite scroll
const row1 = [...testimonials, ...testimonials, ...testimonials]

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [isManualScrolling, setIsManualScrolling] = useState(false)
  const autoScrollRef = useRef<number | null>(null)
  const manualScrollTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Manual scroll function
  const scrollBy = useCallback((direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return
    
    // Stop auto scroll temporarily
    setIsManualScrolling(true)
    if (manualScrollTimeoutRef.current) {
      clearTimeout(manualScrollTimeoutRef.current)
    }
    
    const scrollAmount = 350
    const container = scrollContainerRef.current
    const newScrollLeft = direction === 'left' 
      ? container.scrollLeft - scrollAmount 
      : container.scrollLeft + scrollAmount
    
    container.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth'
    })
    
    // Resume auto scroll after 3 seconds
    manualScrollTimeoutRef.current = setTimeout(() => {
      setIsManualScrolling(false)
    }, 3000)
  }, [])

  // Optimized auto scroll effect with visibility check
  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container || isPaused || isManualScrolling) return

    let lastTime = 0
    const targetFPS = 30 // Reduce from 60fps for smoother performance
    const frameInterval = 1000 / targetFPS

    const scroll = (currentTime: number) => {
      if (!container || isPaused || isManualScrolling) {
        autoScrollRef.current = null
        return
      }

      const deltaTime = currentTime - lastTime
      
      if (deltaTime >= frameInterval) {
        lastTime = currentTime - (deltaTime % frameInterval)
        
        container.scrollLeft += 1
        
        // Reset to beginning when reaching halfway (for infinite loop effect)
        const maxScroll = container.scrollWidth - container.clientWidth
        if (container.scrollLeft >= maxScroll * 0.66) {
          container.scrollLeft = 0
        }
      }
      
      autoScrollRef.current = requestAnimationFrame(scroll)
    }

    // Check if section is visible before starting animation
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !autoScrollRef.current) {
          lastTime = performance.now()
          autoScrollRef.current = requestAnimationFrame(scroll)
        } else if (!entry.isIntersecting && autoScrollRef.current) {
          cancelAnimationFrame(autoScrollRef.current)
          autoScrollRef.current = null
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(container)

    return () => {
      observer.disconnect()
      if (autoScrollRef.current) {
        cancelAnimationFrame(autoScrollRef.current)
      }
    }
  }, [isPaused, isManualScrolling])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (manualScrollTimeoutRef.current) {
        clearTimeout(manualScrollTimeoutRef.current)
      }
    }
  }, [])

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

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="relative py-16 sm:py-20 lg:py-32 bg-[#030318] overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-950/15 via-transparent to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10 mb-8 sm:mb-12">
        {/* Section Eyebrow */}
        <div
          className={cn(
            "flex justify-start mb-8 sm:mb-12 transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-xs sm:text-sm text-white/60"
            style={{ fontFamily: 'var(--font-inter)' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            Testimonials
          </span>
        </div>

        {/* Section Header */}
        <div className="max-w-3xl">
          <h2
            className={cn(
              "text-2xl sm:text-3xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 transition-all duration-700",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
            style={{ fontFamily: 'var(--font-garet), system-ui, sans-serif' }}
          >
            {"What collaborators say about working with me."}
          </h2>
        </div>
      </div>

      {/* Single row scrolling testimonials */}
      <div
        className={cn(
          "relative transition-all duration-1000 delay-200",
          isVisible ? "opacity-100" : "opacity-0"
        )}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Left nav area */}
        <div 
          className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 lg:w-32 bg-gradient-to-r from-[#030318] to-transparent z-10 cursor-pointer group flex items-center justify-start pl-2 sm:pl-4"
          onClick={() => scrollBy('left')}
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white/20 group-hover:text-white/60 transition-all duration-300 group-hover:scale-110" />
        </div>
        
        {/* Right nav area */}
        <div 
          className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 lg:w-32 bg-gradient-to-l from-[#030318] to-transparent z-10 cursor-pointer group flex items-center justify-end pr-2 sm:pr-4"
          onClick={() => scrollBy('right')}
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white/20 group-hover:text-white/60 transition-all duration-300 group-hover:scale-110" />
        </div>

        {/* Scrollable container */}
        <div 
          ref={scrollContainerRef} 
          className="overflow-x-auto py-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => {
            setTimeout(() => setIsPaused(false), 2000)
          }}
        >
          <div className="flex gap-4 sm:gap-6 px-4 sm:px-6" style={{ width: 'max-content' }}>
            {row1.map((testimonial, index) => (
              <TestimonialCard key={`row1-${index}`} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

const TestimonialCard = memo(function TestimonialCard({ testimonial }: { testimonial: typeof testimonials[0] }) {
  return (
    <div className="group flex-shrink-0 w-[280px] sm:w-[320px] lg:w-[380px] p-4 sm:p-5 lg:p-6 rounded-xl sm:rounded-2xl bg-blue-500/[0.03] border border-blue-400/[0.1] hover:border-blue-400/[0.25] hover:bg-blue-500/[0.06] transition-all duration-300 gpu-accelerate">
      {/* Avatar and Info */}
      <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-400/[0.15] flex items-center justify-center">
          <span
            className="text-xs sm:text-sm font-semibold text-blue-200/80"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            {testimonial.name.split(' ').map(n => n[0]).join('')}
          </span>
        </div>

        <div className="min-w-0 flex-1">
          <h4
            className="text-sm sm:text-base text-white font-medium truncate"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            {testimonial.name}
          </h4>
          <p
            className="text-xs sm:text-sm text-blue-200/40 truncate"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            {testimonial.role}
          </p>
        </div>
      </div>

      {/* Stars */}
      <div className="flex gap-1 mb-3 sm:mb-4">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 fill-blue-400 text-blue-400" />
        ))}
      </div>

      {/* Quote */}
      <p
        className="text-xs sm:text-sm text-white/60 leading-relaxed"
        style={{ fontFamily: 'var(--font-poppins)' }}
      >
        {`"${testimonial.quote}"`}
      </p>
    </div>
  )
})
