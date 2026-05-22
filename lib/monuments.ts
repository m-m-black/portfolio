export type AlignmentEvent =
  | 'midsummer_sunrise'
  | 'midsummer_sunset'
  | 'midwinter_sunrise'
  | 'midwinter_sunset'
  | 'equinox_sunrise'
  | 'equinox_sunset'
  | 'lunar_major_standstill'
  | 'lunar_minor_standstill'

export type AlignmentConfidence = 'confirmed' | 'probable' | 'proposed'

export type MonumentType = 'stone_circle' | 'dolmen' | 'passage_tomb' | 'alignment' | 'henge'

export type Alignment = {
  event: AlignmentEvent
  confidence: AlignmentConfidence
}

export type Monument = {
  id: string
  name: string
  country: string
  region: string
  type: MonumentType
  lat: number
  lng: number
  stone_count: number | null
  diameter_m: number | null
  age_bp: number | null
  alignments: Alignment[]
}

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8787'

export async function fetchMonuments(): Promise<Monument[]> {
  const res = await fetch(`${API_URL}/monuments`)
  if (!res.ok) throw new Error(`Failed to fetch monuments: ${res.status}`)
  return res.json() as Promise<Monument[]>
}

export async function fetchMonument(id: string): Promise<Monument> {
  const res = await fetch(`${API_URL}/monuments/${id}`)
  if (!res.ok) throw new Error(`Failed to fetch monument: ${res.status}`)
  return res.json() as Promise<Monument>
}
