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

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
    constructor(
        private readonly configService: ConfigService<IConfigOptions, true>
    ) {}

    intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
        const apiOptions = this.configService.get('api', { infer: true })

        return next.handle().pipe(
            timeout(apiOptions.timeoutMillis),
            catchError((err) => {
                if (err instanceof TimeoutError) {
                    return throwError(() => new RequestTimeoutException())
                }

                return throwError(() => new Error(err))
            })
        )
    }
}
