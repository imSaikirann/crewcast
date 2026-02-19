"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useEffect, useState } from "react"

export default function FinalCTA() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <section className="relative z-10 py-32 px-6 overflow-hidden">
      {/* Animated background gradient that follows cursor */}
      <div
        className="absolute inset-0 -z-10 transition-all duration-500 ease-out"
        style={{
          background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)`,
        }}
      />

      <div className="max-w-4xl mx-auto text-center space-y-8">
        {/* Main headline */}
        <div className="space-y-4">
          <h2 className="text-5xl md:text-6xl font-black text-balance">
            Ready to hire smarter?
          </h2>
          <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            Join 500+ companies finding their next engineers based on real GitHub impact.
          </p>
        </div>

        {/* CTA Buttons with stagger animation */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
          <Link href="/dashboard">
            <Button
             
              className="gap-2  h-auto text-base font-semibold group hover:shadow-lg hover:shadow-blue-500/20"
            >
              Get started free
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>

          <Link href="#demo">
            <Button
              variant="outline"
        
              className=" h-auto text-base font-semibold"
            >
              Watch 2-min demo
            </Button>
          </Link>
        </div>

        {/* Trust badges */}
        <div className="pt-12 border-t border-neutral-200 dark:border-neutral-800">
          <p className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 mb-6">
            TRUSTED BY COMPANIES EVERYWHERE
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {["Stripe", "Vercel", "Notion", "Linear", "Figma"].map((company) => (
              <div
                key={company}
                className="text-sm font-semibold text-neutral-600 dark:text-neutral-400 opacity-60 hover:opacity-100 transition-opacity"
              >
                {company}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
