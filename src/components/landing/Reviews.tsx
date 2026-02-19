"use client"

import { Star } from "lucide-react"
import { useState } from "react"

const testimonials = [
  {
    author: "Jane Wilson",
    title: "Head of Engineering",
    company: "TechCorp",
    content: "We found 3 exceptional engineers in just 2 weeks using Crewcast. The GitHub-based scoring is incredibly accurate.",
    rating: 5,
    large: true,
  },
  {
    author: "Michael Park",
    title: "Recruiter",
    company: "StartupXYZ",
    content: "Finally a platform that eliminates resume fluff. Real metrics, real impact.",
    rating: 5,
  },
  {
    author: "Lisa Chen",
    title: "CTO",
    company: "DataFlow",
    content: "Saved us 40 hours on screening. The data-driven approach is a game changer.",
    rating: 5,
  },
  {
    author: "David Kumar",
    title: "Hiring Manager",
    company: "CloudSync",
    content: "Best hiring platform we've used. Engineers actually want to work with us now.",
    rating: 5,
    large: true,
  },
]

export default function Testimonials() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section className="relative z-10 py-32 px-6 bg-white dark:bg-neutral-950">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="mb-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 mb-6">
            <Star className="w-4 h-4" />
            <span className="text-sm text-neutral-600 dark:text-neutral-400">Loved by 500+ companies</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-4 text-balance">
            Hear from our customers
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            See how leading companies are hiring smarter with Crewcast.
          </p>
        </div>

        {/* Testimonials grid - Bento style */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-max">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`relative group cursor-pointer transition-all duration-300 ${
                testimonial.large ? "md:col-span-2 md:row-span-1" : ""
              }`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Animated glow */}
              <div
                className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 bg-gradient-to-r ${
                  index % 2 === 0
                    ? "from-blue-500/10 to-transparent"
                    : "from-violet-500/10 to-transparent"
                } pointer-events-none`}
              />

              <div className="relative p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-gradient-to-br from-neutral-50 to-white dark:from-neutral-900 dark:to-neutral-950 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all duration-300 h-full hover:shadow-lg hover:shadow-blue-500/5">
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-lg font-medium mb-6 leading-relaxed text-neutral-900 dark:text-white">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="border-t border-neutral-200 dark:border-neutral-800 pt-4">
                  <p className="font-semibold text-neutral-900 dark:text-white">{testimonial.author}</p>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    {testimonial.title} at {testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats bar */}
        <div className="mt-20 p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-gradient-to-r from-blue-50 to-violet-50 dark:from-blue-500/10 dark:to-violet-500/10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-3xl font-black mb-2">500+</p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">Companies Trusting Us</p>
            </div>
            <div>
              <p className="text-3xl font-black mb-2">4.9★</p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">Average Rating</p>
            </div>
            <div>
              <p className="text-3xl font-black mb-2">10K+</p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">Engineers Hired</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
