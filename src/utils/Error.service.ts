import { Logger } from '@nestjs/common'
import { randomUUID } from 'crypto'

export class ErrorService {
    readonly messages: Record<string, string> = {
        timeout: 'This request took longer than expected!',
        notImplemented: 'This feature is not implemented as we expect!',
        noErrorDescription: 'No error description provided!',
        internalServer: 'There was a problem on our server!'
    }

    private readonly logger: Logger
    private readonly baseLog: string
    private readonly logRef: string

    constructor(context: string, method: string, host: string, url: string) {
        this.baseLog = `${method} at ${host + url}`
        this.logRef = `#${randomUUID()}`
        this.logger = new Logger(context)
    }

    /**
     * Log a timeout warn and return a message
     * @param time timeout config value in milliseconds
     */
    timeout(time: number) {
        this.logger.warn(`${this.baseLog} timeout in ${time}. ${this.logRef}`)
        return this.messages.timeout
    }

    getRef() {
        return this.logRef
    }
}
