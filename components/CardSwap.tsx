"use client"

import { useRef, useEffect, useCallback, ReactNode, forwardRef, useImperativeHandle } from 'react'
import gsap from 'gsap'

export interface CardSwapHandle {
  nextCard: () => void
  prevCard: () => void
  getCurrentOrder: () => number[]
  pauseAnimation: () => void
  resumeAnimation: (options?: { swapCurrentCard?: boolean; resumeDelay?: number }) => void
}

export interface CardSwapProps {
  width?: number | string
  height?: number | string
  cardDistance?: number
  verticalDistance?: number
  delay?: number
  pauseOnHover?: boolean
  skewAmount?: number
  easing?: 'linear' | 'elastic' | 'smooth'
  onCardClick?: (index: number) => void
  cards: ReactNode[]
}

interface Slot {
  x: number
  y: number
  z: number
  zIndex: number
}

const makeSlot = (i: number, distX: number, distY: number, total: number): Slot => ({
  x: i * distX,
  y: -i * distY,
  z: -i * distX * 0.8,
  zIndex: total - i,
})

const placeNow = (el: HTMLElement, slot: Slot, skew: number) => {
  gsap.set(el, {
    x: slot.x,
    y: slot.y,
    z: slot.z,
    xPercent: -50,
    yPercent: -50,
    skewY: skew,
    transformOrigin: 'center center',
    zIndex: slot.zIndex,
    force3D: true,
    rotation: 0.01, // Force GPU layer
  })
}

