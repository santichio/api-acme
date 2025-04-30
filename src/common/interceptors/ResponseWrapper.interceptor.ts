import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor
} from '@nestjs/common'
import { map, Observable } from 'rxjs'
import { FastifyRequest as Request, FastifyReply as Response } from 'fastify'

import { IResponse } from '../interfaces/Response.interface'

@Injectable()
export class ResponseWrapperInterceptor<T>
    implements NestInterceptor<T, IResponse<T>>
{
    intercept(
        context: ExecutionContext,
        next: CallHandler
    ): Observable<IResponse<T>> {
        const interceptResponse = context.switchToHttp().getResponse<Response>()
        const statusCode = interceptResponse.statusCode

        const interceptRequest = context.switchToHttp().getRequest<Request>()
        const queryParams = interceptRequest.query



        return next.handle().pipe(
            map((data) => {
                // const response: IResponse<T> = {
                //     message: ,
                //     statusCode: 0,
                //     timeStamp: ''
                // }

                return data
            })
        )
    }
}
