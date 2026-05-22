import Head from 'next/head'
import { useEffect, useState } from 'react'
import ExcavatingLoader from '../components/ExcavatingLoader'
import { fetchMonuments } from '../lib/monuments'
import type { Monument } from '../lib/monuments'

const Observatory = () => {
  const [monuments, setMonuments] = useState<Monument[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchMonuments()
      .then(setMonuments)
      .catch((e: Error) => setError(e.message))
  }, [])

  return (
    <>
      <Head>
        <title>Observatory — Morgan Black</title>
      </Head>
      <main className="flex items-center justify-center min-h-screen bg-background">
        {monuments === null && error === null && <ExcavatingLoader />}
        {error !== null && (
          <p className="text-text-muted text-sm tracking-widest uppercase">
            error — {error}
          </p>
        )}
        {monuments !== null && (
          <p className="text-text-muted text-sm tracking-widest uppercase">
            {monuments.length} monuments
          </p>
        )}
      </main>
    </>
  )
}

export default Observatory
