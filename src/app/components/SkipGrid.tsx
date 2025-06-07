import SkipCard from "./SkipCard";
import SkeletonSkipCard from "./SkeletonSkipCard";

export default function SkipGrid({ skips, selectedSkipId, onSelect, isLoading, disabled }: { skips: any[], selectedSkipId: number | null, onSelect: (id: number) => void, isLoading: boolean, disabled?: boolean }) {
  const displayItems = isLoading ? Array(4).fill(null) : skips;
  
  const rows = [];
  for (let i = 0; i < displayItems.length; i += 3) {
    rows.push(displayItems.slice(i, i + 3));
  }

  return (
    <div className="relative w-full flex flex-col items-center justify-center py-8">
      <div className="block md:hidden w-full flex flex-col items-center px-4">
        <div className="flex flex-col gap-4 items-center">
          {displayItems.map((skip, index) => (
            isLoading ? (
              <SkeletonSkipCard key={`skeleton-${index}`} />
            ) : (
              <SkipCard 
                key={skip.id} 
                skip={skip} 
                selected={selectedSkipId === skip.id} 
                onSelect={() => onSelect(skip.id)} 
                disabled={disabled}
              />
            )
          ))}
        </div>
      </div>

      <div className="hidden md:block">
        <div className="relative z-10 flex flex-col gap-16">
          {rows.map((row, rowIdx) => (
            <div key={rowIdx} className={`flex flex-row gap-16 ${rowIdx % 2 === 1 ? 'flex-row' : ''}`}> 
              {row.map((skip, index) => (
                isLoading ? (
                  <SkeletonSkipCard key={`skeleton-${rowIdx}-${index}`} />
                ) : (
                  <SkipCard 
                    key={skip.id} 
                    skip={skip} 
                    selected={selectedSkipId === skip.id} 
                    onSelect={() => onSelect(skip.id)} 
                    disabled={disabled}
                  />
                )
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}