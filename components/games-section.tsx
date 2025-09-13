"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Users } from "lucide-react"

export function GamesSection() {
  const games = [
    {
      title: "Territory Wars",
      description: "Claim and defend real-world territories in this strategic geospatial conquest game.",
      image: "/strategic-territory-conquest-game-with-digital-map.jpg",
      status: "Live",
      players: "15.2K",
      locations: "500+",
      features: ["Real-time Strategy", "Territory Control", "Alliance System"],
    },
    {
      title: "Treasure Hunt Global",
      description: "Discover hidden treasures and solve puzzles scattered across the world's most iconic locations.",
      image: "/treasure-hunting-adventure-game-with-ar-elements.jpg",
      status: "Beta",
      players: "8.7K",
      locations: "200+",
      features: ["AR Integration", "Puzzle Solving", "Collectible NFTs"],
    },
    {
      title: "City Builder AR",
      description: "Build and manage virtual cities overlaid on real urban environments using augmented reality.",
      image: "/ar-city-building-game-with-futuristic-urban-overla.jpg",
      status: "Coming Soon",
      players: "Pre-reg",
      locations: "50+",
      features: ["AR Construction", "City Management", "Economic Simulation"],
    },
  ]

  return (
    <section id="games" className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Featured{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Games</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Experience our revolutionary geospatial games that transform the world around you into an interactive
            playground.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {games.map((game, index) => (
            <Card
              key={index}
              className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="relative overflow-hidden">
                <img
                  src={game.image || "/placeholder.svg"}
                  alt={game.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <Badge
                    variant={game.status === "Live" ? "default" : game.status === "Beta" ? "secondary" : "outline"}
                  >
                    {game.status}
                  </Badge>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{game.title}</h3>
                <p className="text-muted-foreground mb-4 text-pretty">{game.description}</p>

                {/* Game Stats */}
                <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{game.players}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{game.locations}</span>
                  </div>
                </div>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {game.features.map((feature, featureIndex) => (
                    <Badge key={featureIndex} variant="outline" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>

                <Button
                  className="w-full hover:scale-105 transition-transform duration-200"
                  variant={game.status === "Coming Soon" ? "outline" : "default"}
                  disabled={game.status === "Coming Soon"}
                >
                  {game.status === "Coming Soon" ? "Notify Me" : "Play Now"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
