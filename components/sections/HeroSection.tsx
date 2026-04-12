"use client"

import { useState, useEffect, Suspense, Component, type ReactNode, useCallback, useRef, memo } from 'react'
import { ArrowRight, ChevronDown } from 'lucide-react'
import dynamic from 'next/dynamic'
import { cn } from '@/lib/utils'
import type { SplineProps } from '@splinetool/react-spline'

// Suppress Spline "Missing property" console warnings - only once
if (typeof window !== 'undefined' && !(window as unknown as { __splineWarningsPatched?: boolean }).__splineWarningsPatched) {
  (window as unknown as { __splineWarningsPatched?: boolean }).__splineWarningsPatched = true
  const originalWarn = console.warn
  const originalError = console.error
  console.warn = (...args: unknown[]) => {
    if (typeof args[0] === 'string' && args[0].includes('Missing property')) return
    originalWarn.apply(console, args)
  }
  console.error = (...args: unknown[]) => {
    if (typeof args[0] === 'string' && args[0].includes('Missing property')) return
    originalError.apply(console, args)
  }
}

// Error boundary to suppress Spline internal warnings
class SplineErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }
  static getDerivedStateFromError() {
    return { hasError: true }
  }
  componentDidCatch() {
    // Suppress Spline internal errors
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-blue-400/30 border-t-blue-400 rounded-full animate-pulse" />
        </div>
      )
    }
    return this.props.children
  }
}

// Lazy load Spline with intersection observer trigger
const Spline = dynamic(
  () => import('@splinetool/react-spline').then(mod => mod.default),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-blue-400/30 border-t-blue-400 rounded-full animate-spin" />
      </div>
    )
  }
) as React.ComponentType<SplineProps>

const rotatingWords = [
  { word: 'Full Stack Solutions', gradient: 'gradient-fullstack' },
  { word: 'ROS & Robotics', gradient: 'gradient-robotics' },
  { word: 'AI Systems', gradient: 'gradient-ai' },
  { word: 'Autonomous Tech', gradient: 'gradient-ros' },
  { word: 'Web Experiences', gradient: 'gradient-freelance' },
]

// Memoized scroll indicator to prevent re-renders
const ScrollIndicator = memo(function ScrollIndicator() {
  return (
    <div
      className="fixed lg:absolute bottom-[2svh] lg:bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 lg:gap-3 opacity-0 animate-fade-in gpu-accelerate"
      style={{ animationDelay: '1.2s', animationFillMode: 'forwards' }}
    >
      <span
        className="text-[8px] lg:text-[10px] text-white/40 tracking-[0.2em] uppercase animate-pulse-subtle"
        style={{ fontFamily: 'var(--font-inter)' }}
      >
        Scroll
      </span>
      <div className="relative flex flex-col items-center">
        <div className="absolute -top-1 w-3 lg:w-4 h-3 lg:h-4 rounded-full border border-blue-400/30 animate-ping-slow" />
        <div className="absolute -top-1 w-3 lg:w-4 h-3 lg:h-4 rounded-full border border-purple-400/20 animate-ping-slower" />
        <div className="relative w-1.5 lg:w-2 h-1.5 lg:h-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 shadow-[0_0_10px_rgba(100,149,237,0.5)]" />
        <div className="relative w-px h-5 lg:h-10 mt-1 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-400/60 via-purple-400/40 to-transparent animate-scroll-line" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/20 to-transparent animate-scroll-shimmer" />
        </div>
        <div className="flex flex-col items-center -mt-0.5 lg:-mt-1">
          <ChevronDown className="w-2.5 lg:w-3.5 h-2.5 lg:h-3.5 text-blue-400/50 animate-chevron-1" />
          <ChevronDown className="w-2.5 lg:w-3.5 h-2.5 lg:h-3.5 -mt-1.5 lg:-mt-2 text-purple-400/30 animate-chevron-2" />
        </div>
      </div>
    </div>
  )
})

