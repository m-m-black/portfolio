import Head from 'next/head'
import { useEffect, useRef, useState } from 'react'
import AlignmentChart from '../components/AlignmentChart'
import ScatterPlot from '../components/ScatterPlot'
import GenerativeCircle from '../components/GenerativeCircle'
import ExcavatingLoader from '../components/ExcavatingLoader'
import { fetchMonuments } from '../lib/monuments'
import type { Monument } from '../lib/monuments'

type Tab = 'alignments' | 'scatter' | 'circle'

const TABS: { id: Tab; label: string }[] = [
  { id: 'alignments', label: 'Alignments' },
  { id: 'scatter',    label: 'Dimensions' },
  { id: 'circle',     label: 'Circle' },
]

const Observatory = () => {
  const [monuments, setMonuments] = useState<Monument[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [tab, setTab] = useState<Tab>('alignments')
  const containerRef = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState(0)

  useEffect(() => {
    fetchMonuments()
      .then(setMonuments)
      .catch((e: Error) => setError(e.message))
  }, [])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => setSize(entry.contentRect.width))
    ro.observe(el)
    setSize(el.offsetWidth)
    return () => ro.disconnect()
  }, [])

  const needsData = tab !== 'circle'

  return (
    <>
      <Head>
        <title>Observatory — Morgan Black</title>
      </Head>
      <main className="min-h-screen bg-background flex flex-col items-center justify-center px-8 pb-8 pt-24">
        <div ref={containerRef} className="w-full max-w-md">
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
          {needsData && monuments === null && error === null && <ExcavatingLoader />}
          {needsData && error !== null && (
            <p className="text-text-muted text-sm tracking-widest uppercase">
              error — {error}
            </p>
          )}
          {tab === 'alignments' && monuments !== null && <AlignmentChart monuments={monuments} />}
          {tab === 'scatter'    && monuments !== null && <ScatterPlot monuments={monuments} />}
          {tab === 'circle'     && size > 0           && <GenerativeCircle size={size} />}
        </div>
      </main>
    </>
  )
}

export default Observatory
