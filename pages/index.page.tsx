import Head from 'next/head'
import RunicScramble from '../components/RunicScramble'

const Home = () => {
  return (
    <>
      <Head>
        <title>Morgan Black</title>
      </Head>
      <main className="flex flex-col items-center justify-center min-h-screen bg-background gap-8 sm:gap-10">
        <h1
          aria-label="Morgan Black"
          className="flex flex-col sm:flex-row items-center sm:items-baseline sm:gap-[0.25em] text-6xl sm:text-8xl tracking-tight text-text font-mono"
        >
          <RunicScramble text="Morgan" className="font-light" />
          <RunicScramble text="Black" className="font-black" />
        </h1>
      </main>
    </>
  )
}

export default Home
