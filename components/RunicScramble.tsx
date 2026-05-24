import { useState } from 'react'
import { Noto_Sans_Runic } from 'next/font/google'

const notoRunic = Noto_Sans_Runic({ weight: '400', preload: false })

const RUNES = 'ᚠᚢᚦᚨᚱᚲᚷᚹᚺᚾᛁᛃᛇᛈᛉᛊᛏᛒᛖᛗᛚᛜᛞᛟ'
const FADE_MS = 120

const randomRune = () => RUNES[Math.floor(Math.random() * RUNES.length)]

type Props = {
  text: string
  className?: string
}

const RunicScramble = ({ text, className }: Props) => {
  const chars = text.split('')
  const [runeChars, setRuneChars] = useState<Record<number, string>>({})
  const [hovering, setHovering] = useState<Set<number>>(new Set())

  const handleEnter = (i: number) => {
    if (chars[i] === ' ') return
    setRuneChars(prev => ({ ...prev, [i]: randomRune() }))
    setHovering(prev => new Set([...prev, i]))
  }

  const handleLeave = (i: number) => {
    setHovering(prev => { const s = new Set(prev); s.delete(i); return s })
    setRuneChars(prev => { const m = { ...prev }; delete m[i]; return m })
  }

  return (
    <span aria-hidden className={className}>
      {chars.map((char, i) => {
        const isHovered = hovering.has(i)
        const runeChar = runeChars[i]
        return (
          <span
            key={i}
            style={{ display: 'inline-block', width: '1ch', textAlign: 'center', position: 'relative', cursor: 'default' }}
            onMouseEnter={() => handleEnter(i)}
            onMouseLeave={() => handleLeave(i)}
          >
            <span style={{
              opacity: isHovered ? 0 : 1,
              transition: isHovered ? 'none' : `opacity ${FADE_MS}ms ease`,
            }}>
              {char}
            </span>
            {runeChar && (
              <span style={{
                position: 'absolute', top: 0, left: 0, right: 0,
                textAlign: 'center',
                fontFamily: notoRunic.style.fontFamily,
                color: 'var(--accent)',
                animation: `runic-fade-in ${FADE_MS}ms ease forwards`,
              }}>
                {runeChar}
              </span>
            )}
          </span>
        )
      })}
    </span>
  )
}

export default RunicScramble
