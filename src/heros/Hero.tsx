import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-0"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/assets/africa.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Dark Overlay - Reduced opacity */}
      <div className="absolute inset-0 bg-black/50 z-10"></div>

      {/* Content */}
      <div className="relative z-20 text-center text-white px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
          Championing Inclusive Democracy, <span className="text-primary">one voice at a time</span>
        </h1>

        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
          Champion for Good Governance (CfGG) is a non-partisan platform committed to fostering good
          governance, democratic participation, and civic awareness in Nigeria and across Africa.
        </p>

        <div className="flex flex-row gap-4 justify-center items-center">
          <button className="bg-primary hover:bg-[#8B6209] text-white font-semibold py-3 px-8 rounded-full transition-colors duration-300 cursor-pointer">
            <Link href={'/membership'}>Become a Member</Link>
          </button>
          <button className="border-2 border-primary hover:bg-primary hover:text-white font-semibold py-3 px-8 rounded-full transition-colors duration-300 cursor-pointer">
            <Link href={'/donate'}>Donate now</Link>
          </button>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
