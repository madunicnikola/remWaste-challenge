"use client"
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import Image from "next/image"
import { useState, useEffect } from "react"

export default function BottomBar({ selectedSkip, onContinue }: { selectedSkip: any, onContinue: () => void }) {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setIsOpen(!!selectedSkip)
  }, [selectedSkip])

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerContent className="h-[85vh]">
        <div className="mx-auto w-full max-w-2xl">
          <DrawerHeader>
            <DrawerTitle>Selected Skip Details</DrawerTitle>
            <DrawerDescription>Review your skip selection before proceeding</DrawerDescription>
          </DrawerHeader>
          
          {selectedSkip && (
            <div className="p-4">
              <div className="flex gap-6 items-start">
                <div className="relative w-32 h-32 rounded-lg overflow-hidden">
                  <Image
                    src={`/images/skips/${selectedSkip.size}-yarder-skip.jpg`}
                    alt={`${selectedSkip.size} Yard Skip`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-zinc-200">{selectedSkip.size} Yard Skip</h3>
                  <p className="text-zinc-400 mt-1">{selectedSkip.hire_period_days} day hire</p>
                  <div className="mt-4">
                    <p className="text-sm text-zinc-400">Price (inc. VAT)</p>
                    <p className="text-2xl font-bold text-blue-400">£{Math.round(selectedSkip.price_before_vat * 1.2)}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <div className="p-4 bg-zinc-900 rounded-lg">
                  <h4 className="font-semibold text-zinc-200 mb-2">What's Included</h4>
                  <ul className="text-sm text-zinc-400 space-y-2">
                    <li>• Delivery and collection within 5 working days</li>
                    <li>• Skip permit (if required)</li>
                    <li>• Environmentally responsible waste disposal</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          <DrawerFooter>
            <Button size="lg" className="w-full" onClick={onContinue}>
              Continue to Checkout
            </Button>
            <DrawerClose asChild>
              <Button variant="outline" className="w-full">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}