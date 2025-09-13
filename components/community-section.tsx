"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, MessageCircle, Trophy, Star, ArrowRight } from "lucide-react"

export function CommunitySection() {
  const communityStats = [
    { icon: Users, label: "Active Members", value: "50,000+" },
    { icon: MessageCircle, label: "Daily Messages", value: "15,000+" },
    { icon: Trophy, label: "Tournaments", value: "200+" },
    { icon: Star, label: "Community Rating", value: "4.9/5" },
  ]

  const testimonials = [
    {
      name: "Alex Chen",
      role: "Pro Gamer",
      avatar: "/placeholder.svg?key=avatar1",
      content: "Dayon has completely transformed how I experience gaming. The real-world integration is mind-blowing!",
    },
    {
      name: "Sarah Johnson",
      role: "Game Developer",
      avatar: "/placeholder.svg?key=avatar2",
      content: "The geospatial technology behind Dayon is revolutionary. It's the future of interactive entertainment.",
    },
    {
      name: "Marcus Rodriguez",
      role: "Community Leader",
      avatar: "/placeholder.svg?key=avatar3",
      content: "The community aspect is incredible. I've made real friends through location-based adventures.",
    },
  ]

  return (
    <section id="community" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Join Our{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Community</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Connect with fellow adventurers, share experiences, and be part of the geospatial gaming revolution.
          </p>
        </div>

        {/* Community Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {communityStats.map((stat, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="text-2xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
                <p className="text-muted-foreground text-pretty">"{testimonial.content}"</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button size="lg" className="bg-primary hover:bg-primary/90">
            Join Discord Community
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  )
}
