import { Logger as CrawleeLogger, LogLevel } from 'crawlee'
import { type LevelWithSilent, type Logger as PinoLogger } from 'pino'

const LEVEL_CRAWLEE_TO_PINO: Record<LogLevel, LevelWithSilent> = {
  [LogLevel.SOFT_FAIL]: 'fatal',
  [LogLevel.ERROR]: 'error',
  [LogLevel.WARNING]: 'warn',
  [LogLevel.INFO]: 'info',
  [LogLevel.DEBUG]: 'debug',
  [LogLevel.PERF]: 'trace',
  [LogLevel.OFF]: 'silent',
}

const PREFIX_DELIMITER = ':'
type Exception = Parameters<InstanceType<typeof CrawleeLogger>['_log']>[3]
interface LogOptions {
  prefix: string
  suffix: string
}

export class CrawleePino extends CrawleeLogger {
  private pino: PinoLogger

  constructor(options?: { pino: PinoLogger }) {
    super(options)
    this.pino = options.pino
  }

  _log(level: LogLevel, message: string, data?: any, exception?: Exception, options?: LogOptions) {
    const { prefix, suffix } = options || {}
    let msg = message

    if (options?.prefix) {
      msg = `${prefix}${PREFIX_DELIMITER} ${msg}`
    }
    if (options?.suffix) {
      msg = `${msg} ${suffix}`
    }
    this.pino[LEVEL_CRAWLEE_TO_PINO[level]]({ data, exception }, msg)
  }
}
