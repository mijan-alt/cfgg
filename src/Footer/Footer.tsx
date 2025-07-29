import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-6  lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div
              className="text-3xl font-bold text-primary mb-4"
              style={{ fontFamily: 'var(--font-pacifico)' }}
            >
              CfGG
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Champion for Good Governance is committed to fostering democratic participation, civic
              awareness, and youth empowerment across Nigeria and Africa.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 bg-primary rounded-full flex items-center justify-center hover:bg-[#8B6209] transition-colors cursor-pointer"
              >
                <Facebook size={18} className="text-white" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-primary rounded-full flex items-center justify-center hover:bg-[#8B6209] transition-colors cursor-pointer"
              >
                <Twitter size={18} className="text-white" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-primary rounded-full flex items-center justify-center hover:bg-[#8B6209] transition-colors cursor-pointer"
              >
                <Instagram size={18} className="text-white" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-primary rounded-full flex items-center justify-center hover:bg-[#8B6209] transition-colors cursor-pointer"
              >
                <Linkedin size={18} className="text-white" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4 text-primary">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-300 hover:text-primary transition-colors cursor-pointer"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-300 hover:text-primary transition-colors cursor-pointer"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/get-involved"
                  className="text-gray-300 hover:text-primary transition-colors cursor-pointer"
                >
                  Get Involved
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4 text-primary">Contact Info</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-center space-x-2">
                <div className="w-5 h-5 flex items-center justify-center">
                  <Mail size={16} className="text-primary" />
                </div>
                <span>info@cfgg.org</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-5 h-5 flex items-center justify-center">
                  <Phone size={16} className="text-primary" />
                </div>
                <span>+234 800 CFGG (2344)</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-5 h-5 flex items-center justify-center">
                  <MapPin size={16} className="text-primary" />
                </div>
                <span>Lagos, Nigeria</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Champion for Good Governance (CfGG). All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
