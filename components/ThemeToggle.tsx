import { useState, useEffect } from 'react'
import { SunIcon, MoonIcon } from '@radix-ui/react-icons'

const ThemeToggle = () => {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    setDark(document.documentElement.classList.contains('dark'))
  }, [])

  const toggle = () => {
    setDark(prev => {
      const next = !prev
      document.documentElement.classList.toggle('dark', next)
      localStorage.setItem('theme', next ? 'dark' : 'light')
      return next
    })
  }

  return (
    <button
      onClick={toggle}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="inline-flex items-center justify-center rounded p-3 text-text-muted hover:bg-surface hover:text-text transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      {dark ? <MoonIcon width={18} height={18} /> : <SunIcon width={18} height={18} />}
    </button>
  )
}

export default ThemeToggle
