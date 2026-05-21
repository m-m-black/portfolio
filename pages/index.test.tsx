import { render, screen } from '@testing-library/react'
import Home from './index.page'

describe('Home', () => {
  it('renders the heading with accessible name', () => {
    render(<Home />)
    expect(screen.getByRole('heading', { name: 'Morgan Black' })).toBeInTheDocument()
  })
})
