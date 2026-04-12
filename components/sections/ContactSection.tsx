"use client"

import { useRef, useEffect, useState, useMemo, useCallback, memo } from 'react'
import { Linkedin, Github, Instagram, Mail } from 'lucide-react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

// Optimized Binary/Code rain animation component
const BinaryCodeRain = memo(function BinaryCodeRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | null>(null)
  const dropsRef = useRef<number[]>([])
  const lastTimeRef = useRef<number>(0)
  const isVisibleRef = useRef(true)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', { alpha: false })
    if (!ctx) return

    // Reduce pixel density for better performance
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
    
    const resizeCanvas = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.scale(dpr, dpr)
      
      // Reinitialize drops on resize
      const fontSize = 14
      const columns = Math.floor(width / fontSize)
      dropsRef.current = Array(columns).fill(1).map(() => Math.random() * -100)
    }
    
    // Debounced resize
    let resizeTimeout: NodeJS.Timeout
    const debouncedResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(resizeCanvas, 150)
    }
    
    resizeCanvas()
    window.addEventListener('resize', debouncedResize)

    const chars = '01<>{}[]();:=+-*/%&|!?#@$_ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const fontSize = 14
    const targetFPS = 25 // Original frame rate preserved
    const frameInterval = 1000 / targetFPS

    // Visibility API to pause when tab is hidden
    const handleVisibilityChange = () => {
      isVisibleRef.current = !document.hidden
      if (!document.hidden && animationRef.current === null) {
        lastTimeRef.current = performance.now()
        animationRef.current = requestAnimationFrame(draw)
      }
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)

    const draw = (currentTime: number) => {
      if (!isVisibleRef.current) {
        animationRef.current = null
        return
      }

      const deltaTime = currentTime - lastTimeRef.current
      
      if (deltaTime >= frameInterval) {
        lastTimeRef.current = currentTime - (deltaTime % frameInterval)
        
        const width = canvas.width / dpr
        const height = canvas.height / dpr
        
        ctx.fillStyle = 'rgba(3, 3, 24, 0.04)'
        ctx.fillRect(0, 0, width, height)

        ctx.font = `${fontSize}px monospace`
        
        const drops = dropsRef.current

        for (let i = 0; i < drops.length; i++) {
          const char = chars[Math.floor(Math.random() * chars.length)]
          const x = i * fontSize
          const y = drops[i] * fontSize

          // Simplified color selection
          const rand = Math.random()
          ctx.fillStyle = rand > 0.95 
            ? 'rgba(167, 139, 250, 0.8)' 
            : rand > 0.90 
              ? 'rgba(34, 211, 238, 0.7)' 
              : rand > 0.85 
                ? 'rgba(59, 130, 246, 0.6)' 
                : 'rgba(100, 149, 237, 0.35)'

          ctx.fillText(char, x, y)

          if (y > height && Math.random() > 0.975) {
            drops[i] = 0
          }
          drops[i] += 0.6
        }
      }
      
      animationRef.current = requestAnimationFrame(draw)
    }

    animationRef.current = requestAnimationFrame(draw)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      clearTimeout(resizeTimeout)
      window.removeEventListener('resize', debouncedResize)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 opacity-75"
      style={{ willChange: 'transform' }}
    />
  )
})

// Memoized floating code snippets
const codeSnippets = [
  'const ai = await init();',
  'function robot() {}',
  'npm run build',
  '<Component />',
  'git push origin',
  'async/await',
  'useState()',
  'ROS2 node',
  'docker run',
  'API.fetch()',
]

const FloatingCodeBits = memo(function FloatingCodeBits() {
  return (
    <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none">
      {codeSnippets.map((snippet, i) => (
        <div
          key={i}
          className="absolute text-xs sm:text-sm text-blue-400/40 font-mono whitespace-nowrap animate-float-code gpu-accelerate"
          style={{
            left: `${10 + (i * 10) % 80}%`,
            top: `${5 + (i * 12) % 85}%`,
            animationDelay: `${i * 0.7}s`,
            animationDuration: `${15 + i * 2}s`,
          }}
        >
          {snippet}
        </div>
      ))}
    </div>
  )
})

