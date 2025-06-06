"use client"
import { useRef, useEffect } from "react"
import FeatureBadge from "./FeatureBadge"
import { Truck, ShieldCheck, Scale } from "lucide-react" 
import Image from "next/image"

export default function SkipCard({ skip, selected, onSelect }: { skip: any, selected: boolean, onSelect: () => void }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (ref.current) {
      import("gsap").then(gsap => {
        gsap.gsap.fromTo(ref.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" })
      })
    }
  }, [])
  return (
    <div
      ref={ref}
      onClick={onSelect}
      className={`relative w-80 h-[340px] flex flex-col bg-white/10 border border-zinc-700 rounded-2xl shadow-xl overflow-hidden cursor-pointer select-none transition-transform duration-300 ${selected ? "ring-4 ring-fuchsia-500 scale-105" : "hover:scale-105 hover:shadow-2xl"}`}
      style={{ backdropFilter: "blur(10px)" }}
    >
      <div className="relative w-full h-40">
        <Image src={`/images/skips/${skip.size}-yarder-skip.jpg`} alt={`${skip.size} Yard Skip`} fill className="object-cover rounded-t-2xl" priority />
      </div>
      <div className="flex flex-col flex-1 px-6 py-4 gap-2 justify-between">
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-zinc-100">{skip.size} Yard Skip</span>
          <span className="text-2xl font-extrabold text-fuchsia-300">£{Math.round(skip.price_before_vat * 1.2)}</span>
        </div>
        <div className="text-sm text-zinc-400 mb-2">{skip.hire_period_days} day hire</div>
        <div className="flex flex-wrap gap-2 mt-auto">
          <FeatureBadge icon={Truck} label={`${skip.size} Yards`} color="bg-fuchsia-900 text-fuchsia-200 border-fuchsia-700" />
          {skip.allowed_on_road && <FeatureBadge icon={ShieldCheck} label="On Road" color="bg-green-900 text-green-200 border-green-700" />}
          {skip.allows_heavy_waste && <FeatureBadge icon={Scale} label="Heavy Waste" color="bg-yellow-900 text-yellow-200 border-yellow-700" />}
        </div>
      </div>
      {selected && <div className="absolute inset-0 pointer-events-none rounded-2xl animate-pulse" style={{boxShadow: "0 0 0 8px rgba(236,72,153,0.18)"}} />}
    </div>
  )
} 
