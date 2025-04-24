import { DynamicModule, Module } from '@nestjs/common'
import { ConfigModule as NestConfigModule } from '@nestjs/config'
import { ClsModule } from 'nestjs-cls'
import { randomUUID } from 'crypto'

import { HttpRequest } from '../interfaces/HttpResquest.interface'
import options from './configOptions'

@Module({})
export class ConfigModule {
    /**
     * Register NestJs Config module and Nest CLS Module
     * @returns Dynamin module
     */
    static register(): DynamicModule {
        return {
            module: ConfigModule,
            imports: [
                NestConfigModule.forRoot({
                    isGlobal: true,
                    cache: true,
                    expandVariables: true,
                    load: [options]
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
