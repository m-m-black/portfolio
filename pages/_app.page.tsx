import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { Inter } from 'next/font/google'
import { AnimatePresence, motion } from 'motion/react'
import Nav from '../components/Nav'
import ThemeToggle from '../components/ThemeToggle'
import '../styles/global.css'

const inter = Inter({ subsets: ['latin'] })

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter()

  return (
    <div className={inter.className}>
      <Nav />
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={router.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15, ease: 'easeInOut' }}
        >
          <Component {...pageProps} />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default App
