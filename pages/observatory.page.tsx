import Head from 'next/head'
import { useEffect, useState } from 'react'
import AlignmentChart from '../components/AlignmentChart'
import ScatterPlot from '../components/ScatterPlot'
import ExcavatingLoader from '../components/ExcavatingLoader'
import { fetchMonuments } from '../lib/monuments'
import type { Monument } from '../lib/monuments'

type Tab = 'alignments' | 'scatter'

const TABS: { id: Tab; label: string }[] = [
  { id: 'alignments', label: 'Alignments' },
  { id: 'scatter',    label: 'Dimensions' },
]

const Observatory = () => {
  const [monuments, setMonuments] = useState<Monument[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [tab, setTab] = useState<Tab>('alignments')

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
      <main className="min-h-screen bg-background flex flex-col items-center justify-center px-8 pb-8 pt-24">
        {monuments === null && error === null && <ExcavatingLoader />}
        {error !== null && (
          <p className="text-text-muted text-sm tracking-widest uppercase">
            error — {error}
          </p>
        )}
        {monuments !== null && (
          <div className="w-full max-w-md">
            <div className="flex gap-6 mb-6">
              {TABS.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => setTab(id)}
                  className={`text-xs tracking-widest uppercase transition-colors ${
                    tab === id ? 'text-accent' : 'text-text-muted hover:text-text'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
            {tab === 'alignments' && <AlignmentChart monuments={monuments} />}
            {tab === 'scatter'    && <ScatterPlot monuments={monuments} />}
          </div>
        )}
      </main>
    </>
  )
}

export default Observatory
