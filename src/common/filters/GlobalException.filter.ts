import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
    Logger,
    NotFoundException
} from '@nestjs/common'
import { HttpAdapterHost } from '@nestjs/core'
import { randomUUID } from 'crypto'
import { FastifyReply as Response, FastifyRequest as Request } from 'fastify'

import { IResponseError } from '../interfaces/Response.interface'
import { FastifyAdapter } from '@nestjs/platform-fastify'

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
    private readonly logger = new Logger('GlobalException')

    constructor(
        private readonly httpAdapterHost: HttpAdapterHost<FastifyAdapter>
    ) {}

    catch(exception: unknown, host: ArgumentsHost) {
        const test = exception instanceof NotFoundException
        console.log(test)

        const { httpAdapter } = this.httpAdapterHost

        const context = host.switchToHttp()

        const httpStatus =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR
        const responseBody = {
            statusCode: httpStatus,
            timeStamp: new Date().toISOString(),
            path: httpAdapter.getRequestUrl(context.getRequest())
        }

        httpAdapter.reply(context.getResponse(), responseBody, httpStatus)

        // const context = host.switchToHttp()
        // const response = context.getResponse<Response>()
        // const request = context.getRequest<Request>()

        // const errorRef = randomUUID()

        // const { httpAdapter } = this.adapterHost

        // const reqMethod = httpAdapter.getRequestMethod(request)
        // const reqUrl = httpAdapter.getRequestUrl(request)
        // const reqHost = httpAdapter.getRequestHostname(request)


        // if (exception instanceof HttpException) {

        //     console.log('banana')
        //     const responseBody: IResponseError = {
        //         message: exception.message,
        //         statusCode: exception.getStatus(),
        //         // error: exception.getResponse()['error'],
        //         errorRef,
        //         timeStamp: new Date().toISOString()
        //     }

        //     httpAdapter.reply(response, responseBody, responseBody.statusCode)
        // } else {
        //     const responseBody: IResponseError = {
        //         message: 'Internal server error!',
        //         statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        //         timeStamp: new Date().toISOString(),
        //         errorRef,
        //         reqUrl,
        //         reqMethod,
        //         reqHost
        //     }

        //     httpAdapter.reply(response, responseBody, responseBody.statusCode)

        //     this.logger.error(
        //         `Request ${reqMethod} at ${reqHost + reqUrl} throw an error. ErrorRef: ${errorRef}`
        //     )
        // }
    }
}
