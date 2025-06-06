import SkipCard from "./SkipCard"
import { useRef } from "react"

export default function SkipGrid({ skips, selectedSkipId, onSelect }: { skips: any[], selectedSkipId: number | null, onSelect: (id: number) => void }) {
  const rows = []
  for (let i = 0; i < skips.length; i += 3) {
    rows.push(skips.slice(i, i + 3))
  }
  const width = 340 * 3 + 64
  const height = rows.length * 220 + 40

  return (
    <div className="relative w-full flex flex-col items-center justify-center py-8">
      <div className="relative z-10 flex flex-col gap-16">
        {rows.map((row, rowIdx) => (
          <div key={rowIdx} className={`flex flex-row gap-16 ${rowIdx % 2 === 1 ? 'flex-row' : ''}`}> 
            {row.map(skip => (
              <SkipCard key={skip.id} skip={skip} selected={selectedSkipId === skip.id} onSelect={() => onSelect(skip.id)} />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
} 