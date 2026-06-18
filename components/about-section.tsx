import Image from "next/image"
import { Award, Soup, Sprout } from "lucide-react"

const features = [
  {
    icon: Soup,
    title: "Time-Honored Recipes",
    description:
      "Dishes prepared from family recipes refined over three generations of passionate cooks.",
  },
  {
    icon: Sprout,
    title: "Fresh Ingredients",
    description:
      "Locally sourced produce and hand-ground spices selected fresh every single morning.",
  },
  {
    icon: Award,
    title: "Award-Winning Kitchen",
    description:
      "Recognized for culinary excellence and warm hospitality across the region.",
  },
]

export function AboutSection() {
  return (
    <section id="about" className="bg-background py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 md:px-6 lg:grid-cols-2 lg:items-center">
        <div className="relative">
          <div className="overflow-hidden rounded-2xl">
            <Image
              src="/images/tandoori.png"
              alt="Chef preparing tandoori dishes at Spice Garden"
              width={640}
              height={720}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -right-2 hidden rounded-2xl border border-border bg-card px-6 py-5 shadow-lg sm:block md:-right-6">
            <p className="font-serif text-3xl font-bold text-primary">25+</p>
            <p className="text-sm text-muted-foreground">Years serving joy</p>
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Our Story
          </p>
          <h2 className="mt-3 text-balance font-serif text-4xl font-bold text-foreground md:text-5xl">
            Tradition, Spice & a Whole Lot of Heart
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            Spice Garden was born from a simple dream: to share the soulful
            flavors of India with our community. From our sizzling tandoor to
            our slow-simmered curries, every dish tells a story of heritage,
            warmth, and the love of good food shared at a generous table.
          </p>

          <div className="mt-8 space-y-6">
            {features.map((feature) => (
              <div key={feature.title} className="flex items-start gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <feature.icon className="h-6 w-6" />
                </span>
                <div>
                  <h3 className="font-medium text-foreground">
                    {feature.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
