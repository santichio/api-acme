import {
    DynamicModule,
    Logger,
    Module,
    OnApplicationShutdown,
    OnModuleInit
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { MikroOrmModule } from '@mikro-orm/nestjs'
import { MikroORM } from '@mikro-orm/core'

import { mikroOrmConfig } from './mikroOrm.config'
import { enviromentsEnum as Env } from '../config/enums/enviroments.enum'
import { DatabaseOptionsInterface as DbOptions } from '../config/interfaces/ConfigOptions.interface'
import { PostgreSqlDriver } from '@mikro-orm/postgresql'

@Module({})
export class DatabaseModule implements OnModuleInit, OnApplicationShutdown {
    private readonly logger = new Logger(DatabaseModule.name)

    constructor(
        private readonly configService: ConfigService,
        private readonly orm: MikroORM
    ) {}

    async onModuleInit() {
        const autoSync =
            this.configService.get<boolean>('database.connection.autoSync') ??
            false
        const enviroment =
            this.configService.getOrThrow<Env>('enviroment.nodeEnv')

        if (autoSync && enviroment !== Env.PRODUCTION) {
            try {
                this.logger.log(
                    'Auto-sync enabled. Syncing database schema with entities...'
                )
                const generator = this.orm.getSchemaGenerator()

                const updateSchema = await generator.getUpdateSchemaSQL()
                await generator.execute(updateSchema)

                this.logger.log('Database schema synchronized successfully')
            } catch (err) {
                this.logger.error('Failed to sync database schema')
                this.logger.error(err)
            }
        } else {
            this.logger.log(
                'Auto-sync disabled. Skipping schema synchronization'
            )
        }
    }

    async onApplicationShutdown() {
        this.logger.log('Closing connection with database...')
        await this.orm.close(true)
    }

    static register(): DynamicModule {
        return {
            module: DatabaseModule,
            imports: [
                MikroOrmModule.forRootAsync({
                    inject: [ConfigService],
                    driver: PostgreSqlDriver,
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
                                    ),
                                autoSync: configService.get<boolean>(
                                    'database.connection.autoSync'
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
