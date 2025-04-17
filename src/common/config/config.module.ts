import { Module } from '@nestjs/common'
import { ConfigModule as NestConfigModule } from '@nestjs/config'
import { ClsModule } from 'nestjs-cls'
import { randomUUID } from 'crypto'

import { HttpRequest } from '../interfaces/HttpResquest.interface'

@Module({
    imports: [
        NestConfigModule.forRoot({
            isGlobal: true,
            cache: true,
            ignoreEnvFile: false // Change to false to load .env files
        }),
        ClsModule.forRoot({
            global: true,
            middleware: {
                mount: true,
                generateId: true,
                idGenerator: (req: HttpRequest) => {
                    const id = req.headers['X-Request-Id']

                    return Array.isArray(id) || !id ? randomUUID() : id
                }
            }
        })
    ]
})
export class ConfigModule {}
