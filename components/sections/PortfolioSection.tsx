"use client"

import { useRef, useEffect, useState, memo, useCallback } from 'react'
import { ExternalLink, Bot, Brain, Wrench, Server, Store, X, ShieldCheck, Sparkles, Laptop } from 'lucide-react'
import { cn } from '@/lib/utils'

const portfolioItems = [
  {
    category: 'CTO · Robotics · ROS',
    title: 'Agni Robotics',
    description: "Architecting the technical roadmap for Agro-Defense and autonomous systems. Integrating Edge AI and ROS-based frameworks for critical infrastructure and agricultural automation.",
    link: 'https://agnirobotics.com',
    tags: ['agnirobotics.com'],
    icon: Bot,
    span: 'col-span-2 row-span-2',
  },
  {
    category: 'Agency · Web Development',
    title: 'Specularis',
    description: 'Founder of a dedicated web agency providing high-performance architectures, custom business solutions, and technical consulting.',
    link: '#',
    tags: ['Available for Projects'],
    icon: Store,
    span: 'col-span-2 lg:col-span-1 row-span-1',
  },
  {
    category: 'Intelligence',
    title: 'Agentic AI Systems',
    description: 'Developing autonomous AI agents capable of complex reasoning and real-world task execution.',
    link: '#',
    tags: ['Agentic AI', 'Automation'],
    icon: Brain,
    span: 'col-span-1 row-span-1',
  },
  {
    category: 'Engineering',
    title: 'Backend Architecture',
    description: 'Building the logic that powers the web. Expert-level Java, Spring Boot, and robust API development with a focus on CS fundamentals.',
    tags: ['Java', 'Spring Boot', 'APIs'],
    icon: Server,
    span: 'col-span-1 row-span-1',
  },
  {
    category: 'Advisory',
    title: 'Technical Consulting',
    description: 'Providing strategic oversight, system audits, and logic-driven debugging to resolve complex architectural bottlenecks.',
    tags: ['Debugging', 'Consulting', 'Code Audit'],
    icon: ShieldCheck, // Changed from Code for a more "Security/Consultant" feel
    span: 'col-span-1 row-span-1',
  },
  {
    category: 'Experimental',
    title: 'Vibe Coding & Innovation',
    description: 'Rapid prototyping using natural language and AI-augmented development to build feature-rich applications at speed.',
    tags: ['AI-Dev', 'Prototyping'],
    icon: Sparkles, // Better fit for "Vibe Coding"
    span: 'col-span-1 row-span-1',
  },
  {
    category: 'Hardware',
    title: 'Embedded Systems & IoT',
    description: 'Interfacing software with reality through sensor integration, microcontrollers, and low-latency communication protocols.',
    tags: ['C/C++', 'IoT', 'Hardware'],
    icon: Wrench,
    span: 'col-span-2 lg:col-span-1 row-span-1',
  },
  {
    category: 'Full Stack',
    title: 'Modern Web Ecosystems',
    description: 'Crafting pixel-perfect, high-conversion interfaces using React, TypeScript, and Tailwind CSS for a seamless user experience.',
    tags: ['React', 'TypeScript', 'UX'],
    icon: Laptop, 
    span: 'col-span-2 row-span-1',
  }
]

