"use client";
import { useRef, useEffect, useState } from "react";
import FeatureBadge from "./FeatureBadge";
import { Truck, ShieldCheck, Scale } from "lucide-react";
import Image from "next/image";

export default function SkipCard({ skip, selected, onSelect, disabled }: { skip: any, selected: boolean, onSelect: () => void, disabled?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const priceRef = useRef<HTMLSpanElement>(null);
  
  const [isMobile, setIsMobile] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(hover: none)').matches || window.innerWidth < 768);
    }
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (ref.current) {
      import("gsap").then(gsap => {
        gsap.gsap.fromTo(ref.current, 
          { opacity: 0, y: 40 }, 
          { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }
        )
      })
    }
  }, []);

  useEffect(() => {
    if (disabled && isHovered) {
      handleMouseLeave();
    }
  }, [disabled]);

  const handleMouseEnter = async () => {
    if (isMobile || disabled || selected) return;
    
    setIsHovered(true);
    const gsap = await import("gsap");
    const { gsap: gsapInstance } = gsap;

    gsapInstance.to(ref.current, {
      y: -8,
      scale: 1.03,
      duration: 0.3,
      ease: "power2.out"
    })

    const img = imageRef.current?.querySelector('img');
    if (img) {
      gsapInstance.to(img, {
        scale: 1.1,
        filter: "brightness(1.1)",
        duration: 0.3,
        ease: "power2.out"
      })
    }

    gsapInstance.to(contentRef.current, {
      y: -4,
      duration: 0.3,
      ease: "power2.out"
    });

    gsapInstance.to(priceRef.current, {
      scale: 1.1,
      color: "#f0abfc",
      duration: 0.3,
      ease: "power2.out"
    });

    gsapInstance.to(ref.current, {
      boxShadow: "0 20px 40px -12px rgba(59, 130, 246, 0.4), 0 0 0 1px rgba(59, 130, 246, 0.3)",
      duration: 0.3,
      ease: "power2.out"
    });
  }

  const handleMouseLeave = async () => {
    if (isMobile) return;
    
    setIsHovered(false);
    const gsap = await import("gsap");
    const { gsap: gsapInstance } = gsap;

    gsapInstance.to(ref.current, {
      y: 0,
      scale: 1,
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      duration: 0.3,
      ease: "power2.out"
    });

    const img = imageRef.current?.querySelector('img')
    if (img) {
      gsapInstance.to(img, {
        scale: 1,
        filter: "brightness(1)",
        duration: 0.3,
        ease: "power2.out"
      })
    }

    gsapInstance.to(contentRef.current, {
      y: 0,
      duration: 0.3,
      ease: "power2.out"
    });

    gsapInstance.to(priceRef.current, {
      scale: 1,
      color: "#f0abfc",
      duration: 0.3,
      ease: "power2.out"
    });
  }

  return (
    <div
      ref={ref}
      onClick={onSelect}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative w-full max-w-xs sm:max-w-sm lg:max-w-md h-auto lg:h-[340px] flex flex-col bg-white/10 border border-zinc-700 rounded-2xl shadow-xl overflow-hidden cursor-pointer select-none transition-all duration-300 
        ${selected ? "ring-4 ring-fuchsia-500 scale-105" : ""} ${disabled ? "pointer-events-none opacity-50" : ""}`}
      style={{ backdropFilter: "blur(10px)" }}
    >
      <div ref={imageRef} className="relative w-full h-40 overflow-hidden">
        <Image 
          src={`/images/skips/${skip.size}-yarder-skip.webp`} 
          alt={`${skip.size} Yard Skip`} 
          fill 
          className="object-cover rounded-t-2xl transition-all duration-500" 
          priority 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      
      <div ref={contentRef} className="flex-1 p-4 flex flex-col transition-all duration-300">
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-zinc-100 transition-colors duration-300 hover:text-white">
            {skip.size} Yard Skip
          </span>
          <span 
            ref={priceRef}
            className="text-2xl font-extrabold text-fuchsia-300 transition-all duration-300"
          >
            £{Math.round(skip.price_before_vat * 1.2)}
          </span>
        </div>
        <div className="text-sm text-zinc-400 mb-2 transition-colors duration-300 hover:text-zinc-300">
          {skip.hire_period_days} day hire period
        </div>
        <div className="flex flex-wrap gap-2 mt-auto">
          <FeatureBadge icon={Truck} label={`${skip.size} Yards`} color="bg-fuchsia-900 text-fuchsia-200 border-fuchsia-700" />
          {skip.allowed_on_road && <FeatureBadge icon={ShieldCheck} label="On Road" color="bg-green-900 text-green-200 border-green-700" />}
          {skip.allows_heavy_waste && <FeatureBadge icon={Scale} label="Heavy Waste" color="bg-yellow-900 text-yellow-200 border-yellow-700" />}
        </div>
      </div>
      
      {selected && (
        <div className="absolute inset-0 pointer-events-none rounded-2xl animate-pulse" 
             style={{boxShadow: "0 0 0 8px rgba(236,72,153,0.18)"}} />
      )}
      
      {!isMobile && (
        <div className="absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"
             style={{
               background: "linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)",
               transform: "translateX(-100%)",
               animation: "shine 2s ease-in-out infinite"
             }}>
        </div>
      )}

      <style jsx>
        {`
          @keyframes shine {
            0% { transform: translateX(-100%); }
            50% { transform: translateX(100%); }
            100% { transform: translateX(100%); }
          }
        `}
      </style>
    </div>
  );
}