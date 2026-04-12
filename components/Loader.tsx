"use client"

import { useState, useEffect, useRef, memo } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface LoaderProps {
  onComplete: () => void
}

export default function Loader({ onComplete }: LoaderProps) {
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [isMovingLogo, setIsMovingLogo] = useState(false)
  const [logoPosition, setLogoPosition] = useState({ x: 0, y: 0, scale: 1 })
  const logoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const duration = 2500
    const interval = 30
    const steps = duration / interval
    let currentStep = 0

    const timer = setInterval(() => {
      currentStep++
      const linear = currentStep / steps
      const eased = 1 - Math.pow(1 - linear, 3)
      setProgress(Math.min(Math.round(eased * 100), 100))

      if (currentStep >= steps) {
        clearInterval(timer)
        setIsComplete(true)
      }
    }, interval)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (isComplete && logoRef.current) {
      const logoRect = logoRef.current.getBoundingClientRect()
      const logoCenterX = logoRect.left + logoRect.width / 2
      const logoCenterY = logoRect.top + logoRect.height / 2
      
      const targetX = 16 + 24
      const targetY = 24 + 24
      
      const translateX = targetX - logoCenterX
      const translateY = targetY - logoCenterY
      
      const currentSize = logoRect.width
      const targetSize = 48
      const scale = targetSize / currentSize
      
      setTimeout(() => {
        setIsMovingLogo(true)
        setLogoPosition({ x: translateX, y: translateY, scale })
      }, 200)
      
      const completeTimeout = setTimeout(() => {
        onComplete()
      }, 1000)

      return () => {
        clearTimeout(completeTimeout)
      }
    }
  }, [isComplete, onComplete])

  // Calculate dial rotation based on progress
  const dialRotation = (progress / 100) * 360

  return (
    <div
      className={cn(
        "fixed inset-0 z-[100] bg-[#030318] flex flex-col items-center justify-center transition-opacity duration-300",
        isMovingLogo && "bg-transparent pointer-events-none"
      )}
      style={{
        opacity: isMovingLogo ? 0 : 1,
        transitionDelay: isMovingLogo ? '400ms' : '0ms',
      }}
    >
      {/* Logo with dial loader */}
      <div
        ref={logoRef}
        className={cn(
          "relative w-28 h-28 sm:w-36 sm:h-36 lg:w-44 lg:h-44 flex items-center justify-center",
          isMovingLogo && "transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]"
        )}
        style={{
          transform: isMovingLogo 
            ? `translate(${logoPosition.x}px, ${logoPosition.y}px) scale(${logoPosition.scale})` 
            : 'translate(0, 0) scale(1)',
          zIndex: 101,
        }}
      >
        {/* Dial loader ring - outer */}
        {!isMovingLogo && (
          <svg 
            className="absolute inset-0 w-full h-full -rotate-90"
            viewBox="0 0 100 100"
          >
            {/* Background track */}
            <circle
              cx="50"
              cy="50"
              r="46"
              fill="none"
              stroke="rgba(100, 149, 237, 0.1)"
              strokeWidth="2"
            />
            {/* Progress arc */}
            <circle
              cx="50"
              cy="50"
              r="46"
              fill="none"
              stroke="url(#dialGradient)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray={`${(progress / 100) * 289} 289`}
              className="transition-all duration-100 ease-out"
            />
            {/* Tick marks */}
            {Array.from({ length: 60 }).map((_, i) => {
              const angle = (i / 60) * 360
              const isActive = (i / 60) * 100 <= progress
              const isMajor = i % 5 === 0
              return (
                <line
                  key={i}
                  x1="50"
                  y1={isMajor ? "6" : "8"}
                  x2="50"
                  y2={isMajor ? "10" : "10"}
                  stroke={isActive ? "rgba(100, 149, 237, 0.8)" : "rgba(100, 149, 237, 0.15)"}
                  strokeWidth={isMajor ? "1.5" : "0.5"}
                  transform={`rotate(${angle} 50 50)`}
                  className="transition-all duration-100"
                />
              )
            })}
            {/* Gradient definition */}
            <defs>
              <linearGradient id="dialGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#60a5fa" />
                <stop offset="50%" stopColor="#a78bfa" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
            </defs>
          </svg>
        )}

        {/* Dial needle indicator */}
        {!isMovingLogo && (
          <div 
            className="absolute w-full h-full"
            style={{ transform: `rotate(${dialRotation - 90}deg)` }}
          >
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-1 h-3 bg-gradient-to-b from-blue-400 to-purple-500 rounded-full shadow-[0_0_10px_rgba(100,149,237,0.8)]" />
          </div>
        )}

        {/* Inner circle with logo */}
        <div className={cn(
          "relative w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-full flex items-center justify-center overflow-hidden",
          "bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-400/30"
        )}>
          <Image
            src="/logo.png"
            alt="Abhiram Logo"
            width={80}
            height={80}
            className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 object-contain"
            priority
          />
        </div>
        
        {/* Glow effect */}
        {!isMovingLogo && (
          <div className="absolute inset-0 -z-10 blur-3xl opacity-40 bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-500 animate-pulse rounded-full" />
        )}
      </div>

      {/* Progress container */}
      <div
        className={cn(
          "mt-10 flex flex-col items-center gap-4 transition-all duration-300",
          (isComplete || isMovingLogo) && "opacity-0 translate-y-4"
        )}
      >
        {/* Percentage in center style */}
        <div className="flex items-baseline gap-1">
          <span 
            className="text-4xl sm:text-5xl font-light text-blue-200 tabular-nums tracking-tight"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            {progress}
          </span>
          <span 
            className="text-xl sm:text-2xl text-blue-400/60"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            %
          </span>
        </div>

        {/* Loading text */}
        <span 
          className="text-xs sm:text-sm text-blue-300/40 tracking-widest uppercase"
          style={{ fontFamily: 'var(--font-inter)' }}
        >
          Loading
        </span>
      </div>

      {/* Animated background elements */}
      {!isMovingLogo && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>
      )}
    </div>
  )
}
