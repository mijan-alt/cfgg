import Image from 'next/image'
import { Building, Users, GraduationCap } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'


export default function WhoWeAre() {
  const primaryColor = '#AF7C0F'

  return (
    <section className="py-16 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto" id="who-we-are">
      {/* Section Title */}
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-semibold mb-4">Who we are</h2>
        <div className="flex items-center">
            <hr className="flex-grow text-primary" />
            <div
              className="w-4 h-4 rotate-45 mx-2 bg-primary"
              aria-hidden="true"
            ></div>
            <hr className="flex-grow text-primary" />
          </div>
      </div>

      {/* Content Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 min-h-[600px]">
        {/* Image - Full Height */}
        <div className="rounded-lg overflow-hidden h-full">
          <Image
            src="/assets/globe.jpg"
            alt="Speaker at podium"
            width={600}
            height={600}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Column */}
        <div className="flex flex-col justify-between">
          {/* Text Content */}
          <div className="space-y-6 mb-8">
            <h3 className="text-2xl font-semibold">
              <span className='text-primary'>Champion for Good Governance (CfGG)</span> is a
              non-partisan platform committed to fostering good governance, democratic
              participation, and civic awareness in Nigeria and across Africa.
            </h3>

            <p className="text-lg">
              We empower citizens—especially the youth and marginalized groups—to take part in
              building an accountable, transparent, and inclusive society.
            </p>
          </div>

          {/* Feature Cards */}
          {/* Feature Boxes - Right Column */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Good Governance */}
            <Card className="text-center border" style={{ borderColor: primaryColor }}>
              <CardContent className="py-6">
                <div className="flex justify-center mb-3">
                  <Building size={32} style={{ color: primaryColor }} />
                </div>
                <h4 className="text-lg font-semibold mb-1">Good Governance</h4>
                <p className="text-gray-600 text-sm">Promoting transparency and accountability</p>
              </CardContent>
            </Card>

            {/* Youth Empowerment */}
            <Card className="text-center border" style={{ borderColor: primaryColor }}>
              <CardContent className="py-6">
                <div className="flex justify-center mb-3">
                  <Users size={32} className='text-primary'/>
                </div>
                <h4 className="text-lg font-semibold mb-1">Youth Empowerment</h4>
                <p className="text-gray-600 text-sm">
                  Inspiring active civic participation among youth
                </p>
              </CardContent>
            </Card>

            {/* Civic Education */}
            <Card className="text-center border border-primary" >
              <CardContent className="py-6">
                <div className="flex justify-center mb-3">
                  <GraduationCap size={32} text-prma />
                </div>
                <h4 className="text-lg font-semibold mb-1">Civic Education</h4>
                <p className="text-gray-600 text-sm">
                  Equipping citizens with knowledge to engage democracy
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
