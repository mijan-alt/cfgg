'use client'
import React, { useState, useEffect, useRef } from 'react'
import { Users, MapPin, Award } from 'lucide-react'

interface CounterProps {
  end: number
  duration?: number
  suffix?: string
}

const Counter: React.FC<CounterProps> = ({ end, duration = 2000, suffix = '' }) => {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const countRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (countRef.current) {
      observer.observe(countRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return

    let startTime: number
    let animationFrame: number

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)

      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      setCount(Math.floor(easeOutQuart * end))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame)
    }
  }, [isVisible, end, duration])

  return (
    <div ref={countRef} className="text-4xl md:text-5xl font-bold text-white mb-2">
      {count.toLocaleString()}
      {suffix}
    </div>
  )
}

export const ImpactBlock: React.FC = () => {
  const impactData = [
    {
      icon: Users,
      value: 150000,
      suffix: '+',
      label: 'Citizens Empowered',
    },
    {
      icon: MapPin,
      value: 150,
      suffix: '+',
      label: 'Communities Reached',
    },
    {
      icon: Award,
      value: 25,
      suffix: '+',
      label: 'Civic Programs',
    },
  ]

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-primary to-[#007b6c]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
            Our Impact Across Nigeria
          </h2>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            Together\, we are re building a stronger democracy through civic engagement and youth
            empowerment
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {impactData.map((item, index) => {
            const IconComponent = item.icon
            return (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                </div>
                <Counter end={item.value} suffix={item.suffix} duration={2500} />
                <p className="text-white/90 text-lg font-medium">{item.label}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
