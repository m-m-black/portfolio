import Link from 'next/link'
import { useRouter } from 'next/router'

const links = [
  { href: '/', label: 'HOME' },
  { href: '/observatory', label: 'OBSERVATORY' },
  { href: '/about', label: 'ABOUT' },
]

const Nav = () => {
  const { pathname } = useRouter()

  return (
    <nav className="fixed top-6 left-8 flex gap-6 z-50">
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
  )
}

export default Nav
