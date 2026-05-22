import { useEffect, useRef, useState } from 'react'
import { generateCircle } from '../lib/generative'

const SQRT3 = Math.sqrt(3)
const COS30 = SQRT3 / 2
const SIN30 = 0.5

function drawCatmullRom(ctx: CanvasRenderingContext2D, pts: [number, number][]) {
  const N = pts.length
  ctx.moveTo(pts[0][0], pts[0][1])
  for (let i = 0; i < N; i++) {
    const p0 = pts[(i - 1 + N) % N]
    const p1 = pts[i]
    const p2 = pts[(i + 1) % N]
    const p3 = pts[(i + 2) % N]
    const cp1x = p1[0] + (p2[0] - p0[0]) / 6
    const cp1y = p1[1] + (p2[1] - p0[1]) / 6
    const cp2x = p2[0] - (p3[0] - p1[0]) / 6
    const cp2y = p2[1] - (p3[1] - p1[1]) / 6
    ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, p2[0], p2[1])
  }
  ctx.closePath()
}

export default function GenerativeCircle({ size }: { size: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const seedRef   = useRef<number | null>(null)
  const [theme, setTheme] = useState(() =>
    typeof document !== 'undefined' ? document.documentElement.className : ''
  )

  useEffect(() => {
    setTheme(document.documentElement.className)
    const observer = new MutationObserver(() => {
      setTheme(document.documentElement.className)
    })
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || size === 0) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Stable seed across size changes (resize should redraw same circle)
    if (seedRef.current === null) {
      seedRef.current = Math.floor(Math.random() * 0xffffffff)
    }
    const layout = generateCircle(seedRef.current)

    const dpr = window.devicePixelRatio || 1
    // Canvas is wider than tall — isometric diamond of a square plane
    // has width = 2√3·R and height = 2R, so aspect = √3 : 1
    const canvasW = size
    const canvasH = Math.round(size / SQRT3)

    canvas.width  = canvasW * dpr
    canvas.height = canvasH * dpr
    canvas.style.width  = `${canvasW}px`
    canvas.style.height = `${canvasH}px`
    ctx.scale(dpr, dpr)

    const style = getComputedStyle(document.documentElement)
    const textColor = style.getPropertyValue('--text').trim()
    const bgColor   = style.getPropertyValue('--background').trim()

    ctx.fillStyle = bgColor
    ctx.fillRect(0, 0, canvasW, canvasH)

    // World radius sized so the projected diamond fills the canvas with margin
    const worldR = (canvasW / (2 * SQRT3)) * 0.88

    // Isometric projection: world (x, y) → screen ((x−y)·cos30, (x+y)·sin30)
    // Applied as a canvas transform so all drawing uses world coordinates
    ctx.save()
    ctx.translate(canvasW / 2, canvasH / 2)
    ctx.transform(COS30, SIN30, -COS30, SIN30, 0, 0)

    // Grid — square world-space grid that reads as an isometric floor
    const gridSpacing = worldR / 6
    ctx.strokeStyle = textColor
    ctx.lineWidth = 0.5
    ctx.globalAlpha = 0.1
    ctx.beginPath()
    for (let v = -worldR; v <= worldR + 0.001; v += gridSpacing) {
      ctx.moveTo(v, -worldR)
      ctx.lineTo(v,  worldR)
      ctx.moveTo(-worldR, v)
      ctx.lineTo( worldR, v)
    }
    ctx.stroke()

    // Plane border
    ctx.globalAlpha = 0.3
    ctx.strokeRect(-worldR, -worldR, worldR * 2, worldR * 2)
    ctx.globalAlpha = 1

    // Stones
    const unitToPx    = worldR * 0.08
    const hatchSpacing = 3

    for (const stone of layout.stones) {
      const sx = Math.cos(stone.ringAngle) * (layout.ringRadius * worldR)
      const sy = Math.sin(stone.ringAngle) * (layout.ringRadius * worldR)
      const scale = unitToPx * stone.sizeFactor

      const verts = stone.vertices.map(
        ([vx, vy]) => [vx * scale, vy * scale] as [number, number]
      )

      let maxR = 0
      for (const [vx, vy] of verts) maxR = Math.max(maxR, Math.hypot(vx, vy))
      const H = maxR * 1.2

      ctx.save()
      ctx.translate(sx, sy)
      ctx.rotate(stone.lean)

      // Hatch interior, clipped to stone outline
      ctx.beginPath()
      drawCatmullRom(ctx, verts)
      ctx.save()
      ctx.clip()
      ctx.strokeStyle = textColor
      ctx.lineWidth = 0.5
      ctx.globalAlpha = 0.25
      ctx.beginPath()
      for (let d = -H * 2; d < H * 2; d += hatchSpacing) {
        ctx.moveTo(d - H, -H)
        ctx.lineTo(d + H,  H)
      }
      ctx.stroke()
      ctx.restore()

      // Stone outline
      ctx.beginPath()
      drawCatmullRom(ctx, verts)
      ctx.strokeStyle = textColor
      ctx.lineWidth = 1
      ctx.stroke()

      ctx.restore()
    }

    ctx.restore()
  }, [size, theme])

  return <canvas ref={canvasRef} />
}
