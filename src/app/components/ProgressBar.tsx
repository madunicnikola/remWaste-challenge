import { MapPin, Trash2, Truck, FileCheck2, CalendarDays, CreditCard } from "lucide-react"

const steps = [
  { label: "Postcode", icon: MapPin },
  { label: "Waste Type", icon: Trash2 },
  { label: "Select Skip", icon: Truck },
  { label: "Permit Check", icon: FileCheck2 },
  { label: "Choose Date", icon: CalendarDays },
  { label: "Payment", icon: CreditCard },
]

export default function ProgressBar() {
  const activeStep = 2

  return (
    <>
      <div className="block md:hidden w-full px-2 py-4">
        <div className="flex items-center justify-between">
          {steps.map((step, i) => {
            const Icon = step.icon
            const isActive = i === activeStep
            const isPast = i < activeStep
            const isFuture = i > activeStep
            
            return (
              <div key={step.label} className="flex flex-col items-center">
                <div className={`rounded-full flex items-center justify-center w-8 h-8 border-2 ${
                  isActive 
                    ? 'border-blue-500 bg-blue-950/60 shadow-lg scale-110' 
                    : isPast 
                      ? 'border-green-500 bg-green-950/60' 
                      : 'border-zinc-700 bg-zinc-900/60'
                } transition-all`}>
                  <Icon className={`w-4 h-4 ${
                    isActive 
                      ? 'text-blue-400' 
                      : isPast 
                        ? 'text-green-400' 
                        : 'text-zinc-400'
                  }`} />
                </div>
                {isActive && (
                  <span className="text-xs font-medium text-blue-400 mt-1 text-center">
                    {step.label}
                  </span>
                )}
              </div>
            )
          })}
        </div>
        
        <div className="relative mt-3 mx-4">
          <div className="h-0.5 bg-zinc-700 w-full"></div>
          <div 
            className="absolute top-0 left-0 h-0.5 bg-blue-500 transition-all duration-300"
            style={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="hidden md:flex w-full items-center justify-center gap-2 sm:gap-6 py-4">
        {steps.map((step, i) => {
          const Icon = step.icon
          const isActive = i === activeStep
          return (
            <div key={step.label} className="flex items-center gap-2">
              <div className={`rounded-full flex items-center justify-center w-9 h-9 sm:w-11 sm:h-11 border-2 ${isActive ? 'border-blue-500 bg-blue-950/60 shadow-lg scale-110' : 'border-zinc-700 bg-zinc-900/60'} transition-all`}>
                <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${isActive ? 'text-blue-400' : 'text-zinc-400'}`} />
              </div>
              <span className={`hidden sm:block text-xs font-medium ${isActive ? 'text-blue-400' : 'text-zinc-400'}`}>{step.label}</span>
              {i < steps.length - 1 && <div className="w-6 h-0.5 bg-zinc-700 mx-1 sm:mx-2" />}
            </div>
          )
        })}
      </div>
    </>
  )
}