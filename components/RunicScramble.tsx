import { useEffect, useState } from 'react'

const RUNES = 'ᚠᚢᚦᚨᚱᚲᚷᚹᚺᚾᛁᛃᛇᛈᛉᛊᛏᛒᛖᛗᛚᛜᛞᛟ'
const CYCLE_INTERVAL = 50
const CHAR_STAGGER = 200
const RESOLVE_DELAY = 800

const randomRune = () => RUNES[Math.floor(Math.random() * RUNES.length)]

type Props = {
  text: string
  className?: string
}

const RunicScramble = ({ text, className }: Props) => {
  const chars = text.split('')

  const [displayed, setDisplayed] = useState<string[]>(chars)

  useEffect(() => {
    const resolved = chars.map((c) => c === ' ')

    setDisplayed(chars.map((c) => (c === ' ' ? ' ' : randomRune())))

    const resolveTimers = chars.map((_, i) =>
      setTimeout(
        () => {
          resolved[i] = true
        },
        RESOLVE_DELAY + i * CHAR_STAGGER
      )
    )

    const cycleTimer = setInterval(() => {
      setDisplayed(chars.map((c, i) => (resolved[i] ? c : randomRune())))
    }, CYCLE_INTERVAL)

    const finalTimer = setTimeout(
      () => {
        clearInterval(cycleTimer)
        setDisplayed(chars)
      },
      RESOLVE_DELAY + chars.length * CHAR_STAGGER + CYCLE_INTERVAL * 2
    )

    return () => {
      resolveTimers.forEach(clearTimeout)
      clearInterval(cycleTimer)
      clearTimeout(finalTimer)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <span aria-hidden className={className}>
      {displayed.map((char, i) => (
        <span key={i} style={{ display: 'inline-block', width: '1ch', textAlign: 'center' }}>
          {char}
        </span>
      ))}
    </span>
  )
}

export default RunicScramble
