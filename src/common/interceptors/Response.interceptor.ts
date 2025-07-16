import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
    NotImplementedException
} from '@nestjs/common'
import { catchError, map, Observable, throwError } from 'rxjs'
import { FastifyReply as Response } from 'fastify'

import { IResponse, IPreResponse } from '../interfaces/Response.interface'
import { errorMessage } from 'src/lib/errors'

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, IResponse> {
    intercept(
        context: ExecutionContext,
        next: CallHandler
    ): Observable<IResponse> {
        const response = context.switchToHttp().getResponse<Response>()

        return next.handle().pipe(
            map((val: IPreResponse) => {
                console.log(
                    !(typeof val === 'string' || typeof val === 'object')
                )
                if (!(typeof val === 'string' || typeof val === 'object')) {
                    console.log('banana')
                    throw new NotImplementedException(
                        errorMessage.NOT_IMPLEMETED
                    )
                } else {
                    const responseBody: IResponse = {
                        message: typeof val === 'string' ? val : val.message,
                        statusCode: response.statusCode,
                        timeStamp: new Date().toISOString(),
                        data: val.data,
                        metadata: val.metadata
                    }

                    return responseBody
                }
            }),
            catchError((err: Error) => {
                return throwError(() => err.message)
            })
        )
    }
}
