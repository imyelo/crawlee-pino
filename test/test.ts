import test from 'ava'
import sinon from 'sinon'
import pino from 'pino'
import buildTransport from 'pino-abstract-transport'
import { HttpCrawler, Log } from 'crawlee'
import { CrawleePino } from '../src/index.js'
import { createWebsite } from './helpers/website.js'

test.before(async t => {
  // eslint-disable-next-line
  t.context['websiteURL'] = await createWebsite()
})

test('defaults', async t => {
  const { websiteURL } = t.context as any
  const spy = sinon.spy()

  const dest = () => {
    return buildTransport(async source => {
      for await (const obj of source) {
        spy(obj)
      }
    })
  }

  const log = pino(dest())
  const crawler = new HttpCrawler({
    requestHandler: async ({ request, body, log }) => {
      log.info('http response body', { url: request.url, body: JSON.parse(body.toString()) })
    },
    log: new Log({
      logger: new CrawleePino({ pino: log }),
    }),
  })

  await crawler.run([websiteURL])

  const outputs = spy.getCalls().map(call => {
    const data = { ...call.firstArg }
    delete data.time
    delete data.pid
    delete data.hostname
    return data
  })

  t.deepEqual(outputs, [
    {
      level: 30,
      msg: 'Status message: Crawled 0/1 pages, 0 errors.',
    },
    {
      level: 30,
      msg: 'Starting the crawl',
    },
    {
      level: 30,
      data: {
        url: websiteURL,
        body: {
          status: 'ok',
        },
      },
      msg: 'http response body',
    },
    {
      level: 30,
      msg: 'All requests from the queue have been processed, the crawler will shut down.',
    },
  ])

  t.pass()
})
