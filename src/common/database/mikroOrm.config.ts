import { defineConfig, Options } from '@mikro-orm/postgresql'
import { Migrator } from '@mikro-orm/migrations'

import { DatabaseOptionsInterface as Db } from '../config/interfaces/ConfigOptions.interface'
import { enviromentsEnum as Env } from '../config/enums/enviroments.enum'
import { SqlHighlighter } from '@mikro-orm/sql-highlighter'

/**
 * Build a MikroORM connection options object, based on enviroment
 * @param options Object of database config
 * @param enviroment Enviroment enum ( prd | hml | dev | loc )
 * @returns Options object
 */
export function mikroOrmConfig(options: Db, enviroment: Env): Options {
    // Common configuration idependent of enviroment
    const opt: Options = {
        host: options.connection.host,
        port: options.connection.port,
        user: options.connection.username,
        password: options.connection.password,
        dbName: options.user,
        entities: ['./dist/**/*.entity.js'],
        entitiesTs: ['./src/**/*.entity.ts'],
        strict: true,
        forceUtcTimezone: true,
        migrations: {
            path: 'dist/modules/database/migrations',
            pathTs: 'src/modules/database/migrations',
            transactional: true,
            allOrNothing: true
        },
        pool: {
            min: 5,
            max: options.connection.maxPoolSize,
            idleTimeoutMillis: options.connection.idleTimeoutMillis
        },
        extensions: [Migrator]
    }

    const env = enviroment ?? Env.DEVELOP

    if (env === Env.DEVELOP || Env.LOCALHOST) {
        const highlighter = new SqlHighlighter()

        return defineConfig({
            ...opt,
            debug: true,
            highlighter
        })
    }

    return defineConfig(opt)
}
