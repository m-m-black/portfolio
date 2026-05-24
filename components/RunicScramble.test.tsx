import { render, fireEvent } from '@testing-library/react'
import RunicScramble from './RunicScramble'

const HAS_RUNE = /[ᚠ-᛿]/

describe('RunicScramble', () => {
  it('renders target text immediately on mount', () => {
    const { container } = render(<RunicScramble text="Morgan" />)
    expect(container.textContent).toBe('Morgan')
  })

  it('shows a runic character on hover', () => {
    const { container } = render(<RunicScramble text="AB" />)
    const slots = Array.from(container.querySelector('span')!.children) as HTMLElement[]

    fireEvent.mouseEnter(slots[0])

    expect(HAS_RUNE.test(slots[0].textContent ?? '')).toBe(true)
    expect(slots[1].textContent).toBe('B')
  })

  it('reverts to original letter on mouse leave', () => {
    const { container } = render(<RunicScramble text="AB" />)
    const slots = Array.from(container.querySelector('span')!.children) as HTMLElement[]

    fireEvent.mouseEnter(slots[0])
    fireEvent.mouseLeave(slots[0])

    expect(slots[0].textContent).toBe('A')
  })
})
