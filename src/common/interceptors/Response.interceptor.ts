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
import { errorMessage, responseMessage } from 'src/lib/errors'

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, IResponse> {
    intercept(
        context: ExecutionContext,
        next: CallHandler
    ): Observable<IResponse> {
        const response = context.switchToHttp().getResponse<Response>()

        return next.handle().pipe(
            map((val: IPreResponse) => {
                if (!(typeof val === 'string' || typeof val === 'object')) {
                    throw new NotImplementedException(
                        errorMessage.NOT_IMPLEMETED
                    )
                } else {
                    const message = typeof val === 'string' ? val : val.message

                    const responseBody: IResponse = {
                        message: message
                            ? message
                            : responseMessage.NOT_PROVIDED,
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
