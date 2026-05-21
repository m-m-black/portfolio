import { getSunPosition, getShadowAngle, getNextSolstice, getCountdown } from './solar'

describe('getSunPosition', () => {
  it('returns azimuth between 0 and 360 and altitude between -90 and 90', () => {
    const pos = getSunPosition(51.18, -1.83, new Date('2026-06-21T12:00:00Z'))
    expect(pos.azimuth).toBeGreaterThanOrEqual(0)
    expect(pos.azimuth).toBeLessThan(360)
    expect(pos.altitude).toBeGreaterThanOrEqual(-90)
    expect(pos.altitude).toBeLessThanOrEqual(90)
  })

  it('returns negative altitude at midnight UTC in winter at mid-latitude', () => {
    // Midnight UTC in January at Stonehenge — sun is well below the horizon
    const pos = getSunPosition(51.18, -1.83, new Date('2026-01-15T00:00:00Z'))
    expect(pos.altitude).toBeLessThan(0)
  })

  it('returns higher altitude at solar noon than at 6am', () => {
    const noon = getSunPosition(51.18, -1.83, new Date('2026-06-21T12:00:00Z'))
    const morning = getSunPosition(51.18, -1.83, new Date('2026-06-21T05:00:00Z'))
    expect(noon.altitude).toBeGreaterThan(morning.altitude)
  })
})

describe('getShadowAngle', () => {
  it('returns azimuth + 180 for sun in the north', () => {
    expect(getShadowAngle(0)).toBe(180)
  })

  it('returns correct angle for easterly sun', () => {
    expect(getShadowAngle(90)).toBe(270)
  })

  it('wraps correctly when sun is in the south', () => {
    expect(getShadowAngle(180)).toBe(0)
  })

  it('wraps correctly when sun is in the west', () => {
    expect(getShadowAngle(270)).toBe(90)
  })
})

describe('getNextSolstice', () => {
  it('returns march_equinox from January', () => {
    const result = getNextSolstice(new Date('2026-01-01'))
    expect(result.event).toBe('march_equinox')
  })

  it('returns midsummer from April', () => {
    const result = getNextSolstice(new Date('2026-04-01'))
    expect(result.event).toBe('midsummer')
  })

  it('returns september_equinox from July', () => {
    const result = getNextSolstice(new Date('2026-07-01'))
    expect(result.event).toBe('september_equinox')
  })

  it('returns midwinter from October', () => {
    const result = getNextSolstice(new Date('2026-10-01'))
    expect(result.event).toBe('midwinter')
  })

  it('always returns a date in the future relative to the input', () => {
    const input = new Date('2026-03-01')
    const result = getNextSolstice(input)
    expect(result.date.getTime()).toBeGreaterThan(input.getTime())
  })
})

describe('getCountdown', () => {
  it('returns correct days, hours, minutes, seconds for a future date', () => {
    const now = new Date('2026-01-01T00:00:00.000Z')
    const target = new Date(now.getTime() + 2 * 86400000 + 3 * 3600000 + 30 * 60000)
    const result = getCountdown(target, now)
    expect(result.days).toBe(2)
    expect(result.hours).toBe(3)
    expect(result.minutes).toBe(30)
  })

  it('returns all zeros for a past date', () => {
    const now = new Date('2026-01-01T00:00:00.000Z')
    const past = new Date(now.getTime() - 10000)
    const result = getCountdown(past, now)
    expect(result).toEqual({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  })
})
