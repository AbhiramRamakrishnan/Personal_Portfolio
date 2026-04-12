"use client"

import { useState, useEffect } from 'react'
import { Menu, X, Linkedin, Github, Instagram, Mail, ExternalLink } from 'lucide-react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '#hero', label: 'Start Here' },
  { href: '#profile', label: 'Profile' },
  { href: '#portfolio', label: 'Portfolio' },
  { href: '#expertise', label: 'Expertise' },
  { href: '#honors', label: 'Achievements' },
  { href: '#clients', label: 'Clients' },
  { href: '#testimonials', label: 'Testimonials' },
  { href: '#contact', label: "Let's Connect" },
]

const socialLinks = [
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/abhiramramakrishna/',
    icon: Linkedin,
    color: 'hover:text-blue-400 hover:border-blue-400/30',
  },
  {
    name: 'GitHub',
    href: 'https://github.com/AbhiramRamakrishnan',
    icon: Github,
    color: 'hover:text-white hover:border-white/30',
  },
  {
    name: 'Instagram',
    href: 'https://instagram.com/abhiram_ramakrishnan_',
    icon: Instagram,
    color: 'hover:text-pink-400 hover:border-pink-400/30',
  },
  {
    name: 'Email',
    href: 'mailto:abhiramramakrishna6@gmail.com',
    icon: Mail,
    color: 'hover:text-green-400 hover:border-green-400/30',
  },
]

