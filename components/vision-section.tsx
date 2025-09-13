"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Globe, Zap, Users, Target, Rocket, Shield } from "lucide-react"

export function VisionSection() {
  const visionPoints = [
    {
      icon: Globe,
      title: "Global Gaming Ecosystem",
      description: "Creating a worldwide network of interconnected geospatial games that span continents and cultures.",
    },
    {
      icon: Zap,
      title: "Real-World Integration",
      description:
        "Seamlessly blending digital gameplay with physical locations using cutting-edge AR and GPS technology.",
    },
    {
      icon: Users,
      title: "Community-Driven",
      description: "Empowering players to create, share, and monetize their own location-based gaming experiences.",
    },
    {
      icon: Target,
      title: "Precision Gaming",
      description: "Utilizing advanced geospatial data to create hyper-accurate and immersive gaming environments.",
    },
    {
      icon: Rocket,
      title: "Innovation First",
      description:
        "Pioneering the next generation of gaming through blockchain, AI, and spatial computing technologies.",
    },
    {
      icon: Shield,
      title: "Secure & Decentralized",
      description:
        "Building on blockchain infrastructure to ensure player ownership, security, and true digital asset value.",
    },
  ]

  return (
    <section id="vision" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Our <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Vision</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            We envision a future where the boundaries between digital and physical worlds dissolve, creating
            unprecedented opportunities for exploration, connection, and adventure.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visionPoints.map((point, index) => (
            <Card
              key={index}
              className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/20"
            >
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <point.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{point.title}</h3>
                <p className="text-muted-foreground text-pretty">{point.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mission Statement */}
        <div className="mt-20 text-center">
          <Card className="max-w-4xl mx-auto bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
            <CardContent className="p-12">
              <h3 className="text-2xl font-bold mb-6 text-primary">Our Mission</h3>
              <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
                "To revolutionize gaming by creating immersive, location-based experiences that connect players with
                their physical environment and each other, fostering real-world exploration, community building, and
                meaningful digital ownership through innovative geospatial technology."
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
