import { generateCircle } from './generative'

describe('generateCircle', () => {
  it('same seed produces the same output', () => {
    expect(generateCircle(42)).toEqual(generateCircle(42))
  })

  it('different seeds produce different output', () => {
    const a = generateCircle(1)
    const b = generateCircle(2)
    expect(a.stones.map(s => s.ringAngle)).not.toEqual(b.stones.map(s => s.ringAngle))
  })

  it('stone count is in expected range', () => {
    for (const seed of [0, 1, 99, 12345, 0xdeadbeef]) {
      const { stones } = generateCircle(seed)
      expect(stones.length).toBeGreaterThanOrEqual(6)
      expect(stones.length).toBeLessThanOrEqual(10)
    }
  })

  it('stones are sorted back-to-front', () => {
    const { stones } = generateCircle(7)
    for (let i = 1; i < stones.length; i++) {
      expect(Math.sin(stones[i].ringAngle)).toBeGreaterThanOrEqual(
        Math.sin(stones[i - 1].ringAngle)
      )
    }
  })

  it('all numeric fields are finite and in expected ranges', () => {
    const { stones, ringRadius } = generateCircle(999)
    expect(ringRadius).toBeGreaterThanOrEqual(0.55)
    expect(ringRadius).toBeLessThanOrEqual(0.65)
    for (const s of stones) {
      expect(isFinite(s.ringAngle)).toBe(true)
      expect(isFinite(s.lean)).toBe(true)
      expect(s.sizeFactor).toBeGreaterThanOrEqual(0.7)
      expect(s.sizeFactor).toBeLessThanOrEqual(1.3)
      expect(s.vertices.length).toBe(9)
      for (const [x, y] of s.vertices) {
        expect(isFinite(x)).toBe(true)
        expect(isFinite(y)).toBe(true)
      }
    }
  })
})
