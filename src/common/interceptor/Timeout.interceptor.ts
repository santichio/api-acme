import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
    RequestTimeoutException
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { catchError, Observable, throwError, timeout, TimeoutError } from 'rxjs'

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
    constructor(private readonly configService: ConfigService) {}

    intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
        const timeoutMillis = this.configService.get<number>(
            'api.timeoutMillis',
            3000
        )

        return next.handle().pipe(
            timeout(timeoutMillis),
            catchError((err) => {
                if (err instanceof TimeoutError) {
                    return throwError(() => new RequestTimeoutException())
                }

                return throwError(() => new Error(err))
            })
        )
    }
}
