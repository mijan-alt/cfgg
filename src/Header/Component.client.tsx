'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Search, Menu, X } from 'lucide-react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet'

interface HeaderClientProps {
  data: HeaderType
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  const [theme, setTheme] = useState<string | null>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()
  const navItems = data?.navItems || []

  useEffect(() => {
    setHeaderTheme(null)
  }, [pathname, setHeaderTheme])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
  }, [headerTheme, theme])

  // Scroll detection effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setIsScrolled(scrollPosition > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  // Helper function to check if link is active
  const isActive = (path: any) => pathname === path

  return (
    <header
      className={`
        fixed top-0 left-0 w-full z-50
        transition-all duration-300
        ${
          isScrolled 
            ? 'bg-white shadow-md' 
            : 'bg-white/20 backdrop-blur-lg'
        }
      `}
      {...(theme ? { 'data-theme': theme } : {})}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="h-16 flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1">
            <Logo loading="eager" priority="high" />
            <span className={`font-bold transition-colors duration-300 ${
              isScrolled ? 'text-gray-900' : 'text-primary'
            }`}>
              CfGG
            </span>
          </Link>

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
                    className={`font-medium transition-colors cursor-pointer ${
                      isCurrentActive 
                        ? (isScrolled ? 'text-primary' : 'text-primary')
                        : (isScrolled ? 'text-gray-700 hover:text-primary' : 'text-white hover:text-primary')
                    }`}
                  />
                </div>
              )
            })}

            {/* Get Involved Button */}
            <Button asChild className="rounded-full whitespace-nowrap">
              <Link href="/membership">
                Get Involved
              </Link>
            </Button>

            {/* Search Icon */}
            {/* 
            <Button variant="ghost" size="icon" asChild>
              <Link href="/search">
                <Search className="w-5 h-5" />
                <span className="sr-only">Search</span>
              </Link>
            </Button>
            */}
          </nav>

            {/* Mobile Navigation using Sheet */}
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className={`md:hidden ${isScrolled ? 'text-gray-700 hover:text-primary' : 'text-white hover:text-primary'}`}
                >
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
            
            <SheetContent side="left" className="w-80 p-0">
              <div className="flex flex-col h-full">
                {/* Drawer Header */}
                <div className="flex justify-between items-center p-6 border-b border-gray-100">
                  <Link 
                    href="/" 
                    className="flex items-center space-x-2" 
                    onClick={closeMenu}
                  >
                    <Logo loading="eager" priority="high" />
                    <div className="text-2xl font-bold text-primary">CfGG</div>
                  </Link>
                  <SheetClose asChild>
                    <Button variant="ghost" size="icon">
                      <X className="h-6 w-6" />
                      <span className="sr-only">Close menu</span>
                    </Button>
                  </SheetClose>
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
                              : 'border-transparent hover:text-primary'
                          }`}
                          onClick={closeMenu}
                        >
                          <CMSLink 
                            {...link} 
                            appearance="link" 
                            className="block w-full text-black hover:text-primary" 
                          />
                        </div>
                      )
                    })}

                    {/* Get Involved Button for Mobile */}
                    <Button asChild className="rounded-full mt-4">
                      <Link href="/membership" onClick={closeMenu}>
                        Get Involved
                      </Link>
                    </Button>

                    {/* Search for Mobile */}
                    <Button variant="ghost" asChild className="justify-start p-0">
                      <Link
                        href="/search"
                        className="flex items-center gap-2 font-medium text-lg transition-colors cursor-pointer py-2 border-l-4 pl-4 border-transparent hover:text-primary"
                        onClick={closeMenu}
                      >
                        <Search className="w-5" />
                        Search
                      </Link>
                    </Button>
                  </div>
                </nav>

                {/* Drawer Footer */}
                <div className="px-6 py-4 border-t border-gray-100">
                  <p className="text-sm text-gray-500 text-center">
                    © 2024 CfGG. All rights reserved.
                  </p>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}