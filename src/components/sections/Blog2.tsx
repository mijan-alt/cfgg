import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Image from "next/image"

export default function BlogSection() {
  return (
    <section className="py-32">
      <div className="container mx-auto">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <Badge variant="secondary" className="mb-6">
            Latest Updates
          </Badge>
          <h2 className="mb-3 text-3xl font-semibold text-pretty md:mb-4 md:text-5xl lg:mb-6">
            Blog Posts
          </h2>
          <p className="mb-12 text-muted-foreground md:text-base lg:text-lg">
            Discover the latest trends, tips, and best practices in modern web development.
            From UI components to design systems, stay updated with our expert insights.
          </p>
        </div>

        {/* Blog Cards */}
        <div className="mx-auto max-w-5xl space-y-12">
          {[
            {
              badge: "Tutorial",
              author: "Sarah Chen",
              date: "1 Jan 2024",
              title: "Getting Started with shadcn/ui Components",
              desc: "Learn how to quickly integrate and customize shadcn/ui components in your Next.js projects. We'll cover installation, theming, and best practices for building modern interfaces.",
              img: "/assets/donate.png",
              link: "https://shadcnblocks.com",
            },
            {
              badge: "Accessibility",
              author: "Marcus Rodriguez",
              date: "1 Jan 2024",
              title: "Building Accessible Web Applications",
              desc: "Explore how to create inclusive web experiences using shadcn/ui's accessible components. Discover practical tips for implementing ARIA labels, keyboard navigation, and semantic HTML.",
              img: "/assets/donate.png",
              link: "https://shadcnblocks.com",
            },
            {
              badge: "Design Systems",
              author: "Emma Thompson",
              date: "1 Jan 2024",
              title: "Modern Design Systems with Tailwind CSS",
              desc: "Dive into creating scalable design systems using Tailwind CSS and shadcn/ui. Learn how to maintain consistency while building flexible and maintainable component libraries.",
              img: "/assets/donate.png",
              link: "https://shadcnblocks.com",
            },
          ].map((post, i) => (
            <div key={i} className="flex flex-col gap-6 sm:flex-row">
              <div className="shrink-0">
                <a href={post.link} target="_blank" rel="noopener noreferrer" className="block hover:opacity-90 transition-opacity duration-200">
                  <Image
                    src={post.img}
                    alt={post.title}
                    width={260}
                    height={146}
                    className="aspect-video w-full rounded-lg object-cover sm:w-[260px]"
                  />
                </a>
              </div>
              <div className="flex-1 space-y-3">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <Badge variant="secondary">{post.badge}</Badge>
                  <span>{post.author}</span>
                  <span>{post.date}</span>
                </div>
                <h3 className="text-xl font-bold leading-tight lg:text-2xl">
                  <a href={post.link} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    {post.title}
                  </a>
                </h3>
                <p className="text-base text-muted-foreground">{post.desc}</p>
                <a
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-primary hover:underline"
                >
                  Read more <ArrowRight className="ml-2 size-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Button */}
        <div className="mt-16 text-center">
          <Button asChild variant="outline">
            <a href="https://shadcnblocks.com" target="_blank" rel="noopener noreferrer">
              View all articles <ArrowRight className="ml-2 size-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
