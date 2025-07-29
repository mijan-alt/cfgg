'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SearchIcon } from 'lucide-react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const navItems = data?.navItems || []

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  // Helper function to check if link is active
  const isActive = (path: any) => pathname === path

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center space-x-8">
        {navItems.map(({ link }, i) => {
          const isCurrentActive = link?.url ? isActive(link.url) : false

          return (
            <div
              key={i}
              className={`pb-1 border-b-2 ${
                isCurrentActive ? 'border-primary' : 'border-transparent'
              }`}
            >
              <CMSLink
                {...link}
                appearance="link"
                className={` hover:text-primary text-black font-medium transition-colors cursor-pointer ${
                  isCurrentActive ? 'text-primary' : ''
                }`}
              />
            </div>
          )
        })}

        {/* Get Involved Button - assuming it's a special nav item */}
        <Link
          href="/membership"
          className="bg-primary px-4 py-2 rounded-full hover:bg-[#8B6209] transition-colors cursor-pointer whitespace-nowrap"
        >
          Get Involved
        </Link>

        {/* Search Icon */}
        <Link href="/search">
          <span className="sr-only">Search</span>
          <SearchIcon className="w-5 text-primary hover:text-primary transition-colors cursor-pointer" />
        </Link>
      </nav>

      {/* Mobile Hamburger Menu Button */}
      <button
        className="md:hidden p-2 cursor-pointer"
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <div className="w-6 h-6 flex items-center justify-center">
          <div className="relative w-5 h-5">
            <span
              className={`absolute block w-full h-0.5 bg-gray-700 transform transition-all duration-300 ${isMenuOpen ? 'rotate-45 top-2' : 'top-0.5'}`}
            ></span>
            <span
              className={`absolute block w-full h-0.5 bg-gray-700 transform transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'top-2'}`}
            ></span>
            <span
              className={`absolute block w-full h-0.5 bg-gray-700 transform transition-all duration-300 ${isMenuOpen ? '-rotate-45 top-2' : 'top-3.5'}`}
            ></span>
          </div>
        </div>
      </button>

      {/* Mobile Backdrop/Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black opacity-20 z-40 md:hidden" onClick={closeMenu}></div>
      )}

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-80  shadow-lg transform transition-transform duration-300 z-50 md:hidden ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Drawer Header */}
          <div className="flex justify-between items-center p-6 border-b border-gray-100">
            <Link href="/" className="flex items-center space-x-2" onClick={closeMenu}>
              <div className="text-2xl font-bold text-primary">CfGG</div>
            </Link>
            <button onClick={closeMenu} className="p-2 cursor-pointer" aria-label="Close menu">
              <div className="w-6 h-6 flex items-center justify-center">
                <div className="relative w-5 h-5">
                  <span className="absolute block w-full h-0.5 transform rotate-45 top-2"></span>
                  <span className="absolute block w-full h-0.5 transform -rotate-45 top-2"></span>
                </div>
              </div>
            </button>
          </div>

          {/* Drawer Navigation */}
          <nav className="flex-1 px-6 py-8 bg-white">
            <div className="flex flex-col space-y-6">
              {navItems.map(({ link }, i) => {
                const isCurrentActive = link?.url ? isActive(link.url) : false

                return (
                  <div
                    key={i}
                    className={`font-medium text-lg transition-colors cursor-pointer py-2 border-l-4 pl-4 ${
                      isCurrentActive
                        ? 'border-primary text-primary'
                        : 'border-transparent  hover:text-primary'
                    }`}
                    onClick={closeMenu}
                  >
                    <CMSLink {...link} appearance="link" className="block w-full text-black" />
                  </div>
                )
              })}

              {/* Get Involved Button for Mobile */}
              <Link
                href="/membership"
                className="bg-primary text-white px-6 py-3 rounded-full hover:bg-[#8B6209] transition-colors cursor-pointer text-center font-medium mt-4"
                onClick={closeMenu}
              >
                Get Involved
              </Link>

              {/* Search for Mobile */}
              <Link
                href="/search"
                className="flex items-center gap-2 font-medium text-lg transition-colors cursor-pointer py-2 border-l-4 pl-4 border-transparent hover:text-primary"
                onClick={closeMenu}
              >
                <SearchIcon className="w-5" />
                Search
              </Link>
            </div>
          </nav>

          {/* Drawer Footer */}
          <div className="px-6 py-4 border-t border-gray-100">
            <p className="text-sm text-gray-500 text-center">© 2024 CfGG. All rights reserved.</p>
          </div>
        </div>
      </div>
    </>
  )
}
