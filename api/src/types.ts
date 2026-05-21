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
