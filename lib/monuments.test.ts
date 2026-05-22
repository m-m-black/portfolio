import { fetchMonuments, fetchMonument } from './monuments'

function mockFetch(ok: boolean, body: unknown, status = 200) {
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
    ok,
    status,
    json: () => Promise.resolve(body),
  }))
}

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('fetchMonuments', () => {
  it('returns a Monument array on success', async () => {
    const data = [{ id: 'stonehenge', name: 'Stonehenge' }]
    mockFetch(true, data)
    const result = await fetchMonuments()
    expect(result).toEqual(data)
  })

  it('calls the correct endpoint', async () => {
    mockFetch(true, [])
    await fetchMonuments()
    expect(vi.mocked(fetch)).toHaveBeenCalledWith(
      expect.stringContaining('/monuments')
    )
  })

  it('throws on a non-2xx response', async () => {
    mockFetch(false, { detail: 'Internal Server Error' }, 500)
    await expect(fetchMonuments()).rejects.toThrow('500')
  })
})

describe('fetchMonument', () => {
  it('returns a single Monument on success', async () => {
    const data = { id: 'stonehenge', name: 'Stonehenge' }
    mockFetch(true, data)
    const result = await fetchMonument('stonehenge')
    expect(result).toEqual(data)
  })

  it('calls the correct endpoint with the given id', async () => {
    mockFetch(true, {})
    await fetchMonument('avebury')
    expect(vi.mocked(fetch)).toHaveBeenCalledWith(
      expect.stringContaining('/monuments/avebury')
    )
  })

  it('throws on a 404 response', async () => {
    mockFetch(false, { detail: 'Monument not found' }, 404)
    await expect(fetchMonument('unknown')).rejects.toThrow('404')
  })
})
