import React from 'react'
import Link from 'next/link'
import { Home } from 'lucide-react'

interface HeroSectionProps {
  /** Background image URL */
  backgroundImage: string
  /** Hero title text */
  title: string
  /** Current page slug for breadcrumb */
  slug: string
  /** Optional subtitle */
  subtitle?: string
  /** Custom height (default: 300px) */
  height?: string
  /** Alt text for background image */
  imageAlt?: string
}

export const SectionHero: React.FC<HeroSectionProps> = ({
  backgroundImage,
  title,
  slug,
  subtitle,
  height = '300px',
  imageAlt = 'Hero background'
}) => {
  return (
    <section 
      className="relative w-screen flex items-center justify-center overflow-hidden"
      style={{ height }}
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={backgroundImage} 
          alt={imageAlt}
          className="object-cover object-center w-full h-full"
        />
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 z-10 bg-black/50" />

      {/* Content */}
      <div className="relative z-20 text-center text-white px-4 max-w-4xl">
        {/* Title */}
        <div className="text-4xl md:text-5xl font-bold mb-4">
          <h1>{title}</h1>
        </div>

        {/* Optional Subtitle */}
        {subtitle && (
          <p className="text-lg md:text-xl mb-6 text-white/90">
            {subtitle}
          </p>
        )}

        {/* Breadcrumb Navigation */}
        <nav className="flex items-center justify-center text-sm space-x-2" aria-label="Breadcrumb">
          <Home size={16} aria-hidden="true" />
          <Link href="/" className="hover:underline transition-colors">
            Home
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-white/80" aria-current="page">
            {slug}
          </span>
        </nav>
      </div>
    </section>
  )
}