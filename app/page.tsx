'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import Navbar from '@/components/Navbar'
import HeroSection from '@/components/sections/HeroSection'
import Loader from '@/components/Loader'

// Skeleton placeholder for lazy-loaded sections
const SectionSkeleton = ({ minHeight = '50vh', bg = '#030318' }: { minHeight?: string; bg?: string }) => (
  <div style={{ minHeight, backgroundColor: bg }} />
)

// Lazy load sections with optimized loading states
const ProfileSection = dynamic(() => import('@/components/sections/ProfileSection'), {
  ssr: false,
  loading: () => <SectionSkeleton minHeight="50vh" />,
})

const PortfolioSection = dynamic(() => import('@/components/sections/PortfolioSection'), {
  ssr: false,
  loading: () => <SectionSkeleton minHeight="100vh" />,
})

const ExpertiseSection = dynamic(() => import('@/components/sections/ExpertiseSection'), {
  ssr: false,
  loading: () => <SectionSkeleton minHeight="100vh" />,
})

const HonorsSection = dynamic(() => import('@/components/sections/HonorsSection'), {
  ssr: false,
  loading: () => <SectionSkeleton minHeight="50vh" />,
})

const ClientsSection = dynamic(() => import('@/components/sections/ClientsSection'), {
  ssr: false,
  loading: () => <SectionSkeleton minHeight="30vh" />,
})

const TestimonialsSection = dynamic(() => import('@/components/sections/TestimonialsSection'), {
  ssr: false,
  loading: () => <SectionSkeleton minHeight="50vh" />,
})

const ContactSection = dynamic(() => import('@/components/sections/ContactSection'), {
  ssr: false,
  loading: () => <SectionSkeleton minHeight="100vh" />,
})

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  const handleLoadComplete = useCallback(() => {
    setIsLoading(false)
  }, [])

  return (
    <>
      {isLoading && <Loader onComplete={handleLoadComplete} />}
      <main className={`bg-[#0a0b5c] min-h-screen ${isLoading ? 'overflow-hidden max-h-screen' : ''}`}>
        <Navbar />
        <HeroSection />
        <ProfileSection />
        <PortfolioSection />
        <ExpertiseSection />
        <HonorsSection />
        <ClientsSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
    </>
  )
}
