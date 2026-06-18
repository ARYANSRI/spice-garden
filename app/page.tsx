import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { MenuSection } from "@/components/menu-section"
import { AboutSection } from "@/components/about-section"
import { ReservationForm } from "@/components/reservation-form"
import { SiteFooter } from "@/components/site-footer"

export default function Page() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <MenuSection />
      <AboutSection />
      <ReservationForm />
      <SiteFooter />
    </main>
  )
}
