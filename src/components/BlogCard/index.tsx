'use client'

import { Blog } from '@/payload-types'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Media } from '@/components/Media'

export type CardPostData = Pick<Blog, 'slug' | 'categories' | 'meta' | 'title' | 'createdAt'>

const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export const BlogCard: React.FC<{
  doc?: CardPostData
  relationTo?: 'blogs'
  showCategories?: boolean
}> = ({ doc, relationTo = 'blogs', showCategories }) => {
  if (!doc) return null

  const { slug, categories, meta, title, createdAt } = doc
  const { description, image: metaImage } = meta || {}

  const categoryTitle =
    showCategories && categories && categories.length > 0 && typeof categories[0] === 'object'
      ? categories[0].title || 'Uncategorized'
      : undefined

  const href = `/${relationTo}/${slug}`

  return (
    <div className="flex flex-col gap-6 sm:flex-row ">
      {/* Image */}
      <div className="shrink-0">
        <Link href={href} className="block hover:opacity-90 transition-opacity duration-200">
          {metaImage && typeof metaImage !== 'string' ? (
            <Media
              resource={metaImage}
              className="aspect-video w-full rounded-lg object-cover sm:w-[260px]"
            />
          ) : (
            <div className="aspect-video w-full sm:w-[260px] rounded-lg bg-muted flex items-center justify-center text-sm text-muted-foreground">
              No image
            </div>
          )}
        </Link>
      </div>

      {/* Content */}
      <div className="flex-1 space-y-3">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          {categoryTitle && <Badge variant="secondary">{categoryTitle}</Badge>}
          <span>{formatDate(createdAt || '')}</span>
        </div>

        <h3 className="text-xl font-bold leading-tight lg:text-2xl">
          <Link href={href} className="hover:underline">
            {title}
          </Link>
        </h3>

        {description && <p className="text-base text-muted-foreground">{description}</p>}

        <Link href={href} className="inline-flex items-center text-primary hover:underline">
          Read more <ArrowRight className="ml-2 size-4" />
        </Link>
      </div>
    </div>
  )
}
