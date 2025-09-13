"use client"

import { Button } from "@/components/ui/button"
import { MapPin, Play, ArrowRight } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/futuristic-geospatial-gaming-world-with-digital-ma.jpg"
          alt="Geospatial Gaming World"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/70 to-background/90" />
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-5">
        <div className="absolute top-20 left-10 w-2 h-2 bg-primary rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-3 h-3 bg-accent rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 left-1/4 w-2 h-2 bg-primary rounded-full animate-pulse delay-500"></div>
        <div className="absolute bottom-20 right-1/3 w-3 h-3 bg-accent rounded-full animate-pulse delay-1500"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-card/80 backdrop-blur-sm border border-border rounded-full px-4 py-2 mb-8 animate-fade-in">
            <MapPin className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Revolutionary Geospatial Gaming</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance animate-fade-in-up">
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Redefining Reality
            </span>
            <br />
            Through Location-Based Gaming
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto text-pretty animate-fade-in-up delay-200">
            Dayon creates immersive geospatial gaming experiences that blend the digital and physical worlds,
            transforming how players interact with their environment and each other.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up delay-400">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-lg px-8 py-6 hover:scale-105 transition-all duration-200"
              asChild
            >
              <Link href="#vision">
                Explore Our Vision
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 hover:scale-105 transition-all duration-200 bg-background/50 backdrop-blur-sm"
              asChild
            >
              <Link href="/ido">
                <Play className="w-5 h-5 mr-2" />
                Join the IDO
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto animate-fade-in-up delay-600">
            <div className="text-center group">
              <div className="text-3xl font-bold text-primary group-hover:scale-110 transition-transform duration-200">
                50K+
              </div>
              <div className="text-sm text-muted-foreground">Active Players</div>
            </div>
            <div className="text-center group">
              <div className="text-3xl font-bold text-primary group-hover:scale-110 transition-transform duration-200">
                100+
              </div>
              <div className="text-sm text-muted-foreground">Game Locations</div>
            </div>
            <div className="text-center group">
              <div className="text-3xl font-bold text-primary group-hover:scale-110 transition-transform duration-200">
                25
              </div>
              <div className="text-sm text-muted-foreground">Countries</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
