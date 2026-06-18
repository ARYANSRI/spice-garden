"use client"

import type React from "react"
import { useState } from "react"
import { CalendarCheck, Clock, MapPin, Phone, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { supabase } from "@/lib/supabase"
import { cn } from "@/lib/utils"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const times = [
  "5:00 PM",
  "5:30 PM",
  "6:00 PM",
  "6:30 PM",
  "7:00 PM",
  "7:30 PM",
  "8:00 PM",
  "8:30 PM",
  "9:00 PM",
]

function combineDateAndTime(dateStr: string, timeStr: string): string {
  if (!dateStr || !timeStr) return ""
  const [time, modifier] = timeStr.split(" ")
  let [hours, minutes] = time.split(":")
  let hoursInt = parseInt(hours, 10)
  if (modifier === "PM" && hoursInt < 12) {
    hoursInt += 12
  }
  if (modifier === "AM" && hoursInt === 12) {
    hoursInt = 0
  }
  const formattedHours = String(hoursInt).padStart(2, '0')
  const formattedMinutes = minutes.padStart(2, '0')
  return `${dateStr}T${formattedHours}:${formattedMinutes}:00`
}

function validateForm(formData: {
  name: string
  email: string
  phone: string
  date: string
  guests: string
}) {
  const newErrors: Record<string, string> = {}

  if (!formData.name.trim()) {
    newErrors.name = "Full name is required"
  } else if (formData.name.trim().length < 2) {
    newErrors.name = "Name must be at least 2 characters long"
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!formData.email.trim()) {
    newErrors.email = "Email address is required"
  } else if (!emailRegex.test(formData.email.trim())) {
    newErrors.email = "Please enter a valid email address"
  }

  const phoneRegex = /^\+?[\d\s()+-]{7,15}$/
  if (!formData.phone.trim()) {
    newErrors.phone = "Phone number is required"
  } else if (!phoneRegex.test(formData.phone.trim())) {
    newErrors.phone = "Please enter a valid phone number (at least 7 digits)"
  }

  if (!formData.date) {
    newErrors.date = "Reservation date is required"
  } else {
    const selectedDate = new Date(formData.date)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    selectedDate.setHours(0, 0, 0, 0)
    if (selectedDate < today) {
      newErrors.date = "Reservation date cannot be in the past"
    }
  }

  const guestsNum = parseInt(formData.guests, 10)
  if (!formData.guests || isNaN(guestsNum) || guestsNum < 1 || guestsNum > 10) {
    newErrors.guests = "Number of guests must be between 1 and 10"
  }

  return newErrors
}

export function ReservationForm() {
  const [submitted, setSubmitted] = useState(false)
  const [guests, setGuests] = useState("2")
  const [time, setTime] = useState("7:00 PM")
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setErrors({})
    setErrorMessage(null)

    const formData = new FormData(e.currentTarget)
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const phone = formData.get("phone") as string
    const dateInput = formData.get("date") as string

    const validationErrors = validateForm({
      name,
      email,
      phone,
      date: dateInput,
      guests,
    })

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setLoading(true)

    try {
      const reservationDateTime = combineDateAndTime(dateInput, time)

      const { error } = await supabase
        .from("reservations")
        .insert([
          {
            name,
            email,
            phone,
            date: reservationDateTime,
            guests: parseInt(guests, 10),
          },
        ])

      if (error) {
        throw new Error(error.message)
      }

      setSubmitted(true)
    } catch (err: any) {
      console.error("Error submitting reservation:", err)
      setErrorMessage(
        err.message || "Failed to make reservation. Please try again."
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="reserve" className="bg-secondary py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 md:px-6 lg:grid-cols-2 lg:items-center">
        {/* Info side */}
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Reservations
          </p>
          <h2 className="mt-3 text-balance font-serif text-4xl font-bold text-foreground md:text-5xl">
            Reserve Your Table at Spice Garden
          </h2>
          <p className="mt-4 max-w-md text-pretty leading-relaxed text-muted-foreground">
            Join us for an unforgettable dining experience. Book your table in
            advance and let us prepare a memorable evening for you and your
            guests.
          </p>

          <ul className="mt-8 space-y-5">
            <li className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <MapPin className="h-5 w-5" />
              </span>
              <div>
                <p className="font-medium text-foreground">Location</p>
                <p className="text-sm text-muted-foreground">
                  142 Saffron Street, Downtown District
                </p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Clock className="h-5 w-5" />
              </span>
              <div>
                <p className="font-medium text-foreground">Opening Hours</p>
                <p className="text-sm text-muted-foreground">
                  Mon&ndash;Sun, 5:00 PM &ndash; 11:00 PM
                </p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Phone className="h-5 w-5" />
              </span>
              <div>
                <p className="font-medium text-foreground">Phone</p>
                <p className="text-sm text-muted-foreground">(555) 012-3456</p>
              </div>
            </li>
          </ul>
        </div>

        {/* Form side */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8">
          {submitted ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <CheckCircle2 className="h-14 w-14 text-primary" />
              <h3 className="mt-4 font-serif text-2xl font-bold text-card-foreground">
                Reservation Requested!
              </h3>
              <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
                Thank you for choosing Spice Garden. We&apos;ll confirm your
                booking shortly via email or phone.
              </p>
              <Button
                className="mt-6 rounded-full"
                variant="outline"
                onClick={() => setSubmitted(false)}
              >
                Make Another Reservation
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="flex items-center gap-2 text-primary">
                <CalendarCheck className="h-5 w-5" />
                <span className="font-serif text-lg font-bold text-card-foreground">
                  Book Your Table
                </span>
              </div>

              {errorMessage && (
                <div className="bg-destructive/10 text-destructive text-sm rounded-lg p-3.5 border border-destructive/20 space-y-1">
                  <p className="font-semibold">Error occurred</p>
                  <p className="text-xs opacity-90 leading-relaxed">{errorMessage}</p>
                  {errorMessage.includes("row-level security") && (
                    <div className="text-xs font-mono bg-destructive/5 p-2 rounded mt-2 border border-destructive/10 overflow-x-auto">
                      Run this in Supabase SQL Editor:<br/>
                      <span className="select-all text-foreground font-semibold">
                        CREATE POLICY &quot;Allow public insert&quot; ON reservations FOR INSERT TO public WITH CHECK (true);
                      </span>
                    </div>
                  )}
                </div>
              )}

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Jane Doe"
                    className={cn(errors.name && "border-destructive focus-visible:ring-destructive/20")}
                    required
                  />
                  {errors.name && (
                    <p className="text-xs text-destructive mt-1">{errors.name}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="(555) 000-0000"
                    className={cn(errors.phone && "border-destructive focus-visible:ring-destructive/20")}
                    required
                  />
                  {errors.phone && (
                    <p className="text-xs text-destructive mt-1">{errors.phone}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="jane@example.com"
                  className={cn(errors.email && "border-destructive focus-visible:ring-destructive/20")}
                  required
                />
                {errors.email && (
                  <p className="text-xs text-destructive mt-1">{errors.email}</p>
                )}
              </div>

              <div className="grid gap-5 sm:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    name="date"
                    type="date"
                    className={cn(errors.date && "border-destructive focus-visible:ring-destructive/20")}
                    required
                  />
                  {errors.date && (
                    <p className="text-xs text-destructive mt-1">{errors.date}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Time</Label>
                  <Select value={time} onValueChange={setTime}>
                    <SelectTrigger id="time" className="w-full">
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      {times.map((t) => (
                        <SelectItem key={t} value={t}>
                          {t}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="guests">Guests</Label>
                  <Select value={guests} onValueChange={setGuests}>
                    <SelectTrigger id="guests" className="w-full">
                      <SelectValue placeholder="Guests" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 10 }, (_, i) => String(i + 1)).map(
                        (n) => (
                          <SelectItem key={n} value={n}>
                            {n} {n === "1" ? "Guest" : "Guests"}
                          </SelectItem>
                        ),
                      )}
                    </SelectContent>
                  </Select>
                  {errors.guests && (
                    <p className="text-xs text-destructive mt-1">{errors.guests}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="requests">Special Requests</Label>
                <textarea
                  id="requests"
                  name="requests"
                  rows={3}
                  placeholder="Allergies, seating preferences, celebrations..."
                  className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full rounded-full"
                disabled={loading}
              >
                {loading ? "Confirming..." : "Confirm Reservation"}
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
