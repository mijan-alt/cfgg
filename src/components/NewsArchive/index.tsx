import { cn } from '@/utilities/ui'
import React from 'react'
import { NewsCard, CardPostData } from '@/components/NewsCard'

export type Props = {
  posts: CardPostData[]
}

export const NewsArchive: React.FC<Props> = (props) => {
  const { posts } = props

  return (
    <div className="mx-auto max-w-7xl space-y-12">
      {posts?.map((result, index) => {
        if (typeof result === 'object' && result !== null) {
          return <NewsCard key={index} doc={result} relationTo="news" showCategories />
        }
        return null
      })}
    </div>
  )
}
