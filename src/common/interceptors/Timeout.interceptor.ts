import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
    RequestTimeoutException
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Observable, throwError, TimeoutError } from 'rxjs'
import { catchError, timeout } from 'rxjs/operators'

import { IConfigOptions } from '../config/interfaces/ConfigOptions.interface'
import { CONST_CONFIG_API } from '../config/contants/configOption.constant'
import { errorMessage } from 'src/lib/errors'

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
    constructor(
        private readonly configService: ConfigService<IConfigOptions, true>
    ) {}

    intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
        const apiOptions = this.configService.get(CONST_CONFIG_API, {
            infer: true
        })

        return next.handle().pipe(
            timeout(apiOptions.timeoutMillis),
            catchError((err: Error) => {
                if (err instanceof TimeoutError) {
                    return throwError(
                        () => new RequestTimeoutException(errorMessage.TIMEOUT)
                    )
                }

                return throwError(() => err)
            })
        )
    }
}
