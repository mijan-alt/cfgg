'use client'
import { cn } from '@/utilities/ui'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import React, { Fragment } from 'react'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card as ShadcnCard, CardContent } from '@/components/ui/card'

import type { Post } from '@/payload-types'
import { Media } from '@/components/Media'

export type CardPostData = Pick<Post, 'slug' | 'categories' | 'meta' | 'title' | 'createdAt'>

// // Category color mapping - you can extend this based on your categories
// const getCategoryColor = (categoryTitle: string): string => {
//   const colorMap: Record<string, string> = {
//    'Program Updates': 'bg-blue-100 text-blue-700 border-blue-200',
//     Events: 'bg-green-100 text-green-700 border-green-200',
//     Partnerships: 'bg-purple-100 text-purple-700 border-purple-200',
//     'Press Releases': 'bg-orange-100 text-orange-700 border-orange-200',
//     'Impact Stories': 'bg-teal-100 text-teal-700 border-teal-200',
//     'Funding & Grants': 'bg-indigo-100 text-indigo-700 border-indigo-200',
//   }

//   return colorMap[categoryTitle] || 'bg-gray-100 text-gray-700 border-gray-200'
// }

// Format date helper
const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export const Card: React.FC<{
  alignItems?: 'center'
  className?: string
  doc?: CardPostData
  relationTo?: 'posts'
  showCategories?: boolean
  title?: string
  layout?: 'default' | 'news'
}> = (props) => {
  const { card, link } = useClickableCard({})
  const {
    className,
    doc,
    relationTo,
    showCategories,
    title: titleFromProps,
   
  } = props

  const { slug, categories, meta, title, createdAt } = doc || {}
  const { description, image: metaImage } = meta || {}

  const hasCategories = categories && Array.isArray(categories) && categories.length > 0
  const titleToUse = titleFromProps || title
  const sanitizedDescription = description?.replace(/\s/g, ' ')
  const href = `/${relationTo}/${slug}`

   return (
      <div className="flex flex-col items-center gap-16 md:flex-row">
        {/* Image */}
        <div className="flex h-80 w-full items-center justify-center overflow-hidden rounded-3xl  md:w-140">
          {metaImage && typeof metaImage !== 'string' ? (
            <Media resource={metaImage} className="h-full w-full object-cover" />
          ) : (
            <div className="flex items-center justify-center h-full w-full bg-muted text-muted-foreground">
              No image
            </div>
          )}
        </div>

        {/* Content Card */}
        <div className="border-none shadow-none  text-card-foreground flex flex-col gap-6 rounded-xl py-6">
          
            <div className="mb-5 flex h-90 items-start border-b py-10 md:mb-0 lg:gap-32 md:border-t">
              {/* Title, Category and Date */}
              <div className="flex h-full w-full flex-col items-start justify-between pr-8">
                {/* Category Badge */}
                {showCategories && hasCategories && (
                  <div className="mb-3">
                    {categories?.map((category, index) => {
                      if (typeof category === 'object') {
                        const { title: titleFromCategory } = category
                        const categoryTitle = titleFromCategory || 'Uncategorized'
                       

                        return (
                          <div
                            key={index}
                            className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium  mr-2`}
                          >
                            {categoryTitle}
                          </div>
                        )
                      }
                      return null
                    })}
                  </div>
                )}

                {titleToUse && (
                  <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                    <Link
                      href={href}
                      ref={link.ref}
                      className="hover:text-primary transition-colors"
                    >
                      {titleToUse}
                    </Link>
                  </h2>
                )}

                {createdAt && (
                  <p className="mt-2 text-sm font-semibold tracking-widest text-muted-foreground uppercase">
                    {formatDate(createdAt)}
                  </p>
                )}
              </div>

              {/* Description and Button */}
              <div className="flex h-full w-full flex-col items-start justify-between gap-6">
                {sanitizedDescription && (
                  <p className="text-lg leading-relaxed font-normal tracking-tight text-muted-foreground md:text-xl">
                    {sanitizedDescription}
                  </p>
                )}

                <Button
                  variant="ghost"
                  className="h-9 py-2 px-0 text-primary transition-all ease-in-out hover:gap-6 hover:text-accent-foreground hover:bg-accent dark:hover:bg-accent/50 inline-flex items-center justify-center gap-4"
                  asChild
                >
                  <Link href={href}>
                    <span className="text-lg font-semibold tracking-tight">Read</span>
                    <ArrowRight className="h-6 w-6" />
                  </Link>
                </Button>
              </div>
            </div>
         
        </div>
      </div>
    )

  
 
}
