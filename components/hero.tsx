import { Button } from "@/components/ui/button"
import { UtensilsCrossed } from "lucide-react"

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url(/images/hero-spread.png)" }}
        aria-hidden="true"
      />
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-foreground/80 via-foreground/60 to-foreground/85"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-3xl px-4 py-32 text-center text-background">
        <span className="inline-flex items-center gap-2 rounded-full border border-background/30 bg-background/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] backdrop-blur-sm">
          <UtensilsCrossed className="h-3.5 w-3.5" />
          Authentic Indian Cuisine
        </span>

        <h1 className="mt-6 text-balance font-serif text-5xl font-bold leading-tight md:text-7xl">
          A Feast of Flavors at Spice Garden
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-pretty text-base leading-relaxed text-background/85 md:text-lg">
          Savor the rich aromas and bold spices of India, brought to life with
          time-honored recipes and the freshest ingredients in a warm,
          inviting setting.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button asChild size="lg" className="rounded-full px-8 text-base">
            <a href="#reserve">Reserve a Table</a>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="rounded-full border-background/40 bg-background/10 px-8 text-base text-background backdrop-blur-sm hover:bg-background/20 hover:text-background"
          >
            <a href="#menu">Explore the Menu</a>
          </Button>
        </div>

        <div className="mt-14 flex items-center justify-center gap-8 text-sm text-background/80">
          <div className="text-center">
            <p className="font-serif text-2xl font-bold text-background">25+</p>
            <p className="mt-1 uppercase tracking-wide">Years of Tradition</p>
          </div>
          <div className="h-10 w-px bg-background/30" />
          <div className="text-center">
            <p className="font-serif text-2xl font-bold text-background">60+</p>
            <p className="mt-1 uppercase tracking-wide">Signature Dishes</p>
          </div>
          <div className="h-10 w-px bg-background/30" />
          <div className="text-center">
            <p className="font-serif text-2xl font-bold text-background">4.9</p>
            <p className="mt-1 uppercase tracking-wide">Guest Rating</p>
          </div>
        </div>
      </div>
    </section>
  )
}
