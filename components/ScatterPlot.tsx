import { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'
import type { Monument, MonumentType } from '../lib/monuments'

const TYPE_LABELS: Record<MonumentType, string> = {
  stone_circle:  'Stone Circle',
  dolmen:        'Dolmen',
  passage_tomb:  'Passage Tomb',
  alignment:     'Alignment',
  henge:         'Henge',
}

const TYPE_ORDER: MonumentType[] = [
  'stone_circle',
  'henge',
  'passage_tomb',
  'alignment',
  'dolmen',
]

const TYPE_OPACITY: Record<MonumentType, number> = {
  stone_circle:  1.0,
  henge:         0.72,
  passage_tomb:  0.52,
  alignment:     0.36,
  dolmen:        0.20,
}

type TooltipState = { x: number; y: number; monument: Monument }

export default function ScatterPlot({ monuments }: { monuments: Monument[] }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const [width, setWidth] = useState(400)
  const [tooltip, setTooltip] = useState<TooltipState | null>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => {
      setWidth(Math.min(entry.contentRect.width, 520))
    })
    ro.observe(el)
    setWidth(Math.min(el.offsetWidth, 520))
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    const svgEl = svgRef.current
    if (!svgEl || width === 0) return

    const plotted = monuments.filter(
      m => m.diameter_m !== null && m.stone_count !== null
    ) as (Monument & { diameter_m: number; stone_count: number })[]

    // Square — same dimensions as AlignmentChart
    const height = width
    const margin = { top: 16, right: 16, bottom: 90, left: 52 }
    const innerW = width - margin.left - margin.right
    const innerH = height - margin.top - margin.bottom

    const svg = d3.select(svgEl)
    svg.selectAll('*').remove()
    svg.attr('width', width).attr('height', height)

    const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`)

    const xMax = d3.max(plotted, d => d.diameter_m) ?? 1
    const yMax = d3.max(plotted, d => d.stone_count) ?? 1

    const xScale = d3.scaleLinear().domain([0, xMax * 1.05]).range([0, innerW]).nice()
    const yScale = d3.scaleLinear().domain([0, yMax * 1.05]).range([innerH, 0]).nice()

    const gridCount = 4
    const fs = Math.max(8, width * 0.022)

    // Grid lines
    xScale.ticks(gridCount).forEach(tick => {
      g.append('line')
        .attr('x1', xScale(tick)).attr('x2', xScale(tick))
        .attr('y1', 0).attr('y2', innerH)
        .attr('stroke', 'var(--border)').attr('stroke-width', 0.5).attr('opacity', 0.5)
    })
    yScale.ticks(gridCount).forEach(tick => {
      g.append('line')
        .attr('x1', 0).attr('x2', innerW)
        .attr('y1', yScale(tick)).attr('y2', yScale(tick))
        .attr('stroke', 'var(--border)').attr('stroke-width', 0.5).attr('opacity', 0.5)
    })

    // Axes
    const xAxisG = g.append('g').attr('transform', `translate(0,${innerH})`).call(
      d3.axisBottom(xScale).ticks(gridCount).tickSize(4)
    )
    xAxisG.select('.domain').attr('stroke', 'var(--border)').attr('opacity', 0.5)
    xAxisG.selectAll('.tick line').attr('stroke', 'var(--border)').attr('opacity', 0.5)
    xAxisG.selectAll('.tick text')
      .attr('fill', 'var(--text-muted)')
      .style('font-size', `${fs}px`)
      .style('font-family', 'var(--font-mono, monospace)')

    const yAxisG = g.append('g').call(d3.axisLeft(yScale).ticks(gridCount).tickSize(4))
    yAxisG.select('.domain').attr('stroke', 'var(--border)').attr('opacity', 0.5)
    yAxisG.selectAll('.tick line').attr('stroke', 'var(--border)').attr('opacity', 0.5)
    yAxisG.selectAll('.tick text')
      .attr('fill', 'var(--text-muted)')
      .style('font-size', `${fs}px`)
      .style('font-family', 'var(--font-mono, monospace)')

    // Axis labels
    g.append('text')
      .attr('x', innerW / 2).attr('y', innerH + 36)
      .attr('text-anchor', 'middle')
      .attr('fill', 'var(--text-muted)')
      .style('font-size', `${fs}px`)
      .style('font-family', 'var(--font-mono, monospace)')
      .style('letter-spacing', '0.07em')
      .text('DIAMETER (M)')

    g.append('text')
      .attr('transform', `translate(${-40},${innerH / 2}) rotate(-90)`)
      .attr('text-anchor', 'middle')
      .attr('fill', 'var(--text-muted)')
      .style('font-size', `${fs}px`)
      .style('font-family', 'var(--font-mono, monospace)')
      .style('letter-spacing', '0.07em')
      .text('STONE COUNT')

    // Points
    const r = Math.max(3, width * 0.012)

    plotted.forEach(d => {
      g.append('circle')
        .attr('cx', xScale(d.diameter_m)).attr('cy', yScale(d.stone_count))
        .attr('r', r)
        .attr('fill', 'var(--accent)')
        .attr('opacity', TYPE_OPACITY[d.type])
        .style('cursor', 'pointer')
        .on('mousemove', (event: MouseEvent) => {
          const rect = containerRef.current?.getBoundingClientRect()
          if (!rect) return
          setTooltip({ x: event.clientX - rect.left, y: event.clientY - rect.top, monument: d })
        })
        .on('mouseleave', () => setTooltip(null))
    })

    // Legend (two rows, centered, rendered inside the SVG)
    const legendFs = Math.max(7, fs * 0.85)
    const itemW = Math.min(90, innerW / 3)
    const legendY = innerH + 54
    const legendRows: MonumentType[][] = [
      TYPE_ORDER.slice(0, 3),
      TYPE_ORDER.slice(3),
    ]

    legendRows.forEach((row, rowIdx) => {
      const rowWidth = row.length * itemW
      const startX = (innerW - rowWidth) / 2
      row.forEach((type, colIdx) => {
        const x = startX + colIdx * itemW
        const y = legendY + rowIdx * 15
        g.append('circle')
          .attr('cx', x + 4).attr('cy', y)
          .attr('r', 3)
          .attr('fill', 'var(--accent)')
          .attr('opacity', TYPE_OPACITY[type])
        g.append('text')
          .attr('x', x + 11).attr('y', y)
          .attr('dominant-baseline', 'middle')
          .attr('fill', 'var(--text-muted)')
          .style('font-size', `${legendFs}px`)
          .style('font-family', 'var(--font-mono, monospace)')
          .style('letter-spacing', '0.07em')
          .text(TYPE_LABELS[type].toUpperCase())
      })
    })
  }, [monuments, width])

  return (
    <div ref={containerRef} className="relative w-full">
      <svg ref={svgRef} overflow="visible" className="block font-mono" />
      {tooltip && (
        <div
          className="absolute z-10 pointer-events-none bg-surface-raised border border-border px-3 py-2 text-xs font-mono"
          style={{ left: tooltip.x + 14, top: tooltip.y - 8 }}
        >
          <p className="text-text tracking-widest uppercase text-[10px]">
            {tooltip.monument.name}
          </p>
          <p className="text-accent mt-1">{TYPE_LABELS[tooltip.monument.type]}</p>
          <p className="text-text-muted">{tooltip.monument.diameter_m}m diameter</p>
          <p className="text-text-muted">{tooltip.monument.stone_count} stones</p>
        </div>
      )}
    </div>
  )
}
