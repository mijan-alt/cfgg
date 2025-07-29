import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { HomeIcon } from 'lucide-react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

export const MediumImpactHero: React.FC<Page['hero']> = ({ 
  links, 
  media, 
  richText,
  breadcrumbText

}) => {

  const primaryColor= '#AF7C0F'
  return (
    <section className="relative w-full h-[300px] bg-red-500 flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        {media && typeof media === 'object' && (
          <Media
            resource={media}
            fill
            className="object-cover object-center"
            priority
            imgClassName="object-cover object-center"
          />
        )}
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 z-10 bg-black/50" />

      {/* Content */}
      <div className="relative z-20 text-center text-white px-4">
        {/* Title from RichText */}
        {richText && (
          <div className="text-4xl md:text-5xl font-bold mb-4">
            <RichText 
              data={richText} 
              enableGutter={false}
              className="[&>h1]:text-4xl [&>h1]:md:text-5xl [&>h1]:font-bold [&>h1]:text-white [&>h1]:mb-0 [&>p]:text-4xl [&>p]:md:text-5xl [&>p]:font-bold [&>p]:text-white [&>p]:mb-0"
            />
          </div>
        )}

        {/* Breadcrumb Navigation */}
        <div className="flex items-center justify-center text-sm space-x-2">
          <HomeIcon size={16} />
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <span>/</span>
          <span style={{ color: primaryColor }}>{breadcrumbText}</span>
        </div>

      </div>
    </section>
  )
}