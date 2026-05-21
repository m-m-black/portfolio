import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { Inter } from 'next/font/google'
import { AnimatePresence, motion } from 'motion/react'
import '../styles/global.css'

const inter = Inter({ subsets: ['latin'] })

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter()

  return (
    <div className={inter.className}>
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
