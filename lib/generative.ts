export type Stone = {
  ringAngle: number
  vertices: ReadonlyArray<readonly [number, number]>
  lean: number
  sizeFactor: number
}

export type CircleLayout = {
  stones: Stone[]
  ringRadius: number
}

function mulberry32(seed: number): () => number {
  let s = seed
  return () => {
    s = (s + 0x6d2b79f5) | 0
    let t = Math.imul(s ^ (s >>> 15), 1 | s)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function stoneVertices(rng: () => number): ReadonlyArray<readonly [number, number]> {
  const N = 9
  // Horizontal cross-section of a standing stone: wider than deep, slab-like
  const w = 0.6 + rng() * 0.8   // half-width along the stone face: 0.6..1.4
  const h = 0.25 + rng() * 0.4  // half-depth front-to-back: 0.25..0.65, always < w
  const verts: [number, number][] = []
  for (let i = 0; i < N; i++) {
    const theta = (i / N) * Math.PI * 2
    const baseR = (w * h) / Math.sqrt((h * Math.cos(theta)) ** 2 + (w * Math.sin(theta)) ** 2)
    const noise = 0.88 + rng() * 0.24
    verts.push([Math.cos(theta) * baseR * noise, Math.sin(theta) * baseR * noise])
  }
  return verts
}

export function generateCircle(seed: number): CircleLayout {
  const rng = mulberry32(seed)
  const count = 6 + Math.floor(rng() * 5)
  const ringRadius = 0.55 + rng() * 0.10

  const stones: Stone[] = []
  for (let i = 0; i < count; i++) {
    const baseAngle = (i / count) * Math.PI * 2
    const jitter = (rng() - 0.5) * 0.15
    const ringAngle = baseAngle + jitter
    const lean = (rng() - 0.5) * 0.35
    const sizeFactor = 0.7 + rng() * 0.6
    const vertices = stoneVertices(rng)
    stones.push({ ringAngle, vertices, lean, sizeFactor })
  }

  // Back-to-front: smallest sin(ringAngle) first
  stones.sort((a, b) => Math.sin(a.ringAngle) - Math.sin(b.ringAngle))

  return { stones, ringRadius }
}
