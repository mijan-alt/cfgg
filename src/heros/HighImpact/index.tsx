'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import Squares from '@/components/Animations/Square'
export const HighImpactHero: React.FC<Page['hero']> = ({ links, media, richText }) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('dark')
  }, [])

  return (
    <div
      className="relative flex items-center justify-center text-white py-12 min-h-[80vh]"
      data-theme="dark"
    >
      {/* Squares pattern - lowest layer */}
      <div className="absolute inset-0 -z-10 opacity-20">
        <Squares
          speed={0.5}
          squareSize={40}
          direction="diagonal"
          borderColor="#fff"
          hoverFillColor="#222"
        />
      </div>

      {/* Background image above squares */}
      {media && typeof media === 'object' && (
        <Media fill imgClassName="absolute inset-0 object-cover -z-20" priority resource={media} />
      )}

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/80 z-0"></div>

      {/* Hero content */}
      <div className="container mb-8 z-10 relative flex items-center justify-center">
        <div className="max-w-[36.5rem] md:text-center">
          {richText && <RichText className="mb-6 " data={richText} enableGutter={false} />}
          {Array.isArray(links) && links.length > 0 && (
            <ul className="flex md:justify-center gap-4">
              {links.map(({ link }, i) => (
                <li key={i}>
                  <CMSLink {...link} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
