import { useEffect, useState } from 'react'
import { getNextSolstice, getCountdown, type SolsticeResult, type Countdown } from '../lib/solar'

const EVENT_LABELS: Record<string, string> = {
  march_equinox: 'March Equinox',
  midsummer: 'Midsummer',
  september_equinox: 'September Equinox',
  midwinter: 'Midwinter',
}

const SolsticeWidget = () => {
  const [next, setNext] = useState<SolsticeResult | null>(null)
  const [countdown, setCountdown] = useState<Countdown | null>(null)

  useEffect(() => {
    const update = () => {
      const n = getNextSolstice(new Date())
      setNext(n)
      setCountdown(getCountdown(n.date))
    }
    update()
    const id = setInterval(update, 60_000)
    return () => clearInterval(id)
  }, [])

  if (!next || !countdown) return null

  const { days, hours, minutes } = countdown

  return (
    <div className="fixed bottom-6 right-8 text-right z-50">
      <p className="text-xs tracking-widest uppercase text-text-muted">
        {EVENT_LABELS[next.event]}
      </p>
      <p className="text-xs tracking-widest text-accent font-medium">
        {days}d {hours}h {minutes}m
      </p>
    </div>
  )
}

export default SolsticeWidget
