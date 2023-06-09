import getPort from 'get-port'
import http from 'http'
import { serve } from 'micro'

export const createWebsite = async () => {
  const port = await getPort()

  const server = new http.Server(
    serve(async () => {
      return { status: 'ok' }
    })
  )

  server.listen(port)

  return `http://localhost:${port}/`
}
