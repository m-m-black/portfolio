import Head from 'next/head'
import { useEffect, useRef, useState } from 'react'
import GenerativeCircle from '../components/GenerativeCircle'

const About = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState(0)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => {
      setSize(Math.min(entry.contentRect.width, 640))
    })
    ro.observe(el)
    setSize(Math.min(el.offsetWidth, 640))
    return () => ro.disconnect()
  }, [])

  return (
    <>
      <Head>
        <title>About — Morgan Black</title>
      </Head>
      <main className="min-h-screen bg-background flex flex-col items-center justify-center px-8 pt-24 pb-8 gap-8">
        <div ref={containerRef} className="w-full max-w-2xl">
          {size > 0 && <GenerativeCircle size={size} />}
        </div>
        <p className="text-text-muted text-xs tracking-widest uppercase text-center max-w-xs">
          Software engineer. Builds things that outlast their requirements.
        </p>
      </main>
    </>
  )
}

export default About
