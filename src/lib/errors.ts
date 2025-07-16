// export const logErrorMessage = {
//     timeout(method, host, url, logRef) {
//         return `${method} at ${host + url} throw a timeout error. Log reference # ${logRef}`
//     },
//     httpException(method, host, url, exceptionName, logRef) {
//         return `${method} at ${host + url} returned a http exception of ${exceptionName}. Log reference # ${logRef}`
//     },
//     serverException(method, host, url)
// }

import { Logger } from '@nestjs/common'
import { randomUUID } from 'crypto'

export const errorMessage = {
    TIMEOUT: 'This request took longer than expected!',
    NOT_IMPLEMETED: 'This feature is not implemented as we expect!',
    NO_DESCRIPTION: 'No error description provided!',
    INTERNAL_SERVER: 'There was a problem on our server!'
}

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
