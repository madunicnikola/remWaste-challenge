"use client"
import { useEffect, useRef } from "react"
import { Truck } from "lucide-react"

export default function PageLoader() {
  const containerRef = useRef<HTMLDivElement>(null)
  const truckRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const dotsRef = useRef<HTMLDivElement>(null)
  const ringsRef = useRef<HTMLDivElement>(null)
  const backgroundRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const setupAnimations = async () => {
      const gsap = await import("gsap")
      const { default: gsapInstance } = gsap

      if (!containerRef.current) return

      gsapInstance.set([titleRef.current, subtitleRef.current, dotsRef.current], { 
        opacity: 0, 
        y: 30 
      })
      gsapInstance.set(truckRef.current, { 
        scale: 0, 
        rotation: -45,
        opacity: 0 
      })
      gsapInstance.set(ringsRef.current?.children || [], { 
        scale: 0, 
        opacity: 0 
      })

      gsapInstance.fromTo(backgroundRef.current, 
        { opacity: 0 },
        { opacity: 1, duration: 0.8, ease: "power2.out" }
      )

      gsapInstance.to(truckRef.current, {
        scale: 1,
        rotation: 0,
        opacity: 1,
        duration: 1.2,
        ease: "elastic.out(1, 0.8)",
        delay: 0.3
      })

      gsapInstance.to(ringsRef.current?.children || [], {
        scale: 1,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.15,
        delay: 0.8
      })

      gsapInstance.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 1.2
      })

      gsapInstance.to(subtitleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 1.4
      })

      gsapInstance.to(dotsRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 1.6
      })

      gsapInstance.to(truckRef.current, {
        y: -10,
        duration: 2,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1,
        delay: 1.8
      })

      const truckIcon = truckRef.current?.querySelector('.truck-icon')
      if (truckIcon) {
        gsapInstance.to(truckIcon, {
          rotation: 5,
          duration: 3,
          ease: "power1.inOut",
          yoyo: true,
          repeat: -1,
          delay: 2
        })
      }

      if (ringsRef.current?.children) {
        Array.from(ringsRef.current.children).forEach((ring, index) => {
          gsapInstance.to(ring, {
            scale: 1.3,
            opacity: 0.3,
            duration: 2,
            ease: "power2.inOut",
            yoyo: true,
            repeat: -1,
            delay: 2.2 + index * 0.3
          })
        })
      }

      const dots = dotsRef.current?.children
      if (dots) {
        gsapInstance.to(dots, {
          y: -8,
          duration: 0.6,
          ease: "power2.inOut",
          stagger: 0.1,
          yoyo: true,
          repeat: -1,
          delay: 2
        })

        gsapInstance.to(dots, {
          scale: 1.2,
          duration: 0.6,
          ease: "power2.inOut",
          stagger: 0.1,
          yoyo: true,
          repeat: -1,
          delay: 2
        })
      }

      createParticles()
    }

          const createParticles = async () => {
      const gsap = await import("gsap")
      const { default: gsapInstance } = gsap

      for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div')
        particle.className = 'absolute w-1 h-1 rounded-full opacity-10'
        particle.style.background = Math.random() > 0.5 ? '#3b82f6' : '#71717a'
        particle.style.left = Math.random() * 100 + '%'
        particle.style.top = Math.random() * 100 + '%'
        backgroundRef.current?.appendChild(particle)

        gsapInstance.to(particle, {
          y: -Math.random() * 200 - 100,
          x: (Math.random() - 0.5) * 100,
          opacity: 0,
          duration: Math.random() * 4 + 3,
          ease: "power1.out",
          repeat: -1,
          delay: Math.random() * 2
        })
      }
    }

    setupAnimations()
  }, [])

  return (
    <div 
      ref={backgroundRef}
      className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50 overflow-hidden"
    >
      <div className="absolute inset-0 opacity-3">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, #3b82f6 1px, transparent 1px),
                           radial-gradient(circle at 75% 75%, #71717a 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
          animation: 'drift 20s ease-in-out infinite alternate'
        }}></div>
      </div>

      <div ref={containerRef} className="relative z-10">
        <div ref={ringsRef} className="relative flex items-center justify-center">
          <div className="absolute w-32 h-32 rounded-full border-2 border-blue-500/30"></div>
          <div className="absolute w-40 h-40 rounded-full border border-zinc-700/40"></div>
          <div className="absolute w-48 h-48 rounded-full border border-zinc-800/20"></div>
          
          <div 
            ref={truckRef}
            className="relative p-8 rounded-full shadow-2xl"
            style={{
              background: 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)',
              boxShadow: '0 25px 50px -12px rgba(59, 130, 246, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.05)'
            }}
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/10 to-transparent"></div>
            <Truck className="truck-icon w-16 h-16 text-white relative z-10 drop-shadow-lg" />
          </div>
        </div>

        <div className="mt-12 text-center">
          <h2 
            ref={titleRef}
            className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-zinc-100 mb-3 leading-snug"
          >
            Loading Skip Options
          </h2>
          <p 
            ref={subtitleRef}
            className="text-zinc-400 text-lg font-medium"
          >
            Finding the perfect skips in your area
          </p>
          
          <div ref={dotsRef} className="flex justify-center space-x-2 mt-8">
            <div className="w-3 h-3 bg-blue-500 rounded-full shadow-lg"></div>
            <div className="w-3 h-3 bg-zinc-600 rounded-full shadow-lg"></div>
            <div className="w-3 h-3 bg-zinc-700 rounded-full shadow-lg"></div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes drift {
          0% { transform: translateX(-10px) translateY(-10px); }
          100% { transform: translateX(10px) translateY(10px); }
        }
      `}</style>
    </div>
  )
}