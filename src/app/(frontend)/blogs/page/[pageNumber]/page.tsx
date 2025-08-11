import type { Metadata } from 'next/types'

import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from './page.client'
import { notFound } from 'next/navigation'
import { BlogArchive } from '@/components/BlogsArchive'
import { HomeIcon } from 'lucide-react'
import Link from 'next/link'

export const revalidate = 600

type Args = {
  params: Promise<{
    pageNumber: string
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { pageNumber } = await paramsPromise
  const payload = await getPayload({ config: configPromise })

  const sanitizedPageNumber = Number(pageNumber)

  if (!Number.isInteger(sanitizedPageNumber)) notFound()

  const posts = await payload.find({
    collection: 'news',
    depth: 1,
    limit: 12,
    page: sanitizedPageNumber,
    overrideAccess: false,
  })

  return (
    <>
      <section className="relative w-full h-[300px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img src="/assets/donate.png" className="object-cover object-center" />
        </div>

        {/* Dark Overlay */}
        <div className="absolute inset-0 z-10 bg-black/50" />

        {/* Content */}
        <div className="relative z-20 text-center text-white px-4">
          {/* Title from RichText */}

          <div className="text-4xl md:text-5xl font-bold mb-4">
            <p className="[&>h1]:text-4xl [&>h1]:md:text-5xl [&>h1]:font-bold [&>h1]:text-white [&>h1]:mb-0 [&>p]:text-4xl [&>p]:md:text-5xl [&>p]:font-bold [&>p]:text-white [&>p]:mb-0" />
          </div>

          {/* Breadcrumb Navigation */}
          <div className="flex items-center justify-center text-sm space-x-2">
            <HomeIcon size={16} />
            <Link href="/" className="hover:underline">
              Home
            </Link>
            <span>/</span>
            <span>news</span>
          </div>
        </div>
      </section>
      <div className="pt-24 pb-24 px-16">
        <PageClient />

        <div className="container mb-16">
          <div className="prose dark:prose-invert max-w-none">
            <h1>News</h1>
          </div>
        </div>

        <div className="container mb-8">
          <PageRange
            collection="posts"
            currentPage={posts.page}
            limit={12}
            totalDocs={posts.totalDocs}
          />
        </div>
        <div className=" mx-auto max-w-7xl bg-red-500">
          <BlogArchive posts={posts.docs} />
        </div>

        <div className="container">
          {posts?.page && posts?.totalPages > 1 && (
            <Pagination page={posts.page} totalPages={posts.totalPages} />
          )}
        </div>
      </div>
    </>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { pageNumber } = await paramsPromise
  return {
    title: `Payload Website Template Posts Page ${pageNumber || ''}`,
  }
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const { totalDocs } = await payload.count({
    collection: 'news',
    overrideAccess: false,
  })

  const totalPages = Math.ceil(totalDocs / 10)

  const pages: { pageNumber: string }[] = []

  for (let i = 1; i <= totalPages; i++) {
    pages.push({ pageNumber: String(i) })
  }

  return pages
}
