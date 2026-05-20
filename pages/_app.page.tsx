import type { AppProps } from 'next/app'
import { Inter } from 'next/font/google'
import '../styles/global.css'

const inter = Inter({ subsets: ['latin'] })

const App = ({ Component, pageProps }: AppProps) => (
  <div className={inter.className}>
    <Component {...pageProps} />
  </div>
)

export default App
