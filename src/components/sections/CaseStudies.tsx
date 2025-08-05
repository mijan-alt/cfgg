'use client'

import { ArrowRight, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRef } from 'react'

const caseStudies = [
  {
    href: 'https://ui.shadcn.com',
    title: 'shadcn/ui: Building a Modern Component Library',
    description:
      'Explore how shadcn/ui revolutionized React component libraries by providing a unique approach to component distribution and customization, making it easier for developers to build beautiful, accessible applications.',
    image:
      'https://images.unsplash.com/photo-1551250928-243dc937c49d?auto=format&fit=crop&w=1080&q=80',
  },
  {
    href: 'https://tailwindcss.com',
    title: 'Tailwind CSS: The Utility-First Revolution',
    description:
      'Discover how Tailwind CSS transformed the way developers style their applications, offering a utility-first approach that speeds up development while maintaining complete design flexibility.',
    image:
      'https://images.unsplash.com/photo-1551250928-e4a05afaed1e?auto=format&fit=crop&w=1080&q=80',
  },
  {
    href: 'https://astro.build',
    title: 'Astro: The All-in-One Web Framework',
    description:
      "Learn how Astro's innovative 'Islands Architecture' and zero-JS-by-default approach is helping developers build faster websites while maintaining rich interactivity where needed.",
    image:
      'https://images.unsplash.com/photo-1536735561749-fc87494598cb?auto=format&fit=crop&w=1080&q=80',
  },
  {
    href: 'https://react.dev',
    title: 'React: Pioneering Component-Based UI',
    description:
      'See how React continues to shape modern web development with its component-based architecture, enabling developers to build complex user interfaces with reusable, maintainable code.',
    image:
      'https://images.unsplash.com/photo-1548324215-9133768e4094?auto=format&fit=crop&w=1080&q=80',
  },
  {
    href: 'https://nextjs.org',
    title: 'Next.js: The React Framework for Production',
    description:
      'Explore how Next.js has become the go-to framework for building full-stack React applications, offering features like server components, file-based routing, and automatic optimization.',
    image:
      'https://images.unsplash.com/photo-1550070881-a5d71eda5800?auto=format&fit=crop&w=1080&q=80',
  },
]

export default function CaseStudiesCarousel() {
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
            <h2 className="text-3xl font-medium md:text-4xl lg:text-5xl">Case Studies</h2>
            <p className="max-w-lg text-muted-foreground">
              Discover how leading companies and developers are leveraging modern web technologies
              to build exceptional digital experiences. These case studies showcase real-world
              applications and success stories.
            </p>
          </div>
          <div className="hidden gap-2 md:flex">
            <Button variant="ghost" size="icon" onClick={() => scroll('left')}>
              <ArrowLeft className="size-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => scroll('right')}>
              <ArrowRight className="size-5" />
            </Button>
          </div>
        </div>
        <div className="overflow-x-auto scrollbar-hide" ref={containerRef}>
          <div className="flex gap-5">
            {caseStudies.map((study, i) => (
              <a
                key={i}
                href={study.href}
                className="relative w-[320px] h-[400px] lg:w-[360px] shrink-0 rounded-xl overflow-hidden border bg-card shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="">
                  <img
                    src={study.image}
                    alt={study.title}
                    className="absolute h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-10" />
                  <div className="absolute bottom-0 left-0 z-20 p-6 text-white">
                    <h3 className="mb-2 text-xl font-semibold line-clamp-2">{study.title}</h3>
                    <p className="mb-6 line-clamp-2 text-sm">{study.description}</p>
                    <div className="flex items-center text-sm font-medium">
                      Read more
                      <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
