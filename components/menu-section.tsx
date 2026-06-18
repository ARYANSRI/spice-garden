import Image from "next/image"
import { Flame, Leaf } from "lucide-react"

type Dish = {
  name: string
  description: string
  price: string
  image: string
  tags: ("spicy" | "veg")[]
}

const dishes: Dish[] = [
  {
    name: "Butter Chicken",
    description:
      "Tender tandoor-roasted chicken simmered in a velvety tomato and cream sauce, finished with fenugreek.",
    price: "$18",
    image: "/images/butter-chicken.png",
    tags: ["spicy"],
  },
  {
    name: "Lamb Biryani",
    description:
      "Fragrant saffron basmati layered with slow-cooked lamb, fried onions, and aromatic whole spices.",
    price: "$22",
    image: "/images/biryani.png",
    tags: ["spicy"],
  },
  {
    name: "Vegetable Samosas",
    description:
      "Crispy golden pastry filled with spiced potatoes and peas, served with mint and tamarind chutney.",
    price: "$9",
    image: "/images/samosa.png",
    tags: ["veg"],
  },
  {
    name: "Tandoori Chicken Tikka",
    description:
      "Char-grilled chicken marinated in yogurt and warm spices, served sizzling with onions and lemon.",
    price: "$16",
    image: "/images/tandoori.png",
    tags: ["spicy"],
  },
  {
    name: "Palak Paneer",
    description:
      "Soft cubes of house-made paneer in a creamy spinach gravy seasoned with garlic and garam masala.",
    price: "$15",
    image: "/images/paneer.png",
    tags: ["veg"],
  },
  {
    name: "Gulab Jamun",
    description:
      "Warm golden milk dumplings soaked in rose-cardamom syrup, topped with crushed pistachios.",
    price: "$8",
    image: "/images/gulab-jamun.png",
    tags: ["veg"],
  },
]

function TagBadge({ tag }: { tag: "spicy" | "veg" }) {
  if (tag === "spicy") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
        <Flame className="h-3 w-3" />
        Spicy
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-2.5 py-1 text-xs font-medium text-accent">
      <Leaf className="h-3 w-3" />
      Vegetarian
    </span>
  )
}

export function MenuSection() {
  return (
    <section id="menu" className="bg-background py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Our Menu
          </p>
          <h2 className="mt-3 text-balance font-serif text-4xl font-bold text-foreground md:text-5xl">
            Signature Dishes from Our Kitchen
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            Each plate is crafted with hand-ground spices and traditional
            techniques passed down through generations.
          </p>
        </div>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {dishes.map((dish) => (
            <article
              key={dish.name}
              className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={dish.image || "/placeholder.svg"}
                  alt={dish.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-serif text-xl font-bold text-card-foreground">
                    {dish.name}
                  </h3>
                  <span className="shrink-0 font-serif text-xl font-bold text-primary">
                    {dish.price}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {dish.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {dish.tags.map((tag) => (
                    <TagBadge key={tag} tag={tag} />
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