const CardSwap = forwardRef<CardSwapHandle, CardSwapProps>(function CardSwap({
  width = 500,
  height = 400,
  cardDistance = 60,
  verticalDistance = 70,
  delay = 5000,
  pauseOnHover = false,
  skewAmount = 6,
  easing = 'elastic',
  onCardClick,
  cards,
}, ref) {
  const containerRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const orderRef = useRef<number[]>(cards.map((_, i) => i))
  const tlRef = useRef<gsap.core.Timeline | null>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const pausedRef = useRef(false)
  const isAnimatingRef = useRef(false)
  const resumeSwapPendingRef = useRef(false)
  const hasInitializedRef = useRef(false)

  const config =
    easing === 'elastic'
      ? {
        ease: 'elastic.out(0.6,0.9)',
        durDrop: 2,
        durMove: 2,
        durReturn: 2,
        promoteOverlap: 0.9,
        returnDelay: 0.05,
      }
      : easing === 'smooth'
      ? {
        ease: 'power2.inOut',
        durDrop: 0.5,
        durMove: 0.4,
        durReturn: 0.5,
        promoteOverlap: 0.6,
        returnDelay: 0.1,
      }
      : {
        ease: 'power1.inOut',
        durDrop: 0.8,
        durMove: 0.8,
        durReturn: 0.8,
        promoteOverlap: 0.45,
        returnDelay: 0.2,
      }

  const total = cards.length

  const initializeCards = useCallback((useCurrentOrder = false) => {
    if (useCurrentOrder) {
      const order = orderRef.current
      order.forEach((cardIndex, visualPosition) => {
        const el = cardRefs.current[cardIndex]
        if (el) placeNow(el, makeSlot(visualPosition, cardDistance, verticalDistance, total), skewAmount)
      })
    } else {
      cardRefs.current.forEach((el, i) => {
        if (el) placeNow(el, makeSlot(i, cardDistance, verticalDistance, total), skewAmount)
      })
    }
  }, [cardDistance, verticalDistance, skewAmount, total])

  const swap = useCallback(() => {
    if (pausedRef.current || isAnimatingRef.current || resumeSwapPendingRef.current) return

    const order = orderRef.current
    if (order.length < 2) return

    const [front, ...rest] = order
    const elFront = cardRefs.current[front]
    if (!elFront) return

    orderRef.current = [...rest, front]
    isAnimatingRef.current = true

    const tl = gsap.timeline({
      onComplete: () => {
        isAnimatingRef.current = false
      }
    })
    tlRef.current = tl

    tl.to(elFront, {
      y: '+=500',
      duration: config.durDrop,
      ease: config.ease,
    })

    tl.addLabel('promote', `-=${config.durDrop * config.promoteOverlap}`)
    rest.forEach((idx, i) => {
      const el = cardRefs.current[idx]
      if (!el) return
      const slot = makeSlot(i, cardDistance, verticalDistance, total)
      tl.set(el, { zIndex: slot.zIndex }, 'promote')
      tl.to(
        el,
        { x: slot.x, y: slot.y, z: slot.z, duration: config.durMove, ease: config.ease },
        `promote+=${i * 0.15}`
      )
    })

    const backSlot = makeSlot(total - 1, cardDistance, verticalDistance, total)
    tl.addLabel('return', `promote+=${config.durMove * config.returnDelay}`)
    tl.call(() => gsap.set(elFront, { zIndex: backSlot.zIndex }), undefined, 'return')
    tl.set(elFront, { x: backSlot.x, z: backSlot.z }, 'return')
    tl.to(elFront, { y: backSlot.y, duration: config.durReturn, ease: config.ease }, 'return')
  }, [cardDistance, verticalDistance, total, config])

  const stopAnimation = useCallback(() => {
    tlRef.current?.kill()
    tlRef.current = null
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }, [])

  const startAnimation = useCallback(() => {
    stopAnimation()
    pausedRef.current = false
    intervalRef.current = setInterval(() => {
      if (!pausedRef.current && !isAnimatingRef.current && !resumeSwapPendingRef.current) {
        swap()
      }
    }, delay)
  }, [swap, stopAnimation, delay])

  const resumeAnimation = useCallback(() => {
    pausedRef.current = false
    resumeSwapPendingRef.current = false

    const order = orderRef.current
    order.forEach((cardIndex, visualPosition) => {
      const el = cardRefs.current[cardIndex]
      if (!el) return
      const slot = makeSlot(visualPosition, cardDistance, verticalDistance, total)
      gsap.set(el, {
        x: slot.x,
        y: slot.y,
        z: slot.z,
        zIndex: slot.zIndex,
      })
    })

    if (!intervalRef.current) {
      intervalRef.current = setInterval(() => {
        if (!pausedRef.current && !isAnimatingRef.current && !resumeSwapPendingRef.current) {
          swap()
        }
      }, delay)
    }
  }, [swap, delay, cardDistance, verticalDistance, total])

  const swapRef = useRef(swap)
  const delayRef = useRef(delay)

  useEffect(() => {
    swapRef.current = swap
    delayRef.current = delay
  }, [swap, delay])

  useImperativeHandle(ref, () => ({
    nextCard: () => {
      tlRef.current?.kill()
      tlRef.current = null
      isAnimatingRef.current = false
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
      const order = orderRef.current
      if (order.length < 2) return
      const [front, ...rest] = order
      const elFront = cardRefs.current[front]
      if (!elFront) return

      const newOrder = [...rest, front]
      orderRef.current = newOrder

      const backSlot = makeSlot(total - 1, cardDistance, verticalDistance, total)
      const tl = gsap.timeline({
        onComplete: () => {
          isAnimatingRef.current = false
          if (!pausedRef.current && !intervalRef.current) {
            intervalRef.current = setInterval(() => swapRef.current(), delayRef.current)
          }
        }
      })
      tlRef.current = tl
      isAnimatingRef.current = true

      tl.to(elFront, { x: backSlot.x, y: backSlot.y, z: backSlot.z, duration: 0.4, ease: 'power2.inOut' }, 0)
      tl.set(elFront, { zIndex: backSlot.zIndex }, 0.1)
      rest.forEach((idx, i) => {
        const el = cardRefs.current[idx]
        if (!el) return
        const slot = makeSlot(i, cardDistance, verticalDistance, total)
        tl.set(el, { zIndex: slot.zIndex }, 0)
        tl.to(el, { x: slot.x, y: slot.y, z: slot.z, duration: 0.35, ease: 'power2.out' }, 0.05)
      })
    },
    prevCard: () => {
      tlRef.current?.kill()
      tlRef.current = null
      isAnimatingRef.current = false
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
      const order = orderRef.current
      if (order.length < 2) return
      const back = order[order.length - 1]
      const rest = order.slice(0, -1)
      const elBack = cardRefs.current[back]
      if (!elBack) return

      const newOrder = [back, ...rest]
      orderRef.current = newOrder

      const frontSlot = makeSlot(0, cardDistance, verticalDistance, total)
      const tl = gsap.timeline({
        onComplete: () => {
          isAnimatingRef.current = false
          gsap.set(elBack, { zIndex: frontSlot.zIndex })
          if (!pausedRef.current && !intervalRef.current) {
            intervalRef.current = setInterval(() => swapRef.current(), delayRef.current)
          }
        }
      })
      tlRef.current = tl
      isAnimatingRef.current = true

      tl.set(elBack, { zIndex: frontSlot.zIndex + 10 }, 0)
      tl.to(elBack, { x: frontSlot.x, y: frontSlot.y, z: frontSlot.z, duration: 0.4, ease: 'power2.inOut' }, 0)
      rest.forEach((idx, i) => {
        const el = cardRefs.current[idx]
        if (!el) return
        const slot = makeSlot(i + 1, cardDistance, verticalDistance, total)
        tl.set(el, { zIndex: slot.zIndex }, 0)
        tl.to(el, { x: slot.x, y: slot.y, z: slot.z, duration: 0.35, ease: 'power2.out' }, 0.05)
      })
    },
    getCurrentOrder: () => orderRef.current,
    pauseAnimation: () => {
      pausedRef.current = true
      resumeSwapPendingRef.current = false

      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
      if (tlRef.current) {
        tlRef.current.kill()
        tlRef.current = null
      }
      isAnimatingRef.current = false

      const order = orderRef.current
      order.forEach((cardIndex, visualPosition) => {
        const el = cardRefs.current[cardIndex]
        if (!el) return
        const slot = makeSlot(visualPosition, cardDistance, verticalDistance, total)
        gsap.set(el, {
          x: slot.x,
          y: slot.y,
          z: slot.z,
          zIndex: slot.zIndex,
        })
      })
    },
    resumeAnimation: (options?: { swapCurrentCard?: boolean; resumeDelay?: number }) => {
      const { swapCurrentCard = false, resumeDelay = 0 } = options || {}

      if (resumeSwapPendingRef.current) return

      pausedRef.current = false

      if (tlRef.current) {
        tlRef.current.kill()
        tlRef.current = null
      }
      isAnimatingRef.current = false

      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }

      if (swapCurrentCard) {
        resumeSwapPendingRef.current = true

        const order = orderRef.current.slice()
        if (order.length < 2) {
          resumeSwapPendingRef.current = false
          return
        }
        const frontCardIndex = order[0]
        const restCardIndices = order.slice(1)
        const elFront = cardRefs.current[frontCardIndex]
        if (!elFront) {
          resumeSwapPendingRef.current = false
          return
        }

        isAnimatingRef.current = true

        const backSlot = makeSlot(total - 1, cardDistance, verticalDistance, total)
        const tl = gsap.timeline({
          onComplete: () => {
            orderRef.current = [...restCardIndices, frontCardIndex]
            isAnimatingRef.current = false
            resumeSwapPendingRef.current = false
            timeoutRef.current = setTimeout(() => {
              timeoutRef.current = null
              if (!pausedRef.current && !intervalRef.current && !resumeSwapPendingRef.current) {
                intervalRef.current = setInterval(() => swapRef.current(), delayRef.current)
              }
            }, resumeDelay)
          }
        })
        tlRef.current = tl

        tl.to(elFront, { y: '+=100', duration: 0.2, ease: 'power2.in' }, 0)
        tl.set(elFront, { zIndex: backSlot.zIndex }, 0.15)
        tl.to(elFront, { x: backSlot.x, y: backSlot.y, z: backSlot.z, duration: 0.35, ease: 'power2.out' }, 0.2)

        restCardIndices.forEach((cardIdx, visualPos) => {
          const el = cardRefs.current[cardIdx]
          if (!el) return
          const slot = makeSlot(visualPos, cardDistance, verticalDistance, total)
          tl.set(el, { zIndex: slot.zIndex }, 0.1)
          tl.to(el, { x: slot.x, y: slot.y, z: slot.z, duration: 0.35, ease: 'power2.out' }, 0.1)
        })
      } else {
        const order = orderRef.current
        order.forEach((cardIndex, visualPosition) => {
          const el = cardRefs.current[cardIndex]
          if (!el) return
          const slot = makeSlot(visualPosition, cardDistance, verticalDistance, total)
          gsap.set(el, {
            x: slot.x,
            y: slot.y,
            z: slot.z,
            zIndex: slot.zIndex,
          })
        })

        timeoutRef.current = setTimeout(() => {
          timeoutRef.current = null
          if (!pausedRef.current && !intervalRef.current && !resumeSwapPendingRef.current) {
            intervalRef.current = setInterval(() => swapRef.current(), delayRef.current)
          }
        }, resumeDelay)
      }
    },
  }), [cardDistance, verticalDistance, total])

  // Initialize cards and start animation
  useEffect(() => {
    if (!hasInitializedRef.current) {
      initializeCards(false)
      hasInitializedRef.current = true
    } else {
      initializeCards(true)
    }
    startAnimation()

    return () => stopAnimation()
  }, [initializeCards, startAnimation, stopAnimation])

  // Trigger first swap after initial render (separate effect to avoid cleanup issues)
  useEffect(() => {
    const initialSwapTimeout = setTimeout(() => {
      if (!pausedRef.current && !isAnimatingRef.current && !resumeSwapPendingRef.current) {
        swap()
      }
    }, 2000)

    return () => clearTimeout(initialSwapTimeout)
  }, []) // Empty deps - only run once on mount

  useEffect(() => {
    const container = containerRef.current
    if (!container || !pauseOnHover) return

    const onEnter = () => { pausedRef.current = true; stopAnimation() }
    const onLeave = () => { pausedRef.current = false; resumeAnimation() }

    container.addEventListener('mouseenter', onEnter)
    container.addEventListener('mouseleave', onLeave)
    return () => {
      container.removeEventListener('mouseenter', onEnter)
      container.removeEventListener('mouseleave', onLeave)
    }
  }, [pauseOnHover, stopAnimation, resumeAnimation])

  const w = typeof width === 'number' ? `${width}px` : width
  const h = typeof height === 'number' ? `${height}px` : height

  return (
    <div
      ref={containerRef}
      className="absolute bottom-0 right-0 origin-bottom-right overflow-visible"
      style={{
        width: w,
        height: h,
        perspective: '900px',
        transform: 'translate(5%, 20%)',
      }}
    >
      {cards.map((card, index) => (
        <div
          key={index}
          ref={(el) => { cardRefs.current[index] = el }}
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            const currentFront = orderRef.current[0]
            if (onCardClick) {
              onCardClick(currentFront)
            }
          }}
          className="absolute top-1/2 left-1/2 rounded-xl border border-white/20 bg-black cursor-pointer select-none"
          style={{
            width: w,
            height: h,
            transformStyle: 'preserve-3d',
            willChange: 'transform',
            backfaceVisibility: 'hidden',
            pointerEvents: 'auto',
          }}
        >
          {card}
        </div>
      ))}
    </div>
  )
})

export default CardSwap
