"use client"

import { useRef, useEffect, useState, useCallback } from 'react'
import { Award, Trophy, Sparkles as SparklesIcon } from 'lucide-react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import CardSwap, { CardSwapHandle } from '@/components/CardSwap'

const awards = [
  {
    title: "YIP 8.0 — State Level Winner",
    organizer: "Kerala Government",
    year: "2026",
    description: "The Young Innovators Programme is one of Kerala's most competitive innovation challenges. Being selected among 31 from over 1,400 ideas is a validation of the depth and originality of the Agni Robotics concept.",
    highlight: "31 selected out of 1,400+ ideas",
    color: 'amber',
    Icon: Trophy,
    photos: ['https://res.cloudinary.com/dqrpav05c/image/upload/v1776014662/s7ujvzgqlbmzf6zdomna.svg','https://res.cloudinary.com/dqrpav05c/image/upload/v1775994961/nrtaevwy3g2rtl4xnpbh.svg', 'https://res.cloudinary.com/dqrpav05c/image/upload/v1775994367/rgxbbxusuh3rwsxlcju6.svg', 'https://res.cloudinary.com/dqrpav05c/image/upload/v1775995344/zfapvgwcydyowpkm2vsv.svg', 'https://res.cloudinary.com/dqrpav05c/image/upload/v1775994711/cbx64riep7auoah3k0ap.svg', 'https://res.cloudinary.com/dqrpav05c/image/upload/v1775994711/transozjuo4iv7nuqarp.svg', 'https://res.cloudinary.com/dqrpav05c/image/upload/v1775994712/g7fryastfrk3ypqchenj.svg'],
  },
  {
    title: "Pre-Incubated · Kerala Startup Mission",
    organizer: "KSUM Ideabox",
    year: "2025",
    description: "Officially recognised and pre-incubated by the Kerala Startup Mission — a milestone that opened access to mentorship, funding pathways, and the Kerala startup ecosystem.",
    highlight: "Certificate of Recognition",
    color: 'violet',
    Icon: '',
    photos: ['https://res.cloudinary.com/dqrpav05c/image/upload/v1775996951/rrail6grcuv6qte5kqja.svg', 'https://res.cloudinary.com/dqrpav05c/image/upload/v1775996951/jxudzbj1wi2bzjyv6lka.svg'],
  },
  {
    title: "2nd Place — UKFCET Ideathon'26",
    organizer: "UKF College",
    year: "February 2026",
    description: "Home ground ideathon — placed second while competing against a strong field of engineering peers.",
    highlight: "Engineering ideathon",
    color: 'cyan',
    icon: '',
    photos: ['/images/awards/ukf-ideathon.jpeg'],
  },
  {
    title: "3rd Place — Samrambhak Mithra Program",
    organizer: "State Level Entrepreneurship",
    year: "2024",
    description: "Recognised at a state-level entrepreneurship programme as a promising founder with a market-ready vision.",
    highlight: "State-level recognition",
    color: 'pink',
    Icon: '',
    photos: ['https://res.cloudinary.com/dqrpav05c/image/upload/v1776014169/xjb5yqwgs9weh3qdljvz.svg','https://res.cloudinary.com/dqrpav05c/image/upload/v1775998975/jtjn0yqponxrwn2fufvj.svg'],
  },
]

const accentColors: Record<string, { text: string; border: string; dot: string; bg: string }> = {
  amber: { text: 'text-amber-400', border: 'border-amber-500/40', dot: 'bg-amber-400', bg: 'bg-amber-500/10' },
  emerald: { text: 'text-emerald-400', border: 'border-emerald-500/40', dot: 'bg-emerald-400', bg: 'bg-emerald-500/10' },
  violet: { text: 'text-violet-400', border: 'border-violet-500/40', dot: 'bg-violet-400', bg: 'bg-violet-500/10' },
  blue: { text: 'text-blue-400', border: 'border-blue-500/40', dot: 'bg-blue-400', bg: 'bg-blue-500/10' },
  cyan: { text: 'text-cyan-400', border: 'border-cyan-500/40', dot: 'bg-cyan-400', bg: 'bg-cyan-500/10' },
  pink: { text: 'text-pink-400', border: 'border-pink-500/40', dot: 'bg-pink-400', bg: 'bg-pink-500/10' },
  orange: { text: 'text-orange-400', border: 'border-orange-500/40', dot: 'bg-orange-400', bg: 'bg-orange-500/10' },
  indigo: { text: 'text-indigo-400', border: 'border-indigo-500/40', dot: 'bg-indigo-400', bg: 'bg-indigo-500/10' },
}

