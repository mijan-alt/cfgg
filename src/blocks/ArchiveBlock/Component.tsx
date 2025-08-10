import type { News, ArchiveBlock as ArchiveBlockProps } from '@/payload-types'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import RichText from '@/components/RichText'
import { NewsArchive } from '@/components/NewsArchive'

export const ArchiveBlock: React.FC<
  ArchiveBlockProps & {
    id?: string
  }
> = async (props) => {
  const { id, categories, introContent, limit: limitFromProps, populateBy, selectedDocs } = props

  const limit = limitFromProps || 3

  let posts: News[] = []

  if (populateBy === 'collection') {
    const payload = await getPayload({ config: configPromise })

    const flattenedCategories = categories?.map((category) => {
      if (typeof category === 'object') return category.id
      else return category
    })

    const fetchedPosts = await payload.find({
      collection: 'news',
      depth: 1,
      limit,
      ...(flattenedCategories && flattenedCategories.length > 0
        ? {
            where: {
              categories: {
                in: flattenedCategories,
              },
            },
          }
        : {}),
    })

    posts = fetchedPosts.docs
  } else {
   if (selectedDocs?.length) {
      posts = selectedDocs.filter((p): p is News => typeof p === 'object')
}  

  }

  return (
    <section className="py-32" id={`block-${id}`}>
      <div className="container mx-auto px-4">
        <h1 className="mb-12 max-w-lg font-sans text-5xl font-extrabold tracking-tight text-foreground md:text-7xl">
          Latest News & Updates
        </h1>

        <NewsArchive posts={posts} />
      </div>
    </section>
  )
}
