# crawlee-pino

> 🌲 use [Pino](https://getpino.io/) to log within [Crawlee](https://crawlee.dev/)

## Installation

```bash
yarn add crawlee-pino
```

## Get Started

1. Create a Pino logger

```typescript
import pino from 'pino'

const pinoLogger = pino()
```

2. Create a CrawleePino logger

```typescript
import { CrawleePino } from 'crawlee-pino'

const crawleePinoLogger = new CrawleePino({ pino: pinoLogger })
```

3. Assign the logger to Crawlee

```typescript
import { PuppeteerCrawler, Log } from 'crawlee'

const crawler = new PuppeteerCrawler({
  log: new Log({ logger: crawleePinoLogger }),
})
```

4. Run your crawler

```typescript
await crawler.run(['https://crawlee.dev'])
```

## Full Usage

```typescript
import pino from 'pino'
import { PuppeteerCrawler, Log } from 'crawlee'
import { CrawleePino } from 'crawlee-pino'

export const logger = pino()

export const crawler = new PuppeteerCrawler({
  log: new Log({
    logger: new CrawleePino({ pino: logger.child({ tag: 'crawlee' }) }),
  }),
})

await crawler.run(['https://crawlee.dev'])
```

## References

- [Crawlee](https://crawlee.dev/)
- [Pino](https://getpino.io/)

## License

Apache-2.0 &copy; [yelo](https://github.com/imyelo), 2023 - present
