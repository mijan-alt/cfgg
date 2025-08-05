import React from 'react';
import { Files, CircleArrowRight, Settings } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building, Users, GraduationCap } from 'lucide-react'

export default function About() {
  const features = [
    {
      icon: Building,
      title: "Good governance",
      description: "Promoting transparency and accountability"
    },
    {
      icon: Users,
      title: "Youth Empowerment", 
      description: "Inspiring active civic participation among youth."
    },
    {
      icon: GraduationCap,
      title: "Optimizing for empowerment",
      description: "Equipping citizens with knowledge to engage democracy"
    }
  ];

  return (
    <section className="py-32">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-28">
          {/* Hero Section */}
          <div className="flex flex-col gap-7">
            <h1 className="text-4xl font-semibold lg:text-7xl">
              Bringing the power of software to everyone
            </h1>
            <p className="max-w-xl text-lg text-muted-foreground">
              We empower citizens—especially the youth and marginalized groups—to take part in building an accountable, transparent, and inclusive society.
            </p>
          </div>

          {/* Image and Mission Card Section */}
          <div className="grid gap-6 md:grid-cols-2">
            <img 
              src="https://images.unsplash.com/photo-1754275047961-e2ed3624fda7?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
              alt="placeholder" 
              className="w-full h-96 rounded-2xl object-cover"
            />
            <Card className="bg-muted border-0">
              <CardContent className="flex flex-col justify-between gap-10 p-10 h-full">
                <Badge variant="secondary" className="text-xs font-medium w-fit">
                  OUR MISSION
                </Badge>
                <p className="text-lg font-medium">
                  We believe that building software should be insanely easy. That everyone should have the freedom to create the tools they need, without any developers, designers or drama.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Features Section */}
          <div className="flex flex-col gap-6 md:gap-20">
            <div className="max-w-xl">
              <h2 className="mb-2.5 text-3xl font-semibold md:text-5xl">
                We make creating software ridiculously easy
              </h2>
              <p className="text-muted-foreground">
                We aim to help empower 1,000,000 teams to create their own software. Here is how we plan on doing it.
              </p>
            </div>

            {/* Feature Cards */}
            <div className="grid gap-10 md:grid-cols-3">
              {features.map((feature, index) => (
                <Card key={index} className="border-0 shadow-none bg-transparent">
                  <CardContent className="flex flex-col p-0">
                    <div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-accent">
                      <feature.icon className="size-5" />
                    </div>
                    <h3 className="mt-2 mb-3 text-lg font-semibold">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Team Section */}
          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <Badge variant="secondary" className="mb-10 text-xs font-medium">
                JOIN OUR TEAM
              </Badge>
              <h2 className="mb-2.5 text-3xl font-semibold md:text-5xl">
                We are changing how software is made
              </h2>
            </div>
            <div>
              <img 
                src="https://images.unsplash.com/photo-1754275047961-e2ed3624fda7?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                alt="placeholder" 
                className="mb-6 h-36 w-full rounded-xl object-cover"
              />
              <p className="text-muted-foreground">
                And we are  looking for the right people to help us do it. If you are passionate about making change in the world, this might be the place for you
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}