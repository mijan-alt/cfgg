
import { CheckCircle } from 'lucide-react'
import { MissionAndVisionBlock } from '@/payload-types'
import { Media } from '@/components/Media'



const primaryColor = '#AF7C0F'


export const MissionAndVision: React.FC<MissionAndVisionBlock>= (props) => {

const {heading, description, media, imagePosition, points}= props


  const isImageLeft = imagePosition === 'left'

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center py-16 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
      {/* Text */}
      <div className={`flex flex-col justify-center order-1 ${isImageLeft ? 'md:order-2' : 'md:order-1'}`}>
        <div className="mb-8">
          <h2 className="text-4xl md:text-5xl text-center font-semibold mb-4">{heading}</h2>
          <div className="flex items-center">
            <hr className="flex-grow text-primary" />
            <div
              className="w-4 h-4 rotate-45 mx-2 bg-primary"
              aria-hidden="true"
            ></div>
            <hr className="flex-grow text-primary" />
          </div>
        </div>

        <p className="text-lg md:text-xl mb-8 leading-relaxed">{description}</p>

        <ul className="space-y-4">
          {points?.map((point, i) => (
            <li key={i} className="flex items-start space-x-3">
              <CheckCircle size={24}  className="flex-shrink-0 mt-1 text-primary" />
              <span className="text-lg">{point.text}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Image */}
      <div className={`rounded-lg overflow-hidden shadow-lg order-2 ${isImageLeft ? 'md:order-1' : 'md:order-2'}`}>
      

        <Media
           resource={media}
           className="w-full h-full object-cover"
         />
       
      </div>
    </div>
  )
}