function AwardCard({ award }: { award: typeof awards[0] }) {
  const c = accentColors[award.color]
  const [imgError, setImgError] = useState(false)
  
  return (
    <div className="w-full h-full flex flex-col bg-gradient-to-br from-[#0a0a2e] via-[#080825] to-[#030318] rounded-xl sm:rounded-2xl overflow-hidden border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
      {/* Image Preview Section */}
      <div className="relative h-24 sm:h-32 overflow-hidden">
        {!imgError ? (
          <Image
            src={award.photos[0]}
            alt={award.title}
            fill
            sizes="(max-width: 640px) 260px, 340px"
            className="object-cover"
            onError={() => setImgError(true)}
            priority
          />
        ) : (
          <div className={cn('w-full h-full flex items-center justify-center', c.bg)}>
            <span className="text-2xl sm:text-4xl opacity-60">{award.highlight}</span>
          </div>
        )}
        {/* Gradient overlay - lighter to show more image */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080825] via-[#080825]/40 to-transparent" />
        {/* Year badge */}
        <div className={cn('absolute top-2 sm:top-3 right-2 sm:right-3 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-[8px] sm:text-[10px] font-semibold backdrop-blur-md border', c.bg, c.border, c.text)} style={{ fontFamily: 'var(--font-inter)' }}>
          {award.year}
        </div>
        {/* Icon floating */}
        {/* <div className={cn('absolute bottom-2 sm:bottom-3 left-3 sm:left-4 w-7 sm:w-10 h-7 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center backdrop-blur-md border shadow-lg', c.bg, c.border)}>
          <span className="text-sm sm:text-xl">{award.icon}</span>
        </div> */}
      </div>
      
      {/* Content Section */}
      <div className="flex-1 flex flex-col justify-between p-2.5 sm:p-4 pt-2 sm:pt-3">
        <div>
          {/* Organizer */}
          <div className="flex items-center gap-1 sm:gap-1.5 mb-1 sm:mb-2">
            <span className={cn('w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full', c.dot)} />
            <span className={cn('text-[8px] sm:text-[10px] font-medium tracking-wide', c.text)} style={{ fontFamily: 'var(--font-inter)' }}>
              {award.organizer}
            </span>
          </div>
          {/* Title */}
          <h3 className="text-xs sm:text-sm font-bold text-white mb-1 sm:mb-1.5 leading-snug line-clamp-2" style={{ fontFamily: 'var(--font-garet), system-ui, sans-serif' }}>
            {award.title}
          </h3>
          {/* Description - hidden on mobile for cleaner look */}
          <p className="hidden sm:block text-[10px] text-white/45 leading-relaxed line-clamp-2" style={{ fontFamily: 'var(--font-poppins)' }}>
            {award.description}
          </p>
        </div>
        {/* Footer */}
        <div className="flex items-center justify-between mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-white/[0.06]">
          <span className={cn('px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-[7px] sm:text-[9px] font-medium border', c.text, c.border, c.bg)} style={{ fontFamily: 'var(--font-inter)' }}>
            {award.highlight}
          </span>
          <div className="flex items-center gap-1">
            <span className="w-1 h-1 rounded-full bg-white/20 animate-pulse" />
            <span className="text-[7px] sm:text-[9px] text-white/30" style={{ fontFamily: 'var(--font-inter)' }}>
              View
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

const popupBackgrounds: Record<string, string> = {
  amber: 'from-amber-950/30 via-[#030318]/80 to-[#030318]',
  emerald: 'from-emerald-950/30 via-[#030318]/80 to-[#030318]',
  violet: 'from-violet-950/30 via-[#030318]/80 to-[#030318]',
  blue: 'from-blue-950/30 via-[#030318]/80 to-[#030318]',
  cyan: 'from-cyan-950/30 via-[#030318]/80 to-[#030318]',
  pink: 'from-pink-950/30 via-[#030318]/80 to-[#030318]',
  orange: 'from-orange-950/30 via-[#030318]/80 to-[#030318]',
  indigo: 'from-indigo-950/30 via-[#030318]/80 to-[#030318]',
}

const popupBorders: Record<string, string> = {
  amber: 'border-amber-500/20',
  emerald: 'border-emerald-500/20',
  violet: 'border-violet-500/20',
  blue: 'border-blue-500/20',
  cyan: 'border-cyan-500/20',
  pink: 'border-pink-500/20',
  orange: 'border-orange-500/20',
  indigo: 'border-indigo-500/20',
}

function AwardPopup({
  award,
  isOpen,
  onClose,
}: {
  award: typeof awards[0] | null
  isOpen: boolean
  onClose: () => void
}) {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const c = award ? accentColors[award.color] : accentColors.blue
  const bgGradient = award ? popupBackgrounds[award.color] : popupBackgrounds.blue
  const borderColor = award ? popupBorders[award.color] : popupBorders.blue

  const handleTouchStart = (e: React.TouchEvent) => setTouchStart(e.targetTouches[0].clientX)
  const handleTouchMove = (e: React.TouchEvent) => setTouchEnd(e.targetTouches[0].clientX)
  const handleTouchEnd = () => {
    if (!award) return
    const swipeThreshold = 50
    if (touchStart - touchEnd > swipeThreshold && currentPhotoIndex < award.photos.length - 1)
      setCurrentPhotoIndex(prev => prev + 1)
    if (touchEnd - touchStart > swipeThreshold && currentPhotoIndex > 0)
      setCurrentPhotoIndex(prev => prev - 1)
  }

  const nextPhoto = () => { if (award && currentPhotoIndex < award.photos.length - 1) setCurrentPhotoIndex(prev => prev + 1) }
  const prevPhoto = () => { if (currentPhotoIndex > 0) setCurrentPhotoIndex(prev => prev - 1) }

  useEffect(() => { setCurrentPhotoIndex(0) }, [award])
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  if (!isOpen || !award) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-[#030318]/90 backdrop-blur-md" />
      <div
        className={cn(
          'relative w-full max-w-2xl max-h-[90vh] sm:max-h-[85vh] overflow-y-auto rounded-2xl',
          'backdrop-blur-2xl border', borderColor,
          'shadow-[0_30px_80px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.06)]',
          'animate-in fade-in zoom-in-95 duration-200'
        )}
        onClick={e => e.stopPropagation()}
      >
        <div className={cn('absolute inset-0 rounded-2xl bg-gradient-to-b', bgGradient)} />
        <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
          <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-white/[0.05] via-white/[0.01] to-transparent" />
        </div>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.12] hover:border-white/[0.22] transition-all"
        >
          <X className="w-5 h-5 text-white/70" />
        </button>

        <div className="relative p-4 sm:p-6">
          <div className={cn('flex items-center gap-2 mb-3 sm:mb-4', c.bg, 'px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-full w-fit border', c.border)}>
            <span className={cn('w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full flex-shrink-0', c.dot)} />
            <span className={cn('text-[10px] sm:text-xs font-medium tracking-wide', c.text)} style={{ fontFamily: 'var(--font-inter)' }}>
              {award.organizer} · {award.year}
            </span>
          </div>

          <span className="text-2xl sm:text-3xl mb-2 sm:mb-3 block">{award.icon}</span>
          <h3 className="text-lg sm:text-2xl font-bold text-white mb-2 sm:mb-3" style={{ fontFamily: 'var(--font-garet), system-ui, sans-serif' }}>
            {award.title}
          </h3>
          <p className="text-xs sm:text-sm text-white/60 leading-relaxed mb-3 sm:mb-4" style={{ fontFamily: 'var(--font-poppins)' }}>
            {award.description}
          </p>
          <span className={cn('inline-flex px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-medium border mb-4 sm:mb-6', c.text, c.border, c.bg)} style={{ fontFamily: 'var(--font-inter)' }}>
            {award.highlight}
          </span>

          <div
            className="relative rounded-lg sm:rounded-xl overflow-hidden bg-white/[0.03] border border-white/[0.07]"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className="relative w-full min-h-[150px] sm:min-h-[200px] max-h-[250px] sm:max-h-[400px] flex items-center justify-center p-1.5 sm:p-2">
              {award.photos[currentPhotoIndex] ? (
                <Image
                  src={award.photos[currentPhotoIndex]}
                  alt={`${award.title} photo ${currentPhotoIndex + 1}`}
                  width={600}
                  height={400}
                  className="object-contain max-h-[230px] sm:max-h-[380px] w-auto h-auto rounded-md sm:rounded-lg"
                  style={{ maxWidth: '100%' }}
                  onError={e => {
                    const target = e.target as HTMLImageElement
                    target.style.display = 'none'
                    target.parentElement?.querySelector('.placeholder-img')?.classList.remove('hidden')
                  }}
                />
              ) : null}
              <div className={cn('placeholder-img flex flex-col items-center justify-center w-full h-[200px] sm:h-[300px] rounded-md sm:rounded-lg', c.bg, c.border, 'border', award.photos[currentPhotoIndex] ? 'hidden' : '')}>
                <span className="text-3xl sm:text-4xl mb-2 sm:mb-3">{award.icon}</span>
                <span className={cn('text-xs sm:text-sm font-medium text-center px-4', c.text)} style={{ fontFamily: 'var(--font-inter)' }}>
                  {award.title}
                </span>
                <span className="text-[10px] sm:text-xs text-white/35 mt-1" style={{ fontFamily: 'var(--font-inter)' }}>
                  Photo {currentPhotoIndex + 1} of {award.photos.length}
                </span>
              </div>
            </div>

            {award.photos.length > 1 && (
              <>
                <button
                  onClick={prevPhoto}
                  disabled={currentPhotoIndex === 0}
                  className={cn('hidden sm:flex absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full', 'bg-[#030318]/70 backdrop-blur-sm border border-white/20 transition-all', currentPhotoIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-[#030318]/90 hover:scale-110')}
                >
                  <ChevronLeft className="w-5 h-5 text-white" />
                </button>
                <button
                  onClick={nextPhoto}
                  disabled={currentPhotoIndex === award.photos.length - 1}
                  className={cn('hidden sm:flex absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full', 'bg-[#030318]/70 backdrop-blur-sm border border-white/20 transition-all', currentPhotoIndex === award.photos.length - 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-[#030318]/90 hover:scale-110')}
                >
                  <ChevronRight className="w-5 h-5 text-white" />
                </button>
              </>
            )}

            {award.photos.length > 1 && (
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 bg-[#030318]/50 backdrop-blur-sm px-3 py-1.5 rounded-full">
                {award.photos.map((_, i) => (
                  <button key={`photo-dot-${i}`} onClick={() => setCurrentPhotoIndex(i)}
                    className={cn('w-2 h-2 rounded-full transition-all', i === currentPhotoIndex ? cn('scale-125', c.dot) : 'bg-white/35 hover:bg-white/55')} />
                ))}
              </div>
            )}
          </div>

          {award.photos.length > 1 && (
            <div className="flex flex-col items-center gap-3 mt-4">
              <span className="sm:hidden text-xs text-white/35" style={{ fontFamily: 'var(--font-inter)' }}>Swipe to navigate photos</span>
              <div className="flex sm:hidden justify-center gap-4">
                <button onClick={prevPhoto} disabled={currentPhotoIndex === 0}
                  className={cn('p-3 rounded-full transition-all border', c.bg, c.border, currentPhotoIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:opacity-80')}>
                  <ChevronLeft className={cn('w-5 h-5', c.text)} />
                </button>
                <button onClick={nextPhoto} disabled={currentPhotoIndex === award.photos.length - 1}
                  className={cn('p-3 rounded-full transition-all border', c.bg, c.border, currentPhotoIndex === award.photos.length - 1 ? 'opacity-30 cursor-not-allowed' : 'hover:opacity-80')}>
                  <ChevronRight className={cn('w-5 h-5', c.text)} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function HonorsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardSwapRef = useRef<CardSwapHandle>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [selectedAward, setSelectedAward] = useState<typeof awards[0] | null>(null)
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640)
    checkMobile()
    // Debounced resize handler
    let resizeTimeout: NodeJS.Timeout
    const debouncedResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(checkMobile, 150)
    }
    window.addEventListener('resize', debouncedResize)
    return () => {
      clearTimeout(resizeTimeout)
      window.removeEventListener('resize', debouncedResize)
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
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const handleCardClick = useCallback((index: number) => {
    setSelectedAward(awards[index])
    setIsPopupOpen(true)
    cardSwapRef.current?.pauseAnimation()
  }, [])

  const handleClosePopup = useCallback(() => {
    setIsPopupOpen(false)
    setSelectedAward(null)
    cardSwapRef.current?.resumeAnimation({ swapCurrentCard: false, resumeDelay: 500 })
  }, [])

  const handlePrevCard = useCallback(() => { cardSwapRef.current?.prevCard() }, [])
  const handleNextCard = useCallback(() => { cardSwapRef.current?.nextCard() }, [])

  const cardNodes = awards.map((award, i) => (
    <AwardCard key={`award-card-${i}`} award={award} />
  ))

  return (
    <section
      id="honors"
      ref={sectionRef}
      className="relative py-16 sm:py-20 lg:py-32 bg-[#030318] overflow-hidden"
    >
      {/* Background with unique pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-violet-950/15 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-blue-950/20 via-transparent to-transparent" />
      
      {/* Floating decorative elements */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-br from-amber-500/[0.03] to-violet-500/[0.03] rounded-full blur-3xl pointer-events-none animate-pulse" style={{ animationDuration: '4s' }} />
      <div className="absolute bottom-32 left-16 w-56 h-56 bg-gradient-to-tr from-cyan-500/[0.04] to-blue-500/[0.04] rounded-full blur-3xl pointer-events-none animate-pulse" style={{ animationDuration: '5s' }} />
      
      {/* Trophy icon decoration */}
      <div className="absolute top-24 left-1/4 hidden lg:block opacity-[0.03]">
        <Trophy className="w-32 h-32 text-amber-400" />
      </div>
      <div className="absolute bottom-24 right-1/4 hidden lg:block opacity-[0.03]">
        <Award className="w-28 h-28 text-violet-400" />
      </div>
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">

        {/* Eyebrow */}
        <div className={cn('flex justify-start mb-8 sm:mb-12 transition-all duration-700', isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8')}>
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-xs sm:text-sm text-white/60" style={{ fontFamily: 'var(--font-inter)' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            Achievements & Honors
          </span>
        </div>

        {/* Two-column */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* LEFT: Text */}
          <div className={cn('flex flex-col justify-center transition-all duration-700', isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8')}>
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-white mb-4 sm:mb-6" style={{ fontFamily: 'var(--font-garet), system-ui, sans-serif' }}>
              Validated by the Frontiers of Innovation.
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-white/60 leading-relaxed mb-8" style={{ fontFamily: 'var(--font-poppins)' }}>
              Engineering solutions that bridge the gap between abstract theory and field-ready deployment. These honors represent the technical rigor and architectural foresight required to lead at the intersection of Robotics and AI.
            </p>

            <div className="flex gap-4 sm:gap-6 flex-wrap">
              <div>
                <p className="text-lg sm:text-2xl font-bold text-white" style={{ fontFamily: 'var(--font-garet), system-ui' }}>4+</p>
                <p className="text-[10px] sm:text-xs text-white/40 mt-0.5 sm:mt-1" style={{ fontFamily: 'var(--font-inter)' }}>Awards &amp; Honors</p>
              </div>
              <div className="w-px bg-white/10 hidden sm:block" />
              <div>
                <p className="text-lg sm:text-2xl font-bold text-white" style={{ fontFamily: 'var(--font-garet), system-ui' }}>75K+</p>
                <p className="text-[10px] sm:text-xs text-white/40 mt-0.5 sm:mt-1" style={{ fontFamily: 'var(--font-inter)' }}>Grant Secured</p>
              </div>
              <div className="w-px bg-white/10 hidden sm:block" />
              <div>
                <p className="text-lg sm:text-2xl font-bold text-white" style={{ fontFamily: 'var(--font-garet), system-ui' }}>State</p>
                <p className="text-[10px] sm:text-xs text-white/40 mt-0.5 sm:mt-1" style={{ fontFamily: 'var(--font-inter)' }}>Level recognition</p>
              </div>
            </div>

            <div className="mt-6 sm:mt-10 flex items-center gap-3 flex-wrap">
              <span className={cn('inline-flex items-center gap-2 px-4 py-2 rounded-full', 'bg-blue-500/10 border border-blue-500/30', 'animate-pulse')}>
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-ping" />
                <span className="text-xs text-blue-300/90" style={{ fontFamily: 'var(--font-inter)' }}>
                  Click the card to view photos!
                </span>
              </span>

              {/* Desktop nav */}
              <div className="hidden lg:flex items-center gap-2">
                <button
                  onMouseDown={e => { e.preventDefault(); handlePrevCard() }}
                  className="p-1.5 rounded-full bg-white/[0.04] backdrop-blur-sm border border-white/[0.09] hover:bg-white/[0.09] hover:border-white/[0.18] hover:scale-110 active:scale-95 transition-all"
                >
                  <ChevronLeft className="w-3.5 h-3.5 text-white/60" />
                </button>
                <button
                  onMouseDown={e => { e.preventDefault(); handleNextCard() }}
                  className="p-1.5 rounded-full bg-white/[0.04] backdrop-blur-sm border border-white/[0.09] hover:bg-white/[0.09] hover:border-white/[0.18] hover:scale-110 active:scale-95 transition-all"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-white/60" />
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT: CardSwap */}
          <div
            className={cn('relative transition-all duration-700 delay-200', isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12')}
            style={{ height: isMobile ? '320px' : '440px' }}
          >
            <CardSwap
              ref={cardSwapRef}
              width={isMobile ? 260 : 340}
              height={isMobile ? 240 : 320}
              cardDistance={isMobile ? 20 : 28}
              verticalDistance={isMobile ? 22 : 30}
              delay={1500}
              skewAmount={isMobile ? 4 : 6}
              easing="smooth"
              pauseOnHover={true}
              cards={cardNodes}
              onCardClick={handleCardClick}
            />

            {/* Mobile nav */}
            <div className="flex lg:hidden justify-center gap-4 absolute -bottom-16 left-1/2 -translate-x-1/2">
              <button
                onTouchStart={e => { e.stopPropagation(); handlePrevCard() }}
                onMouseDown={e => { e.preventDefault(); handlePrevCard() }}
                className="p-2.5 rounded-full bg-white/[0.04] backdrop-blur-sm border border-white/[0.09] hover:bg-white/[0.09] active:scale-95 transition-all"
              >
                <ChevronLeft className="w-4 h-4 text-white/60" />
              </button>
              <button
                onTouchStart={e => { e.stopPropagation(); handleNextCard() }}
                onMouseDown={e => { e.preventDefault(); handleNextCard() }}
                className="p-2.5 rounded-full bg-white/[0.04] backdrop-blur-sm border border-white/[0.09] hover:bg-white/[0.09] active:scale-95 transition-all"
              >
                <ChevronRight className="w-4 h-4 text-white/60" />
              </button>
            </div>
          </div>

        </div>
      </div>

      <AwardPopup award={selectedAward} isOpen={isPopupOpen} onClose={handleClosePopup} />
    </section>
  )
}
