import { render } from '@testing-library/react'
import { act } from 'react'
import { vi } from 'vitest'
import RunicScramble from './RunicScramble'

const RUNE_RANGE = /^[ᚠ-᛿\s]+$/

describe('RunicScramble', () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  it('resolves to the target text after animation completes', () => {
    vi.useFakeTimers()
    const { container } = render(<RunicScramble text="Morgan" />)
    act(() => {
      vi.advanceTimersByTime(3000)
    })
    expect(container.textContent).toBe('Morgan')
  })

  it('shows only runic characters or spaces before resolving', () => {
    vi.useFakeTimers()
    const { container } = render(<RunicScramble text="AB" />)
    expect(RUNE_RANGE.test(container.textContent ?? '')).toBe(true)
  })
})
