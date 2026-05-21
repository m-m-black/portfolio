import { useEffect, useState } from 'react'

const RUNES = 'ᚠᚢᚦᚨᚱᚲᚷᚹᚺᚾᛁᛃᛇᛈᛉᛊᛏᛒᛖᛗᛚᛜᛞᛟ'
const INITIAL_DELAY = 300  // ms before the first character resolves
const CHAR_STAGGER = 240   // ms between each character resolving
const HOP_OFFSET = 160      // ms between each hop

const randomRune = () => RUNES[Math.floor(Math.random() * RUNES.length)]

type Props = {
  text: string
  className?: string
}

const RunicScramble = ({ text, className }: Props) => {
  const chars = text.split('')

  const [displayed, setDisplayed] = useState<string[]>(chars)

  useEffect(() => {
    setDisplayed(chars.map((c) => (c === ' ' ? ' ' : randomRune())))

    const resolveOrder = chars
      .map((_, i) => i)
      .filter((i) => chars[i] !== ' ')

    const timers = resolveOrder.flatMap((charIndex, staggerIndex) => {
      const resolveAt = INITIAL_DELAY + staggerIndex * CHAR_STAGGER

      const hop1 = setTimeout(() => {
        setDisplayed((prev) => {
          const next = [...prev]
          next[charIndex] = randomRune()
          return next
        })
      }, resolveAt - HOP_OFFSET * 2)

      const hop2 = setTimeout(() => {
        setDisplayed((prev) => {
          const next = [...prev]
          next[charIndex] = randomRune()
          return next
        })
      }, resolveAt - HOP_OFFSET)

      const snap = setTimeout(() => {
        setDisplayed((prev) => {
          const next = [...prev]
          next[charIndex] = chars[charIndex]
          return next
        })
      }, resolveAt)

      return [hop1, hop2, snap]
    })

    return () => timers.forEach(clearTimeout)
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
