import RichText from '@/components/RichText'
import { Carousel } from '@/payload-types'
import { Media } from '@/components/Media'
import { ArrowRight } from 'lucide-react'

export const CarouselBlock: React.FC<Carousel> = (props) => {
  const { introContent, points } = props

  return (
    <section className="">
      <div className="max-w-6xl mx-auto px-4">
        {introContent && (
          <div className="max-w-4xl mx-auto mb-12">
            <RichText
              className="text-lg md:text-xl leading-relaxed text-center "
              data={introContent}
              enableGutter={false}
            />
          </div>
        )}

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {points.map((point, index) => {
            const imageData = point.image
            return (
              <div
                key={point.id}
                className="w-80 h-96 rounded-2xl overflow-hidden shadow-2xl relative group cursor-pointer transition-transform duration-300 hover:scale-105"
              >
                {/* Background Media - Full Cover */}
                <div className="absolute inset-0">
                  <Media
                    resource={imageData}
                    fill
                    pictureClassName="w-full h-full"
                    imgClassName="object-cover w-full h-full"
                    htmlElement="div"
                  />
                </div>

                {/* Gradient Overlay - Transparent to Dark */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold leading-tight">{point.title}</h2>

                    <p className="text-gray-200 text-sm leading-relaxed opacity-90">
                      {point.description}
                    </p>

                    <button className="flex items-center gap-2 text-white font-medium text-sm hover:gap-3 transition-all duration-300 group/btn">
                      <span>Read more</span>
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                    </button>
                  </div>
                </div>

                {/* Hover Effect */}
                {/* <div className="absolute inset-0 bg-gradient-to-t from-teal-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" /> */}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
