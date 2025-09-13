"use client"

import Link from "next/link"
import { MapPin, Twitter, Github, MessageCircle, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <MapPin className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Dayon
              </span>
            </Link>
            <p className="text-muted-foreground text-pretty">
              Revolutionizing gaming through geospatial technology and real-world integration.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Github className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <MessageCircle className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Mail className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Games */}
          <div className="space-y-4">
            <h3 className="font-semibold">Games</h3>
            <div className="space-y-2">
              <Link href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                Territory Wars
              </Link>
              <Link href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                Treasure Hunt Global
              </Link>
              <Link href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                City Builder AR
              </Link>
              <Link href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                Coming Soon
              </Link>
            </div>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="font-semibold">Company</h3>
            <div className="space-y-2">
              <Link href="#vision" className="block text-muted-foreground hover:text-primary transition-colors">
                Vision
              </Link>
              <Link href="#community" className="block text-muted-foreground hover:text-primary transition-colors">
                Community
              </Link>
              <Link href="/ido" className="block text-muted-foreground hover:text-primary transition-colors">
                IDO
              </Link>
              <Link href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                Careers
              </Link>
            </div>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="font-semibold">Support</h3>
            <div className="space-y-2">
              <Link href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                Help Center
              </Link>
              <Link href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                Documentation
              </Link>
              <Link href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 text-center text-muted-foreground">
          <p>&copy; 2024 Dayon. All rights reserved. Building the future of geospatial gaming.</p>
        </div>
      </div>
    </footer>
  )
}
