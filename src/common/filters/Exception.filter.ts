import {
    ArgumentsHost,
    Catch,
    ExceptionFilter as NestExceptionFilter,
    HttpException,
    HttpStatus,
    Logger
} from '@nestjs/common'
import { HttpAdapterHost } from '@nestjs/core'
import { randomUUID } from 'crypto'
import { FastifyReply as Response, FastifyRequest as Request } from 'fastify'

import { IResponseError } from '../interfaces/Response.interface'
import { FastifyAdapter } from '@nestjs/platform-fastify'
import { errorMessage } from 'src/lib/errors'

@Catch()
export class ExceptionFilter implements NestExceptionFilter {
    private readonly logger = new Logger(ExceptionFilter.name)

    constructor(
        private readonly httpAdapterHost: HttpAdapterHost<FastifyAdapter>
    ) {}

    catch(exception: unknown, host: ArgumentsHost) {
        const { httpAdapter } = this.httpAdapterHost

        const errorLog = randomUUID()

        const response = host.switchToHttp().getResponse<Response>()
        const request = host.switchToHttp().getRequest<Request>()

        const reqMethod = httpAdapter.getRequestMethod(request)
        const reqUrl = httpAdapter.getRequestUrl(request)
        const reqHost = httpAdapter.getRequestHostname(request)

        const isHttpException = exception instanceof HttpException

        const responseBody: IResponseError = {
            errorLog,
            timeStamp: new Date().toISOString(),
            message: isHttpException
                ? exception.message
                : errorMessage.INTERNAL_SERVER,
            statusCode: isHttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR,
            error: isHttpException
                ? (exception.getResponse()['message'] as string)
                : errorMessage.NO_DESCRIPTION
        }

        if (isHttpException) {
            httpAdapter.reply(response, responseBody, response.statusCode)

            this.logger.warn(
                `${reqMethod} at ${reqHost + reqUrl} throw a ${exception.name}. ErrorLog: ${errorLog}`
            )
        } else {
            httpAdapter.reply(
                response,
                {
                    ...responseBody,
                    reqUrl,
                    reqMethod,
                    reqHost
                },
                HttpStatus.INTERNAL_SERVER_ERROR
            )

            this.logger.fatal(
                `${reqMethod} at ${reqHost + reqUrl} throw a fatal error. ErrorLog: ${errorLog}`
            )
        }
    }
}
