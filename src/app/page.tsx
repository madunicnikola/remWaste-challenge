"use client"
import { useEffect, useState } from "react"
import ProgressBar from "./components/ProgressBar"
import SkipGrid from "./components/SkipGrid"
import BottomBar from "./components/BottomBar"
import PageLoader from "./components/PageLoader"

export default function Home() {
  const [skips, setSkips] = useState<any[]>([]);
  const [selectedSkipId, setSelectedSkipId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  
  const selectedSkip = skips.find(s => s.id === selectedSkipId) || null;

  useEffect(() => {
    const fetchSkips = async () => {
      try {
        const response = await fetch("https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft");
        const data = await response.json();
        
        const minLoadingTime = new Promise(resolve => setTimeout(resolve, 2000));
        await minLoadingTime;
        
        setSkips(data);
        setIsLoading(false);
        
        setTimeout(() => {
          setIsInitialLoad(false);
        }, 300);
      } catch (error) {
        console.error('Failed to fetch skips:', error);
        setIsLoading(false);
        setIsInitialLoad(false);
      }
    };

    fetchSkips();
  }, []);

  if (isInitialLoad) {
    return <PageLoader />;
  }

  const handleClearSelection = () => {
    setSelectedSkipId(null)
  }

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pb-32 font-[family-name:var(--font-geist-sans)] bg-black">
      <div className="w-full max-w-7xl z-10">
        <ProgressBar />
        <div className="text-center mt-4 sm:mt-6 mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-zinc-100 tracking-tight drop-shadow-xl">Choose Your Skip Size</h1>
          <p className="text-zinc-400 mt-2 text-sm sm:text-base lg:text-lg">Select the skip size that best suits your needs</p>
        </div>
        <SkipGrid 
          skips={skips} 
          selectedSkipId={selectedSkipId} 
          onSelect={setSelectedSkipId} 
          isLoading={isLoading} 
          disabled={!!selectedSkip} 
        />
      </div>
      <BottomBar selectedSkip={selectedSkip} onContinue={() => {}} onClearSelection={handleClearSelection} />
    </div>
  )
}