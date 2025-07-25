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
import { PostgreSqlDriver } from '@mikro-orm/postgresql'

import { mikroOrmConfig } from './mikroOrm.config'
import { envEnum } from '../config/enums/env.enum'
import {
    CONST_CONFIG_DATABASE,
    CONST_CONFIG_ENV
} from '../config/contants/configOption.constant'
import { IConfigOptions } from '../config/interfaces/ConfigOptions.interface'

@Module({})
export class DatabaseModule implements OnModuleInit, OnApplicationShutdown {
    private readonly logger = new Logger(DatabaseModule.name)

    constructor(
        private readonly configService: ConfigService<IConfigOptions, true>,
        private readonly orm: MikroORM
    ) {}

    async onModuleInit() {
        const dbOptions = this.configService.get(CONST_CONFIG_DATABASE, {
            infer: true
        })
        const envOptions = this.configService.get(CONST_CONFIG_ENV, {
            infer: true
        })

        if (dbOptions.autoSync && envOptions.node !== envEnum.PRODUCTION) {
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

    /**
     * Register a database connection
     * @param dbName database name
     * @returns database dynamic module
     */
    static register(dbName: string, contextName?: string): DynamicModule {
        return {
            module: DatabaseModule,
            imports: [
                MikroOrmModule.forRootAsync({
                    inject: [ConfigService],
                    driver: PostgreSqlDriver,
                    useFactory: (
                        configService: ConfigService<IConfigOptions, true>
                    ) => {
                        const envOptions = configService.get(CONST_CONFIG_ENV, {
                            infer: true
                        })
                        const dbOptions = configService.get(
                            CONST_CONFIG_DATABASE,
                            {
                                infer: true
                            }
                        )

                        return mikroOrmConfig(
                            {
                                host: dbOptions.host,
                                port: dbOptions.port,
                                username: dbOptions.username,
                                password: dbOptions.password,
                                maxPoolSize: dbOptions.maxPoolSize,
                                idleTimeoutMillis: dbOptions.idleTimeoutMillis,
                                autoSync: false
                            },
                            envOptions.node,
                            dbName,
                            contextName
                        )
                    }
                })
            ]
        }
    }
}
