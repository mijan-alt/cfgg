import Image from "next/image"

export default function CTASection() {
  return (
    <section className="relative w-full py-12 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image src="/assets/cta.png" alt="Hands coming together" fill className="object-cover" priority />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center text-white ">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 max-w-4xl">Ready to Make a difference?</h1>

        <p className="text-lg md:text-xl mb-8 max-w-3xl leading-relaxed">
          Join thousands of Nigerians who are actively participating in building a better democracy. Your voice matters,
          and together we can create lasting change.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-2xl justify-center">
          {/* Become a member - Primary button with #AF7C0F */}
          <button
            className="px-4 py-3 rounded-full  text-nowrap text-white transition-all duration-300 hover:opacity-90 hover:scale-105 cursor-pointer"
            style={{ backgroundColor: "#AF7C0F" }}
          >
            Become a member
          </button>

       

          {/* Support our Cause - Outline button with #AF7C0F border */}
          <button
            className="px-4 py-3 rounded-full text-nowrap  text-white border-2 transition-all duration-300 hover:scale-105 cursor-pointer"
            style={{
              borderColor: "#AF7C0F",
              backgroundColor: "transparent",
            }}
          >
            Support our Cause
          </button>
        </div>
      </div>
    </section>
  )
}