export default function Navbar() {
  const [mounted, setMounted] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    
    // Throttled scroll handler for performance
    let ticking = false
    let lastScrollY = 0
    
    const handleScroll = () => {
      lastScrollY = window.scrollY
      
      if (!ticking) {
        requestAnimationFrame(() => {
          setIsScrolled(lastScrollY > 50)

          const sections = navLinks.map(link => link.href.slice(1))
          const scrollPosition = lastScrollY + 200

          for (let i = sections.length - 1; i >= 0; i--) {
            const section = document.getElementById(sections[i])
            if (section && section.offsetTop <= scrollPosition) {
              setActiveSection(sections[i])
              break
            }
          }
          ticking = false
        })
        ticking = true
      }
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [mounted])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMobileMenuOpen(false)
  }

  if (!mounted) {
    return null
  }

  return (
    <>
      {/* Logo - Desktop */}
      <a
        href="#hero"
        onClick={(e) => handleNavClick(e, '#hero')}
        className="fixed z-50 hidden lg:block"
        style={{
          top: isScrolled ? '12px' : '24px',
          left: isScrolled ? '24px' : '16px',
          transition: 'top 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), left 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        }}
      >
        <div className="w-10 h-10 lg:w-11 lg:h-11 xl:w-12 xl:h-12 rounded-full bg-gradient-to-br from-blue-500/30 to-purple-500/30 flex items-center justify-center border border-blue-400/20 backdrop-blur-md hover:scale-105 transition-transform overflow-hidden">
          <Image
            src="/logo.png"
            alt="Abhiram Logo"
            width={48}
            height={48}
            className="w-7 h-7 lg:w-8 lg:h-8 xl:w-10 xl:h-10 object-contain"
          />
        </div>
      </a>

      {/* Logo - Mobile */}
      <a
        href="#hero"
        onClick={(e) => handleNavClick(e, '#hero')}
        className="fixed top-4 left-4 z-50 lg:hidden"
      >
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500/30 to-purple-500/30 flex items-center justify-center border border-blue-400/20 backdrop-blur-md overflow-hidden">
          <Image
            src="/logo.png"
            alt="Abhiram Logo"
            width={40}
            height={40}
            className="w-7 h-7 object-contain"
          />
        </div>
      </a>

      {/* Desktop Navigation */}
      <nav
        className="fixed left-1/2 -translate-x-1/2 z-50 hidden lg:block max-w-[calc(100vw-280px)] xl:max-w-none"
        style={{
          top: isScrolled ? '12px' : '24px',
          transition: 'top 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        }}
      >
        <div
          className={cn(
            "flex items-center gap-0.5 px-1.5 lg:px-2 py-1.5 lg:py-2 rounded-full transition-all duration-500 whitespace-nowrap",
            "bg-blue-500/[0.05] backdrop-blur-xl border border-blue-400/[0.1]",
            "shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(100,149,237,0.1)]",
            isScrolled && "bg-blue-500/[0.08] border-blue-400/[0.15] shadow-[0_12px_40px_rgba(0,0,0,0.5)]"
          )}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={cn(
                "relative px-2 lg:px-2.5 xl:px-3 py-1.5 lg:py-2 text-[11px] lg:text-xs xl:text-sm font-medium transition-all duration-300 rounded-full whitespace-nowrap",
                "text-blue-100/60 hover:text-white",
                activeSection === link.href.slice(1) && [
                  "text-white",
                  "bg-blue-500/[0.15]",
                  "shadow-[inset_0_1px_0_rgba(100,149,237,0.2)]"
                ]
              )}
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              {link.label}
            </a>
          ))}
        </div>
      </nav>

      {/* Desktop Social Icons - Right Side */}
      <div
        className="fixed z-50 hidden lg:flex items-center gap-1"
        style={{
          top: isScrolled ? '12px' : '24px',
          right: isScrolled ? '24px' : '16px',
          transition: 'top 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), right 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        }}
      >
        <div
          className={cn(
            "flex items-center gap-0.5 lg:gap-1 px-1.5 lg:px-2 py-1.5 lg:py-2 rounded-full transition-all duration-500",
            "bg-blue-500/[0.05] backdrop-blur-xl border border-blue-400/[0.1]",
            "shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(100,149,237,0.1)]",
            isScrolled && "bg-blue-500/[0.08] border-blue-400/[0.15]"
          )}
        >
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "relative p-1.5 lg:p-2 rounded-full transition-all duration-300",
                "text-blue-100/50 border border-transparent",
                link.color
              )}
              aria-label={link.name}
            >
              <link.icon className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
            </a>
          ))}
        </div>
      </div>

      {/* Mobile Navigation - Hamburger */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className={cn(
          "fixed top-4 right-4 z-50 lg:hidden p-3 rounded-full transition-all duration-300",
          "bg-blue-500/[0.05] backdrop-blur-xl border border-blue-400/[0.1]",
          "shadow-[0_8px_32px_rgba(0,0,0,0.4)]",
          "hover:bg-blue-500/[0.1]"
        )}
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? (
          <X className="w-5 h-5 text-blue-200/80" />
        ) : (
          <Menu className="w-5 h-5 text-blue-200/80" />
        )}
      </button>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 lg:hidden transition-all duration-500",
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        <div 
          className="absolute inset-0 bg-[#030318]/95 backdrop-blur-md"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        <div
          className={cn(
            "absolute top-20 right-6 left-6 p-4 rounded-2xl transition-all duration-500 overflow-hidden max-h-[75vh]",
            "bg-gradient-to-br from-blue-500/[0.08] via-purple-500/[0.05] to-blue-500/[0.08]",
            "backdrop-blur-2xl border border-blue-400/[0.15]",
            "shadow-[0_8px_32px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(100,149,237,0.1)]",
            isMobileMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
          )}
        >
          {/* Decorative glow effects */}
          <div className="absolute -top-16 -right-16 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
          
          {/* Navigation Links */}
          <div className="relative flex flex-col gap-0.5">
            {navLinks.map((link, index) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={cn(
                  "group flex items-center justify-between px-3 py-2.5 text-xs font-medium transition-all duration-300 rounded-xl",
                  "text-blue-100/60 hover:text-white",
                  "hover:bg-gradient-to-r hover:from-blue-500/[0.1] hover:to-purple-500/[0.05]",
                  activeSection === link.href.slice(1) && [
                    "text-white",
                    "bg-gradient-to-r from-blue-500/[0.15] to-purple-500/[0.1]",
                    "border border-blue-400/[0.1]"
                  ]
                )}
                style={{ 
                  fontFamily: 'var(--font-inter)',
                  animationDelay: `${index * 50}ms`
                }}
              >
                <span>{link.label}</span>
                {activeSection === link.href.slice(1) && (
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                )}
              </a>
            ))}
          </div>
          
          {/* Divider */}
          <div className="relative my-3 h-px bg-gradient-to-r from-transparent via-blue-400/20 to-transparent" />
          
          {/* Social Links Section */}
          <div className="relative">
            <p 
              className="px-3 mb-2 text-[9px] uppercase tracking-widest text-white/30"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              Connect
            </p>
            <div className="flex items-center justify-around px-1">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "group flex flex-col items-center gap-1 p-2 rounded-xl transition-all duration-300",
                    "text-blue-100/40 hover:text-white",
                    "hover:bg-gradient-to-b hover:from-blue-500/[0.1] hover:to-transparent"
                  )}
                >
                  <div className={cn(
                    "p-2 rounded-lg transition-all duration-300",
                    "bg-blue-500/[0.08] border border-blue-400/[0.1]",
                    "group-hover:scale-110 group-hover:border-blue-400/[0.2]",
                    "group-hover:shadow-[0_0_20px_rgba(100,149,237,0.2)]"
                  )}>
                    <link.icon className="w-3.5 h-3.5" />
                  </div>
                  <span 
                    className="text-[8px] font-medium tracking-wide"
                    style={{ fontFamily: 'var(--font-inter)' }}
                  >
                    {link.name}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Bottom accent line */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/4 h-0.5 bg-gradient-to-r from-transparent via-blue-400/30 to-transparent rounded-full" />
        </div>
      </div>
    </>
  )
}
