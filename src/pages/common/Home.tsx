"use client"

import { useState } from "react"
import FootballFields from "../sports/football/Fields"

interface Filters {
  location: string
  date: string
  fieldType: string
  priceRange: string
  amenities: string[]
}

export default function Home() {
  const [filters, setFilters] = useState<Filters>({
    location: "",
    date: "",
    fieldType: "",
    priceRange: "",
    amenities: [],
  })

  return (
    <div>
      <FootballFields filters={filters} setFilters={setFilters} />
    </div>
  )
}