export default function HeroSection() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [splineLoaded, setSplineLoaded] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setIsAnimating(true)
      timeoutRef.current = setTimeout(() => {
        setCurrentWordIndex((prev) => (prev + 1) % rotatingWords.length)
        setIsAnimating(false)
      }, 500)
    }, 3000)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  const currentWord = rotatingWords[currentWordIndex] || rotatingWords[0]

  return (
    <section
      id="hero"
      className="relative h-[100svh] w-full overflow-hidden"
      style={{ backgroundColor: '#030318' }}
    >
      {/* Background - same as testimonials theme */}
      <div className="absolute inset-0 z-0 bg-[#030318]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-950/15 via-transparent to-transparent" />

      {/* Content Layout - Desktop: Text Left (centered), Spline Right | Mobile: Spline Top (centered), Text Bottom */}
      <div className="relative z-[1] flex flex-col lg:flex-row min-h-[100svh] lg:h-full pt-[18svh] lg:pt-0">

        {/* Mobile: Spline on top - fixed height for consistency across devices */}
        <div className="lg:hidden h-[35svh] shrink-0 relative flex items-end justify-center pt-0">
          <div className="w-full h-[130%] max-w-lg mx-auto translate-x-8 translate-y-16">
            <SplineErrorBoundary>
              <Suspense fallback={
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 border-4 border-blue-400/30 border-t-blue-400 rounded-full animate-spin" />
                </div>
              }>
                <Spline
                  scene="https://prod.spline.design/FhmHcmbj-UHalrCA/scene.splinecode"
                  onLoad={() => setSplineLoaded(true)}
                  className={cn(
                    "w-full h-full transition-opacity duration-1000 scale-110",
                    splineLoaded ? "opacity-100" : "opacity-0"
                  )}
                />
              </Suspense>
            </SplineErrorBoundary>
          </div>
          {/* Gradient fade at bottom for smooth transition */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#030318] to-transparent" />
        </div>

        {/* Text Content - Left aligned on both desktop and mobile, ensure fits on mobile */}
        <div className="shrink-0 lg:flex-1 flex items-start lg:items-center justify-start px-4 sm:px-6 lg:px-12 lg:max-w-[55%] pt-2 pb-20 lg:py-0">
          <div className="flex flex-col items-start text-left gap-1.5 sm:gap-2 lg:gap-5 max-w-2xl">
            {/* Eyebrow with glow - smaller text */}
            <div
              className="inline-flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-0.5 sm:py-1.5 rounded-full w-fit glass animate-fade-in-scale animate-border-flow border"
              style={{ animationDelay: '0.2s' }}
            >

              <span
                className="text-[8px] sm:text-xs text-white/70 tracking-wide"
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                CTO · Full Stack · AI Developer · Freelancer
              </span>
            </div>

            {/* Main Headline - smaller */}
            <h1
              className="text-[22px] sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-bold leading-tight tracking-tight opacity-0 animate-slide-up-bounce"
              style={{
                fontFamily: 'var(--font-garet), system-ui, sans-serif',
                animationDelay: '0.4s',
                animationFillMode: 'forwards'
              }}
            >
              <span className="text-white" style={{ fontFamily: '"Montserrat", sans-serif' }}>Hi, I&apos;m</span>
              <br />
              <span
                className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent animate-text-shimmer"
                style={{ fontFamily: '"Montserrat", sans-serif', backgroundSize: '200% auto' }}
              >
                Abhiram Ramakrishnan
              </span>
            </h1>

            {/* Rotating text line - slightly smaller than name */}
            <div
              className="opacity-0 animate-slide-up"
              style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}
            >
              <span className="text-white/90 text-[18px] sm:text-2xl md:text-3xl lg:text-3xl xl:text-4xl font-semibold" style={{ fontFamily: '"Montserrat", sans-serif' }}>
                Crafting{' '}
              </span>
              <br className="sm:hidden" />
              <span
                className={cn(
                  "inline-block transition-all duration-500 text-[18px] sm:text-2xl md:text-3xl lg:text-3xl xl:text-4xl font-bold",
                  currentWord.gradient,
                  isAnimating ? "opacity-0 translate-y-4 scale-95 blur-sm" : "opacity-100 translate-y-0 scale-100 blur-0"
                )}
                style={{
                  fontFamily: '"Montserrat", sans-serif',
                  lineHeight: '1.3em',
                }}
              >
                {currentWord.word}
              </span>
            </div>

            {/* CTAs */}
            <div
              className="flex flex-row gap-2 sm:gap-4 mt-1 sm:mt-4 opacity-0 animate-slide-up-bounce"
              style={{ animationDelay: '0.7s', animationFillMode: 'forwards' }}
            >
              <a
                href="#portfolio"
                onClick={(e) => {
                  e.preventDefault()
                  document.querySelector('#portfolio')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="group relative inline-flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-8 py-2 sm:py-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white text-[10px] sm:text-base font-semibold transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(100,149,237,0.4)] overflow-hidden"
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative whitespace-nowrap">View My Work</span>
                <ArrowRight className="relative w-3 h-3 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </a>

              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault()
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="group inline-flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-8 py-2 sm:py-4 rounded-full border border-blue-400/30 text-white text-[10px] sm:text-base font-medium transition-all duration-300 hover:bg-blue-500/10 hover:border-blue-400/60 animate-border-flow"
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                <span className="whitespace-nowrap">{"Let's Connect"}</span>
              </a>
            </div>

          </div>
        </div>

        {/* Scroll Indicator - fixed position from bottom of viewport on mobile, absolute on desktop */}
        <div
          className="fixed lg:absolute bottom-[2svh] lg:bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 lg:gap-3 opacity-0 animate-fade-in"
          style={{ animationDelay: '1.2s', animationFillMode: 'forwards' }}
        >
          <span
            className="text-[8px] lg:text-[10px] text-white/40 tracking-[0.2em] uppercase animate-pulse-subtle"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            Scroll
          </span>
          <div className="relative flex flex-col items-center">
            <div className="absolute -top-1 w-3 lg:w-4 h-3 lg:h-4 rounded-full border border-blue-400/30 animate-ping-slow" />
            <div className="absolute -top-1 w-3 lg:w-4 h-3 lg:h-4 rounded-full border border-purple-400/20 animate-ping-slower" />
            <div className="relative w-1.5 lg:w-2 h-1.5 lg:h-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 shadow-[0_0_10px_rgba(100,149,237,0.5)]" />
            <div className="relative w-px h-5 lg:h-10 mt-1 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-blue-400/60 via-purple-400/40 to-transparent animate-scroll-line" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/20 to-transparent animate-scroll-shimmer" />
            </div>
            <div className="flex flex-col items-center -mt-0.5 lg:-mt-1">
              <ChevronDown className="w-2.5 lg:w-3.5 h-2.5 lg:h-3.5 text-blue-400/50 animate-chevron-1" />
              <ChevronDown className="w-2.5 lg:w-3.5 h-2.5 lg:h-3.5 -mt-1.5 lg:-mt-2 text-purple-400/30 animate-chevron-2" />
            </div>
          </div>
        </div>

        {/* Desktop: Spline on right */}
        <div className="hidden lg:flex flex-1 relative items-center justify-center">
          <SplineErrorBoundary>
            <Suspense fallback={
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 border-4 border-blue-400/30 border-t-blue-400 rounded-full animate-spin" />
              </div>
            }>
              <Spline
                scene="https://prod.spline.design/FhmHcmbj-UHalrCA/scene.splinecode"
                onLoad={() => setSplineLoaded(true)}
                className={cn(
                  "w-full h-full transition-opacity duration-1000",
                  splineLoaded ? "opacity-100" : "opacity-0"
                )}
              />
            </Suspense>
          </SplineErrorBoundary>
          {/* Gradient fade at left for smooth transition */}
          <div className="absolute top-0 bottom-0 left-0 w-32 bg-gradient-to-r from-[#030318] to-transparent" />
        </div>
      </div>
    </section>
  )
}
