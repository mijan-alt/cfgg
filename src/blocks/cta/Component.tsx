'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Cta2, Media } from '@/payload-types'
import SplitText from '@/components/Animations/SplitText'

export const CTA2Block: React.FC<Cta2> = ({
  heading,
  subheading,
  backgroundImage,
  primaryButton,
  secondaryButton,
}) => {
  const primaryHref =
    typeof primaryButton.link === 'object' && 'slug' in primaryButton.link
      ? `/${primaryButton.link.slug}`
      : '#'

  const secondaryHref =
    typeof secondaryButton?.link === 'object' && 'slug' in secondaryButton.link
      ? `/${secondaryButton.link.slug}`
      : '#'

  const bg = backgroundImage as Media

  return (
    <section>
      <div className="container">
        <div
          className="relative h-[620px] overflow-hidden rounded-2xl flex items-center justify-center bg-fixed bg-cover bg-center"
          style={{
            backgroundImage: `url(${bg?.url})`,
          }}
        >
          <div className="absolute inset-0 bg-black/50 z-10" />

          <div className="relative z-20 flex flex-col gap-8 p-4 text-center text-white max-w-2xl mx-auto">
            {/* Animated heading */}
            <SplitText
              text={heading}
              className="text-4xl md:text-5xl font-bold"
              splitType="words" // animates letter by letter
              delay={50}         // ms between each letter
              duration={0.6}
              ease="power3.out"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.2}   
            />

            <p className="text-lg">{subheading}</p>
            <div className="flex flex-row justify-center gap-2">
              <Link href={primaryHref}>
                <Button>{primaryButton.label}</Button>
              </Link>
              {secondaryButton?.label && secondaryButton?.link && (
                <Link href={secondaryHref}>
                  <Button variant="secondary">{secondaryButton.label}</Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
