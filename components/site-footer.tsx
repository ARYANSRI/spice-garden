import { Flower2, AtSign, Globe, Share2 } from "lucide-react"

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Menu", href: "#menu" },
  { label: "About", href: "#about" },
  { label: "Reservations", href: "#reserve" },
]

export function SiteFooter() {
  return (
    <footer className="bg-accent text-accent-foreground">
      <div className="mx-auto max-w-6xl px-4 py-14 md:px-6">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <a
              href="#home"
              className="flex items-center gap-2 font-serif text-xl font-bold"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Flower2 className="h-5 w-5" />
              </span>
              Spice Garden
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-accent-foreground/80">
              Authentic Indian cuisine crafted with passion, served with warmth.
              Come hungry, leave happy.
            </p>
            <div className="mt-5 flex gap-3">
              {[AtSign, Globe, Share2].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social media"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-foreground/10 transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-serif text-lg font-bold">Explore</h3>
            <ul className="mt-4 space-y-3 text-sm">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-accent-foreground/80 transition-colors hover:text-primary-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-lg font-bold">Visit Us</h3>
            <address className="mt-4 space-y-2 text-sm not-italic text-accent-foreground/80">
              <p>142 Saffron Street</p>
              <p>Downtown District</p>
              <p>(555) 012-3456</p>
              <p>hello@spicegarden.com</p>
            </address>
          </div>
        </div>

        <div className="mt-12 border-t border-accent-foreground/15 pt-6 text-center text-sm text-accent-foreground/70">
          <p>
            &copy; {new Date().getFullYear()} Spice Garden. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
