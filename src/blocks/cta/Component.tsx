import React from 'react'
import Link from 'next/link'

import { Media } from '@/components/Media'
import { Button } from '@/components/ui/button'
import { Cta2 } from '@/payload-types'

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

  return (
    <section className="">
      <div className="container">
        <div className="relative h-[620px] overflow-hidden rounded-2xl bg-cover bg-center flex items-center justify-center">
          <Media
            resource={backgroundImage}
            className="absolute inset-0 object-cover w-full h-full z-0"
            imgClassName="h-full w-full"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 z-10" />
          <div className="relative z-20 flex flex-col gap-8 p-4 text-center text-white max-w-2xl mx-auto">
            <h2 className="text-5xl font-bold">{heading}</h2>
            <p className="text-lg">{subheading}</p>
            <div className="flex flex-col sm:flex-row justify-center gap-2">
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
