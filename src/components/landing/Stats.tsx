"use client"

import { useEffect, useRef, useState } from "react"

interface StatItem {
  value: number
  label: string
  suffix?: string
}

const stats: StatItem[] = [
  { value: 50000, label: "Engineers Ranked", suffix: "+" },
  { value: 2400, label: "Active Jobs", suffix: "+" },
  { value: 8.2, label: "Better Retention", suffix: "x" },
  { value: 150, label: "Data Points", suffix: "+" },
]

function Counter({ value, duration = 2000 }: { value: number; duration?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const hasStarted = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted.current) {
          hasStarted.current = true

          let start = 0
          const increment = value / (duration / 16)
          const timer = setInterval(() => {
            start += increment
            if (start >= value) {
              setCount(value)
              clearInterval(timer)
            } else {
              setCount(Math.floor(start))
            }
          }, 16)

          return () => clearInterval(timer)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [value, duration])

  return <div ref={ref}>{count}</div>
}

export default function Stats() {
  return (
    <section className="relative z-10 py-20 px-6 bg-gradient-to-b from-transparent to-neutral-50 dark:to-neutral-900/50">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600">
                <Counter value={stat.value} />
                {stat.suffix}
              </div>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
