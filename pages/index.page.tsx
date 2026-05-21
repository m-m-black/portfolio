import Head from 'next/head'
import { GitHubLogoIcon } from '@radix-ui/react-icons'
import Icon from '../components/icon'
import ThemeToggle from '../components/ThemeToggle'

const Home = () => {
  return (
    <>
      <Head>
        <title>Morgan Black</title>
      </Head>
      <div className="fixed top-4 right-4">
        <ThemeToggle />
      </div>
      <main className="flex flex-col items-center justify-center min-h-screen bg-background gap-8 sm:gap-10">
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-text">Morgan Black</h1>
        <a
          href="https://github.com/m-m-black"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-border text-text-muted text-sm font-medium transition-all duration-200 hover:border-text-muted hover:text-text"
        >
          <Icon icon={GitHubLogoIcon} />
          m-m-black
        </a>
      </main>
    </>
  )
}

export default Home
