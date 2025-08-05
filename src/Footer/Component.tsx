
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react'
import Link from 'next/link'
import { getCachedGlobal } from '@/utilities/getGlobals'
import type { Footer as FooterType } from '@/payload-types'
import { CMSLink } from '@/components/Link'

export async function Footer() {
 const footerData: FooterType = await getCachedGlobal('footer', 1)() as FooterType

  const {
    description,
    contact,
    quickLinks,
    socialLinks,
  } = footerData || {}

  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div
              className="text-3xl font-bold text-primary mb-4"
              style={{ fontFamily: 'var(--font-pacifico)' }}
            >
              CfGG
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              {description}
            </p>
            <div className="flex space-x-4">
              {socialLinks?.facebook && (
                <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="social-btn">
                  <Facebook size={18} className="text-white" />
                </a>
              )}
              {socialLinks?.twitter && (
                <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="social-btn">
                  <Twitter size={18} className="text-white" />
                </a>
              )}
              {socialLinks?.instagram && (
                <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="social-btn">
                  <Instagram size={18} className="text-white" />
                </a>
              )}
              {socialLinks?.linkedin && (
                <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="social-btn">
                  <Linkedin size={18} className="text-white" />
                </a>
              )}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4 text-primary">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks?.map(({ link }, i) => (
                <li key={i}>

                  <CMSLink
                   {...link}
                    appearance="link"
                    className="text-gray-300 hover:text-primary transition-colors "
                    />
                  
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4 text-primary">Contact Info</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-center space-x-2">
                <Mail size={16} className="text-primary" />
                <span>{contact?.email}</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone size={16} className="text-primary" />
                <span>{contact?.phone}</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin size={16} className="text-primary" />
                <span>{contact?.address}</span>
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