// Modal Component for mobile popup
function PortfolioModal({ item, isOpen, onClose }: { 
  item: typeof portfolioItems[0] | null
  isOpen: boolean
  onClose: () => void 
}) {
  if (!isOpen || !item) return null
  
  const Icon = item.icon

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-lg max-h-[80vh] overflow-y-auto rounded-2xl bg-[#0a0b2e]/95 backdrop-blur-xl border border-blue-400/30 p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        >
          <X className="w-4 h-4 text-white" />
        </button>

        {/* Icon */}
        <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 bg-blue-500/20 border border-blue-400/30">
          <Icon className="w-7 h-7 text-blue-300" />
        </div>

        {/* Category */}
        <span
          className="inline-block px-3 py-1 rounded-full text-xs text-blue-300/90 bg-blue-500/20 border border-blue-400/20 mb-3"
          style={{ fontFamily: 'var(--font-inter)' }}
        >
          {item.category}
        </span>

        {/* Title */}
        <h3
          className="text-2xl font-bold text-white mb-4"
          style={{ fontFamily: 'var(--font-garet), system-ui, sans-serif' }}
        >
          {item.title}
        </h3>

        {/* Full Description */}
        <p
          className="text-white/70 leading-relaxed mb-6"
          style={{ fontFamily: 'var(--font-poppins)' }}
        >
          {item.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full text-xs text-blue-200/90 bg-blue-500/20 border border-blue-400/20"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Link button */}
        {item.link && item.link !== '#' && (
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-500/20 hover:bg-blue-500/30 border border-blue-400/30 text-white transition-colors"
          >
            <span style={{ fontFamily: 'var(--font-inter)' }}>Visit Project</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        )}
      </div>
    </div>
  )
}

export default function PortfolioSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [activeCard, setActiveCard] = useState<number | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [selectedItem, setSelectedItem] = useState<typeof portfolioItems[0] | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect() // Stop observing once visible
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
    setActiveCard(index)
  }

  const handleCardClick = (item: typeof portfolioItems[0]) => {
    // On mobile, open modal; on desktop with link, open link
    if (window.innerWidth < 768) {
      setSelectedItem(item)
      setIsModalOpen(true)
    } else if (item.link && item.link !== '#') {
      window.open(item.link, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className="relative py-16 sm:py-20 lg:py-32 bg-[#030318] overflow-hidden"
    >
      {/* Background - same as testimonials */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-950/15 via-transparent to-transparent" />

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
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            Portfolio
          </span>
        </div>

        {/* Section Header */}
        <div className="max-w-3xl mb-10 sm:mb-16">
          <h2
            className={cn(
              "text-2xl sm:text-3xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 transition-all duration-700",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
            style={{ fontFamily: 'var(--font-garet), system-ui, sans-serif' }}
          >
            Where code meets innovation.
          </h2>
          <p
            className={cn(
              "text-sm sm:text-base lg:text-lg text-white/60 leading-relaxed transition-all duration-700 delay-100",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
            style={{ fontFamily: 'var(--font-poppins)' }}
          >
            From robotics leadership to freelance web solutions — each project built with precision and purpose.
          </p>
        </div>

        {/* Bento Grid with Glass Liquid Effect - Increased heights for better content fit on mobile */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 auto-rows-[200px] sm:auto-rows-[240px] lg:auto-rows-[260px]">
          {portfolioItems.map((item, index) => {
            const Icon = item.icon
            const isLarge = item.span.includes('row-span-2')

            return (
              <div
                key={item.title}
                className={cn(
                  "group relative rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-500 cursor-pointer",
                  "border border-blue-400/[0.15]",
                  "hover:border-blue-400/[0.35] hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(100,149,237,0.25)]",
                  item.span,
                  activeCard === index && "z-10",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12",
                )}
                style={{
                  transitionDelay: `${150 + index * 80}ms`,
                }}
                onMouseMove={(e) => handleMouseMove(e, index)}
                onMouseLeave={() => setActiveCard(null)}
                onClick={() => handleCardClick(item)}
              >
                {/* Glass Liquid Background */}
                <div className="absolute inset-0 bg-[#030318]/60 backdrop-blur-2xl" />
                
                {/* Animated liquid gradient overlay */}
                <div 
                  className="absolute inset-0 opacity-50 group-hover:opacity-70 transition-opacity duration-500"
                  style={{
                    background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(139, 92, 246, 0.2) 50%, rgba(6, 182, 212, 0.15) 100%)',
                  }}
                />
                
                {/* Glass reflection effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.12] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Inner glow */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-500/10 via-transparent to-transparent" />

                {/* Radial spotlight on hover */}
                {activeCard === index && (
                  <div
                    className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                    style={{
                      background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.2), transparent 40%)`,
                    }}
                  />
                )}

                <div className={cn(
                  "relative p-3 sm:p-4 lg:p-5 h-full flex flex-col z-10",
                  "justify-between"
                )}>
                  {/* Top section */}
                  <div className="flex-1 min-h-0 overflow-hidden">
                    {/* Icon with glass effect */}
                    <div className={cn(
                      "w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center mb-2 transition-all duration-300",
                      "bg-blue-500/15 backdrop-blur-sm border border-blue-400/25",
                      "group-hover:bg-blue-500/25 group-hover:scale-110"
                    )}>
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-blue-300" />
                    </div>

                    {/* Category - hidden on very small cards */}
                    <span
                      className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[8px] sm:text-[10px] text-blue-300/80 bg-blue-500/15 backdrop-blur-sm border border-blue-400/15 mb-1"
                      style={{ fontFamily: 'var(--font-inter)' }}
                    >
                      {item.category}
                    </span>

                    {/* Title - Clear & Visible */}
                    <h3
                      className={cn(
                        "font-bold text-white transition-colors duration-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] line-clamp-2",
                        isLarge ? "text-sm sm:text-base lg:text-xl" : "text-xs sm:text-sm lg:text-base",
                        activeCard === index && "text-blue-200"
                      )}
                      style={{ fontFamily: 'var(--font-garet), system-ui, sans-serif' }}
                    >
                      {item.title}
                    </h3>

                    {/* Description - Truncated for mobile */}
                    <p
                      className={cn(
                        "text-white/70 leading-snug mt-1 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]",
                        isLarge ? "text-[10px] sm:text-xs line-clamp-3 sm:line-clamp-4" : "text-[9px] sm:text-xs line-clamp-2 sm:line-clamp-3",
                        "group-hover:text-white/90 transition-colors duration-300"
                      )}
                      style={{ fontFamily: 'var(--font-poppins)' }}
                    >
                      {item.description}
                    </p>
                  </div>

                  {/* Bottom section - Tags */}
                  <div className="flex flex-wrap items-center gap-1 mt-2 pt-2 border-t border-blue-400/10">
                    {item.tags.slice(0, isLarge ? 2 : 1).map((tag) => (
                      <span
                        key={tag}
                        className="px-1.5 py-0.5 rounded-full text-[7px] sm:text-[9px] text-blue-200/80 bg-blue-500/20 backdrop-blur-sm border border-blue-400/20"
                        style={{ fontFamily: 'var(--font-inter)' }}
                      >
                        {tag}
                      </span>
                    ))}
                    {item.link && item.link !== '#' && (
                      <span className="ml-auto opacity-70 group-hover:opacity-100 transition-opacity duration-300 text-blue-300 hidden sm:block">
                        <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                      </span>
                    )}
                  </div>
                </div>

                {/* Bottom border glow */}
                <div
                  className={cn(
                    "absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 transition-opacity duration-300",
                    activeCard === index ? "opacity-100" : "opacity-0"
                  )}
                />

                {/* Corner accents for glass effect */}
                <div className="absolute top-0 left-0 w-8 h-8 border-l border-t border-white/15 rounded-tl-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-r border-b border-white/15 rounded-br-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            )
          })}
        </div>
      </div>

      {/* Mobile Popup Modal */}
      <PortfolioModal 
        item={selectedItem} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </section>
  )
}
