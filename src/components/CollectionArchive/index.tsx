import { cn } from '@/utilities/ui'
import React from 'react'
import { Card, CardPostData } from '@/components/Card'

export type Props = {
  posts: CardPostData[]
}

export const CollectionArchive: React.FC<Props> = (props) => {
  const { posts } = props

  return (
    <div className="flex flex-col space-y-16 w-full">
      {posts?.map((result, index) => {
        if (typeof result === 'object' && result !== null) {
          return <Card key={index} doc={result} relationTo="posts" showCategories layout="news" />
        }
        return null
      })}
    </div>
  )
}
