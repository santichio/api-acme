import { NestFactory } from '@nestjs/core'
import {
    FastifyAdapter,
    NestFastifyApplication
} from '@nestjs/platform-fastify'

import { AppModule } from './app.module'
import { ConsoleLogger } from '@nestjs/common'
import { MikroORM } from '@mikro-orm/core'

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

    await app.get(MikroORM).getSchemaGenerator().ensureDatabase()
    await app.get(MikroORM).getSchemaGenerator().updateSchema()

    app.enableShutdownHooks()

    await app.listen(3000)
}
bootstrap()
