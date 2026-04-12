"use client"

import { useRef, useEffect, useState, memo, useMemo } from 'react'
import { cn } from '@/lib/utils'
import { Bot, Globe, Briefcase, Rocket, Award, Users } from 'lucide-react'
import Image from 'next/image'

const pillTags = [
  'CTO · Agni Robotics',
  'Founder · Specularis',
  'Technical Consultant',
  'Agentic AI & ROS Specialist',
  'Edge AI Engineer',
  'Full Stack Developer',
  'Backend Architect',
  'Solution Architect',
  'Expert Web Architect'
]

const statCards = [
  { icon: Award, label: 'State-Level Wins', value: '2', color: 'cyan' },
  { icon: Bot, label: 'Robotics & AI Projects', value: '2+', color: 'blue' },
  { icon: Globe, label: 'Production Websites', value: '4+', color: 'purple' },
  { icon: Users, label: 'Technical Mentorships', value: '10+', color: 'green' },
]

const colorClasses: Record<string, string> = {
  cyan: 'from-cyan-500/20 to-cyan-500/5 border-cyan-500/30 text-cyan-400',
  blue: 'from-blue-500/20 to-blue-500/5 border-blue-500/30 text-blue-400',
  purple: 'from-purple-500/20 to-purple-500/5 border-purple-500/30 text-purple-400',
  green: 'from-green-500/20 to-green-500/5 border-green-500/30 text-green-400',
}

