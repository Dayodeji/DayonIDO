"use client"

import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { VisionSection } from "@/components/vision-section"
import { GamesSection } from "@/components/games-section"
import { CommunitySection } from "@/components/community-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <VisionSection />
      <GamesSection />
      <CommunitySection />
      <Footer />
    </main>
  )
}
