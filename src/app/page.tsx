"use client"
import { useEffect, useState } from "react"
import ProgressBar from "./components/ProgressBar"
import SkipGrid from "./components/SkipGrid"
import BottomBar from "./components/BottomBar"

export default function Home() {
  const [skips, setSkips] = useState<any[]>([]);
  const [selectedSkipId, setSelectedSkipId] = useState<number | null>(null);
  
  const selectedSkip = skips.find(s => s.id === selectedSkipId) || null;

  useEffect(() => {
    fetch("https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft")
      .then(res => res.json())
      .then(data => setSkips(data))
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-2 sm:px-8 pb-32 font-[family-name:var(--font-geist-sans)] bg-black">
      <div className="w-full max-w-6xl z-10">
        <ProgressBar />
        <div className="text-center mt-2 mb-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-100 tracking-tight drop-shadow-xl">Choose Your Skip Size</h1>
          <p className="text-zinc-400 mt-2 text-base sm:text-lg">Select the skip size that best suits your needs</p>
        </div>
        <SkipGrid skips={skips} selectedSkipId={selectedSkipId} onSelect={setSelectedSkipId} />
      </div>
      <BottomBar selectedSkip={selectedSkip} onContinue={() => {}} />
    </div>
  )
}
