'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Logo } from '@/components/ui/logo'
import {
  Home,
  BookOpen,
  Brain,
  BarChart3,
  Settings,
  Menu,
  X,
  ArrowLeft
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Study', href: '/study', icon: Brain },
  { name: 'Browse', href: '/browse', icon: BookOpen },
  { name: 'Progress', href: '/progress', icon: BarChart3 },
  { name: 'Settings', href: '/settings', icon: Settings },
]

interface NavigationProps {
  showBackButton?: boolean
  backHref?: string
  className?: string
}

export function Navigation({ showBackButton = false, backHref = '/', className = '' }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <nav className={cn("bg-slate-900/95 backdrop-blur-sm border-b border-white/10 sticky top-0 z-50", className)}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          
          {/* Left side - Logo/Back button */}
          <div className="flex items-center gap-4">
            {showBackButton ? (
              <Link href={backHref}>
                <Button variant="ghost" size="sm" className="text-white/70 hover:text-white">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              </Link>
            ) : (
              <Link href="/" className="flex items-center">
                <Logo size="sm" showSubtext={false} />
              </Link>
            )}
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              const Icon = item.icon
              
              return (
                <Link key={item.name} href={item.href}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={cn(
                      "text-white/70 hover:text-white hover:bg-white/10 transition-colors",
                      isActive && "text-white bg-white/10"
                    )}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {item.name}
                  </Button>
                </Link>
              )
            })}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="text-white/70 hover:text-white"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-white/10">
            <div className="flex flex-col space-y-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href
                const Icon = item.icon
                
                return (
                  <Link key={item.name} href={item.href} onClick={() => setIsOpen(false)}>
                    <Button
                      variant="ghost"
                      className={cn(
                        "w-full justify-start text-white/70 hover:text-white hover:bg-white/10",
                        isActive && "text-white bg-white/10"
                      )}
                    >
                      <Icon className="h-4 w-4 mr-3" />
                      {item.name}
                    </Button>
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}