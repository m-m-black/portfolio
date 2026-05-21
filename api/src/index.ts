import { Hono } from 'hono'
import { cors } from 'hono/cors'
import monumentData from './data/monuments.json'
import type { Monument } from './types'

const monuments = monumentData as Monument[]

const app = new Hono()

app.use('*', cors())

app.get('/monuments', (c) => c.json(monuments))

app.get('/monuments/:id', (c) => {
  const monument = monuments.find((m) => m.id === c.req.param('id'))
  if (!monument) return c.json({ detail: 'Monument not found' }, 404)
  return c.json(monument)
})

export default app
