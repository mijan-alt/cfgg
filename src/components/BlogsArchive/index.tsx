import { cn } from '@/utilities/ui'
import React from 'react'

import { BlogCard, CardPostData } from '../BlogCard'


export type Props = {
  posts: CardPostData[]
}

export const NewsArchive: React.FC<Props> = (props) => {
  const { posts } = props

  return (
    <div className="mx-auto max-w-7xl space-y-12">
      {posts?.map((result, index) => {
        if (typeof result === 'object' && result !== null) {
          return <BlogCard key={index} doc={result} relationTo="blogs" showCategories />
        }
        return null
      })}
    </div>
  )
}
