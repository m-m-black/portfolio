const DEG = Math.PI / 180

function toJulianDate(date: Date): number {
  return date.getTime() / 86400000 + 2440587.5
}

function julianDateToDate(jd: number): Date {
  return new Date((jd - 2440587.5) * 86400000)
}

export type SunPosition = {
  azimuth: number
  altitude: number
}

export function getSunPosition(lat: number, lng: number, date: Date): SunPosition {
  const JD = toJulianDate(date)
  const T = (JD - 2451545.0) / 36525.0

  const L0 = (280.46646 + T * (36000.76983 + T * 0.0003032)) % 360
  const M = 357.52911 + T * (35999.05029 - 0.0001537 * T)
  const Mrad = M * DEG

  const C =
    (1.914602 - T * (0.004817 + 0.000014 * T)) * Math.sin(Mrad) +
    (0.019993 - 0.000101 * T) * Math.sin(2 * Mrad) +
    0.000289 * Math.sin(3 * Mrad)

  const sunLon = L0 + C
  const omega = 125.04 - 1934.136 * T
  const lambda = sunLon - 0.00569 - 0.00478 * Math.sin(omega * DEG)

  const epsilon0 =
    23 + (26 + (21.448 - T * (46.815 + T * (0.00059 - T * 0.001813))) / 60) / 60
  const epsilon = epsilon0 + 0.00256 * Math.cos(omega * DEG)

  const declination = Math.asin(Math.sin(epsilon * DEG) * Math.sin(lambda * DEG))

  const utcHours =
    date.getUTCHours() + date.getUTCMinutes() / 60 + date.getUTCSeconds() / 3600

  const y = Math.tan((epsilon / 2) * DEG) ** 2
  const Lrad = L0 * DEG
  const eot =
    (4 *
      (y * Math.sin(2 * Lrad) -
        2 * 0.016708634 * Math.sin(Mrad) +
        4 * 0.016708634 * y * Math.sin(Mrad) * Math.cos(2 * Lrad) -
        0.5 * y * y * Math.sin(4 * Lrad) -
        1.25 * 0.016708634 ** 2 * Math.sin(2 * Mrad))) /
    DEG

  const trueSolarTime = utcHours * 60 + eot + 4 * lng
  const hourAngle = trueSolarTime / 4 - 180

  const latRad = lat * DEG
  const haRad = hourAngle * DEG

  const sinAlt =
    Math.sin(latRad) * Math.sin(declination) +
    Math.cos(latRad) * Math.cos(declination) * Math.cos(haRad)
  const altitude = Math.asin(Math.max(-1, Math.min(1, sinAlt))) / DEG

  const cosAz =
    (Math.sin(declination) - Math.sin(latRad) * sinAlt) /
    (Math.cos(latRad) * Math.sqrt(1 - sinAlt * sinAlt))
  let azimuth = Math.acos(Math.max(-1, Math.min(1, cosAz))) / DEG
  if (hourAngle > 0) azimuth = 360 - azimuth

  return { azimuth, altitude }
}

export function getShadowAngle(sunAzimuth: number): number {
  return (sunAzimuth + 180) % 360
}

export type SolsticeEventType =
  | 'march_equinox'
  | 'midsummer'
  | 'september_equinox'
  | 'midwinter'

export type SolsticeResult = {
  event: SolsticeEventType
  date: Date
}

function getSolsticeEquinoxDates(year: number): SolsticeResult[] {
  const Y = (year - 2000) / 1000
  const Y2 = Y * Y
  const Y3 = Y2 * Y
  const Y4 = Y3 * Y

  const jdes: Array<{ event: SolsticeEventType; jde: number }> = [
    {
      event: 'march_equinox',
      jde: 2451623.80984 + 365242.37404 * Y + 0.05169 * Y2 - 0.00411 * Y3 - 0.00057 * Y4,
    },
    {
      event: 'midsummer',
      jde: 2451716.56767 + 365241.62603 * Y + 0.00325 * Y2 + 0.00888 * Y3 - 0.0003 * Y4,
    },
    {
      event: 'september_equinox',
      jde: 2451810.21715 + 365242.01767 * Y - 0.11575 * Y2 + 0.00337 * Y3 + 0.00078 * Y4,
    },
    {
      event: 'midwinter',
      jde: 2451900.05952 + 365242.74049 * Y - 0.06223 * Y2 - 0.00823 * Y3 + 0.00032 * Y4,
    },
  ]

  return jdes.map(({ event, jde }) => ({ event, date: julianDateToDate(jde) }))
}

export function getNextSolstice(date: Date): SolsticeResult {
  const year = date.getFullYear()
  const events = [
    ...getSolsticeEquinoxDates(year),
    ...getSolsticeEquinoxDates(year + 1),
  ]
  const future = events
    .filter((e) => e.date > date)
    .sort((a, b) => a.date.getTime() - b.date.getTime())
  return future[0]
}

export type Countdown = {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export function getCountdown(targetDate: Date, now: Date = new Date()): Countdown {
  const diff = Math.max(0, targetDate.getTime() - now.getTime())
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor(diff / 3600000) % 24,
    minutes: Math.floor(diff / 60000) % 60,
    seconds: Math.floor(diff / 1000) % 60,
  }
}