export default function ProfileSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect() // Stop observing once visible
        }
      },
      { threshold: 0.15, rootMargin: '50px' }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="profile"
      ref={sectionRef}
      className="relative py-16 sm:py-20 lg:py-32 bg-[#030318] overflow-hidden"
    >
      {/* Background - same as testimonials */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-950/15 via-transparent to-transparent" />
      
      {/* Floating orbs */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl animate-float-3d" />
      <div className="absolute bottom-20 left-20 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl animate-morph" />

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
            About Me
          </span>
        </div>

        {/* Main Content Grid - Photo on Right */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          {/* Left Column - Text Content */}
          <div className="flex flex-col gap-6 sm:gap-8 order-2 lg:order-1">
            {/* Name and Title */}
            <div
              className={cn(
                "transition-all duration-700",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
            >
              <h2
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-3"
                style={{ fontFamily: 'var(--font-garet), system-ui, sans-serif' }}
              >
                Abhiram Ramakrishnan
              </h2>
              <p 
                className="text-blue-400/80 text-base sm:text-lg"
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                CTO | AI & Robotics Engineer | Full Stack Developer
              </p>
              {/* Company badges */}
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30">
                  <Rocket className="w-3.5 h-3.5 text-orange-400" />
                  <span className="text-xs text-orange-300" style={{ fontFamily: 'var(--font-inter)' }}>
                    Agni Robotics
                  </span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-green-500/20 to-teal-500/20 border border-green-500/30">
                  <Briefcase className="w-3.5 h-3.5 text-green-400" />
                  <span className="text-xs text-green-300" style={{ fontFamily: 'var(--font-inter)' }}>
                    Freelance Studio
                  </span>
                </div>
              </div>
            </div>

            {/* Bio Card */}
            <div
              className={cn(
                "transition-all duration-700 delay-100 group relative",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div
                className={cn(
                  "relative p-5 sm:p-6 lg:p-8 rounded-2xl cursor-pointer",
                  "bg-blue-500/[0.03] backdrop-blur-xl border border-blue-400/[0.1]",
                  "group-hover:-translate-y-2 transition-all duration-500 ease-out",
                  "group-hover:shadow-[0_30px_60px_rgba(0,0,0,0.5),0_0_80px_rgba(100,149,237,0.15)]",
                  "group-hover:border-blue-400/[0.25]"
                )}
              >
                {/* Decorative corner elements */}
                <div className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-blue-500/20 rounded-tl-2xl" />
                <div className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-purple-500/20 rounded-br-2xl" />
                
                <p
                  className="relative text-sm sm:text-base lg:text-lg text-white/70 leading-relaxed group-hover:text-white/85 transition-colors duration-300 mb-4"
                  style={{ fontFamily: 'var(--font-poppins)' }}
                >
                  As a technologist and entrepreneur with a track record of state-level innovation, I operate at the intersection of Robotics, Agentic AI, and Full-Stack Engineering. I serve as the CTO of Agni Robotics, leading the development of autonomous systems and edge AI, and as the Founder of Specularis, where I architect scalable web solutions for real-world impact.
                </p>
                <p
                  className="relative text-sm sm:text-base lg:text-lg text-white/70 leading-relaxed group-hover:text-white/85 transition-colors duration-300"
                  style={{ fontFamily: 'var(--font-poppins)' }}
                >
                  Driven by a deep interest in CS fundamentals and cutting-edge technology, I bridge the gap between hardware intelligence and modern web ecosystems. Beyond building, I act as a technical consultant and advisor, leveraging a logic-driven approach to debugging and strategic oversight to transform complex technical challenges into production-ready reality.
                </p>
              </div>
            </div>

            {/* Pill Tags with stagger animation */}
            <div
              className={cn(
                "flex flex-wrap gap-2 sm:gap-3 transition-all duration-700 delay-400",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
            >
              {pillTags.map((tag, index) => (
                <span
                  key={tag}
                  className={cn(
                    "px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm text-blue-200/70 glass transition-all duration-500",
                    "hover:text-white hover:bg-blue-500/20 hover:scale-105 hover:shadow-[0_0_20px_rgba(100,149,237,0.2)]",
                    isVisible && "animate-fade-in-scale"
                  )}
                  style={{
                    fontFamily: 'var(--font-inter)',
                    animationDelay: `${500 + index * 80}ms`,
                    animationFillMode: 'both',
                    opacity: 0
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Right Column - Photo and Stats */}
          <div
            className={cn(
              "flex flex-col gap-6 transition-all duration-1000 delay-200 order-1 lg:order-2",
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
            )}
          >
            {/* Photo Container */}
            <div className="relative group">
              <div className="relative w-full aspect-[5/4] sm:aspect-[4/3] lg:aspect-[5/4] max-w-sm mx-auto lg:max-w-none rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-blue-400/20 group-hover:border-blue-400/40 transition-all duration-500">
                {/* Profile Photo */}
                <Image
                  src="https://res.cloudinary.com/dqrpav05c/image/upload/v1775975430/cum2ofkl5qzlmym20fdk.png"
                  alt="Abhiram Ramakrishnan - CTO & Full Stack Developer"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  priority
                />
                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#030318]/60 via-transparent to-transparent opacity-60" />
              </div>
              {/* Glow effect */}
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
              {/* Decorative corners */}
              <div className="absolute -bottom-3 -right-3 w-12 h-12 border-r-2 border-b-2 border-blue-500/40 rounded-br-2xl" />
              <div className="absolute -top-3 -left-3 w-12 h-12 border-l-2 border-t-2 border-purple-500/40 rounded-tl-2xl" />
            </div>

            {/* Stats Grid - Below Photo */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {statCards.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <div
                    key={stat.label}
                    className={cn(
                      "group relative p-4 sm:p-5 rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-500",
                      "bg-gradient-to-br border backdrop-blur-xl",
                      colorClasses[stat.color],
                      "hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
                    )}
                    style={{
                      animationDelay: `${400 + index * 100}ms`,
                    }}
                  >
                    {/* Animated background pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute top-0 right-0 w-16 h-16 bg-current rounded-full blur-2xl animate-pulse" />
                    </div>

                    <Icon className={cn("w-6 h-6 sm:w-8 sm:h-8 mb-2 transition-transform duration-300 group-hover:scale-110", `text-${stat.color}-400`)} />
                    
                    <div className="relative">
                      <p 
                        className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-0.5"
                        style={{ fontFamily: 'var(--font-garet)' }}
                      >
                        {stat.value}
                      </p>
                      <p 
                        className="text-[10px] sm:text-xs text-white/50"
                        style={{ fontFamily: 'var(--font-inter)' }}
                      >
                        {stat.label}
                      </p>
                    </div>

                    {/* Hover glow */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                      <div className="absolute inset-0 bg-gradient-to-t from-current/10 to-transparent" />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