const socialLinks = [
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/abhiramramakrishna',
    icon: Linkedin,
  },
  {
    name: 'GitHub',
    href: 'https://github.com/AbhiramRamakrishnan',
    icon: Github,
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/abhiram_ramakrishnan_',
    icon: Instagram,
  },
  {
    name: 'Email Me',
    href: 'mailto:abhiramramakrishna6@gmail.com',
    icon: Mail,
  },
]

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

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
      id="contact"
      ref={sectionRef}
      className="relative min-h-screen bg-[#030318] overflow-hidden"
    >
      {/* Binary code rain background */}
      <BinaryCodeRain />
      
      {/* Floating code snippets */}
      <FloatingCodeBits />

      {/* Gradient overlays - lighter for more visible animation */}
      <div className="absolute inset-0 z-[2] bg-gradient-to-b from-[#030318]/70 via-transparent to-[#030318]/80" />
      <div className="absolute inset-0 z-[2] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-950/20 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex items-start sm:items-center justify-center min-h-screen pt-20 sm:pt-0 pb-32 sm:pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          {/* Section Eyebrow */}
          <div
            className={cn(
              "flex justify-start mb-6 sm:mb-8 lg:mb-12 transition-all duration-700",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-xs sm:text-sm text-white/60"
              style={{ fontFamily: 'var(--font-inter)' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              {"Let's Connect"}
            </span>
          </div>

          <div className="max-w-3xl">
            {/* Section Heading */}
            <h2
              className={cn(
                "text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-3 sm:mb-6 leading-tight transition-all duration-700",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
              style={{ fontFamily: 'var(--font-garet), system-ui, sans-serif' }}
            >
              <span className="block sm:inline">Your vision, my engineering</span>{' '}
              <span className="block sm:inline bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent animate-text-shimmer" style={{ backgroundSize: '200% auto' }}>
                {"— let's connect"}
              </span>
            </h2>

            {/* Description */}
            <p
              className={cn(
                "text-xs sm:text-sm lg:text-base text-white/60 leading-relaxed mb-8 sm:mb-8 lg:mb-10 max-w-2xl transition-all duration-700 delay-100",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
              style={{ fontFamily: 'var(--font-poppins)' }}
            >
              {"From CTO advisory and full-stack builds to ROS, AI integration, and stunning web design — I help bring your vision online."}
            </p>

            {/* CTA Buttons */}
            <div
              className={cn(
                "flex flex-row flex-wrap justify-start gap-2 sm:gap-3 transition-all duration-700 delay-200",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
            >
              {socialLinks.map((link, index) => {
                const Icon = link.icon
                
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "group flex items-center justify-center transition-all duration-300",
                      "bg-blue-500/[0.05] backdrop-blur-xl border border-blue-400/[0.15]",
                      "hover:bg-blue-500/[0.12] hover:border-blue-400/[0.3] hover:scale-105",
                      "hover:shadow-[0_0_40px_rgba(100,149,237,0.2)]",
                      "w-10 h-10 sm:w-12 sm:h-12 rounded-full",
                      "lg:w-auto lg:h-auto lg:px-5 lg:py-3 lg:gap-2"
                    )}
                    style={{
                      transitionDelay: `${300 + index * 80}ms`,
                    }}
                  >
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-blue-300/60 group-hover:text-blue-400 transition-colors flex-shrink-0" />
                    <span
                      className="text-sm text-white/80 group-hover:text-white transition-all duration-300 hidden lg:inline whitespace-nowrap"
                      style={{ fontFamily: 'var(--font-inter)' }}
                    >
                      {link.name}
                    </span>
                  </a>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-0 left-0 right-0 z-10 py-6 sm:py-8 border-t border-blue-400/[0.1] bg-[#030318]/95 backdrop-blur-md">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Brand Left */}
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-blue-500/30 to-purple-500/30 flex items-center justify-center border border-blue-400/20 overflow-hidden">
                <Image
                  src="/logo.png"
                  alt="Abhiram Logo"
                  width={40}
                  height={40}
                  className="w-7 h-7 sm:w-8 sm:h-8 object-contain"
                />
              </div>
              <div>
                <p className="text-sm sm:text-base text-white/80 font-medium" style={{ fontFamily: 'var(--font-inter)' }}>
                  Abhiram Ramakrishnan
                </p>
                <p className="text-[10px] sm:text-xs text-blue-300/40" style={{ fontFamily: 'var(--font-inter)' }}>
                  CTO · Full Stack · AI · Freelancer
                </p>
              </div>
            </div>

            {/* Center - Quick Links */}
            <div className="flex items-center gap-4 sm:gap-6">
              {['Portfolio', 'Expertise', 'Contact'].map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="text-xs sm:text-sm text-blue-200/40 hover:text-blue-200/80 transition-colors"
                  style={{ fontFamily: 'var(--font-inter)' }}
                >
                  {link}
                </a>
              ))}
            </div>

            {/* Right side - Copyright */}
            <p className="text-[10px] sm:text-xs text-blue-200/40" style={{ fontFamily: 'var(--font-inter)' }}>
              © 2025 Abhiram Ramakrishnan. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes float-code {
          0%, 100% {
            transform: translateY(0) translateX(0) rotate(0deg);
            opacity: 0.2;
          }
          25% {
            transform: translateY(-20px) translateX(10px) rotate(2deg);
            opacity: 0.4;
          }
          50% {
            transform: translateY(-10px) translateX(-5px) rotate(-1deg);
            opacity: 0.2;
          }
          75% {
            transform: translateY(-30px) translateX(15px) rotate(1deg);
            opacity: 0.3;
          }
        }
        .animate-float-code {
          animation: float-code 20s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}
