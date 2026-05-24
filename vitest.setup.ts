import '@testing-library/jest-dom'
import { vi } from 'vitest'

vi.mock('next/font/google', () => ({
  Noto_Sans_Runic: () => ({ className: 'noto-runic-mock', style: { fontFamily: 'Noto Sans Runic' } }),
  Inter: () => ({ className: 'inter-mock', style: { fontFamily: 'Inter' } }),
}))
