import { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'
import type { Monument, AlignmentEvent } from '../lib/monuments'

const EVENTS: AlignmentEvent[] = [
  'midsummer_sunrise',
  'midsummer_sunset',
  'midwinter_sunrise',
  'midwinter_sunset',
  'equinox_sunrise',
  'equinox_sunset',
  'lunar_major_standstill',
  'lunar_minor_standstill',
]

const EVENT_LABELS: Record<AlignmentEvent, [string, string]> = {
  midsummer_sunrise:      ['Midsummer', 'Sunrise'],
  midsummer_sunset:       ['Midsummer', 'Sunset'],
  midwinter_sunrise:      ['Midwinter', 'Sunrise'],
  midwinter_sunset:       ['Midwinter', 'Sunset'],
  equinox_sunrise:        ['Equinox',   'Sunrise'],
  equinox_sunset:         ['Equinox',   'Sunset'],
  lunar_major_standstill: ['Lunar',     'Major'],
  lunar_minor_standstill: ['Lunar',     'Minor'],
}

type EventData = {
  event: AlignmentEvent
  confirmed: number
  probable: number
  proposed: number
  total: number
}

type TooltipState = { x: number; y: number; data: EventData }

function processData(monuments: Monument[]): EventData[] {
  return EVENTS.map(event => {
    const all = monuments.flatMap(m => m.alignments).filter(a => a.event === event)
    return {
      event,
      confirmed: all.filter(a => a.confidence === 'confirmed').length,
      probable:  all.filter(a => a.confidence === 'probable').length,
      proposed:  all.filter(a => a.confidence === 'proposed').length,
      total:     all.length,
    }
  })
}

export default function AlignmentChart({ monuments }: { monuments: Monument[] }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const [size, setSize] = useState(400)
  const [tooltip, setTooltip] = useState<TooltipState | null>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => {
      setSize(Math.min(entry.contentRect.width, 520))
    })
    ro.observe(el)
    setSize(Math.min(el.offsetWidth, 520))
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    const svgEl = svgRef.current
    if (!svgEl || size === 0) return

    const svg = d3.select(svgEl)
    svg.selectAll('*').remove()

    const data = processData(monuments)
    const cx = size / 2
    const cy = size / 2
    const innerR = size * 0.10
    const maxR   = size * 0.27
    const labelR = size * 0.38

    const maxTotal = Math.max(1, d3.max(data, d => d.total) ?? 1)
    const rScale = (maxR - innerR) / maxTotal

    const segAngle = (2 * Math.PI) / EVENTS.length
    const padAngle = 0.04

    type ArcDatum = { ir: number; or: number; sa: number; ea: number }
    const arcGen = d3.arc<ArcDatum>()
      .innerRadius(d => d.ir)
      .outerRadius(d => d.or)
      .startAngle(d => d.sa)
      .endAngle(d => d.ea)
      .padAngle(padAngle)
      .padRadius(innerR)

    const g = svg.append('g').attr('transform', `translate(${cx},${cy})`)

    // Grid rings
    const ringCount = 3
    for (let i = 1; i <= ringCount; i++) {
      g.append('circle')
        .attr('r', innerR + (maxR - innerR) * (i / ringCount))
        .attr('fill', 'none')
        .attr('stroke', 'var(--border)')
        .attr('stroke-width', 0.5)
        .attr('opacity', i === ringCount ? 0.7 : 0.35)
    }

    // Inner circle
    g.append('circle')
      .attr('r', innerR)
      .attr('fill', 'none')
      .attr('stroke', 'var(--border)')
      .attr('stroke-width', 0.5)
      .attr('opacity', 0.7)

    // Segment dividers
    data.forEach((_, i) => {
      const angle = i * segAngle - Math.PI / 2
      g.append('line')
        .attr('x1', Math.cos(angle) * (innerR + 1))
        .attr('y1', Math.sin(angle) * (innerR + 1))
        .attr('x2', Math.cos(angle) * maxR)
        .attr('y2', Math.sin(angle) * maxR)
        .attr('stroke', 'var(--border)')
        .attr('stroke-width', 0.5)
        .attr('opacity', 0.3)
    })

    // Bars + hover targets
    const confidenceLayers: Array<{ key: keyof Pick<EventData, 'confirmed' | 'probable' | 'proposed'>; opacity: number }> = [
      { key: 'confirmed', opacity: 1.0  },
      { key: 'probable',  opacity: 0.52 },
      { key: 'proposed',  opacity: 0.24 },
    ]

    data.forEach((d, i) => {
      const sa = i * segAngle - Math.PI / 2
      const ea = sa + segAngle

      // Stacked bars
      let currentR = innerR
      confidenceLayers.forEach(({ key, opacity }) => {
        const count = d[key]
        if (count === 0) return
        const or = currentR + count * rScale
        g.append('path')
          .attr('d', arcGen({ ir: currentR, or, sa, ea }) ?? '')
          .attr('fill', 'var(--accent)')
          .attr('opacity', opacity)
        currentR = or
      })

      // Stub for empty segments
      if (d.total === 0) {
        g.append('path')
          .attr('d', arcGen({ ir: innerR, or: innerR + 3, sa, ea }) ?? '')
          .attr('fill', 'var(--border)')
          .attr('opacity', 0.6)
      }

      // Invisible hover target spanning the full segment
      const hoverR = Math.max(innerR + d.total * rScale + 8, innerR + 12)
      g.append('path')
        .attr('d', arcGen({ ir: innerR - 2, or: hoverR, sa, ea }) ?? '')
        .attr('fill', 'transparent')
        .style('cursor', d.total > 0 ? 'pointer' : 'default')
        .on('mousemove', (event: MouseEvent) => {
          const rect = containerRef.current?.getBoundingClientRect()
          if (!rect) return
          setTooltip({ x: event.clientX - rect.left, y: event.clientY - rect.top, data: d })
        })
        .on('mouseleave', () => setTooltip(null))

      // Labels
      const midAngle = sa + segAngle / 2
      const lx = Math.cos(midAngle) * labelR
      const ly = Math.sin(midAngle) * labelR
      const [line1, line2] = EVENT_LABELS[d.event]
      const anchor = Math.abs(lx) < 12 ? 'middle' : lx > 0 ? 'start' : 'end'
      const fs = Math.max(8, size * 0.022)

      const labelG = g.append('g').attr('transform', `translate(${lx},${ly})`)
      ;[line1, line2].forEach((text, li) => {
        labelG.append('text')
          .attr('dy', li === 0 ? '-0.1em' : '1.05em')
          .attr('text-anchor', anchor)
          .attr('fill', 'var(--text-muted)')
          .style('font-size', `${fs}px`)
          .style('letter-spacing', '0.07em')
          .text(text.toUpperCase())
      })
    })
  }, [monuments, size])

  return (
    <div ref={containerRef} className="relative w-full">
      <svg
        ref={svgRef}
        width={size}
        height={size}
        overflow="visible"
        className="block mx-auto font-mono"
      />
      {tooltip && (
        <div
          className="absolute z-10 pointer-events-none bg-surface-raised border border-border px-3 py-2 text-xs font-mono"
          style={{ left: tooltip.x + 14, top: tooltip.y - 8 }}
        >
          <p className="text-text tracking-widest uppercase text-[10px]">
            {EVENT_LABELS[tooltip.data.event].join(' ')}
          </p>
          <p className="text-accent mt-1">
            {tooltip.data.total} monument{tooltip.data.total !== 1 ? 's' : ''}
          </p>
          {tooltip.data.confirmed > 0 && (
            <p className="text-text-muted">{tooltip.data.confirmed} confirmed</p>
          )}
          {tooltip.data.probable > 0 && (
            <p className="text-text-muted">{tooltip.data.probable} probable</p>
          )}
          {tooltip.data.proposed > 0 && (
            <p className="text-text-muted">{tooltip.data.proposed} proposed</p>
          )}
        </div>
      )}
    </div>
  )
}
