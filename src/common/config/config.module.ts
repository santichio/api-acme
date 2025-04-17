import { DynamicModule, Module } from '@nestjs/common'
import { ConfigModule as NestConfigModule } from '@nestjs/config'
import { ClsModule } from 'nestjs-cls'
import { randomUUID } from 'crypto'

import { HttpRequest } from '../interfaces/HttpResquest.interface'

@Module({})
export class ConfigModule {
    /**
     * Register NestJs Config module and Nest CLS Module
     * @param envFile If use a env file, set to true
     * @returns Dynamin module
     */
    static register(envFile?: boolean): DynamicModule {
        return {
            module: ConfigModule,
            imports: [
                NestConfigModule.forRoot({
                    isGlobal: true,
                    cache: true,
                    ignoreEnvFile: envFile
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
        }
    }
}
