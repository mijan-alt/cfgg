'use client'

import React from 'react'
import { Building, Users, GraduationCap } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Media } from '@/components/Media'
import { AboutBlock } from '@/payload-types'

const iconMap = {
  building: Building,
  users: Users,
  graduationCap: GraduationCap,
}

export const About: React.FC<AboutBlock> = ({
  heading,
  subheading,
  image,
  missionText,
  features,
}) => {
  return (
    <section className="">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-28">
          {/* Heading */}
          <div className="flex flex-col gap-7">
            <h1 className="text-4xl font-semibold lg:text-7xl">{heading}</h1>
            <p className="max-w-xl text-lg text-muted-foreground">{subheading}</p>
          </div>

          {/* Image and Mission Card */}
          <div className="grid gap-1 sm:gap-2 md:gap-6 md:grid-cols-2">
            <Media
              resource={image}
              className="w-full  rounded-2xl object-cover overflow-hidden"
              imgClassName="rounded-2xl "
            />

            <Card className="bg-[#dfe0df] border-0 rounded-2xl">
              <CardContent className="flex flex-col justify-between gap-10 p-10 h-full">
                <Badge
                  variant="secondary"
                  className="text-xs font-medium w-fit bg-[#a88c66] text-white"
                >
                  OUR MISSION
                </Badge>
                <p className="text-lg font-medium">{missionText}</p>
              </CardContent>
            </Card>
          </div>

          {/* Features */}
          <div className="flex flex-col gap-6 md:gap-20">
            <div className="max-w-xl">
              <h2 className="mb-2.5 text-3xl font-semibold md:text-5xl">What We Focus On</h2>
              <p className="text-muted-foreground">
                These pillars guide our work in promoting good governance and civic responsibility.
              </p>
            </div>

            <div className="grid gap-10 md:grid-cols-3">
              {features?.map((feature, idx) => {
                const Icon = iconMap[feature.icon]
                return (
                  <Card key={idx} className="border-0 shadow-none bg-transparent">
                    <CardContent className="flex flex-col p-0">
                      <div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-accent text-primary">
                        {Icon && <Icon className="size-5" />}
                      </div>
                      <h3 className="mt-2 mb-3 text-lg font-semibold">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <Badge variant="secondary" className="mb-10 text-xs font-medium bg-[#a88c66]">
                GET INVOLVED
              </Badge>
              <h2 className="mb-2.5 text-3xl font-semibold md:text-5xl ">
                Be a Voice for Change in Nigeria
              </h2>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1754275047961-e2ed3624fda7?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="placeholder"
                className="mb-6 h-36 w-full rounded-xl object-cover"
              />
              <p className="text-muted-foreground">
                CfGG is building a movement of everyday citizens committed to transparency,
                accountability, and civic inclusion. Whether Whether you&apos;re a student,
                professional, or community advocate — your voice matters. Join us in shaping a
                better Nigeria.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
