import { DynamicModule, Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { MikroOrmModule } from '@mikro-orm/nestjs'

import { mikroOrmConfig } from './mikroOrm.config'
import { enviromentsEnum as Env } from '../config/enums/enviroments.enum'
import { DatabaseOptionsInterface as DbOptions } from '../config/interfaces/ConfigOptions.interface'

@Module({})
export class DatabaseModule {
    static register(): DynamicModule {
        return {
            module: DatabaseModule,
            imports: [
                MikroOrmModule.forRootAsync({
                    inject: [ConfigService],
                    useFactory: (configService: ConfigService) => {
                        const env =
                            configService.getOrThrow<Env>('enviroment.nodeEnv')
                        const dbOptions: DbOptions = {
                            connection: {
                                host: configService.getOrThrow<string>(
                                    'database.connection.host'
                                ),
                                port: configService.getOrThrow<number>(
                                    'database.connection.port'
                                ),
                                username: configService.getOrThrow<string>(
                                    'database.connection.username'
                                ),
                                password: configService.getOrThrow<string>(
                                    'database.connection.password'
                                ),
                                maxPoolSize: configService.getOrThrow<number>(
                                    'database.connection.maxPoolSize'
                                ),
                                idleTimeoutMillis:
                                    configService.getOrThrow<number>(
                                        'database.connection.idleTimeoutMillis'
                                    )
                            },
                            user: configService.getOrThrow<string>(
                                'database.user'
                            )
                        }

                        return mikroOrmConfig(dbOptions, env)
                    }
                })
            ]
        }
    }
}
