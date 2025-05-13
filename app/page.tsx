"use client"

import Fields from "../src/pages/Fields"
import { useState } from "react"

interface Filters {
  location: string
  date: string
  fieldType: string
  priceRange: string
  amenities: string[]
}

export default function Page() {
  const [filters, setFilters] = useState<Filters>({
    location: "",
    date: "",
    fieldType: "",
    priceRange: "",
    amenities: [],
  })

  return (
    <div>
      <Fields filters={filters} setFilters={setFilters} />
    </div>
  )
}
