'use client'

import { ArrowRight, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CMSLink } from '@/components/Link'
import { Page, Post } from '@/payload-types'
import { useRef } from 'react'
import { Media } from '@/components/Media'
import { Carousel1 } from '@/payload-types'

export default function Carousel1Block({ heading, intro, caseStudies }: Carousel1) {
  const containerRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (!containerRef.current) return
    const scrollAmount = 360
    containerRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    })
  }

  return (
    <section className="py-32">
      <div className="container">
        <div className="mb-14 flex items-end justify-between">
          <div className="flex flex-col gap-4">
            <h2 className="text-3xl font-medium md:text-4xl lg:text-5xl">{heading}</h2>
            <p className="max-w-lg text-muted-foreground">{intro}</p>
          </div>
          <div className="hidden gap-2 md:flex">
            <Button variant="ghost" size="icon" onClick={() => scroll('left')}>
              <ArrowLeft className="size-5 text-primary" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => scroll('right')}>
              <ArrowRight className="size-5 text-primary" />
            </Button>
          </div>
        </div>
        <div className="overflow-x-auto scrollbar-hide" ref={containerRef}>
          <div className="flex gap-5">
            {caseStudies?.map((study, i) => (
              <CMSLink
                key={i}
                {...study.link}
                className="group relative w-[320px] h-[400px] lg:w-[360px] shrink-0 rounded-xl overflow-hidden border bg-card shadow-sm hover:shadow-md transition-shadow"
              >
                <Media
                  resource={study.image}
                  className="absolute h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  imgClassName="h-full w-full"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-10" />
                <div className="absolute bottom-0 left-0 z-20 p-6 text-white">
                  <h3 className="mb-2 text-xl font-semibold line-clamp-2">{study.title}</h3>
                  <p className="mb-6 line-clamp-2 text-sm">{study.description}</p>
                  <div className="flex items-center text-sm font-medium">
                    {study.link.label || 'Read more'}
                    <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </CMSLink>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
