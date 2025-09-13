"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MapPin } from "lucide-react"

export function Navigation() {
  return (
    <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md border-b border-border z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <MapPin className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Dayon
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="#vision" className="text-muted-foreground hover:text-foreground transition-colors">
              Vision
            </Link>
            <Link href="#games" className="text-muted-foreground hover:text-foreground transition-colors">
              Games
            </Link>
            <Link href="#community" className="text-muted-foreground hover:text-foreground transition-colors">
              Community
            </Link>
            <Link href="/ido" className="text-muted-foreground hover:text-foreground transition-colors">
              IDO
            </Link>
          </div>

          {/* CTA Button */}
          <Button asChild className="bg-primary hover:bg-primary/90">
            <Link href="/ido">Join IDO</Link>
          </Button>
        </div>
      </div>
    </nav>
  )
}
