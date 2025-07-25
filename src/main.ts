import { NestFactory } from '@nestjs/core'
import {
    FastifyAdapter,
    NestFastifyApplication
} from '@nestjs/platform-fastify'

import { AppModule } from './app.module'
import { ConsoleLogger } from '@nestjs/common'

async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(
        AppModule,
        new FastifyAdapter(),
        {
            logger: new ConsoleLogger({
                prefix: 'AcmeApi',
                sorted: false,
                timestamp: true
            })
        }
    )

    app.enableShutdownHooks()

    await app.listen(3000)
}
bootstrap()
