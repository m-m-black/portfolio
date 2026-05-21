import Link from 'next/link'
import { useRouter } from 'next/router'
import ThemeToggle from './ThemeToggle'

const links = [
  { href: '/', label: 'HOME' },
  { href: '/observatory', label: 'OBSERVATORY' },
  { href: '/about', label: 'ABOUT' },
]

const Header = () => {
  const { pathname } = useRouter()

  return (
    <header className="fixed top-6 left-8 right-8 z-50 flex items-center justify-between">
      <nav className="flex items-center gap-6">
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={`text-xs tracking-widest font-medium transition-colors duration-200 ${
              pathname === href ? 'text-accent' : 'text-text-muted hover:text-text'
            }`}
          >
            {label}
          </Link>
        ))}
      </nav>
      <ThemeToggle />
    </header>
  )
}

export default Header
