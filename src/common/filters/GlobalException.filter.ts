import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
    Logger
} from '@nestjs/common'
import { HttpAdapterHost } from '@nestjs/core'
import { randomUUID } from 'crypto'
import { FastifyReply as Response, FastifyRequest as Request } from 'fastify'

import { ResponseInterface } from '../interfaces/Response.interface'
import { FastifyAdapter } from '@nestjs/platform-fastify'

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
    private readonly logger = new Logger(GlobalExceptionFilter.name)

    constructor(
        private readonly adapterHost: HttpAdapterHost<FastifyAdapter>
    ) {}

    catch(exception: unknown, host: ArgumentsHost) {
        const context = host.switchToHttp()
        const response = context.getResponse<Response>()
        const request = context.getRequest<Request>()

        const errorRef = randomUUID()

        const { httpAdapter } = this.adapterHost

        const reqMethod = httpAdapter.getRequestMethod(request)
        const reqUrl = httpAdapter.getRequestUrl(request)
        const reqHost = httpAdapter.getRequestHostname(request)

        if (exception instanceof HttpException) {
            const res: ResponseInterface = {
                message: exception.message,
                statusCode: exception.getStatus(),
                error: exception.getResponse()['error'],
                errorRef,
                timeStamp: new Date().toISOString()
            }

            httpAdapter.reply(response, res, res.statusCode)
        } else {
            const res: ResponseInterface = {
                message: 'Internal server error!',
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                timeStamp: new Date().toISOString(),
                errorRef,
                data: {
                    reqUrl,
                    reqMethod,
                    reqHost
                }
            }

            httpAdapter.reply(response, res, res.statusCode)

            this.logger.error(
                `Request ${reqMethod} at ${reqHost + reqUrl} throw an error. ErrorRef: ${errorRef}`
            )
        }
    }
}
