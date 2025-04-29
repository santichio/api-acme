import { HttpAdapterHost, NestFactory } from '@nestjs/core'
import {
    FastifyAdapter,
    NestFastifyApplication
} from '@nestjs/platform-fastify'

import { AppModule } from './app.module'
import { GlobalExceptionFilter } from './common/filters/GlobalException.filter'

async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(
        AppModule,
        new FastifyAdapter()
    )

    app.enableShutdownHooks()
    app.useGlobalFilters(new GlobalExceptionFilter(app.get(HttpAdapterHost)))

    await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
