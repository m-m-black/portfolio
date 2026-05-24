import Head from 'next/head'
import { GitHubLogoIcon, LinkedInLogoIcon } from '@radix-ui/react-icons'

const LINKS = [
  { label: 'Github',   href: 'https://github.com/m-m-black',            Icon: GitHubLogoIcon },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/morgan-black-dev', Icon: LinkedInLogoIcon },
]

const About = () => {
  return (
    <>
      <Head>
        <title>About — Morgan Black</title>
      </Head>
      <main className="min-h-screen bg-background flex items-center justify-center px-8">
        <div className="w-full max-w-2xl flex flex-col sm:flex-row gap-12 sm:gap-16">
          <div className="flex-1">
            <p className="text-text-muted text-xs tracking-widest uppercase">
              Software engineer. Builds things that outlast their requirements.
            </p>
          </div>
          <div className="flex-1 flex flex-col gap-3">
            {LINKS.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 w-fit px-3 py-2 border border-border rounded-full text-text-muted hover:text-accent hover:border-accent transition-colors"
              >
                <Icon className="w-4 h-4" />
                <span className="text-xs tracking-widest uppercase">{label}</span>
              </a>
            ))}
          </div>
        </div>
      </main>
    </>
  )
}

export default About
